'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Check, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Tag, 
  CreditCard, 
  Banknote, 
  Phone, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { 
  FREE_SHIPPING_THRESHOLD, 
  STANDARD_SHIPPING_FEE, 
  STORE_WHATSAPP, 
  PAKISTAN_CITIES 
} from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { language, cartItems, subtotal, clearCart } = useApp();
  const { user, isGuest, isAuthenticated, openAuthModal, openGooglePopup } = useAuth();

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

  // Autofill button helper for logged-in user
  const applyUserProfile = () => {
    if (!user) return;
    if (user.name) setCustomerName(user.name);
    if (user.email) setEmail(user.email);
    if (user.phone) setPhone(user.phone);
    if (user.address) setAddress(user.address);
    if (user.city) setCity(user.city);
  };

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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || cartItems.length === 0) return;

    const generatedId = `TS-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(generatedId);
    setIsOrdered(true);
    clearCart();
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
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#155e42] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            Order Verified & Placed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'ur' ? 'آپ کا آرڈر کامیابی سے درج ہو گیا ہے!' : 'Shukriya! Your Order is Confirmed'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Order ID: <strong className="font-mono text-base text-[#155e42]">{orderId}</strong>. We will dispatch your pure remedies via express courier shortly.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 text-left max-w-md mx-auto space-y-3 text-xs shadow-sm">
          <div className="flex justify-between border-b border-stone-100 pb-2">
            <span className="text-stone-500">Recipient:</span>
            <strong className="text-stone-900">{customerName} ({phone})</strong>
          </div>
          <div className="flex justify-between border-b border-stone-100 pb-2">
            <span className="text-stone-500">Destination:</span>
            <strong className="text-stone-900">{city}, Pakistan</strong>
          </div>
          <div className="flex justify-between border-b border-stone-100 pb-2">
            <span className="text-stone-500">Payment:</span>
            <strong className="text-stone-900 uppercase">Cash on Delivery (Rs. {grandTotal.toLocaleString()})</strong>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppReceiptUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Send Confirmation on WhatsApp</span>
          </a>

          <Link
            href="/tracking"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs"
          >
            Track My Order
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500">
          Add some pure house-made botanical remedies or Shilajit before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#199b50] text-white font-bold text-xs shadow-md"
        >
          <span>Explore Remedies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest">
            Secure Checkout
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            {language === 'ur' ? 'کیش آن ڈلیوری آرڈر فارم' : 'Apothecary Delivery & Cash on Delivery (COD)'}
          </h1>
        </div>

        <Link href="/shop" className="text-xs font-bold text-[#155e42] hover:underline flex items-center gap-1">
          <span>Back to Shop</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Shipping & Payment Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
          
          {/* Auth Status Notification Banner */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#199b50] animate-pulse" />
                <div>
                  <span className="text-stone-600">Logged in as </span>
                  <strong className="text-stone-900">{user.name}</strong>
                  <span className="ml-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-100 text-[#155e42]">
                    {user.role}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#155e42] shrink-0" />
                <span>Sign in for saved shipping address & order history:</span>
              </div>
            )}

            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openGooglePopup}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 transition-colors text-[11px] flex items-center gap-1.5"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="px-2.5 py-1 rounded-lg bg-[#155e42] text-white font-bold hover:bg-[#0e2a1f] transition-colors text-[11px]"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-[11px] font-semibold text-[#155e42] hover:underline"
              >
                Switch Account
              </button>
            )}
          </div>

          {/* Section 1: Customer Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0e2a1f] text-white text-xs flex items-center justify-center">1</span>
              <span>Recipient Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Alternative Phone (Optional)</label>
                <input
                  type="tel"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="space-y-4 pt-6 border-t border-stone-100">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0e2a1f] text-white text-xs flex items-center justify-center">2</span>
              <span>Delivery Address</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Street Address / House No / Landmark *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House #, Street #, Sector/Area, Landmark..."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Province *</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  >
                    <option value="Sindh">Sindh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital">Islamabad Capital</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Postal Code (Optional)</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="75000"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Order Notes / Instructions</label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Call before delivery, deliver after 2 PM..."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-[#199b50]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-4 pt-6 border-t border-stone-100">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0e2a1f] text-white text-xs flex items-center justify-center">3</span>
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Banknote className="w-5 h-5 text-[#199b50]" />
                  <span className="text-[10px] bg-emerald-100 text-[#155e42] px-2 py-0.5 rounded font-bold">Recommended</span>
                </div>
                <div className="font-bold text-xs text-stone-900">Cash on Delivery (COD)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Pay in cash when courier arrives at your doorstep.</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-emerald-50 border-[#199b50] text-[#155e42] ring-2 ring-[#199b50]/20'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-600 mb-1" />
                <div className="font-bold text-xs text-stone-900">JazzCash / EasyPaisa</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Manual wallet transfer via account details.</div>
              </button>

            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Coupon (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-6">
            
            <h3 className="font-serif font-bold text-lg text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-mono font-bold text-[#155e42]">{cartItems.length} items</span>
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-stone-900 truncate">
                      {item.product.name}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {item.selectedVariant.weight} x {item.quantity}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-stone-900 shrink-0">
                    Rs. {(item.selectedVariant.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon (e.g. SHIFA10)"
                  className="flex-1 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs uppercase outline-none focus:border-[#199b50]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className="text-[11px] text-emerald-700 font-semibold">{promoMessage}</p>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">Rs. {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Shipping ({city})</span>
                <span className="font-bold text-emerald-700">
                  {isFreeShipping ? 'FREE' : `Rs. ${shippingFee}`}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>- Rs. {appliedDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-base font-black text-stone-900 font-serif">
                <span>Grand Total (COD)</span>
                <span className="text-[#155e42] text-xl font-bold font-serif">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-101 active:scale-98"
            >
              <span>Confirm & Place Cash on Delivery Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Genuine Unani Pharmacopeia Guaranteed</span>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
