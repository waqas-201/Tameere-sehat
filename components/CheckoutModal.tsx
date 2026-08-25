'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  MapPin, 
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { CartItem, Language, OrderDetails } from '@/lib/types';
import { 
  PAKISTAN_CITIES, 
  FREE_SHIPPING_THRESHOLD, 
  STANDARD_SHIPPING_FEE, 
  STORE_WHATSAPP 
} from '@/lib/data';

interface CheckoutModalProps {
  isOpen: boolean;
  language: Language;
  cartItems: CartItem[];
  onClose: () => void;
  onOrderSuccess: (order: OrderDetails) => void;
}

function generateTrackingNumber(): string {
  const timestamp = String(Date.now()).slice(-6);
  return `TCS-${timestamp}89-PK`;
}

function generateOrderId(): string {
  const timestamp = String(Date.now()).slice(-6);
  return `TS-${timestamp}`;
}

export default function CheckoutModal({
  isOpen,
  language,
  cartItems,
  onClose,
  onOrderSuccess
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer'>('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '',
    specialInstructions: ''
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity, 
    0
  );
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const randomTracking = generateTrackingNumber();
    const newOrder: OrderDetails = {
      id: generateOrderId(),
      customerName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      paymentMethod: paymentMethod,
      items: [...cartItems],
      subtotal: subtotal,
      shippingFee: shippingFee,
      discount: 0,
      total: total,
      date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Pending Verification',
      trackingNumber: randomTracking,
      courier: 'TCS Express'
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);

    // Also compose WhatsApp receipt for patient
    let itemsSummary = '';
    cartItems.forEach((item, i) => {
      itemsSummary += `${i + 1}. ${item.product.name} (${item.selectedVariant.weight}) x ${item.quantity}\n`;
    });

    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat!\n\n` +
      `✅ *Order Confirmation - #${newOrder.id}*\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `📍 Delivery Address: ${formData.address}, ${formData.city}\n` +
      `💳 Payment Mode: ${paymentMethod.toUpperCase()}\n` +
      `🚚 Tracking Number: ${randomTracking} (TCS Express)\n\n` +
      `*Ordered Items:*\n` +
      itemsSummary +
      `\n` +
      `*Total Amount: Rs. ${total}*\n\n` +
      `Please dispatch my parcel at the earliest.`
    );

    // Open WhatsApp confirmation in background/new tab
    setTimeout(() => {
      window.open(`https://wa.me/${STORE_WHATSAPP}?text=${text}`, '_blank');
    }, 500);
  };

  const handleCopyTracking = (trackNum: string) => {
    navigator.clipboard.writeText(trackNum);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0b2317] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00873E] text-white flex items-center justify-center border border-white/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'ur' ? 'کیش آن ڈلیوری آرڈر فارم' : 'Secure Checkout & Delivery'}
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-white">
                {language === 'ur' ? 'آرڈر کی تصدیق و معلومات' : 'Complete Your Herbal Order'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {confirmedOrder ? (
            /* Order Success View */
            <div className="py-6 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#00873E] uppercase tracking-wider">
                  {language === 'ur' ? 'آرڈر کامیابی سے درج ہو گیا!' : 'Order Placed Successfully!'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                  {language === 'ur' ? `شکریہ، ${confirmedOrder.customerName}!` : `Thank you, ${confirmedOrder.customerName}!`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Order ID: <span className="font-bold text-slate-900">#{confirmedOrder.id}</span>
                </p>
              </div>

              {/* Tracking & Courier Info Box */}
              <div className="p-5 rounded-2xl bg-[#f0faf4] border border-[#b0e6c4] text-left max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#0b2317] pb-2 border-b border-[#b0e6c4]">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#00873E]" />
                    <span>Courier: TCS Express</span>
                  </span>
                  <span className="text-[#00873E] bg-white border border-[#b0e6c4] px-2 py-0.5 rounded-md text-[11px] font-bold">
                    Expected: 24-48 Hours
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block">Tracking Number:</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-black text-sm text-slate-900">
                      {confirmedOrder.trackingNumber}
                    </span>
                    <button
                      onClick={() => handleCopyTracking(confirmedOrder.trackingNumber)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex items-center gap-1"
                    >
                      {copiedTracking ? <Check className="w-3.5 h-3.5 text-[#00873E]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTracking ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#b0e6c4] text-xs flex justify-between">
                  <span className="text-slate-600">Total Payable upon Delivery:</span>
                  <span className="font-bold text-[#00873E] text-sm">
                    Rs. {confirmedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  {language === 'ur' ? 'شاپنگ جاری رکھیں' : 'Continue Shopping'}
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Delivery Address Details */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00873E]" />
                  <span>{language === 'ur' ? 'ڈلیوری کا پتہ اور کسٹمر معلومات:' : '1. Delivery Address & Customer Information:'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ur' ? 'پورا نام:' : 'Full Name:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Asad Ullah Khan"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ur' ? 'موبائل نمبر (کال / واٹس ایپ):' : 'Mobile / WhatsApp Number:'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ur' ? 'شہر منتخب کریں:' : 'Select City in Pakistan:'} *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none bg-white"
                    >
                      {PAKISTAN_CITIES.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ur' ? 'ای میل (اختیاری):' : 'Email Address (Optional):'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ur' ? 'مکمل گھریلو پتہ مع گلی، مکان نمبر و قریبی مشہور جگہ:' : 'Complete Street Address, House/Plot # & Landmark:'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. House # 42, Street 8, Block 4, Clifton, near PSO Pump"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00873E]" />
                  <span>{language === 'ur' ? 'ادائیگی کا طریقہ منتخب کریں:' : '2. Select Payment Method:'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'bg-[#f0faf4] border-[#00873E] ring-1 ring-[#00873E]'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">💵 Cash on Delivery (COD)</div>
                      <div className="text-[11px] mt-0.5 text-slate-500">
                        Pay cash when parcel arrives at your doorstep
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-[#00873E] text-white px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>

                  {/* JazzCash / EasyPaisa */}
                  <div
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'jazzcash'
                        ? 'bg-[#f0faf4] border-[#00873E] ring-1 ring-[#00873E]'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">📱 JazzCash / EasyPaisa</div>
                      <div className="text-[11px] mt-0.5 text-slate-500">
                        Direct mobile wallet transfer
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-[#f0faf4] border-[#00873E] ring-1 ring-[#00873E]'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">🏦 Online Bank Transfer</div>
                      <div className="text-[11px] mt-0.5 text-slate-500">
                        Meezan / HBL / Alfalah accounts
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span className="font-bold text-slate-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee:</span>
                  <span className={`font-bold ${isFreeShipping ? 'text-[#00873E]' : 'text-slate-900'}`}>
                    {isFreeShipping ? 'FREE' : `Rs. ${STANDARD_SHIPPING_FEE}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-[#00873E] font-serif text-base">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>{language === 'ur' ? 'آرڈر کنفرم کریں (Confirm Order)' : 'Confirm Order & Generate Tracking Slip'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
