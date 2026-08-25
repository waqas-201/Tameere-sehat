'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductVariant, CartItem, Language, ProductCategory, CategoryItem } from '@/lib/types';
import { PRODUCTS } from '@/lib/data';
import { DEFAULT_CATEGORIES } from '@/lib/tibb-standards';
import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  onSnapshot 
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Cart & Orders
  cartItems: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (productId: string, variantWeight: string, delta: number) => void;
  removeFromCart: (productId: string, variantWeight: string) => void;
  clearCart: () => void;
  totalCartCount: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  // Products Management
  products: Product[];
  categories: CategoryItem[];
  addProduct: (product: Product) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<boolean>;
  deleteProduct: (productId: string) => Promise<boolean>;
  toggleProductStock: (productId: string) => Promise<boolean>;
  
  // Category Management
  addCategory: (category: CategoryItem) => Promise<boolean>;
  updateCategory: (category: CategoryItem) => Promise<boolean>;
  deleteCategory: (categoryId: string) => Promise<boolean>;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

  // Hydrate state from localStorage on client mount to prevent SSR mismatch
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('tameer_lang') as Language;
      if (savedLang === 'en' || savedLang === 'ur') {
        setLanguageState(savedLang);
      }

      const savedCart = localStorage.getItem('tameer_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem('tameer_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedProducts = localStorage.getItem('tameer_products_catalog');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const savedCategories = localStorage.getItem('tameer_categories_catalog');
      if (savedCategories) {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch (e) {
      console.warn('Storage hydration error:', e);
    } finally {
      setIsStorageHydrated(true);
    }
  }, []);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Products from Firestore
  useEffect(() => {
    const fetchCloudCatalog = async () => {
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        if (!prodSnap.empty) {
          const cloudProds: Product[] = [];
          prodSnap.forEach((docSnap) => {
            cloudProds.push({ id: docSnap.id, ...(docSnap.data() as any) });
          });

          // Merge cloud products with initial hardcoded products (prefer cloud version if ID matches)
          setProducts((prev) => {
            const map = new Map<string, Product>();
            PRODUCTS.forEach((p) => map.set(p.id, p));
            prev.forEach((p) => map.set(p.id, p));
            cloudProds.forEach((p) => map.set(p.id, p));
            const merged = Array.from(map.values());
            try {
              localStorage.setItem('tameer_products_catalog', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, 'products');
      }

      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        if (!catSnap.empty) {
          const cloudCats: CategoryItem[] = [];
          catSnap.forEach((docSnap) => {
            cloudCats.push({ id: docSnap.id, ...(docSnap.data() as any) });
          });

          setCategories((prev) => {
            const map = new Map<string, CategoryItem>();
            DEFAULT_CATEGORIES.forEach((c) => map.set(c.id, c));
            prev.forEach((c) => map.set(c.id, c));
            cloudCats.forEach((c) => map.set(c.id, c));
            const merged = Array.from(map.values());
            try {
              localStorage.setItem('tameer_categories_catalog', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, 'categories');
      }
    };

    fetchCloudCatalog();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isStorageHydrated) return;
    try {
      localStorage.setItem('tameer_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems, isStorageHydrated]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isStorageHydrated) return;
    try {
      localStorage.setItem('tameer_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist, isStorageHydrated]);

  // Save products to localStorage
  useEffect(() => {
    if (!isStorageHydrated) return;
    try {
      localStorage.setItem('tameer_products_catalog', JSON.stringify(products));
    } catch (e) {}
  }, [products, isStorageHydrated]);

  // Save categories to localStorage
  useEffect(() => {
    if (!isStorageHydrated) return;
    try {
      localStorage.setItem('tameer_categories_catalog', JSON.stringify(categories));
    } catch (e) {}
  }, [categories, isStorageHydrated]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('tameer_lang', lang);
    } catch (e) {}
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.weight === variant.weight
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedVariant: variant, quantity }];
      }
    });

    showToast(
      language === 'ur'
        ? `"${product.urduName}" کارٹ میں شامل ہو گئی!`
        : `Added "${product.name}" (${variant.weight}) to cart!`
    );
  };

  const updateQuantity = (productId: string, variantWeight: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedVariant.weight === variantWeight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, variantWeight: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant.weight === variantWeight)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(language === 'ur' ? 'پسندیدہ لسٹ سے نکال دیا گیا' : 'Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(language === 'ur' ? 'پسندیدہ لسٹ میں شامل کر دیا گیا' : 'Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  // Add Product Action
  const addProduct = async (newProduct: Product): Promise<boolean> => {
    try {
      // 1. Optimistic local update
      setProducts((prev) => [newProduct, ...prev.filter((p) => p.id !== newProduct.id)]);
      
      // 2. Persist to Firestore
      try {
        await setDoc(doc(db, 'products', newProduct.id), {
          ...newProduct,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } catch (cloudErr) {
        handleFirestoreError(cloudErr, OperationType.WRITE, `products/${newProduct.id}`);
      }

      showToast(
        language === 'ur'
          ? `پراڈکٹ "${newProduct.urduName}" کامیابی سے شامل کر دی گئی!`
          : `Product "${newProduct.name}" uploaded successfully!`
      );
      return true;
    } catch (e) {
      console.error('Failed to add product:', e);
      showToast('Error uploading product. Please try again.');
      return false;
    }
  };

  // Update Product Action
  const updateProduct = async (updatedProduct: Product): Promise<boolean> => {
    try {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      try {
        await setDoc(doc(db, 'products', updatedProduct.id), {
          ...updatedProduct,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (cloudErr) {
        handleFirestoreError(cloudErr, OperationType.UPDATE, `products/${updatedProduct.id}`);
      }

      showToast(
        language === 'ur'
          ? `"${updatedProduct.urduName}" کی معلومات اپ ڈیٹ ہو گئیں!`
          : `Product "${updatedProduct.name}" updated successfully!`
      );
      return true;
    } catch (e) {
      console.error('Failed to update product:', e);
      showToast('Failed to update product details.');
      return false;
    }
  };

  // Delete Product Action
  const deleteProduct = async (productId: string): Promise<boolean> => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      
      try {
        await deleteDoc(doc(db, 'products', productId));
      } catch (cloudErr) {
        handleFirestoreError(cloudErr, OperationType.DELETE, `products/${productId}`);
      }

      showToast(
        language === 'ur'
          ? 'پراڈکٹ کیٹلاگ سے حذف کر دی گئی'
          : 'Product deleted from catalog'
      );
      return true;
    } catch (e) {
      console.error('Failed to delete product:', e);
      showToast('Failed to delete product.');
      return false;
    }
  };

  // Toggle Stock Action
  const toggleProductStock = async (productId: string): Promise<boolean> => {
    const target = products.find((p) => p.id === productId);
    if (!target) return false;
    const newStockState = !target.inStock;

    const updated = {
      ...target,
      inStock: newStockState,
      variants: target.variants.map((v) => ({ ...v, inStock: newStockState }))
    };

    setProducts((prev) => prev.map((p) => (p.id === productId ? updated : p)));

    try {
      await updateDoc(doc(db, 'products', productId), {
        inStock: newStockState,
        updatedAt: new Date().toISOString()
      });
    } catch (cloudErr) {
      handleFirestoreError(cloudErr, OperationType.UPDATE, `products/${productId}`);
    }

    showToast(
      language === 'ur'
        ? `اسٹاک اپ ڈیٹ: ${target.urduName} (${newStockState ? 'موجود' : 'ختم'})`
        : `${target.name} marked as ${newStockState ? 'In Stock' : 'Out of Stock'}`
    );
    return true;
  };

  // Add Category Action
  const addCategory = async (newCategory: CategoryItem): Promise<boolean> => {
    try {
      setCategories((prev) => [
        ...prev.filter((c) => c.id !== newCategory.id),
        newCategory
      ]);

      try {
        await setDoc(doc(db, 'categories', newCategory.id), {
          ...newCategory,
          createdAt: new Date().toISOString()
        });
      } catch (cloudErr) {
        handleFirestoreError(cloudErr, OperationType.WRITE, `categories/${newCategory.id}`);
      }

      showToast(
        language === 'ur'
          ? `کیٹیگری "${newCategory.nameUr}" شامل کر دی گئی!`
          : `Category "${newCategory.nameEn}" created successfully!`
      );
      return true;
    } catch (e) {
      console.error('Failed to add category:', e);
      showToast('Error creating category.');
      return false;
    }
  };

  // Update Category Action
  const updateCategory = async (updatedCategory: CategoryItem): Promise<boolean> => {
    try {
      setCategories((prev) =>
        prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
      );

      try {
        await setDoc(doc(db, 'categories', updatedCategory.id), {
          ...updatedCategory,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (cloudErr) {
        handleFirestoreError(cloudErr, OperationType.UPDATE, `categories/${updatedCategory.id}`);
      }

      showToast(
        language === 'ur'
          ? `کیٹیگری "${updatedCategory.nameUr}" اپ ڈیٹ ہو گئی!`
          : `Category "${updatedCategory.nameEn}" updated!`
      );
      return true;
    } catch (e) {
      console.error('Failed to update category:', e);
      return false;
    }
  };

  // Delete Category Action
  const deleteCategory = async (categoryId: string): Promise<boolean> => {
    if (categoryId === 'all') {
      showToast('Cannot delete default primary category.');
      return false;
    }
    try {
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));

      try {
        await deleteDoc(doc(db, 'categories', categoryId));
      } catch (cloudErr) {
        handleFirestoreError(cloudErr, OperationType.DELETE, `categories/${categoryId}`);
      }

      showToast(
        language === 'ur'
          ? 'کیٹیگری حذف کر دی گئی'
          : 'Category removed successfully'
      );
      return true;
    } catch (e) {
      console.error('Failed to delete category:', e);
      return false;
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCartCount,
        subtotal,
        wishlist,
        toggleWishlist,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        addCategory,
        updateCategory,
        deleteCategory,
        isCartOpen,
        setIsCartOpen,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
