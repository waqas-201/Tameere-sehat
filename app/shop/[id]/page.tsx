'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Check, 
  Heart, 
  Droplet, 
  Sparkles, 
  Layers, 
  Leaf, 
  HelpCircle, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  Plus, 
  Minus, 
  Share2, 
  Award,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, STORE_WHATSAPP, REVIEWS } from '@/lib/data';
import { Product, ProductVariant } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { language, products, addToCart, wishlist, toggleWishlist, setIsCartOpen } = useApp();

  const product = products.find((p) => p.id === resolvedParams.id) || PRODUCTS.find((p) => p.id === resolvedParams.id) || products[0] || PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { weight: 'Standard', price: product.price, inStock: true }
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'dosage' | 'reviews'>('benefits');

  // Customer review state
  const [userReviewName, setUserReviewName] = useState('');
  const [userReviewCity, setUserReviewCity] = useState('');
  const [userReviewComment, setUserReviewComment] = useState('');
  const [userReviewRating, setUserReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = selectedVariant.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const getWhatsAppOrderUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat!\n\n` +
      `🌿 *I want to order this House-Made Remedy:*\n` +
      `📌 *Product:* ${product.name} (${product.urduName})\n` +
      `⚖️ *Selected Pack:* ${selectedVariant.weight}\n` +
      `📦 *Quantity:* ${quantity}\n` +
      `💰 *Total Price:* Rs. ${(selectedVariant.price * quantity).toLocaleString()}\n\n` +
      `Please confirm Cash on Delivery (COD) order to my address.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  const relatedProducts = (products || PRODUCTS).filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReviewName.trim() || !userReviewComment.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setUserReviewName('');
      setUserReviewCity('');
      setUserReviewComment('');
      setReviewSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link href="/" className="hover:text-[#155e42]">
          {language === 'ur' ? 'مرکزی صفحہ' : 'Home'}
        </Link>
        <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
        <Link href="/shop" className="hover:text-[#155e42]">
          {language === 'ur' ? 'ادویات و شاپ' : 'Shop House Remedies'}
        </Link>
        <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
        <Link href={`/shop?category=${product.category}`} className="hover:text-[#155e42] capitalize">
          {language === 'ur' ? product.categoryNameUrdu : product.categoryName}
        </Link>
        <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
        <span className="text-stone-900 font-bold truncate max-w-xs">
          {language === 'ur' ? product.urduName : product.name}
        </span>
      </nav>

      {/* Main Product Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Image Gallery & Badges */}
        <div className="lg:col-span-6 space-y-4 sticky top-28">
          <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-stone-100 rounded-3xl overflow-hidden border border-stone-200/90 shadow-md group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Badges */}
            <div className={`absolute top-4 ${language === 'ur' ? 'right-4' : 'left-4'} flex flex-col gap-1.5 z-10`}>
              {product.badge && (
                <span className="bg-[#0e2a1f] text-emerald-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                  {language === 'ur' 
                    ? (product.badge === 'bestseller' ? 'سب سے زیادہ مقبول' : 'خاص دوا') 
                    : (product.badge === 'bestseller' ? 'Apothecary Bestseller' : product.badge)}
                </span>
              )}
              {discountPercent && discountPercent > 0 && (
                <span className="bg-[#c8232c] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  {language === 'ur' ? `بچت ${discountPercent}%` : `SAVE ${discountPercent}%`}
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 ${language === 'ur' ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-md transition-transform hover:scale-110 border border-stone-200`}
              title={language === 'ur' ? 'پسندیدہ میں شامل کریں' : 'Add to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>

            {/* Unani Temperament Stamp */}
            <div className={`absolute bottom-4 ${language === 'ur' ? 'right-4' : 'left-4'} bg-white/95 backdrop-blur-md text-[#155e42] text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-md border border-stone-200/80`}>
              <Leaf className="w-4 h-4 text-[#199b50]" />
              <span>{language === 'ur' ? `مزاج: ${product.mizajUrdu}` : `Mizaj: ${product.mizaj}`}</span>
            </div>
          </div>

          {/* Guarantee Badges Row */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="font-bold text-stone-800">{language === 'ur' ? '100% خالص' : '100% Pure'}</div>
              <div className="text-[10px] text-stone-500">{language === 'ur' ? 'سٹیرائیڈز سے پاک' : 'Steroid-Free'}</div>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <Award className="w-5 h-5 text-amber-500 mx-auto" />
              <div className="font-bold text-stone-800">{language === 'ur' ? 'مستند طب یونانی' : 'Unani Certified'}</div>
              <div className="text-[10px] text-stone-500">{language === 'ur' ? 'دواخانہ لیبارٹری' : 'Dawakhana Lab'}</div>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
              <Truck className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="font-bold text-stone-800">{language === 'ur' ? 'کیش آن ڈلیوری' : 'Nationwide COD'}</div>
              <div className="text-[10px] text-stone-500">{language === 'ur' ? 'پورے پاکستان میں' : 'TCS Express'}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Variations, Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#155e42] uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                {language === 'ur' ? product.categoryNameUrdu : product.categoryName}
              </span>

              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-stone-900">{product.rating}</span>
                <span className="text-[11px] text-stone-500">
                  ({product.reviewsCount} {language === 'ur' ? 'آراء' : 'reviews'})
                </span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {language === 'ur' ? product.urduName : product.name}
            </h1>

            <p className="text-sm text-stone-500 font-medium">
              {language === 'ur' ? product.name : product.urduName}
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
              {language === 'ur' ? product.shortDescUrdu : product.shortDesc}
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#155e42] font-serif">
                {language === 'ur' ? `روپے ${(selectedVariant.price * quantity).toLocaleString()}` : `Rs. ${(selectedVariant.price * quantity).toLocaleString()}`}
              </span>
              {selectedVariant.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {language === 'ur' ? `روپے ${(selectedVariant.originalPrice * quantity).toLocaleString()}` : `Rs. ${(selectedVariant.originalPrice * quantity).toLocaleString()}`}
                </span>
              )}
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {language === 'ur' 
                  ? 'دواخانہ میں تیار و موجود - اسی روز کراچی سے روانگی' 
                  : 'In Stock & Ready for Same-Day Dispensing from Karachi'}
              </span>
            </div>
          </div>

          {/* Variant Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800 uppercase tracking-wider">
                {language === 'ur' ? 'پیکنگ / وزن منتخب کریں:' : 'Select Packing / Potency:'}
              </span>
              <span className="text-stone-500 font-medium">
                {language === 'ur' ? 'منتخب شدہ:' : 'Selected:'} <strong className="text-stone-900">{selectedVariant.weight}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedVariant.weight === v.weight
                      ? 'bg-[#0e2a1f] text-white border-[#0e2a1f] shadow-sm'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-xs font-bold">{v.weight}</div>
                  <div className={`text-xs font-mono mt-0.5 ${selectedVariant.weight === v.weight ? 'text-emerald-300' : 'text-[#155e42] font-semibold'}`}>
                    {language === 'ur' ? `روپے ${v.price.toLocaleString()}` : `Rs. ${v.price.toLocaleString()}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 h-full hover:bg-stone-200 text-stone-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-stone-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 h-full hover:bg-stone-200 text-stone-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>
                  {isAdded 
                    ? (language === 'ur' ? 'شامل کر دیا گیا!' : 'Added to Bag!') 
                    : (language === 'ur' ? 'کارٹ میں شامل کریں' : 'Add to Bag')}
                </span>
              </button>
            </div>

            {/* Dual Direct Buy & WhatsApp Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl bg-[#0e2a1f] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>{language === 'ur' ? 'کیش آن ڈلیوری آرڈر کریں' : 'Buy Now with Cash on Delivery'}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </button>

              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ur' ? 'واٹس ایپ پر آرڈر کریں' : 'Order on WhatsApp'}</span>
              </a>
            </div>

          </div>

          {/* Quick Hakeem Advice Helper */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
            <Sparkles className="w-4 h-4 text-[#199b50] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">
                {language === 'ur' ? 'استعمال سے پہلے طبیب سے رہنمائی درکار ہے؟' : 'Need Hakeem advice before taking this?'}
              </span>
              <span className="text-emerald-800">
                {language === 'ur'
                  ? 'آپ اپنی عمر، کیفیت اور جسمانی مزاج کے مطابق صحیح خوراک معلوم کرنے کے لیے واٹس ایپ پر حکیم صاحب سے مفت رہنمائی لے سکتے ہیں۔'
                  : 'You can chat directly with our Unani Hakim on WhatsApp for tailored dosage according to your age and body temperament.'}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Breakdown Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-2xs space-y-8">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-stone-200 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`text-xs sm:text-sm font-bold pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'text-[#155e42] border-b-2 border-[#199b50]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'طبی فوائد و اثرات' : 'Therapeutic Benefits'}
          </button>

          <button
            onClick={() => setActiveTab('ingredients')}
            className={`text-xs sm:text-sm font-bold pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'text-[#155e42] border-b-2 border-[#199b50]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'خالص مفردات و اجزاء' : 'Natural Ingredients (مفردات)'}
          </button>

          <button
            onClick={() => setActiveTab('dosage')}
            className={`text-xs sm:text-sm font-bold pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'dosage'
                ? 'text-[#155e42] border-b-2 border-[#199b50]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'طریقہ استعمال و پرہیز' : 'Dosage & Diet Rules'}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-xs sm:text-sm font-bold pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'text-[#155e42] border-b-2 border-[#199b50]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {language === 'ur' ? 'مریضوں کے تاثرات' : 'Verified Reviews'} ({product.reviewsCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          
          {/* Tab 1: Benefits */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>{language === 'ur' ? product.descriptionUrdu : product.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                  {language === 'ur' ? 'اہم طبی خصوصیات:' : 'Clinical Actions & Health Outcomes:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(language === 'ur' ? product.benefitsUrdu : product.benefits).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-[#199b50] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-stone-600">
                {language === 'ur'
                  ? 'خالص قدرتی جڑی بوٹیوں کی جڑوں، پتوں، بیجوں اور روایتی یونانی اصولوں کے عین مطابق تیار کردہ۔'
                  : 'Crafted using only 100% wildcrafted botanical roots, flowers, seeds, and classical Unani compounds.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#155e42] flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-stone-900">
                        {language === 'ur' ? (product.ingredientsUrdu[i] || ing) : ing}
                      </h5>
                      <span className="text-[11px] text-[#199b50] font-medium">
                        {language === 'ur' ? ing : (product.ingredientsUrdu[i] || 'خالص جڑی بوٹی')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Dosage */}
          {activeTab === 'dosage' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                <h4 className="font-serif font-bold text-sm text-amber-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ur' ? 'مستند حکیمی طریقہ استعمال' : 'Hakeem Prescribed Administration'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  {language === 'ur' ? product.dosageUrdu : product.dosage}
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                <h5 className="font-bold text-stone-900">
                  {language === 'ur' ? 'غذائی ہدایات و پرہیز:' : 'Dietary Guidelines (Parhez):'}
                </h5>
                <ul className="list-disc pl-5 space-y-1">
                  {language === 'ur' ? (
                    <>
                      <li>دورانِ علاج کھٹی، بہت زیادہ تلی ہوئی اور مصنوعی بازاری اشیاء سے پرہیز کریں۔</li>
                      <li>مناسب مقدار میں نیم گرم پانی پئیں اور نیند کا معمول درست رکھیں۔</li>
                      <li>ایلوپیتھک ادویات کے ساتھ استعمال کی صورت میں کم از کم 1 گھنٹے کا وقفہ رکھیں۔</li>
                    </>
                  ) : (
                    <>
                      <li>Avoid excessively sour, heavily fried, or processed commercial fast foods during treatment.</li>
                      <li>Drink adequate lukewarm water and maintain regular sleep cycles.</li>
                      <li>In case of ongoing allopathic medications, keep a 1-hour interval before taking herbal remedies.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {REVIEWS.slice(0, 3).map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">{rev.userName}</span>
                        <span className="text-[11px] text-stone-500">({rev.city})</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-[#155e42] px-2 py-0.2 rounded-full font-bold">
                            <Check className="w-3 h-3" /> {language === 'ur' ? 'تصدیق شدہ خریدار' : 'Verified Buyer'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      &quot;{language === 'ur' ? rev.commentUrdu : rev.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>

              {/* Review Submission Form */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 max-w-xl">
                <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                  {language === 'ur' ? 'اپنا تجربہ شیئر کریں' : 'Write a Patient Review'}
                </h4>

                {reviewSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 text-[#155e42] text-xs font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>
                      {language === 'ur'
                        ? 'شکریہ! آپ کی رائے موصول ہو چکی ہے اور جائزہ کے بعد شائع کر دی جائے گی۔'
                        : 'Thank you! Your verified review has been submitted for moderation.'}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={language === 'ur' ? 'پورا نام' : 'Your Full Name'}
                        value={userReviewName}
                        onChange={(e) => setUserReviewName(e.target.value)}
                        required
                        className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#199b50]"
                      />
                      <input
                        type="text"
                        placeholder={language === 'ur' ? 'شہر (مثلاً: کراچی، لاہور)' : 'Your City (e.g. Lahore, Karachi)'}
                        value={userReviewCity}
                        onChange={(e) => setUserReviewCity(e.target.value)}
                        required
                        className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#199b50]"
                      />
                    </div>

                    <textarea
                      placeholder={
                        language === 'ur'
                          ? 'دوا کے اثرات، صحت میں بہتری اور اپنا تجربہ یہاں لکھیں...'
                          : 'Share your health improvements, dosage results and feedback...'
                      }
                      value={userReviewComment}
                      onChange={(e) => setUserReviewComment(e.target.value)}
                      rows={3}
                      required
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#199b50]"
                    />

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#0e2a1f] hover:bg-[#158242] text-white font-bold transition-colors"
                    >
                      {language === 'ur' ? 'رائے جمع کروائیں' : 'Submit Review'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Related Formulations Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              {language === 'ur' ? 'متعلقہ دواخانہ ادویات' : 'Complementary House Remedies'}
            </h3>
            <Link href="/shop" className="text-xs font-bold text-[#155e42] hover:underline flex items-center gap-1">
              <span>{language === 'ur' ? 'تمام دیکھیں' : 'View All'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
