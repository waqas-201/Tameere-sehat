'use client';

import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  MessageSquare, 
  ShoppingBag, 
  Flame, 
  Droplet, 
  Wind, 
  Mountain,
  Share2,
  FileText
} from 'lucide-react';
import { MIZAJ_QUESTIONS, MIZAJ_PROFILES, PRODUCTS, STORE_WHATSAPP } from '@/lib/data';
import { Language, Product } from '@/lib/types';

interface MizajDiagnosticModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export default function MizajDiagnosticModal({
  isOpen,
  language,
  onClose,
  onSelectProduct
}: MizajDiagnosticModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultMizaj, setResultMizaj] = useState<keyof typeof MIZAJ_PROFILES | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, value: string) => {
    const updated = { ...selectedAnswers, [questionId]: value };
    setSelectedAnswers(updated);

    if (currentStep < MIZAJ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      calculateMizaj(updated);
    }
  };

  const calculateMizaj = (answers: Record<string, string>) => {
    setIsAnalyzing(true);
    
    // Tally up temperament scores
    const counts: Record<string, number> = {
      Safrawi: 0,
      Balghami: 0,
      Sawdawi: 0,
      Damwi: 0
    };

    Object.values(answers).forEach((val) => {
      if (counts[val] !== undefined) {
        counts[val] += 1;
      }
    });

    // Find highest
    let dominant: keyof typeof MIZAJ_PROFILES = 'Safrawi';
    let max = -1;
    (Object.keys(counts) as Array<keyof typeof MIZAJ_PROFILES>).forEach((key) => {
      if (counts[key] > max) {
        max = counts[key];
        dominant = key;
      }
    });

    setTimeout(() => {
      setResultMizaj(dominant);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleGetAiDeepReport = async () => {
    if (!resultMizaj) return;
    setLoadingAi(true);

    try {
      const res = await fetch('/api/gemini/mizaj-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: selectedAnswers,
          primaryMizaj: resultMizaj,
          language: language
        })
      });

      const data = await res.json();
      if (data.report) {
        setAiReport(data.report);
      }
    } catch (err) {
      console.error('Failed to get AI Mizaj analysis', err);
    } finally {
      setLoadingAi(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setResultMizaj(null);
    setAiReport(null);
  };

  const currentQ = MIZAJ_QUESTIONS[currentStep];
  const profile = resultMizaj ? MIZAJ_PROFILES[resultMizaj] : null;

  const recommendedProductsList = profile 
    ? PRODUCTS.filter(p => profile.recommendedProducts.includes(p.id))
    : [];

  const getWhatsAppShareText = () => {
    if (!resultMizaj || !profile) return '';
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Hakeem Sahab!\n\n` +
      `I completed my Mizaj (Temperament) Test on Tameer-e-Sehat website.\n` +
      `My Dominant Temperament is: ${profile.titleEn} (${profile.titleUr})\n\n` +
      `Please provide further guidance on my personal herbal course and dietary routine.`
    );
    return `https://wa.me/${STORE_WHATSAPP}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0e2a1f] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'ur' ? 'روایتی یونانی نبض و مزاج شناسی' : 'Traditional Tibbi Humoral Diagnosis'}
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-white">
                {language === 'ur' ? 'آن لائن مزاج تشخیصی ٹیسٹ' : 'Online Mizaj (Temperament) Assessment'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* State 1: Active Quiz Questions */}
          {!resultMizaj && !isAnalyzing && (
            <div className="space-y-6">
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
                <span>{language === 'ur' ? `سوال نمبر ${currentStep + 1} از ${MIZAJ_QUESTIONS.length}` : `Question ${currentStep + 1} of ${MIZAJ_QUESTIONS.length}`}</span>
                <span>{Math.round(((currentStep + 1) / MIZAJ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / MIZAJ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Text */}
              <div className="py-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {language === 'ur' ? currentQ.questionUr : currentQ.questionEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'ur' ? currentQ.questionEn : currentQ.questionUr}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === option.value;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, option.value)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-amber-400'
                          : 'bg-white hover:bg-emerald-50 text-slate-800 border-emerald-200/80 hover:border-emerald-400'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm sm:text-base leading-snug">
                          {language === 'ur' ? option.textUr : option.textEn}
                        </div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {language === 'ur' ? option.textEn : option.textUr}
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {option.trait}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          )}

          {/* State 2: Analyzing Loader */}
          {isAnalyzing && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-800 animate-spin mx-auto"></div>
              <h3 className="text-lg font-bold text-emerald-950">
                {language === 'ur' ? 'حکیمی اصولوں کے مطابق آپ کے مزاج کا تجزیہ کیا جا رہا ہے...' : 'Analyzing humoral balance according to Unani Tibb...'}
              </h3>
              <p className="text-xs text-slate-500">
                Calculating Safra, Sawda, Balgham, and Dam tendencies...
              </p>
            </div>
          )}

          {/* State 3: Results & Dietary Prescription */}
          {resultMizaj && profile && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header Result Card */}
              <div className="p-6 rounded-3xl bg-[#0e2a1f] text-white border border-emerald-900 relative overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ur' ? 'تشخیص مکمل — آپ کا غالب مزاج' : 'Diagnosis Complete — Dominant Constitution'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  {language === 'ur' ? profile.titleUr : profile.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-3 leading-relaxed">
                  {language === 'ur' ? profile.summaryUr : profile.summaryEn}
                </p>
              </div>

              {/* Diet Chart: Foods to Favor vs Avoid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Favorable Foods */}
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">✓</span>
                    <span>{language === 'ur' ? 'موافق غذائیں (روزانہ استعمال کریں):' : 'Favorable Foods (Daily Diet):'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {(language === 'ur' ? profile.favorableFoodsUrdu : profile.favorableFoods).map((food, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Foods to Avoid (Parhez) */}
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="text-xs sm:text-sm font-bold text-rose-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">✕</span>
                    <span>{language === 'ur' ? 'پرہیز (ان اشیاء سے اجتناب کریں):' : 'Parhez (Foods to Avoid/Minimize):'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {(language === 'ur' ? profile.avoidFoodsUrdu : profile.avoidFoods).map((food, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Recommended Tameer-e-Sehat Herbal Remedies */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ur' ? 'آپ کے مزاج کے لیے تجویز کردہ خالص نسخہ جات:' : 'Targeted Remedies for Your Temperament:'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedProductsList.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod.id);
                      }}
                      className="p-3.5 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                            {language === 'ur' ? prod.urduName : prod.name}
                          </h5>
                          <span className="text-xs font-black text-emerald-800">
                            Rs. {prod.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-md font-bold">
                        View
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Deep Analysis Section */}
              {aiReport ? (
                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-teal-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>{language === 'ur' ? 'تفصیلی AI حکیمی تجزیہ و 7 روزہ پلان:' : 'In-Depth Hakeem AI Analysis & 7-Day Protocol:'}</span>
                  </h4>
                  <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    {aiReport}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGetAiDeepReport}
                  disabled={loadingAi}
                  className="w-full py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {loadingAi 
                      ? (language === 'ur' ? 'تفصیلی تجزیہ تیار ہو رہا ہے...' : 'Generating 7-Day Lifestyle Plan...') 
                      : (language === 'ur' ? 'تفصیلی 7 روزہ ہربل ڈائٹ پلان حاصل کریں (AI)' : 'Generate AI 7-Day Lifestyle Protocol')}
                  </span>
                </button>
              )}

              {/* Share with Hakeem on WhatsApp */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppShareText()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'ur' ? 'یہ رپورٹ حکیم صاحب کو واٹس ایپ پر بھیجیں' : 'Send Report to Hakeem on WhatsApp'}</span>
                </a>

                <button
                  onClick={resetQuiz}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'دوبارہ ٹیسٹ لیں' : 'Retake Quiz'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
