'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  MessageSquare, 
  Video, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { HAKEEMS, STORE_PHONE, STORE_WHATSAPP, STORE_ADDRESS_EN, STORE_ADDRESS_UR, PAKISTAN_CITIES } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ConsultationPage() {
  const { language } = useApp();
  const chiefHakeem = HAKEEMS[0];

  const [consultationMode, setConsultationMode] = useState<'whatsapp-video' | 'whatsapp-audio' | 'phone' | 'in-clinic'>('whatsapp-audio');
  
  // Patient Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [primaryIssue, setPrimaryIssue] = useState('');
  const [duration, setDuration] = useState('1 to 3 months');
  const [symptomsDetails, setSymptomsDetails] = useState('');
  const [preferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Evening (5:00 PM – 8:00 PM)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const symptomChecklistEn = [
    'Stomach Gas & Acidity',
    'Liver Heat & Jaundice',
    'Chronic Joint / Sciatica Pain',
    'Vitality & Physical Weakness',
    'Kidney Stone & Burning Urine',
    'Skin Eczema & Allergies',
    'Hair Fall & Dandruff'
  ];

  const symptomChecklistUr = [
    'معدے کی گیس، جلن و تبخیر',
    'جگر کی گرمی اور یرقان',
    'جوڑوں کا درد، عرق النساء و کمر درد',
    'اعصابی کمزوری اور جسمانی تھکن',
    'گردے کی پتھری و پیشاب کی جلن',
    'جلدی خارش، چنبل و الرجی',
    'بالوں کا گرنا اور خشکی'
  ];

  const symptomChecklist = language === 'ur' ? symptomChecklistUr : symptomChecklistEn;

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setBookingConfirmed(true);
  };

  const getWhatsAppDossierUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Hakim Sahab!\n\n` +
      `🩺 *NEW ONLINE CONSULTATION DOSSIER:*\n` +
      `👤 *Patient Name:* ${fullName}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🏙️ *City:* ${city}\n` +
      `🎂 *Age / Gender:* ${age} yrs / ${gender}\n` +
      `💻 *Mode:* ${consultationMode.toUpperCase()}\n` +
      `⏰ *Preferred Time:* ${preferredDate || 'Earliest available'} (${preferredSlot})\n` +
      `📋 *Primary Issue:* ${primaryIssue || 'General Consultation'}\n` +
      `⏱️ *Duration:* ${duration}\n` +
      `🌿 *Symptoms Checklist:* ${selectedSymptoms.join(', ') || 'None selected'}\n` +
      `📝 *Notes:* ${symptomsDetails || 'N/A'}\n\n` +
      `Please confirm my consultation appointment slot.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      
      {/* Top Hero Banner */}
      <div className="bg-[#0b2317] rounded-3xl p-8 sm:p-12 text-white shadow-md relative overflow-hidden border border-emerald-950">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-bold text-white uppercase tracking-widest bg-[#00873E] px-3.5 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-white" />
              <span>{language === 'ur' ? 'آن لائن طبی کلینک و معائنہ' : 'Certified Tele-Tibb Clinic'}</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-black leading-tight text-white">
              {language === 'ur' 
                ? 'سینئر اطباء سے براہِ راست مشورہ اور مستند علاج' 
                : 'Direct Consultation with Senior Unani Hakims'}
            </h1>

            <p className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-2xl font-normal">
              {language === 'ur'
                ? 'اپنے مرض کی جڑ تک پہنچیں۔ ہمارے مستند اطباء نبض، زبان اور علامات کی روشنی میں آپ کے مزاج کا تعین کر کے خالص نباتاتی ادویات اور غذائی پرہیز نامہ تجویز کرتے ہیں۔'
                : 'Discover the root cause of your ailment. Based on traditional pulse, tongue, and humor analysis (Dam, Balgham, Safra, Sawda), receive custom hand-compounded prescriptions dispatched across Pakistan.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ur' ? '100% مکمل راز داری' : '100% Confidential'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ur' ? 'آڈیو، ویڈیو اور واٹس ایپ' : 'Audio, Video & WhatsApp'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ur' ? 'گھر کی دہلیز پر ادویات کی فراہمی' : 'Doorstep Medication Delivery'}</span>
              </div>
            </div>
          </div>

          {/* Chief Hakeem Snapshot Badge */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#00873E] border-2 border-white/40 flex items-center justify-center font-serif text-xl font-bold text-white shrink-0">
                {language === 'ur' ? 'حکیم' : 'HT'}
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">
                  {language === 'ur' ? chiefHakeem.urduName : chiefHakeem.name}
                </h3>
                <p className="text-xs text-emerald-200">
                  {language === 'ur' ? (chiefHakeem.qualificationUrdu || chiefHakeem.qualification) : chiefHakeem.qualification}
                </p>
                <p className="text-[11px] text-slate-300">
                  {language === 'ur' ? `${chiefHakeem.experienceYears} سالہ کلینیکل تجربہ` : `${chiefHakeem.experienceYears}+ Years Clinical Practice`}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed border-t border-white/10 pt-2">
              {language === 'ur'
                ? 'نیشنل کونسل فار طب سے منظور شدہ۔ ہزاروں مریضوں کا کامیاب اور قدرتی علاج۔'
                : 'National Council for Tibb Certified. Over 100,000 successful holistic treatments.'}
            </p>
          </div>

        </div>
      </div>

      {/* Main Multi-Step Booking & Intake Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-8">
        
        {bookingConfirmed ? (
          /* Confirmation State */
          <div className="text-center py-10 space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00873E] uppercase tracking-widest">
                {language === 'ur' ? 'طبی تفصیلات تیار ہیں' : 'Appointment Dossier Ready'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {language === 'ur' ? 'آپ کی معلومات موصول ہو چکی ہیں!' : 'Your Consultation Request is Prepared!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {language === 'ur'
                  ? 'فوری رابطہ اور وقت کے تعین کے لیے نیچے دیے گئے بٹن پر کلک کر کے واٹس ایپ پر حکیم صاحب کو تفصیلات بھیجیں۔'
                  : 'Click below to send your medical dossier to Hakim Muhammad Tariq on WhatsApp for immediate priority scheduling.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{language === 'ur' ? 'مریض کا نام:' : 'Patient:'}</span>
                <strong className="text-slate-900">{fullName} ({age} {language === 'ur' ? 'سال' : 'yrs'})</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'ur' ? 'رابطہ کا ذریعہ:' : 'Mode:'}</span>
                <strong className="text-slate-900 uppercase">{consultationMode}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'ur' ? 'پسندیدہ وقت:' : 'Preferred Slot:'}</span>
                <strong className="text-slate-900">{preferredSlot}</strong>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppDossierUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00873E]/20 transition-all hover:scale-102"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{language === 'ur' ? 'واٹس ایپ پر حکیم صاحب سے تصدیق کریں' : 'Open WhatsApp & Confirm with Hakeem'}</span>
              </a>

              <button
                onClick={() => setBookingConfirmed(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
              >
                {language === 'ur' ? 'معلومات درست کریں' : 'Edit Dossier'}
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            
            {/* Step 1: Select Mode */}
            <div className="space-y-3">
              <label className="font-serif font-bold text-base text-slate-900 block">
                {language === 'ur' ? '1. رابطے کا پسندیدہ طریقہ منتخب کریں' : '1. Select Preferred Consultation Mode'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                
                <button
                  type="button"
                  onClick={() => setConsultationMode('whatsapp-audio')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'whatsapp-audio'
                      ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] ring-2 ring-[#00873E]/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 mb-2 text-[#00873E]" />
                  <div className="font-bold text-xs">
                    {language === 'ur' ? 'واٹس ایپ وائس کال' : 'WhatsApp Audio'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'ur' ? 'صوتی گفتگو و وائس نوٹس' : 'Voice call & notes'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('whatsapp-video')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'whatsapp-video'
                      ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] ring-2 ring-[#00873E]/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-5 h-5 mb-2 text-[#00873E]" />
                  <div className="font-bold text-xs">
                    {language === 'ur' ? 'ویڈیو کال' : 'Video Call'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'ur' ? 'زبان و چہرے کا تصویری معائنہ' : 'Visual tongue/skin exam'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('phone')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'phone'
                      ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] ring-2 ring-[#00873E]/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Phone className="w-5 h-5 mb-2 text-[#00873E]" />
                  <div className="font-bold text-xs">
                    {language === 'ur' ? 'فون کال' : 'Standard Direct Call'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'ur' ? 'موبائل سم کال' : 'Cellular call'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('in-clinic')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'in-clinic'
                      ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] ring-2 ring-[#00873E]/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-5 h-5 mb-2 text-[#00873E]" />
                  <div className="font-bold text-xs">
                    {language === 'ur' ? 'کراچی دواخانہ آمد' : 'Karachi Clinic'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'ur' ? 'نبض شناسی و بالمشافہ ملاقات' : 'Korangi Dispensary'}
                  </div>
                </button>

              </div>
            </div>

            {/* Step 2: Patient Demographics */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="font-serif font-bold text-base text-slate-900 block">
                {language === 'ur' ? '2. مریض کی بنیادی تفصیلات' : '2. Patient Particulars'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'پورا نام *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ur' ? 'مثلاً: محمد عثمان' : 'e.g. Muhammad Usman'}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'واٹس ایپ یا فون نمبر *' : 'WhatsApp Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'شہر *' : 'City *'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'عمر (سالوں میں) *' : 'Age (Years) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="35"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'جنس *' : 'Gender *'}
                  </label>
                  <select
                    value={gender}
                    onChange={(e: any) => setGender(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  >
                    <option value="male">{language === 'ur' ? 'مرد' : 'Male'}</option>
                    <option value="female">{language === 'ur' ? 'خاتون' : 'Female'}</option>
                    <option value="other">{language === 'ur' ? 'دیگر' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'مرض کتنا پرانا ہے؟' : 'How Long Have You Had This Issue?'}
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  >
                    <option value="Few days / acute">{language === 'ur' ? 'چند دن (تازہ عارضہ)' : 'Few days'}</option>
                    <option value="1 to 3 months">{language === 'ur' ? '1 سے 3 ماہ' : '1 to 3 months'}</option>
                    <option value="6 months to 1 year">{language === 'ur' ? '6 ماہ سے 1 سال' : '6 months to 1 year'}</option>
                    <option value="More than 2 years (chronic)">{language === 'ur' ? '2 سال سے زیادہ (پرانا مرض)' : 'More than 2 years'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Symptom Checklist & Medical Intake */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="font-serif font-bold text-base text-slate-900 block">
                {language === 'ur' ? '3. اہم علامات و تکالیف منتخب کریں' : '3. Primary Health Issues & Symptoms'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {symptomChecklist.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{sym}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#00873E]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <label className="font-semibold text-xs text-slate-700 block mb-1">
                  {language === 'ur' 
                    ? 'مزید علامات، سابقہ ادویات یا غذا کی تفصیلات لکھیں:' 
                    : 'Describe Any Additional Symptoms, Past Reports, or Diet Details:'}
                </label>
                <textarea
                  value={symptomsDetails}
                  onChange={(e) => setSymptomsDetails(e.target.value)}
                  rows={3}
                  placeholder={
                    language === 'ur'
                      ? 'مثلاً: قبض، رات کو پاؤں میں جلن، بلڈ پریشر یا پہلے استعمال شدہ ادویات...'
                      : 'e.g. Constipation, burning in feet at night, blood pressure status, or previous treatments taken...'
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs outline-none focus:border-[#00873E]"
                />
              </div>
            </div>

            {/* Step 4: Slot Picker */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="font-serif font-bold text-base text-slate-900 block">
                {language === 'ur' ? '4. رابطے کے لیے مناسب وقت کا انتخاب' : '4. Select Preferred Timing Slot'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { en: 'Morning (11:00 AM – 2:00 PM)', ur: 'صبح (11:00 تا 2:00 بجے)' },
                  { en: 'Evening (5:00 PM – 8:00 PM)', ur: 'شام (5:00 تا 8:00 بجے)' },
                  { en: 'Night (8:30 PM – 10:30 PM)', ur: 'رات (8:30 تا 10:30 بجے)' }
                ].map((slot) => {
                  const label = language === 'ur' ? slot.ur : slot.en;
                  const isSelected = preferredSlot === slot.en || preferredSlot === slot.ur;
                  return (
                    <button
                      key={slot.en}
                      type="button"
                      onClick={() => setPreferredSlot(language === 'ur' ? slot.ur : slot.en)}
                      className={`p-3.5 rounded-xl text-center border font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#00873E] text-white border-[#00873E] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00873E]" />
                <span>
                  {language === 'ur' 
                    ? 'ابتدائی آن لائن و واٹس ایپ مشورے کی کوئی فیس نہیں ہے' 
                    : 'Zero consultation fee for standard telephonic & WhatsApp triage'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00873E]/20 transition-all hover:scale-102"
              >
                <span>{language === 'ur' ? 'وقت کی تصدیق کے لیے آگے بڑھیں' : 'Proceed to Appointment Confirmation'}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </form>
        )}

      </div>

      {/* Physical Dispensary Clinic Info */}
      <div className="bg-[#0b2317] text-white rounded-3xl p-8 sm:p-10 border border-emerald-950">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-emerald-300">
              {language === 'ur' ? 'کراچی مرکزی دواخانہ و کلینک' : 'Karachi Central Dispensary'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ur' ? STORE_ADDRESS_UR : STORE_ADDRESS_EN}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#00873E]">
              {language === 'ur' ? 'ملاقات و کلینک کے اوقات' : 'Walk-in Consultation Hours'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ur' 
                ? 'پیر تا ہفتہ: صبح 10:00 تا رات 10:00\nاتوار: صبح 11:00 تا شام 8:00' 
                : 'Monday – Saturday: 10:00 AM – 10:00 PM\nSunday: 11:00 AM – 8:00 PM'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-white">
              {language === 'ur' ? 'براہِ راست طبی ہیلپ لائن' : 'Direct Clinical Line'}
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              {language === 'ur' ? 'فون نمبر:' : 'Phone:'} {STORE_PHONE}<br />
              {language === 'ur' ? 'واٹس ایپ:' : 'WhatsApp:'} +{STORE_WHATSAPP}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
