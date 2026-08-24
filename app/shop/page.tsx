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
  ShoppingBag, 
  Leaf, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { ProductCategory, Product } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';

const CATEGORIES: { id: ProductCategory; nameEn: string; nameUr: string }[] = [
  { id: 'all', nameEn: 'All House Formulations', nameUr: 'تمام ادویات' },
  { id: 'honey-shifa', nameEn: 'Shilajit & Saffron', nameUr: 'سلاجیت و زعفران' },
  { id: 'herbal-oils', nameEn: 'Tahiri Balms & Oils', nameUr: 'طاہری مرہم و روغنیات' },
  { id: 'arqiyat', nameEn: 'Pure Distilled Arqiyat', nameUr: 'خالص مقطر عرقِیات' },
  { id: 'majun-jawarish', nameEn: 'Majun & Jawarish', nameUr: 'معجون، خمیرہ و جوارش' },
  { id: 'safoof-powders', nameEn: 'Medicinal Safoof (Powders)', nameUr: 'طبی سفوف جات' },
  { id: 'raw-herbs', nameEn: 'Raw Wild Herbs & Seeds', nameUr: 'خام جڑی بوٹیاں' },
  { id: 'health-courses', nameEn: 'Complete Health Courses', nameUr: 'مستند طبی کورسز' }
];

const HEALTH_CONCERNS = [
  'All Concerns',
  'Vitality & Stamina',
  'Skin & Eczema',
  'Liver & Detox',
  'Stomach & Digestion',
  'Joint & Sciatica Relief',
  'Kidney & Urinary',
  'Hair & Scalp',
  'Weight Management'
];

