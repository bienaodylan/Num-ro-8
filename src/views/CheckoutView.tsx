import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo, DeliveryOption, PaymentMethod } from '../types';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Lock, PhoneCall } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartTotal,
    formatPrice,
    settings,
    createOrder,
    navigateTo
  } = useStore();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    notes: ''
  });

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(
    settings.deliveryOptions[0]
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile_money');
  const [mobileNetwork, setMobileNetwork] = useState<'wave' | 'orange_money' | 'mtn' | 'moov'>('wave');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <p className="text-sm text-[#85817D]">Votre panier est vide.</p>
        <button
          onClick={() => navigateTo('galerie')}
          className="px-6 py-2.5 bg-[#181818] border border-[#333] text-xs uppercase tracking-widest text-[#E8E5E0] cursor-pointer"
        >
          Découvrir les œuvres
        </button>
      </div>
    );
  }

  const deliveryFee = selectedDelivery.price;
  const grandTotal = cartTotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customer.fullName || !customer.email || !customer.phone || !customer.address || !customer.city) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const orderItems = cart.map(item => ({
          productId: item.productId,
          title: item.product.title,
          category: item.product.category,
          unitPrice: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          image: item.product.primaryImage
        }));

        const newOrder = createOrder({
          customer,
          items: orderItems,
          delivery: selectedDelivery,
          subtotal: cartTotal,
          deliveryFee,
          total: grandTotal,
          currency: 'XOF',
          paymentMethod,
          paymentProviderDetails: {
            network: paymentMethod === 'mobile_money' ? mobileNetwork : undefined,
            transactionRef: paymentMethod === 'mobile_money'
              ? `${mobileNetwork.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`
              : `AUTH-${Math.floor(100000 + Math.random() * 900000)}`
          },
          paymentStatus: paymentMethod === 'bank_transfer' ? 'en_attente' : 'payee',
          orderStatus: 'en_attente'
        });

        setIsSubmitting(false);
        navigateTo('order-confirmation');
      } catch {
        setIsSubmitting(false);
        setErrorMsg('Une erreur est survenue lors de l\'enregistrement de votre commande.');
      }
    }, 1200);
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Top back button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#85817D] hover:text-[#E8E5E0] transition-colors cursor-pointer"
        >
          <ArrowLeft size={13} />
          <span>RETOUR À LA BOUTIQUE</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        <div className="pb-8 border-b border-[#1A1A1A]">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#777] uppercase">
            COMMANDE N°8 · PAIEMENT SÉCURISÉ
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif-editorial text-[#E8E5E0] font-normal mt-1">
            Finaliser votre acquisition
          </h1>
        </div>

        {errorMsg && (
          <div className="mt-6 p-4 bg-red-950/40 border border-red-800 text-xs text-red-200 flex items-center gap-3">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Coordonnées Client */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-[#E8E5E0] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#AAA] flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>COORDONNÉES PERSONNELLES</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={e => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="Ex: Amara Touré"
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Adresse e-mail *</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="amara@domaine.com"
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">
                    Téléphone (Mobile Money & Livreur) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+225 07 00 00 00 00"
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Adresse de Livraison */}
            <div className="space-y-4 pt-4 border-t border-[#171717]">
              <h3 className="text-xs font-mono tracking-widest text-[#E8E5E0] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#AAA] flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>DESTINATION & LIVRAISON</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Adresse exacte / Rue / Résidence *</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={e => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Rue des Créateurs, Immeuble Horizon..."
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Ville & Commune *</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="Abidjan (Cocody / Plateau / Zone 4)"
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Pays *</label>
                  <input
                    type="text"
                    required
                    value={customer.country}
                    onChange={e => setCustomer({ ...customer, country: e.target.value })}
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Instructions de livraison (facultatif)</label>
                  <input
                    type="text"
                    value={customer.notes}
                    onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="Code portail, repère visuel, créneau privilégié..."
                    className="w-full bg-[#121212] border border-[#242424] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  />
                </div>
              </div>

              {/* Delivery method selector */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] uppercase font-mono text-[#888]">Option d'expédition</label>
                <div className="space-y-2">
                  {settings.deliveryOptions.map(opt => (
                    <label
                      key={opt.id}
                      className={`flex items-start justify-between p-3.5 border transition-all cursor-pointer ${
                        selectedDelivery.id === opt.id
                          ? 'bg-[#151515] border-[#E8E5E0]'
                          : 'bg-[#0E0E0E] border-[#202020] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="delivery_option"
                          checked={selectedDelivery.id === opt.id}
                          onChange={() => setSelectedDelivery(opt)}
                          className="mt-1 text-white cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-medium text-[#E8E5E0]">{opt.title}</div>
                          <div className="text-[11px] text-[#777] mt-0.5">{opt.description}</div>
                          <div className="text-[10px] font-mono text-[#AAA] mt-1">Délai : {opt.delay}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#E8E5E0] tabular-nums whitespace-nowrap ml-4">
                        {formatPrice(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Moyen de Paiement */}
            <div className="space-y-4 pt-4 border-t border-[#171717]">
              <h3 className="text-xs font-mono tracking-widest text-[#E8E5E0] uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#AAA] flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>MODE DE PAIEMENT</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Mobile Money */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile_money')}
                  className={`p-3.5 text-left border transition-all cursor-pointer ${
                    paymentMethod === 'mobile_money'
                      ? 'bg-[#151515] border-[#E8E5E0]'
                      : 'bg-[#0E0E0E] border-[#222] hover:border-[#333]'
                  }`}
                >
                  <div className="text-xs font-medium text-[#E8E5E0]">Mobile Money</div>
                  <div className="text-[10px] text-[#85817D] mt-1 font-mono">Wave · Orange · MTN · Moov</div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 text-left border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#151515] border-[#E8E5E0]'
                      : 'bg-[#0E0E0E] border-[#222] hover:border-[#333]'
                  }`}
                >
                  <div className="text-xs font-medium text-[#E8E5E0]">Carte Bancaire</div>
                  <div className="text-[10px] text-[#85817D] mt-1 font-mono">Visa · Mastercard</div>
                </button>

                {/* Bank Wire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3.5 text-left border transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-[#151515] border-[#E8E5E0]'
                      : 'bg-[#0E0E0E] border-[#222] hover:border-[#333]'
                  }`}
                >
                  <div className="text-xs font-medium text-[#E8E5E0]">Virement d'Atelier</div>
                  <div className="text-[10px] text-[#85817D] mt-1 font-mono">Grandes œuvres</div>
                </button>
              </div>

              {/* Sub-options for Mobile Money */}
              {paymentMethod === 'mobile_money' && (
                <div className="p-4 bg-[#121212] border border-[#222] space-y-3">
                  <div className="text-[11px] font-mono text-[#AAA]">
                    Sélectionnez votre opérateur :
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    {[
                      { id: 'wave', label: 'Wave' },
                      { id: 'orange_money', label: 'Orange Money' },
                      { id: 'mtn', label: 'MTN MoMo' },
                      { id: 'moov', label: 'Moov Money' }
                    ].map(net => (
                      <button
                        type="button"
                        key={net.id}
                        onClick={() => setMobileNetwork(net.id as any)}
                        className={`py-2 px-3 text-center border cursor-pointer transition-colors ${
                          mobileNetwork === net.id
                            ? 'bg-[#E8E5E0] text-[#080808] font-bold border-[#E8E5E0]'
                            : 'bg-[#161616] text-[#888] border-[#2A2A2A] hover:text-white'
                        }`}
                      >
                        {net.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#777] font-mono leading-relaxed pt-1">
                    Un prompt de paiement sécurisé vous sera envoyé sur votre numéro ({customer.phone || 'fourni ci-dessus'}). Le reçu officiel est généré instantanément.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#121212] border border-[#222] text-xs text-[#85817D] space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-[#E8E5E0]">
                    <Lock size={14} />
                    <span>Passerelle bancaire 3D-Secure 256-bit</span>
                  </div>
                  <p className="text-[11px] text-[#777]">
                    Les cartes bancaires locales et internationales sont prises en charge. Vos données bancaires ne transitent jamais sur nos serveurs.
                  </p>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 bg-[#121212] border border-[#222] text-xs text-[#85817D] space-y-2 font-mono">
                  <div className="text-[#E8E5E0] font-medium">RIB de la Maison N°8 (Société Générale CI) :</div>
                  <p className="text-[11px] text-[#AAA]">
                    IBAN : CI09 CI00 8011 2000 8888 8888 88 · SWIFT : SGCICIAJ
                  </p>
                  <p className="text-[10px] text-[#666]">
                    Les toiles et pièces sont réservées pendant 5 jours ouvrés en attente de la réception du virement.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Validation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0C0C0C] border border-[#1F1F1F] p-6 space-y-6 sticky top-28">
              
              <h3 className="text-xs font-mono tracking-widest text-[#E8E5E0] uppercase border-b border-[#1A1A1A] pb-3">
                RÉCAPITULATIF DE LA COMMANDE
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 text-xs items-center">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.title}
                      className="w-14 h-16 object-cover bg-[#141414] border border-[#222]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium uppercase tracking-wider text-[#E8E5E0] truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[10px] text-[#777]">
                        Qté : {item.quantity} {item.selectedSize ? `· Taille ${item.selectedSize}` : ''}
                      </p>
                      <p className="text-[11px] font-mono text-[#AAA] tabular-nums mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-[#1A1A1A] pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#85817D]">
                  <span>Sous-total articles</span>
                  <span className="text-[#E8E5E0] tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#85817D]">
                  <span>Frais d'expédition</span>
                  <span className="text-[#E8E5E0] tabular-nums">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-[#85817D] text-[11px]">
                  <span>Assurance d'art & emballage</span>
                  <span className="text-emerald-400">Offert</span>
                </div>
                <div className="border-t border-[#1C1C1C] pt-3 flex justify-between items-baseline text-sm">
                  <span className="uppercase text-[#E8E5E0] font-sans font-medium">TOTAL À PAYER</span>
                  <span className="text-lg font-bold text-[#E8E5E0] tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Confirmation Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E8E5E0] hover:bg-white text-[#080808] font-sans text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>VALIDATION EN COURS...</span>
                ) : (
                  <span>CONFIRMER L'ACQUISITION · {formatPrice(grandTotal)}</span>
                )}
              </button>

              <div className="text-[10px] text-center text-[#555] font-mono space-y-1">
                <p>Numéro de commande et récépissé générés dès confirmation.</p>
                <p>Atelier N°8 — Abidjan / Worldwide</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
