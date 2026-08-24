'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Language, ProductCategory } from '@/lib/types';
import { PRODUCTS } from '@/lib/data';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (productId: string, variantWeight: string, delta: number) => void;
  removeFromCart: (productId: string, variantWeight: string) => void;
  clearCart: () => void;
  totalCartCount: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
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
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('tameer_lang') as Language;
        if (savedLang === 'en' || savedLang === 'ur') return savedLang;
      } catch {}
    }
    return 'en';
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('tameer_cart');
        if (savedCart) return JSON.parse(savedCart);
      } catch {}
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('tameer_wishlist');
        if (savedWishlist) return JSON.parse(savedWishlist);
      } catch {}
    }
    return [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tameer_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tameer_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist]);

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
    }, 3000);
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
        : `Added "${product.name}" to cart!`
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
