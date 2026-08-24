'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  ShoppingBag, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Zap, 
  Activity, 
  Leaf,
  Scale
} from 'lucide-react';
import { Language, Product, ProductVariant } from '@/lib/types';
import { STORE_WHATSAPP } from '@/lib/data';

interface CustomCourseBuilderProps {
  language: Language;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export default function CustomCourseBuilder({
  language,
  onAddToCart
}: CustomCourseBuilderProps) {
  const [goal, setGoal] = useState<'vitality' | 'weight' | 'joints' | 'digestion'>('vitality');
  const [base, setBase] = useState<'majun' | 'safoof' | 'arq'>('majun');
  const [selectedBoosters, setSelectedBoosters] = useState<string[]>(['salajeet', 'zafran']);
  const [durationDays, setDurationDays] = useState<15 | 30 | 60>(30);
  const [isAdded, setIsAdded] = useState(false);

  const goals = [
    { id: 'vitality', nameEn: 'Vitality & Stamina', nameUr: 'اعصابی و جسمانی طاقت', icon: Zap },
    { id: 'joints', nameEn: 'Joints & Arthritis', nameUr: 'جوڑوں اور ہڈیوں کا درد', icon: Flame },
    { id: 'digestion', nameEn: 'Digestion & Gas', nameUr: 'معدہ، تبخیر و گیس', icon: Activity },
    { id: 'weight', nameEn: 'Weight Loss & Slimming', nameUr: 'موٹاپا اور چربی پگھلاؤ', icon: Scale },
  ];

  const bases = [
    { id: 'majun', nameEn: 'Majun Herbal Paste (معجون)', desc: 'Infused in pure raw berry honey', basePrice: 1600 },
    { id: 'safoof', nameEn: 'Safoof Herbal Powder (سفوف)', desc: 'Fresh stone-ground fine botanical blend', basePrice: 1100 },
    { id: 'arq', nameEn: 'Triple Distilled Arq (عرق)', desc: 'Pure hydro-steam herbal water', basePrice: 850 },
  ];

  const boosters = [
    { id: 'salajeet', nameEn: 'Skardu Shilajit (+Rs. 1,200)', nameUr: 'خالص ہمالیائی سلاجیت', price: 1200 },
    { id: 'zafran', nameEn: 'Kashmiri Saffron (+Rs. 1,400)', nameUr: 'کشمیری زعفران', price: 1400 },
    { id: 'asgandh', nameEn: 'Ashwagandha (+Rs. 450)', nameUr: 'اسگندھ ناگوری', price: 450 },
    { id: 'musli', nameEn: 'Safed Musli (+Rs. 700)', nameUr: 'موصلی سفید', price: 700 },
    { id: 'kalonji', nameEn: 'Kalonji Extracts (+Rs. 350)', nameUr: 'کلونجی بیج', price: 350 },
    { id: 'amber', nameEn: 'Amber & Pearl Foil (+Rs. 1,800)', nameUr: 'مروارید و عنبر', price: 1800 },
  ];

  const toggleBooster = (id: string) => {
    setSelectedBoosters((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const selectedBaseObj = bases.find((b) => b.id === base) || bases[0];
  const boostersCost = selectedBoosters.reduce((sum, id) => {
    const booster = boosters.find((b) => b.id === id);
    return sum + (booster ? booster.price : 0);
  }, 0);

  const durationMultiplier = durationDays === 15 ? 0.7 : durationDays === 30 ? 1 : 1.8;
  const totalPrice = Math.round((selectedBaseObj.basePrice + boostersCost) * durationMultiplier);

  const handleAddCustomToCart = () => {
    const customCourseId = `custom-course-${goal}-${base}-${durationDays}-${boosters.join('-')}`;
    const customProduct: Product = {
      id: customCourseId,
      name: `Custom Hakeem Course (${goal.toUpperCase()} - ${selectedBaseObj.nameEn.split(' ')[0]})`,
      urduName: `خصوصی فارمولا کورس (${durationDays} روزہ)`,
      category: 'health-courses',
      categoryName: 'Custom Course',
      categoryNameUrdu: 'خصوصی نسخہ',
      mizaj: 'Mohtadil (Balanced)',
      mizajUrdu: 'معتدل',
      price: totalPrice,
      image: 'https://images.unsplash.com/photo-1608248597359-5975494d4850?w=600&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 1,
      badge: 'hakeem-special',
      shortDesc: `Custom compounded herbal remedy with ${selectedBoosters.length} active boosters for ${durationDays} days.`,
      shortDescUrdu: `${durationDays} روزہ خصوصی تیار شدہ طبی نسخہ برائے ${goal}۔`,
      description: `Bespoke herbal formula compounded with ${selectedBaseObj.nameEn} and active boosters.`,
      descriptionUrdu: `مخصوص طبی ضرورت کے لیے تیار شدہ ہربل نسخہ۔`,
      benefits: ['Custom formulated for your goal', '100% pure botanical extracts'],
      benefitsUrdu: ['آپ کے طبی ہدف کے مطابق تیار شدہ', '100٪ خالص قدرتی اجزاء'],
      ingredients: selectedBoosters.map((b) => boosters.find((x) => x.id === b)?.nameEn || b),
      ingredientsUrdu: selectedBoosters.map((b) => boosters.find((x) => x.id === b)?.nameUr || b),
      dosage: 'Take 1 teaspoon morning and evening with warm milk or lukewarm water.',
      dosageUrdu: 'ایک چمچ صبح و شام نیم گرم دودھ یا پانی کے ساتھ استعمال کریں۔',
      targetConcerns: [goal],
      variants: [{ weight: `${durationDays} Days Course`, price: totalPrice, inStock: true }],
      inStock: true,
    };

    onAddToCart(customProduct, customProduct.variants[0]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getWhatsAppCourseUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat Dawakhana!\n\n` +
      `🌿 *Custom Herbal Course Request:*\n` +
      `🎯 Primary Goal: ${goal}\n` +
      `🥣 Base Medium: ${selectedBaseObj.nameEn}\n` +
      `⚡ Boosters Selected: ${selectedBoosters.join(', ')}\n` +
      `⏳ Duration: ${durationDays} Days\n` +
      `💰 Computed Price: Rs. ${totalPrice}\n\n` +
      `Please prepare this custom remedy for me with Cash on Delivery.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <section id="course-builder-section" className="py-12 sm:py-16 bg-[#557b5d] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'اپنی ضرورت کا نسخہ خود تیار کروائیں' : 'Interactive Herbal Course Formulator'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' 
              ? 'اپنا ذاتی ہربل کورس اور دوا تیار کروائیں' 
              : 'Build Your Custom Hakeem Herbal Course'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-2xl mx-auto font-normal">
            {language === 'ur'
              ? 'طبی ہدف، بنیادی میڈیم (معجون، سفوف یا عرق) اور نایاب اجزاء (سلاجیت، زعفران وغیرہ) منتخب کریں۔ ہمارے دوا ساز آپ کے لیے تازہ تیار کریں گے۔'
              : 'Select your health objective, base medium, and botanical boosters. Compounded fresh by our certified Karachi dawakhana pharmacists.'}
          </p>
        </div>

        {/* Builder Container */}
        <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Steps */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Health Goal */}
              <div>
                <span className="text-xs font-bold text-[#18232c] uppercase tracking-wider block mb-2">
                  1. {language === 'ur' ? 'طبی ہدف منتخب کریں:' : 'Select Primary Health Goal:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {goals.map((g) => {
                    const Icon = g.icon;
                    const isSelected = goal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id as any)}
                        className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-[#199b50] text-[#199b50] font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-[#199b50]" />
                        <span className="text-xs">{language === 'ur' ? g.nameUr : g.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Base Medium */}
              <div>
                <span className="text-xs font-bold text-[#18232c] uppercase tracking-wider block mb-2">
                  2. {language === 'ur' ? 'بنیادی میڈیم منتخب کریں:' : 'Select Base Formulation Type:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {bases.map((b) => {
                    const isSelected = base === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBase(b.id as any)}
                        className={`p-3.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-[#199b50] ring-1 ring-[#199b50]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{b.nameEn.split(' ')[0]}</span>
                          <span className="text-xs text-[#199b50] font-bold">Rs. {b.basePrice}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{b.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Potent Boosters */}
              <div>
                <span className="text-xs font-bold text-[#18232c] uppercase tracking-wider block mb-2">
                  3. {language === 'ur' ? 'نایاب اجزاء و بوسٹرز شامل کریں:' : 'Add Premium Botanical Boosters:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {boosters.map((b) => {
                    const isSelected = selectedBoosters.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => toggleBooster(b.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                          isSelected
                            ? 'bg-[#199b50] text-white border-[#199b50] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{language === 'ur' ? b.nameUr : b.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Duration */}
              <div>
                <span className="text-xs font-bold text-[#18232c] uppercase tracking-wider block mb-2">
                  4. {language === 'ur' ? 'کورس کی مدت:' : 'Select Course Duration:'}
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { days: 15, labelEn: '15 Days Starter', labelUr: '15 روزہ ابتدائی' },
                    { days: 30, labelEn: '30 Days Standard', labelUr: '30 روزہ مکمل' },
                    { days: 60, labelEn: '60 Days Shifa Max', labelUr: '60 روزہ کامل' },
                  ].map((d) => {
                    const isSelected = durationDays === d.days;
                    return (
                      <button
                        key={d.days}
                        type="button"
                        onClick={() => setDurationDays(d.days as any)}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'bg-[#18232c] text-white font-bold border-[#18232c]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                        <span className="text-xs">{language === 'ur' ? d.labelUr : d.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Live Price Summary & Order Card */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              
              <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#18232c]">
                  {language === 'ur' ? 'نسخہ خلاصہ' : 'Formula Summary'}
                </span>
                <span className="text-xs font-bold text-[#199b50]">
                  {durationDays} Days Plan
                </span>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="font-bold text-slate-900 uppercase">{goal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Medium:</span>
                  <span className="font-semibold text-slate-800">{selectedBaseObj.nameEn.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Boosters:</span>
                  <span className="font-bold text-[#199b50]">{selectedBoosters.length} Items</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-xs font-medium text-slate-600">Total Price:</span>
                <span className="text-2xl font-black text-[#199b50]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddCustomToCart}
                  className={`w-full py-3 px-4 rounded-md font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-[#18232c] text-white'
                      : 'bg-[#199b50] hover:bg-[#158242] text-white shadow-xs'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{language === 'ur' ? 'کارٹ میں شامل کر دیا گیا' : 'Added to Cart!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{language === 'ur' ? 'کارٹ میں شامل کریں' : 'Add Custom Course to Cart'}</span>
                    </>
                  )}
                </button>

                <a
                  href={getWhatsAppCourseUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-md bg-[#18232c] hover:bg-[#111827] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#199b50]" />
                  <span>{language === 'ur' ? 'واٹس ایپ پر فوری آرڈر' : 'Order via WhatsApp'}</span>
                </a>
              </div>

              <div className="text-[11px] text-center text-slate-500 pt-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#199b50]" />
                <span>100% Organic, Pure & Lab-Tested Guarantee</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
