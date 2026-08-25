'use client';

import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Sparkles, 
  Leaf, 
  Check, 
  Eye, 
  Tag, 
  Scale
} from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { 
  TIBB_PRESET_IMAGES, 
  TIBBI_UNITS_PRESETS, 
  TIBB_PRODUCT_TEMPLATES
} from '@/lib/tibb-standards';
import ProductCard from '@/components/ProductCard';

interface ProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct?: Product | null;
  onSuccess?: () => void;
}

const HEALTH_CONCERNS_OPTIONS = [
  'Vitality & Stamina',
  'Joint & Sciatica Relief',
  'Liver & Detox',
  'Stomach & Digestion',
  'Skin & Eczema',
  'Hair & Scalp',
  'Stress & Sleep',
  'Kidney & Urinary',
  'Weight Management',
  'Heart Health',
  'Brain & Memory',
  'Immunity & Lungs'
];

const MIZAJ_PRESETS = [
  { en: 'Garm-Tar (Hot & Moist)', ur: 'گرم تر (دموی)' },
  { en: 'Garm-Khushk (Hot & Dry)', ur: 'گرم خشک (صفراوی)' },
  { en: 'Sard-Tar (Cold & Moist)', ur: 'سرد تر (بلغموی)' },
  { en: 'Sard-Khushk (Cold & Dry)', ur: 'سرد خشک (سوداوی)' },
  { en: 'Mo\'tadil (Balanced)', ur: 'معتدل' }
];

export default function ProductUploadModal({
  isOpen,
  onClose,
  editingProduct,
  onSuccess
}: ProductUploadModalProps) {
  if (!isOpen) return null;

  return (
    <ProductUploadModalForm
      key={editingProduct ? editingProduct.id : 'new-product'}
      onClose={onClose}
      editingProduct={editingProduct}
      onSuccess={onSuccess}
    />
  );
}

