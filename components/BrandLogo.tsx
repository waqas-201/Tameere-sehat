'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'emerald';
}

export default function BrandLogo({ 
  className = '', 
  size = 'md',
  variant = 'dark' 
}: BrandLogoProps) {
  const isLight = variant === 'light';

  // Responsive sizing configurations
  const iconSizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg',
    md: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
    lg: 'w-11 h-11 sm:w-12 sm:h-12 rounded-2xl'
  }[size];

  const svgSizeClasses = {
    sm: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
    md: 'w-5 h-5 sm:w-5.5 sm:h-5.5',
    lg: 'w-6 h-6 sm:w-7 sm:h-7'
  }[size];

  const titleSizeClasses = {
    sm: 'text-xs sm:text-sm md:text-base font-extrabold tracking-tight whitespace-nowrap',
    md: 'text-sm sm:text-base md:text-lg font-extrabold tracking-tight whitespace-nowrap',
    lg: 'text-base sm:text-xl md:text-2xl font-black tracking-tight whitespace-nowrap'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none shrink-0 min-w-0 ${className}`}>
      {/* Botanical Emblem Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className={`${iconSizeClasses} bg-[#155e42] text-white flex items-center justify-center shadow-xs border border-emerald-700/40 group-hover:bg-[#0e2a1f] transition-colors shrink-0`}>
          {/* Stylized Botanical Leaf + Mortar Motif */}
          <svg 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`${svgSizeClasses} text-white shrink-0`}
          >
            <path 
              d="M7 23C7 23 9 11 23 8C23 8 28 17 19 23C13 28 7 23 7 23Z" 
              fill="currentColor"
              fillOpacity="0.95"
            />
            <path 
              d="M9 22C14 18 20 14 23 8" 
              stroke="#bbf7d0" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <path 
              d="M5 28C8 25.5 10 23 11 20.5" 
              stroke="#fef08a" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Small gold sparkle accent */}
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-white shrink-0" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left justify-center min-w-0 shrink-0">
        <div className="flex items-center leading-none">
          <span className={`font-serif ${titleSizeClasses} ${isLight ? 'text-white' : 'text-stone-900'}`}>
            TAMEER<span className="text-[#199b50] font-sans font-black">-E-</span>SEHAT
          </span>
        </div>
        
        {size === 'sm' ? (
          <span className={`hidden sm:block text-[9px] font-semibold tracking-wider uppercase mt-0.5 whitespace-nowrap truncate ${isLight ? 'text-emerald-200/90' : 'text-stone-500'}`}>
            Apothecary • Est. 1990
          </span>
        ) : (
          <span className={`text-[9px] sm:text-[10px] font-medium tracking-wider uppercase mt-0.5 whitespace-nowrap truncate ${isLight ? 'text-emerald-200/90' : 'text-stone-500'}`}>
            Botanical Apothecary • Est. 1990
          </span>
        )}
      </div>
    </div>
  );
}
