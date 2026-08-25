'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Check, 
  ShoppingBag
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';

const HEALTH_CONCERNS = [
  { id: 'All Concerns', en: 'All Concerns', ur: 'تمام طبی مسائل' },
  { id: 'Vitality & Stamina', en: 'Vitality & Stamina', ur: 'مردانہ و نسوانی طاقت و توانائی' },
  { id: 'Skin & Eczema', en: 'Skin & Eczema', ur: 'جلدی امراض، چنبل و کیل مہاسے' },
  { id: 'Liver & Detox', en: 'Liver & Detox', ur: 'جگر کی صفائی و گرمی' },
  { id: 'Stomach & Digestion', en: 'Stomach & Digestion', ur: 'معدہ، ہاضمہ و تبخیر' },
  { id: 'Joint & Sciatica Relief', en: 'Joint & Sciatica Relief', ur: 'جوڑوں کا درد، نقرس و عرق النساء' },
  { id: 'Kidney & Urinary', en: 'Kidney & Urinary', ur: 'گردہ، مثانہ و پیشاب کی بندش' },
  { id: 'Hair & Scalp', en: 'Hair & Scalp', ur: 'بالوں کا گرنا و خشکی سکری' },
  { id: 'Weight Management', en: 'Weight Management', ur: 'موٹاپا و وزن کی کمی' }
];

