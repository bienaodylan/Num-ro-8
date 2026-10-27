import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Check, ArrowLeft, Ruler, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    activeProduct,
    navigateTo,
    formatPrice,
    addToCart,
    setIsCartOpen
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<string>(
    activeProduct?.primaryImage || '/assets/n8/art_untitled_01.png'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    activeProduct?.availableSizes ? activeProduct.availableSizes[0] : 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!activeProduct) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <p className="text-sm text-[#85817D]">Produit introuvable.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-[#181818] border border-[#333] text-xs uppercase tracking-widest text-[#E8E5E0] cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const isArtwork = activeProduct.category === 'galerie';
  const isApparel = activeProduct.category === 'collections';
  const isObject = activeProduct.category === 'objets';

  // Stock computation
  const availableStock = isApparel && activeProduct.stockPerSize
    ? (activeProduct.stockPerSize[selectedSize] ?? activeProduct.stock)
    : activeProduct.stock;

  const isSoldOut = availableStock <= 0 || activeProduct.status === 'vendu';

  const handleAddToCart = () => {
    if (isSoldOut) return;
    const size = isApparel ? selectedSize : undefined;
    const ok = addToCart(activeProduct, quantity, size);
    if (ok) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigateTo(activeProduct.category)}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#85817D] hover:text-[#E8E5E0] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>RETOUR À LA COLLECTION {activeProduct.category.toUpperCase()}</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Gallery / Visual Showcase */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Large Viewport */}
            <div className="relative aspect-[4/5] bg-[#121212] border border-[#1C1C1C] overflow-hidden group">
              <img
                src={selectedImage}
                alt={activeProduct.title}
                className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
              {activeProduct.status === 'vendu' && (
                <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                  <span className="text-sm font-mono tracking-widest uppercase text-white/90 border border-white/40 px-4 py-2">
                    Collection Privée · Vendu
                  </span>
                </div>
              )}
              {activeProduct.isUniquePiece && activeProduct.status !== 'vendu' && (
                <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#E8E5E0] bg-black/80 px-3 py-1 border border-[#333]">
                  PIÈCE UNIQUE
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {activeProduct.images && activeProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {activeProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 shrink-0 bg-[#141414] border transition-all cursor-pointer overflow-hidden ${
                      selectedImage === img
                        ? 'border-[#E8E5E0] opacity-100 scale-102'
                        : 'border-[#222] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Guarantee Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#171717] text-[11px] text-[#85817D] font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#C7C7C7] shrink-0" />
                <span>Certificat d'atelier signé</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#C7C7C7] shrink-0" />
                <span>Expédition sécurisée d'art</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-[#C7C7C7] shrink-0" />
                <span>Suivi d'acheminement prioritaire</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-[#1A1A1A]">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#777] uppercase flex items-center gap-2">
                <span>N°8</span>
                <span>/</span>
                <span>{activeProduct.category.toUpperCase()}</span>
                {activeProduct.collectionName && (
                  <>
                    <span>/</span>
                    <span>{activeProduct.collectionName}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif-editorial text-[#E8E5E0] uppercase tracking-wide">
                {activeProduct.title}
              </h1>

              <p className="text-xs text-[#85817D]">
                {activeProduct.subtitle}
              </p>

              <div className="pt-2 text-2xl font-mono tabular-nums text-[#E8E5E0] font-medium">
                {formatPrice(activeProduct.price)}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono tracking-widest text-[#888] uppercase">
                DESCRIPTION & DÉMARCHE
              </h4>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-sans">
                {activeProduct.description}
              </p>
            </div>

            {/* Apparel Size Selector */}
            {isApparel && activeProduct.availableSizes && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase">
                    CHOISIR LA TAILLE
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[11px] font-mono text-[#AAA] hover:text-[#E8E5E0] underline cursor-pointer"
                  >
                    Guide des tailles
                  </button>
                </div>

                <div className="flex gap-2">
                  {activeProduct.availableSizes.map(size => {
                    const sizeStock = activeProduct.stockPerSize ? activeProduct.stockPerSize[size] ?? 1 : 1;
                    const disabled = sizeStock <= 0;
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 py-2 text-xs font-mono transition-all cursor-pointer ${
                          disabled
                            ? 'bg-[#141414] text-[#444] line-through cursor-not-allowed border border-[#1C1C1C]'
                            : isSelected
                            ? 'bg-[#E8E5E0] text-[#080808] font-bold border border-[#E8E5E0]'
                            : 'bg-[#141414] text-[#A7A7A7] hover:text-white border border-[#262626]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Primary Buy CTA */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className={`w-full py-4 px-6 text-xs font-sans tracking-[0.25em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                  isSoldOut
                    ? 'bg-[#1A1A1A] text-[#666] cursor-not-allowed border border-[#262626]'
                    : justAdded
                    ? 'bg-emerald-950 text-emerald-200 border border-emerald-700'
                    : 'bg-[#E8E5E0] hover:bg-white text-[#080808] border border-[#E8E5E0]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={14} />
                    <span>AJOUTÉ AU PANIER</span>
                  </>
                ) : isSoldOut ? (
                  <span>PIÈCE NON DISPONIBLE</span>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>AJOUTER AU PANIER · {formatPrice(activeProduct.price)}</span>
                  </>
                )}
              </button>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#666]">
                <span>
                  {activeProduct.isUniquePiece
                    ? 'Pièce unique d\'artiste'
                    : isApparel
                    ? `Taille ${selectedSize} : ${availableStock} ex. disponibles`
                    : `${availableStock} exemplaires restants`}
                </span>
                <span>{activeProduct.executionDelay || 'Prêt pour expédition'}</span>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="pt-6 border-t border-[#1C1C1C] space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-[#888] uppercase">
                SPÉCIFICATIONS D'ATELIER
              </h4>
              <dl className="divide-y divide-[#171717] text-xs font-mono">
                <div className="py-2 flex justify-between">
                  <dt className="text-[#666]">Technique</dt>
                  <dd className="text-[#CCC] text-right max-w-xs">{activeProduct.technique}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-[#666]">Matériaux</dt>
                  <dd className="text-[#CCC] text-right max-w-xs">{activeProduct.materials}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-[#666]">Dimensions</dt>
                  <dd className="text-[#CCC] text-right">{activeProduct.dimensions}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-[#666]">Année</dt>
                  <dd className="text-[#CCC] text-right">{activeProduct.year}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-[#666]">Origine</dt>
                  <dd className="text-[#CCC] text-right">Atelier N°8, Abidjan</dd>
                </div>
              </dl>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
