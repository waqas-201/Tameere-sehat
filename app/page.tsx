'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Stethoscope, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  Award, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  Clock, 
  Heart, 
  Flame, 
  FileText, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { PRODUCTS, STORE_PHONE, STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { language, addToCart, setIsAiAssistantOpen } = useApp();

  const featuredRemedies = PRODUCTS.slice(0, 6);
  const signatureShilajit = PRODUCTS.find(p => p.id === 'skardu-salajeet-gold') || PRODUCTS[2];

  const healthConcerns = [
    {
      titleEn: 'Vitality & Nerve Strength',
      titleUr: 'قوت و اعصابی توانائی',
      descEn: 'Pure Shilajit, Zafran & Asgandh Nagori',
      descUr: 'خالص سلاجیت، زعفران اور اسگندھ ناگوری',
      category: 'honey-shifa',
      icon: Flame,
      color: 'bg-amber-900',
      tag: 'High Potency'
    },
    {
      titleEn: 'Skin, Burns & Eczema',
      titleUr: 'جلد، خارش اور چنبل',
      descEn: 'Authentic Tahiri Marham & Neem Oils',
      descUr: 'مستند طاہری مرہم اور خالص روغنیات',
      category: 'herbal-oils',
      icon: Leaf,
      color: 'bg-emerald-900',
      tag: 'Heritage 1990'
    },
    {
      titleEn: 'Liver, Stomach & Acidity',
      titleUr: 'جگر کی گرمی اور معدہ',
      descEn: 'Steam Distilled Arq Kasni & Jawarish',
      descUr: 'مقطر عرقِ کاسنی اور جوارش کمونی',
      category: 'arqiyat',
      icon: Sparkles,
      color: 'bg-teal-900',
      tag: 'Pure Distillate'
    },
    {
      titleEn: 'Kidney Stones & Urine Relief',
      titleUr: 'گردہ و مثانہ کی پتھری',
      descEn: 'Kushta Hajr-ul-Yahood & Stonil Safoof',
      descUr: 'کشتہ حجر الیہود اور اسٹونل کورس',
      category: 'health-courses',
      icon: ShieldCheck,
      color: 'bg-stone-800',
      tag: 'Clinically Proven'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative bg-[#0e2a1f] text-white overflow-hidden pt-8 pb-14 lg:py-20 border-b border-emerald-950">
        
        {/* Subtle Ambient Solid Background Accents */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-900/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heritage & Dual Gateways */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-semibold max-w-full truncate">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                <span className="truncate">
                  {language === 'ur' ? '34 سالہ مستند یونانی دواخانہ — کراچی' : 'Est. 1990 • Certified Unani Dawakhana'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.2]">
                {language === 'ur' ? (
                  <>
                    حقیقی یونانی طب اور <span className="text-emerald-400 italic">100% خالص</span> نباتات
                  </>
                ) : (
                  <>
                    Classical Unani Wisdom & <span className="text-emerald-400 italic">100% House-Made</span> Remedies
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {language === 'ur'
                  ? 'سٹیفائیڈ حکماء کی زیرِ نگرانی تیار کردہ طاہری مرہم، خالص ہمالیائی سلاجیت، مقطر عرقِیات اور نبوی کورسز۔ پاکستان بھر میں کیش آن ڈلیوری اور مفت حکیمانہ مشورہ۔'
                  : 'Experience time-honored Unani pharmacopeia crafted without steroids or artificial additives. Consult our certified Hakims online or explore our laboratory-formulated therapeutic botanicals.'}
              </p>

              {/* Primary Dual Action Gateways */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
                
                {/* Gateway 1: E-Commerce Store */}
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/40 transition-all hover:scale-102"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'ur' ? 'دواخانہ مصنوعات خریدیں' : 'Explore House Remedies'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Gateway 2: Hakeem Consultation */}
                <Link
                  href="/consultation"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm flex items-center justify-center gap-2.5 backdrop-blur-xs border border-white/20 transition-all hover:scale-102"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'آن لائن حکیم سے معائنہ کروائیں' : 'Book Hakeem Consult'}</span>
                </Link>

              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-900/60 max-w-lg mx-auto lg:mx-0 text-center">
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-white font-serif">100k+</div>
                  <div className="text-[11px] text-stone-400">Patients Treated</div>
                </div>
                <div className="space-y-0.5 border-x border-emerald-900/80">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-serif">100%</div>
                  <div className="text-[11px] text-stone-400">Pure & Steroid Free</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-serif">4.9 ★</div>
                  <div className="text-[11px] text-stone-400">Verified Rating</div>
                </div>
              </div>

            </div>

            {/* Right Column: Signature Hero Product Highlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900/90 rounded-3xl p-6 border border-emerald-700/40 shadow-2xl backdrop-blur-md relative overflow-hidden group">
                
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    <span>Apothecary Signature</span>
                  </span>
                  <span className="bg-emerald-950 text-emerald-300 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-emerald-800">
                    Grade A+ Skardu
                  </span>
                </div>

                <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-4 bg-stone-800">
                  <img
                    src={signatureShilajit.image}
                    alt={signatureShilajit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-stone-950/40" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-lg font-bold">
                      {signatureShilajit.mizaj}
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">
                      Sun-Purified (Aftaabi)
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white leading-snug">
                      {language === 'ur' ? signatureShilajit.urduName : signatureShilajit.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                      {language === 'ur' ? signatureShilajit.shortDescUrdu : signatureShilajit.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                    <div>
                      <div className="text-xs text-stone-400">Starting from</div>
                      <div className="text-2xl font-black text-emerald-400 font-serif">
                        Rs. {signatureShilajit.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/shop/${signatureShilajit.id}`}
                        className="px-4 py-2.5 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. DEDICATED HEALTH NEED PATHWAYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            {language === 'ur' ? 'مرض کے مطابق علاج' : 'Curated Therapeutics'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
            {language === 'ur' ? 'اپنی صحت کی ضرورت کے مطابق انتخاب کریں' : 'Shop by Health Concern & Mizaj'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Targeted house-made formulations compounded with classic Unani herbal synergies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {healthConcerns.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={`/shop?category=${item.category}`}
                className="group relative bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-[#199b50] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#155e42] group-hover:bg-[#155e42] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#155e42] transition-colors">
                      {language === 'ur' ? item.titleUr : item.titleEn}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {language === 'ur' ? item.descUr : item.descEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#199b50] pt-4 mt-4 border-t border-stone-100 group-hover:translate-x-1 transition-transform">
                  <span>{language === 'ur' ? 'ادویات دیکھیں' : 'View Remedies'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. HOUSE-MADE BESTSELLERS CATALOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Shop All Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
              {language === 'ur' ? 'دواخانہ کے آزمودہ نسخے' : 'House-Made Bestsellers'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {language === 'ur' ? 'ہمارے سب سے مقبول و مستند قدرتی علاج' : 'Proven Herbal Formulations'}
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>{language === 'ur' ? 'تمام ادویات دیکھیں (Shop Full Store)' : 'Explore All Products'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRemedies.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner to Visit Full Shop */}
        <div className="mt-12 p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-emerald-950">
              {language === 'ur' ? 'کیا آپ کو کوئی مخصوص جڑی بوٹی یا نسخہ درکار ہے؟' : 'Looking for a specific herb, powder or distillate?'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800">
              Browse our full catalog of 200+ raw medicinal herbs, Arqiyat, Majun, and Tahiri Balms.
            </p>
          </div>

          <Link
            href="/shop"
            className="px-6 py-3 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shrink-0 transition-colors"
          >
            <span>{language === 'ur' ? 'مکمل سٹور کھولیں' : 'Browse Complete Store'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* 4. ONLINE HAKEEM VIRTUAL CLINIC SPOTLIGHT */}
      <section className="bg-[#0b1e16] text-white py-16 border-y border-emerald-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hakeem Profile Snapshot */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Virtual Tele-Tibb Clinic</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight">
                {language === 'ur' 
                  ? 'گھر بیٹھے مستند حکیم صاحب سے نبض، مزاج اور بیماری کا معائنہ کروائیں' 
                  : 'Get Personal Consultation & Custom Nuskha from Senior Hakims'}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {language === 'ur'
                  ? 'ہمارے چیف طبیب حکیم محمد طارق (34 سالہ تجربہ، فاضل طب و الجراحت) سے واٹس ایپ آڈیو، ویڈیو یا کراچی دواخانہ میں روبرو مشورہ حاصل کریں۔'
                  : 'Consult with Hakim Muhammad Tariq (34+ years clinical experience, B.U.M.S & F.T.J certified). Receive an accurate Mizaj diagnosis, lifestyle regime, and custom compounded remedies.'}
              </p>

              <div className="space-y-2 pt-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Confidential Symptom & Medical History Intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prescription & Lab Report Evaluation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Hand-Compounded Medicines dispatched to your door</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/consultation"
                  className="px-6 py-3 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>{language === 'ur' ? 'آن لائن وقت لیں (Book Appointment)' : 'Book Virtual Consultation'}</span>
                </Link>

                <a
                  href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Hakeem%20Sahab,%20I%20want%20to%20book%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all border border-white/20"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Fast Track</span>
                </a>
              </div>
            </div>

            {/* Interactive Clinic Features Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Feature 1: Mizaj Diagnostic */}
              <Link
                href="/mizaj-test"
                className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-800/40 hover:border-emerald-500/80 transition-all group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-300">
                  {language === 'ur' ? 'مفت آن لائن مزاج ٹیسٹ' : 'Interactive Mizaj Diagnostic'}
                </h3>
                <p className="text-xs text-stone-400">
                  Discover whether your body is Safrawi, Damwi, Balghami, or Sawdawi in 2 minutes.
                </p>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                  <span>Take Assessment</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Feature 2: Nuskha Upload */}
              <Link
                href="/prescription-upload"
                className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-800/40 hover:border-emerald-500/80 transition-all group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-300">
                  {language === 'ur' ? 'حکیمی نسخہ / پرچی اپلوڈ' : 'Prescription (Nuskha) Upload'}
                </h3>
                <p className="text-xs text-stone-400">
                  Have a written prescription? Upload the photo for exact compounding and doorstep delivery.
                </p>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                  <span>Upload Rx Slip</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Feature 3: Custom Herbal Compounding */}
              <Link
                href="/custom-compound"
                className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-800/40 hover:border-emerald-500/80 transition-all group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-300">
                  {language === 'ur' ? 'ذاتی مرکب تیار کریں (Custom Mixer)' : 'Apothecary Custom Mixer'}
                </h3>
                <p className="text-xs text-stone-400">
                  Formulate your own Safoof, Majun or Arq with pure wild herbs and authentic raw honey.
                </p>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                  <span>Open Mixer Lab</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Feature 4: Herbal Encyclopedia */}
              <Link
                href="/encyclopedia"
                className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-800/40 hover:border-emerald-500/80 transition-all group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-300">
                  {language === 'ur' ? 'قاموس الادویہ (ہربل ڈکشنری)' : 'Herbal Encyclopedia (قاموس الادویہ)'}
                </h3>
                <p className="text-xs text-stone-400">
                  Detailed botanical properties, Urdu names, temperament, and benefits of 50+ classic herbs.
                </p>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                  <span>Browse Directory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* 5. HERITAGE & CLINICAL ASSURANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-sm">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
              {language === 'ur' ? 'ہمارا 34 سالہ سفر' : 'Our 34-Year Tradition'}
            </div>
            
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {language === 'ur'
                ? 'خالص روایتی طریقہ کشید اور بغیر کسی کیمیکل کے تیاری'
                : 'Copper Still Distillation & Sun-Purified Organic Herbs'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Founded in 1990 in Karachi, Tameer-e-Sehat has maintained uncompromising fidelity to authentic Unani pharmacopeial methods. Our distillates (*Arqiyat*) are double-steamed in copper alembics, and our Shilajit undergoes a 40-day solar filtration process (*Aftaabi*) sourced from the Skardu valley.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="font-bold text-stone-900 block">No Hidden Steroids</span>
                <span className="text-stone-500 text-[11px]">Lab tested for absolute safety</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="font-bold text-stone-900 block">Traditional Honey Bases</span>
                <span className="text-stone-500 text-[11px]">No synthetic sugar syrups</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#155e42] hover:underline"
              >
                <span>Read Full Dawakhana Heritage Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                alt="Traditional Unani Distillation & Herbs"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/60 flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Dispensary & Clinic
                  </span>
                  <h4 className="text-base font-serif font-bold">Korangi Crossing Road, Karachi</h4>
                  <p className="text-[11px] text-stone-300">Open 7 Days a week for walk-in patients & dispensing</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
