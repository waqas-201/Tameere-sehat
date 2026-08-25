'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Award,
  Stethoscope
} from 'lucide-react';
import { 
  STORE_PHONE, 
  STORE_EMAIL, 
  STORE_WHATSAPP, 
  STORE_ADDRESS_EN, 
  STORE_ADDRESS_UR 
} from '@/lib/data';
import BrandLogo from './BrandLogo';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { language } = useApp();

  return (
    <footer className="bg-[#0b2317] text-slate-300 border-t border-emerald-950/80">
      
      {/* Top Value Assurance Banner */}
      <div className="border-b border-emerald-950/60 bg-[#081a11] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00873E]/20 text-[#00873E] flex items-center justify-center shrink-0 border border-[#00873E]/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {language === 'ur' ? '100% خالص نباتات' : '100% Pure Organics'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {language === 'ur' ? 'اسٹیرائڈ اور کیمیکل سے پاک' : 'Steroid & Chemical Free'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00873E]/20 text-[#00873E] flex items-center justify-center shrink-0 border border-[#00873E]/40">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {language === 'ur' ? 'ملک بھر میں کیش آن ڈلیوری' : 'Nationwide COD'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {language === 'ur' ? '250 سے زائد شہروں میں ترسیل' : 'Cash on Delivery in 250+ Cities'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00873E]/20 text-[#00873E] flex items-center justify-center shrink-0 border border-[#00873E]/40">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {language === 'ur' ? 'مفت حکیم مشورہ' : 'Free Hakeem Advice'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {language === 'ur' ? 'واٹس ایپ کلینیکل ہیلپ لائن' : 'WhatsApp Clinical Helpline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00873E]/20 text-[#00873E] flex items-center justify-center shrink-0 border border-[#00873E]/40">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {language === 'ur' ? 'قائم شدہ 1990' : 'Established 1990'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {language === 'ur' ? 'کراچی کا مرکزی دواخانہ' : 'Karachi Central Dawakhana'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              {language === 'ur'
                ? 'تعمیرِ صحت — کراچی کا معتبر ہربل دواخانہ اور خالص جڑی بوٹیوں کا مرکز۔ خالص ہمالیائی سلاجیت، طاہری مرہم، اسٹونل اور نبوی نسخہ جات۔'
                : 'Tameer-e-Sehat — Botanical Apothecary & Certified Unani Dawakhana. Providing genuine therapeutic herbs, pure Himalayan Shilajit, Tahiri balm, and custom compounding since 1990.'}
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00873E] shrink-0 mt-0.5" />
                <span>{language === 'ur' ? STORE_ADDRESS_UR : STORE_ADDRESS_EN}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00873E] shrink-0" />
                <span className="font-mono">{STORE_PHONE}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00873E] shrink-0" />
                <span>{STORE_EMAIL}</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">
              {language === 'ur' ? 'دواخانہ مصنوعات' : 'House-Made Remedies'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/shop?category=honey-shifa" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'خالص سلاجیت و زعفران' : 'Himalayan Shilajit & Saffron'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=herbal-oils" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'روغنیات و طاہری مرہم' : 'Tahiri Healing Balms & Oils'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=arqiyat" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'عرقِیات و مقطرات' : 'Distilled Pure Arqiyat'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=majun-jawarish" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'معجون، خمیرہ و جوارش' : 'Majun & Jawarish'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=raw-herbs" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'خالص جڑی بوٹیاں و بیج' : 'Raw Wildcrafted Herbs'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=health-courses" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'مکمل طبی کورسز' : 'Holistic Treatment Courses'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Services */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">
              {language === 'ur' ? 'مریضوں کی خدمات' : 'Patient Care & Clinic'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/consultation" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#00873E]" />
                  <span>{language === 'ur' ? 'آن لائن حکیم مشورہ' : 'Hakeem Consultation'}</span>
                </Link>
              </li>
              <li>
                <Link href="/mizaj-test" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'آن لائن مزاج ٹیسٹ' : 'Mizaj Assessment Quiz'}
                </Link>
              </li>
              <li>
                <Link href="/prescription-upload" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'نسخہ یا پرچی اپلوڈ' : 'Upload Prescription Slip'}
                </Link>
              </li>
              <li>
                <Link href="/custom-compound" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'ذاتی نسخہ تیار کریں' : 'Custom Compounding Mixer'}
                </Link>
              </li>
              <li>
                <Link href="/encyclopedia" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'قاموس الادویہ (ڈکشنری)' : 'Herbal Encyclopedia'}
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-emerald-300 transition-colors">
                  {language === 'ur' ? 'آرڈر ٹریکنگ' : 'Track Order Status'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinic Hours & Quick Helpline */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">
              {language === 'ur' ? 'دواخانہ کے اوقات' : 'Dispensary Hours'}
            </h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-normal">
              <p className="text-white font-medium">
                {language === 'ur' ? 'پیر تا ہفتہ:' : 'Monday – Saturday:'}
              </p>
              <p className="font-mono">
                {language === 'ur' ? 'صبح 10:00 تا رات 10:00' : '10:00 AM – 10:00 PM'}
              </p>
              <p className="text-white font-medium pt-1">
                {language === 'ur' ? 'اتوار:' : 'Sunday:'}
              </p>
              <p className="font-mono">
                {language === 'ur' ? 'صبح 11:00 تا شام 08:00' : '11:00 AM – 08:00 PM'}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ur' ? 'واٹس ایپ ہیلپ لائن' : 'WhatsApp Helpline'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {language === 'ur' 
              ? `© ${new Date().getFullYear()} تعمیرِ صحت ہربل دواخانہ۔ جملہ حقوق محفوظ ہیں۔` 
              : `© ${new Date().getFullYear()} Tameer-e-Sehat Botanical Dawakhana. All rights reserved.`}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/about" className="hover:text-emerald-300">
              {language === 'ur' ? 'ہمارے متعلق' : 'About Us'}
            </Link>
            <span>•</span>
            <Link href="/shop" className="hover:text-emerald-300">
              {language === 'ur' ? 'تمام ادویات' : 'All Products'}
            </Link>
            <span>•</span>
            <Link href="/consultation" className="hover:text-emerald-300">
              {language === 'ur' ? 'حکیم مشورہ' : 'Consultation'}
            </Link>
            <span>•</span>
            <span>{language === 'ur' ? 'ٹی سی ایس اور لیپرڈز کیش آن ڈلیوری' : 'TCS & Leopards Nationwide COD'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
