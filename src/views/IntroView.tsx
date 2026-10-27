import React from 'react';
import { useStore } from '../context/StoreContext';
import { N8Logo } from '../components/N8Logo';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

export const IntroView: React.FC = () => {
  const { navigateTo, soundActive, toggleSound } = useStore();

  const handleEnter = () => {
    // Optionally trigger sound if not active
    navigateTo('home');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080808] text-[#E8E5E0] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden animate-in fade-in duration-1000">
      
      {/* Background subtle grain */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 w-full flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#85817D]">
        <N8Logo variant="header" onClick={handleEnter} />
        
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 py-1.5 px-3 border border-transparent hover:border-[#202020] transition-colors cursor-pointer text-[#85817D] hover:text-[#E8E5E0]"
        >
          {soundActive ? (
            <>
              <Volume2 size={13} className="text-[#E8E5E0] animate-pulse" />
              <span>SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX size={13} />
              <span>SOUND OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Center hero block with 3D Chrome Sculptural Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4 py-8 max-w-2xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Sculptural 3D Logo */}
        <div className="relative group cursor-pointer" onClick={handleEnter}>
          <div className="relative">
            <img
              src="/assets/n8/logo_3d_chrome.png"
              alt="Logo N°8"
              className="w-56 sm:w-72 md:w-88 h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] contrast-115 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 bg-gradient-to-tr from-transparent via-white/30 to-transparent group-hover:opacity-40 transition-opacity duration-700" />
          </div>
        </div>

        {/* Editorial Subtitle */}
        <div className="space-y-2">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.35em] uppercase text-[#A7A7A7]">
            ART / OBJECTS / APPAREL
          </p>
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#5A5A5A]">
            AN INDEPENDENT CREATIVE UNIVERSE
          </p>
        </div>

        {/* Action Button: ENTRER */}
        <div className="pt-2">
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 bg-transparent hover:bg-[#E8E5E0] text-[#E8E5E0] hover:text-[#080808] border border-[#333333] hover:border-[#E8E5E0] transition-all duration-500 ease-out font-sans text-xs uppercase tracking-[0.25em] cursor-pointer"
          >
            <span>ENTRER</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>

      {/* Bottom liquid silk wave image from design moodboard */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-45 mix-blend-screen z-0">
        <img
          src="/assets/n8/intro_liquid_silk.png"
          alt=""
          className="w-full h-32 sm:h-48 md:h-64 object-cover object-bottom"
        />
      </div>

      {/* Bottom text markers */}
      <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-[#606060] pt-6">
        <span>ABIDJAN / WORLDWIDE</span>
        <span>EST. 2025</span>
      </div>

    </div>
  );
};
