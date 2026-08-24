'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { 
  User, 
  Crown, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Sparkles, 
  LogOut, 
  Clock, 
  Key, 
  ArrowRight, 
  Stethoscope,
  BookOpen,
  Edit2,
  Save,
  CheckCircle2
} from 'lucide-react';

export default function AccountPage() {
  const { user, role, token, isAdmin, isGuest, logout, updateProfile, openAuthModal, openGooglePopup } = useAuth();
  const { language, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'mizaj' | 'security'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'Karachi');

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#155e42] flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-serif text-stone-900">
            {language === 'ur' ? 'اکاؤنٹ میں داخل ہوں' : 'Sign in to Access Your Account'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === 'ur' 
              ? 'اپنے آرڈرز، نسخہ جات اور مزاج کی رپورٹ دیکھنے کے لیے لاگ ان کریں۔' 
              : 'View your remedy orders, prescription submissions, and personalized Mizaj constitution record.'}
          </p>
        </div>
        <button
          onClick={() => openAuthModal('login')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white font-bold text-sm transition-colors shadow-md"
        >
          <Key className="w-4 h-4" />
          <span>{language === 'ur' ? 'لاگ ان یا نیا اکاؤنٹ' : 'Sign In / Register'}</span>
        </button>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateProfile({ phone, address, city });
    if (res.success) {
      showToast(language === 'ur' ? 'معلومات محفوظ ہو گئیں' : 'Profile updated successfully');
      setIsEditing(false);
    } else {
      showToast(res.message || 'Failed to update profile');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header Profile Card */}
      <div className="bg-[#0e2a1f] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/40 bg-emerald-950 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-900 text-emerald-300 border border-emerald-700 flex items-center justify-center font-bold text-2xl font-serif">
                {user.name.charAt(0)}
              </div>
            )}
            
            {isAdmin && (
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-emerald-950 p-1 rounded-full shadow-md" title="Administrator">
                <Crown className="w-3.5 h-3.5 fill-current" />
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">{user.name}</h1>
              
              {/* Role Badges */}
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>Hakeem Admin</span>
                </span>
              )}

              {role === 'user' && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Patient</span>
                </span>
              )}

              {isGuest && (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-700 text-stone-300 border border-stone-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>Guest Patient</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{user.email}</span>
              </span>
              <span>•</span>
              <span className="capitalize text-emerald-300 font-medium">Auth: {user.provider} (JWT)</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {isAdmin && (
            <Link
              href="/admin"
              className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Crown className="w-4 h-4" />
              <span>Enter Hakeem Admin Panel</span>
            </Link>
          )}

          {isGuest && (
            <button
              onClick={openGooglePopup}
              className="py-2.5 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Upgrade to Google Account</span>
            </button>
          )}

          <button
            onClick={logout}
            className="py-2.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Personal Details', icon: User },
          { id: 'orders', label: 'Orders & Prescriptions', icon: Package },
          { id: 'mizaj', label: 'Mizaj Constitution Profile', icon: Stethoscope },
          { id: 'security', label: 'JWT Security & Session', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-t-xl text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#155e42] text-[#155e42] bg-emerald-50/50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 font-serif">Delivery Address & Contact</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155e42] hover:text-[#0e2a1f] px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-stone-500 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">Contact Phone</span>
                  <p className="font-semibold text-stone-800">{user.phone || 'No phone number provided'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">City / Region</span>
                  <p className="font-semibold text-stone-800">{user.city || 'Karachi, Pakistan'}</p>
                </div>
                <div className="sm:col-span-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">Default Shipping Address</span>
                  <p className="font-semibold text-stone-800">{user.address || 'No default shipping address entered yet'}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Karachi"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Street Address</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Plot #, Street, Area..."
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-4">
            <div className="p-5 bg-stone-50 rounded-3xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Apothecary Services</h4>
              <div className="space-y-2 text-xs">
                <Link
                  href="/consultation"
                  className="p-3 bg-white hover:bg-emerald-50 rounded-xl border border-stone-200 flex items-center justify-between font-semibold text-stone-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#155e42]" />
                    <span>Book Hakeem Consultation</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>

                <Link
                  href="/prescription-upload"
                  className="p-3 bg-white hover:bg-emerald-50 rounded-xl border border-stone-200 flex items-center justify-between font-semibold text-stone-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#155e42]" />
                    <span>Upload Prescription / Nuskha</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif">Recent Orders & Dispensary Dispatch</h3>
          <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
            <div className="p-4 bg-stone-50 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-stone-900">Order #TS-8941</span>
                <span className="text-xs text-stone-500 ml-2">Aug 24, 2026</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#155e42] text-xs font-bold border border-emerald-200">
                Dispatched via TCS Express
              </span>
            </div>
            <div className="p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-700">1x Pure Himalayan Salajeet Resin (20g)</span>
                <span className="font-bold text-stone-900">Rs. 3,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-700">2x Arq Kasni Khalis (500ml)</span>
                <span className="font-bold text-stone-900">Rs. 760</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                <span>Total (Cash on Delivery)</span>
                <span>Rs. 3,960</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Mizaj */}
      {activeTab === 'mizaj' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Personal Mizaj Constitution</h3>
              <p className="text-xs text-stone-500">Unani temperament assessment record</p>
            </div>
            <Link
              href="/mizaj-test"
              className="py-2 px-4 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white text-xs font-bold transition-colors"
            >
              Retake Mizaj Assessment
            </Link>
          </div>

          {user.savedMizaj ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#155e42] uppercase tracking-wider">
                  Dominant Temperament: {user.savedMizaj.constitution}
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  Assessed: {user.savedMizaj.testDate}
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900 font-serif">
                {user.savedMizaj.urduConstitution}
              </p>
              <div>
                <h5 className="text-xs font-bold text-stone-800 mb-2">Recommended Daily Formulations:</h5>
                <div className="flex flex-wrap gap-2">
                  {user.savedMizaj.recommendations.map((rec, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-semibold text-[#155e42]">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-xs text-stone-600">You have not completed your Mizaj diagnostic assessment yet.</p>
              <Link
                href="/mizaj-test"
                className="inline-block py-2.5 px-5 rounded-xl bg-[#155e42] text-white font-bold text-xs"
              >
                Start Free 3-Minute Mizaj Test
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Security */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-stone-900 font-serif">JWT Session & Role Credentials</h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Active JWT Token Status</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#155e42] font-bold text-[10px]">
                  HS256 Verified
                </span>
              </div>
              <p className="font-mono text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-stone-200 break-all select-all">
                {token || 'Token verified in cookies'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 font-semibold text-[10px] uppercase">User Role Permission</span>
                <p className="font-bold text-stone-900 mt-1 uppercase">{role || 'User'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 font-semibold text-[10px] uppercase">Authentication Provider</span>
                <p className="font-bold text-stone-900 mt-1 capitalize">{user.provider} Protocol</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
