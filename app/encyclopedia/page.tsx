'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Leaf, 
  Sparkles, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  ShoppingBag,
  ArrowRight,
  ChevronRight
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
      <div className="bg-[#0e2a1f] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-950 space-y-4">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-700 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'یونانی مفردات و بوٹیاں' : 'Classical Unani Botanical Index'}</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white">
            {language === 'ur' ? 'قاموس الادویہ — ہربل انسائیکلوپیڈیا' : 'Qamoos-ul-Adwiyah (Herbal Encyclopedia)'}
          </h1>

          <p className="text-xs sm:text-base text-stone-200 leading-relaxed font-normal">
            {language === 'ur'
              ? 'مستند یونانی جڑی بوٹیوں کی تفصیلات، نباتاتی نام، مزاج، طبی خواص اور درست طریقہ استعمال۔'
              : 'Explore the therapeutic properties, botanical taxonomy, Unani temperamental classifications (*Mizaj*), and safe administration methods of classic medicinal herbs.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Urdu, English, Botanical Name or Benefit..."
              className="w-full bg-white text-stone-800 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-[#199b50]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          </div>

          <select
            value={selectedMizaj}
            onChange={(e) => setSelectedMizaj(e.target.value)}
            className="bg-emerald-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl border border-emerald-700 outline-none"
          >
            <option value="All">All Temperaments (تمام مزاج)</option>
            <option value="Garm">Garm (Hot - گرم)</option>
            <option value="Sard">Sard (Cold - سرد)</option>
            <option value="Khushk">Khushk (Dry - خشک)</option>
            <option value="Tar">Tar (Moist - تر)</option>
          </select>
        </div>
      </div>

      {/* Encyclopedia Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Botanical Directory List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-3 max-h-[750px] overflow-y-auto">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-2 pb-1 border-b border-stone-100 flex items-center justify-between">
            <span>Botanical Index ({filteredHerbs.length})</span>
            <span>A to Z</span>
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
                      ? 'bg-emerald-50/90 border-[#199b50] shadow-xs'
                      : 'bg-stone-50/60 border-stone-100 hover:bg-stone-100/80'
                  }`}
                >
                  <img
                    src={herb.image}
                    alt={herb.englishName}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                        {herb.englishName}
                      </h4>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded font-mono font-bold text-[#155e42] border border-stone-200 shrink-0">
                        {herb.mizaj.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-[#199b50] font-semibold truncate">
                      {herb.urduName}
                    </div>
                    <div className="text-[10px] text-stone-400 italic truncate font-serif">
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
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8 sticky top-28">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#199b50] uppercase tracking-widest">
                  Unani Monograph
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedHerb.englishName}
                </h2>
                <h3 className="font-serif text-lg font-bold text-[#155e42]">
                  {selectedHerb.urduName}
                </h3>
                <p className="text-xs text-stone-400 italic font-serif">
                  Botanical Name: {selectedHerb.botanicalName}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shrink-0">
                <span className="text-[10px] font-bold text-[#155e42] uppercase tracking-wider block">
                  Mizaj (مزاج)
                </span>
                <span className="font-bold text-xs text-stone-800">
                  {selectedHerb.mizaj}
                </span>
                <span className="text-[11px] text-[#199b50] block mt-0.5 font-semibold">
                  {selectedHerb.mizajUrdu}
                </span>
              </div>
            </div>

            {/* Botanical Image Showcase */}
            <div className="relative aspect-16/8 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={selectedHerb.image}
                alt={selectedHerb.englishName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                Pharmacopeial Monograph & Overview:
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedHerb.description}
              </p>
              <p className="text-xs text-stone-500 font-semibold leading-relaxed pt-1">
                {selectedHerb.descriptionUrdu}
              </p>
            </div>

            {/* Primary Uses & Health Actions */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Key Therapeutic Uses (خواص و فوائد):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedHerb.primaryUses.map((use, i) => (
                  <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2 text-xs text-stone-800">
                    <Check className="w-3.5 h-3.5 text-[#199b50] shrink-0 mt-0.5" />
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Precautions */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1 text-xs text-amber-950">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Precautions & Contraindications (احتیاط و مضرات):</span>
              </div>
              <p className="text-amber-900 leading-relaxed">
                {selectedHerb.precautions}
              </p>
            </div>

            {/* Quick Action to Shop this Herb */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Available pure & wildcrafted in our dispensary
              </span>

              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-xl bg-[#0e2a1f] hover:bg-[#155e42] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Pure Herb in Store</span>
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
