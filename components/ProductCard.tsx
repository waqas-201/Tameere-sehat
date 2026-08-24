'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  Check, 
  Eye, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Leaf,
  ArrowRight
} from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import { STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({
  product,
  viewMode = 'grid'
}: ProductCardProps) {
  const { language, addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useApp();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { weight: 'Standard', price: product.price, inStock: true }
  );
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = selectedVariant.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const getWhatsAppOrderUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat! I want to order:\n\n` +
      `🌿 Product: ${product.name} (${product.urduName})\n` +
      `⚖️ Weight/Pack: ${selectedVariant.weight}\n` +
      `💰 Total: Rs. ${selectedVariant.price}\n\n` +
      `Please confirm Cash on Delivery to my address.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-stone-200/90 hover:border-[#199b50] shadow-2xs hover:shadow-lg transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 group">
        <Link 
          href={`/shop/${product.id}`}
          className="relative w-full sm:w-52 h-52 rounded-xl overflow-hidden bg-stone-100 shrink-0 block"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {discountPercent && (
            <span className="absolute top-2.5 left-2.5 bg-[#c8232c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </Link>

        <div className="flex-1 space-y-2 text-center sm:text-left w-full">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#155e42] font-semibold uppercase tracking-wider">
            <span>{language === 'ur' ? product.categoryNameUrdu : product.categoryName}</span>
            <span>•</span>
            <span className="text-stone-500 font-normal">{language === 'ur' ? product.mizajUrdu : product.mizaj}</span>
          </div>

          <Link href={`/shop/${product.id}`} className="block">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 hover:text-[#155e42] transition-colors">
              {language === 'ur' ? product.urduName : product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 line-clamp-2">
            {language === 'ur' ? product.shortDescUrdu : product.shortDesc}
          </p>

          {/* Variants */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
            {product.variants.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all border ${
                  selectedVariant.weight === v.weight
                    ? 'bg-[#0e2a1f] text-white border-[#0e2a1f]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
            <span className="text-2xl font-black text-[#155e42] font-serif">
              Rs. {selectedVariant.price.toLocaleString()}
            </span>
            {selectedVariant.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                Rs. {selectedVariant.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full sm:w-44 py-3 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            <span>{isAdded ? 'Added to Bag' : 'Add to Bag'}</span>
          </button>

          <a
            href={getWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-44 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Order WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 hover:border-[#199b50] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Product Image Box */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-stone-100">
        <Link href={`/shop/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge === 'bestseller' && (
            <span className="bg-[#0e2a1f] text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
              Bestseller
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="bg-[#c8232c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-md transition-transform hover:scale-110 border border-stone-200/50"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Quick View */}
          <button
            type="button"
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:bg-stone-100 flex items-center justify-center shadow-md transition-transform hover:scale-110 border border-stone-200/50"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Temperament / Mizaj pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#155e42] text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs pointer-events-none">
          <Leaf className="w-3 h-3 text-[#199b50]" />
          <span>{language === 'ur' ? product.mizajUrdu : product.mizaj}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Verified Reviews */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
            <span className="text-[#155e42] font-bold uppercase tracking-wider">
              {language === 'ur' ? product.categoryNameUrdu : product.categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-700">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/shop/${product.id}`} className="block">
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 hover:text-[#155e42] transition-colors leading-snug line-clamp-2">
              {language === 'ur' ? product.urduName : product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-stone-500 mt-0.5 truncate">
            {language === 'ur' ? product.name : product.urduName}
          </p>
        </div>

        {/* Pack Variants & Price */}
        <div className="pt-2 border-t border-stone-100 space-y-2.5">
          
          {/* Variant Selector Chips */}
          <div className="flex flex-wrap gap-1">
            {product.variants.map((v, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`text-[10px] px-2.5 py-0.5 rounded-md font-semibold transition-all border ${
                  selectedVariant.weight === v.weight
                    ? 'bg-[#0e2a1f] text-white border-[#0e2a1f]'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="text-lg sm:text-xl font-black text-[#155e42] font-serif">
                Rs. {selectedVariant.price.toLocaleString()}
              </div>
              {selectedVariant.originalPrice && (
                <div className="text-[10px] text-stone-400 line-through -mt-1">
                  Rs. {selectedVariant.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                isAdded
                  ? 'bg-[#0e2a1f] text-white'
                  : 'bg-[#199b50] hover:bg-[#158242] text-white hover:scale-103'
              }`}
            >
              {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
              <span>{isAdded ? 'Added' : 'Add'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
