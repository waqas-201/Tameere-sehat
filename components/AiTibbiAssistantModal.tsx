'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  ShieldAlert, 
  RotateCcw,
  Stethoscope
} from 'lucide-react';
import { STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

export default function AiTibbiAssistantModal() {
  const { isAiAssistantOpen, setIsAiAssistantOpen, language } = useApp();

  const initialGreeting = language === 'ur'
    ? 'السلام علیکم! میں تعمیرِ صحت دواخانہ کا ڈیجیٹل حکیم AI مشیر ہوں۔ آپ جڑی بوٹیوں کے درست استعمال، معدے، جگر، جوڑوں کے درد، مزاج یا گھریلو نبوی نسخوں کے بارے میں کوئی بھی سوال پوچھ سکتے ہیں۔'
    : 'Assalam-o-Alaikum! I am your Tameer-e-Sehat Digital Hakeem AI Advisor. How can I guide you with traditional Unani wisdom, pure herbal remedies, or dietary guidelines today?';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: initialGreeting }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAiAssistantOpen) return null;

  const quickPrompts = [
    language === 'ur' ? 'جگر اور معدے کی گرمی کا فوری علاج کیا ہے؟' : 'What is the best remedy for liver & stomach heat?',
    language === 'ur' ? 'اصلی سلاجیت استعمال کرنے کا درست طریقہ اور فوائد بتائیں؟' : 'What is the correct dosage and benefits of Pure Shilajit?',
    language === 'ur' ? 'جوڑوں کے درد اور عرق النساء کے لیے کون سا نسخہ آزمودہ ہے؟' : 'Which formulation is recommended for joint & sciatica nerve pain?',
    language === 'ur' ? 'صفراوی مزاج والے کو کیا پرہیز کرنا چاہیے؟' : 'What foods should a person with Safrawi temperament avoid?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const newMsgs: Message[] = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          language: language
        })
      });

      const data = await res.json();
      if (data.text) {
        setMessages([...newMsgs, { role: 'assistant', text: data.text }]);
      } else {
        setMessages([
          ...newMsgs,
          { 
            role: 'assistant', 
            text: language === 'ur'
              ? 'معذرت، براہ کرم ہمارے سینئر حکیم صاحب سے واٹس ایپ پر براہ راست مشورہ فرمائیں۔ (+92 318 2311310)'
              : 'Please connect directly with our Senior Hakeem on WhatsApp at +92 318 2311310 for personal attention.' 
          }
        ]);
      }
    } catch (err) {
      console.error('AI error', err);
      setMessages([
        ...newMsgs,
        { 
          role: 'assistant', 
          text: 'Unable to connect right now. Please reach our Hakeem on WhatsApp at +92 318 2311310.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0e2a1f] text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center border border-emerald-600/40">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                {language === 'ur' ? '24/7 ڈیجیٹل حکیمی رہنمائی' : 'AI Unani Tibbi Assistant'}
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                {language === 'ur' ? 'حکیم AI مشیر (Tameer AI Advisor)' : 'Tameer-e-Sehat Virtual Hakeem AI'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="bg-stone-50 border-b border-stone-200/80 px-4 py-2.5 overflow-x-auto scrollbar-none flex gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-medium bg-white hover:bg-emerald-50 text-stone-700 hover:text-[#155e42] px-3 py-1.5 rounded-full border border-stone-200 hover:border-emerald-300 transition-all shrink-0 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[50vh] bg-[#fcfbfa]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 items-start ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-stone-800 text-white'
                    : 'bg-[#0e2a1f] text-emerald-300'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[82%] sm:max-w-[75%] ${
                  msg.role === 'user'
                    ? 'bg-[#155e42] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs shadow-2xs whitespace-pre-wrap'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-[#0e2a1f] text-emerald-300 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-stone-200 p-3.5 rounded-2xl rounded-tl-xs text-xs text-stone-500 italic">
                {language === 'ur' ? 'حکیم AI مشیر نباتاتی و طبی تجزیہ کر رہا ہے...' : 'Analyzing Unani references and botanical pharmacopeia...'}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'ur'
                  ? 'جڑی بوٹی کے استعمال، مزاج، معدے یا علاج کے متعلق سوال لکھیں...'
                  : 'Ask about pure herbs, health symptoms, diet, or Unani remedies...'
              }
              className="flex-1 bg-stone-100 focus:bg-white text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:border-[#199b50] focus:ring-2 focus:ring-[#199b50]/20 outline-none transition-all"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-[#199b50] hover:bg-[#158242] text-white disabled:opacity-40 transition-all shrink-0 shadow-xs"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 pt-1">
            <div className="flex items-center gap-1 text-stone-400">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>For complex acute conditions, consult our certified Hakeem directly.</span>
            </div>

            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Hakeem%20Sahab,%20I%20need%20herbal%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#155e42] hover:underline font-bold flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-emerald-600" />
              <span>Talk to Hakeem on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
