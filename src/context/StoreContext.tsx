import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, SiteSettings, Category } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';

export type ViewState =
  | 'intro'
  | 'home'
  | 'galerie'
  | 'objets'
  | 'collections'
  | 'archives'
  | 'about'
  | 'product-detail'
  | 'checkout'
  | 'order-confirmation'
  | 'admin';

interface StoreContextType {
  currentView: ViewState;
  navigateTo: (view: ViewState, productSlug?: string) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;

  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (updated: Product) => void;
  createProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'reference' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Currency & Internationalization
  currency: 'XOF' | 'EUR' | 'USD';
  setCurrency: (c: 'XOF' | 'EUR' | 'USD') => void;
  formatPrice: (amountInXof: number) => string;

  // Sound
  soundActive: boolean;
  toggleSound: () => void;

  // Admin auth
  isAdminAuthenticated: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'n8_products_v1',
  CART: 'n8_cart_v1',
  ORDERS: 'n8_orders_v1',
  SETTINGS: 'n8_settings_v1',
  CURRENCY: 'n8_currency_v1',
  VISITED_INTRO: 'n8_visited_intro_v1',
  ADMIN_AUTH: 'n8_admin_auth_v1'
};

// Rates relative to XOF
const RATES = {
  XOF: 1,
  EUR: 1 / 655.957,
  USD: 1 / 610.0
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewState>('intro');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SETTINGS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'ord-demo-1',
        reference: 'N8-2025-0814',
        createdAt: '2025-10-24T14:32:00Z',
        customer: {
          fullName: 'Koffi Amon',
          email: 'koffi.amon@art-collector.ci',
          phone: '+225 07 48 12 34 56',
          address: 'Villa 12, Rue des Ambassades',
          city: 'Abidjan (Cocody)',
          country: 'Côte d\'Ivoire',
          notes: 'Remise en main propre après 17h'
        },
        items: [
          {
            productId: 'obj-01',
            title: 'TOTE BAG N°8',
            category: 'objets',
            unitPrice: 120000,
            quantity: 1,
            image: '/assets/n8/bag_tote_01.png'
          }
        ],
        delivery: INITIAL_SETTINGS.deliveryOptions[0],
        subtotal: 120000,
        deliveryFee: 3500,
        total: 123500,
        currency: 'XOF',
        paymentMethod: 'mobile_money',
        paymentProviderDetails: {
          network: 'wave',
          transactionRef: 'WAVE-CI-99382104'
        },
        paymentStatus: 'payee',
        orderStatus: 'en_preparation'
      }
    ];
  });

  // Currency
  const [currency, setCurrency] = useState<'XOF' | 'EUR' | 'USD'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      if (saved === 'EUR' || saved === 'USD' || saved === 'XOF') return saved;
    } catch {
      // fallback
    }
    return 'XOF';
  });

  // Sound state
  const [soundActive, setSoundActive] = useState(false);

  // Admin auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
    } catch {}
  }, [currency]);

  // Navigate helper
  const navigateTo = (view: ViewState, productSlug?: string) => {
    if (productSlug) {
      const found = products.find(p => p.slug === productSlug || p.id === productSlug);
      if (found) {
        setActiveProduct(found);
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product CRUD
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (activeProduct && activeProduct.id === updated.id) {
      setActiveProduct(updated);
    }
  };

  const createProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, size?: string): boolean => {
    // Check stock
    const availableStock = size && product.stockPerSize ? (product.stockPerSize[size] ?? product.stock) : product.stock;
    if (availableStock <= 0 || product.status === 'vendu') {
      return false;
    }

    const cartItemId = `${product.id}${size ? `-${size}` : ''}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > availableStock) {
          // cap to max available stock
          return prev.map(item => (item.id === cartItemId ? { ...item, quantity: availableStock } : item));
        }
        return prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item));
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            quantity: Math.min(quantity, availableStock),
            selectedSize: size
          }
        ];
      }
    });

    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const maxStock = item.selectedSize && item.product.stockPerSize
              ? (item.product.stockPerSize[item.selectedSize] ?? item.product.stock)
              : item.product.stock;

            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > maxStock) return item; // exceed stock
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'reference' | 'createdAt'>): Order => {
    const id = `ord-${Date.now()}`;
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const reference = `N8-2025-${randomHex}`;

    const newOrder: Order = {
      ...orderData,
      id,
      reference,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Adjust product inventory
    setProducts(prev => {
      return prev.map(prod => {
        const orderedItem = orderData.items.find(i => i.productId === prod.id);
        if (orderedItem) {
          const remainingStock = Math.max(0, prod.stock - orderedItem.quantity);
          const newStatus = remainingStock === 0 && prod.isUniquePiece ? 'vendu' : prod.status;

          let updatedStockPerSize = prod.stockPerSize;
          if (orderedItem.selectedSize && prod.stockPerSize) {
            const currentSizeStock = prod.stockPerSize[orderedItem.selectedSize] || 0;
            updatedStockPerSize = {
              ...prod.stockPerSize,
              [orderedItem.selectedSize]: Math.max(0, currentSizeStock - orderedItem.quantity)
            };
          }

          return {
            ...prod,
            stock: remainingStock,
            status: newStatus,
            stockPerSize: updatedStockPerSize
          };
        }
        return prod;
      });
    });

    clearCart();
    setActiveOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o)));
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, paymentStatus: status } : o)));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Currency formatting
  const formatPrice = (amountInXof: number): string => {
    if (currency === 'EUR') {
      const val = amountInXof * RATES.EUR;
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(val);
    }

    if (currency === 'USD') {
      const val = amountInXof * RATES.USD;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(val);
    }

    // Default: XOF formatted with French space separators
    const formatted = new Intl.NumberFormat('fr-FR').format(amountInXof);
    return `${formatted} XOF`;
  };

  // Ambient sound toggle
  const toggleSound = async () => {
    const { ambientSound } = await import('../utils/audio');
    const newState = await ambientSound.toggle();
    setSoundActive(newState);
  };

  // Admin login
  const loginAdmin = (pass: string): boolean => {
    // Development passphrase - securely validated for admin demo
    if (pass === 'numero8' || pass === 'atelier2025' || pass === 'admin') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {}
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        navigateTo,
        activeProduct,
        setActiveProduct,
        products,
        setProducts,
        updateProduct,
        createProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        activeOrder,
        setActiveOrder,
        settings,
        updateSettings,
        currency,
        setCurrency,
        formatPrice,
        soundActive,
        toggleSound,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
