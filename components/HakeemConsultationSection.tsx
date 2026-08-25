'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  MessageSquare, 
  Star, 
  UserCheck
} from 'lucide-react';
import { HAKEEMS, STORE_PHONE, STORE_WHATSAPP } from '@/lib/data';
import { Language, HakeemProfile } from '@/lib/types';

interface HakeemConsultationSectionProps {
  language: Language;
}

export default function HakeemConsultationSection({ language }: HakeemConsultationSectionProps) {
  const [selectedHakeem, setSelectedHakeem] = useState<HakeemProfile>(HAKEEMS[0]);
  const [mode] = useState<'whatsapp-chat' | 'audio-call' | 'video-call' | 'in-clinic'>('whatsapp-chat');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Karachi',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    primaryIssue: 'Men Vitality & Stamina',
    durationOfIssue: '6 months',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-compose WhatsApp message
    const consultationText = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat Dawakhana!\n\n` +
      `🩺 *Online Hakeem Consultation Booking*\n` +
      `👨‍⚕️ Specialist: ${selectedHakeem.name}\n` +
      `👤 Patient: ${formData.fullName}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `📍 City: ${formData.city}\n` +
      `🎂 Age: ${formData.age} | Gender: ${formData.gender}\n` +
      `🔴 Issue: ${formData.primaryIssue}\n` +
      `⏳ Duration: ${formData.durationOfIssue}\n` +
      `📞 Mode: ${mode}\n` +
      (formData.notes ? `📝 Details: ${formData.notes}\n\n` : '\n') +
      `Please schedule my free consultation.`
    );

    // Open WhatsApp
    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${consultationText}`, '_blank');
  };

  return (
    <section id="consultation-section" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f0faf4] text-[#00873E] text-xs font-bold uppercase tracking-wider mb-2 border border-[#b0e6c4]">
            <Stethoscope className="w-3.5 h-3.5 text-[#00873E]" />
            <span>{language === 'ur' ? 'آن لائن حکیم مشورہ' : 'Free Hakeem Consultation'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b2317] tracking-tight">
            {language === 'ur' 
              ? 'مستند و تجربہ کار اطباء سے مفت طبی مشورہ' 
              : 'Consult Certified Herbalists & Hakims'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            {language === 'ur'
              ? 'قائم شدہ 1990 کورنگی کراچی دواخانہ — واٹس ایپ پر مکمل رازداری کے ساتھ مفت طبی مشورہ اور نبوی نسخہ جات حاصل کریں۔'
              : 'Get free, personalized herbal consultations and custom formulas directly from our certified Unani hakims with 34+ years of heritage.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hakeem Profiles Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-[#0b2317] uppercase tracking-wider flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4 text-[#00873E]" />
              <span>{language === 'ur' ? 'طبیب منتخب کریں:' : 'Select Specialist:'}</span>
            </h3>

            {HAKEEMS.map((hakim) => {
              const isSelected = selectedHakeem.id === hakim.id;

              return (
                <div
                  key={hakim.id}
                  onClick={() => setSelectedHakeem(hakim)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#f0faf4] border-[#00873E] shadow-md ring-1 ring-[#00873E]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={hakim.image}
                      alt={hakim.name}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                          {language === 'ur' ? hakim.urduName : hakim.name}
                        </h4>
                      </div>
                      
                      <p className="text-xs text-[#00873E] font-semibold mt-0.5">
                        {language === 'ur' ? hakim.titleUrdu : hakim.title}
                      </p>

                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        <span className="bg-[#e6f7ec] text-[#00873E] px-2 py-0.5 rounded-sm font-semibold text-[10px]">
                          {hakim.experienceYears}+ Yrs Exp
                        </span>

                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{hakim.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Direct WhatsApp Call Banner */}
            <div className="p-4 rounded-xl bg-[#0b2317] text-white space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase">
                <span>Immediate Assistance</span>
                <span className="bg-[#00873E] text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">Direct</span>
              </div>
              <p className="text-xs text-slate-300">
                Prefer to speak right now? Call or message our central Dawakhana line in Karachi:
              </p>
              <a
                href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20want%20direct%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {STORE_PHONE}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Consultation Intake Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-[#0b2317] mb-4 flex items-center gap-2">
              <span>{language === 'ur' ? 'آن لائن طبی فارم پُر کریں' : 'Book Free Consultation'}</span>
              <span className="text-xs font-normal text-slate-500">
                (with {selectedHakeem.name})
              </span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ur' ? 'مریض کا پورا نام' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] focus:ring-1 focus:ring-[#00873E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ur' ? 'واٹس ایپ / موبائل نمبر' : 'WhatsApp / Mobile Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] focus:ring-1 focus:ring-[#00873E] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ur' ? 'شہر' : 'City'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Karachi, Lahore..."
                    className="w-full bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ur' ? 'عمر' : 'Age'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="32"
                    className="w-full bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ur' ? 'جنس' : 'Gender'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-white text-slate-800 text-xs px-2.5 py-2 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                  >
                    <option value="male">Male (مرد)</option>
                    <option value="female">Female (خواتین)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {language === 'ur' ? 'طبی مسئلہ یا علامات' : 'Health Issue or Symptoms'} *
                </label>
                <select
                  value={formData.primaryIssue}
                  onChange={(e) => setFormData({ ...formData, primaryIssue: e.target.value })}
                  className="w-full bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                >
                  <option value="Men Vitality & Stamina">Men Vitality & Physical Stamina (مردانہ کمزوری و قوت)</option>
                  <option value="Kidney Stone & Urinary (STONIL)">Kidney Stones & Burning Urine / STONIL (گردے کی پتھری)</option>
                  <option value="Joint Pain & Arthritis (JointZen)">Joint & Knee Pain / Arthritis (جوڑوں کا درد)</option>
                  <option value="Digestive & Acidity & Gas">Stomach Acidity, Gas & Digestion (معدہ، گیس و تبخیر)</option>
                  <option value="Weight Loss & Belly Fat">Natural Weight Loss & Detox (موٹاپا و چربی)</option>
                  <option value="Skin Eczema & Psoriasis (Tahiri Marham)">Skin Eczema & Allergies (طاہری مرہم جلدی امراض)</option>
                  <option value="Liver Heat & Jaundice">Liver Heat & Jaundice / Arqiyat (جگر کی گرمی)</option>
                  <option value="General Health / Other">General Consultation (دیگر طبی مسائل)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {language === 'ur' ? 'مزید تفصیلات (اختیاری)' : 'Additional Notes / Previous Medications (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any symptoms, ongoing medicines, or medical reports..."
                  className="w-full bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ur' ? 'واٹس ایپ پر مفت مشورہ شروع کریں' : 'Send & Start WhatsApp Consultation'}</span>
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 100% Confidential • Free Assessment • Official Tameer-e-Sehat Karachi Clinic
              </p>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
