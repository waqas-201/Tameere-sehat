'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  MessageSquare, 
  Video, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Check, 
  User, 
  Award, 
  FileText, 
  HelpCircle, 
  Upload, 
  Sparkles,
  HeartPulse,
  Send,
  AlertCircle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { HAKEEMS, STORE_PHONE, STORE_WHATSAPP, STORE_ADDRESS_EN, STORE_ADDRESS_UR, PAKISTAN_CITIES } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ConsultationPage() {
  const { language } = useApp();
  const chiefHakeem = HAKEEMS[0];

  const [step, setStep] = useState(1);
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
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Evening (5:00 PM – 8:00 PM)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const symptomChecklist = [
    'Stomach Gas & Acidity (تیزابیت / تبخیر)',
    'Liver Heat & Jaundice (جگر کی گرمی)',
    'Chronic Joint / Sciatica Pain (جوڑوں کا درد)',
    'Vitality & Physical Weakness (کمزوری / اعصابی تناؤ)',
    'Kidney Stone & Burning Urine (گردے کی پتھری)',
    'Skin Eczema & Allergies (چنبل / خارش)',
    'Hair Fall & Dandruff (بالوں کا گرنا)'
  ];

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
      <div className="bg-[#0e2a1f] rounded-3xl p-8 sm:p-12 text-white shadow-md relative overflow-hidden border border-emerald-950">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-700/60 inline-flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ur' ? 'آن لائن طبی کلینک و تشخیص' : 'Certified Tele-Tibb Clinic'}</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-black leading-tight text-white">
              {language === 'ur' 
                ? 'سینئر حکیم صاحب سے براہِ راست معائنہ اور درست تشخیص' 
                : 'Direct Consultation with Senior Unani Hakims'}
            </h1>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl font-normal">
              {language === 'ur'
                ? 'اپنے مرض کی جڑ تک پہنچیں۔ ہمارے مستند حکماء نبض، زبان اور علامات کی روشنی میں آپ کے مزاج کا تعین کر کے 100% خالص نباتاتی ادویات تجویز کرتے ہیں۔'
                : 'Discover the root cause of your ailment. Based on traditional pulse, tongue, and humor analysis (Dam, Balgham, Safra, Sawda), receive custom hand-compounded prescriptions dispatched across Pakistan.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-amber-400" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Audio, Video & WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Doorstep Medication Delivery</span>
              </div>
            </div>
          </div>

          {/* Chief Hakeem Snapshot Badge */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-800 border-2 border-amber-400 flex items-center justify-center font-serif text-xl font-bold text-amber-300 shrink-0">
                HT
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">{chiefHakeem.name}</h3>
                <p className="text-xs text-amber-300">{chiefHakeem.qualification}</p>
                <p className="text-[11px] text-stone-300">{chiefHakeem.experienceYears}+ Years Clinical Practice</p>
              </div>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed border-t border-white/10 pt-2">
              National Council for Tibb Certified. Over 100,000 successful holistic treatments.
            </p>
          </div>

        </div>
      </div>

      {/* Main Multi-Step Booking & Intake Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm max-w-4xl mx-auto space-y-8">
        
        {bookingConfirmed ? (
          /* Confirmation State */
          <div className="text-center py-10 space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#155e42] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
                Appointment Dossier Ready
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {language === 'ur' ? 'آپ کی معلومات موصول ہو چکی ہیں!' : 'Your Consultation Request is Prepared!'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Click below to send your medical dossier to Hakim Muhammad Tariq on WhatsApp for immediate priority scheduling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Patient:</span>
                <strong className="text-stone-900">{fullName} ({age} yrs, {gender})</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Mode:</span>
                <strong className="text-stone-900 uppercase">{consultationMode}</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Preferred Slot:</span>
                <strong className="text-stone-900">{preferredSlot}</strong>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppDossierUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-102"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Open WhatsApp & Confirm with Hakeem</span>
              </a>

              <button
                onClick={() => setBookingConfirmed(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs"
              >
                Edit Dossier
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            
            {/* Step 1: Select Mode */}
            <div className="space-y-3">
              <label className="font-serif font-bold text-base text-stone-900 block">
                1. Select Preferred Consultation Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                
                <button
                  type="button"
                  onClick={() => setConsultationMode('whatsapp-audio')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'whatsapp-audio'
                      ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 mb-2 text-[#199b50]" />
                  <div className="font-bold text-xs">WhatsApp Audio</div>
                  <div className="text-[11px] text-stone-500">Voice call & notes</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('whatsapp-video')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'whatsapp-video'
                      ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Video className="w-5 h-5 mb-2 text-[#199b50]" />
                  <div className="font-bold text-xs">Video Call</div>
                  <div className="text-[11px] text-stone-500">Visual tongue/skin exam</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('phone')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'phone'
                      ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Phone className="w-5 h-5 mb-2 text-[#199b50]" />
                  <div className="font-bold text-xs">Standard Direct Call</div>
                  <div className="text-[11px] text-stone-500">Cellular call</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('in-clinic')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    consultationMode === 'in-clinic'
                      ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <MapPin className="w-5 h-5 mb-2 text-[#199b50]" />
                  <div className="font-bold text-xs">Karachi Clinic</div>
                  <div className="text-[11px] text-stone-500">Korangi Dispensary</div>
                </button>

              </div>
            </div>

            {/* Step 2: Patient Demographics */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <label className="font-serif font-bold text-base text-stone-900 block">
                2. Patient Particulars
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 35"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e: any) => setGender(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  >
                    <option value="male">Male (مرد)</option>
                    <option value="female">Female (خاتون)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">How Long Have You Had This Issue?</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  >
                    <option value="Few days / acute">Few days (تازہ عارضہ)</option>
                    <option value="1 to 3 months">1 to 3 months</option>
                    <option value="6 months to 1 year">6 months to 1 year</option>
                    <option value="More than 2 years (chronic)">More than 2 years (پرانا مرض)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Symptom Checklist & Medical Intake */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <label className="font-serif font-bold text-base text-stone-900 block">
                3. Primary Health Issues & Symptoms
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
                          ? 'bg-emerald-50 border-[#199b50] text-[#155e42] font-bold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>{sym}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#199b50]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <label className="font-semibold text-xs text-stone-700 block mb-1">
                  Describe Any Additional Symptoms, Past Reports, or Diet Details:
                </label>
                <textarea
                  value={symptomsDetails}
                  onChange={(e) => setSymptomsDetails(e.target.value)}
                  rows={3}
                  placeholder="e.g. Constipation, burning in feet at night, blood pressure status, or previous treatments taken..."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs outline-none focus:border-[#199b50]"
                />
              </div>
            </div>

            {/* Step 4: Slot Picker */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <label className="font-serif font-bold text-base text-stone-900 block">
                4. Select Preferred Timing Slot
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {['Morning (11:00 AM – 2:00 PM)', 'Evening (5:00 PM – 8:00 PM)', 'Night (8:30 PM – 10:30 PM)'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredSlot(slot)}
                    className={`p-3.5 rounded-xl text-center border font-semibold transition-all ${
                      preferredSlot === slot
                        ? 'bg-[#0e2a1f] text-white border-[#0e2a1f]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero consultation fee for standard telephonic & WhatsApp triage</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-102"
              >
                <span>Proceed to Appointment Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>

      {/* Physical Dispensary Clinic Info */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 border border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-amber-400">Karachi Central Dispensary</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'ur' ? STORE_ADDRESS_UR : STORE_ADDRESS_EN}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-emerald-400">Walk-in Consultation Hours</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Monday – Saturday: 10:00 AM – 10:00 PM<br />
              Sunday: 11:00 AM – 8:00 PM
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-white">Direct Clinical Line</h3>
            <p className="text-xs text-stone-300 font-mono">
              Phone: {STORE_PHONE}<br />
              WhatsApp: +{STORE_WHATSAPP}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
