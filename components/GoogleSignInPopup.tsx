'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { X, Check, ArrowRight, Shield } from 'lucide-react';

export default function GoogleSignInPopup() {
  const { isGooglePopupOpen, closeGooglePopup, loginWithGoogle, isLoading } = useAuth();
  const { showToast } = useApp();

  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  if (!isGooglePopupOpen) return null;

  const demoAccounts = [
    {
      name: 'Waqas Khan',
      email: 'waqasvu892@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Dr. Tariq Jamil',
      email: 'tariq.jamil@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Amina Bibi (Karachi)',
      email: 'amina.unani@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    }
  ];

  const handleSelectAccount = async (account: { name: string; email: string; avatar: string }) => {
    const res = await loginWithGoogle(account);
    if (res.success) {
      showToast(`Signed in with Google as ${account.name}`);
      closeGooglePopup();
    } else {
      showToast(res.message || 'Google login failed');
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    const name = customName || customEmail.split('@')[0];
    const account = {
      name,
      email: customEmail.toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4285f4&textColor=ffffff`,
    };
    const res = await loginWithGoogle(account);
    if (res.success) {
      showToast(`Signed in with Google as ${name}`);
      closeGooglePopup();
    } else {
      showToast(res.message || 'Google login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative">
        
        {/* Google Header */}
        <div className="p-6 text-center border-b border-stone-100 relative">
          <button 
            onClick={closeGooglePopup}
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Official Google SVG Logo */}
          <div className="flex justify-center mb-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-stone-900">Sign in with Google</h3>
          <p className="text-xs text-stone-500 mt-1">
            Choose an account to continue to <span className="font-semibold text-stone-800">Tameer-e-Sehat Apothecary</span>
          </p>
        </div>

        {/* Body: Account Selector */}
        <div className="p-6 space-y-4">
          
          {!isAddingAccount ? (
            <>
              <div className="space-y-2">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    disabled={isLoading}
                    onClick={() => handleSelectAccount(account)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group"
                  >
                    <img 
                      src={account.avatar} 
                      alt={account.name} 
                      className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-blue-600 truncate">
                        {account.name}
                      </div>
                      <div className="text-xs text-stone-500 truncate">
                        {account.email}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-blue-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  + Use another Google account
                </button>

                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-stone-400" />
                  OAuth 2.0 / JWT
                </span>
              </div>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Google Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Display Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Waqas Khan"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !customEmail}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Authenticating...' : 'Sign In with Google'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-stone-50 p-3 text-center border-t border-stone-100 text-[11px] text-stone-500">
          To continue, Google will share your name, email address, and profile picture with Tameer-e-Sehat.
        </div>

      </div>
    </div>
  );
}
