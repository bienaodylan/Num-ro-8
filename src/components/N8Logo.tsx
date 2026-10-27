import React from 'react';

interface N8LogoProps {
  variant?: 'sculptural' | 'header' | 'mark' | 'footer';
  className?: string;
  onClick?: () => void;
}

export const N8Logo: React.FC<N8LogoProps> = ({
  variant = 'header',
  className = '',
  onClick
}) => {
  if (variant === 'sculptural') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex flex-col items-center select-none group cursor-pointer ${className}`}
      >
        {/* Real cropped 3D chrome sculpted logo from moodboard */}
        <div className="relative">
          <img
            src="/assets/n8/logo_3d_chrome.png"
            alt="N°8 Sculpture Métallique"
            className="w-48 sm:w-60 md:w-72 h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] contrast-110 brightness-105 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          {/* Subtle light sweep reflection */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 bg-gradient-to-tr from-transparent via-white/20 to-transparent group-hover:opacity-75 transition-opacity duration-700" />
        </div>
      </div>
    );
  }

  if (variant === 'mark') {
    return (
      <div
        onClick={onClick}
        className={`font-gothic font-bold text-2xl tracking-tighter text-[#E8E5E0] cursor-pointer inline-flex items-baseline select-none ${className}`}
      >
        <span>N</span>
        <span className="text-xs -translate-y-2 opacity-90 mx-[1px]">°</span>
        <span>8</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`font-gothic text-3xl md:text-4xl tracking-tight text-[#E8E5E0] cursor-pointer inline-flex items-baseline select-none hover:text-white transition-colors ${className}`}
      >
        <span className="chrome-text">N</span>
        <span className="text-sm -translate-y-3 opacity-80 mx-[1px] text-[#A7A7A7]">°</span>
        <span className="chrome-text">8</span>
      </div>
    );
  }

  // Default: Header minimal gothic wordmark
  return (
    <div
      onClick={onClick}
      className={`font-gothic text-2xl md:text-3xl tracking-tight text-[#E8E5E0] cursor-pointer inline-flex items-baseline select-none transition-all duration-300 hover:text-white ${className}`}
    >
      <span className="font-bold tracking-tight">N</span>
      <span className="text-xs -translate-y-2.5 opacity-80 mx-[1px] font-sans font-light">°</span>
      <span className="font-bold">8</span>
    </div>
  );
};
