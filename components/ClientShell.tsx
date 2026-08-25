'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ProductDetailModal from './ProductDetailModal';
import AiTibbiAssistantModal from './AiTibbiAssistantModal';
import AuthModal from './AuthModal';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { STORE_WHATSAPP } from '@/lib/data';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { toastMessage, setIsAiAssistantOpen, language } = useApp();

  return (
    <div 
      dir={language === 'ur' ? 'rtl' : 'ltr'} 
      className={`min-h-screen flex flex-col bg-[#f8faf9] text-slate-900 ${
        language === 'ur' ? 'font-sans text-right' : 'font-sans text-left'
      }`}
    >
      
      {/* Persistent Multi-Page Navigation Header */}
      <Navbar />

      {/* Main Page Dynamic Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Persistent Multi-Page Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <AiTibbiAssistantModal />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#00873E] text-white px-5 py-3 rounded-full shadow-2xl border border-white/30 flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Quick Triggers */}
      <div className={`fixed bottom-6 ${language === 'ur' ? 'left-6' : 'right-6'} z-40 flex flex-col gap-3`}>
        {/* AI Assistant Floating Trigger */}
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="w-12 h-12 rounded-full bg-[#00873E] hover:bg-[#007335] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border border-white/40 group relative"
          aria-label="AI Tibbi Assistant"
        >
          <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
          <span className={`absolute ${language === 'ur' ? 'left-14' : 'right-14'} bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
            {language === 'ur' ? 'حکیم AI مشیر' : 'AI Herbal Advisor'}
          </span>
        </button>

        {/* WhatsApp Direct Hakeem Trigger */}
        <a
          href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20need%20Hakeem%20consultation.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#00873E] hover:bg-[#007335] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border border-white/40 group relative"
          aria-label="WhatsApp Hakeem"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
          <span className={`absolute ${language === 'ur' ? 'left-14' : 'right-14'} bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
            {language === 'ur' ? 'حکیم صاحب سے واٹس ایپ پر بات کریں' : 'Chat with Hakeem on WhatsApp'}
          </span>
        </a>
      </div>

    </div>
  );
}
