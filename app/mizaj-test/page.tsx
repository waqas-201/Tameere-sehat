'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Leaf, 
  Check, 
  RotateCcw, 
  MessageSquare, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  Heart, 
  Flame, 
  Droplet, 
  Sun, 
  Wind,
  ShieldCheck,
  Award
} from 'lucide-react';
import { PRODUCTS, STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';

interface Question {
  id: number;
  questionEn: string;
  questionUr: string;
  options: {
    textEn: string;
    textUr: string;
    type: 'safrawi' | 'damwi' | 'balghami' | 'sawdawi';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    questionEn: 'How does your body react to climate and temperature?',
    questionUr: 'آپ کا جسم موسم اور درجہ حرارت پر کیسا ردِ عمل دیتا ہے؟',
    options: [
      { textEn: 'I feel hot very quickly and cannot tolerate summer heat (Burning sensations)', textUr: 'مجھے شدید گرمی لگتی ہے اور پاؤں/معدے میں جلن رہتی ہے', type: 'safrawi' },
      { textEn: 'I feel cold easily, love warm clothing and tea (Dislike chilly weather)', textUr: 'مجھے سردی بہت جلدی لگتی ہے اور گرم چائے/کپڑے پسند ہیں', type: 'balghami' },
      { textEn: 'I feel comfortable in most weather, but love pleasant fresh air', textUr: 'موسم کا اعتدال پسند ہے اور جسم میں خون کی روانگی تیز رہتی ہے', type: 'damwi' },
      { textEn: 'My hands and feet stay dry and cold; I feel sensitive to windy autumns', textUr: 'ہاتھ پاؤں سرد اور خشک رہتے ہیں، ہوا اور خشکی پریشان کرتی ہے', type: 'sawdawi' }
    ]
  },
  {
    id: 2,
    questionEn: 'What is the natural texture and feel of your skin?',
    questionUr: 'آپ کی جلد کی قدرتی کیفیت کیسی ہے؟',
    options: [
      { textEn: 'Warm, yellowish tint, prone to acne, prickly heat or rashes', textUr: 'گرم، زردی مائل اور گرمی دانوں/تیزابیت کا رجحان', type: 'safrawi' },
      { textEn: 'Soft, fair, cool to touch, retains moisture easily', textUr: 'نرم، سفید و تروتازہ، ٹھنڈی اور نمی برقرار رکھنے والی', type: 'balghami' },
      { textEn: 'Warm, rosy/pinkish, radiant and supple', textUr: 'سرخی مائل، گرم اور تروتازہ جلد', type: 'damwi' },
      { textEn: 'Dry, rough, cracked heels, dull complexion or dark circles', textUr: 'خشک، کھردری، ایڑھیوں کی پھٹن اور آنکھوں کے نیچے ہلکے', type: 'sawdawi' }
    ]
  },
  {
    id: 3,
    questionEn: 'How is your appetite, thirst, and digestion?',
    questionUr: 'آپ کی بھوک، پیاس اور ہاضمہ کیسا ہے؟',
    options: [
      { textEn: 'Intense thirst, frequent heartburn, acidity, bitter taste in mouth', textUr: 'شدید پیاس، منہ کا کڑوا پن، سینے کی جلن اور تیزابیت', type: 'safrawi' },
      { textEn: 'Slow, sluggish digestion, feeling heavy after light food, low thirst', textUr: 'سست ہاضمہ، کم پیاس اور کھانے کے بعد معدے پر بوجھ', type: 'balghami' },
      { textEn: 'Strong healthy digestion, good regular appetite, hearty eating', textUr: 'کھل کر بھوک لگنا اور ہر چیز اچھے سے ہضم ہونا', type: 'damwi' },
      { textEn: 'Irregular appetite, gas/bloating, constipation and dry mouth', textUr: 'بے قاعدہ بھوک، گیس، قبض اور پیٹ کا پھولنا', type: 'sawdawi' }
    ]
  },
  {
    id: 4,
    questionEn: 'What are your typical sleep patterns?',
    questionUr: 'آپ کی نیند کی کیفیت کیسی ہے؟',
    options: [
      { textEn: 'Light, interrupted sleep, wake up early feeling energetic or restless', textUr: 'ہلکی اور کم نیند، جلدی آنکھ کھل جانا اور بے چینی', type: 'safrawi' },
      { textEn: 'Deep, long, heavy sleep; difficult to wake up in mornings', textUr: 'گہری اور لمبی نیند، صبح اٹھنے میں سستی اور کاہلی', type: 'balghami' },
      { textEn: 'Balanced, restorative sound sleep, wake up refreshed', textUr: 'پُرسکون معتدل نیند اور بیدار ہونے پر تازگی', type: 'damwi' },
      { textEn: 'Disturbed sleep, racing thoughts, vivid dreams or insomnia', textUr: 'نیند کا نہ آنا، وسوسے، پریشان کن خواب اور بے خوابی', type: 'sawdawi' }
    ]
  },
  {
    id: 5,
    questionEn: 'What is your physical build and body structure?',
    questionUr: 'آپ کی جسمانی ساخت اور قد و کاٹھ کیسا ہے؟',
    options: [
      { textEn: 'Lean, sharp muscular features, veins slightly prominent', textUr: 'پتلا چست جسم، رگیں قدرے نمایاں', type: 'safrawi' },
      { textEn: 'Soft, tendency to gain water-weight easily, fleshy frame', textUr: 'بھاری یا نرم جسم، وزن آسانی سے بڑھنے کا رجحان', type: 'balghami' },
      { textEn: 'Broad-shouldered, strong muscular physique, good endurance', textUr: 'چوڑا اور مضبوط ڈھانچہ، خون کی کثرت', type: 'damwi' },
      { textEn: 'Slender, thin bones, tight tendons, lean joints', textUr: 'دبلا پتلا جسم، ہڈیاں اور جوڑ نمایاں', type: 'sawdawi' }
    ]
  },
  {
    id: 6,
    questionEn: 'How would you describe your emotional disposition?',
    questionUr: 'آپ کا عمومی مزاج اور دلی کیفیت کیسی ہے؟',
    options: [
      { textEn: 'Quick to anger but cools down fast, highly ambitious & sharp', textUr: 'تیز غصہ، جلد بازی اور ذہین و متحرک طبیعت', type: 'safrawi' },
      { textEn: 'Calm, patient, rarely angry, quiet and forgiving', textUr: 'پُرسکون، صابر، دھیما مزاج اور کم بولنے والا', type: 'balghami' },
      { textEn: 'Outgoing, friendly, cheerful, passionate and optimistic', textUr: 'خوش مزاج، ملنسار، پُر امید اور پُرجوش', type: 'damwi' },
      { textEn: 'Deep thinker, analytical, prone to overthinking, cautious', textUr: 'گہری سوچ، وسوسے اور ہر بات کی باریکی میں جانا', type: 'sawdawi' }
    ]
  }
];

export default function MizajTestPage() {
  const { language } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'safrawi' | 'damwi' | 'balghami' | 'sawdawi'>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (type: 'safrawi' | 'damwi' | 'balghami' | 'sawdawi') => {
    const updated = { ...answers, [currentStep]: type };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Calculate Dominant Mizaj
  const scoreCounts = Object.values(answers).reduce(
    (acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    { safrawi: 0, damwi: 0, balghami: 0, sawdawi: 0 } as Record<string, number>
  );

  const dominantType = Object.keys(scoreCounts).reduce((a, b) =>
    scoreCounts[a] > scoreCounts[b] ? a : b
  ) as 'safrawi' | 'damwi' | 'balghami' | 'sawdawi';

  const mizajProfiles = {
    safrawi: {
      nameEn: 'Safrawi (Choleric / Hot & Dry)',
      nameUr: 'صفراوی مزاج (گرم و خشک)',
      descEn: 'Your body exhibits excess metabolic heat and yellow bile (Safra). You have a sharp metabolism but are susceptible to acidity, liver heat, and inflammation.',
      descUr: 'آپ کے جسم میں صفراء (گرمی و خشکی) کا غلبہ ہے۔ آپ کا میٹابولزم تیز ہے لیکن جگر و معدے کی گرمی، جلن، تیزابیت اور پیاس کی زیادتی ہو سکتی ہے۔',
      dietEatEn: ['Arq Kasni', 'Barley Water (Sattoo)', 'Tukhm Balanga', 'Pomegranate', 'Cucumber', 'Melon', 'Coriander'],
      dietEatUr: ['عرق کاسنی', 'جو کا ستو / شربت', 'تخم بالنگا', 'انار شیریں', 'کھیرا / ککڑی', 'تربوز و خربوزہ', 'خشک دھنیا'],
      dietAvoidEn: ['Excess Red Meat', 'Heavily Spiced Curries', 'Fried Pakoras', 'Excessive Garlic', 'Black Pepper'],
      dietAvoidUr: ['بڑا گوشت (بیف)', 'تیز مرچ مصالحہ دار کھانے', 'تلی ہوئی اشیاء (سموسے، پکوڑے)', 'لہسن کی زیادتی', 'کالی مرچ'],
      recommendedProductIds: ['arq-kasni-pure', 'skardu-salajeet-gold', 'tahiri-marham']
    },
    damwi: {
      nameEn: 'Damwi (Sanguine / Hot & Moist)',
      nameUr: 'دموی مزاج (گرم و تر)',
      descEn: 'Your body has abundant blood volume and warmth. You generally enjoy excellent stamina, but should watch for high blood pressure and blood thickness.',
      descUr: 'آپ کا مزاج خون کی کثرت اور تری پر مشتمل ہے۔ آپ کی قوت مدافعت بہترین ہے، لیکن فشارِ خون (بلڈ پریشر)، الرجی اور خون کی صفائی کا خیال رکھنا ضروری ہے۔',
      dietEatEn: ['Kashmiri Zafran Tea', 'Apple', 'Beetroot', 'Ispaghol Husk', 'Fresh Green Salad'],
      dietEatUr: ['کشمیری زعفرانی قہوہ', 'سیب و انار', 'چقندر', 'چھلکا اسپغول', 'تازہ سلاد'],
      dietAvoidEn: ['Excessive Sweets', 'Very Oily Greasy Foods', 'Overeating at Night'],
      dietAvoidUr: ['زیادہ میٹھی اشیاء', 'چکنائی و تیل والے کھانے', 'رات کو پیٹ بھر کر کھانا'],
      recommendedProductIds: ['kashmiri-zafran-pure', 'arq-kasni-pure', 'safoof-mughaliz-khas']
    },
    balghami: {
      nameEn: 'Balghami (Phlegmatic / Cold & Moist)',
      nameUr: 'بلغموی مزاج (سرد و تر)',
      descEn: 'Your body possesses cooling properties and phlegm dominance. You have calm endurance but may experience sluggish digestion, cold limbs, or water retention.',
      descUr: 'آپ کے جسم میں رطوبت اور ٹھنڈک زیادہ ہے۔ ہاضمہ سست ہو سکتا ہے، لہٰذا گرم خشک اور مقوی نباتاتی غذائیں آپ کے لیے اکسیر ہیں۔',
      dietEatEn: ['Pure Himalayan Shilajit', 'Ginger Tea', 'Honey', 'Cloves & Cinnamon', 'Dry Fruits (Almonds, Walnuts)'],
      dietEatUr: ['خالص سلاجیت', 'ادرک و دارچینی کا قہوہ', 'خالص شہد', 'لونگ و الائچی', 'خشک میوہ جات (بادام، اخروٹ)'],
      dietAvoidEn: ['Cold Iced Water', 'Excess Dairy (Cold Milk, Curd)', 'Cucumber in Winter', 'Heavy Rice'],
      dietAvoidUr: ['برف کا ٹھنڈا پانی', 'ٹھنڈا دودھ اور دہی کی زیادتی', 'سردیوں میں کھیرے کا استعمال', 'بھاری چاول'],
      recommendedProductIds: ['skardu-salajeet-gold', 'asgandh-nagori-powder', 'roghan-surkh-joints']
    },
    sawdawi: {
      nameEn: 'Sawdawi (Melancholic / Cold & Dry)',
      nameUr: 'سوداوی مزاج (سرد و خشک)',
      descEn: 'Your body is inclined towards coldness and dryness (Black Bile). You may face dry skin, flatulence/constipation, and overactive mental loops.',
      descUr: 'آپ کا مزاج سرد و خشک ہے جس سے گیس، قبض، جلد کا کھردرا پن اور وسوسے پیدا ہوتے ہیں۔ تری اور غذائیت بخش غذائیں ضروری ہیں۔',
      dietEatEn: ['Gond Katira Drink', 'Badam Roghan (Almond Oil in warm milk)', 'Mutton Soup', 'Figs (Injeer)', 'Dates'],
      dietEatUr: ['گوند کتیرا کا شربت', 'روغن بادام شیریں', 'بکرے کی یخنی', 'انجیر', 'کھجور'],
      dietAvoidEn: ['Stale Leftovers', 'Eggplant (Baingan)', 'Lentils (Masoor Daal)', 'Excess Tea & Coffee'],
      dietAvoidUr: ['باسی کھانے', 'بینگن', 'مسور کی دال', 'چائے اور کافی کی زیادتی'],
      recommendedProductIds: ['gond-katira-crystals', 'tahiri-marham', 'safoof-mughaliz-khas']
    }
  };

  const currentProfile = mizajProfiles[dominantType];

  const matchingProducts = PRODUCTS.filter((p) =>
    currentProfile.recommendedProductIds.includes(p.id)
  );

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Hakim Sahab!\n\n` +
      `🩺 *I completed the Tameer-e-Sehat Mizaj Diagnostic:*\n` +
      `🌿 *My Calculated Temperament:* ${currentProfile.nameEn} (${currentProfile.nameUr})\n\n` +
      `Please guide me on the best custom herbal course for my body type.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'روایتی یونانی تشخیص' : 'Classical Unani Diagnostic Quiz'}</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone-900">
          {language === 'ur' ? 'اپنا قدرتی جسمانی مزاج معلوم کریں' : 'Discover Your Unani Body Temperament (Mizaj)'}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          {language === 'ur'
            ? 'طب یونانی میں جسمانی مزاج (گرم، سرد، تر، خشک) کی درست شناخت ہی پائیدار صحت، موزوں غذا اور درست قدرتی ادویات کے انتخاب کی بنیاد ہے۔'
            : 'In Unani Medicine, knowing whether your body is Hot, Cold, Moist, or Dry is the key to lasting healing, personalized diet, and choosing the right herbal remedies.'}
        </p>
      </div>

      {/* Quiz Card */}
      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8 animate-in fade-in">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600">
              <span>
                {language === 'ur' 
                  ? `سوال ${currentStep + 1} از ${QUESTIONS.length}` 
                  : `Question ${currentStep + 1} of ${QUESTIONS.length}`}
              </span>
              <span className="text-[#199b50] font-mono">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% {language === 'ur' ? 'مکمل' : 'Completed'}
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#199b50] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {language === 'ur' ? QUESTIONS[currentStep].questionUr : QUESTIONS[currentStep].questionEn}
            </h3>
            {language !== 'ur' && (
              <p className="text-sm font-semibold text-[#155e42]">
                {QUESTIONS[currentStep].questionUr}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.type)}
                className={`p-4 sm:p-5 rounded-2xl border border-stone-200 hover:border-[#199b50] bg-stone-50/60 hover:bg-emerald-50/50 transition-all group flex items-center justify-between ${
                  language === 'ur' ? 'text-right' : 'text-left'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#155e42]">
                    {language === 'ur' ? opt.textUr : opt.textEn}
                  </div>
                  {language !== 'ur' && (
                    <div className="text-xs text-stone-500 font-medium">
                      {opt.textUr}
                    </div>
                  )}
                </div>
                <div className="w-6 h-6 rounded-full border border-stone-300 group-hover:border-[#199b50] group-hover:bg-[#199b50] flex items-center justify-center shrink-0 ml-3 transition-colors">
                  <Check className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>

          {/* Back Step */}
          {currentStep > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-bold text-stone-500 hover:text-stone-800"
              >
                {language === 'ur' ? '← پچھلے سوال پر واپس جائیں' : '← Back to Previous Question'}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in zoom-in duration-300">
          
          {/* Result Highlight Card */}
          <div className="bg-[#0e2a1f] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 border border-emerald-900">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-700">
                {language === 'ur' ? 'تشخیصی نتیجہ' : 'Diagnostic Result'}
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'ٹیسٹ دوبارہ کریں' : 'Retake Quiz'}</span>
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                {language === 'ur' ? currentProfile.nameUr : currentProfile.nameEn}
              </h2>
              {language !== 'ur' && (
                <h3 className="text-lg font-serif text-emerald-300">
                  {currentProfile.nameUr}
                </h3>
              )}
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl pt-2">
                {language === 'ur' ? currentProfile.descUr : currentProfile.descEn}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-emerald-800/80">
              
              {/* Foods to Eat */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'مفید غذائیں (اغذیہ):' : 'Beneficial Foods (Aghziya):'}</span>
                </h4>
                <ul className="text-xs text-stone-200 space-y-1">
                  {(language === 'ur' ? currentProfile.dietEatUr : currentProfile.dietEatEn).map((food, i) => (
                    <li key={i}>• {food}</li>
                  ))}
                </ul>
              </div>

              {/* Foods to Avoid */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ur' ? 'پرہیز والی غذائیں (پرہیز):' : 'Foods to Avoid (Parhez):'}</span>
                </h4>
                <ul className="text-xs text-stone-200 space-y-1">
                  {(language === 'ur' ? currentProfile.dietAvoidUr : currentProfile.dietAvoidEn).map((food, i) => (
                    <li key={i}>• {food}</li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ur' ? 'واٹس ایپ پر حکیم صاحب سے اس نتیجے پر بات کریں' : 'Discuss this Result with Hakeem on WhatsApp'}</span>
              </a>

              <Link
                href="/consultation"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20"
              >
                <span>{language === 'ur' ? 'آن لائن کلینک اپائنٹمنٹ بک کریں' : 'Book Detailed Virtual Clinic'}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

          </div>

          {/* Recommended House Remedies for this Temperament */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
                  {language === 'ur' ? 'مخصوص نباتاتی مرکبات' : 'Targeted Formulations'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  {language === 'ur'
                    ? `آپ کے ${currentProfile.nameUr} کے لیے موزوں ادویات`
                    : `Remedies Suited for ${dominantType.toUpperCase()} Temperament`}
                </h3>
              </div>
              <Link href="/shop" className="text-xs font-bold text-[#155e42] hover:underline flex items-center gap-1">
                <span>{language === 'ur' ? 'تمام ادویات دیکھیں' : 'View Full Store'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {matchingProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
