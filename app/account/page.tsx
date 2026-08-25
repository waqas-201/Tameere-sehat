'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
  const { user, role, token, isAdmin, isGuest, logout, updateProfile, openAuthModal, loginWithGoogle } = useAuth();
  const { language, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'mizaj' | 'security'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'Karachi');
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const userId = user?.id;

  // Fetch user orders from Firestore when orders tab opens
  useEffect(() => {
    async function fetchOrders() {
      if (!userId || activeTab !== 'orders') return;
      setLoadingOrders(true);
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', userId)
        );
        const snapshot = await getDocs(q);
        const fetched: any[] = [];
        snapshot.forEach(doc => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        setUserOrders(fetched);
      } catch (e) {
        console.error('Error fetching orders:', e);
      } finally {
        setLoadingOrders(false);
      }
    }
    fetchOrders();
  }, [userId, activeTab]);

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
              <span className={`absolute -bottom-1 ${language === 'ur' ? '-left-1' : '-right-1'} bg-amber-400 text-emerald-950 p-1 rounded-full shadow-md`} title="Administrator">
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
                  <span>{language === 'ur' ? 'حکیم ایڈمن' : 'Hakeem Admin'}</span>
                </span>
              )}

              {role === 'user' && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{language === 'ur' ? 'تصدیق شدہ مریض' : 'Verified Patient'}</span>
                </span>
              )}

              {isGuest && (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-700 text-stone-300 border border-stone-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{language === 'ur' ? 'مہمان مریض' : 'Guest Patient'}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{user.email}</span>
              </span>
              <span>•</span>
              <span className="capitalize text-emerald-300 font-medium">
                {language === 'ur' ? 'محفوظ اکاؤنٹ' : 'Secured Account'}
              </span>
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
              <span>{language === 'ur' ? 'حکیم ایڈمن پینل' : 'Enter Hakeem Admin Panel'}</span>
            </Link>
          )}

          {isGuest && (
            <button
              onClick={loginWithGoogle}
              className="py-2.5 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'ur' ? 'گوگل سے منسلک کریں' : 'Link with Google Account'}</span>
            </button>
          )}

          <button
            onClick={logout}
            className="py-2.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'لاگ آؤٹ' : 'Sign Out'}</span>
          </button>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: language === 'ur' ? 'ذاتی معلومات و پتہ' : 'Personal Details', icon: User },
          { id: 'orders', label: language === 'ur' ? 'آرڈرز و ادویات' : 'Orders & Prescriptions', icon: Package },
          { id: 'mizaj', label: language === 'ur' ? 'مزاج کی تشخیص و رپورٹ' : 'Mizaj Constitution Profile', icon: Stethoscope },
          { id: 'security', label: language === 'ur' ? 'حفاظت و سیکیورٹی' : 'Security & Privacy', icon: ShieldCheck }
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
              <h3 className="text-base font-bold text-stone-900 font-serif">
                {language === 'ur' ? 'ترسیل کا پتہ اور رابطہ' : 'Delivery Address & Contact'}
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155e42] hover:text-[#0e2a1f] px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'تبدیل کریں' : 'Edit Details'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-stone-500 hover:underline"
                >
                  {language === 'ur' ? 'منسوخ' : 'Cancel'}
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">
                    {language === 'ur' ? 'رابطہ نمبر' : 'Contact Phone'}
                  </span>
                  <p className="font-semibold text-stone-800">
                    {user.phone || (language === 'ur' ? 'کوئی نمبر درج نہیں' : 'No phone number provided')}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">
                    {language === 'ur' ? 'شہر' : 'City / Region'}
                  </span>
                  <p className="font-semibold text-stone-800">{user.city || 'Karachi, Pakistan'}</p>
                </div>
                <div className="sm:col-span-2 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">
                    {language === 'ur' ? 'ترسیل کا پتہ' : 'Default Shipping Address'}
                  </span>
                  <p className="font-semibold text-stone-800">
                    {user.address || (language === 'ur' ? 'کوئی پتہ درج نہیں ہے' : 'No default shipping address entered yet')}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      {language === 'ur' ? 'واٹس ایپ فون نمبر' : 'Phone Number (WhatsApp)'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      {language === 'ur' ? 'شہر' : 'City'}
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Karachi"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      {language === 'ur' ? 'گلی و مکان کا پتہ' : 'Street Address'}
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={language === 'ur' ? 'مکان نمبر، گلی، علاقہ...' : 'House/Plot #, Street, Area...'}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'تبدیلیاں محفوظ کریں' : 'Save Changes'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-4">
            <div className="p-5 bg-stone-50 rounded-3xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                {language === 'ur' ? 'دواخانہ خدمات' : 'Apothecary Services'}
              </h4>
              <div className="space-y-2 text-xs">
                <Link
                  href="/consultation"
                  className="p-3 bg-white hover:bg-emerald-50 rounded-xl border border-stone-200 flex items-center justify-between font-semibold text-stone-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#155e42]" />
                    <span>{language === 'ur' ? 'طبی مشورہ و اپائنٹمنٹ' : 'Book Hakeem Consultation'}</span>
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 text-stone-400 ${language === 'ur' ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/prescription-upload"
                  className="p-3 bg-white hover:bg-emerald-50 rounded-xl border border-stone-200 flex items-center justify-between font-semibold text-stone-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#155e42]" />
                    <span>{language === 'ur' ? 'نسخہ و رپورٹ ارسال کریں' : 'Upload Prescription / Nuskha'}</span>
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 text-stone-400 ${language === 'ur' ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif">
            {language === 'ur' ? 'حالیہ آرڈرز اور ادویات کی ترسیل' : 'Recent Orders & Dispensary Dispatch'}
          </h3>
          {loadingOrders ? (
            <div className="p-8 text-center text-xs text-stone-500">
              {language === 'ur' ? 'آرڈرز لوڈ ہو رہے ہیں...' : 'Loading your orders...'}
            </div>
          ) : userOrders.length > 0 ? (
            <div className="space-y-3">
              {userOrders.map((ord) => (
                <div key={ord.id} className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
                  <div className="p-4 bg-stone-50 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-stone-900 font-mono">
                        {language === 'ur' ? `آرڈر نمبر: ${ord.id.slice(0, 8)}` : `Order #${ord.id.slice(0, 8)}`}
                      </span>
                      <span className="text-xs text-stone-500 ml-2">{ord.createdAt?.slice(0, 10)}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#155e42] text-xs font-bold border border-emerald-200">
                      {ord.status || (language === 'ur' ? 'موصول شدہ' : 'Received')}
                    </span>
                  </div>
                  <div className="p-4 text-xs space-y-2">
                    <div className="flex justify-between font-bold text-stone-900">
                      <span>{language === 'ur' ? 'کل رقم:' : 'Total'} ({ord.paymentMethod?.toUpperCase() || 'COD'})</span>
                      <span>
                        {language === 'ur' ? `روپے ${ord.total?.toLocaleString()}` : `Rs. ${ord.total?.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
              {language === 'ur' ? 'ابھی تک اس اکاؤنٹ سے کوئی آرڈر نہیں دیا گیا۔' : 'No orders placed yet under this account.'}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Mizaj */}
      {activeTab === 'mizaj' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                {language === 'ur' ? 'ذاتی جسمانی مزاج کی تفصیل' : 'Personal Mizaj Constitution'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'ur' ? 'یونانی اصولوں کے تحت مزاج کی تشخیص شدہ رپورٹ' : 'Unani temperament assessment record on file'}
              </p>
            </div>
            <Link
              href="/mizaj-test"
              className="py-2 px-4 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white text-xs font-bold transition-colors"
            >
              {language === 'ur' ? 'مزاج ٹیسٹ دوبارہ دیں' : 'Retake Mizaj Assessment'}
            </Link>
          </div>

          {user.savedMizaj ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#155e42] uppercase tracking-wider">
                  {language === 'ur' ? `غالب مزاج: ${user.savedMizaj.urduConstitution || user.savedMizaj.constitution}` : `Dominant Temperament: ${user.savedMizaj.constitution}`}
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  {language === 'ur' ? `تاریخ ٹیسٹ: ${user.savedMizaj.testDate}` : `Assessed: ${user.savedMizaj.testDate}`}
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900 font-serif">
                {user.savedMizaj.urduConstitution}
              </p>
              <div>
                <h5 className="text-xs font-bold text-stone-800 mb-2">
                  {language === 'ur' ? 'روزمرہ کی مفید و موافق غذائیں اور ادویات:' : 'Recommended Daily Formulations:'}
                </h5>
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
              <p className="text-xs text-stone-600">
                {language === 'ur'
                  ? 'آپ نے ابھی تک اپنا مفت آن لائن مزاج ٹیسٹ مکمل نہیں کیا۔'
                  : 'You have not completed your Mizaj diagnostic assessment yet.'}
              </p>
              <Link
                href="/mizaj-test"
                className="inline-block py-2.5 px-5 rounded-xl bg-[#155e42] text-white font-bold text-xs"
              >
                {language === 'ur' ? '3 منٹ کا مفت مزاج ٹیسٹ شروع کریں' : 'Start Free 3-Minute Mizaj Test'}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Security */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-stone-900 font-serif">
            {language === 'ur' ? 'سیکیورٹی اور اکاؤنٹ تحفظ' : 'Security & Account Protection'}
          </h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">
                  {language === 'ur' ? 'اکاؤنٹ شناختی کوڈ' : 'Account Reference ID'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#155e42] font-bold text-[10px]">
                  {language === 'ur' ? 'تصدیق شدہ و فعال' : 'Verified & Active'}
                </span>
              </div>
              <p className="font-mono text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-stone-200 break-all select-all">
                {user.id}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 font-semibold text-[10px] uppercase">
                  {language === 'ur' ? 'اکاؤنٹ کا درجہ' : 'Account Level'}
                </span>
                <p className="font-bold text-stone-900 mt-1 uppercase">
                  {role === 'admin' ? (language === 'ur' ? 'حکیم ایڈمن' : 'Admin') : (language === 'ur' ? 'مریض' : 'Patient')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 font-semibold text-[10px] uppercase">
                  {language === 'ur' ? 'لاگ ان کا طریقہ' : 'Login Method'}
                </span>
                <p className="font-bold text-stone-900 mt-1 capitalize">
                  {user.provider === 'google' 
                    ? (language === 'ur' ? 'گوگل اکاؤنٹ' : 'Google Account') 
                    : user.provider === 'guest' 
                    ? (language === 'ur' ? 'مہمان رسائی' : 'Guest Access') 
                    : (language === 'ur' ? 'ای میل اور پاس ورڈ' : 'Email & Password')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
