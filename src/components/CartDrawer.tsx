import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartItemCount,
    formatPrice,
    navigateTo
  } = useStore();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-md bg-[#0C0C0C] border-l border-[#202020] h-full flex flex-col justify-between shadow-2xl text-[#E8E5E0] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm font-sans tracking-[0.2em] uppercase font-medium">PANIER</h2>
            <span className="text-xs text-[#85817D] font-mono">
              ({cartItemCount} {cartItemCount > 1 ? 'articles' : 'article'})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#85817D] hover:text-[#E8E5E0] transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#202020] flex items-center justify-center text-[#85817D]">
                <ShoppingBag size={20} strokeWidth={1.5} />
              </div>
              <p className="text-sm text-[#85817D] max-w-xs font-serif-editorial text-lg italic">
                Votre panier est vide. L'art attend de trouver sa place.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('galerie');
                }}
                className="mt-4 px-6 py-2.5 text-xs font-sans tracking-widest uppercase bg-[#181818] hover:bg-[#252525] text-[#E8E5E0] border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                Explorer la galerie
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-5 border-b border-[#171717] items-start"
                >
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover bg-[#121212] border border-[#222]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-medium uppercase tracking-wider text-[#E8E5E0] truncate">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#666] hover:text-[#CCC] transition-colors p-0.5 cursor-pointer"
                        title="Supprimer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#85817D] mt-0.5 truncate">
                      {item.product.subtitle}
                    </p>

                    {item.selectedSize && (
                      <div className="mt-1 text-[10px] font-mono text-[#AAA]">
                        Taille : <span className="text-[#E8E5E0] font-semibold">{item.selectedSize}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity stepper (or unique piece label) */}
                      {item.product.isUniquePiece ? (
                        <span className="text-[10px] text-[#85817D] font-mono italic">
                          Pièce unique (1 ex.)
                        </span>
                      ) : (
                        <div className="flex items-center border border-[#262626] bg-[#141414]">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 px-2 text-[#85817D] hover:text-[#E8E5E0] transition-colors cursor-pointer"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 text-xs font-mono tabular-nums text-[#E8E5E0]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 px-2 text-[#85817D] hover:text-[#E8E5E0] transition-colors cursor-pointer"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      )}

                      <span className="text-xs font-mono font-medium text-[#E8E5E0] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#1C1C1C] bg-[#0A0A0A] space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#85817D]">
                <span>Sous-total</span>
                <span className="font-mono text-[#E8E5E0] tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#666]">
                <span>Livraison</span>
                <span>Calculée à l'étape suivante</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1A1A1A] flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest font-medium">Total estimé</span>
              <span className="text-base font-mono font-bold text-[#E8E5E0] tabular-nums">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-6 bg-[#E8E5E0] hover:bg-white text-[#080808] font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group shadow-lg"
            >
              <span>COMMANDER</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-center text-[#555] font-mono">
              Expédition soignée depuis l'atelier d'Abidjan · Paiement sécurisé
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
