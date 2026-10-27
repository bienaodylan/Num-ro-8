import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ArrowRight, Printer, PackageCheck, Shield } from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { activeOrder, navigateTo, formatPrice } = useStore();

  if (!activeOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <p className="text-sm text-[#85817D]">Aucune commande active trouvée.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-[#181818] border border-[#333] text-xs uppercase tracking-widest text-[#E8E5E0] cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-10">
        
        {/* Success Banner */}
        <div className="bg-[#0C0C0C] border border-[#222] p-8 text-center space-y-4 relative overflow-hidden">
          <div className="w-14 h-14 rounded-full border border-emerald-500/40 bg-emerald-950/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 size={28} />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
              ACQUISITION CONFIRMÉE
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-editorial text-[#E8E5E0]">
              Merci pour votre confiance en N°8
            </h1>
            <p className="text-xs text-[#85817D] max-w-md mx-auto">
              Votre commande a été transmise à notre atelier. Chaque pièce fait l'objet d'un contrôle rigoureux avant son emballage.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-4 text-xs font-mono">
            <div className="bg-[#141414] border border-[#262626] px-4 py-2 text-[#E8E5E0]">
              RÉFÉRENCE : <span className="font-bold text-white">{activeOrder.reference}</span>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 sm:p-8 space-y-6 text-xs font-mono">
          
          <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]">
            <h2 className="text-xs uppercase tracking-widest text-[#E8E5E0] font-sans font-medium">
              DÉTAIL DU RÉCÉPISSÉ
            </h2>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-[11px] text-[#888] hover:text-[#E8E5E0] cursor-pointer"
            >
              <Printer size={13} />
              <span>Imprimer</span>
            </button>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#85817D]">
            <div className="space-y-1">
              <span className="text-[10px] text-[#555] uppercase">DESTINATAIRE</span>
              <p className="text-[#E8E5E0] font-medium">{activeOrder.customer.fullName}</p>
              <p>{activeOrder.customer.email}</p>
              <p>{activeOrder.customer.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#555] uppercase">ADRESSE DE LIVRAISON</span>
              <p className="text-[#E8E5E0] font-medium">{activeOrder.customer.address}</p>
              <p>{activeOrder.customer.city}, {activeOrder.customer.country}</p>
              <p className="text-[10px] text-[#AAA] pt-1">{activeOrder.delivery.title}</p>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="pt-4 border-t border-[#171717] space-y-4">
            <span className="text-[10px] text-[#555] uppercase">PIÈCES ACQUISES</span>
            <div className="space-y-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center gap-4 py-2 border-b border-[#141414]">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-14 object-cover bg-[#161616] border border-[#222]"
                    />
                    <div>
                      <div className="text-[#E8E5E0] uppercase font-sans font-medium text-xs">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-[#777]">
                        Quantité : {item.quantity} {item.selectedSize ? `· Taille : ${item.selectedSize}` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[#E8E5E0] tabular-nums">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-[#1A1A1A] space-y-2">
            <div className="flex justify-between text-[#85817D]">
              <span>Sous-total</span>
              <span className="text-[#E8E5E0] tabular-nums">{formatPrice(activeOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#85817D]">
              <span>Frais de livraison ({activeOrder.delivery.delay})</span>
              <span className="text-[#E8E5E0] tabular-nums">{formatPrice(activeOrder.deliveryFee)}</span>
            </div>
            <div className="pt-2 border-t border-[#202020] flex justify-between text-sm font-bold text-[#E8E5E0]">
              <span className="font-sans uppercase">MONTANT TOTAL RÉGLÉ</span>
              <span className="tabular-nums">{formatPrice(activeOrder.total)}</span>
            </div>
          </div>

          {/* Payment & Security stamp */}
          <div className="p-4 bg-[#121212] border border-[#202020] flex items-center justify-between text-[11px] text-[#888]">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-emerald-400" />
              <span>
                Paiement {activeOrder.paymentStatus === 'payee' ? 'Validé' : 'Enregistré'} via{' '}
                {activeOrder.paymentMethod.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#555]">
              {new Date(activeOrder.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs">
          <button
            onClick={() => navigateTo('home')}
            className="px-8 py-3.5 bg-[#E8E5E0] text-[#080808] font-sans uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>RETOURNER À L'UNIVERS N°8</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
