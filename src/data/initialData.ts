import { Product, SiteSettings, DeliveryOption } from '../types';

export const INITIAL_DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'abidjan_express',
    title: 'Abidjan — Coursier Privé d\'Atelier',
    delay: '24h à 48h ouvrées',
    price: 3500,
    description: 'Remise en main propre sécurisée et soignée dans le grand Abidjan.'
  },
  {
    id: 'ci_national',
    title: 'Côte d\'Ivoire — Expédition Sécurisée',
    delay: '2 à 4 jours ouvrés',
    price: 8000,
    description: 'Envoi avec assurance et suivi postal ou transporteur agréé vers l\'intérieur.'
  },
  {
    id: 'intl_dhl',
    title: 'International — DHL Express Prioritaire',
    delay: '3 à 6 jours ouvrés',
    price: 32000,
    description: 'Livraison mondiale assurée avec certificat de dédouanement et suivi en temps réel.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 01 — GALERIE (Les toiles)
  {
    id: 'art-01',
    slug: 'untitled-01-visage-nocturne',
    title: 'UNTITLED 01',
    subtitle: 'Huile sur toile — 120 × 100 cm',
    category: 'galerie',
    price: 4500000,
    primaryImage: '/assets/n8/art_untitled_01.png',
    images: [
      '/assets/n8/art_untitled_01.png',
      '/assets/n8/art_hero_studio.png',
      '/assets/n8/explorer_toiles.png'
    ],
    description: 'Portait fragmenté aux contrastes abyssaux. Peint avec des couches successives d\'huile noire, de cendre volcanique et de pigments purs sur lin brut. L\'œuvre explore la tension entre l\'effacement et la permanence dans l\'intimité du regard.',
    technique: 'Huile et pigments naturels sur lin belge',
    materials: 'Châssis bois massif sur mesure, pigments de carbone, vernis satiné d\'atelier',
    dimensions: '120 × 100 cm',
    year: 2025,
    status: 'disponible',
    isUniquePiece: true,
    stock: 1,
    featured: true,
    collectionName: 'Fragments I',
    executionDelay: 'Prêt pour expédition immédiate sous caisse bois sécurisée'
  },
  {
    id: 'art-02',
    slug: 'untitled-02-silence-interieur',
    title: 'UNTITLED 02',
    subtitle: 'Huile sur toile — 100 × 80 cm',
    category: 'galerie',
    price: 3200000,
    primaryImage: '/assets/n8/art_untitled_02.png',
    images: [
      '/assets/n8/art_untitled_02.png',
      '/assets/n8/art_hero_studio.png'
    ],
    description: 'Étude d\'ombre et de volume où la matière picturale sculptée au couteau capture la lumière latérale. Une présence brute qui invite à la contemplation lente.',
    technique: 'Technique mixte au couteau et lavis d\'encre',
    materials: 'Toile de lin lourd tendue main, pigments sombres, cire d\'abeille',
    dimensions: '100 × 80 cm',
    year: 2025,
    status: 'disponible',
    isUniquePiece: true,
    stock: 1,
    featured: true,
    collectionName: 'Fragments I',
    executionDelay: 'Prêt pour expédition sous 48h'
  },
  {
    id: 'art-03',
    slug: 'untitled-03-monolithe-fracture',
    title: 'UNTITLED 03',
    subtitle: 'Huile sur toile — 150 × 120 cm',
    category: 'galerie',
    price: 5800000,
    primaryImage: '/assets/n8/art_untitled_03.png',
    images: [
      '/assets/n8/art_untitled_03.png',
      '/assets/n8/explorer_toiles.png'
    ],
    description: 'Grand format monumental. Une composition expressionniste puissante aux empâtements vigoureux. Pièce maîtresse de la première exposition de l\'atelier N°8 à Abidjan.',
    technique: 'Huile grand format, empâtements et fusain fixé',
    materials: 'Toile de coton armé 600g/m², châssis renforcé à clés',
    dimensions: '150 × 120 cm',
    year: 2025,
    status: 'disponible',
    isUniquePiece: true,
    stock: 1,
    featured: true,
    collectionName: 'Exposition Inaugurale',
    executionDelay: 'Emballage caisse d\'art agréée IATA'
  },
  {
    id: 'art-04',
    slug: 'untitled-04-apparition-atelier',
    title: 'UNTITLED 04 — APPARITION',
    subtitle: 'Huile sur toile — 140 × 110 cm',
    category: 'galerie',
    price: 4900000,
    primaryImage: '/assets/n8/art_hero_studio.png',
    images: [
      '/assets/n8/art_hero_studio.png',
      '/assets/n8/art_untitled_01.png'
    ],
    description: 'Une présence spectrale émergeant de l\'obscurité de l\'atelier. La lumière rasante révèle la texture organique de la matière travaillée à l\'état brut.',
    technique: 'Huile, médium d\'ambre et pigments minéraux',
    materials: 'Toile de lin montée à l\'ancienne',
    dimensions: '140 × 110 cm',
    year: 2024,
    status: 'vendu',
    isUniquePiece: true,
    stock: 0,
    featured: false,
    collectionName: 'Archives Privées',
    executionDelay: 'Collection privée — Non disponible à la vente'
  },

  // 02 — OBJETS (Sacs & Accessoires)
  {
    id: 'obj-01',
    slug: 'tote-bag-n8-signature',
    title: 'TOTE BAG N°8',
    subtitle: 'Toile peinte à la main — Pièce unique',
    category: 'objets',
    price: 120000,
    primaryImage: '/assets/n8/bag_tote_01.png',
    images: [
      '/assets/n8/bag_tote_01.png',
      '/assets/n8/bag_hero_model.png',
      '/assets/n8/explorer_sacs.png'
    ],
    description: 'Sac cabas d\'art réalisé en toile de coton brute épaisse (480g/m²). Chaque exemplaire est peint individuellement à la main dans notre studio d\'Abidjan avec des pigments textiles imperméabilisés et cuits à cœur. Aucun sac n\'est identique.',
    technique: 'Peinture textile artisanale au pinceau et pochoir d\'atelier',
    materials: '100% Coton brut armé, coutures doubles renforcées, anses sangles noires',
    dimensions: '44 × 40 × 12 cm (Porté épaule ou main)',
    year: 2025,
    status: 'disponible',
    isUniquePiece: true,
    stock: 3,
    featured: true,
    collectionName: 'Objets Singuliers',
    executionDelay: 'Expédié sous 24h avec certificat numéroté'
  },
  {
    id: 'obj-02',
    slug: 'tote-bag-figure-atelier',
    title: 'TOTE BAG FIGURE',
    subtitle: 'Toile peinte à la main — Édition limitée',
    category: 'objets',
    price: 120000,
    primaryImage: '/assets/n8/bag_tote_02.png',
    images: [
      '/assets/n8/bag_tote_02.png',
      '/assets/n8/bag_hero_model.png'
    ],
    description: 'Interprétation textile de la silhouette iconique N°8. Le visage expressionniste est esquissé au trait noir et rehauts de blanc sur fond charbon. Pratique et conçu pour durer des décennies.',
    technique: 'Peinture acrylique textile haute résistance et fixateur UV',
    materials: 'Coton biologique dense, poche intérieure zippée',
    dimensions: '42 × 38 × 10 cm',
    year: 2025,
    status: 'disponible',
    isUniquePiece: true,
    stock: 2,
    featured: true,
    collectionName: 'Objets Singuliers',
    executionDelay: 'Expédition sous 48h'
  },
  {
    id: 'obj-03',
    slug: 'sac-cuir-archive-n8',
    title: 'SAC CUIR STRUCTURÉ',
    subtitle: 'Édition limitée — Finitions argent martelé',
    category: 'objets',
    price: 280000,
    primaryImage: '/assets/n8/bag_leather_01.png',
    images: [
      '/assets/n8/bag_leather_01.png',
      '/assets/n8/bag_hero_model.png',
      '/assets/n8/explorer_sacs.png'
    ],
    description: 'Maroquinerie d\'auteur aux lignes sculpturales et fermes. Cuir pleine fleur tanné végétal avec poche frontale d\'architecte et boucle métallique argent brossé ornée du poinçon N°8.',
    technique: 'Maroquinerie sellier d\'art, tranches cirées main',
    materials: 'Cuir de vachette pleine fleur noir profond, bouclerie en laiton massif argenté',
    dimensions: '36 × 32 × 11 cm',
    year: 2025,
    status: 'disponible',
    isUniquePiece: false,
    stock: 4,
    featured: true,
    collectionName: 'Sculptures Portables',
    executionDelay: 'Livré dans son coffret en bois noirci N°8'
  },

  // 03 — COLLECTIONS (Vêtements)
  {
    id: 'app-01',
    slug: 't-shirt-n8-emblem',
    title: 'T-SHIRT N°8',
    subtitle: 'Coton lourd 280g — Sérigraphie artistique',
    category: 'collections',
    price: 90000,
    primaryImage: '/assets/n8/apparel_tee_01.png',
    images: [
      '/assets/n8/apparel_tee_01.png',
      '/assets/n8/apparel_hero_model.png',
      '/assets/n8/explorer_vetements.png'
    ],
    description: 'T-shirt à coupe boxy contemporaine, épaules tombantes et tombé impeccable. Sérigraphie artisanale épaisse au dos et discret poinçon N°8 sur le torse. Pensé comme une toile que l\'on porte au quotidien.',
    technique: 'Sérigraphie manuelle à base d\'encres à l\'eau minérales',
    materials: '100% Coton peigné biologique lourd 280 g/m², col côtelé 2.5 cm renforcé',
    dimensions: 'Coupe oversize structurée (prendre sa taille habituelle)',
    year: 2025,
    status: 'disponible',
    isUniquePiece: false,
    stock: 18,
    availableSizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { S: 3, M: 6, L: 7, XL: 2 },
    featured: true,
    collectionName: 'Collection Permanente 2025',
    executionDelay: 'Expédition sous 24h'
  },
  {
    id: 'app-02',
    slug: 't-shirt-figure-expressionniste',
    title: 'T-SHIRT FIGURE',
    subtitle: 'Coton lourd — Tirage limité d\'artiste',
    category: 'collections',
    price: 90000,
    primaryImage: '/assets/n8/apparel_tee_02.png',
    images: [
      '/assets/n8/apparel_tee_02.png',
      '/assets/n8/apparel_hero_model.png'
    ],
    description: 'Impression en relief d\'une étude au lavis extraite des carnets de l\'atelier. La patine noire et argent vieilli confère à chaque pièce une résonance unique.',
    technique: 'Sérigraphie discharge et pigments argentés satinés',
    materials: '100% Coton peigné lourd 280 g/m²',
    dimensions: 'Coupe ample unisexe',
    year: 2025,
    status: 'disponible',
    isUniquePiece: false,
    stock: 12,
    availableSizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { S: 2, M: 4, L: 4, XL: 2 },
    featured: true,
    collectionName: 'Collection Permanente 2025',
    executionDelay: 'Expédition sous 24h'
  },
  {
    id: 'app-03',
    slug: 't-shirt-archive-nocturne',
    title: 'T-SHIRT ARCHIVE',
    subtitle: 'Coton premium — Édition numérotée',
    category: 'collections',
    price: 90000,
    primaryImage: '/assets/n8/apparel_tee_03.png',
    images: [
      '/assets/n8/apparel_tee_03.png',
      '/assets/n8/explorer_vetements.png',
      '/assets/n8/editorial_campaign_street.png'
    ],
    description: 'Une pièce graphique expérimentale rendant hommage aux premières recherches plastiques de la maison N°8. Les traces de texture et d\'empreinte rappellent le travail de la toile.',
    technique: 'Impression artisanale directe sur textile prélavé',
    materials: 'Coton lourd prérétréci 280 g/m², étiquette tissée argentée',
    dimensions: 'Coupe droite ample',
    year: 2025,
    status: 'disponible',
    isUniquePiece: false,
    stock: 14,
    availableSizes: ['S', 'M', 'L', 'XL'],
    stockPerSize: { S: 3, M: 5, L: 4, XL: 2 },
    featured: true,
    collectionName: 'Édition Numérotée',
    executionDelay: 'Expédition sous 24h'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'N°8',
  tagline: 'Art, objets et vêtements. Un univers à part.',
  heroHeadline: 'EXPLORER L\'UNIVERS',
  heroSubheadline: 'Des toiles, des objets, des vêtements. Une même vision : transformer l\'art en langage.',
  editorialVision: 'N°8 ne conçoit pas la mode et l\'art contemporain comme deux sphères séparées. Chaque toile est une recherche d\'absolu, chaque sac un fragment sculptural nomade, et chaque vêtement une surface vivante en dialogue avec le monde.',
  artistStatement: 'Née à Abidjan avec une résonance universelle, la maison N°8 développe un langage plastique rigoureux où le noir n\'est pas une absence, mais une matière vivante, dense et vibrante. Entre peintures d\'atelier monumentales et objets façonnés à la main, nous refusons la production industrielle anonyme au profit de l\'intensité et de la rareté.',
  atelierAddress: 'Atelier N°8 — Rue des Créateurs, Cocody Ambassades, Abidjan, Côte d\'Ivoire',
  contactEmail: 'contact@numero-8.art',
  contactPhone: '+225 07 00 88 88 00',
  instagram: '@numero8.atelier',
  worldwideShipping: true,
  currency: 'XOF',
  deliveryOptions: INITIAL_DELIVERY_OPTIONS
};
