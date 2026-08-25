'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Check, 
  ShieldAlert, 
  ShoppingBag
} from 'lucide-react';
import { HERB_ENCYCLOPEDIA } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function EncyclopediaPage() {
  const { language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMizaj, setSelectedMizaj] = useState<string>('All');
  const [selectedHerb, setSelectedHerb] = useState(HERB_ENCYCLOPEDIA[0]);

  const filteredHerbs = useMemo(() => {
    return HERB_ENCYCLOPEDIA.filter((herb) => {
      if (selectedMizaj !== 'All') {
        if (!herb.mizaj.toLowerCase().includes(selectedMizaj.toLowerCase())) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = herb.englishName.toLowerCase().includes(q) || herb.urduName.includes(q);
        const matchesBotanical = herb.botanicalName.toLowerCase().includes(q);
        const matchesUses = herb.primaryUses.some(u => u.toLowerCase().includes(q));
        if (!matchesName && !matchesBotanical && !matchesUses) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedMizaj]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="bg-[#0b2317] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-950 space-y-4">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-bold text-white uppercase tracking-widest bg-[#00873E] px-3.5 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'یونانی مفردات و بوٹیاں' : 'Classical Unani Botanical Index'}</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white">
            {language === 'ur' ? 'قاموس الادویہ — ہربل انسائیکلوپیڈیا' : 'Qamoos-ul-Adwiyah (Herbal Encyclopedia)'}
          </h1>

          <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal">
            {language === 'ur'
              ? 'مستند یونانی جڑی بوٹیوں کی تفصیلات، نباتاتی نام، مزاج، طبی خواص اور درست طریقہ استعمال۔'
              : 'Explore the therapeutic properties, botanical taxonomy, Unani temperamental classifications (Mizaj), and safe administration methods of classic medicinal herbs.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ur' ? 'اردو نام، انگریزی نام یا فوائد سے تلاش کریں...' : 'Search by Urdu, English, Botanical Name or Benefit...'}
              className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-[#00873E]"
            />
            <Search className={`w-4 h-4 text-slate-400 absolute ${language === 'ur' ? 'right-3.5' : 'left-3.5'} top-3.5`} />
          </div>

          <select
            value={selectedMizaj}
            onChange={(e) => setSelectedMizaj(e.target.value)}
            className="bg-[#00873E] text-white text-xs font-semibold px-4 py-3 rounded-2xl border border-white/20 outline-none"
          >
            <option value="All" className="bg-slate-900 text-white">{language === 'ur' ? 'تمام مزاج (کل نباتات)' : 'All Temperaments (تمام مزاج)'}</option>
            <option value="Garm" className="bg-slate-900 text-white">{language === 'ur' ? 'گرم مزاج ادویات' : 'Garm (Hot - گرم)'}</option>
            <option value="Sard" className="bg-slate-900 text-white">{language === 'ur' ? 'سرد مزاج ادویات' : 'Sard (Cold - سرد)'}</option>
            <option value="Khushk" className="bg-slate-900 text-white">{language === 'ur' ? 'خشک مزاج ادویات' : 'Khushk (Dry - خشک)'}</option>
            <option value="Tar" className="bg-slate-900 text-white">{language === 'ur' ? 'تر مزاج ادویات' : 'Tar (Moist - تر)'}</option>
          </select>
        </div>
      </div>

      {/* Encyclopedia Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Botanical Directory List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3 max-h-[750px] overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>{language === 'ur' ? `فہرست ادویہ و نباتات (${filteredHerbs.length})` : `Botanical Index (${filteredHerbs.length})`}</span>
            <span>{language === 'ur' ? 'الف تا ے' : 'A to Z'}</span>
          </div>

          <div className="space-y-2">
            {filteredHerbs.map((herb) => {
              const isSelected = selectedHerb?.id === herb.id;
              return (
                <div
                  key={herb.id}
                  onClick={() => setSelectedHerb(herb)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-[#f0faf4] border-[#00873E] shadow-xs'
                      : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/80'
                  }`}
                >
                  <img
                    src={herb.image}
                    alt={herb.englishName}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {language === 'ur' ? herb.urduName : herb.englishName}
                      </h4>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded font-mono font-bold text-[#00873E] border border-slate-200 shrink-0">
                        {language === 'ur' ? herb.mizajUrdu : herb.mizaj.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-[#00873E] font-semibold truncate">
                      {language === 'ur' ? herb.englishName : herb.urduName}
                    </div>
                    <div className="text-[10px] text-slate-400 italic truncate font-serif">
                      {herb.botanicalName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Botanical Profile Showcase (7 cols) */}
        {selectedHerb && (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 sticky top-28">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#00873E] uppercase tracking-widest">
                  {language === 'ur' ? 'مفرد دوا کی شناخت' : 'Unani Monograph'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  {language === 'ur' ? selectedHerb.urduName : selectedHerb.englishName}
                </h2>
                <h3 className="font-serif text-lg font-bold text-[#00873E]">
                  {language === 'ur' ? selectedHerb.englishName : selectedHerb.urduName}
                </h3>
                <p className="text-xs text-slate-400 italic font-serif">
                  {language === 'ur' ? 'نباتاتی (لاطینی) نام:' : 'Botanical Name:'} {selectedHerb.botanicalName}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f0faf4] border border-[#b0e6c4] text-center shrink-0">
                <span className="text-[10px] font-bold text-[#00873E] uppercase tracking-wider block">
                  {language === 'ur' ? 'طبی مزاج' : 'Mizaj (مزاج)'}
                </span>
                <span className="font-bold text-xs text-slate-800">
                  {language === 'ur' ? selectedHerb.mizajUrdu : selectedHerb.mizaj}
                </span>
                <span className="text-[11px] text-[#00873E] block mt-0.5 font-semibold">
                  {language === 'ur' ? selectedHerb.mizaj : selectedHerb.mizajUrdu}
                </span>
              </div>
            </div>

            {/* Botanical Image Showcase */}
            <div className="relative aspect-16/8 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedHerb.image}
                alt={selectedHerb.englishName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                {language === 'ur' ? 'قرابادین خلاصہ و تعارف:' : 'Pharmacopeial Monograph & Overview:'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'ur' ? selectedHerb.descriptionUrdu : selectedHerb.description}
              </p>
            </div>

            {/* Primary Uses & Health Actions */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif font-bold text-sm text-slate-900">
                {language === 'ur' ? 'خواص، افعال و فوائد:' : 'Key Therapeutic Uses (خواص و فوائد):'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedHerb.primaryUses.map((use, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-800">
                    <Check className="w-3.5 h-3.5 text-[#00873E] shrink-0 mt-0.5" />
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Precautions */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-xs text-amber-950">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>{language === 'ur' ? 'احتیاط اور مصلح ادویات:' : 'Precautions & Contraindications (احتیاط و مضرات):'}</span>
              </div>
              <p className="text-amber-900 leading-relaxed">
                {selectedHerb.precautions}
              </p>
            </div>

            {/* Quick Action to Shop this Herb */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {language === 'ur' ? 'خالص اور صاف شدہ جڑی بوٹی دواخانہ پر دستیاب ہے' : 'Available pure & wildcrafted in our dispensary'}
              </span>

              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'دواخانہ سے خریدیں' : 'Buy Pure Herb in Store'}</span>
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
