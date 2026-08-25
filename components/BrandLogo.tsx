'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'lockup' | 'light' | 'icon-only';
  showSubtitle?: boolean;
}

/**
 * Tameer-e-Sehat Official Brand Logo
 * Styled directly from the authentic original logo:
 * - Signature Primary Green: #00873E
 * - Crisp White Leaf & Typography: #FFFFFF
 * - Iconic rounded pill container with inner white border
 */
export default function BrandLogo({ 
  className = '', 
  size = 'md',
  variant = 'badge',
  showSubtitle = true
}: BrandLogoProps) {
  // Dimension maps based on size
  const badgeDimensions = {
    sm: { width: 140, height: 46, fontSize1: 17, fontSize2: 15 },
    md: { width: 180, height: 60, fontSize1: 22, fontSize2: 19 },
    lg: { width: 220, height: 74, fontSize1: 27, fontSize2: 24 },
    xl: { width: 280, height: 94, fontSize1: 34, fontSize2: 30 },
  }[size];

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  if (variant === 'icon-only') {
    return (
      <div 
        dir="ltr"
        style={{ direction: 'ltr' }}
        className={`inline-flex items-center justify-center rounded-2xl bg-[#00873E] p-1.5 shadow-sm border border-emerald-600/30 shrink-0 flex-none ${className}`}
      >
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white shrink-0"
          style={{ direction: 'ltr' }}
        >
          {/* Inner rounded border */}
          <rect x="2" y="2" width="36" height="36" rx="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.9" fill="none" />
          {/* Stylized authentic leaf */}
          <path 
            d="M9 29C9 29 11 13 29 9C29 9 34 22 22 29C15 33 9 29 9 29Z" 
            fill="white"
          />
          {/* Leaf inner cutout vein */}
          <path 
            d="M10 28C17 23 24 18 28 10" 
            stroke="#00873E" 
            strokeWidth="2.2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Full Authentic Badge Mode (Exact Match to uploaded logo)
  return (
    <div 
      dir="ltr" 
      style={{ direction: 'ltr', minWidth: `${badgeDimensions.width}px` }}
      className={`inline-flex flex-col select-none shrink-0 flex-none ${className}`}
    >
      <div 
        dir="ltr"
        style={{ direction: 'ltr' }}
        className="relative group transition-transform duration-200 hover:scale-[1.02] inline-block shrink-0 flex-none"
      >
        <svg
          width={badgeDimensions.width}
          height={badgeDimensions.height}
          viewBox="0 0 240 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm block shrink-0 flex-none"
          style={{ 
            direction: 'ltr',
            width: `${badgeDimensions.width}px`, 
            height: `${badgeDimensions.height}px`,
            minWidth: `${badgeDimensions.width}px`,
            minHeight: `${badgeDimensions.height}px`,
            aspectRatio: '240 / 80'
          }}
        >
          {/* Outer Rounded Container with Primary Green #00873E */}
          <rect 
            x="1" 
            y="1" 
            width="238" 
            height="78" 
            rx="18" 
            fill="#00873E" 
            stroke="#007335" 
            strokeWidth="1.5"
          />
          
          {/* Inner Rounded White Border */}
          <rect 
            x="5.5" 
            y="5.5" 
            width="229" 
            height="69" 
            rx="14" 
            stroke="#FFFFFF" 
            strokeWidth="2.2" 
            strokeOpacity="0.95"
            fill="none"
          />

          {/* Left Leaf Botanical Motif (Matching Original Logo) */}
          <g transform="translate(14, 15)">
            {/* Solid Leaf Silhouette */}
            <path 
              d="M3 48C3 48 5 18 36 9C36 9 43 33 24 48C13 56 3 48 3 48Z" 
              fill="#FFFFFF"
            />
            {/* Primary Green Vein cutout */}
            <path 
              d="M5 47C15 39 27 28 35 11" 
              stroke="#00873E" 
              strokeWidth="2.8" 
              strokeLinecap="round"
            />
          </g>

          {/* Typography: Tameer (Line 1) & -e- Sehat (Line 2) */}
          <g fill="#FFFFFF" style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
            {/* Tameer */}
            <text
              x="62"
              y="37"
              textAnchor="start"
              direction="ltr"
              unicodeBidi="embed"
              fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Arial Rounded MT Bold', sans-serif"
              fontWeight="900"
              fontSize="29"
              letterSpacing="0.5"
              fill="#FFFFFF"
            >
              Tameer
            </text>

            {/* -e- Sehat */}
            <text
              x="60"
              y="67"
              textAnchor="start"
              direction="ltr"
              unicodeBidi="embed"
              fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Arial Rounded MT Bold', sans-serif"
              fontWeight="900"
              fontSize="28"
              letterSpacing="0.2"
              fill="#FFFFFF"
            >
              -e- Sehat
            </text>
          </g>
        </svg>
      </div>

      {showSubtitle && size !== 'sm' && (
        <span 
          dir="ltr"
          style={{ direction: 'ltr' }}
          className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5 text-center hidden sm:block"
        >
          Apothecary • Est. 1990
        </span>
      )}
    </div>
  );
}
