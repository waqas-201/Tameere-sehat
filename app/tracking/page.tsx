'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { STORE_WHATSAPP } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function TrackingPage() {
  const { language } = useApp();

  const [searchCode, setSearchCode] = useState('');
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setSearched(true);
    // Simulate real lookup
    setTrackingData({
      trackingId: searchCode.toUpperCase().startsWith('TS-') ? searchCode.toUpperCase() : `TS-${searchCode.slice(-5)}`,
      courier: 'TCS Express (Cash on Delivery)',
      status: 'Dispatched & In Transit',
      currentCity: 'Central Logistics Hub, Karachi',
      destination: 'Lahore, Punjab',
      expectedDelivery: 'In 24 - 48 Hours',
      steps: [
        { label: 'Order Received & Logged', time: 'Yesterday, 11:30 AM', done: true },
        { label: 'Hakeem Verified & Compounded', time: 'Yesterday, 04:15 PM', done: true },
        { label: 'Dispatched via TCS Express', time: 'Today, 09:00 AM', done: true },
        { label: 'Out for Doorstep Delivery', time: 'Pending local courier run', done: false },
        { label: 'Delivered (COD Collected)', time: 'Pending', done: false }
      ]
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#199b50] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5" />
          <span>Nationwide Logistics</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone-900">
          {language === 'ur' ? 'اپنا ہربل آرڈر ٹریک کریں' : 'Track Your Apothecary Parcel'}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          Enter your Order ID (e.g. TS-98234) or your 11-digit WhatsApp phone number to check live courier dispatch status.
        </p>
      </div>

      {/* Tracking Search Input Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="e.g. TS-88421 or 03182311310"
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-3.5 text-xs sm:text-sm font-semibold outline-none focus:border-[#199b50] focus:bg-white"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-4" />
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-[#199b50] hover:bg-[#158242] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <Truck className="w-4 h-4" />
            <span>Track Parcel</span>
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100">
          <span>Supported couriers: TCS Express, Leopards, Trax Courier, Call Courier</span>
          <span className="hidden sm:inline">250+ Cities in Pakistan</span>
        </div>
      </div>

      {/* Tracking Results Card */}
      {searched && trackingData && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-8 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#199b50] uppercase tracking-widest">
                Consignment Details
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Tracking ID: <span className="font-mono text-[#155e42]">{trackingData.trackingId}</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Courier: {trackingData.courier}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-left sm:text-right">
              <span className="text-[10px] text-stone-500 font-bold block uppercase">Current Status</span>
              <span className="text-xs font-bold text-[#155e42] flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{trackingData.status}</span>
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Parcel Progression & Dispatch Timeline:
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {trackingData.steps.map((step: any, idx: number) => (
                <div key={idx} className="relative flex items-start gap-4 text-xs">
                  <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    step.done ? 'bg-[#199b50] border-[#199b50] text-white' : 'bg-white border-stone-300'
                  }`}>
                    {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className={`font-bold ${step.done ? 'text-stone-900' : 'text-stone-400'}`}>
                      {step.label}
                    </div>
                    <div className="text-[11px] text-stone-400">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Support */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Need immediate parcel verification or change of address?
            </span>

            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20I%20want%20status%20for%20order%20${trackingData.trackingId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Dispatch Desk</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
