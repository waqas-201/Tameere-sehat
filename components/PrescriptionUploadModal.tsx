'use client';

import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Send 
} from 'lucide-react';
import { STORE_WHATSAPP } from '@/lib/data';
import { Language } from '@/lib/types';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export default function PrescriptionUploadModal({
  isOpen,
  language,
  onClose
}: PrescriptionUploadModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Karachi',
    instructions: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const text = encodeURIComponent(
      `Assalam-o-Alaikum Tameer-e-Sehat!\n\n` +
      `📜 *Prescription / Nuskha Preparation Request*\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📱 Contact: ${formData.phone}\n` +
      `📍 City: ${formData.city}\n` +
      `📎 File Attached: ${fileName || 'Prescription image ready in chat'}\n` +
      (formData.instructions ? `📝 Note: ${formData.instructions}\n\n` : '\n') +
      `I am attaching my prescription image here. Please give me the price quote and prepare pure herbs.`
    );

    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#0b2317] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00873E] text-white flex items-center justify-center border border-white/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'ur' ? 'نسخہ کی تیاری و ترسیل' : 'Pharmacist Prescription Dispensing'}
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-white">
                {language === 'ur' ? 'حکیمی یا ڈاکٹری نسخہ اپلوڈ کریں' : 'Upload Prescription / Hakeem Nuskha'}
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

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {language === 'ur' ? 'نسخہ موصول ہو گیا ہے!' : 'Prescription Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {language === 'ur'
                  ? 'ہمارے فارماسسٹ نسخے کی جانچ کر کے آپ کو واٹس ایپ پر 15 منٹ میں قیمت اور ڈلیوری کی تفصیلات فراہم کریں گے۔'
                  : 'Our herbal pharmacists are reviewing the botanical ingredients and will confirm pricing and courier dispatch on WhatsApp.'}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold transition-colors"
              >
                {language === 'ur' ? 'بند کریں' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-[#00873E]/40 hover:border-[#00873E] rounded-2xl p-6 text-center bg-[#f0faf4]/60 hover:bg-[#f0faf4] transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-10 h-10 text-[#00873E] mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {fileName ? `✓ Selected: ${fileName}` : (language === 'ur' ? 'نسخے کی تصویر یہاں کلک کر کے اپلوڈ کریں' : 'Click or Drag photo of prescription here')}
                </p>
                <span className="text-[11px] text-slate-500 block mt-1">
                  JPG, PNG, PDF up to 15MB
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ur' ? 'آپ کا پورا نام:' : 'Full Name:'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ur' ? 'واٹس ایپ نمبر:' : 'WhatsApp Number:'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0318-2311310"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'ur' ? 'شہر / ڈلیوری کا پتہ:' : 'City / Delivery Address:'}
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'ur' ? 'کوئی خصوصی ہدایت یا سوال (اختیاری):' : 'Special Instructions / Requirements (Optional):'}
                </label>
                <textarea
                  rows={2}
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder={language === 'ur' ? 'مثلاً: جڑی بوٹیاں ثابت چاہیے یا پسی ہوئی...' : 'e.g. Need whole herbs or finely powdered...'}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#00873E] outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{language === 'ur' ? 'نسخہ واٹس ایپ پر بھیجیں اور قیمت معلوم کریں' : 'Send Prescription & Get Instant Quote'}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00873E]" /> 100% Pure Herbs Guaranteed
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> 15-Min Response Time
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
