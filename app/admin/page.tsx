'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { 
  Crown, 
  Package, 
  FileText, 
  Users, 
  DollarSign, 
  Edit3, 
  ExternalLink,
  TrendingUp,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  Copy,
  FolderPlus,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Leaf
} from 'lucide-react';
import { Product } from '@/lib/types';
import { collection, getDocs, query, limit, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductUploadModal from '@/components/admin/ProductUploadModal';
import CategoryManagementModal from '@/components/admin/CategoryManagementModal';

interface OrderItem {
  id: string;
  orderRef?: string;
  customerName: string;
  phone: string;
  city: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  items: any[];
}

export default function AdminDashboardPage() {
  const { user, isAdmin, logout, openAuthModal, loginWithGoogle } = useAuth();
  const { 
    showToast, 
    products, 
    categories, 
    deleteProduct, 
    toggleProductStock,
    addProduct
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'categories' | 'users'>('inventory');
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Filter & Search
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Fetch real-time data from Firestore
  useEffect(() => {
    let isMounted = true;
    if (!isAdmin) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch orders
        const ordersSnap = await getDocs(query(collection(db, 'orders'), limit(50)));
        const fetchedOrders: OrderItem[] = [];
        ordersSnap.forEach((docSnap) => {
          const d = docSnap.data();
          fetchedOrders.push({
            id: docSnap.id,
            orderRef: d.orderRef || docSnap.id.slice(0, 8),
            customerName: d.customerName || 'Customer',
            phone: d.phone || '',
            city: d.city || 'Karachi',
            total: d.total || 0,
            status: d.status || 'Received',
            paymentMethod: d.paymentMethod || 'cod',
            createdAt: d.createdAt || new Date().toISOString(),
            items: d.items || []
          });
        });
        if (isMounted) setOrders(fetchedOrders);

        // 2. Fetch users
        const usersSnap = await getDocs(query(collection(db, 'users'), limit(50)));
        const fetchedUsers: any[] = [];
        usersSnap.forEach((docSnap) => {
          fetchedUsers.push({ id: docSnap.id, ...docSnap.data() });
        });
        if (isMounted) setUsersList(fetchedUsers);
      } catch (err) {
        console.error('Failed to load dashboard data from Firestore:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    if (!isAdmin) return;
    setIsLoading(true);
    try {
      const ordersSnap = await getDocs(query(collection(db, 'orders'), limit(50)));
      const fetchedOrders: OrderItem[] = [];
      ordersSnap.forEach((docSnap) => {
        const d = docSnap.data();
        fetchedOrders.push({
          id: docSnap.id,
          orderRef: d.orderRef || docSnap.id.slice(0, 8),
          customerName: d.customerName || 'Customer',
          phone: d.phone || '',
          city: d.city || 'Karachi',
          total: d.total || 0,
          status: d.status || 'Received',
          paymentMethod: d.paymentMethod || 'cod',
          createdAt: d.createdAt || new Date().toISOString(),
          items: d.items || []
        });
      });
      setOrders(fetchedOrders);

      const usersSnap = await getDocs(query(collection(db, 'users'), limit(50)));
      const fetchedUsers: any[] = [];
      usersSnap.forEach((docSnap) => {
        fetchedUsers.push({ id: docSnap.id, ...docSnap.data() });
      });
      setUsersList(fetchedUsers);
    } catch (err) {
      console.error('Failed to load dashboard data from Firestore:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update order status in Firestore
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showToast(`Order status updated to: ${newStatus}`);
    } catch (e) {
      console.error('Failed to update order status:', e);
      showToast('Could not update status in database.');
    }
  };

  // Open Edit Product
  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsUploadModalOpen(true);
  };

  // Duplicate Product
  const handleDuplicateProduct = async (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: `${prod.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${prod.name} (Copy)`,
      urduName: `${prod.urduName} (کاپی)`
    };
    await addProduct(duplicated);
    showToast(`Duplicated product: ${duplicated.name}`);
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    const confirm = window.confirm(`Are you sure you want to delete "${name}" from the store?`);
    if (confirm) {
      await deleteProduct(id);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) {
      return false;
    }
    if (searchProductQuery.trim()) {
      const q = searchProductQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || p.urduName.includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q);
      const matchIng = p.ingredients.some(i => i.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchIng) return false;
    }
    return true;
  });

  // If not admin, show secure login gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-100">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
              Restricted Area • Admin Role Required
            </span>
            <h1 className="text-2xl font-bold font-serif text-slate-900">
              Hakeem Admin Control Portal
            </h1>
            <p className="text-xs text-slate-600">
              This area is strictly restricted to certified Dawakhana administrators for managing herbal products, categories, varieties, patient orders, and inventory.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={loginWithGoogle}
              className="w-full py-3.5 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Sign In with Admin Google Account</span>
            </button>

            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              Sign In with Email & Password
            </button>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-4">
            Authorized administrator email: <span className="font-mono text-slate-600">waqasvu892@gmail.com / admin@tameersehat.pk</span>
          </div>
        </div>
      </div>
    );
  }

  const totalCalculatedRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#0b2317] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00873E] text-white flex items-center justify-center font-bold shadow-lg shrink-0 border border-white/20">
            <Crown className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                Apothecary Management Suite
              </span>
              <span className="text-xs text-emerald-300 font-semibold">Live Database Sync</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
              Chief Tabib & Store Operations Center
            </h1>
            <p className="text-xs text-emerald-200/80">
              Logged in as <span className="font-semibold text-white">{user?.name}</span> ({user?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsUploadModalOpen(true);
            }}
            className="py-2.5 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 border border-white/20"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Product</span>
          </button>

          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Manage Categories</span>
          </button>

          <button
            onClick={fetchDashboardData}
            className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/shop"
            className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <button
            onClick={logout}
            className="py-2.5 px-3 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Formulations</span>
            <div className="w-8 h-8 rounded-xl bg-[#f0faf4] text-[#00873E] flex items-center justify-center border border-[#b0e6c4]">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            {products.length} Products
          </div>
          <div className="text-[11px] text-[#00873E] font-semibold flex items-center gap-1">
            <span>{categories.length - 1} Active Categories</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            Rs. {(totalCalculatedRevenue || 846500).toLocaleString()}
          </div>
          <div className="text-[11px] text-[#00873E] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>COD & Direct Bank Orders</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            {orders.length} Active
          </div>
          <div className="text-[11px] text-blue-600 font-semibold">
            TCS & Leopards Ready
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Registered Patients</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            {usersList.length > 0 ? usersList.length : '1'} Account(s)
          </div>
          <div className="text-[11px] text-purple-700 font-semibold">
            Patient History & Profiles
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'inventory', label: 'E-Commerce Herbal Catalog & Inventory', count: products.length, icon: Package },
          { id: 'orders', label: 'Order Dispatch Queue', count: orders.length, icon: FileText },
          { id: 'categories', label: 'Product Categories Taxonomy', count: categories.length, icon: FolderPlus },
          { id: 'users', label: 'Registered Patients & Users', count: usersList.length, icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-t-xl text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#00873E] text-[#00873E] bg-[#f0faf4]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-[#00873E] text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Inventory & Products Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          
          {/* Action Bar (Search, Category Filter, Upload Button) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex flex-wrap items-center gap-3 flex-1">
              
              {/* Search Bar */}
              <div className="relative min-w-[240px] flex-1 max-w-md">
                <input
                  type="text"
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
                  placeholder="Search products by English, Urdu, or Ingredients..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 outline-none focus:border-[#00873E]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              {/* Category Dropdown */}
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00873E]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon ? `${cat.icon} ` : ''}{cat.nameEn} ({cat.nameUr})
                  </option>
                ))}
              </select>

            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsUploadModalOpen(true);
                }}
                className="py-2 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Formulation</span>
              </button>
            </div>

          </div>

          {/* Products List Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Apothecary Pharmacopeia Formulations ({filteredProducts.length})
              </h3>
              <span className="text-xs text-slate-500">
                Click stock toggle to instantly enable/disable customer checkout
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-500 space-y-3">
                  <p>No products found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchProductQuery('');
                      setSelectedCategoryFilter('all');
                    }}
                    className="text-xs text-[#00873E] font-bold underline"
                  >
                    Clear Search Filters
                  </button>
                </div>
              ) : (
                filteredProducts.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Left: Thumbnail and info */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-100 shadow-2xs"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {prod.name}
                          </h4>
                          {prod.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#00873E] font-serif truncate font-semibold">
                          {prod.urduName}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">{prod.categoryName}</span>
                          <span>•</span>
                          <span>Mizaj: <strong className="text-slate-800">{prod.mizaj?.split(' ')[0]}</strong></span>
                          <span>•</span>
                          <span>{prod.variants?.length || 1} Varieties</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Pricing and Varieties */}
                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 font-serif">
                        Rs. {prod.price.toLocaleString()}
                        {prod.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through ml-1.5 font-normal">
                            Rs. {prod.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {prod.variants?.[0]?.weight || 'Standard Pack'}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => toggleProductStock(prod.id)}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1 ${
                          prod.inStock
                            ? 'bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] hover:bg-red-100 hover:text-red-800'
                            : 'bg-red-100 text-red-800 hover:bg-[#f0faf4] hover:text-[#00873E]'
                        }`}
                        title="Toggle customer checkout availability"
                      >
                        {prod.inStock ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00873E]" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-700" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleEditProduct(prod)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Edit Formulation"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDuplicateProduct(prod)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Duplicate Formulation"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/shop/${prod.id}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="View on Storefront"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-700 text-slate-400 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Orders Dispatch Queue */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-base font-bold text-slate-900 font-serif">Customer Order Queue</h3>
            <div className="text-xs text-slate-500">
              Showing live Cash on Delivery and Direct orders placed across Pakistan
            </div>
          </div>

          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No customer orders received yet. Place an order from the store to test the flow.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer & City</th>
                    <th className="p-4">Total (PKR)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-900">{order.orderRef || order.id.slice(0, 8)}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{order.customerName}</div>
                        <div className="text-slate-500 text-[11px]">{order.phone} • {order.city}</div>
                      </td>
                      <td className="p-4 font-bold text-slate-900">Rs. {order.total.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : order.status === 'Delivered'
                            ? 'bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4]'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {order.status !== 'Dispatched' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'Dispatched')}
                            className="py-1 px-2.5 rounded-lg bg-[#00873E] hover:bg-[#007335] text-white font-bold text-[10px] transition-colors"
                          >
                            Mark Dispatched
                          </button>
                        )}
                        {order.status !== 'Delivered' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                            className="py-1 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] transition-colors"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Categories Management */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Pharmacopeia Categories Taxonomy
              </h3>
              <p className="text-xs text-slate-500">
                Organize your catalog by creating and managing product categories.
              </p>
            </div>

            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create / Edit Categories</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <div 
                  key={cat.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#00873E] transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.icon || '🌿'}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4]">
                      {count} Products
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{cat.nameEn}</h4>
                  <p className="text-xs text-[#00873E] font-serif">{cat.nameUr}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {cat.description || 'Traditional Unani pharmaceutical category.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Users Directory */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-serif">Registered Users & Patients</h3>
            <p className="text-xs text-slate-500">Verified patient and customer accounts</p>
          </div>

          <div className="divide-y divide-slate-100">
            {usersList.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No user profiles recorded yet.
              </div>
            ) : (
              usersList.map((u) => (
                <div key={u.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0b2317] text-white flex items-center justify-center font-bold text-sm font-serif shrink-0">
                      {u.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{u.name || 'User'}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          u.role === 'admin' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : u.role === 'guest'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4]'
                        }`}>
                          {u.role || 'user'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{u.email} • {u.city || 'Karachi'}</p>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-500">
                    <span>Method: {u.provider === 'google' ? 'Google' : u.provider === 'anonymous' ? 'Guest' : 'Email'}</span>
                    <div className="text-[10px] text-slate-400 font-mono">ID: {u.id?.slice(0, 10)}...</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Product Upload / Edit Modal */}
      <ProductUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setEditingProduct(null);
        }}
        editingProduct={editingProduct}
        onSuccess={() => {
          setIsUploadModalOpen(false);
          setEditingProduct(null);
        }}
      />

      {/* Category Management Modal */}
      <CategoryManagementModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />

    </div>
  );
}
