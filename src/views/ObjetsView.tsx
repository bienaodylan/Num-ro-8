import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';

export const ObjetsView: React.FC = () => {
  const { products, formatPrice, addToCart, navigateTo } = useStore();
  const [filter, setFilter] = useState<'all' | 'unique' | 'edition'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const objects = products.filter(p => p.category === 'objets');

  const filteredObjects = objects.filter(item => {
    if (filter === 'unique') return item.isUniquePiece;
    if (filter === 'edition') return !item.isUniquePiece;
    return true;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const success = addToCart(product, 1);
    if (success) {
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 border-b border-[#1A1A1A]">
        <div className="max-w-3xl space-y-4">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
            02 — OBJETS D'ART & MAROQUINERIE
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial text-[#E8E5E0] font-normal leading-tight">
            Sacs & accessoires
          </h1>
          <p className="text-sm text-[#85817D] font-sans leading-relaxed">
            « Des pièces uniques, dessinées à la main, entre art et utilité. » Chaque cabas est peint artisanalement à l'atelier avec des pigments textiles cuits au four pour une tenue inaltérable. La maroquinerie structurée en cuir pleine fleur incarne l'expression sculpturale nomade.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#202020] mt-10 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#E8E5E0] text-[#080808] font-medium'
                : 'text-[#85817D] hover:text-[#E8E5E0]'
            }`}
          >
            Tous ({objects.length})
          </button>
          <button
            onClick={() => setFilter('unique')}
            className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
              filter === 'unique'
                ? 'bg-[#E8E5E0] text-[#080808] font-medium'
                : 'text-[#85817D] hover:text-[#E8E5E0]'
            }`}
          >
            Pièces uniques peintes ({objects.filter(o => o.isUniquePiece).length})
          </button>
          <button
            onClick={() => setFilter('edition')}
            className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
              filter === 'edition'
                ? 'bg-[#E8E5E0] text-[#080808] font-medium'
                : 'text-[#85817D] hover:text-[#E8E5E0]'
            }`}
          >
            Éditions limitées ({objects.filter(o => !o.isUniquePiece).length})
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredObjects.map(item => (
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
                  {item.isUniquePiece ? 'PIÈCE UNIQUE' : 'ÉDITION LIMITÉE'}
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
              <div className="space-y-3">
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

                <div className="pt-2 text-[11px] text-[#666] font-mono flex justify-between">
                  <span>{item.materials.split(',')[0]}</span>
                  <span>{item.stock > 0 ? `${item.stock} en stock` : 'Rupture'}</span>
                </div>

                <div className="pt-3 border-t border-[#171717] flex items-center justify-between gap-3">
                  <button
                    onClick={e => handleQuickAdd(e, item)}
                    disabled={item.stock <= 0}
                    className={`flex-1 py-2.5 px-4 text-xs font-sans tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      item.stock <= 0
                        ? 'bg-[#181818] text-[#555] cursor-not-allowed border border-[#222]'
                        : addedId === item.id
                        ? 'bg-emerald-950 text-emerald-200 border border-emerald-800'
                        : 'bg-[#181818] hover:bg-[#E8E5E0] text-[#E8E5E0] hover:text-[#080808] border border-[#2A2A2A]'
                    }`}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check size={13} />
                        <span>AJOUTÉ</span>
                      </>
                    ) : item.stock <= 0 ? (
                      <span>INDISPONIBLE</span>
                    ) : (
                      <>
                        <ShoppingBag size={13} />
                        <span>AJOUTER AU PANIER</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigateTo('product-detail', item.slug)}
                    className="p-2.5 text-[#888] hover:text-[#E8E5E0] border border-transparent hover:border-[#2A2A2A] transition-colors"
                    title="Voir les détails complets"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship manifesto quote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="border border-[#1C1C1C] bg-[#0A0A0A] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#666]">
            SAVOIR-FAIRE D'ATELIER
          </span>
          <p className="text-lg sm:text-xl font-serif-editorial text-[#E8E5E0] italic leading-relaxed">
            « Nous ne faisons pas de marchandising. Chaque sac est traité avec la même attention qu'une toile de maître, garantissant une pièce vivante avec sa propre personnalité. »
          </p>
          <p className="text-xs text-[#85817D] font-mono">
            Atelier N°8 — Peinture textile & Maroquinerie d'art
          </p>
        </div>
      </section>

    </div>
  );
};