const MIZAJ_LIST = [
  'All Temperaments',
  'Garm-Tar (Hot & Moist)',
  'Garm-Khushk (Hot & Dry)',
  'Sard-Tar (Cold & Moist)',
  'Sard-Khushk (Cold & Dry)',
  'Mo\'tadil (Balanced)'
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('category') as ProductCategory) || 'all';
  
  const { language } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCat);
  const [selectedConcern, setSelectedConcern] = useState<string>('All Concerns');
  const [selectedMizaj, setSelectedMizaj] = useState<string>('All Temperaments');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Concern filter
      if (selectedConcern !== 'All Concerns') {
        const concernMatch = product.targetConcerns.some((c) =>
          c.toLowerCase().includes(selectedConcern.toLowerCase().split(' ')[0])
        );
        if (!concernMatch) return false;
      }

      // Mizaj filter
      if (selectedMizaj !== 'All Temperaments') {
        if (!product.mizaj.toLowerCase().includes(selectedMizaj.split(' ')[0].toLowerCase())) {
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
        const matchesName = product.name.toLowerCase().includes(q) || product.urduName.includes(q);
        const matchesDesc = product.shortDesc.toLowerCase().includes(q) || product.shortDescUrdu.includes(q);
        const matchesConcern = product.targetConcerns.some(c => c.toLowerCase().includes(q));
        const matchesIng = product.ingredients.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesConcern && !matchesIng) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedConcern, selectedMizaj, searchQuery, sortBy, inStockOnly]);

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
      <div className="bg-[#0e2a1f] rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-700/50">
            {language === 'ur' ? 'مستند دواخانہ شاپ' : 'Certified House-Made Pharmacopeia'}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-black leading-tight">
            {language === 'ur' ? 'تعمیرِ صحت ہربل کلیکشن اور خالص جڑی بوٹیاں' : 'Apothecary Dispensary & Pure Formulations'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
            {language === 'ur'
              ? 'ہمارے 34 سالہ فارمولوں کے مطابق تیار کردہ تمام ادویات 100% کیمیکل اور سٹیرائیڈز سے پاک ہیں۔ پورے پاکستان میں تیز رفتار کیش آن ڈلیوری۔'
              : 'Every single jar, oil, and distillate is compounded in-house under strict Unani pharmaceutical ethics. Zero chemical preservatives or hidden steroids.'}
          </p>
        </div>
      </div>

      {/* Horizontal Category Navigation Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedCategory === cat.id
                ? 'bg-[#0e2a1f] text-white border-[#0e2a1f] shadow-sm'
                : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
          >
            <span>{language === 'ur' ? cat.nameUr : cat.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Main Layout Grid (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filter Column (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-6 sticky top-28">
          
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-[#199b50]" />
              <span>{language === 'ur' ? 'فلٹرز' : 'Filter Botanicals'}</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search inside sidebar */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Search Store
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herbs, Shilajit..."
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 outline-none focus:border-[#199b50]"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Health Concerns */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Health Concern
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {HEALTH_CONCERNS.map((concern) => (
                <button
                  key={concern}
                  onClick={() => setSelectedConcern(concern)}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedConcern === concern
                      ? 'bg-emerald-50 text-[#155e42] font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{concern}</span>
                  {selectedConcern === concern && <Check className="w-3.5 h-3.5 text-[#199b50]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Temperament / Mizaj */}
          <div className="space-y-2.5 pt-4 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Mizaj (Temperament)
            </label>
            <div className="space-y-1">
              {MIZAJ_LIST.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMizaj(m)}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedMizaj === m
                      ? 'bg-emerald-50 text-[#155e42] font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{m}</span>
                  {selectedMizaj === m && <Check className="w-3.5 h-3.5 text-[#199b50]" />}
                </button>
              ))}
            </div>
          </div>

          {/* In stock toggle */}
          <div className="pt-4 border-t border-stone-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-[#199b50] rounded accent-[#199b50]"
              />
              <span>In Stock Only</span>
            </label>
          </div>

        </div>

        {/* Right Products Container */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar (Sort, View Mode, Count, Mobile Filter Trigger) */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            
            {/* Products Found Counter */}
            <div className="text-xs font-semibold text-stone-600">
              Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> House-Made Formulations
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-[#199b50]" />
                <span>Filters</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 outline-none focus:border-[#199b50]"
                >
                  <option value="featured">Featured / Dawakhana Priority</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
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
              <span className="text-[11px] font-bold text-stone-500">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-[#155e42] px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <span>Category: {CATEGORIES.find(c => c.id === selectedCategory)?.nameEn}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {selectedConcern !== 'All Concerns' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-[#155e42] px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <span>Concern: {selectedConcern}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedConcern('All Concerns')} />
                </span>
              )}
              {selectedMizaj !== 'All Temperaments' && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-[#155e42] px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <span>Mizaj: {selectedMizaj}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMizaj('All Temperaments')} />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-[#155e42] px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                  <span>Query: &quot;{searchQuery}&quot;</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {language === 'ur' ? 'کوئی پراڈکٹ نہیں ملی' : 'No herbal remedies match your criteria'}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for alternative names (e.g. Shilajit, Arq Kasni, Tahiri).
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs shadow-sm"
              >
                Reset All Filters
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
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-base">Filter Formulations</h3>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-5 pr-1">
                {/* Health Concerns */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">Health Concern</label>
                  <div className="space-y-1">
                    {HEALTH_CONCERNS.map((concern) => (
                      <button
                        key={concern}
                        onClick={() => setSelectedConcern(concern)}
                        className={`w-full text-left text-xs p-2 rounded-lg ${
                          selectedConcern === concern ? 'bg-emerald-50 font-bold text-[#155e42]' : 'text-stone-600'
                        }`}
                      >
                        {concern}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mizaj */}
                <div className="space-y-2 pt-4 border-t border-stone-100">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">Temperament</label>
                  <div className="space-y-1">
                    {MIZAJ_LIST.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMizaj(m)}
                        className={`w-full text-left text-xs p-2 rounded-lg ${
                          selectedMizaj === m ? 'bg-emerald-50 font-bold text-[#155e42]' : 'text-stone-600'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#199b50] text-white font-bold text-xs"
              >
                Apply & View ({filteredProducts.length}) Products
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
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-600 text-sm font-semibold">Loading Apothecary Catalog...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
