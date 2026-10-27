import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ArrowRight, Eye, ShieldCheck, Mail } from 'lucide-react';

export const GalerieView: React.FC = () => {
  const { products, formatPrice, navigateTo } = useStore();
  const [filter, setFilter] = useState<'all' | 'disponible' | 'vendu'>('all');
  const [customInquiryModal, setCustomInquiryModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    dimensions: '150 × 120 cm environ',
    budget: '',
    message: ''
  });

  const artworks = products.filter(p => p.category === 'galerie');

  const filteredArtworks = artworks.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setCustomInquiryModal(false);
      setInquiryForm({ name: '', email: '', phone: '', dimensions: '', budget: '', message: '' });
    }, 2800);
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 border-b border-[#1A1A1A]">
        <div className="max-w-3xl space-y-4">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
            01 — GALERIE CONTEMPORAINE
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial text-[#E8E5E0] font-normal leading-tight">
            Les toiles
          </h1>
          <p className="text-sm text-[#85817D] font-sans leading-relaxed">
            « Chaque œuvre est une trace, une recherche, une manière de donner forme à une idée. » Peintures monumentales et études d'atelier sur lin pur ou toiles armées, livrées sous caisse sécurisée avec certificat d'authenticité signé.
          </p>
        </div>

        {/* Filter Bar & Custom Commission CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-10">
          {/* Functional Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#202020]">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#E8E5E0] text-[#080808] font-medium'
                  : 'text-[#85817D] hover:text-[#E8E5E0]'
              }`}
            >
              Toutes ({artworks.length})
            </button>
            <button
              onClick={() => setFilter('disponible')}
              className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
                filter === 'disponible'
                  ? 'bg-[#E8E5E0] text-[#080808] font-medium'
                  : 'text-[#85817D] hover:text-[#E8E5E0]'
              }`}
            >
              Disponibles ({artworks.filter(a => a.status === 'disponible').length})
            </button>
            <button
              onClick={() => setFilter('vendu')}
              className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer ${
                filter === 'vendu'
                  ? 'bg-[#E8E5E0] text-[#080808] font-medium'
                  : 'text-[#85817D] hover:text-[#E8E5E0]'
              }`}
            >
              Archives / Vendues ({artworks.filter(a => a.status === 'vendu').length})
            </button>
          </div>

          {/* Commission CTA */}
          <button
            onClick={() => setCustomInquiryModal(true)}
            className="text-xs font-sans tracking-[0.15em] uppercase text-[#A7A7A7] hover:text-white transition-colors flex items-center gap-2 border-b border-[#333] pb-1 cursor-pointer"
          >
            <Mail size={13} />
            <span>COMMANDE SUR MESURE</span>
          </button>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredArtworks.map(item => (
            <div
              key={item.id}
              onClick={() => navigateTo('product-detail', item.slug)}
              className="group cursor-pointer bg-[#0D0D0D] border border-[#191919] hover:border-[#383838] transition-all duration-500 flex flex-col justify-between p-5 space-y-5"
            >
              {/* Artwork Image */}
              <div className="relative aspect-[4/5] bg-[#141414] overflow-hidden">
                <img
                  src={item.primaryImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                  loading="lazy"
                />

                {item.status === 'vendu' && (
                  <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs font-mono tracking-widest uppercase text-white/90 border border-white/30 px-3 py-1">
                      COLLECTION PRIVÉE
                    </span>
                    <span className="text-[10px] text-[#999] font-sans mt-2">
                      Acquisition réalisée · Atelier N°8
                    </span>
                  </div>
                )}

                {item.status === 'disponible' && (
                  <div className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-[#E8E5E0] bg-black/75 px-2.5 py-1 border border-[#333]">
                    PIÈCE UNIQUE
                  </div>
                )}

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 p-2 text-white">
                  <Eye size={15} />
                </div>
              </div>

              {/* Artwork Information */}
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

                <div className="pt-3 border-t border-[#171717] flex justify-between items-center text-[11px] text-[#666] font-mono">
                  <span>{item.dimensions}</span>
                  <span>{item.year}</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-[#555] uppercase tracking-wider font-mono">
                    {item.technique.split(',')[0]}
                  </span>
                  <span className="text-xs text-[#C7C7C7] group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Voir l'œuvre</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Trust & Curation note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#85817D]">
          <div className="space-y-2">
            <h4 className="text-[#E8E5E0] uppercase font-mono tracking-widest text-xs">
              01. AUTHENTICITÉ & CERTIFICAT
            </h4>
            <p className="leading-relaxed">
              Toute toile est signée au dos par l'artiste, numérotée dans les registres de l'atelier N°8 et accompagnée d'un certificat d'authenticité infalsifiable.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[#E8E5E0] uppercase font-mono tracking-widest text-xs">
              02. CONDITIONNEMENT D'ART
            </h4>
            <p className="leading-relaxed">
              Emballage en caisse en bois sur mesure, calage amortisseur anti-choc et protection hygrométrique pour un acheminement irréprochable mondial.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[#E8E5E0] uppercase font-mono tracking-widest text-xs">
              03. VISITE PRIVÉE D'ATELIER
            </h4>
            <p className="leading-relaxed">
              Possibilité de découvrir les toiles en personne à l'atelier d'Abidjan sur rendez-vous privé avec l'équipe de conservation.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Commission Modal */}
      {customInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0F0F0F] border border-[#262626] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#E8E5E0]">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#888] uppercase">
                ATELIER N°8 · COMMANDE SUR MESURE
              </span>
              <h3 className="text-xl font-serif-editorial text-[#E8E5E0]">
                Demande de création personnalisée
              </h3>
              <p className="text-xs text-[#85817D]">
                L'artiste étudie les projets de commandes particulières pour des toiles ou résidences privées.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-8 text-center space-y-3 bg-[#141414] border border-[#222]">
                <ShieldCheck size={32} className="mx-auto text-emerald-400" />
                <h4 className="text-sm font-medium uppercase tracking-widest">
                  Demande transmise à l'atelier
                </h4>
                <p className="text-xs text-[#85817D]">
                  Notre équipe de conservation vous recontactera sous 48h ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="Ex: Jean-Marc Kouassi"
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">Téléphone</label>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="+225 07..."
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">Dimensions souhaitées</label>
                    <input
                      type="text"
                      value={inquiryForm.dimensions}
                      onChange={e => setInquiryForm({ ...inquiryForm, dimensions: e.target.value })}
                      placeholder="Ex: 180 × 140 cm"
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Vision ou intentions pour l'œuvre</label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryForm.message}
                    onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder="Espace de destination, intentions de teintes, ambiance recherchée..."
                    className="w-full bg-[#161616] border border-[#2A2A2A] p-3 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCustomInquiryModal(false)}
                    className="px-4 py-2 text-[#888] hover:text-white cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#E8E5E0] text-[#080808] font-medium tracking-widest uppercase hover:bg-white cursor-pointer"
                  >
                    Envoyer à l'Atelier
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
