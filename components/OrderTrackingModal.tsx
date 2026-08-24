'use client';

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  PhoneCall, 
  MessageSquare 
} from 'lucide-react';
import { Language } from '@/lib/types';
import { STORE_WHATSAPP, STORE_PHONE } from '@/lib/data';

interface OrderTrackingModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export default function OrderTrackingModal({
  isOpen,
  language,
  onClose
}: OrderTrackingModalProps) {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedData, setTrackedData] = useState<{
    orderId: string;
    trackingNumber: string;
    courier: string;
    status: string;
    currentLocation: string;
    estimatedDelivery: string;
    steps: Array<{ title: string; time: string; completed: boolean; current?: boolean }>;
  } | null>(null);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    // Simulated authentic tracking response
    setTrackedData({
      orderId: `TS-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingNumber: trackingInput.toUpperCase(),
      courier: 'TCS Express Pakistan',
      status: 'In Transit to Destination Hub',
      currentLocation: 'TCS Regional Logistics Hub, Karachi',
      estimatedDelivery: 'Tomorrow by 4:00 PM',
      steps: [
        { title: 'Order Verified by Tameer-e-Sehat Hakeem', time: 'Yesterday, 11:30 AM', completed: true },
        { title: 'Pure Herbs Compounded & Sealed at Korangi Hub', time: 'Yesterday, 4:15 PM', completed: true },
        { title: 'Handed over to TCS Courier (Bag # 89410)', time: 'Today, 09:20 AM', completed: true, current: true },
        { title: 'Out for Doorstep Delivery', time: 'Expected Tomorrow', completed: false }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#0e2a1f] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'ur' ? 'ڈلیوری و پارسل ٹریکنگ' : 'Nationwide Courier Tracking'}
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-white">
                {language === 'ur' ? 'اپنا آرڈر ٹریک کریں' : 'Track Your Herbal Parcel'}
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

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Tracking Search Input */}
          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter TCS Tracking # or Order ID (e.g. TCS-7482910-PK)"
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              {language === 'ur' ? 'ٹریک کریں' : 'Track'}
            </button>
          </form>

          {/* Tracked Results View */}
          {trackedData && (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-5 animate-fadeIn">
              
              {/* Header Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200">
                <div>
                  <span className="text-[11px] text-slate-500 block">Status:</span>
                  <span className="text-sm font-black text-emerald-950">{trackedData.status}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Courier:</span>
                  <span className="text-xs font-bold text-slate-800">{trackedData.courier}</span>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-4 relative pl-6 border-l-2 border-emerald-300 ml-2">
                {trackedData.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                        step.completed
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'bg-white border-slate-300'
                      }`}
                    ></div>
                    <h4 className={`text-xs font-bold ${step.current ? 'text-emerald-900 font-black' : 'text-slate-800'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{step.time}</p>
                  </div>
                ))}
              </div>

              {/* Estimated Delivery */}
              <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Estimated Delivery:</span>
                <span className="font-black text-emerald-900">{trackedData.estimatedDelivery}</span>
              </div>

            </div>
          )}

          {/* Quick Help Assistance */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800">Need direct delivery update?</span>
              <p className="text-slate-500 text-[11px]">Chat with our Karachi dispatch officer on WhatsApp</p>
            </div>
            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=Assalam-o-Alaikum%20Tameer-e-Sehat,%20please%20update%20me%20on%20my%20order%20status.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