function ProductUploadModalForm({
  onClose,
  editingProduct,
  onSuccess
}: {
  onClose: () => void;
  editingProduct?: Product | null;
  onSuccess?: () => void;
}) {
  const { categories, addProduct, updateProduct, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'basics' | 'variants' | 'media' | 'details' | 'ingredients'>('basics');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States initialized directly
  const [name, setName] = useState(editingProduct?.name || '');
  const [urduName, setUrduName] = useState(editingProduct?.urduName || '');
  const [slugId, setSlugId] = useState(editingProduct?.id || '');
  const [category, setCategory] = useState(editingProduct?.category || 'majoon');
  const [badge, setBadge] = useState<string | undefined>(
    editingProduct?.badge
  );
  const [price, setPrice] = useState<number>(editingProduct?.price || 1200);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(editingProduct?.originalPrice);
  const [inStock, setInStock] = useState<boolean>(editingProduct ? editingProduct.inStock : true);

  // Media
  const [image, setImage] = useState(
    editingProduct?.image || 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80'
  );

  // Varieties & Packaging
  const [variants, setVariants] = useState<ProductVariant[]>(
    editingProduct?.variants && editingProduct.variants.length > 0
      ? editingProduct.variants
      : [
          { weight: '100g Jar', price: 1200, inStock: true },
          { weight: '250g Jar', price: 2800, originalPrice: 3200, inStock: true }
        ]
  );

  // Descriptions & Tibbi Characteristics
  const [shortDesc, setShortDesc] = useState(editingProduct?.shortDesc || '');
  const [shortDescUrdu, setShortDescUrdu] = useState(editingProduct?.shortDescUrdu || '');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [descriptionUrdu, setDescriptionUrdu] = useState(editingProduct?.descriptionUrdu || '');
  const [mizaj, setMizaj] = useState(editingProduct?.mizaj || 'Mo\'tadil (Balanced)');
  const [mizajUrdu, setMizajUrdu] = useState(editingProduct?.mizajUrdu || 'معتدل');
  const [dosage, setDosage] = useState(editingProduct?.dosage || '1 teaspoon twice daily with lukewarm milk.');
  const [dosageUrdu, setDosageUrdu] = useState(editingProduct?.dosageUrdu || 'ایک چمچ صبح و شام نیم گرم دودھ کے ہمراہ۔');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(
    editingProduct?.targetConcerns || ['Vitality & Stamina']
  );

  // Lists: Benefits & Ingredients
  const [benefits, setBenefits] = useState<string[]>(
    editingProduct?.benefits || ['Restores natural vitality and stamina', 'Strengthens nervous system and muscles']
  );
  const [benefitsUrdu, setBenefitsUrdu] = useState<string[]>(
    editingProduct?.benefitsUrdu || ['قدرتی جسمانی توانائی و طاقت بحال کرے', 'اعصاب اور پٹھوں کو تقویت بخشے']
  );
  const [ingredients, setIngredients] = useState<string[]>(
    editingProduct?.ingredients || ['Salab Misri', 'Zafran', 'Asgandh Nagori', 'Amber']
  );
  const [ingredientsUrdu, setIngredientsUrdu] = useState<string[]>(
    editingProduct?.ingredientsUrdu || ['ثعلب مصری', 'زعفران کشمیری', 'اسگندھ ناگوری', 'عنبر خالص']
  );

  // Auto generate slug from English name if empty
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingProduct && !slugId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlugId(generated);
    }
  };

  // Load from Template helper
  const handleLoadTemplate = (template: Partial<Product>) => {
    if (template.name) setName(template.name);
    if (template.urduName) setUrduName(template.urduName);
    if (template.id) setSlugId(template.id + '-' + Math.floor(Math.random() * 1000));
    if (template.category) setCategory(template.category);
    if (template.price) setPrice(template.price);
    if (template.originalPrice) setOriginalPrice(template.originalPrice);
    if (template.image) setImage(template.image);
    if (template.shortDesc) setShortDesc(template.shortDesc);
    if (template.shortDescUrdu) setShortDescUrdu(template.shortDescUrdu);
    if (template.description) setDescription(template.description);
    if (template.descriptionUrdu) setDescriptionUrdu(template.descriptionUrdu);
    if (template.mizaj) setMizaj(template.mizaj);
    if (template.mizajUrdu) setMizajUrdu(template.mizajUrdu);
    if (template.dosage) setDosage(template.dosage);
    if (template.dosageUrdu) setDosageUrdu(template.dosageUrdu);
    if (template.benefits) setBenefits(template.benefits);
    if (template.benefitsUrdu) setBenefitsUrdu(template.benefitsUrdu);
    if (template.ingredients) setIngredients(template.ingredients);
    if (template.ingredientsUrdu) setIngredientsUrdu(template.ingredientsUrdu);
    if (template.variants) setVariants(template.variants);
    if (template.targetConcerns) setSelectedConcerns(template.targetConcerns);
    if (template.badge) setBadge(template.badge);

    showToast(`Template "${template.name}" applied successfully!`);
  };

  // Variety Helpers
  const addVariantRow = (weightName = 'New Size') => {
    setVariants(prev => [
      ...prev,
      {
        weight: weightName,
        price: price || 1000,
        originalPrice: undefined,
        inStock: true
      }
    ]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, val: any) => {
    setVariants(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const removeVariant = (index: number) => {
    if (variants.length <= 1) {
      showToast('Product must have at least one variant.');
      return;
    }
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  // Dynamic Array Helpers
  const handleAddItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const handleUpdateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, val: string) => {
    setter(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const toggleConcern = (concern: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  // Find Category info
  const currentCategoryObj = categories.find(c => c.id === category) || categories[0];

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !urduName.trim()) {
      showToast('Please provide both English and Urdu product names.');
      return;
    }
    if (!slugId.trim()) {
      showToast('Please provide a unique product slug / ID.');
      return;
    }
    if (variants.length === 0) {
      showToast('Please add at least one variety/pack size.');
      return;
    }

    setIsSubmitting(true);

    const cleanBenefits = benefits.filter(b => b.trim().length > 0);
    const cleanBenefitsUrdu = benefitsUrdu.filter(b => b.trim().length > 0);
    const cleanIngredients = ingredients.filter(i => i.trim().length > 0);
    const cleanIngredientsUrdu = ingredientsUrdu.filter(i => i.trim().length > 0);

    const productPayload: Product = {
      id: slugId.trim().toLowerCase(),
      name: name.trim(),
      urduName: urduName.trim(),
      category: category,
      categoryName: currentCategoryObj?.nameEn || 'General Formulations',
      categoryNameUrdu: currentCategoryObj?.nameUr || 'ادویات',
      shortDesc: shortDesc.trim() || name,
      shortDescUrdu: shortDescUrdu.trim() || urduName,
      description: description.trim() || shortDesc || name,
      descriptionUrdu: descriptionUrdu.trim() || shortDescUrdu || urduName,
      price: Number(price) || (variants[0]?.price ?? 1000),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      rating: editingProduct?.rating || 4.9,
      reviewsCount: editingProduct?.reviewsCount || 1,
      image: image.trim() || 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      badge: badge || undefined,
      benefits: cleanBenefits.length ? cleanBenefits : ['100% pure herbal formulation'],
      benefitsUrdu: cleanBenefitsUrdu.length ? cleanBenefitsUrdu : ['100٪ خالص قدرتی نباتاتی نسخہ'],
      ingredients: cleanIngredients.length ? cleanIngredients : ['Unani Botanicals'],
      ingredientsUrdu: cleanIngredientsUrdu.length ? cleanIngredientsUrdu : ['طبِ یونانی کی خالص جڑی بوٹیاں'],
      dosage: dosage.trim() || 'Use as directed by Hakeem.',
      dosageUrdu: dosageUrdu.trim() || 'طبیب کے مشورے کے مطابق استعمال کریں۔',
      mizaj: mizaj.trim() || 'Mo\'tadil (Balanced)',
      mizajUrdu: mizajUrdu.trim() || 'معتدل',
      variants: variants.map(v => ({
        weight: v.weight,
        price: Number(v.price) || Number(price),
        originalPrice: v.originalPrice ? Number(v.originalPrice) : undefined,
        inStock: v.inStock ?? true
      })),
      targetConcerns: selectedConcerns.length ? selectedConcerns : ['General Health'],
      inStock: inStock
    };

    let success = false;
    if (editingProduct) {
      success = await updateProduct(productPayload);
    } else {
      success = await addProduct(productPayload);
    }

    setIsSubmitting(false);
    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  // Preview Object
  const previewProduct: Product = {
    id: slugId || 'preview-id',
    name: name || 'Product Name (English)',
    urduName: urduName || 'پراڈکٹ کا اردو نام',
    category: category,
    categoryName: currentCategoryObj?.nameEn || 'Formulations',
    categoryNameUrdu: currentCategoryObj?.nameUr || 'ادویات',
    shortDesc: shortDesc || 'Herbal formulation description preview.',
    shortDescUrdu: shortDescUrdu || 'قدرتی جڑی بوٹیوں کے نسخے کی تفصیل',
    description: description || 'Detailed description here.',
    descriptionUrdu: descriptionUrdu || 'تفصیلی خواص و فوائد',
    price: Number(price) || 1200,
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    rating: 4.9,
    reviewsCount: 24,
    image: image || 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    badge: badge,
    benefits: benefits,
    benefitsUrdu: benefitsUrdu,
    ingredients: ingredients,
    ingredientsUrdu: ingredientsUrdu,
    dosage: dosage,
    dosageUrdu: dosageUrdu,
    mizaj: mizaj,
    mizajUrdu: mizajUrdu,
    variants: variants,
    targetConcerns: selectedConcerns,
    inStock: inStock
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#0b2317] text-white flex items-center justify-between border-b border-emerald-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#00873E] text-white flex items-center justify-center font-bold shadow-md border border-white/20">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  {editingProduct ? 'Product Editor' : 'Tibb Product Creator'}
                </span>
                <span className="text-[11px] text-emerald-200 font-serif">
                  {editingProduct ? 'ترمیم و تدوین' : 'نیا نسخہ اپلوڈ'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Upload New E-Commerce Herbal Product'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Template Picker */}
            {!editingProduct && (
              <div className="relative hidden md:block">
                <select
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx) && TIBB_PRODUCT_TEMPLATES[idx]) {
                      handleLoadTemplate(TIBB_PRODUCT_TEMPLATES[idx]);
                    }
                  }}
                  defaultValue=""
                  className="bg-[#00873E] text-white text-xs font-bold py-2 px-3 rounded-xl border border-white/20 outline-none cursor-pointer hover:bg-[#007335]"
                >
                  <option value="" disabled className="bg-slate-900 text-white">⚡ Quick Tibb Templates</option>
                  {TIBB_PRODUCT_TEMPLATES.map((tpl, i) => (
                    <option key={i} value={i} className="bg-slate-900 text-white">
                      {tpl.name?.split('(')[0]}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                showPreview ? 'bg-white text-[#00873E]' : 'bg-[#00873E] text-white hover:bg-[#007335]'
              }`}
              title="Toggle Live Storefront Card Preview"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Live Preview'}</span>
            </button>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'basics', label: '1. Basic Info & Pricing', icon: Tag },
            { id: 'variants', label: '2. Varieties & Packaging', icon: Scale },
            { id: 'media', label: '3. Pictures & Photos', icon: ImageIcon },
            { id: 'details', label: '4. Descriptions & Mizaj', icon: Leaf },
            { id: 'ingredients', label: '5. Ingredients & Benefits', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'border-[#00873E] text-[#00873E] bg-white rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body + Optional Live Preview */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
            
            {/* Form Fields */}
            <form onSubmit={handleSubmit} className={showPreview ? 'lg:col-span-7 space-y-6' : 'max-w-4xl mx-auto space-y-6'}>
              
              {/* TAB 1: Basics & Pricing */}
              {activeTab === 'basics' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* English Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <span>Product Title (English)</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Majun Shabab Awar Khas"
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-[#00873E] focus:bg-white outline-none"
                      />
                    </div>

                    {/* Urdu Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <span>Product Title (Urdu - اردو نام)</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={urduName}
                        onChange={(e) => setUrduName(e.target.value)}
                        placeholder="مثلاً: معجون شباب آور خاص"
                        dir="rtl"
                        className="w-full text-xs font-serif bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-[#00873E] focus:bg-white outline-none"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Slug / ID */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <span>Product Slug / ID</span>
                        <span className="text-slate-400 text-[10px]">(URL friendly)</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={slugId}
                        onChange={(e) => setSlugId(e.target.value)}
                        placeholder="e.g. majun-shabab-awar"
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-[#00873E] focus:bg-white outline-none"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <span>Product Category</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-[#00873E] focus:bg-white outline-none"
                      >
                        {categories.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon ? `${cat.icon} ` : ''}{cat.nameEn} ({cat.nameUr})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Promotional Badge */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Special Badge</label>
                      <select
                        value={badge || ''}
                        onChange={(e) => setBadge((e.target.value || undefined) as any)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-[#00873E] focus:bg-white outline-none"
                      >
                        <option value="">No Badge</option>
                        <option value="bestseller">🔥 Bestseller (سب سے زیادہ مقبول)</option>
                        <option value="pure-certified">🌿 100% Pure Certified (مستند خالص)</option>
                        <option value="hakeem-special">👑 Hakeem Special (حکیم صاحب کی خاص پسند)</option>
                        <option value="limited">⏳ Limited Batch (محدود مقدار)</option>
                      </select>
                    </div>

                  </div>

                  {/* Pricing and Stock */}
                  <div className="p-4 rounded-2xl bg-[#f0faf4] border border-[#b0e6c4] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">
                        Default Price (PKR / روپے)
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#00873E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">
                        Original Price (Crossed out)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={originalPrice || ''}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        placeholder="Optional discount price"
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#00873E]"
                      />
                    </div>

                    <div className="pt-4 flex items-center">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inStock}
                          onChange={(e) => setInStock(e.target.checked)}
                          className="w-4 h-4 text-[#00873E] rounded accent-[#00873E]"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            {inStock ? 'In Stock (دستیاب ہے)' : 'Out of Stock (ختم)'}
                          </span>
                          <span className="text-[10px] text-slate-500">Available for customer checkout</span>
                        </div>
                      </label>
                    </div>

                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('variants')}
                      className="px-5 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-sm flex items-center gap-2"
                    >
                      <span>Next: Packaging & Varieties</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: Varieties & Packaging */}
              {activeTab === 'variants' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-serif">
                        Product Packaging & Variety Options (پیکنگ سائز و اقسام)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add different sizes, traditional Tibbi weights (Tola/Masha), jars, bottles, or multi-day courses.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => addVariantRow()}
                      className="py-1.5 px-3 rounded-xl bg-[#00873E] text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-[#007335]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Variety</span>
                    </button>
                  </div>

                  {/* Standard Tibbi Unit Quick Chips */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                      ⚡ Quick Add Standard Tibb Weights & Units:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {TIBBI_UNITS_PRESETS.slice(0, 10).map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => addVariantRow(preset.weight)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#00873E] hover:text-[#00873E] text-[11px] font-semibold text-slate-700 transition-colors"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Varieties Table / List */}
                  <div className="space-y-3">
                    {variants.map((v, index) => (
                      <div 
                        key={index}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Packaging Size / Unit</label>
                          <input
                            type="text"
                            required
                            value={v.weight}
                            onChange={(e) => updateVariant(index, 'weight', e.target.value)}
                            placeholder="e.g. 50g Jar, 1 Tola, 800ml"
                            className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Price (PKR)</label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={v.price}
                            onChange={(e) => updateVariant(index, 'price', Number(e.target.value))}
                            className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Original Price (Crossed)</label>
                          <input
                            type="number"
                            min="0"
                            value={v.originalPrice || ''}
                            onChange={(e) => updateVariant(index, 'originalPrice', Number(e.target.value))}
                            placeholder="Optional"
                            className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                          />
                        </div>

                        <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-4 sm:pt-0">
                          <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={v.inStock}
                              onChange={(e) => updateVariant(index, 'inStock', e.target.checked)}
                              className="w-3.5 h-3.5 text-[#00873E] accent-[#00873E]"
                            />
                            <span>Stock</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Delete Variety"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('basics')}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      &larr; Back to Basics
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('media')}
                      className="px-5 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-sm"
                    >
                      Next: Pictures & Photos &rarr;
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 3: Media & Pictures */}
              {activeTab === 'media' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-serif">
                        Product Visuals & Photography (تصاویر و میڈیا)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Paste any high-resolution image URL or pick from our authentic Unani apothecary image library.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowImagePicker(true)}
                      className="py-1.5 px-3 rounded-xl bg-[#00873E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#007335]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>Browse Tibb Photo Library</span>
                    </button>
                  </div>

                  {/* Main Image URL Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <span>Primary Image URL</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#00873E] focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Image Preview Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={image}
                      alt="Preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-28 h-28 rounded-2xl object-cover border border-slate-200 shadow-xs bg-white shrink-0"
                    />
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-xs font-bold text-slate-800 block">Live Media Preview</span>
                      <p className="text-[11px] text-slate-500">
                        This photograph will be presented on the storefront catalog, quick view modal, and checkout receipt.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <button
                          type="button"
                          onClick={() => setShowImagePicker(true)}
                          className="text-[11px] font-bold text-[#00873E] underline hover:text-[#007335]"
                        >
                          Select from Presets
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('variants')}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      &larr; Back to Varieties
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('details')}
                      className="px-5 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-sm"
                    >
                      Next: Descriptions & Mizaj &rarr;
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 4: Descriptions & Mizaj */}
              {activeTab === 'details' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Short Descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Short Summary (English)</label>
                      <textarea
                        rows={2}
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        placeholder="Brief 1-line formulation highlight..."
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 outline-none focus:border-[#00873E] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">مختصر تعارف (Urdu)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={shortDescUrdu}
                        onChange={(e) => setShortDescUrdu(e.target.value)}
                        placeholder="ایک سطر میں ادویاتی خلاصہ..."
                        className="w-full text-xs font-serif bg-slate-50 border border-slate-300 rounded-xl p-3 outline-none focus:border-[#00873E] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Full Descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Full Pharmacopeia Description (English)</label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed historical background, formulation method, and traditional Unani usage..."
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 outline-none focus:border-[#00873E] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">مکمل طبی تفصیل و خواص (Urdu)</label>
                      <textarea
                        rows={4}
                        dir="rtl"
                        value={descriptionUrdu}
                        onChange={(e) => setDescriptionUrdu(e.target.value)}
                        placeholder="مکمل طبی تشریح، اجزاء کی تاثیر اور فوائد..."
                        className="w-full text-xs font-serif bg-slate-50 border border-slate-300 rounded-xl p-3 outline-none focus:border-[#00873E] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Mizaj (Temperament) */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                        Unani Temperament (طبی مزاج)
                      </span>
                      <span className="text-[11px] text-amber-800">Essential for Mizaj diagnostic matching</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Mizaj Selection (English)</label>
                        <select
                          value={mizaj}
                          onChange={(e) => {
                            setMizaj(e.target.value);
                            const found = MIZAJ_PRESETS.find(m => m.en === e.target.value);
                            if (found) setMizajUrdu(found.ur);
                          }}
                          className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                        >
                          {MIZAJ_PRESETS.map((m, idx) => (
                            <option key={idx} value={m.en}>{m.en}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">طبی مزاج (Urdu)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={mizajUrdu}
                          onChange={(e) => setMizajUrdu(e.target.value)}
                          className="w-full text-xs font-serif bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Health Concerns / Tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Target Health Concerns & Indications (طبی امراض و علامات)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {HEALTH_CONCERNS_OPTIONS.map((c) => {
                        const isSelected = selectedConcerns.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleConcern(c)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                              isSelected
                                ? 'bg-[#00873E] text-white border-[#00873E] shadow-xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '} {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('media')}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      &larr; Back to Pictures
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ingredients')}
                      className="px-5 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs shadow-sm"
                    >
                      Next: Ingredients & Benefits &rarr;
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 5: Ingredients & Benefits */}
              {activeTab === 'ingredients' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  
                  {/* Dosage Instructions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Dosage Instructions (English)</label>
                      <input
                        type="text"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        placeholder="e.g. 1 tsp twice daily after meals with milk"
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#00873E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">طریقہ استعمال (Urdu)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={dosageUrdu}
                        onChange={(e) => setDosageUrdu(e.target.value)}
                        placeholder="مثلاً: ایک چمچ صبح و شام نیم گرم دودھ کے ہمراہ"
                        className="w-full text-xs font-serif bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#00873E]"
                      />
                    </div>
                  </div>

                  {/* Primary Benefits */}
                  <div className="space-y-3 p-4 rounded-2xl bg-[#f0faf4] border border-[#b0e6c4]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00873E] uppercase tracking-wider">
                        Key Therapeutic Benefits (طبی فوائد)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddItem(setBenefits);
                          handleAddItem(setBenefitsUrdu);
                        }}
                        className="text-[11px] font-bold text-[#00873E] hover:underline"
                      >
                        + Add Benefit Point
                      </button>
                    </div>

                    {benefits.map((b, i) => (
                      <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => handleUpdateItem(setBenefits, i, e.target.value)}
                          placeholder={`Benefit ${i + 1} (English)`}
                          className="sm:col-span-6 text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                        />
                        <input
                          type="text"
                          dir="rtl"
                          value={benefitsUrdu[i] || ''}
                          onChange={(e) => handleUpdateItem(setBenefitsUrdu, i, e.target.value)}
                          placeholder={`فائدہ نمبر ${i + 1} (Urdu)`}
                          className="sm:col-span-5 text-xs font-serif bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                        />
                        <div className="sm:col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              handleRemoveItem(setBenefits, i);
                              handleRemoveItem(setBenefitsUrdu, i);
                            }}
                            className="p-1 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Classical Ingredients */}
                  <div className="space-y-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                        Botanical Ingredients (اجزائے ترکیبی)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddItem(setIngredients);
                          handleAddItem(setIngredientsUrdu);
                        }}
                        className="text-[11px] font-bold text-amber-900 hover:underline"
                      >
                        + Add Herb Ingredient
                      </button>
                    </div>

                    {ingredients.map((ing, i) => (
                      <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                        <input
                          type="text"
                          value={ing}
                          onChange={(e) => handleUpdateItem(setIngredients, i, e.target.value)}
                          placeholder={`Herb ${i + 1} (e.g. Salab Misri)`}
                          className="sm:col-span-6 text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                        />
                        <input
                          type="text"
                          dir="rtl"
                          value={ingredientsUrdu[i] || ''}
                          onChange={(e) => handleUpdateItem(setIngredientsUrdu, i, e.target.value)}
                          placeholder={`جڑی بوٹی ${i + 1} (مثلاً: ثعلب مصری)`}
                          className="sm:col-span-5 text-xs font-serif bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                        />
                        <div className="sm:col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              handleRemoveItem(setIngredients, i);
                              handleRemoveItem(setIngredientsUrdu, i);
                            }}
                            className="p-1 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setActiveTab('details')}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      &larr; Back to Details
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-8 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 text-white" />
                      )}
                      <span>{editingProduct ? 'Save & Update Product' : 'Publish Product to Store'}</span>
                    </button>
                  </div>

                </div>
              )}

            </form>

            {/* Live Storefront Preview Column */}
            {showPreview && (
              <div className="lg:col-span-5 bg-slate-100 p-5 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in duration-150 sticky top-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#00873E]" />
                    <span>Live Customer Storefront View</span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#00873E] bg-[#f0faf4] border border-[#b0e6c4] px-2 py-0.5 rounded-full">
                    Real-time Reactivity
                  </span>
                </div>

                <div className="max-w-sm mx-auto">
                  <ProductCard product={previewProduct} viewMode="grid" />
                </div>

                <div className="text-[11px] text-slate-500 text-center">
                  This preview renders the exact reactive UI card seen on the homepage, shop catalog, and search queries.
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Tibb Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Standard Unani Tibb Photo Library (خالص جڑی بوٹیوں کی گیلری)
                </h3>
                <p className="text-xs text-slate-500">
                  Select authentic royalty-free medicinal herb and packaging imagery.
                </p>
              </div>
              <button 
                onClick={() => setShowImagePicker(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4 pr-1">
              {TIBB_PRESET_IMAGES.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setImage(preset.url);
                    setShowImagePicker(false);
                    showToast(`Selected image: ${preset.name}`);
                  }}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden border border-slate-200 hover:border-[#00873E] transition-all hover:shadow-md bg-slate-50"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2.5">
                    <span className="text-[11px] font-bold text-slate-800 block truncate">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">
                      {preset.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
