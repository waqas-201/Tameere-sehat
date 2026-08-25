'use client';

import React, { useState } from 'react';
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
  TrendingUp,
  PhoneCall,
  Calendar,
  UserCheck,
  Video,
  FileCheck,
  BookOpen,
  Activity,
  Check,
  BadgeCheck,
  HelpCircle
} from 'lucide-react';
import { PRODUCTS, HAKEEMS, FAQS, STORE_PHONE, STORE_WHATSAPP, STORE_ADDRESS_EN, STORE_ADDRESS_UR } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { language, addToCart, setIsAiAssistantOpen, products } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dispensary Remedies (Catalog portion)
  const featuredRemedies = (products && products.length > 0) ? products.slice(0, 6) : PRODUCTS.slice(0, 6);

  // Key Clinical Treatment Areas (Medical Conditions Handled by Hakims)
  const clinicalSpecialties = [
    {
      id: 'gastro',
      titleEn: 'Stomach, Liver & Acidity',
      titleUr: 'معدہ، جگر، تیزابیت و گیس',
      descEn: 'Relief from chronic GERD, IBS, fatty liver, bloating, and poor digestion.',
      descUr: 'دائمی تیزابیت، جلن، السر، فیٹی لیور اور بدہضمی کا مستقل یونانی علاج۔',
      icon: Activity,
      remedies: 'Arq Kasni, Jawarish Kamuni, Safoof Hazim',
      remediesUrdu: 'عرق کاسنی، جوارش کمونی، سفوف ہاضم',
      hakeemSpecialist: 'Hakeem Rizwan Ahmed'
    },
    {
      id: 'vitality',
      titleEn: 'Nerve Strength & Vitality',
      titleUr: 'اعصابی قوت و مردانہ توانائی',
      descEn: 'Comprehensive rehabilitation for physical exhaustion, muscle weakness, and stamina.',
      descUr: 'اعصابی کمزوری، سستی، تھکن اور عمومی جسمانی طاقت کی بحالی۔',
      icon: Flame,
      remedies: 'Skardu Shilajit, Majun Shabab, Zafran',
      remediesUrdu: 'سلاجیت سکردو، معجون شباب، خالص زعفران',
      hakeemSpecialist: 'Hakeem Muhammad Tariq'
    },
    {
      id: 'joints',
      titleEn: 'Joints, Spine & Arthritis',
      titleUr: 'جوڑوں کا درد، گھٹیا و عرق النساء',
      descEn: 'Restoring cartilage health, uric acid balancing, and soothing chronic sciatica pain.',
      descUr: 'گھٹنوں کے درد، یورک ایسڈ، جوڑوں کی سوزش اور مہروں کے مسائل کا شافی حل۔',
      icon: ShieldCheck,
      remedies: 'Roghan Surkh, Majun Suranjan, Asgandh',
      remediesUrdu: 'روغن سرخ، معجون سورنجان، اسگندھ ناگوری',
      hakeemSpecialist: 'Hakeem Muhammad Tariq'
    },
    {
      id: 'women',
      titleEn: "Women's Health & Hormones",
      titleUr: 'خواتین کے امراض و ہارمونل بیلنس',
      descEn: 'Confidential care for PCOS, menstrual irregularities, skin melasma, and vitality.',
      descUr: 'پی سی او ایس، ہارمونز کے مسائل، چہرے کی چھائیاں اور نسوانی کمزوری۔',
      icon: Heart,
      remedies: 'Sharbat Anar, Safoof Mahwari, Herbal Glow Pack',
      remediesUrdu: 'شربت انار، سفوف ماہواری، ہربل گلو پیک',
      hakeemSpecialist: 'Hakeema Dr. Asma Farooq'
    },
    {
      id: 'skin',
      titleEn: 'Skin, Eczema & Allergies',
      titleUr: 'خارش، چنبل اور جلدی امراض',
      descEn: 'Classical botanical therapy for psoriasis, burns, persistent itch, and cracked skin.',
      descUr: 'داد، چنبل، پرانی خارش، جلنے کے نشانات اور ایڑھیوں کا قدرتی علاج۔',
      icon: Leaf,
      remedies: 'Tahiri Marham, Roghan Neem, Arq Shahtara',
      remediesUrdu: 'طاہری مرہم، روغن نیم، عرق شاہترہ',
      hakeemSpecialist: 'Hakeema Dr. Asma Farooq'
    },
    {
      id: 'kidney',
      titleEn: 'Kidney & Urinary Stone Relief',
      titleUr: 'گردہ و مثانہ کی پتھری و جلن',
      descEn: 'Natural non-surgical stone expulsion and soothing for burning micturition.',
      descUr: 'گردے اور مثانے کی پتھری کا قدرتی انخلاء اور پیشاب کی جلن کا خاتمہ۔',
      icon: Sparkles,
      remedies: 'Kushta Hajr-ul-Yahood, Arq Badiyan, Stonil Safoof',
      remediesUrdu: 'کشتہ حجر الیہود، عرق بادیان، سٹونل سفوف',
      hakeemSpecialist: 'Hakeem Rizwan Ahmed'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: 60% EMPHASIS ON CLINICAL CONSULTATION & PATIENT INTAKE */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0e2a1f] text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b border-emerald-950">
        
        {/* Subtle Background Glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-900/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Primary Consultation Lead (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {language === 'ur' ? 'آن لائن طبی معائنہ و ہسپتال دواخانہ کراچی' : 'Live Virtual Clinic & Karachi Dispensary • Est. 1990'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.18]">
                {language === 'ur' ? (
                  <>
                    مستند حکماء سے <span className="text-emerald-400 underline decoration-amber-400 underline-offset-8">آن لائن معائنہ</span> اور خالص یونانی علاج
                  </>
                ) : (
                  <>
                    Expert Hakeem Consultations & <span className="text-emerald-400 italic">Personalized Healing</span> for Root-Cause Recovery
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {language === 'ur'
                  ? 'بیماری کے بنیادی اسباب (مزاج، نبض اور خوراک) کی مستند تشخیص۔ 36 سالہ تجربہ کار سینئر حکماء سے واٹس ایپ آڈیو/ویڈیو یا کراچی دواخانہ میں مفت مشورہ حاصل کریں اور اپنے مرض کے مطابق تیار کردہ خالص نسخہ منگوائیں۔'
                  : 'Every body constitution (Mizaj) is unique. Consult our board-certified Unani Physicians for comprehensive pulse, history, and dietary diagnosis, or upload your written prescription for bespoke hand-compounded herbal remedies.'}
              </p>

              {/* Primary Patient Action Buttons (Services First) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                
                {/* Action 1: Book Consultation */}
                <Link
                  href="/consultation"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-900/40 transition-all hover:scale-102"
                >
                  <Stethoscope className="w-5 h-5 text-emerald-100 shrink-0" />
                  <span>{language === 'ur' ? 'حکیم صاحب سے وقت لیں' : 'Book Hakeem Consultation'}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${language === 'ur' ? 'rotate-180' : ''}`} />
                </Link>

                {/* Action 2: Upload Nuskha / Prescription */}
                <Link
                  href="/prescription-upload"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm flex items-center justify-center gap-2.5 backdrop-blur-xs border border-white/20 transition-all hover:scale-102"
                >
                  <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{language === 'ur' ? 'نسخہ / پرچی اپلوڈ کریں' : 'Upload Prescription (Nuskha)'}</span>
                </Link>

                {/* Action 3: Mizaj Test */}
                <Link
                  href="/mizaj-test"
                  className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-800/60 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'ur' ? 'تشخیصِ مزاج' : 'Mizaj Assessment'}</span>
                </Link>

              </div>

              {/* Clinical Trust Strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-emerald-900/60 max-w-xl mx-auto lg:mx-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                  <UserCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">100,000+</div>
                    <div className="text-[11px] text-stone-400">
                      {language === 'ur' ? 'مریضوں کا علاج' : 'Patients Treated'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 border-x border-emerald-900/80 px-2 sm:px-4">
                  <BadgeCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">
                      {language === 'ur' ? 'مستند و تصدیق شدہ' : 'FTJ Certified'}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {language === 'ur' ? 'سینئر اطباء کرام' : 'Senior Unani Hakims'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 pl-2">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">
                      {language === 'ur' ? '0% کیمیکل و اسٹیرائڈ' : '0% Steroids'}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {language === 'ur' ? 'خالص یونانی طب' : 'Pure Unani Tibb'}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Live Clinical Duty Desk Showcase (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-7 border border-emerald-700/50 shadow-2xl backdrop-blur-md relative overflow-hidden space-y-5">
                
                {/* Card Header: Live Status */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      {language === 'ur' ? 'آن لائن طبی کلینک فعال ہے' : 'Virtual Tele-Tibb Clinic Active'}
                    </span>
                  </div>
                  <span className="text-[11px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono">
                    {language === 'ur' ? 'پیر تا ہفتہ' : 'Mon - Sat'}
                  </span>
                </div>

                {/* Lead Specialist Profile Card */}
                <div className="flex items-center gap-4 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                  <img
                    src={HAKEEMS[0].image}
                    alt={HAKEEMS[0].name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/60 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white font-serif truncate">
                        {language === 'ur' ? HAKEEMS[0].urduName : HAKEEMS[0].name}
                      </h3>
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium truncate">
                      {language === 'ur' ? HAKEEMS[0].titleUrdu : HAKEEMS[0].title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-400">
                      <span>{language === 'ur' ? '36 سالہ کلینیکل تجربہ' : '36+ Yrs Clinical Practice'}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">
                        {language === 'ur' ? '18,400+ مریض شفایاب' : '18,400+ Consultations'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consultation Method Highlights */}
                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/60">
                    <span className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{language === 'ur' ? 'واٹس ایپ آڈیو و ویڈیو کال مشورہ' : 'WhatsApp Audio & Video Call'}</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      {language === 'ur' ? 'فوری' : 'Fast-Track'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/60">
                    <span className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{language === 'ur' ? 'مرض کے مطابق خاص نسخہ سازی' : 'Custom Compounded Nuskha Plan'}</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">
                      {language === 'ur' ? '24 گھنٹے میں روانگی' : 'Dispatched in 24h'}
                    </span>
                  </div>
                </div>

                {/* Direct Connect Buttons */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Hakeem%20Sahab,%20I%20want%20to%20consult%20regarding%20my%20health%20issue.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>{language === 'ur' ? 'واٹس ایپ پر فوری مشورہ کریں' : 'Instant WhatsApp Consultation'}</span>
                  </a>

                  <Link
                    href="/consultation"
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-700 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>
                      {language === 'ur' 
                        ? 'تمام سینئر اطباء کا شیڈول دیکھیں اور وقت لیں' 
                        : 'View All 3 Senior Hakims & Book Slot'}
                    </span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. CORE PATIENT SERVICES: 5 COMPREHENSIVE CLINICAL PILLARS (SERVICES FOCUS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            {language === 'ur' ? 'مریض دوست طبی خدمات' : 'Patient-Centered Clinical Services'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900">
            {language === 'ur' ? 'ہماری 5 جامع طبی خدمات برائے شفاء' : 'Five Dedicated Pathways to Natural Healing'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
            {language === 'ur' 
              ? 'آن لائن تشخیص سے لے کر دواخانہ میں تازہ نسخہ سازی تک، ہماری تمام خدمات آپ کی قدرتی اور مستقل صحت کے لیے وقف ہیں۔' 
              : 'From virtual diagnostic consultations to bespoke pharmacy compounding, explore our clinical services designed for holistic recovery.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Service 1: Hakeem Consultations */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-[#199b50] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#155e42] group-hover:bg-[#155e42] group-hover:text-white flex items-center justify-center transition-colors">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {language === 'ur' ? 'طبی معائنہ' : 'Clinical Care'}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#155e42] transition-colors">
                  {language === 'ur' ? 'آن لائن حکیم کنسلٹیشن' : '1-on-1 Hakeem Consultation'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'ur'
                    ? 'سینئر فاضل طب والجراحت حکماء سے نبض، زبان اور علامات کی تفصیلی جانچ اور رازداری کے ساتھ آڈیو و ویڈیو مشورہ۔'
                    : 'Detailed symptom intake, dietary assessment, and confidential audio/video review with senior certified Hakims (FTJ / BEMS).'}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'مرض کی بنیادی تشخیص' : 'Free initial condition review'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'مزاج کے موافق غذا و پرہیز نامہ' : 'Personalized diet & lifestyle regimen'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <Link
                href="/consultation"
                className="w-full py-3 px-4 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{language === 'ur' ? 'وقت بک کریں' : 'Book Consultation'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

          {/* Service 2: Prescription / Nuskha Upload */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-[#199b50] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 group-hover:bg-amber-800 group-hover:text-white flex items-center justify-center transition-colors">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {language === 'ur' ? 'نسخہ سازی' : 'Prescription Reader'}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#155e42] transition-colors">
                  {language === 'ur' ? 'حکیمی نسخہ / پرچی اپلوڈ' : 'Prescription (Nuskha) Dispensing'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'ur'
                    ? 'کسی بھی مستند حکیم یا طبیب کا تحریری نسخہ اپلوڈ کریں۔ ہمارے فارماسسٹ صاف اجزاء کو باریک پیس کر تیار کریں گے۔'
                    : 'Have a written prescription from any doctor or Hakeem? Upload the photo for exact ingredient weighing, fine grinding, and compounding.'}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? '100% اصلی و مصفٰی جڑی بوٹیاں' : '100% authentic clean raw herbs'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'واضح اور شفاف نرخ' : 'Transparent itemized quote'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <Link
                href="/prescription-upload"
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{language === 'ur' ? 'پرچی اپلوڈ کریں' : 'Upload Rx Slip'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

          {/* Service 3: Interactive Mizaj Assessment */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-[#199b50] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 group-hover:bg-teal-800 group-hover:text-white flex items-center justify-center transition-colors">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  {language === 'ur' ? 'خود تشخیصی' : 'Self-Diagnostic'}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#155e42] transition-colors">
                  {language === 'ur' ? 'آن لائن مزاج تشخیصی ٹیسٹ' : 'Interactive Mizaj Assessment'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'ur'
                    ? 'جانیں کہ آپ کا فطری مزاج کیا ہے (صفراوی، دموی، بلغمی، یا سوداوی) اور معلوم کریں کہ کون سی غذائیں آپ کے لیے مفید ہیں۔'
                    : 'Discover your primary Unani body constitution (Safrawi, Damwi, Balghami, or Sawdawi) and learn what foods heal or irritate your system.'}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? '2 منٹ کا سائنسی سوالنامہ' : '2-Minute structured questionnaire'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'فوری موافق غذا اور جڑی بوٹیوں کی فہرست' : 'Instant food & herbs compatibility guide'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <Link
                href="/mizaj-test"
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{language === 'ur' ? 'ٹیسٹ شروع کریں' : 'Take 2-Min Assessment'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

          {/* Service 4: Bespoke Compound Mixer */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-[#199b50] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-800 group-hover:bg-purple-800 group-hover:text-white flex items-center justify-center transition-colors">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
                  {language === 'ur' ? 'مرکب سازی لیب' : 'Apothecary Lab'}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#155e42] transition-colors">
                  {language === 'ur' ? 'ذاتی نباتاتی مرکب سازی' : 'Custom Formulation Lab'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'ur'
                    ? 'اپنی ضرورت کے مطابق معجون، سفوف یا عرق کا انتخاب کریں اور زعفران، خالص سلاجیت اور اسگندھ شامل کریں۔'
                    : 'Craft a tailored Majun, Safoof, or Arq base with specific wild botanical boosters like Zafran, Salajeet, Asgandh, or Honey.'}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'مخصوص نباتاتی اجزاء کا انتخاب' : 'Choose custom bases & botanical boosters'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'کراچی دواخانہ میں تازہ تیاری' : 'Freshly compounded at Karachi dispensary'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <Link
                href="/custom-compound"
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{language === 'ur' ? 'مرکب لیب کھولیں' : 'Open Compounding Lab'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

          {/* Service 5: Botanical Encyclopedia */}
          <div className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-[#199b50] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 group-hover:bg-blue-800 group-hover:text-white flex items-center justify-center transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                  {language === 'ur' ? 'طبی معلومات' : 'Tibb Knowledge Base'}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#155e42] transition-colors">
                  {language === 'ur' ? 'قاموس الادویہ (ہربل ڈکشنری)' : 'Botanical Herb Encyclopedia'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'ur'
                    ? '50 سے زائد روایتی نباتات کی مکمل تفصیل، نباتاتی نام، مزاج، خواص، نفع خاص اور طبی مقدار خوراک۔'
                    : 'Comprehensive reference for 50+ classical Unani herbs detailing botanical names, medicinal actions, temperamental effects, and safety notes.'}
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'اردو اور نباتاتی ناموں سے تلاش' : 'Search by English, Urdu & Botanical names'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#199b50]" />
                  <span>{language === 'ur' ? 'مستند طبی کتب کے حوالے' : 'Verified Unani pharmacopeia dosages'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <Link
                href="/encyclopedia"
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{language === 'ur' ? 'قاموس الادویہ دیکھیں' : 'Browse Encyclopedia'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

          {/* Service 6: Urgent Triage & WhatsApp Hotline */}
          <div className="bg-emerald-950 text-white rounded-3xl p-7 border border-emerald-800 shadow-xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-emerald-200 flex items-center justify-center">
                <PhoneCall className="w-7 h-7 animate-bounce" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700">
                  {language === 'ur' ? 'فوری مدد' : 'Instant Support'}
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {language === 'ur' ? 'فوری طبی مشورہ و ہیلپ لائن' : 'Direct Clinic Consultation Hotline'}
                </h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  {language === 'ur'
                    ? 'کوئی فوری سوال ہے یا سمجھ نہیں آ رہا کہ کس طبیب سے رجوع کریں؟ ہمارے مرکزی دواخانہ سے براہ راست رابطہ کریں۔'
                    : 'Have an urgent health question or unsure which specialist to consult? Contact our chief dispensary desk directly.'}
                </p>
              </div>
              <div className="p-3 bg-emerald-900/60 rounded-2xl border border-emerald-800 text-xs space-y-1">
                <div className="text-stone-300 text-[11px]">
                  {language === 'ur' ? 'براہ راست فون و واٹس ایپ:' : 'Direct Phone & WhatsApp:'}
                </div>
                <div className="font-mono text-sm font-bold text-amber-300">{STORE_PHONE}</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-800/80">
              <a
                href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20need%20Hakeem%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>{language === 'ur' ? 'واٹس ایپ پر رابطہ کریں' : 'Chat on WhatsApp Now'}</span>
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. CLINICAL TEAM: MEET OUR SENIOR HAKIMS & SPECIALISTS */}
      {/* ========================================================================= */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
                {language === 'ur' ? 'ہمارے مستند طبی ماہرین' : 'Certified Unani Physicians'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                {language === 'ur' ? 'سینئر اطباء کرام کی زیرِ نگرانی علاج' : 'Meet Our Senior Hakim Panel'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {language === 'ur'
                  ? 'نبض شناسی، معائنہ قارورہ اور خالص ہربل فارماسیوٹکس میں دہائیوں پر محیط کلینیکل تجربہ۔'
                  : 'Decades of hospital-backed clinical experience in non-invasive pulse diagnosis and herbal pharmaceutics.'}
              </p>
            </div>

            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white text-xs font-bold transition-all shadow-xs shrink-0"
            >
              <span>{language === 'ur' ? 'تمام ڈاکٹرز دیکھیں' : 'View Full Clinical Schedule'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HAKEEMS.map((hakeem) => (
              <div
                key={hakeem.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  
                  {/* Avatar & Years Badge */}
                  <div className="flex items-center gap-4">
                    <img
                      src={hakeem.image}
                      alt={hakeem.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100 shrink-0"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base text-stone-900">
                        {language === 'ur' ? hakeem.urduName : hakeem.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#155e42]">
                        {language === 'ur' ? hakeem.titleUrdu : hakeem.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          {language === 'ur' 
                            ? `${hakeem.experienceYears} سالہ کلینیکل پریکٹس` 
                            : `${hakeem.experienceYears} Years Practice`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio summary */}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {language === 'ur' ? hakeem.bioUrdu : hakeem.bio}
                  </p>

                  {/* Specializations tags */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400">
                      {language === 'ur' ? 'خصوصی مہارت:' : 'Clinical Focus:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(language === 'ur' ? hakeem.specialtiesUrdu : hakeem.specialties).slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-[10px] bg-emerald-50 text-[#155e42] px-2 py-0.5 rounded-md font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                  <Link
                    href={`/consultation`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'ur' ? 'وقت بک کریں' : 'Book Appointment'}</span>
                  </Link>

                  <a
                    href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum,%20I%20would%20like%20to%20consult%20with%20${encodeURIComponent(hakeem.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-[#155e42] transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PATIENT TREATMENT JOURNEY: 4 STEPS TO NATURAL RECOVERY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            {language === 'ur' ? 'علاج کا مکمل طریقہ کار' : 'Clinical Protocol'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
            {language === 'ur' ? 'تعمیرِ صحت میں مریض کا سفر' : 'How Our Patient-Centered Care Works'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {language === 'ur'
              ? 'ہم محض وقتی علامات کا علاج نہیں کرتے بلکہ اخلاطِ اربعہ (صفراء، سوداء، بلغم، دم) کو متوازن کر کے مرض کو جڑ سے ختم کرتے ہیں۔'
              : 'We do not treat symptoms in isolation. We balance the humors (Akhlaat) to restore permanent health.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-serif font-black text-lg flex items-center justify-center">
              1
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {language === 'ur' ? '1. مزاج و نبض کی تشخیص' : '1. Root Cause & Mizaj Intake'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ur'
                ? 'علامات، نظامِ ہضم، نیند، زبان کی رنگت اور حرارتِ غریزی کی جامع جانچ اور مشورہ۔'
                : 'Detailed intake of your symptoms, digestion, sleep, tongue examination, and thermal body balance.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-serif font-black text-lg flex items-center justify-center">
              2
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {language === 'ur' ? '2. حکیم کا تجویز کردہ نسخہ' : '2. Custom Treatment Plan'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ur'
                ? 'سینئر حکیم آپ کی حالت کے مطابق خالص نسخہ اور روزمرہ غذا و پرہیز نامہ تجویز کرتے ہیں۔'
                : 'Senior Tabib prepares a tailored formulation and specifies compatible daily foods and items to avoid.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-serif font-black text-lg flex items-center justify-center">
              3
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {language === 'ur' ? '3. دواخانہ میں خالص تیاری' : '3. Pure Hand-Compounding'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ur'
                ? 'کراچی کے رجسٹرڈ دواخانہ میں مقطر عرق اور خالص شہد کے ساتھ ادویات دستی طور پر تیار کی جاتی ہیں۔'
                : 'Medicines are compounded fresh at our Karachi dispensary using copper-distilled Arqiyat and pure organic honey.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-serif font-black text-lg flex items-center justify-center">
              4
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {language === 'ur' ? '4. گھر پر ڈلیوری و رہنمائی' : '4. Doorstep Delivery & Care'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ur'
                ? 'ملک بھر میں تیز رفتار کیش آن ڈلیوری اور دورانِ علاج اطباء کی جانب سے باقاعدہ رہنمائی۔'
                : 'Fast courier dispatch with Cash on Delivery nationwide, backed by regular Hakim check-ins on your progress.'}
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. CLINICAL SPECIALTY CONDITIONS (WHAT WE TREAT) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            {language === 'ur' ? 'طبی شعبہ جات' : 'Clinical Specialties'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
            {language === 'ur' ? 'اہم امراض جن کا شافی علاج کیا جاتا ہے' : 'Conditions We Specialize in Treating'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {language === 'ur'
              ? 'اپنے مرض کا انتخاب کریں اور متعلقہ شعبہ کے سینئر حکیم سے مفت مشورہ حاصل کریں۔'
              : 'Select your health concern to consult with the lead specialist or explore targeted remedies.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clinicalSpecialties.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-[#199b50] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#155e42] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      Lead: {item.hakeemSpecialist.split(' ')[1]}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {language === 'ur' ? item.titleUr : item.titleEn}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {language === 'ur' ? item.descUr : item.descEn}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[11px]">
                    <span className="text-stone-400 font-semibold block">
                      {language === 'ur' ? 'اہم مجرب نباتاتی نسخہ جات:' : 'Key Herbal Formulations:'}
                    </span>
                    <span className="text-[#155e42] font-semibold">
                      {language === 'ur' ? item.remediesUrdu : item.remedies}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
                  <Link
                    href={`/consultation`}
                    className="font-bold text-[#155e42] hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ur' ? 'ماہر حکیم سے مشورہ لیں' : 'Consult Specialist'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
                  </Link>

                  <Link
                    href={`/shop`}
                    className="text-stone-500 hover:text-stone-800 font-medium"
                  >
                    {language === 'ur' ? 'ادویات دیکھیں' : 'View Remedies'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DISPENSARY REMEDIES (40% PRODUCT CATALOG PORTION) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-1">
              {language === 'ur' ? 'مرکزی دواخانہ و فارمیسی' : 'Dispensary & Pharmacy'}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
              {language === 'ur' ? 'طبیب کے تجویز کردہ مستند نسخے و ادویات' : 'Tabib-Formulated Dispensary Remedies'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {language === 'ur'
                ? 'کیمیکل اور اسٹیرائڈ سے مکمل پاک، خالص نباتاتی اجزاء سے تیار کردہ روایتی ادویات۔'
                : 'Laboratory-tested classical formulations prepared with zero steroids and pure botanical extracts.'}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <span>{language === 'ur' ? 'تمام مستند ادویات دیکھیں' : 'Explore All 200+ Remedies'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRemedies.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Prescription Custom Compound Link Strip */}
        <div className="mt-10 p-6 rounded-3xl bg-emerald-50 border border-emerald-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#155e42] text-white flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                {language === 'ur' 
                  ? 'کیا آپ کے پاس کوئی خاص روایتی نسخہ یا پرچی ہے؟' 
                  : 'Looking for custom herbs or specific raw ingredients?'}
              </h4>
              <p className="text-xs text-stone-600">
                {language === 'ur'
                  ? 'اپنے نسخے کی تصویر بھیجیں یا اطباء کو مطلوبہ جڑی بوٹیاں بتائیں۔ ہم خالص حالت میں تیار کر کے بھیجیں گے۔'
                  : 'Upload a picture of your prescription or tell our Hakims what you need compounded.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/prescription-upload"
              className="px-4 py-2.5 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{language === 'ur' ? 'پرچی اپلوڈ کریں' : 'Upload Slip'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. PATIENT TESTIMONIALS & CLINICAL SUCCESS STORIES */}
      {/* ========================================================================= */}
      <section className="bg-[#0b1e16] text-white py-16 border-y border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {language === 'ur' ? 'مریضوں کی رائے' : 'Real Patient Recovery'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {language === 'ur' ? 'شفایاب مریضوں کے تاثرات' : 'Verified Patient Case Reviews'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              {language === 'ur'
                ? '36 سالوں سے بغیر کسی اسٹیرائڈ کے خالص قدرتی علاج سے حاصل کردہ مریضوں کا اعتماد۔'
                : 'Over 34 years of building trust through genuine natural healing without steroids.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Story 1 */}
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-emerald-800/40 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                {language === 'ur'
                  ? '”مجھے معدے میں جلن اور گیس کا 5 سال سے شدید مسئلہ تھا۔ حکیم رضوان صاحب نے میری غذا درست کرائی اور عرق کاسنی اور مخصوص سفوف دیا۔ صرف تین ہفتوں میں مکمل آرام آ گیا۔“'
                  : '“I had chronic stomach ulcers and burning acidity for 5 years. Hakeem Rizwan analyzed my diet and prescribed Arq Kasni with custom Safoof. Within 3 weeks, my digestion completely stabilized.”'}
              </p>
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                <strong className="text-white">
                  {language === 'ur' ? 'محمد زبیر' : 'Muhammad Zubair'}
                </strong>
                <span className="text-emerald-400">
                  {language === 'ur' ? 'لاہور • معدہ و تیزابیت' : 'Lahore • Chronic Acidity'}
                </span>
              </div>
            </div>

            {/* Story 2 */}
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-emerald-800/40 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                {language === 'ur'
                  ? '”طاہری مرہم کا کوئی ثانی نہیں۔ میری پھٹی ایڑیاں اور خشک جلدی الرجی بالکل ٹھیک ہو گئی۔ کسی اسٹیرائڈ ٹیوب کی ضرورت نہیں پڑی۔ شکریہ تعمیرِ صحت دواخانہ!“'
                  : '“Tahiri Marham is unmatched. My severe cracked heels and allergic skin rash were healed completely without any steroid ointments. Shukriya Tameer-e-Sehat!”'}
              </p>
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                <strong className="text-white">
                  {language === 'ur' ? 'فرزانہ بیگم' : 'Farzana Begum'}
                </strong>
                <span className="text-emerald-400">
                  {language === 'ur' ? 'کراچی • جلدی شفاء' : 'Karachi • Skin Healing'}
                </span>
              </div>
            </div>

            {/* Story 3 */}
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-emerald-800/40 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                {language === 'ur'
                  ? '”واٹس ایپ پر حکیم صاحب کا مشورہ بہت تسلی بخش تھا۔ کمزوری اور اعصابی تھکن کے لیے خالص سکردو سلاجیت بھیجی۔ 100% اصلی اور فائدہ مند نسخہ ہے۔“'
                  : '“The online consultation via WhatsApp was extremely thorough. Hakeem Tariq answered all my questions about nerve fatigue and sent pure Skardu Shilajit. Genuine 100% potency.”'}
              </p>
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                <strong className="text-white">
                  {language === 'ur' ? 'طارق جاوید' : 'Tariq Javed'}
                </strong>
                <span className="text-emerald-400">
                  {language === 'ur' ? 'اسلام آباد • اعصابی تقویت' : 'Islamabad • Vitality Course'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PHYSICAL DISPENSARY & FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Physical Clinic & Map Info */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#155e42] text-xs font-bold uppercase">
              {language === 'ur' ? 'کراچی تشخیصی کلینک و دواخانہ' : 'Karachi Walk-In Clinic & Dispensary'}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'ur' ? 'تشخیصِ نبض کے لیے دواخانہ تشریف لائیں' : 'Visit Us in Person for Pulse Diagnosis (نبض شناسی)'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {language === 'ur' ? STORE_ADDRESS_UR : STORE_ADDRESS_EN}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="font-bold text-stone-900 block">
                  {language === 'ur' ? 'اوقاتِ دواخانہ' : 'Clinic Hours'}
                </span>
                <span className="text-stone-500">
                  {language === 'ur' ? 'صبح 11:00 تا رات 10:00 (ہفتہ کے 7 دن)' : '11:00 AM - 10:00 PM (7 Days)'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="font-bold text-stone-900 block">
                  {language === 'ur' ? 'ہیلپ لائن نمبر' : 'Direct Hotline'}
                </span>
                <span className="text-[#155e42] font-mono font-bold">{STORE_PHONE}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(STORE_ADDRESS_EN)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-white text-xs font-bold transition-colors"
              >
                <span>{language === 'ur' ? 'گوگل میپس پر راستہ دیکھیں' : 'Get Google Maps Directions'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-16/10">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                alt="Karachi Dawakhana Dispensary"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/40 flex items-end p-5">
                <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-xs px-3 py-1 rounded-lg">
                  {language === 'ur' ? 'تعمیرِ صحت طبی مرکز و یونانی فارمیسی' : 'Tameer-e-Sehat Apothecary & Compound Pharmacy'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
              {language === 'ur' ? 'عام سوالات و جوابات' : 'Common Questions'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {language === 'ur' ? 'مریضوں کے عمومی سوالات' : 'Patient & Consultation FAQs'}
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-stone-900 hover:text-[#155e42]"
                  >
                    <span>{language === 'ur' ? faq.qUr : faq.qEn}</span>
                    <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-90 text-[#155e42]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in duration-200">
                      {language === 'ur' ? faq.aUr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}