const MIZAJ_LIST = [
  { id: 'All Temperaments', en: 'All Temperaments', ur: 'تمام مزاج' },
  { id: 'Garm-Tar (Hot & Moist)', en: 'Garm-Tar (Hot & Moist)', ur: 'گرم تر (دموی)' },
  { id: 'Garm-Khushk (Hot & Dry)', en: 'Garm-Khushk (Hot & Dry)', ur: 'گرم خشک (صفراوی)' },
  { id: 'Sard-Tar (Cold & Moist)', en: 'Sard-Tar (Cold & Moist)', ur: 'سرد تر (بلغموی)' },
  { id: 'Sard-Khushk (Cold & Dry)', en: 'Sard-Khushk (Cold & Dry)', ur: 'سرد خشک (سوداوی)' },
  { id: 'Mo\'tadil (Balanced)', en: 'Mo\'tadil (Balanced)', ur: 'معتدل' }
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('category') as string) || 'all';
  
  const { language, products, categories } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [selectedConcern, setSelectedConcern] = useState<string>('All Concerns');
  const [selectedMizaj, setSelectedMizaj] = useState<string>('All Temperaments');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and Sort Products dynamically
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Concern filter
      if (selectedConcern !== 'All Concerns') {
        const concernMatch = (product.targetConcerns || []).some((c) =>
          c.toLowerCase().includes(selectedConcern.toLowerCase().split(' ')[0])
        );
        if (!concernMatch) return false;
      }

      // Mizaj filter
      if (selectedMizaj !== 'All Temperaments') {
        if (!product.mizaj?.toLowerCase().includes(selectedMizaj.split(' ')[0].toLowerCase())) {
          return false;
        }
      }

      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(q) || product.urduName?.includes(q);
        const matchesDesc = product.shortDesc?.toLowerCase().includes(q) || product.shortDescUrdu?.includes(q);
        const matchesConcern = (product.targetConcerns || []).some(c => c.toLowerCase().includes(q));
        const matchesIng = (product.ingredients || []).some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesConcern && !matchesIng) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedConcern, selectedMizaj, searchQuery, sortBy, inStockOnly]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedConcern('All Concerns');
    setSelectedMizaj('All Temperaments');
    setSearchQuery('');
    setInStockOnly(false);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedConcern !== 'All Concerns' || 
    selectedMizaj !== 'All Temperaments' || 
    searchQuery.trim() !== '' ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header Banner */}
      <div className="bg-[#0b2317] rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[11px] font-bold text-white uppercase tracking-widest bg-[#00873E] px-3 py-1 rounded-full border border-white/20">
            {language === 'ur' ? 'مستند دواخانہ شاپ' : 'Certified House-Made Pharmacopeia'}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-black leading-tight text-white">
            {language === 'ur' ? 'تعمیرِ صحت ہربل کلیکشن اور خالص جڑی بوٹیاں' : 'Apothecary Dispensary & Pure Formulations'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            {language === 'ur'
              ? 'ہمارے 34 سالہ فارمولوں کے مطابق تیار کردہ تمام ادویات 100% کیمیکل اور سٹیرائیڈز سے پاک ہیں۔ پورے پاکستان میں تیز رفتار کیش آن ڈلیوری۔'
              : 'Every single jar, oil, and distillate is compounded in-house under strict Unani pharmaceutical ethics. Zero chemical preservatives or hidden steroids.'}
          </p>
        </div>
      </div>

      {/* Horizontal Category Navigation Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedCategory === cat.id
                ? 'bg-[#00873E] text-white border-[#00873E] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#00873E] hover:bg-[#f0faf4]'
            }`}
          >
            <span>{cat.icon || '🌿'}</span>
            <span>{language === 'ur' ? cat.nameUr : cat.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Main Layout Grid (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filter Column (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6 sticky top-28">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-[#00873E]" />
              <span>{language === 'ur' ? 'فلٹرز و درجہ بندی' : 'Filter Botanicals'}</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                {language === 'ur' ? 'تمام ختم کریں' : 'Reset All'}
              </button>
            )}
          </div>

          {/* Search inside sidebar */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {language === 'ur' ? 'تلاش کریں' : 'Search Store'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ur' ? 'سلاجیت، عرق، طاہری...' : 'Search herbs, Shilajit...'}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-8 py-2 outline-none focus:border-[#00873E]"
              />
              <Search className={`w-3.5 h-3.5 text-slate-400 absolute ${language === 'ur' ? 'right-2.5' : 'left-2.5'} top-2.5`} />
            </div>
          </div>

          {/* Health Concerns */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {language === 'ur' ? 'طبی امراض و علامات' : 'Health Concern'}
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {HEALTH_CONCERNS.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern.id)}
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    language === 'ur' ? 'text-right' : 'text-left'
                  } ${
                    selectedConcern === concern.id
                      ? 'bg-[#f0faf4] text-[#00873E] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{language === 'ur' ? concern.ur : concern.en}</span>
                  {selectedConcern === concern.id && <Check className="w-3.5 h-3.5 text-[#00873E]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Temperament / Mizaj */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {language === 'ur' ? 'جسمانی مزاج کے مطابق' : 'Mizaj (Temperament)'}
            </label>
            <div className="space-y-1">
              {MIZAJ_LIST.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMizaj(m.id)}
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    language === 'ur' ? 'text-right' : 'text-left'
                  } ${
                    selectedMizaj === m.id
                      ? 'bg-[#f0faf4] text-[#00873E] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{language === 'ur' ? m.ur : m.en}</span>
                  {selectedMizaj === m.id && <Check className="w-3.5 h-3.5 text-[#00873E]" />}
                </button>
              ))}
            </div>
          </div>

          {/* In stock toggle */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-[#00873E] rounded accent-[#00873E]"
              />
              <span>{language === 'ur' ? 'صرف موجود اسٹاک دکھائیں' : 'In Stock Only'}</span>
            </label>
          </div>

        </div>

        {/* Right Products Container */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar (Sort, View Mode, Count, Mobile Filter Trigger) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            
            {/* Products Found Counter */}
            <div className="text-xs font-semibold text-slate-600">
              {language === 'ur' ? (
                <span>
                  کل <span className="font-bold text-slate-900">{filteredProducts.length}</span> مستند نباتاتی ادویات دستیاب ہیں
                </span>
              ) : (
                <span>
                  Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> House-Made Formulations
                </span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-[#00873E]" />
                <span>{language === 'ur' ? 'فلٹرز' : 'Filters'}</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="hidden sm:inline">{language === 'ur' ? 'ترتیب:' : 'Sort by:'}</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#00873E]"
                >
                  <option value="featured">{language === 'ur' ? 'نمایاں ادویات' : 'Featured / Dawakhana Priority'}</option>
                  <option value="price-low">{language === 'ur' ? 'قیمت: کم سے زیادہ' : 'Price: Low to High'}</option>
                  <option value="price-high">{language === 'ur' ? 'قیمت: زیادہ سے کم' : 'Price: High to Low'}</option>
                  <option value="rating">{language === 'ur' ? 'اعلیٰ ریٹنگ' : 'Highest Rated'}</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-slate-500">
                {language === 'ur' ? 'منتخب کردہ فلٹرز:' : 'Active Filters:'}
              </span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#f0faf4] text-[#00873E] px-2.5 py-1 rounded-lg border border-[#b0e6c4] font-semibold">
                  <span>
                    {language === 'ur' 
                      ? `کیٹیگری: ${categories.find(c => c.id === selectedCategory)?.nameUr || selectedCategory}`
                      : `Category: ${categories.find(c => c.id === selectedCategory)?.nameEn || selectedCategory}`}
                  </span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {selectedConcern !== 'All Concerns' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#f0faf4] text-[#00873E] px-2.5 py-1 rounded-lg border border-[#b0e6c4] font-semibold">
                  <span>
                    {language === 'ur'
                      ? `مسئلہ: ${HEALTH_CONCERNS.find(c => c.id === selectedConcern)?.ur}`
                      : `Concern: ${selectedConcern}`}
                  </span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedConcern('All Concerns')} />
                </span>
              )}
              {selectedMizaj !== 'All Temperaments' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#f0faf4] text-[#00873E] px-2.5 py-1 rounded-lg border border-[#b0e6c4] font-semibold">
                  <span>
                    {language === 'ur'
                      ? `مزاج: ${MIZAJ_LIST.find(m => m.id === selectedMizaj)?.ur}`
                      : `Mizaj: ${selectedMizaj}`}
                  </span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMizaj('All Temperaments')} />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#f0faf4] text-[#00873E] px-2.5 py-1 rounded-lg border border-[#b0e6c4] font-semibold">
                  <span>&quot;{searchQuery}&quot;</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline ml-2"
              >
                {language === 'ur' ? 'تمام فلٹرز ختم کریں' : 'Clear all'}
              </button>
            </div>
          )}

          {/* Products Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {language === 'ur' ? 'کوئی پراڈکٹ نہیں ملی' : 'No herbal remedies match your criteria'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {language === 'ur'
                    ? 'براہ کرم تلاش کا لفظ تبدیل کریں یا تمام فلٹرز ختم کر کے دوبارہ دیکھیں۔'
                    : 'Try clearing some filters or searching for alternative names (e.g. Shilajit, Arq Kasni, Tahiri).'}
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-sm"
              >
                {language === 'ur' ? 'تمام فلٹرز دوبارہ سیٹ کریں' : 'Reset All Filters'}
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'ur' ? 'فلٹرز و درجہ بندی' : 'Filter Formulations'}
                </h3>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-5 pr-1">
                {/* Health Concerns */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    {language === 'ur' ? 'طبی امراض و علامات' : 'Health Concern'}
                  </label>
                  <div className="space-y-1">
                    {HEALTH_CONCERNS.map((concern) => (
                      <button
                        key={concern.id}
                        onClick={() => setSelectedConcern(concern.id)}
                        className={`w-full text-xs p-2 rounded-lg ${
                          language === 'ur' ? 'text-right' : 'text-left'
                        } ${
                          selectedConcern === concern.id ? 'bg-[#f0faf4] font-bold text-[#00873E]' : 'text-slate-600'
                        }`}
                      >
                        {language === 'ur' ? concern.ur : concern.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mizaj */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    {language === 'ur' ? 'جسمانی مزاج' : 'Temperament'}
                  </label>
                  <div className="space-y-1">
                    {MIZAJ_LIST.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMizaj(m.id)}
                        className={`w-full text-xs p-2 rounded-lg ${
                          language === 'ur' ? 'text-right' : 'text-left'
                        } ${
                          selectedMizaj === m.id ? 'bg-[#f0faf4] font-bold text-[#00873E]' : 'text-slate-600'
                        }`}
                      >
                        {language === 'ur' ? m.ur : m.en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#00873E] text-white font-bold text-xs"
              >
                {language === 'ur' ? `فلٹر لاگو کریں (${filteredProducts.length})` : `Apply & View (${filteredProducts.length}) Products`}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#00873E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading Apothecary Catalog...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
