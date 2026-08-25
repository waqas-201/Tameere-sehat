'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Stethoscope, 
  Truck, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight,
  User,
  Crown,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { 
  STORE_PHONE, 
  STORE_WHATSAPP, 
  PRODUCTS 
} from '@/lib/data';
import BrandLogo from './BrandLogo';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    language, 
    setLanguage, 
    totalCartCount, 
    setIsCartOpen, 
    setIsAiAssistantOpen
  } = useApp();

  const { 
    user, 
    role, 
    isAdmin, 
    isGuest, 
    logout, 
    openAuthModal 
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const filteredSearchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.urduName.includes(searchQuery) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.targetConcerns.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSelect = (productId: string) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    router.push(`/shop/${productId}`);
  };

  const navLinks = [
    { href: '/shop', labelEn: 'Shop Remedies', labelUr: 'دواخانہ مصنوعات' },
    { href: '/consultation', labelEn: 'Hakeem Clinic', labelUr: 'آن لائن حکیم', highlight: true },
    { href: '/mizaj-test', labelEn: 'Mizaj Test', labelUr: 'مزاج ٹیسٹ' },
    { href: '/prescription-upload', labelEn: 'Upload Rx', labelUr: 'نسخہ اپلوڈ' },
    { href: '/custom-compound', labelEn: 'Mixer', labelUr: 'مرکب بنائیں' },
    { href: '/encyclopedia', labelEn: 'Encyclopedia', labelUr: 'قاموس' },
    { href: '/about', labelEn: 'Heritage', labelUr: 'ہماری تاریخ' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs">
      
      {/* 1. Ultra-slim Micro Header Strip */}
      <div className="bg-[#0b2317] text-slate-300 text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          
          {/* Left: Trust & Free Delivery Tag */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 truncate">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] shrink-0">
              <ShieldCheck className="w-3 h-3 text-[#00873E] shrink-0" />
              <span className="hidden sm:inline">
                {language === 'ur' ? 'مستند یونانی دواخانہ' : 'Certified Unani Dawakhana'}
              </span>
              <span className="sm:hidden">
                {language === 'ur' ? 'یونانی دواخانہ' : 'Unani Dawakhana'}
              </span>
            </span>
            <span className="text-emerald-800 hidden md:inline">•</span>
            <span className="hidden md:inline text-slate-300 truncate">
              {language === 'ur' 
                ? 'مفت ہوم ڈلیوری 2,500 روپے کے آرڈر پر — پورے پاکستان میں کیش آن ڈلیوری' 
                : 'Free Delivery over Rs. 2,500 • Cash on Delivery Nationwide'}
            </span>
          </div>

          {/* Right: Order Tracking, Phone & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] shrink-0">
            <Link 
              href="/tracking"
              className="text-slate-300 hover:text-white hidden sm:flex items-center gap-1 transition-colors shrink-0"
            >
              <Truck className="w-3 h-3 text-[#00873E] shrink-0" />
              <span>{language === 'ur' ? 'پارسل ٹریکنگ' : 'Track Order'}</span>
            </Link>

            <span className="text-emerald-900 hidden sm:inline">|</span>

            <a 
              href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20need%20herbal%20consultation.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white flex items-center gap-1 font-medium shrink-0"
            >
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00873E] shrink-0" />
              <span className="hidden lg:inline font-mono">{STORE_PHONE}</span>
              <span className="lg:hidden text-[9px] sm:text-[10px]">{language === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
            </a>

            <span className="text-emerald-900">|</span>

            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="px-2 py-0.5 rounded bg-[#00873E]/30 hover:bg-[#00873E] text-white text-[10px] font-bold transition-colors shrink-0 border border-[#00873E]/50"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'اردو' : 'English'}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Left Side: Mobile Hamburger & Brand Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 flex-none">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 -ml-1 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center shrink-0 flex-none" style={{ minWidth: '140px' }}>
            <BrandLogo size="sm" />
          </Link>
        </div>

        {/* Desktop Navigation Links (Middle) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00873E] text-white shadow-xs'
                    : link.highlight
                    ? 'text-[#00873E] bg-[#f0faf4] hover:bg-[#e6f7ec] border border-[#b0e6c4]'
                    : 'text-slate-700 hover:text-[#00873E] hover:bg-slate-100'
                }`}
              >
                {language === 'ur' ? link.labelUr : link.labelEn}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Search, AI Herbalist & Shopping Bag */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Search Trigger / Bar */}
          <div ref={searchRef} className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-slate-50 rounded-full border border-[#00873E] px-2.5 py-1 w-44 sm:w-56 md:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ur' ? 'جڑی بوٹیاں، سلاجیت...' : 'Search herbs...'}
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none pl-1.5 pr-1 min-w-0"
                />
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-slate-700 hover:text-[#00873E] hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
                title="Search store"
                aria-label="Search remedies"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Instant Search Results Dropdown */}
            {isSearchOpen && filteredSearchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-2 py-1 text-[10px] font-bold text-[#00873E] uppercase tracking-wider bg-[#f0faf4] rounded">
                  {language === 'ur' ? 'تجاویز' : 'Quick Results'}
                </div>
                <div className="divide-y divide-slate-100 mt-1 max-h-60 overflow-y-auto">
                  {filteredSearchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchSelect(product.id)}
                      className="p-2 hover:bg-[#f0faf4] rounded cursor-pointer flex items-center gap-2.5 transition-colors"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-8 h-8 rounded object-cover bg-slate-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                        <p className="text-[10px] text-[#00873E] truncate">{product.urduName}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-900 shrink-0">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Herbalist button */}
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold transition-all shadow-xs shrink-0"
            title="AI Tibbi Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span className="hidden sm:inline">{language === 'ur' ? 'طبی AI' : 'AI Herbalist'}</span>
          </button>

          {/* Cart Bag Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-slate-700 hover:text-[#00873E] hover:bg-slate-100 transition-colors shrink-0 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#00873E] text-white text-[10px] font-bold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1 leading-none shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Authentication User Button / Dropdown */}
          {user ? (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full border transition-all ${
                  isAdmin 
                    ? 'border-amber-400 bg-amber-50/80 text-amber-950 hover:bg-amber-100' 
                    : 'border-[#b0e6c4] bg-[#f0faf4] text-slate-900 hover:bg-[#e6f7ec]'
                }`}
                title={user.name}
              >
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-[#00873E]/30 shrink-0" 
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00873E] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {user.name.charAt(0)}
                  </div>
                )}

                <div className={`hidden md:flex flex-col ${language === 'ur' ? 'text-right' : 'text-left'}`}>
                  <span className="text-[11px] font-bold truncate max-w-[80px] leading-tight">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-tighter">
                    {isAdmin 
                      ? (language === 'ur' ? '👑 ایڈمن' : '👑 Admin') 
                      : isGuest 
                      ? (language === 'ur' ? 'مہمان' : 'Guest') 
                      : (language === 'ur' ? 'مریض' : 'Patient')}
                  </span>
                </div>

                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className={`absolute ${language === 'ur' ? 'left-0' : 'right-0'} mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}>
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        isAdmin 
                          ? 'bg-amber-100 text-amber-900' 
                          : isGuest 
                          ? 'bg-slate-200 text-slate-700' 
                          : 'bg-[#e6f7ec] text-[#00873E]'
                      }`}>
                        {isAdmin 
                          ? (language === 'ur' ? 'چیف حکیم ایڈمن' : 'Chief Hakeem Admin') 
                          : isGuest 
                          ? (language === 'ur' ? 'عارضی سیشن' : 'Guest Session') 
                          : (language === 'ur' ? 'مصدقہ مریض' : 'Verified Patient')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-0.5 text-xs">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-amber-900 font-bold bg-amber-50 hover:bg-amber-100 transition-colors"
                      >
                        <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{language === 'ur' ? 'حکیم ایڈمن پینل' : 'Hakeem Admin Panel'}</span>
                      </Link>
                    )}

                    <Link
                      href="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-700 hover:bg-[#f0faf4] hover:text-[#00873E] transition-colors font-medium"
                    >
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{language === 'ur' ? 'میرا اکاؤنٹ اور آرڈرز' : 'My Account & Orders'}</span>
                    </Link>

                    <Link
                      href="/mizaj-test"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-700 hover:bg-[#f0faf4] hover:text-[#00873E] transition-colors font-medium"
                    >
                      <Stethoscope className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{language === 'ur' ? 'مزاج کی تشخیص' : 'Mizaj Assessment'}</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 p-2 rounded-xl text-rose-700 hover:bg-rose-50 transition-colors font-medium ${
                        language === 'ur' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{language === 'ur' ? 'لاگ آؤٹ' : 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold transition-all shadow-xs shrink-0"
              title="Sign In / Register"
            >
              <User className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="hidden sm:inline">{language === 'ur' ? 'لاگ ان' : 'Sign In'}</span>
            </button>
          )}

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          
          {/* Mobile User Auth Banner */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border border-[#00873E]/30 shrink-0" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#00873E] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {isAdmin 
                        ? (language === 'ur' ? '👑 حکیم ایڈمن' : '👑 Hakeem Admin') 
                        : isGuest 
                        ? (language === 'ur' ? 'عارضی سیشن' : 'Guest Session') 
                        : (language === 'ur' ? 'مصدقہ مریض' : 'Verified Patient')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={isAdmin ? "/admin" : "/account"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2.5 rounded-lg bg-[#00873E] text-white text-[11px] font-bold"
                  >
                    {isAdmin 
                      ? (language === 'ur' ? 'ایڈمن' : 'Admin') 
                      : (language === 'ur' ? 'اکاؤنٹ' : 'Account')}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {language === 'ur' ? 'تعمیرِ صحت میں خوش آمدید' : 'Welcome to Tameer-e-Sehat'}
                  </span>
                  <div className="text-[10px] text-slate-500">
                    {language === 'ur' ? 'نسخہ جات اور آرڈرز دیکھنے کے لیے لاگ ان کریں' : 'Sign in for saved prescriptions & orders'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-3 rounded-lg bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold shrink-0 transition-colors"
                >
                  {language === 'ur' ? 'لاگ ان' : 'Sign In'}
                </button>
              </div>
            )}
          </div>

          {/* Quick Search on Mobile */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ur' ? 'جڑی بوٹیاں، سلاجیت یا عرق تلاش کریں...' : 'Search remedies, herbs, Arqiyat...'}
              className={`w-full bg-slate-100 text-slate-800 text-xs py-2 rounded-lg border border-slate-200 focus:border-[#00873E] outline-none ${
                language === 'ur' ? 'pr-8 pl-3' : 'pl-8 pr-3'
              }`}
            />
            <Search className={`w-3.5 h-3.5 text-slate-400 absolute top-2.5 ${language === 'ur' ? 'right-2.5' : 'left-2.5'}`} />
          </div>

          {searchQuery.trim().length > 1 && filteredSearchResults.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-2 divide-y divide-slate-200">
              {filteredSearchResults.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSearchSelect(product.id)}
                  className="py-1.5 flex items-center justify-between text-xs cursor-pointer"
                >
                  <span className="font-semibold text-slate-800 truncate">
                    {language === 'ur' ? product.urduName : product.name}
                  </span>
                  <span className="font-bold text-[#00873E] ml-2 shrink-0">
                    {language === 'ur' ? `${product.price.toLocaleString()} روپے` : `Rs. ${product.price.toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl transition-colors flex items-center justify-between font-bold ${
                    isActive 
                      ? 'bg-[#00873E] text-white' 
                      : link.highlight
                      ? 'bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4]'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{language === 'ur' ? link.labelUr : link.labelEn}</span>
                  <ChevronRight className={`w-3 h-3 opacity-60 shrink-0 ${language === 'ur' ? 'rotate-180 mr-1' : 'ml-1'}`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              href="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Stethoscope className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'ur' ? 'حکیم مشورہ' : 'Hakeem Clinic'}</span>
            </Link>

            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20need%20herbal%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'ur' ? 'واٹس ایپ' : 'WhatsApp'}</span>
            </a>
          </div>

        </div>
      )}

    </header>
  );
}
