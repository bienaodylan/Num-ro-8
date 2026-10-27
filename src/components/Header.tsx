import React, { useState } from 'react';
import { useStore, ViewState } from '../context/StoreContext';
import { N8Logo } from './N8Logo';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Shield, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartItemCount,
    setIsCartOpen,
    currency,
    setCurrency,
    soundActive,
    toggleSound,
    isAdminAuthenticated
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewState }[] = [
    { label: 'ACCUEIL', view: 'home' },
    { label: 'GALERIE', view: 'galerie' },
    { label: 'OBJETS', view: 'objets' },
    { label: 'COLLECTIONS', view: 'collections' },
    { label: 'ARCHIVES', view: 'archives' }
  ];

  const handleNavClick = (view: ViewState) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#1A1A1A] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <N8Logo
              variant="header"
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-sans-ui uppercase tracking-[0.2em] text-[#85817D]">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#E8E5E0] cursor-pointer ${
                    isActive ? 'text-[#E8E5E0] font-medium' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E8E5E0]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Sound, Currency, Cart Drawer Trigger, Mobile menu) */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? 'Désactiver le son d\'ambiance' : 'Activer le son d\'ambiance'}
              className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#85817D] hover:text-[#E8E5E0] transition-colors py-1 px-2 cursor-pointer"
            >
              {soundActive ? (
                <>
                  <Volume2 size={13} className="text-[#E8E5E0] animate-pulse" />
                  <span className="hidden lg:inline text-[9px] uppercase">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={13} />
                  <span className="hidden lg:inline text-[9px] uppercase">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                className="flex items-center gap-1 text-[11px] tracking-wider text-[#85817D] hover:text-[#E8E5E0] py-1 px-2 transition-colors cursor-pointer"
                title="Changer de devise"
              >
                <Globe size={12} className="opacity-70" />
                <span>{currency}</span>
              </button>

              {currencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#111111] border border-[#262626] shadow-2xl py-1 z-50">
                  {(['XOF', 'EUR', 'USD'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                        currency === c
                          ? 'bg-[#1C1C1C] text-[#E8E5E0] font-medium'
                          : 'text-[#85817D] hover:text-[#E8E5E0] hover:bg-[#171717]'
                      }`}
                    >
                      {c === 'XOF' ? 'XOF (CFA)' : c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Back-Office Access */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Espace Atelier & Administration"
              className={`p-1.5 transition-colors cursor-pointer ${
                currentView === 'admin'
                  ? 'text-[#E8E5E0]'
                  : 'text-[#85817D] hover:text-[#E8E5E0]'
              }`}
            >
              <Shield size={14} className={isAdminAuthenticated ? 'text-amber-400/90' : ''} />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#E8E5E0] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Voir le panier"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="text-[11px] font-mono font-medium text-[#080808] bg-[#E8E5E0] w-4 h-4 rounded-full flex items-center justify-center -translate-y-1">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#E8E5E0] hover:text-white transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer / Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-20 animate-in fade-in duration-200">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-[#85817D] hover:text-[#E8E5E0] cursor-pointer"
            aria-label="Fermer le menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col gap-6 pt-8">
            <N8Logo variant="header" className="mb-4" onClick={() => handleNavClick('home')} />
            
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`text-left text-2xl font-serif-editorial tracking-wider transition-colors py-1 cursor-pointer flex items-center justify-between border-b border-[#1A1A1A] pb-3 ${
                  currentView === link.view ? 'text-[#E8E5E0]' : 'text-[#85817D] hover:text-[#E8E5E0]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#555]">0{idx + 1}</span>
              </button>
            ))}

            <button
              onClick={() => handleNavClick('about')}
              className={`text-left text-2xl font-serif-editorial tracking-wider transition-colors py-1 cursor-pointer border-b border-[#1A1A1A] pb-3 ${
                currentView === 'about' ? 'text-[#E8E5E0]' : 'text-[#85817D] hover:text-[#E8E5E0]'
              }`}
            >
              À PROPOS
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="text-left text-sm font-sans uppercase tracking-widest text-[#85817D] hover:text-[#E8E5E0] pt-2 flex items-center gap-2 cursor-pointer"
            >
              <Shield size={14} />
              <span>ATELIER & ADMINISTRATION</span>
            </button>
          </div>

          <div className="border-t border-[#1C1C1C] pt-6 flex flex-col gap-3 text-xs text-[#85817D] font-mono">
            <div className="flex justify-between items-center">
              <span>DEVISE:</span>
              <div className="flex gap-3">
                {(['XOF', 'EUR', 'USD'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`cursor-pointer ${currency === c ? 'text-[#E8E5E0] underline font-bold' : ''}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span>SON D'AMBIANCE:</span>
              <button
                onClick={toggleSound}
                className="text-[#E8E5E0] underline cursor-pointer"
              >
                {soundActive ? 'ACTIF' : 'MUET'}
              </button>
            </div>
            <p className="text-[10px] text-[#444] pt-2">
              N°8 — ABIDJAN / WORLDWIDE · EST. 2025
            </p>
          </div>
        </div>
      )}
    </>
  );
};
