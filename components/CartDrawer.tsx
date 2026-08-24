'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  Truck, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE, STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function CartDrawer() {
  const router = useRouter();
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    language,
    addToCart
  } = useApp();

  if (!isCartOpen) return null;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE) : 0;
  const grandTotal = subtotal + shippingFee;

  const getWhatsAppCartOrderUrl = () => {
    let itemsText = '';
    cartItems.forEach((item, idx) => {
      itemsText += `${idx + 1}. ${item.product.name} (${item.selectedVariant.weight}) x ${item.quantity} = Rs. ${item.selectedVariant.price * item.quantity}\n`;
    });

    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat!\n\n` +
      `🛒 *New House-Made Herbal Order:*\n` +
      itemsText +
      `\n` +
      `💰 Subtotal: Rs. ${subtotal}\n` +
      `🚚 Shipping: ${isFreeShipping ? 'FREE' : 'Rs. ' + shippingFee}\n` +
      `💎 *Grand Total:* Rs. ${grandTotal}\n\n` +
      `Please confirm Cash on Delivery (COD) to my address.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200/80 bg-[#0e2a1f] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif font-bold text-lg text-white">
                  {language === 'ur' ? 'آپ کا شاپنگ بیگ' : 'Your Herbal Apothecary Bag'}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-emerald-900 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="mt-4 pt-3 border-t border-emerald-900">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1 text-emerald-300">
                  <Truck className="w-3.5 h-3.5" />
                  <span>
                    {isFreeShipping 
                      ? (language === 'ur' ? 'مفت ہوم ڈلیوری لاگو ہو چکی ہے!' : 'Free Delivery Unlocked!') 
                      : (language === 'ur' ? `مفت ڈلیوری کے لیے مزید Rs. ${remainingForFreeShipping}` : `Add Rs. ${remainingForFreeShipping} for FREE Shipping`)}
                  </span>
                </span>
                <span className="text-stone-300 font-mono text-[11px]">
                  Rs. {subtotal} / {FREE_SHIPPING_THRESHOLD}
                </span>
              </div>
              <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#199b50] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-base">
                    {language === 'ur' ? 'آپ کا شاپنگ بیگ خالی ہے' : 'Your bag is empty'}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    {language === 'ur' 
                      ? 'ہماری خالص جڑی بوٹیاں، سلاجیت اور طاہری مرہم شامل کریں۔' 
                      : 'Explore our 100% pure house-made botanicals, Shilajit, and healing balms.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs shadow-md transition-all"
                >
                  {language === 'ur' ? 'دواخانہ مصنوعات دیکھیں' : 'Explore Remedies'}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant.weight}`} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200/80"
                  />
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate leading-snug">
                      {language === 'ur' ? item.product.urduName : item.product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded">
                        {item.selectedVariant.weight}
                      </span>
                      <span className="text-xs font-bold text-[#155e42]">
                        Rs. {item.selectedVariant.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant.weight, -1)}
                          className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant.weight, 1)}
                          className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant.weight)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout & WhatsApp Order Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>{language === 'ur' ? 'ذیلی رقم (Subtotal)' : 'Subtotal'}</span>
                  <span className="font-bold text-stone-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>{language === 'ur' ? 'ڈلیوری فیس (Shipping)' : 'Shipping Fee'}</span>
                  <span className="font-bold text-emerald-700">
                    {isFreeShipping ? (language === 'ur' ? 'مفت' : 'FREE') : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-base font-black text-stone-900 font-serif">
                  <span>{language === 'ur' ? 'کل رقم (Total)' : 'Grand Total'}</span>
                  <span className="text-[#155e42]">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <span>{language === 'ur' ? 'آرڈر مکمل کریں (کیش آن ڈلیوری)' : 'Proceed to Checkout (COD)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppCartOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'واٹس ایپ پر 1-کلک آرڈر بھیجیں' : 'Order Entire Bag on WhatsApp'}</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Cash on Delivery & Free Hakeem Support</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
