'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  CreditCard, 
  Banknote 
} from 'lucide-react';
import { 
  FREE_SHIPPING_THRESHOLD, 
  STANDARD_SHIPPING_FEE, 
  STORE_WHATSAPP, 
  PAKISTAN_CITIES 
} from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CheckoutPage() {
  const router = useRouter();
  const { language, cartItems, subtotal, clearCart, showToast } = useApp();
  const { user, openAuthModal, loginWithGoogle } = useAuth();

  // Form State with user defaults
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [altPhone, setAltPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'Karachi');
  const [province, setProvince] = useState('Sindh');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Success State
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SHIFA10') {
      const disc = Math.round(subtotal * 0.10);
      setAppliedDiscount(disc);
      setPromoMessage('10% Shifa Discount Applied!');
    } else if (code === 'HAKEEM') {
      setAppliedDiscount(300);
      setPromoMessage('Rs. 300 Hakeem Special Voucher Applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try "SHIFA10"');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || cartItems.length === 0) return;

    setIsSubmitting(true);
    const generatedId = `TS-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await addDoc(collection(db, 'orders'), {
        orderRef: generatedId,
        userId: user?.id || 'guest_' + Date.now(),
        customerName,
        phone,
        altPhone,
        email: email || user?.email || '',
        address,
        city,
        province,
        postalCode,
        orderNotes,
        paymentMethod,
        items: cartItems.map(i => ({
          id: i.product.id,
          name: i.product.name,
          urduName: i.product.urduName,
          weight: i.selectedVariant.weight,
          price: i.selectedVariant.price,
          quantity: i.quantity
        })),
        subtotal,
        discount: appliedDiscount,
        shipping: shippingFee,
        total: grandTotal,
        status: 'Received & Queued',
        createdAt: new Date().toISOString(),
        serverTimestamp: serverTimestamp()
      });

      setOrderId(generatedId);
      setIsOrdered(true);
      clearCart();
      showToast(language === 'ur' ? 'آرڈر کامیابی سے درج ہو گیا ہے' : 'Order placed successfully');
    } catch (err) {
      console.error('Failed to sync order to Firestore:', err);
      setOrderId(generatedId);
      setIsOrdered(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppReceiptUrl = () => {
    let itemsText = '';
    cartItems.forEach((item, idx) => {
      itemsText += `${idx + 1}. ${item.product.name} (${item.selectedVariant.weight}) x ${item.quantity} = Rs. ${item.selectedVariant.price * item.quantity}\n`;
    });

    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat!\n\n` +
      `📦 *NEW ORDER CONFIRMATION #${orderId}:*\n` +
      `👤 *Customer:* ${customerName}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🏙️ *City:* ${city}, ${province}\n` +
      `📍 *Address:* ${address}\n` +
      `💳 *Payment Method:* ${paymentMethod.toUpperCase()}\n\n` +
      `🛒 *Items:*\n` +
      itemsText +
      `\n` +
      `💰 *Subtotal:* Rs. ${subtotal}\n` +
      `🚚 *Shipping:* ${isFreeShipping ? 'FREE' : 'Rs. ' + shippingFee}\n` +
      `🏷️ *Discount:* -Rs. ${appliedDiscount}\n` +
      `💎 *GRAND TOTAL (COD):* Rs. ${grandTotal}\n\n` +
      `Please confirm dispatch via TCS Express.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  if (isOrdered) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-in zoom-in duration-300">
        <div className="w-20 h-20 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#00873E] uppercase tracking-widest">
            {language === 'ur' ? 'آرڈر تصدیق شدہ • ترسیل کے لیے تیار' : 'Order Confirmed • Processing for Dispatch'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            {language === 'ur' ? 'شکریہ! آپ کا آرڈر کامیابی سے موصول ہو گیا ہے' : 'Shukriya! Your Order is Confirmed'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            {language === 'ur' 
              ? `آرڈر نمبر: ${orderId}۔ ہم جلد از جلد آپ کی مستند ادویات بذریعہ ایکسپریس کوریئر روانہ کر دیں گے۔`
              : `Order ID: ${orderId}. We will dispatch your pure remedies via express courier shortly.`}
          </p>
        </div>

        <div className={`p-6 rounded-3xl bg-white border border-slate-200 ${language === 'ur' ? 'text-right' : 'text-left'} max-w-md mx-auto space-y-3 text-xs shadow-sm`}>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">{language === 'ur' ? 'وصول کنندہ:' : 'Recipient:'}</span>
            <strong className="text-slate-900">{customerName} ({phone})</strong>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">{language === 'ur' ? 'شہر و پتہ:' : 'Destination:'}</span>
            <strong className="text-slate-900">{city}، پاکستان</strong>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">{language === 'ur' ? 'طریقہ ادائیگی:' : 'Payment:'}</span>
            <strong className="text-slate-900">
              {language === 'ur' ? `کیش آن ڈلیوری (روپے ${grandTotal.toLocaleString()})` : `Cash on Delivery (Rs. ${grandTotal.toLocaleString()})`}
            </strong>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppReceiptUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00873E]/20"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{language === 'ur' ? 'واٹس ایپ پر آرڈر کی رسید دیکھیں' : 'Send Confirmation on WhatsApp'}</span>
          </a>

          <Link
            href="/account"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            {language === 'ur' ? 'میرا اکاؤنٹ' : 'View in My Account'}
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-xl font-bold text-slate-900">
          {language === 'ur' ? 'آپ کا شاپنگ بیگ خالی ہے' : 'Your Bag is Empty'}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ur'
            ? 'براہ کرم شاپ سے خالص یونانی ادویات یا سلاجیت کارٹ میں شامل کریں۔'
            : 'Add some pure house-made botanical remedies or Shilajit before checking out.'}
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00873E] text-white font-bold text-xs shadow-md"
        >
          <span>{language === 'ur' ? 'ادویات دیکھیں' : 'Explore Remedies'}</span>
          <ArrowRight className={`w-4 h-4 ${language === 'ur' ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-[#00873E] uppercase tracking-widest">
            {language === 'ur' ? 'محفوظ چیک آؤٹ' : 'Secure Checkout'}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {language === 'ur' ? 'کیش آن ڈلیوری آرڈر فارم' : 'Apothecary Delivery & Cash on Delivery (COD)'}
          </h1>
        </div>

        <Link href="/shop" className="text-xs font-bold text-[#00873E] hover:underline flex items-center gap-1">
          <span>{language === 'ur' ? 'واپس شاپ' : 'Back to Shop'}</span>
          <ChevronRight className={`w-3.5 h-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} />
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Shipping & Payment Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
          
          {/* Auth Status Notification Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00873E] animate-pulse" />
                <div>
                  <span className="text-slate-600">{language === 'ur' ? 'لاگ ان بطور: ' : 'Logged in as '}</span>
                  <strong className="text-slate-900">{user.name}</strong>
                  <span className="ml-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4]">
                    {user.role}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#00873E] shrink-0" />
                <span>
                  {language === 'ur' 
                    ? 'پتہ اور آرڈر محفوظ رکھنے کے لیے لاگ ان کریں:' 
                    : 'Sign in for saved shipping address & order history:'}
                </span>
              </div>
            )}

            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-[11px] flex items-center gap-1.5"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>گوگل</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="px-2.5 py-1 rounded-lg bg-[#00873E] text-white font-bold hover:bg-[#007335] transition-colors text-[11px]"
                >
                  {language === 'ur' ? 'لاگ ان' : 'Sign In'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-[11px] font-semibold text-[#00873E] hover:underline"
              >
                {language === 'ur' ? 'اکاؤنٹ تبدیل کریں' : 'Switch Account'}
              </button>
            )}
          </div>

          {/* Section 1: Customer Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00873E] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{language === 'ur' ? 'وصول کنندہ کی معلومات' : 'Recipient Details'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ur' ? 'مکمل نام *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={language === 'ur' ? 'مثال: طارق محمود' : 'e.g. Tariq Mehmood'}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ur' ? 'واٹس ایپ / موبائل نمبر *' : 'WhatsApp Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ur' ? 'متبادل فون نمبر (اختیاری)' : 'Alternative Phone (Optional)'}
                </label>
                <input
                  type="tel"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ur' ? 'ای میل ایڈریس (اختیاری)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00873E] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{language === 'ur' ? 'ترسیل کا مکمل پتہ' : 'Delivery Address'}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ur' ? 'گھر کا نمبر / گلی / مشہور جگہ کا نام *' : 'Street Address / House No / Landmark *'}
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={language === 'ur' ? 'مکان نمبر، گلی نمبر، محلہ / علاقہ، قریبی مشہور نشان...' : 'House #, Street #, Sector/Area, Landmark...'}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'شہر *' : 'City *'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'صوبہ *' : 'Province *'}
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  >
                    <option value="Sindh">{language === 'ur' ? 'سندھ' : 'Sindh'}</option>
                    <option value="Punjab">{language === 'ur' ? 'پنجاب' : 'Punjab'}</option>
                    <option value="Khyber Pakhtunkhwa">{language === 'ur' ? 'خیبر پختونخوا' : 'Khyber Pakhtunkhwa'}</option>
                    <option value="Balochistan">{language === 'ur' ? 'بلوچستان' : 'Balochistan'}</option>
                    <option value="Islamabad Capital">{language === 'ur' ? 'اسلام آباد' : 'Islamabad Capital'}</option>
                    <option value="Azad Kashmir">{language === 'ur' ? 'آزاد کشمیر' : 'Azad Kashmir'}</option>
                    <option value="Gilgit Baltistan">{language === 'ur' ? 'گلگت بلتستان' : 'Gilgit Baltistan'}</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'ڈاک کا کوڈ (اختیاری)' : 'Postal Code (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="75000"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ur' ? 'خاص ہدایات / پیغام' : 'Order Notes / Instructions'}
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={2}
                  placeholder={language === 'ur' ? 'مثال: ترسیل سے پہلے کال کریں...' : 'e.g. Call before delivery, deliver after 2 PM...'}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00873E] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>{language === 'ur' ? 'طریقہ ادائیگی' : 'Payment Option'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border ${language === 'ur' ? 'text-right' : 'text-left'} transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] ring-2 ring-[#00873E]/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Banknote className="w-5 h-5 text-[#00873E]" />
                  <span className="text-[10px] bg-[#00873E] text-white px-2 py-0.5 rounded font-bold">
                    {language === 'ur' ? 'تجویز کردہ' : 'Recommended'}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900">
                  {language === 'ur' ? 'کیش آن ڈلیوری (COD)' : 'Cash on Delivery (COD)'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'ur'
                    ? 'جب پارسل آپ کے گھر پہنچے تب رقم ادا کریں۔'
                    : 'Pay in cash when courier arrives at your doorstep.'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-4 rounded-2xl border ${language === 'ur' ? 'text-right' : 'text-left'} transition-all ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-[#f0faf4] border-[#00873E] text-[#00873E] ring-2 ring-[#00873E]/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-600 mb-1" />
                <div className="font-bold text-xs text-slate-900">
                  {language === 'ur' ? 'جاز کیش / ایزی پیسہ' : 'JazzCash / EasyPaisa'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'ur'
                    ? 'آن لائن موبائل اکاؤنٹ کے ذریعے پیشگی ادائیگی۔'
                    : 'Manual wallet transfer via account details.'}
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Coupon (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            
            <h3 className="font-serif font-bold text-lg text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>{language === 'ur' ? 'آرڈر کا خلاصہ' : 'Order Summary'}</span>
              <span className="text-xs font-mono font-bold text-[#00873E]">
                {cartItems.length} {language === 'ur' ? 'اشیاء' : 'items'}
              </span>
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {language === 'ur' ? item.product.urduName : item.product.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.selectedVariant.weight} x {item.quantity}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-900 shrink-0">
                    {language === 'ur'
                      ? `روپے ${(item.selectedVariant.price * item.quantity).toLocaleString()}`
                      : `Rs. ${(item.selectedVariant.price * item.quantity).toLocaleString()}`}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={language === 'ur' ? 'کوپن کوڈ (مثلاً: SHIFA10)' : 'Coupon (e.g. SHIFA10)'}
                  className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs uppercase outline-none focus:border-[#00873E]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  {language === 'ur' ? 'لاگو کریں' : 'Apply'}
                </button>
              </div>
              {promoMessage && (
                <p className="text-[11px] text-[#00873E] font-semibold">{promoMessage}</p>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{language === 'ur' ? 'کل رقم' : 'Subtotal'}</span>
                <span className="font-bold text-slate-900">
                  {language === 'ur' ? `روپے ${subtotal.toLocaleString()}` : `Rs. ${subtotal.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>{language === 'ur' ? `کوریئر ڈلیوری فیس (${city})` : `Shipping (${city})`}</span>
                <span className="font-bold text-[#00873E]">
                  {isFreeShipping ? (language === 'ur' ? 'مفت' : 'FREE') : (language === 'ur' ? `روپے ${shippingFee}` : `Rs. ${shippingFee}`)}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>{language === 'ur' ? 'رعایت (ڈسکاؤنٹ)' : 'Promo Discount'}</span>
                  <span>- {language === 'ur' ? `روپے ${appliedDiscount.toLocaleString()}` : `Rs. ${appliedDiscount.toLocaleString()}`}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-base font-black text-slate-900 font-serif">
                <span>{language === 'ur' ? 'حتمی کل رقم (کیش آن ڈلیوری)' : 'Grand Total (COD)'}</span>
                <span className="text-[#00873E] text-xl font-bold font-serif">
                  {language === 'ur' ? `روپے ${grandTotal.toLocaleString()}` : `Rs. ${grandTotal.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00873E]/20 transition-all hover:scale-101 active:scale-98 disabled:opacity-50"
            >
              <span>
                {isSubmitting 
                  ? (language === 'ur' ? 'آرڈر درج ہو رہا ہے...' : 'Placing Order...') 
                  : (language === 'ur' ? 'کیش آن ڈلیوری آرڈر کنفرم کریں' : 'Confirm & Place Cash on Delivery Order')}
              </span>
              <ArrowRight className={`w-4 h-4 ${language === 'ur' ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00873E]" />
              <span>
                {language === 'ur' ? '100% مستند دواخانہ فارمولیشنز کی ضمانت' : '100% Genuine Unani Pharmacopeia Guaranteed'}
              </span>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
