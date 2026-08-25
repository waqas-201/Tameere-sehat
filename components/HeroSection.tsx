'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  MessageSquare, 
  ArrowRight, 
  Truck, 
  Award, 
  Leaf,
  ChevronRight,
  Flame,
  Star,
  ShoppingBag,
  Droplet,
  Layers
} from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP, PRODUCTS } from '@/lib/data';
import { Language, ProductCategory, Product } from '@/lib/types';

interface HeroSectionProps {
  language: Language;
  onOpenMizaj: () => void;
  onOpenConsultation: () => void;
  onOpenPrescription: () => void;
  onOpenCustomBuilder: () => void;
  onShopClick: () => void;
  activeCategory?: ProductCategory;
  onSelectCategory?: (cat: ProductCategory) => void;
  onAddToCart?: (product: Product, variant: any) => void;
  onQuickView?: (product: Product) => void;
}

export default function HeroSection({
  language,
  onOpenMizaj,
  onOpenConsultation,
  onOpenPrescription,
  onOpenCustomBuilder,
  onShopClick,
  activeCategory = 'all',
  onSelectCategory,
  onAddToCart,
  onQuickView
}: HeroSectionProps) {
  // Highlighted Hero Spotlight Product (e.g. Pure Himalayan Shilajit Gold or Tahiri Marham)
  const heroSpotlightProduct = PRODUCTS.find(p => p.id === 'shilajit-gold') || PRODUCTS[0];
  const [selectedSpotlightWeight, setSelectedSpotlightWeight] = useState(
    heroSpotlightProduct.variants[0] || { weight: '20g Resin', price: 2950, inStock: true }
  );
  const [isSpotlightAdded, setIsSpotlightAdded] = useState(false);

  const handleSpotlightAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(heroSpotlightProduct, selectedSpotlightWeight);
      setIsSpotlightAdded(true);
      setTimeout(() => setIsSpotlightAdded(false), 1600);
    }
  };

  const wellnessNeeds = [
    {
      id: 'Men Health',
      catId: 'health-courses' as ProductCategory,
      labelEn: 'Vitality & Stamina',
      labelUr: 'مردانہ طاقت و قوت',
      icon: Flame,
      tag: 'Bestseller'
    },
    {
      id: 'Joint Pain & Arthritis',
      catId: 'herbal-oils' as ProductCategory,
      labelEn: 'Joint & Nerve Relief',
      labelUr: 'جوڑوں کا درد و عرق النساء',
      icon: Layers,
      tag: 'Tahiri Marham'
    },
    {
      id: 'Digestion & Acidity',
      catId: 'safoof-powders' as ProductCategory,
      labelEn: 'Stomach & Digestion',
      labelUr: 'معدہ، تبخیر و گیس',
      icon: Droplet,
      tag: 'Safoof & Arq'
    },
    {
      id: 'Weight Loss & Detox',
      catId: 'raw-herbs' as ProductCategory,
      labelEn: 'Weight Loss & Detox',
      labelUr: 'موٹاپا، چربی و ڈیٹوکس',
      icon: Leaf,
      tag: 'Organic'
    }
  ];

  return (
    <div className="flex flex-col">
      
      {/* Luxury Editorial Hero Section */}
      <section className="relative bg-[#0b2317] text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Ambient Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#00873E]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-black/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Value Propositions */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              
              {/* Primary Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00873E]/20 border border-[#00873E]/40 text-emerald-300 text-xs font-semibold tracking-wide backdrop-blur-xs">
                <Leaf className="w-3.5 h-3.5 text-[#00873E]" />
                <span>{language === 'ur' ? 'مستند یونانی حکمت • 100٪ قدرتی نباتات' : 'Certified Unani Pharmacopeia • Est. 1990'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00873E]" />
                <span className="text-white font-bold">{language === 'ur' ? '34 سالہ طبی ورثہ' : '34 Years Legacy'}</span>
              </div>

              {/* Editorial Main Title */}
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                  {language === 'ur' ? (
                    <>
                      خالص جڑی بوٹیاں اور <br />
                      <span className="text-emerald-400">
                        مستند طبی نسخہ جات
                      </span>
                    </>
                  ) : (
                    <>
                      Ancient Unani Wisdom. <br />
                      <span className="text-emerald-400">
                        Pure Botanical Healing.
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
                  {language === 'ur'
                    ? 'کراچی کے معروف تعمیرِ صحت دواخانہ کی خالص سلاجیت، طاہری مرہم، خالص عرقِیات اور اطباء کے تیار کردہ مجرب کورسز۔ پورے پاکستان میں فری کیش آن ڈلیوری۔'
                    : 'Ethically wildcrafted herbs, Skardu gold-grade Shilajit, Tahiri pain formulations, and authentic custom compounding by certified Unani Hakims.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onShopClick}
                  className="px-6 py-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 border border-emerald-500/50"
                >
                  <span>{language === 'ur' ? 'تمام ادویات دیکھیں' : 'Explore Apothecary'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenMizaj}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 border border-white/20 hover:border-[#00873E] backdrop-blur-md"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'آن لائن مزاج ٹیسٹ' : 'Free Mizaj Assessment'}</span>
                </button>

                <a
                  href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Hakeem%20Sahab,%20I%20need%20herbal%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 border border-emerald-600/30"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'حکیم سے واٹس ایپ پر بات کریں' : 'WhatsApp Consultation'}</span>
                </a>
              </div>

              {/* Social Proof Counters */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-slate-300">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-serif">100,000+</div>
                  <div className="text-xs text-slate-400">Treated Patients</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="flex items-center gap-1 text-xl sm:text-2xl font-black text-amber-300 font-serif">
                    <span>4.9</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-xs text-slate-400">18,400+ Verified Reviews</div>
                </div>
                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                <div className="hidden sm:block">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-serif">100%</div>
                  <div className="text-xs text-slate-400">Steroid-Free Guarantee</div>
                </div>
              </div>

            </div>

            {/* Right Column: Apothecary Spotlight Product Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/40 border border-slate-200 relative overflow-hidden group">
                
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#00873E]" />
                    <span>Apothecary Signature</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    Skardu Valley Grade-A
                  </span>
                </div>

                {/* Spotlight Image with Zoom */}
                <div 
                  onClick={() => onQuickView && onQuickView(heroSpotlightProduct)}
                  className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 mb-4 cursor-pointer"
                >
                  <img
                    src={heroSpotlightProduct.image}
                    alt={heroSpotlightProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#0b2317]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 border border-[#00873E]/40">
                    <ShieldCheck className="w-3 h-3 text-[#00873E]" />
                    <span>Sun-Purified Salajeet</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 
                        onClick={() => onQuickView && onQuickView(heroSpotlightProduct)}
                        className="font-serif font-bold text-lg sm:text-xl text-slate-900 hover:text-[#00873E] cursor-pointer transition-colors leading-tight"
                      >
                        {language === 'ur' ? heroSpotlightProduct.urduName : heroSpotlightProduct.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {language === 'ur' ? heroSpotlightProduct.name : heroSpotlightProduct.urduName}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-[#00873E]">
                        Rs. {selectedSpotlightWeight.price.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-[#00873E] font-bold bg-[#f0faf4] px-1.5 py-0.5 rounded">Free Delivery</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {language === 'ur' ? heroSpotlightProduct.shortDescUrdu : heroSpotlightProduct.shortDesc}
                  </p>

                  {/* Weight Selector Chips */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Select Potency / Pack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {heroSpotlightProduct.variants.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSpotlightWeight(v)}
                          className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all border ${
                            selectedSpotlightWeight.weight === v.weight
                              ? 'bg-[#00873E] text-white border-[#00873E] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {v.weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <button
                      onClick={handleSpotlightAddToCart}
                      className="py-2.5 px-3 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/10 transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isSpotlightAdded ? 'Added to Bag!' : 'Add to Bag'}</span>
                    </button>

                    <a
                      href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat!%20I%20want%20to%20order%20${encodeURIComponent(heroSpotlightProduct.name)}%20(${encodeURIComponent(selectedSpotlightWeight.weight)})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>1-Click Order</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Interactive "Shop by Wellness Goal" Luxury Horizontal Selector */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-[11px] font-bold text-[#00873E] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00873E]" />
                <span>{language === 'ur' ? 'طبی ضروریات کے مطابق انتخاب' : 'Targeted Botanical Formulations'}</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                {language === 'ur' ? 'اپنی ضرورت یا مرض کے مطابق علاج دریافت کریں' : 'Explore by Health Need & Concern'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCustomBuilder}
                className="text-xs font-bold text-[#00873E] bg-white hover:bg-[#f0faf4] px-3 py-1.5 rounded-xl border border-[#b0e6c4] flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00873E]" />
                <span>{language === 'ur' ? 'ذاتی نسخہ تیار کریں' : 'Compounding Mixer'}</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#00873E]" />
                <span>{language === 'ur' ? 'حکیم سے مشورہ' : 'Hakeem Consult'}</span>
              </button>
            </div>
          </div>

          {/* Goal Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {wellnessNeeds.map((need, idx) => {
              const Icon = need.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(need.catId);
                    onShopClick();
                  }}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#00873E] shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f0faf4] text-[#00873E] group-hover:bg-[#00873E] group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 group-hover:bg-[#e6f7ec] group-hover:text-[#00873E] px-2 py-0.5 rounded-md transition-colors">
                      {need.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#00873E] transition-colors">
                      {language === 'ur' ? need.labelUr : need.labelEn}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <span>{language === 'ur' ? 'مصنوعات دیکھیں' : 'View Remedies'}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* The Apothecary Standard Trust Banner */}
      <div className="bg-[#0b2317] text-slate-200 py-3.5 px-4 text-xs border-y border-emerald-950/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#00873E] shrink-0" />
            <span className="font-semibold text-white">100% Guaranteed Organic & Pure Herbs</span>
            <span className="hidden sm:inline text-emerald-900">•</span>
            <span className="hidden sm:inline text-slate-400">Zero Synthetic Adulterants</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#00873E]" />
              <span>Nationwide Cash on Delivery (COD)</span>
            </div>
            <div className="flex items-center gap-1.5 hidden md:flex">
              <Award className="w-4 h-4 text-amber-400" />
              <span>34-Year Dawakhana Excellence</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
