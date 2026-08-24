'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { 
  Crown, 
  ShieldCheck, 
  Package, 
  FileText, 
  Stethoscope, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Edit3, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data';

interface OrderItem {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  total: number;
  status: string;
  paymentMethod: string;
  date: string;
  items: string;
}

export default function AdminDashboardPage() {
  const { user, role, token, isAdmin, login, logout, openAuthModal } = useAuth();
  const { language, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'prescriptions' | 'consultations' | 'inventory' | 'users'>('orders');
  const [adminData, setAdminData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [productsState, setProductsState] = useState(PRODUCTS);

  // Quick Admin Login Helper
  const handleQuickAdminLogin = async () => {
    const res = await login('admin@tameersehat.pk', 'hakeem1990');
    if (res.success) {
      showToast('Authenticated as Chief Hakeem Admin (JWT Signed)');
    } else {
      showToast('Admin login failed');
    }
  };

  // Fetch admin stats when admin is authenticated
  useEffect(() => {
    async function fetchAdminStats() {
      if (!token || !isAdmin) return;
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/overview', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setAdminData(json.data);
        }
      } catch (e) {
        console.error('Failed to load admin stats:', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdminStats();
  }, [token, isAdmin]);

  // If not admin, show secure login gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-stone-100">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
              Restricted Area • Admin Role Required
            </span>
            <h1 className="text-2xl font-bold font-serif text-stone-900">
              Hakeem Admin Control Portal
            </h1>
            <p className="text-xs text-stone-600">
              This area is strictly restricted to certified Dawakhana administrators for managing patient consultations, prescription quotes, inventory, and order dispatch.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleQuickAdminLogin}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Sign In as Chief Hakeem (1-Click Demo)</span>
            </button>

            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
            >
              Manual Admin Login with Email & Password
            </button>
          </div>

          <div className="text-[11px] text-stone-400 border-t border-stone-100 pt-4">
            Default credentials: <span className="font-mono text-stone-600">admin@tameersehat.pk / hakeem1990</span>
          </div>
        </div>
      </div>
    );
  }

  // Toggle inStock state for a product in inventory tab
  const toggleStock = (id: string) => {
    setProductsState(prev => prev.map(p => {
      if (p.id === id) {
        const updated = !p.inStock;
        showToast(`${p.name} marked as ${updated ? 'In Stock' : 'Out of Stock'}`);
        return { ...p, inStock: updated };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#0e2a1f] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-lg shrink-0">
            <Crown className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                Apothecary Management Suite
              </span>
              <span className="text-xs text-emerald-400 font-semibold">JWT Role: Administrator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
              Chief Tabib & Store Operations Center
            </h1>
            <p className="text-xs text-emerald-200/80">
              Logged in as <span className="font-semibold text-white">{user?.name}</span> ({user?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            className="py-2.5 px-4 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          <button
            onClick={logout}
            className="py-2.5 px-4 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#155e42] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Rs. {adminData?.analytics?.totalRevenuePkr?.toLocaleString() || '846,500'}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% from last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Orders in Queue</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            {adminData?.analytics?.pendingOrders || '14'} Pending
          </div>
          <div className="text-[11px] text-blue-600 font-semibold">
            COD & Courier Dispatch Ready
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Prescriptions</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            {adminData?.analytics?.prescriptionsPending || '5'} For Review
          </div>
          <div className="text-[11px] text-amber-700 font-semibold">
            Needs Tabib Formulation Quote
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Registered Patients</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            {adminData?.users?.length || '284'} Patients
          </div>
          <div className="text-[11px] text-purple-700 font-semibold">
            Google, Email & Guest Auth
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'orders', label: 'Order Dispatch Queue', count: 3, icon: Package },
          { id: 'prescriptions', label: 'Prescriptions / Nuskha', count: 2, icon: FileText },
          { id: 'consultations', label: 'Hakeem Consultations', count: 2, icon: Stethoscope },
          { id: 'inventory', label: 'Herbal Inventory & Pricing', count: productsState.length, icon: Edit3 },
          { id: 'users', label: 'User Directory & Guests', count: adminData?.users?.length || 2, icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-t-xl text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#155e42] text-[#155e42] bg-emerald-50/60'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-[#155e42] text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Orders Dispatch */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-base font-bold text-stone-900 font-serif">Customer Orders</h3>
            <div className="text-xs text-stone-500">
              Showing recent nationwide Cash on Delivery & Online orders
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] font-bold tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer & City</th>
                  <th className="p-4">Remedies / Items</th>
                  <th className="p-4">Total (PKR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {(adminData?.recentOrders || []).map((order: OrderItem) => (
                  <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-stone-900">{order.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-stone-800">{order.customerName}</div>
                      <div className="text-stone-500 text-[11px]">{order.phone} • {order.city}</div>
                    </td>
                    <td className="p-4 text-stone-700 max-w-xs">{order.items}</td>
                    <td className="p-4 font-bold text-stone-900">Rs. {order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Pending Verification'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : order.status === 'Dispatched'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => showToast(`Order ${order.id} verified & marked as Dispatched`)}
                        className="py-1 px-2.5 rounded-lg bg-[#155e42] hover:bg-[#0e2a1f] text-white font-bold text-[10px] transition-colors"
                      >
                        Dispatch via Courier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(adminData?.pendingPrescriptions || []).map((rx: any) => (
            <div key={rx.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {rx.id}
                </span>
                <span className="text-xs text-stone-400">{rx.date}</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-stone-900">{rx.patientName} ({rx.city})</h4>
                <p className="text-xs text-stone-500">Phone: {rx.phone}</p>
                <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200 mt-2">
                  <span className="font-semibold text-stone-900">Symptoms & Condition:</span> {rx.symptoms}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <span className="text-xs font-semibold text-amber-700">{rx.status}</span>
                <a
                  href={`https://wa.me/${rx.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(rx.patientName)},%20this%20is%20Hakeem%20from%20Tameer-e-Sehat.%20We%20reviewed%20your%20prescription.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Quote via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Consultations */}
      {activeTab === 'consultations' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden divide-y divide-stone-100">
          {(adminData?.activeConsultations || []).map((cons: any) => (
            <div key={cons.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#155e42] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {cons.id}
                  </span>
                  <span className="text-xs font-bold text-stone-900">{cons.patientName} (Age {cons.age})</span>
                  <span className="text-xs text-stone-400">• {cons.city}</span>
                </div>
                <div className="text-xs text-stone-700">
                  <span className="font-semibold">Issue:</span> {cons.issue}
                </div>
                <div className="text-xs text-emerald-800 font-semibold">
                  Mode: {cons.mode} • Time: {cons.scheduledTime}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Consultation ${cons.id} marked as completed`)}
                  className="py-2 px-3.5 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Mark Completed</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Inventory */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 font-serif">Dawakhana Inventory & Formulations</h3>
            <span className="text-xs text-stone-500">{productsState.length} Master Formulations</span>
          </div>

          <div className="divide-y divide-stone-100">
            {productsState.map(product => (
              <div key={product.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100" 
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{product.name}</h4>
                    <p className="text-[11px] text-[#155e42] truncate">{product.urduName}</p>
                    <span className="text-[10px] text-stone-500 uppercase">{product.categoryName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-stone-900">Rs. {product.price}</div>
                    <div className="text-[10px] text-stone-500">{product.variants[0]?.weight}</div>
                  </div>

                  <button
                    onClick={() => toggleStock(product.id)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors ${
                      product.inStock
                        ? 'bg-emerald-100 text-[#155e42] hover:bg-red-100 hover:text-red-700'
                        : 'bg-red-100 text-red-700 hover:bg-emerald-100 hover:text-[#155e42]'
                    }`}
                  >
                    {product.inStock ? 'In Stock (Click to Disable)' : 'Out of Stock (Click to Enable)'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Users & Guests */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900 font-serif">Registered Users, Admins & Guests</h3>
            <p className="text-xs text-stone-500">Managed via stateless JWT session credentials</p>
          </div>

          <div className="divide-y divide-stone-100">
            {(adminData?.users || []).map((u: any) => (
              <div key={u.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                <div className="flex items-center gap-3">
                  <img 
                    src={u.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name)}`} 
                    alt={u.name} 
                    className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{u.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        u.role === 'admin' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : u.role === 'guest'
                          ? 'bg-stone-200 text-stone-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">{u.email} • {u.city || 'Karachi'}</p>
                  </div>
                </div>

                <div className="text-right text-[11px] text-stone-500">
                  <span>Provider: {u.provider}</span>
                  <div className="text-[10px] text-stone-400 font-mono">ID: {u.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
