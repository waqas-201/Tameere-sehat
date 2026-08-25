'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  MessageSquare, 
  X, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { STORE_WHATSAPP, PAKISTAN_CITIES } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function PrescriptionUploadPage() {
  const { language } = useApp();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [duration, setDuration] = useState('30 Days Full Course');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) return;
    setIsSubmitted(true);
  };

  const getWhatsAppSubmissionUrl = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat Dawakhana!\n\n` +
      `📄 *NEW PRESCRIPTION / NUSKHA COMPOUNDING REQUEST:*\n` +
      `👤 *Patient:* ${patientName}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🏙️ *City:* ${city}\n` +
      `📍 *Address:* ${address}\n` +
      `⏳ *Course Duration:* ${duration}\n` +
      `📝 *Notes:* ${specialInstructions || 'N/A'}\n\n` +
      `I am attaching my prescription photo here on WhatsApp for compounding estimate & COD delivery.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#00873E] uppercase tracking-widest bg-[#f0faf4] px-3 py-1 rounded-full border border-[#b0e6c4] inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'حکیمی نسخہ سازی سروس' : 'Dispensary Compounding Service'}</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
          {language === 'ur' ? 'اپنا نسخہ یا پرچی اپلوڈ کریں' : 'Upload Prescription (Nuskha) for Pure Compounding'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {language === 'ur'
            ? 'کسی بھی مستند طبیب یا ہسپتال کا تحریری نسخہ اپلوڈ کریں۔ ہمارے ماہر فارماسسٹ خالص جڑی بوٹیوں سے تیار کردہ تازہ دوا پورے پاکستان میں کیش آن ڈلیوری کے ذریعے آپ کے گھر پہنچائیں گے۔'
            : 'Have a written prescription from any Hakeem, Tibbi physician, or Unani clinic? Upload the image below. Our certified pharmacists will compound authentic, fresh herbs and deliver to your doorstep via Cash on Delivery.'}
        </p>
      </div>

      {/* Main Upload Form Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        
        {isSubmitted ? (
          /* Submission Success */
          <div className="text-center py-10 space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00873E] uppercase tracking-widest">
                {language === 'ur' ? 'نسخہ موصول ہو گیا' : 'Prescription Uploaded'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {language === 'ur' ? 'آپ کا نسخہ موصول ہو چکا ہے!' : 'Prescription Received for Compounding!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {language === 'ur'
                  ? 'ہمارے ماہرین آپ کے نسخے کا جائزہ لے رہے ہیں۔ فوری تخمینہ اور تصدیق کے لیے نیچے دیے گئے بٹن پر کلک کریں۔'
                  : 'Our compounding pharmacist is reviewing your herbs. Send the details directly to our WhatsApp dispensary desk to get an immediate quotation.'}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppSubmissionUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00873E]/20 transition-all hover:scale-102"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{language === 'ur' ? 'واٹس ایپ پر نسخے کی تصویر بھیجیں' : 'Send Prescription Photo on WhatsApp'}</span>
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  removeFile();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
              >
                {language === 'ur' ? 'نیا نسخہ اپلوڈ کریں' : 'Upload Another'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* File Dropzone */}
            <div className="space-y-2">
              <label className="font-serif font-bold text-base text-slate-900 block">
                {language === 'ur' 
                  ? '1. نسخہ یا پرچی کی واضح تصویر یا پی ڈی ایف فائل اپلوڈ کریں' 
                  : '1. Upload Prescription / Doctor\'s Slip (Photo or PDF)'}
              </label>

              {!previewUrl ? (
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#00873E] rounded-3xl p-8 text-center transition-all bg-slate-50/60 hover:bg-[#f0faf4]/50">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-3 pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] flex items-center justify-center mx-auto">
                      <Upload className="w-7 h-7 stroke-[2]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {language === 'ur' ? 'تصویر منتخب کرنے کے لیے یہاں کلک کریں' : 'Click or drag prescription photo here'}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {language === 'ur' ? 'سائز 10MB تک (JPEG, PNG, WEBP, PDF)' : 'Supports JPEG, PNG, WEBP, or PDF up to 10MB'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 max-h-72 flex items-center justify-center p-4">
                  <img
                    src={previewUrl}
                    alt="Prescription Preview"
                    className="max-h-64 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Patient & Delivery Information */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="font-serif font-bold text-base text-slate-900 block">
                {language === 'ur' ? '2. مریض اور پارسل کی ترسیل کی تفصیلات' : '2. Patient & Delivery Particulars'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'پورا نام *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={language === 'ur' ? 'مثلاً: طارق محمود' : 'e.g. Tariq Mehmood'}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ur' ? 'واٹس ایپ یا موبائل نمبر *' : 'WhatsApp Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  />
                </div>

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
                    {language === 'ur' ? 'کورس کی مدت' : 'Course Duration'}
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#00873E]"
                  >
                    <option value="15 Days Trial Course">{language === 'ur' ? '15 دن کا ابتدائی کورس' : '15 Days Trial Course'}</option>
                    <option value="30 Days Full Course">{language === 'ur' ? '30 دن کا مکمل کورس (تجویز کردہ)' : '30 Days Full Course (Recommended)'}</option>
                    <option value="60 Days Chronic Course">{language === 'ur' ? '60 دن کا پرانے امراض کا کورس' : '60 Days Chronic Course'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-xs text-slate-700 block mb-1">
                  {language === 'ur' ? 'مکمل پتہ (ڈاک و کوریئر کے لیے)' : 'Complete Delivery Address (for COD dispatch)'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={language === 'ur' ? 'مکان نمبر، گلی، محلہ، نزد مشہور مقام' : 'House / Street / Area / Landmark'}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs outline-none focus:border-[#00873E]"
                />
              </div>

              <div>
                <label className="font-semibold text-xs text-slate-700 block mb-1">
                  {language === 'ur' ? 'خصوصی ہدایات یا پرہیز (اختیاری)' : 'Special Compounding Instructions (Optional)'}
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={2}
                  placeholder={
                    language === 'ur'
                      ? 'مثلاً: شوگر فری شربت، باریک سفوف، یا کسی خاص جڑی بوٹی سے الرجی...'
                      : 'e.g. Sugar-free honey substitute, fine powder (Safoof) grind, or any herb allergy...'
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs outline-none focus:border-[#00873E]"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00873E]" />
                <span>
                  {language === 'ur' 
                    ? '100% خالص مفردات و مرکبات۔ ادویات روانہ کرنے سے قبل قیمت سے آگاہ کیا جاتا ہے۔' 
                    : '100% genuine pharmacopeial herbs. Price quote sent before dispatch.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00873E]/20 transition-all hover:scale-102"
              >
                <span>{language === 'ur' ? 'نسخہ برائے تیاری ارسال کریں' : 'Submit Nuskha for Compounding'}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
