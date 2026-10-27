export type Category = 'galerie' | 'objets' | 'collections';

export type ProductStatus = 'disponible' | 'vendu' | 'reserve' | 'commande';

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  price: number; // in XOF
  primaryImage: string;
  images: string[];
  description: string;
  technique: string;
  materials: string;
  dimensions: string;
  year: number;
  status: ProductStatus;
  isUniquePiece: boolean;
  stock: number;
  availableSizes?: string[];
  stockPerSize?: Record<string, number>;
  featured: boolean;
  collectionName?: string;
  executionDelay?: string;
}

export interface CartItem {
  id: string; // unique item id: productId + (size ? '-' + size : '')
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes?: string;
}

export interface DeliveryOption {
  id: string;
  title: string;
  delay: string;
  price: number; // in XOF
  description: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  category: Category;
  unitPrice: number;
  quantity: number;
  selectedSize?: string;
  image: string;
}

export type PaymentMethod = 'mobile_money' | 'card' | 'bank_transfer';
export type PaymentStatus = 'en_attente' | 'payee' | 'echouee';
export type OrderStatus = 'en_attente' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';

export interface Order {
  id: string;
  reference: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  delivery: DeliveryOption;
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentProviderDetails?: {
    network?: 'wave' | 'orange_money' | 'mtn' | 'moov';
    transactionRef?: string;
  };
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  editorialVision: string;
  artistStatement: string;
  atelierAddress: string;
  contactEmail: string;
  contactPhone: string;
  instagram: string;
  worldwideShipping: boolean;
  currency: 'XOF' | 'EUR' | 'USD';
  deliveryOptions: DeliveryOption[];
}
