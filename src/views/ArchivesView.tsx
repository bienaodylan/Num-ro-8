import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const ArchivesView: React.FC = () => {
  const { navigateTo, products, formatPrice } = useStore();

  const soldWorks = products.filter(p => p.status === 'vendu');

  const historicalMoments = [
    {
      year: '2025',
      title: 'CAPSULE 01 — OMBRES D\'ABIDJAN',
      category: 'Campagne Éditoriale',
      image: '/assets/n8/editorial_campaign_street.png',
      desc: 'Première série d\'explorations textiles associant le portage d\'œuvres peintes aux manteaux d\'architecte. Série de 8 pièces exclusives.'
    },
    {
      year: '2025',
      title: 'UNTITLED 04 — APPARITION ATELIER',
      category: 'Œuvre Monumentale',
      image: '/assets/n8/art_hero_studio.png',
      desc: 'Huile et pigments minéraux (140 × 110 cm). Acquis par un collectionneur privé lors de la présentation d\'atelier de mars 2025.'
    },
    {
      year: '2024',
      title: 'GENÈSE DE LA FORME SCULPTURALE N°8',
      category: 'Recherche Plastique',
      image: '/assets/n8/logo_3d_chrome.png',
      desc: 'Fonte et modélisation du chiffre 8 et de la lettre gothique. Recherche sur l\'impact de la lumière rasante sur l\'argent brossé.'
    }
  ];

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 border-b border-[#1A1A1A]">
        <div className="max-w-3xl space-y-4">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
            MÉMOIRE & HISTORIQUE
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial text-[#E8E5E0] font-normal leading-tight">
            Les archives
          </h1>
          <p className="text-sm text-[#85817D] font-sans leading-relaxed">
            Les archives constituent la mémoire vivante de N°8 : toiles entrées dans des collections privées, premières esquisses d'atelier et jalons photographiques. Une trace indélébile de notre évolution plastique.
          </p>
        </div>
      </section>

      {/* Retrospective Timeline Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-16">
          {historicalMoments.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 border-b border-[#161616]"
            >
              <div className="lg:col-span-5 aspect-[4/3] bg-[#121212] overflow-hidden border border-[#202020]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-105"
                  loading="lazy"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-[#777]">
                  <span className="text-[#E8E5E0] font-bold">{item.year}</span>
                  <span>·</span>
                  <span>{item.category}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-editorial text-[#E8E5E0] tracking-wide">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#85817D] leading-relaxed font-sans max-w-xl">
                  {item.desc}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-mono text-[#555] uppercase tracking-wider">
                    Archive certifiée · Atelier N°8
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sold Works Collection */}
      {soldWorks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="pb-8 border-b border-[#1A1A1A]">
            <h2 className="text-xl sm:text-2xl font-serif-editorial text-[#E8E5E0]">
              Toiles & pièces acquises
            </h2>
            <p className="text-xs text-[#85817D] mt-1">
              Œuvres désormais conservées au sein de collections institutionnelles ou privées.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {soldWorks.map(w => (
              <div
                key={w.id}
                onClick={() => navigateTo('product-detail', w.slug)}
                className="bg-[#0D0D0D] border border-[#181818] p-4 space-y-3 cursor-pointer group"
              >
                <div className="relative aspect-[4/5] bg-[#121212] overflow-hidden">
                  <img
                    src={w.primaryImage}
                    alt={w.title}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/90 border border-white/30 px-3 py-1">
                      COLLECTION PRIVÉE
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-[#E8E5E0]">
                    {w.title}
                  </h4>
                  <p className="text-[11px] text-[#85817D]">{w.dimensions} · {w.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
