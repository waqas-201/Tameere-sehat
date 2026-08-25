'use client';

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Leaf, 
  AlertCircle, 
  ShoppingBag
} from 'lucide-react';
import { HERB_ENCYCLOPEDIA } from '@/lib/data';
import { Language, HerbEntry } from '@/lib/types';

interface HerbEncyclopediaModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export default function HerbEncyclopediaModal({
  isOpen,
  language,
  onClose,
  onSelectProduct
}: HerbEncyclopediaModalProps) {
  const [search, setSearch] = useState('');
  const [selectedHerb, setSelectedHerb] = useState<HerbEntry>(HERB_ENCYCLOPEDIA[0]);

  if (!isOpen) return null;

  const filteredHerbs = HERB_ENCYCLOPEDIA.filter(h => 
    h.englishName.toLowerCase().includes(search.toLowerCase()) ||
    h.urduName.includes(search) ||
    h.botanicalName.toLowerCase().includes(search.toLowerCase()) ||
    h.primaryUses.some(u => u.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0b2317] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00873E] text-white flex items-center justify-center border border-white/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'ur' ? 'کتاب المفردات و جڑی بوٹی لغت' : 'Unani Materia Medica & Botanical Dictionary'}
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-white">
                {language === 'ur' ? 'مستند جڑی بوٹی انسائیکلوپیڈیا' : 'Tameer-e-Sehat Herb Encyclopedia'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Layout */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Search & Herb List */}
          <div className="md:w-5/12 border-r border-slate-200 p-4 sm:p-5 flex flex-col bg-slate-50">
            
            {/* Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={language === 'ur' ? 'جڑی بوٹی تلاش کریں...' : 'Search herb by name or use...'}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredHerbs.map((herb) => {
                const isSelected = selectedHerb.id === herb.id;
                return (
                  <div
                    key={herb.id}
                    onClick={() => setSelectedHerb(herb)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-3 border ${
                      isSelected
                        ? 'bg-[#00873E] text-white border-[#00873E] shadow-md'
                        : 'bg-white hover:bg-[#f0faf4] text-slate-800 border-slate-200'
                    }`}
                  >
                    <img
                      src={herb.image}
                      alt={herb.englishName}
                      className="w-11 h-11 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold truncate">
                        {language === 'ur' ? herb.urduName : herb.englishName}
                      </h4>
                      <p className={`text-[11px] truncate italic ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {herb.botanicalName}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Herb Detail View */}
          <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto space-y-5 bg-white">
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#00873E] uppercase tracking-wider">
                  {selectedHerb.botanicalName}
                </span>
                <h3 className="text-2xl font-serif font-black text-slate-900 mt-0.5">
                  {language === 'ur' ? selectedHerb.urduName : selectedHerb.englishName}
                </h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  {language === 'ur' ? selectedHerb.englishName : selectedHerb.urduName}
                </p>
              </div>

              <div className="aspect-square w-20 rounded-2xl overflow-hidden shadow-md shrink-0 border border-slate-200">
                <img
                  src={selectedHerb.image}
                  alt={selectedHerb.englishName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mizaj Box */}
            <div className="p-3 rounded-2xl bg-[#f0faf4] border border-[#b0e6c4] flex items-center justify-between text-xs">
              <span className="font-bold text-[#0b2317] flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#00873E]" />
                {language === 'ur' ? 'طبی مزاج:' : 'Unani Temperament:'}
              </span>
              <span className="font-bold text-[#00873E] bg-white px-2.5 py-1 rounded-lg border border-[#b0e6c4]">
                {language === 'ur' ? selectedHerb.mizajUrdu : selectedHerb.mizaj}
              </span>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {language === 'ur' ? 'تعارف و ماہیت:' : 'Botanical Overview:'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'ur' ? selectedHerb.descriptionUrdu : selectedHerb.description}
              </p>
            </div>

            {/* Primary Uses */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">
                {language === 'ur' ? 'اہم طبی فوائد و استعمال:' : 'Key Therapeutic Indications:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(language === 'ur' ? selectedHerb.primaryUsesUrdu : selectedHerb.primaryUses).map((use, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 text-slate-800 text-xs flex items-center gap-2 border border-slate-200">
                    <span className="text-[#00873E] font-bold">✓</span>
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precautions */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>{language === 'ur' ? 'احتیاط و پرہیز:' : 'Special Precautions & Contraindications:'}</span>
              </div>
              <p className="text-xs text-amber-950">
                {language === 'ur' ? selectedHerb.precautionsUrdu : selectedHerb.precautions}
              </p>
            </div>

            {/* Action to Buy or View Product */}
            {selectedHerb.relatedProductId && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onSelectProduct(selectedHerb.relatedProductId!);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>{language === 'ur' ? 'یہ خالص جڑی بوٹی آن لائن خریدیں' : 'Purchase Pure Verified Herb in Store'}</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
