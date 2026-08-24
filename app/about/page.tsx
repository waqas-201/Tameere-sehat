'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Leaf, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { 
  STORE_PHONE, 
  STORE_EMAIL, 
  STORE_WHATSAPP, 
  STORE_ADDRESS_EN, 
  STORE_ADDRESS_UR,
  HAKEEMS
} from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function AboutPage() {
  const { language } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Heritage Section */}
      <div className="bg-[#0e2a1f] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-emerald-950 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-600/50 text-emerald-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Serving Pakistan Since 1990 • 34+ Years of Healing</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black leading-tight text-white">
            {language === 'ur' 
              ? 'تعمیرِ صحت دواخانہ — خالص یونانی حکمت اور سچی قدرتی شفاء' 
              : 'Preserving Ancient Unani Wisdom for Modern Vitality'}
          </h1>

          <p className="text-stone-300 text-xs sm:text-base leading-relaxed font-normal">
            {language === 'ur'
              ? 'تعمیرِ صحت کا قیام 1990 میں کراچی میں عمل میں آیا۔ ہمارا بنیادی مقصد کیمیکلز اور سائیڈ ایفیکٹس کے بغیر خالص نباتاتی ادویات اور سچے نبوی نسخہ جات کے ذریعے انسانیت کی خدمت ہے۔'
              : 'Founded in Karachi in 1990, Tameer-e-Sehat Dawakhana has championed the authentic science of Tibb-e-Unani. We remain dedicated to pure, wildcrafted botanicals, ethical preparation, and individualized patient care.'}
          </p>
        </div>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
              Our Foundational Ethics
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Pure Copper Still Distillation & Sun-Cured Remedies
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <p>
              In an era dominated by synthetic additives and steroid-laced concoctions, Tameer-e-Sehat stays faithful to classical pharmacopeias. Our famous Arqiyat are distilled through traditional copper deg-bhabka steam methods, ensuring the full volatile essence of rose petals, kasni, and fennel is captured without burnt odors.
            </p>
            <p>
              Our high-grade Skardu Shilajit is purified across 40 days using solar decantation (*Aftaabi method*), retaining 84+ ionic minerals and fulvic acid in raw bioavailability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <div className="font-serif font-black text-2xl text-[#155e42]">34+</div>
              <div className="text-xs font-bold text-stone-800 mt-0.5">Years Legacy</div>
              <div className="text-[11px] text-stone-500">Established 1990</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <div className="font-serif font-black text-2xl text-[#155e42]">100k+</div>
              <div className="text-xs font-bold text-stone-800 mt-0.5">Patients Treated</div>
              <div className="text-[11px] text-stone-500">Across Pakistan & Overseas</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1608248597358-1e428e8f8ec8?auto=format&fit=crop&w=1000&q=80"
              alt="Traditional Apothecary Laboratory"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

      </div>

      {/* Meet Our Hakims */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            Qualified Unani Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Certified Physicians & Compounding Experts
          </h2>
          <p className="text-xs text-stone-500">
            Registered with the National Council for Tibb, Government of Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {HAKEEMS.map((hakim) => (
            <div key={hakim.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0e2a1f] text-emerald-300 flex items-center justify-center font-serif text-2xl font-bold border-2 border-amber-400 shrink-0">
                  {hakim.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">{hakim.name}</h3>
                  <p className="text-xs text-[#155e42] font-semibold">{hakim.title}</p>
                  <p className="text-[11px] text-stone-500">{hakim.qualification} • {hakim.experienceYears} Years Exp.</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'ur' ? hakim.bioUrdu : hakim.bio}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">{hakim.availableDays}</span>
                <Link
                  href="/consultation"
                  className="px-4 py-2 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white text-xs font-bold transition-colors"
                >
                  Book Consult
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Karachi Physical Clinic Information */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Dispensary & Walk-In Clinic
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Visit Us in Korangi, Karachi
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Patients are welcome to visit our physical dawakhana for direct pulse examination (معائنہ نبض), custom compounding, and collecting fresh herbal preparations.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{language === 'ur' ? STORE_ADDRESS_UR : STORE_ADDRESS_EN}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Monday – Saturday: 10:00 AM – 10:00 PM | Sunday: 11:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{STORE_PHONE}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20want%20directions%20to%20your%20Karachi%20dawakhana.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Location on WhatsApp</span>
            </a>

            <Link
              href="/shop"
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <span>Explore House Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
