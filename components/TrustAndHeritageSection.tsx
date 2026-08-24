'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Star, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Building2,
  Users,
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';
import { REVIEWS, FAQS, STORE_ADDRESS_EN, STORE_ADDRESS_UR, STORE_PHONE, STORE_WHATSAPP } from '@/lib/data';
import { Language } from '@/lib/types';

interface TrustAndHeritageSectionProps {
  language: Language;
}

export default function TrustAndHeritageSection({ language }: TrustAndHeritageSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#fbfbf9] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Heritage Banner (Luxury Forest Green #0e2a1f) */}
        <div className="bg-[#0e2a1f] text-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-emerald-950/40 relative overflow-hidden border border-emerald-500/20">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'ur' ? 'قائم شدہ 1990 — کورنگی، کراچی' : 'Apothecary Heritage Since 1990 — Karachi, Pakistan'}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-stone-100 leading-tight">
                {language === 'ur' 
                  ? '34 سالہ طبی صداقت اور خالص نباتاتی ادویات کا معتبر نام' 
                  : '34+ Years of Uncompromising Botanical Integrity'}
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {language === 'ur'
                  ? 'تعمیرِ صحت کی بنیاد 1990 میں کراچی میں رکھی گئی۔ ہم بغیر کسی مصنوعی کیمیکل، سٹیرائیڈ یا ملاوٹ کے خالص نبوی و یونانی ادویات اور خام جڑی بوٹیاں پورے پاکستان میں فراہم کرتے ہیں۔'
                  : 'Founded in 1990 in Karachi, Tameer-e-Sehat compounds authentic Unani remedies with strictly wildcrafted botanicals, clinical sterile standards, and personalized Hakeem care.'}
              </p>

              {/* 4 Pillars Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-900/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-serif">34+</div>
                  <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">Years Heritage</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-serif">100k+</div>
                  <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">Happy Patients</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-serif">100%</div>
                  <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">Steroid-Free</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-serif">250+</div>
                  <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">Cities COD</div>
                </div>
              </div>
            </div>

            {/* Right Card: Karachi Flagship Apothecary Info */}
            <div className="lg:col-span-4 bg-stone-900/90 backdrop-blur-md text-white p-6 rounded-2xl border border-stone-700/80 space-y-3 text-xs shadow-xl">
              <span className="font-bold text-emerald-400 uppercase tracking-widest block text-[11px]">
                {language === 'ur' ? 'مرکزی دواخانہ و کلینک' : 'Karachi Central Apothecary'}
              </span>
              <div className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {language === 'ur' ? STORE_ADDRESS_UR : STORE_ADDRESS_EN}
                </span>
              </div>
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-stone-300">
                <span>Clinic WhatsApp Helpline:</span>
                <span className="font-bold text-emerald-300 font-mono">{STORE_PHONE}</span>
              </div>
              <a
                href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat!%20I%20want%20to%20consult%20the%20Hakeem.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ur' ? 'مفت آن لائن مشورہ لیں' : 'Book Free Consultation'}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Customer Reviews & Verified Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#155e42] uppercase tracking-widest">
              {language === 'ur' ? 'تصدیق شدہ خریداروں کے تاثرات' : 'Clinical Outcomes & Reviews'}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
              {language === 'ur' ? 'شفا اور اعتماد کے زندہ تجربات' : 'Loved by Thousands Across Pakistan'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-[#199b50] transition-all flex flex-col justify-between shadow-2xs hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4 italic">
                    &ldquo;{language === 'ur' ? rev.commentUrdu : rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900 font-serif">{rev.userName}</span>
                    <span className="text-[10px] text-[#155e42] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Verified Buyer
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mt-1">
                    <span>{rev.city}</span>
                    <span className="text-stone-600 font-medium">{rev.productName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#155e42] uppercase tracking-widest">
              {language === 'ur' ? 'عام سوالات و جوابات' : 'Clear Answers'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : 'Frequently Asked Questions'}
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200/90 bg-white overflow-hidden transition-all shadow-2xs hover:border-[#199b50]"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-800 hover:text-[#155e42] transition-colors"
                  >
                    <span>{language === 'ur' ? faq.qUr : faq.qEn}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#199b50] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {language === 'ur' ? faq.aUr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
