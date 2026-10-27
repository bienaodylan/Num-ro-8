import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigateTo, products, formatPrice, addToCart } = useStore();

  const artworks = products.filter(p => p.category === 'galerie').slice(0, 3);
  const objects = products.filter(p => p.category === 'objets').slice(0, 3);
  const apparel = products.filter(p => p.category === 'collections').slice(0, 3);

  const pillars = [
    {
      num: '01',
      tag: 'GALERIE',
      title: 'Les toiles',
      desc: 'Œuvres originales et pièces uniques.',
      image: '/assets/n8/explorer_toiles.png',
      cta: 'EXPLORER LA GALERIE',
      view: 'galerie' as const
    },
    {
      num: '02',
      tag: 'OBJETS',
      title: 'Sacs & accessoires',
      desc: 'Des objets singuliers, dessinés pour sortir de l\'ordinaire.',
      image: '/assets/n8/explorer_sacs.png',
      cta: 'EXPLORER LES OBJETS',
      view: 'objets' as const
    },
    {
      num: '03',
      tag: 'COLLECTIONS',
      title: 'Vêtements',
      desc: 'Des créations à porter comme des œuvres.',
      image: '/assets/n8/explorer_vetements.png',
      cta: 'DÉCOUVRIR LES COLLECTIONS',
      view: 'collections' as const
    }
  ];

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] space-y-24 sm:space-y-32 pb-24">
      
      {/* 1. HERO SECTION: EXPLORER L'UNIVERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        
        {/* Editorial Top Headline Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 items-baseline pb-10 sm:pb-14 border-b border-[#1A1A1A]">
          <div className="md:col-span-7">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-editorial tracking-tight text-[#E8E5E0] font-normal leading-[1.05] text-balance">
              EXPLORER <br />
              L'UNIVERS
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="text-xs sm:text-sm text-[#85817D] leading-relaxed font-sans max-w-md">
              Des toiles, des objets, des vêtements. Une même vision : transformer l'art en langage.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#555] uppercase mt-3">
              <span>N°8</span>
              <span>·</span>
              <span>Édition Initiale</span>
              <span>·</span>
              <span>Abidjan</span>
            </div>
          </div>
        </div>

        {/* 3 Dominant Photographic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-10">
          {pillars.map(pillar => (
            <div
              key={pillar.num}
              onClick={() => navigateTo(pillar.view)}
              className="group cursor-pointer flex flex-col justify-between bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#333333] transition-all duration-500 overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141414]">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-80" />
                
                {/* Index tag */}
                <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#A7A7A7] uppercase bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                  {pillar.num} — {pillar.tag}
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif-editorial text-[#E8E5E0] tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#85817D] font-sans mt-1.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181818] flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-[#C7C7C7] group-hover:text-white transition-colors">
                  <span>{pillar.cta}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SECTION 01: LES TOILES (GALERIE PREVIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#1A1A1A]">
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#777] uppercase">
              01 — GALERIE
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-editorial text-[#E8E5E0] mt-1">
              Les toiles
            </h2>
            <p className="text-xs text-[#85817D] mt-1">
              Des toiles originales, pensées comme des fragments d'un monde en tension.
            </p>
          </div>

          <button
            onClick={() => navigateTo('galerie')}
            className="self-start sm:self-end text-xs font-sans uppercase tracking-[0.2em] text-[#C7C7C7] hover:text-white flex items-center gap-2 group cursor-pointer"
          >
            <span>VOIR TOUTE LA GALERIE</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {artworks.map(item => (
            <div
              key={item.id}
              onClick={() => navigateTo('product-detail', item.slug)}
              className="group cursor-pointer bg-[#0D0D0D] border border-[#191919] hover:border-[#333] transition-all duration-300 p-4 space-y-4"
            >
              <div className="relative aspect-[4/5] bg-[#121212] overflow-hidden">
                <img
                  src={item.primaryImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {item.status === 'vendu' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-white/90 border border-white/40 px-3 py-1">
                      Vendu · Collection privée
                    </span>
                  </div>
                )}
                {item.isUniquePiece && item.status !== 'vendu' && (
                  <div className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-[#E8E5E0] bg-black/70 px-2 py-0.5 border border-[#333]">
                    PIÈCE UNIQUE
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-medium tracking-wide uppercase text-[#E8E5E0]">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono tabular-nums text-[#C7C7C7]">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-[11px] text-[#85817D] truncate">
                  {item.subtitle}
                </p>
                <div className="text-[10px] text-[#666] font-mono pt-1">
                  {item.dimensions} · {item.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SECTION 02: OBJETS (SACS & ACCESSOIRES PREVIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#1A1A1A]">
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#777] uppercase">
              02 — OBJETS
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-editorial text-[#E8E5E0] mt-1">
              Sacs & accessoires
            </h2>
            <p className="text-xs text-[#85817D] mt-1">
              Des pièces uniques, dessinées à la main, entre art et utilité.
            </p>
          </div>

          <button
            onClick={() => navigateTo('objets')}
            className="self-start sm:self-end text-xs font-sans uppercase tracking-[0.2em] text-[#C7C7C7] hover:text-white flex items-center gap-2 group cursor-pointer"
          >
            <span>VOIR TOUS LES OBJETS</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Objects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {objects.map(item => (
            <div
              key={item.id}
              onClick={() => navigateTo('product-detail', item.slug)}
              className="group cursor-pointer bg-[#0D0D0D] border border-[#191919] hover:border-[#333] transition-all duration-300 p-4 space-y-4"
            >
              <div className="relative aspect-square bg-[#121212] overflow-hidden">
                <img
                  src={item.primaryImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-[#E8E5E0] bg-black/70 px-2 py-0.5 border border-[#333]">
                  {item.isUniquePiece ? 'PIÈCE UNIQUE' : 'ÉDITION LIMITÉE'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-medium tracking-wide uppercase text-[#E8E5E0]">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono tabular-nums text-[#C7C7C7]">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-[11px] text-[#85817D] truncate">
                  {item.subtitle}
                </p>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-[#666] font-mono">
                    Stock : {item.stock} dispo.
                  </span>
                  <span className="text-[11px] text-[#C7C7C7] group-hover:underline">
                    Détails →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECTION 03: VÊTEMENTS (COLLECTIONS PREVIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#1A1A1A]">
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#777] uppercase">
              03 — COLLECTIONS
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-editorial text-[#E8E5E0] mt-1">
              Vêtements
            </h2>
            <p className="text-xs text-[#85817D] mt-1">
              Des t-shirts pensés comme des toiles portables.
            </p>
          </div>

          <button
            onClick={() => navigateTo('collections')}
            className="self-start sm:self-end text-xs font-sans uppercase tracking-[0.2em] text-[#C7C7C7] hover:text-white flex items-center gap-2 group cursor-pointer"
          >
            <span>VOIR TOUTE LA COLLECTION</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {apparel.map(item => (
            <div
              key={item.id}
              onClick={() => navigateTo('product-detail', item.slug)}
              className="group cursor-pointer bg-[#0D0D0D] border border-[#191919] hover:border-[#333] transition-all duration-300 p-4 space-y-4"
            >
              <div className="relative aspect-square bg-[#121212] overflow-hidden">
                <img
                  src={item.primaryImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {item.availableSizes?.map(size => (
                    <span
                      key={size}
                      className="text-[9px] font-mono px-1.5 py-0.5 bg-black/80 border border-[#333] text-[#AAA]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-medium tracking-wide uppercase text-[#E8E5E0]">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono tabular-nums text-[#C7C7C7]">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-[11px] text-[#85817D] truncate">
                  {item.subtitle}
                </p>
                <div className="pt-2 flex justify-between items-center text-[10px] text-[#666] font-mono">
                  <span>Coton biologique 280g</span>
                  <span className="text-[#C7C7C7] group-hover:underline">
                    Choisir sa taille →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL MANIFESTO: N°8 PLUS QU'UNE MARQUE, UNE VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="relative bg-[#0B0B0B] border border-[#1A1A1A] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Editorial Image of Model in dark street */}
          <div className="lg:col-span-5 h-80 sm:h-96 lg:h-full relative overflow-hidden bg-[#101010]">
            <img
              src="/assets/n8/editorial_campaign_street.png"
              alt="Campagne Éditoriale N°8"
              className="w-full h-full object-cover filter contrast-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          </div>

          {/* Statement text */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
                MANIFESTE N°8
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial text-[#E8E5E0] leading-snug">
                « Plus qu'une marque, une vision. L'art comme substance quotidienne. »
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#85817D] font-sans leading-relaxed">
              Basée à Abidjan, N°8 est un laboratoire d'expérimentation visuelle où toiles monumentales, pièces textiles et maroquinerie d'auteur naissent d'un même geste. Nous produisons peu, mais avec une exigence absolue de matière, de tension et de présence.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3 bg-[#E8E5E0] hover:bg-white text-[#080808] font-sans tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
              >
                Découvrir l'Atelier
              </button>
              <button
                onClick={() => navigateTo('archives')}
                className="px-6 py-3 bg-transparent hover:bg-[#1A1A1A] text-[#C7C7C7] hover:text-white border border-[#2A2A2A] font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer"
              >
                Consulter les Archives
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
