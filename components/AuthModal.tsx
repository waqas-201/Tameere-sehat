'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  UserCheck,
  CheckCircle2,
  Crown,
  KeyRound
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    login, 
    register, 
    continueAsGuest,
    openGooglePopup,
    isLoading 
  } = useAuth();
  const { language, showToast } = useApp();

  const [activeTabOverride, setActiveTabOverride] = useState<'login' | 'register' | 'guest' | null>(null);
  const activeTab = activeTabOverride ?? authModalTab;

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const setActiveTab = (tab: 'login' | 'register' | 'guest') => {
    setActiveTabOverride(tab);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await login(email, password);
    if (res.success) {
      showToast(res.message || (language === 'ur' ? 'کامیابی سے لاگ ان ہو گئے!' : 'Signed in successfully!'));
      closeAuthModal();
    } else {
      setErrorMessage(res.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await register(name, email, password, phone, city);
    if (res.success) {
      showToast(res.message || (language === 'ur' ? 'اکاؤنٹ بن گیا اور لاگ ان مکمل!' : 'Account registered and logged in!'));
      closeAuthModal();
    } else {
      setErrorMessage(res.message || 'Registration failed. Please check form data.');
    }
  };

  const handleGuestSubmit = async () => {
    setErrorMessage(null);
    const res = await continueAsGuest();
    if (res.success) {
      showToast(language === 'ur' ? 'مہمان مریض کے طور پر جاری ہے' : 'Browsing as Guest');
      closeAuthModal();
    } else {
      setErrorMessage(res.message || 'Guest session could not be created');
    }
  };

  // Quick Demo Auto-fill Handlers
  const fillAdminCredentials = () => {
    setEmail('admin@tameersehat.pk');
    setPassword('hakeem1990');
    setActiveTab('login');
    setErrorMessage(null);
  };

  const fillPatientCredentials = () => {
    setEmail('patient@tameersehat.pk');
    setPassword('patient123');
    setActiveTab('login');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#0e2a1f] text-white p-5 sm:p-6 relative border-b border-emerald-900 shrink-0">
          <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-900/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#155e42] border border-emerald-500/40 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  JWT Secured Auth
                </span>
                <span className="text-[10px] text-emerald-300">256-Bit Encrypted</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight mt-0.5">
                {language === 'ur' ? 'تعمیرِ صحت ممبر پورٹل' : 'Tameer-e-Sehat Portal'}
              </h2>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 bg-stone-50 shrink-0">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'login'
                ? 'border-[#155e42] text-[#155e42] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'لاگ ان (Sign In)' : 'Sign In'}
          </button>
          
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'register'
                ? 'border-[#155e42] text-[#155e42] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'نیا اکاؤنٹ (Register)' : 'New Account'}
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('guest'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'guest'
                ? 'border-[#155e42] text-[#155e42] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'مہمان (Guest)' : 'Guest Mode'}
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Google Social Sign-In Button */}
          <button
            type="button"
            onClick={openGooglePopup}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-blue-400 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-xs transition-all"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{language === 'ur' ? 'گوگل اکاؤنٹ سے لاگ ان کریں' : 'Continue with Google Account'}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-stone-400">
              {language === 'ur' ? 'یا ای میل کے ذریعے' : 'Or with Email & JWT'}
            </span>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <X className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'ur' ? 'ای میل ایڈریس' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="patient@tameersehat.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-700">
                    {language === 'ur' ? 'پاس ورڈ' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to registered email in demo mode.')}
                    className="text-[11px] font-semibold text-[#155e42] hover:underline"
                  >
                    {language === 'ur' ? 'پاس ورڈ بھول گئے؟' : 'Forgot Password?'}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-9 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying...' : (language === 'ur' ? 'لاگ ان کریں (Sign In)' : 'Sign In with JWT')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'ur' ? 'پورا نام' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zahid Mahmood"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'ur' ? 'ای میل ایڈریس' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    {language === 'ur' ? 'فون نمبر (WhatsApp)' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    <input
                      type="tel"
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-2 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    {language === 'ur' ? 'شہر' : 'City'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                    <input
                      type="text"
                      placeholder="Karachi, Lahore..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs pl-8 pr-2 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'ur' ? 'پاس ورڈ (کم از کم 6 حروف)' : 'Password (min 6 characters)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-9 py-2.5 rounded-xl border border-stone-200 focus:border-[#155e42] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating...' : (language === 'ur' ? 'اکاؤنٹ بنائیں اور شروع کریں' : 'Create Patient Account')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 3: GUEST MODE */}
          {activeTab === 'guest' && (
            <div className="space-y-4 py-1">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-2">
                <h4 className="text-xs font-bold text-[#155e42] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Instant Guest Access (No Password Required)</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Continue immediately to order remedies, take the Mizaj assessment, or consult with a Hakeem. You can upgrade to a permanent account anytime with 1 click.
                </p>
                <ul className="text-[11px] text-stone-600 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#199b50]" />
                    <span>Instant COD Order Placement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#199b50]" />
                    <span>Free Mizaj Constitution Diagnosis</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleGuestSubmit}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ur' ? 'بطور مہمان جاری رکھیں' : 'Continue as Guest'}</span>
              </button>
            </div>
          )}

          {/* Quick Demo 1-Click Role Switcher */}
          <div className="pt-3 border-t border-stone-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              ⚡ Quick 1-Click Demo Accounts (Instant Test)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-left transition-colors group flex items-start gap-2"
              >
                <Crown className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-amber-900 truncate">Hakeem Admin</div>
                  <div className="text-[10px] text-amber-700 truncate">Full Store & Clinical Rights</div>
                </div>
              </button>

              <button
                type="button"
                onClick={fillPatientCredentials}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-colors group flex items-start gap-2"
              >
                <User className="w-4 h-4 text-[#155e42] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#155e42] truncate">Patient User</div>
                  <div className="text-[10px] text-emerald-700 truncate">Orders & Mizaj History</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer Security Badge */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 shrink-0">
          <div className="flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-[#199b50]" />
            <span>Stateless HS256 JWT Authorization</span>
          </div>
          <span className="text-stone-400">Tameer-e-Sehat v2.4</span>
        </div>

      </div>
    </div>
  );
}
