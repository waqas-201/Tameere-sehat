'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  Check, 
  Leaf, 
  ArrowRight
} from 'lucide-react';
import { ProductVariant } from '@/lib/types';
import { STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ProductDetailModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    language, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setIsCartOpen
  } = useApp();

  const product = quickViewProduct;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'dosage'>('benefits');

  if (!product) return null;

  const currentVariant = selectedVariant || product.variants[0] || {
    weight: 'Standard Pack',
    price: product.price,
    inStock: true
  };

  const discountPercent = currentVariant.originalPrice
    ? Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
      setIsCartOpen(true);
    }, 800);
  };

  const getWhatsAppOrderUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat! I want to order:\n\n` +
      `🌿 *Product:* ${product.name} (${product.urduName})\n` +
      `⚖️ *Weight/Pack:* ${currentVariant.weight}\n` +
      `📦 *Quantity:* ${quantity}\n` +
      `💰 *Total Price:* Rs. ${currentVariant.price * quantity}\n\n` +
      `Please confirm Cash on Delivery (COD).`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-slate-700 hover:bg-slate-100 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 bg-slate-100 relative min-h-[260px] md:min-h-[420px] flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[360px] object-cover rounded-2xl shadow-xs"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
              {product.badge && (
                <span className="bg-[#00873E] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
              {discountPercent && (
                <span className="bg-[#c8232c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Temperament Tag */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs text-[#00873E] text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-xs border border-[#b0e6c4]">
              <Leaf className="w-3.5 h-3.5 text-[#00873E]" />
              <span>{language === 'ur' ? product.mizajUrdu : product.mizaj}</span>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#00873E] uppercase tracking-widest">
                  {language === 'ur' ? product.categoryNameUrdu : product.categoryName}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                  <span className="text-[11px] text-slate-400">
                    ({product.reviewsCount} {language === 'ur' ? 'آراء' : 'reviews'})
                  </span>
                </div>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {language === 'ur' ? product.urduName : product.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'ur' ? product.shortDescUrdu : product.shortDesc}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-[#00873E] font-serif">
                  {language === 'ur' 
                    ? `${(currentVariant.price * quantity).toLocaleString()} روپے` 
                    : `Rs. ${(currentVariant.price * quantity).toLocaleString()}`}
                </span>
                {currentVariant.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {language === 'ur' 
                      ? `${(currentVariant.originalPrice * quantity).toLocaleString()} روپے` 
                      : `Rs. ${(currentVariant.originalPrice * quantity).toLocaleString()}`}
                  </span>
                )}
              </div>

              {/* Weight Variation Selector */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  {language === 'ur' ? 'پیکنگ اور وزن کا انتخاب:' : 'Select Pack / Weight:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all border ${
                        currentVariant.weight === v.weight
                          ? 'bg-[#00873E] text-white border-[#00873E] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {v.weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Selector */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`text-xs font-bold pb-1 transition-colors ${
                      activeTab === 'benefits' ? 'text-[#00873E] border-b-2 border-[#00873E]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {language === 'ur' ? 'طبی فوائد' : 'Key Benefits'}
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`text-xs font-bold pb-1 transition-colors ${
                      activeTab === 'ingredients' ? 'text-[#00873E] border-b-2 border-[#00873E]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {language === 'ur' ? 'خام اجزاء' : 'Ingredients'}
                  </button>
                  <button
                    onClick={() => setActiveTab('dosage')}
                    className={`text-xs font-bold pb-1 transition-colors ${
                      activeTab === 'dosage' ? 'text-[#00873E] border-b-2 border-[#00873E]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {language === 'ur' ? 'طریقہ استعمال' : 'Dosage'}
                  </button>
                </div>

                <div className="pt-2 text-xs text-slate-600 leading-relaxed max-h-24 overflow-y-auto">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1">
                      {(language === 'ur' ? product.benefitsUrdu : product.benefits).map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#00873E] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredients' && (
                    <p className="italic">
                      {(language === 'ur' ? product.ingredientsUrdu : product.ingredients).join('، ')}
                    </p>
                  )}

                  {activeTab === 'dosage' && (
                    <p>
                      {language === 'ur' ? product.dosageUrdu : product.dosage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>
                    {language === 'ur' 
                      ? (isAdded ? 'بیگ میں شامل ہو گیا!' : 'بیگ میں شامل کریں') 
                      : (isAdded ? 'Added to Bag!' : 'Add to Bag')}
                  </span>
                </button>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'واٹس ایپ آرڈر' : 'Order WhatsApp'}</span>
                </a>
              </div>

              {/* View Full Page Link */}
              <div className="text-center pt-1">
                <Link
                  href={`/shop/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-xs font-bold text-[#00873E] hover:underline inline-flex items-center gap-1"
                >
                  <span>{language === 'ur' ? 'مکمل تفصیلات اور آراء دیکھیں' : 'View Full Product Details & Reviews'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
