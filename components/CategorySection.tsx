'use client';

import React, { useState } from 'react';
import { 
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronDown,
  Filter,
  Check
} from 'lucide-react';
import { ProductCategory, Language } from '@/lib/types';
import { useApp } from '@/context/AppContext';

interface CategorySectionProps {
  language: Language;
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectConcern: (concern: string) => void;
  activeConcern: string;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export default function CategorySection({
  language,
  activeCategory,
  onSelectCategory,
  onSelectConcern,
  activeConcern,
  sortBy = 'default',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange
}: CategorySectionProps) {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const { categories, products } = useApp();

  const healthConcerns = [
    { id: 'all', nameEn: 'All Health Concerns', nameUr: 'تمام امراض' },
    { id: 'Men Health', nameEn: "Men's Vitality & Stamina", nameUr: 'مردانہ قوت و شباب' },
    { id: 'Joint Pain & Arthritis', nameEn: 'Joint & Nerve Pain (Tahiri)', nameUr: 'جوڑوں کا درد و مہرہ' },
    { id: 'Digestion & Acidity', nameEn: 'Digestion, Stomach & Gas', nameUr: 'معدہ، تبخیر و السر' },
    { id: 'Weight Loss & Detox', nameEn: 'Fat Burn & Natural Detox', nameUr: 'موٹاپا و چربی پگھلائیں' },
    { id: 'Liver & Jaundice', nameEn: 'Liver, Jaundice & Liver Heat', nameUr: 'جگر، یرقان و گرمی' },
    { id: 'Hair & Scalp Care', nameEn: 'Hair Fall & Regrowth Oils', nameUr: 'بالوں کا گرنا و لمبا کرنا' },
    { id: 'Skin & Eczema', nameEn: 'Skin Glow & Eczema Relief', nameUr: 'جلد کی خوبصورتی و الرجی' },
    { id: 'Stress & Sleep', nameEn: 'Stress, Anxiety & Deep Sleep', nameUr: 'دماغی سکون و پرسکون نیند' }
  ];

  // Count items per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  return (
    <div id="products-catalog" className="bg-[#f8faf9] border-b border-slate-200/80 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#00873E] uppercase tracking-widest block mb-1">
              {language === 'ur' ? 'تعمیرِ صحت طبی فارمیسی' : 'Curated Apothecary'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
              {language === 'ur' ? 'خالص یونانی نباتاتی ادویات' : 'Certified Pure Botanicals'}
            </h2>
          </div>

          {/* Filter & View Mode Controls Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all border ${
                filterDrawerOpen || activeConcern !== 'all'
                  ? 'bg-[#00873E] text-white border-[#00873E] shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-2xs'
              }`}
            >
              <SlidersHorizontal className={`w-4 h-4 ${filterDrawerOpen || activeConcern !== 'all' ? 'text-white' : 'text-[#00873E]'}`} />
              <span>{language === 'ur' ? 'طبی فلٹرز' : 'Filter by Concern'}</span>
              {activeConcern !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
                className="appearance-none bg-white text-slate-800 text-xs font-semibold py-2.5 pl-3.5 pr-8 rounded-xl border border-slate-200 focus:border-[#00873E] focus:ring-1 focus:ring-[#00873E] outline-none cursor-pointer shadow-2xs"
              >
                <option value="default">{language === 'ur' ? 'ترتیب: منتخب شدہ' : 'Sort: Featured'}</option>
                <option value="price-low">{language === 'ur' ? 'قیمت: کم سے زیادہ' : 'Price: Low to High'}</option>
                <option value="price-high">{language === 'ur' ? 'قیمت: زیادہ سے کم' : 'Price: High to Low'}</option>
                <option value="rating">{language === 'ur' ? 'بہترین ریٹنگ' : 'Highest Rated'}</option>
                <option value="popular">{language === 'ur' ? 'مقبول ترین' : 'Most Popular'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-slate-200/70 p-1 rounded-xl">
              <button
                onClick={() => onViewModeChange && onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                onClick={() => onViewModeChange && onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Category Tabs Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#00873E] text-white border-[#00873E] shadow-sm shadow-emerald-950/20'
                    : 'bg-white hover:bg-[#f0faf4] text-slate-700 border-slate-200 hover:border-[#b0e6c4]'
                }`}
              >
                <span className="text-sm">{cat.icon || '🌿'}</span>
                <span>{language === 'ur' ? cat.nameUr : cat.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-white text-[#00873E]' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expandable Concern Filter Drawer */}
        {filterDrawerOpen && (
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#00873E]" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'ur' ? 'طبی ضرورت اور بیماری کے مطابق فلٹر کریں:' : 'Filter by Health Concern & Mizaj:'}
                </span>
              </div>

              {activeConcern !== 'all' && (
                <button
                  onClick={() => onSelectConcern('all')}
                  className="text-xs font-bold text-[#00873E] hover:underline"
                >
                  {language === 'ur' ? 'تمام فلٹرز ختم کریں' : 'Reset Filter'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {healthConcerns.map((concern) => {
                const isSelected = activeConcern === concern.id;
                return (
                  <button
                    key={concern.id}
                    onClick={() => {
                      onSelectConcern(concern.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#00873E] text-white font-bold border-[#00873E] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    <span>{language === 'ur' ? concern.nameUr : concern.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
