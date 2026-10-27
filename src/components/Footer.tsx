import React from 'react';
import { useStore, ViewState } from '../context/StoreContext';
import { N8Logo } from './N8Logo';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useStore();

  const handleNav = (v: ViewState) => {
    navigateTo(v);
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-[#141414] text-[#85817D] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand & Manifesto statement */}
          <div className="md:col-span-5 space-y-4">
            <N8Logo variant="footer" onClick={() => handleNav('home')} />
            <p className="text-xs text-[#737373] max-w-sm leading-relaxed font-sans pt-2">
              Maison de création indépendante réunissant l'art contemporain, les objets uniques et la mode avant-gardiste. Pièces d'atelier conçues et réalisées à Abidjan pour le monde entier.
            </p>
            <p className="text-[11px] font-mono text-[#555] tracking-wider pt-2">
              ABIDJAN / WORLDWIDE · EST. 2025
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C7C7C7]">
              EXPLORER
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('galerie')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer"
                >
                  Galerie (Les Toiles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('objets')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer"
                >
                  Sacs & Accessoires
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('collections')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer"
                >
                  Collections Vêtements
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('archives')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer"
                >
                  Archives & Historique
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Maison */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C7C7C7]">
              LA MAISON
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer"
                >
                  À Propos de l'Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer"
                >
                  Démarche Artistique
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-[#E8E5E0] transition-colors cursor-pointer text-[#666]"
                >
                  Accès Atelier (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Private Inquiries */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C7C7C7]">
              ACQUISITIONS & ATELIER
            </h4>
            <div className="text-xs space-y-1.5 text-[#737373]">
              <p>{settings.contactEmail}</p>
              <p>{settings.contactPhone}</p>
              <p className="text-[11px] pt-1">{settings.atelierAddress}</p>
              <div className="pt-2">
                <a
                  href={`https://instagram.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#A0A0A0] hover:text-[#E8E5E0] transition-colors"
                >
                  <span>{settings.instagram}</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom hairline & legal line */}
        <div className="pt-8 border-t border-[#121212] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#555]">
          <p>© {new Date().getFullYear()} N°8 Atelier Indépendant. Tous droits réservés.</p>
          <div className="flex gap-6">
            <span>Devise : XOF / Franc CFA</span>
            <span>Certificat d'authenticité inclus</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
