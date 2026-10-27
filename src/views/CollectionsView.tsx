import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ShoppingBag, Check, Ruler, ArrowRight, X } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { products, formatPrice, addToCart, navigateTo } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'app-01': 'M',
    'app-02': 'L',
    'app-03': 'M'
  });
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const apparel = products.filter(p => p.category === 'collections');

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddApparel = (e: React.MouseEvent, item: Product) => {
    e.stopPropagation();
    const size = selectedSizes[item.id] || (item.availableSizes ? item.availableSizes[0] : undefined);
    
    // Check specific size stock
    if (size && item.stockPerSize && item.stockPerSize[size] <= 0) {
      return;
    }

    const success = addToCart(item, 1, size);
    if (success) {
      setAddedId(item.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 border-b border-[#1A1A1A]">
        <div className="max-w-3xl space-y-4">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
            03 — VÊTEMENTS DE COLLECTION
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial text-[#E8E5E0] font-normal leading-tight">
            Vêtements & t-shirts
          </h1>
          <p className="text-sm text-[#85817D] font-sans leading-relaxed">
            « Des créations à porter comme des œuvres. » Coupes boxy architecturales, coton peigné biologique lourd 280g/m² et sérigraphies artisanales à l'eau minérale. Éditions numérotées confectionnées dans un dialogue permanent avec la peinture.
          </p>
        </div>

        {/* Size Guide Trigger */}
        <div className="flex justify-between items-center pt-8">
          <div className="text-xs font-mono text-[#85817D]">
            COLLECTION ACTUELLE · TIRAGES LIMITÉS 2025
          </div>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[#A7A7A7] hover:text-[#E8E5E0] border-b border-[#333] pb-1 transition-colors cursor-pointer"
          >
            <Ruler size={13} />
            <span>GUIDE DES TAILLES</span>
          </button>
        </div>
      </section>

      {/* Apparel Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {apparel.map(item => {
            const currentSize = selectedSizes[item.id] || (item.availableSizes ? item.availableSizes[0] : 'M');
            const currentSizeStock = currentSize && item.stockPerSize ? (item.stockPerSize[currentSize] ?? item.stock) : item.stock;
            const isOutOfStock = currentSizeStock <= 0;

            return (
              <div
                key={item.id}
                onClick={() => navigateTo('product-detail', item.slug)}
                className="group cursor-pointer bg-[#0D0D0D] border border-[#191919] hover:border-[#383838] transition-all duration-500 flex flex-col justify-between p-5 space-y-5"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-[#141414] overflow-hidden">
                  <img
                    src={item.primaryImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                    loading="lazy"
                  />

                  <div className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-[#E8E5E0] bg-black/75 px-2.5 py-1 border border-[#333]">
                    {item.collectionName || 'PERMANENTE'}
                  </div>

                  {item.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                      <span className="text-xs font-mono tracking-widest uppercase text-white/90 border border-white/30 px-3 py-1">
                        ÉPUISÉ
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-base font-medium tracking-wide uppercase text-[#E8E5E0]">
                      {item.title}
                    </h3>
                    <span className="text-sm font-mono tabular-nums text-[#E8E5E0]">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <p className="text-xs text-[#85817D] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Size Selector */}
                  <div className="space-y-2 pt-1" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between text-[11px] font-mono text-[#777]">
                      <span>Sélectionner la taille :</span>
                      <span>
                        {isOutOfStock ? (
                          <span className="text-red-400">Taille épuisée</span>
                        ) : (
                          `${currentSizeStock} en stock`
                        )}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {item.availableSizes?.map(size => {
                        const sizeStock = item.stockPerSize ? item.stockPerSize[size] ?? 1 : 1;
                        const disabled = sizeStock <= 0;
                        const isSelected = currentSize === size;

                        return (
                          <button
                            key={size}
                            type="button"
                            disabled={disabled}
                            onClick={() => handleSizeSelect(item.id, size)}
                            className={`flex-1 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                              disabled
                                ? 'bg-[#141414] text-[#444] line-through cursor-not-allowed border border-[#1C1C1C]'
                                : isSelected
                                ? 'bg-[#E8E5E0] text-[#080808] font-bold border border-[#E8E5E0]'
                                : 'bg-[#161616] text-[#A7A7A7] hover:text-white border border-[#262626]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add to Cart CTA */}
                  <div className="pt-2 border-t border-[#171717] flex items-center justify-between gap-3">
                    <button
                      onClick={e => handleAddApparel(e, item)}
                      disabled={isOutOfStock}
                      className={`flex-1 py-2.5 px-4 text-xs font-sans tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        isOutOfStock
                          ? 'bg-[#181818] text-[#555] cursor-not-allowed border border-[#222]'
                          : addedId === item.id
                          ? 'bg-emerald-950 text-emerald-200 border border-emerald-800'
                          : 'bg-[#181818] hover:bg-[#E8E5E0] text-[#E8E5E0] hover:text-[#080808] border border-[#2A2A2A]'
                      }`}
                    >
                      {addedId === item.id ? (
                        <>
                          <Check size={13} />
                          <span>AJOUTÉ ({currentSize})</span>
                        </>
                      ) : isOutOfStock ? (
                        <span>TAILLE INDISPONIBLE</span>
                      ) : (
                        <>
                          <ShoppingBag size={13} />
                          <span>AJOUTER ({currentSize})</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigateTo('product-detail', item.slug)}
                      className="p-2.5 text-[#888] hover:text-[#E8E5E0] border border-transparent hover:border-[#2A2A2A] transition-colors"
                      title="Fiche produit détaillée"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0F0F0F] border border-[#262626] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#E8E5E0]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
                  ATELIER N°8
                </span>
                <h3 className="text-xl font-serif-editorial text-[#E8E5E0]">
                  Guide des tailles — T-shirts boxy
                </h3>
              </div>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-[#888] hover:text-white p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#85817D] leading-relaxed">
              Les coupes N°8 sont légèrement amples et structurées (boxy fit). Si vous préférez une coupe plus ajustée, choisissez une taille en dessous de votre taille habituelle.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#262626] text-[#888] font-mono">
                    <th className="py-2">Taille</th>
                    <th className="py-2">Largeur torse (cm)</th>
                    <th className="py-2">Longueur dos (cm)</th>
                    <th className="py-2">Épaules (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A] font-mono">
                  <tr>
                    <td className="py-2.5 font-bold text-[#E8E5E0]">S</td>
                    <td className="py-2.5 text-[#AAA]">54 cm</td>
                    <td className="py-2.5 text-[#AAA]">70 cm</td>
                    <td className="py-2.5 text-[#AAA]">50 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#E8E5E0]">M</td>
                    <td className="py-2.5 text-[#AAA]">57 cm</td>
                    <td className="py-2.5 text-[#AAA]">73 cm</td>
                    <td className="py-2.5 text-[#AAA]">53 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#E8E5E0]">L</td>
                    <td className="py-2.5 text-[#AAA]">60 cm</td>
                    <td className="py-2.5 text-[#AAA]">76 cm</td>
                    <td className="py-2.5 text-[#AAA]">56 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#E8E5E0]">XL</td>
                    <td className="py-2.5 text-[#AAA]">63 cm</td>
                    <td className="py-2.5 text-[#AAA]">79 cm</td>
                    <td className="py-2.5 text-[#AAA]">59 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#141414] border border-[#222] text-[11px] text-[#85817D] space-y-1">
              <div className="text-[#E8E5E0] font-medium uppercase font-mono text-[10px]">
                ENTRETIEN D'ATELIER
              </div>
              <p>Lavage à froid sur l'envers (30°C max). Pas de sèche-linge. Repassage doux sur l'envers de la sérigraphie.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
