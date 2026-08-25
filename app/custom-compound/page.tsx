'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  SlidersHorizontal, 
  FlaskConical, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  MessageSquare, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Leaf,
  Layers
} from 'lucide-react';
import { STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { Product } from '@/lib/types';

interface AvailableHerb {
  id: string;
  nameEn: string;
  nameUr: string;
  mizaj: string;
  pricePerGram: number; // in PKR
  action: string;
}

const AVAILABLE_HERBS: AvailableHerb[] = [
  { id: 'asgandh', nameEn: 'Asgandh Nagori (Withania)', nameUr: 'اسگندھ ناگوری', mizaj: 'Garm-Khushk', pricePerGram: 3, action: 'Nerve & Muscular Vitality' },
  { id: 'salajeet', nameEn: 'Skardu Shilajit Extract', nameUr: 'خالص ہمالیائی سلاجیت', mizaj: 'Garm-Khushk', pricePerGram: 18, action: 'Cellular Stamina & Joints' },
  { id: 'zafran', nameEn: 'Kashmiri Mogra Saffron', nameUr: 'کشمیری زعفران', mizaj: 'Garm-Khushk', pricePerGram: 80, action: 'Cardiovascular Tone & Mood' },
  { id: 'gond-katira', nameEn: 'Gond Katira (Tragacanth)', nameUr: 'گوند کتیرا', mizaj: 'Sard-Tar', pricePerGram: 2.5, action: 'Internal Cooling & Gut Coat' },
  { id: 'tukhm-balanga', nameEn: 'Tukhm-e-Balanga (Basil Seeds)', nameUr: 'تخمِ بالنگا', mizaj: 'Sard-Tar', pricePerGram: 2, action: 'Liver Heat & Hydration' },
  { id: 'kalonji', nameEn: 'Kalonji (Black Seed)', nameUr: 'کلونجی (حبۃ السوداء)', mizaj: 'Garm-Khushk', pricePerGram: 2, action: 'Immunity & Anti-inflammatory' },
  { id: 'ratanjot', nameEn: 'Ratanjot (Alkanet Root)', nameUr: 'رتن جوت', mizaj: 'Sard-Khushk', pricePerGram: 4, action: 'Skin & Hair Pigment' },
  { id: 'amla', nameEn: 'Amla (Indian Gooseberry)', nameUr: 'آملہ خشک', mizaj: 'Sard-Khushk', pricePerGram: 2, action: 'Vitamin C & Digestive Acid' },
  { id: 'sonf', nameEn: 'Badiyan (Fennel Seeds)', nameUr: 'سونف', mizaj: 'Garm-Khushk', pricePerGram: 1.5, action: 'Carminative & Bloating' }
];

const BASE_FORMULATIONS = [
  { id: 'majun', nameEn: 'Majun (Raw Wild Honey Paste)', nameUr: 'معجون (خالص شہد)', basePrice: 600, icon: '🍯' },
  { id: 'safoof', nameEn: 'Safoof (Micro-Milled Fine Powder)', nameUr: 'سفوف (باریک پاؤڈر)', basePrice: 400, icon: '🌿' },
  { id: 'arq', nameEn: 'Arq (Double Steam Distillate)', nameUr: 'مقطر عرق', basePrice: 500, icon: '💧' },
  { id: 'khamira', nameEn: 'Khamira (Cardio Herbal Electuary)', nameUr: 'خمیرہ مروارید', basePrice: 850, icon: '✨' }
];

const WEIGHTS = [
  { label: '100g Compact Batch', weightGrams: 100, multiplier: 1.0 },
  { label: '250g Standard Course', weightGrams: 250, multiplier: 2.2 },
  { label: '500g Full Treatment', weightGrams: 500, multiplier: 4.0 }
];

export default function CustomCompoundPage() {
  const router = useRouter();
  const { language, addToCart, setIsCartOpen } = useApp();

  const [selectedBase, setSelectedBase] = useState(BASE_FORMULATIONS[0]);
  const [selectedHerbs, setSelectedHerbs] = useState<string[]>(['asgandh', 'salajeet']);
  const [selectedWeight, setSelectedWeight] = useState(WEIGHTS[1]);
  const [customFormulaName, setCustomFormulaName] = useState('My Bespoke Vitality Nuskha');

  const toggleHerb = (herbId: string) => {
    if (selectedHerbs.includes(herbId)) {
      if (selectedHerbs.length > 1) {
        setSelectedHerbs(selectedHerbs.filter(id => id !== herbId));
      }
    } else {
      if (selectedHerbs.length < 6) {
        setSelectedHerbs([...selectedHerbs, herbId]);
      }
    }
  };

  // Calculate dynamic price
  const herbsCost = selectedHerbs.reduce((sum, herbId) => {
    const herb = AVAILABLE_HERBS.find(h => h.id === herbId);
    if (!herb) return sum;
    // rough 10-15g proportion per herb
    return sum + herb.pricePerGram * 12;
  }, 0);

  const totalPrice = Math.round((selectedBase.basePrice + herbsCost) * (selectedWeight.multiplier / 2.2));

  const handleAddCustomToCart = () => {
    const herbNames = selectedHerbs
      .map(id => AVAILABLE_HERBS.find(h => h.id === id)?.nameEn)
      .filter(Boolean)
      .join(', ');

    const customId = `custom-nuskha-${selectedBase.id}-${selectedHerbs.join('-')}-${selectedWeight.weightGrams}`;
    const customProduct: Product = {
      id: customId,
      name: customFormulaName || 'Custom Apothecary Compound',
      urduName: 'ذاتی مرکب دواخانہ نسخہ',
      category: 'health-courses',
      categoryName: 'Custom Compounding',
      categoryNameUrdu: 'ذاتی نسخہ سازی',
      shortDesc: `Custom compounded ${selectedBase.nameEn} with ${herbNames}.`,
      shortDescUrdu: `آپ کی فرمائش پر خاص تیار کردہ مرکب۔`,
      description: `Bespoke hand-compounded formulation crafted at Tameer-e-Sehat dispensary. Contains: ${herbNames}. Base: ${selectedBase.nameEn}.`,
      descriptionUrdu: `تعمیرِ صحت دواخانہ میں ہاتھ سے تیار کردہ خالص یونانی مرکب۔`,
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      badge: 'hakeem-special',
      benefits: ['Custom formulated for individual health needs', 'Hand-ground pure wild herbs', '100% steroid-free'],
      benefitsUrdu: ['آپ کے جسمانی مزاج کے عین مطابق', 'خالص جڑی بوٹیاں', 'کیمیکل سے پاک'],
      ingredients: selectedHerbs.map(id => AVAILABLE_HERBS.find(h => h.id === id)?.nameEn || id),
      ingredientsUrdu: selectedHerbs.map(id => AVAILABLE_HERBS.find(h => h.id === id)?.nameUr || id),
      dosage: 'Take 1 teaspoon morning and night with warm milk or water.',
      dosageUrdu: 'صبح اور شام ایک چمچ نیم گرم دودھ یا پانی کے ہمراہ۔',
      mizaj: 'Custom Balanced',
      mizajUrdu: 'معتدل مرکب',
      variants: [{ weight: selectedWeight.label, price: totalPrice, inStock: true }],
      targetConcerns: ['Custom Vitality', 'Holistic Wellness'],
      inStock: true
    };

    addToCart(customProduct, customProduct.variants[0]);
    setIsCartOpen(true);
  };

  const getWhatsAppMixerUrl = () => {
    const herbList = selectedHerbs
      .map((id, i) => `${i + 1}. ${AVAILABLE_HERBS.find(h => h.id === id)?.nameEn}`)
      .join('\n');

    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat Pharmacist!\n\n` +
      `🧪 *CUSTOM COMPOUNDING MIXER FORMULA:*\n` +
      `🏷️ *Name:* ${customFormulaName}\n` +
      `🍯 *Base:* ${selectedBase.nameEn}\n` +
      `⚖️ *Batch Size:* ${selectedWeight.label}\n` +
      `🌿 *Selected Herbs (${selectedHerbs.length}):*\n${herbList}\n\n` +
      `💰 *Estimated Cost:* Rs. ${totalPrice.toLocaleString()}\n\n` +
      `Please review this formula with the Hakim and confirm COD dispatch.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'مرکبات دواخانہ' : 'Apothecary Custom Laboratory'}</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone-900">
          {language === 'ur' ? 'اپنا ذاتی ہربل نسخہ اور معجون تیار کریں' : 'Custom Herbal Compounding Mixer'}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          {language === 'ur'
            ? 'اپنی ضرورت کے مطابق خالص یونانی معجون، سفوف یا مقطر عرق تیار کروائیں۔ بنیادی میڈیم منتخب کریں اور 6 تک نایاب جڑی بوٹیاں شامل کریں۔ کراچی لیبارٹری میں تازہ تیاری۔'
            : 'Formulate your own bespoke Majun, Safoof, or Arq. Select your base medium and combine up to 6 wildcrafted medicinal herbs. Compounded fresh upon order at our Karachi laboratory.'}
        </p>
      </div>

      {/* Main Mixer Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Laboratory Builder (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-8">
          
          {/* Step 1: Formulation Name */}
          <div className="space-y-2">
            <label className="font-serif font-bold text-sm text-stone-900 block">
              {language === 'ur' ? '1۔ اپنے تیار کردہ نسخے کا نام درج کریں:' : '1. Name Your Formulation:'}
            </label>
            <input
              type="text"
              value={customFormulaName}
              onChange={(e) => setCustomFormulaName(e.target.value)}
              placeholder={language === 'ur' ? 'مثال: ذاتی مقوی اعصاب و مصفیٰ نسخہ' : 'e.g. My Personal Joint & Vitality Blend'}
              className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-[#199b50]"
            />
          </div>

          {/* Step 2: Select Base Medium */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <label className="font-serif font-bold text-sm text-stone-900 block">
              {language === 'ur' ? '2۔ بنیادی قوام یا ذریعہ منتخب کریں:' : '2. Select Botanical Base Medium:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BASE_FORMULATIONS.map((base) => (
                <button
                  key={base.id}
                  type="button"
                  onClick={() => setSelectedBase(base)}
                  className={`p-3.5 rounded-2xl ${language === 'ur' ? 'text-right' : 'text-left'} border transition-all ${
                    selectedBase.id === base.id
                      ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="text-xl mb-1">{base.icon}</div>
                  <div className="font-bold text-xs">
                    {language === 'ur' ? base.nameUr : base.nameEn}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {language === 'ur' ? base.nameEn : base.nameUr}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Select Wildcrafted Herbs */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="font-serif font-bold text-sm text-stone-900 block">
                {language === 'ur' ? '3۔ طبی جڑی بوٹیاں منتخب کریں (2 تا 6 منتخب کریں):' : '3. Choose Medicinal Herbs (Select 2 to 6):'}
              </label>
              <span className="text-xs font-bold text-[#199b50]">
                {language === 'ur' ? `${selectedHerbs.length} میں سے 6 منتخب` : `${selectedHerbs.length} of 6 selected`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_HERBS.map((herb) => {
                const isSelected = selectedHerbs.includes(herb.id);
                return (
                  <button
                    key={herb.id}
                    type="button"
                    onClick={() => toggleHerb(herb.id)}
                    className={`p-3 rounded-xl ${language === 'ur' ? 'text-right' : 'text-left'} border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/90 border-[#199b50] text-[#155e42] font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {language === 'ur' ? herb.nameUr : herb.nameEn}
                      </div>
                      <div className="text-[11px] text-[#199b50]">
                        {language === 'ur' ? herb.nameEn : herb.nameUr} • <span className="text-stone-400 font-normal">{herb.action}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#199b50] border-[#199b50] text-white' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Batch Weight */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <label className="font-serif font-bold text-sm text-stone-900 block">
              {language === 'ur' ? '4۔ کل وزن یا مقدار کا انتخاب:' : '4. Select Total Formulation Quantity:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {WEIGHTS.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`p-3 rounded-xl text-center border font-semibold transition-all text-xs ${
                    selectedWeight.label === w.label
                      ? 'bg-[#0e2a1f] text-white border-[#0e2a1f]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {language === 'ur' 
                    ? (w.weightGrams === 100 ? '100 گرام کمپیکٹ بیج' : w.weightGrams === 250 ? '250 گرام معیاری کورس' : '500 گرام مکمل کورس')
                    : w.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Live Compounding Summary Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          
          <div className="bg-[#0e2a1f] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-950 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'ur' ? 'نسخہ جاتی خلاصہ' : 'Compounding Ledger'}</span>
              </span>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono">
                {language === 'ur' ? 'تازہ تیاری' : 'Fresh Batch'}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-white">
                {customFormulaName || (language === 'ur' ? 'ذاتی مرکب' : 'Custom Formulation')}
              </h3>
              <div className="text-xs text-stone-300 flex items-center gap-2">
                <span>{language === 'ur' ? 'بنیاد:' : 'Base:'} <strong className="text-white">{language === 'ur' ? selectedBase.nameUr : selectedBase.nameEn}</strong></span>
                <span>•</span>
                <span>{language === 'ur' ? 'مقدار:' : 'Batch:'} <strong className="text-white">{selectedWeight.weightGrams} {language === 'ur' ? 'گرام' : 'g'}</strong></span>
              </div>
            </div>

            {/* Selected Botanicals Checklist */}
            <div className="space-y-2 pt-2 border-t border-emerald-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                {language === 'ur' ? 'شامل شدہ خالص جڑی بوٹیاں:' : 'Active Botanical Ingredients:'}
              </span>
              <div className="space-y-1 text-xs text-stone-200">
                {selectedHerbs.map((id) => {
                  const herb = AVAILABLE_HERBS.find(h => h.id === id);
                  return (
                    <div key={id} className="flex items-center justify-between bg-emerald-950/60 px-2.5 py-1.5 rounded-lg border border-emerald-900/60">
                      <span>{language === 'ur' ? herb?.nameUr : `${herb?.nameEn} (${herb?.nameUr})`}</span>
                      <span className="text-emerald-400 font-mono text-[10px]">
                        {language === 'ur' ? 'شامل ہے' : 'Active'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Calculation */}
            <div className="pt-4 border-t border-emerald-900 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-stone-400">
                  {language === 'ur' ? 'کل تخمینہ قیمت:' : 'Total Compounding Estimate:'}
                </span>
                <span className="text-3xl font-black text-emerald-400 font-serif">
                  {language === 'ur' ? `روپے ${totalPrice.toLocaleString()}` : `Rs. ${totalPrice.toLocaleString()}`}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                {language === 'ur'
                  ? 'اس میں خالص نباتاتی اجزاء کی کوٹائی، چھانٹی، اور طبی معیار کے امبر گلاس جار میں پیکنگ شامل ہے۔'
                  : 'Includes pharmaceutical laboratory grinding, sterile glass amber jar packaging, and quality certification.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddCustomToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'ur' ? 'شاپنگ بیگ میں شامل کریں' : 'Add Custom Formula to Bag'}</span>
              </button>

              <a
                href={getWhatsAppMixerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ur' ? 'حکیم صاحب کو واٹس ایپ پر ارسال کریں' : 'Submit to Hakeem on WhatsApp'}</span>
              </a>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center gap-3 text-xs text-stone-600 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {language === 'ur'
                ? 'ہر ذاتی نسخہ ترسیل سے قبل حکیم طارق محمود کی ذاتی نگرانی میں تیار کیا جاتا ہے۔'
                : 'Every custom batch is inspected by Hakim Muhammad Tariq before sealing and courier dispatch.'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
