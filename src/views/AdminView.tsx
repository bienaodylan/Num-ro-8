import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Category, OrderStatus, PaymentStatus } from '../types';
import {
  Shield,
  Package,
  ShoppingBag,
  Sliders,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  LogOut,
  Save,
  DollarSign
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    settings,
    updateSettings,
    formatPrice,
    navigateTo
  } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'kpis' | 'products' | 'orders' | 'settings'>('kpis');

  // Product edit modal state
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    title: '',
    subtitle: '',
    category: 'objets',
    price: 90000,
    primaryImage: '/assets/n8/bag_tote_01.png',
    images: ['/assets/n8/bag_tote_01.png'],
    description: '',
    technique: '',
    materials: '',
    dimensions: '',
    year: 2025,
    status: 'disponible',
    isUniquePiece: false,
    stock: 5,
    availableSizes: ['S', 'M', 'L', 'XL'],
    featured: false
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  // Authentication gate
  if (!isAdminAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginAdmin(passwordInput);
      if (!success) {
        setLoginError(true);
      }
    };

    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#080808]">
        <div className="bg-[#0E0E0E] border border-[#222] max-w-sm w-full p-8 space-y-6 text-[#E8E5E0]">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center mx-auto text-[#AAA]">
              <Shield size={20} />
            </div>
            <h1 className="text-xl font-serif-editorial text-[#E8E5E0]">Espace Atelier & Administration</h1>
            <p className="text-xs text-[#777] font-mono">Accès réservé à l'équipe de conservation N°8</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            {loginError && (
              <div className="p-2.5 bg-red-950/40 border border-red-800 text-red-200 text-[11px] text-center">
                Code d'accès incorrect.
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#888]">Code d'accès atelier</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Entrez le mot de passe"
                className="w-full bg-[#141414] border border-[#262626] px-3.5 py-2.5 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
              />
              <p className="text-[9px] text-[#555] pt-1">
                Mot de passe démo : <code className="text-[#888]">numero8</code> ou <code className="text-[#888]">admin</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E8E5E0] text-[#080808] font-sans text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors cursor-pointer"
            >
              Connexion à l'Atelier
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-[11px] text-[#777] hover:text-[#AAA] font-mono cursor-pointer"
            >
              ← Retour au site public
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate real financial KPIs
  const confirmedSales = orders.filter(o => o.paymentStatus === 'payee');
  const totalRevenue = confirmedSales.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'en_attente' || o.orderStatus === 'en_preparation');
  const soldArtworks = products.filter(p => p.status === 'vendu');
  const availableItems = products.filter(p => p.status === 'disponible');

  // Product modal handlers
  const openNewProductModal = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      slug: `n8-creation-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'objets',
      price: 120000,
      primaryImage: '/assets/n8/bag_tote_01.png',
      images: ['/assets/n8/bag_tote_01.png'],
      description: '',
      technique: 'Technique mixte d\'atelier',
      materials: 'Toile de coton lourd',
      dimensions: '40 × 40 cm',
      year: 2025,
      status: 'disponible',
      isUniquePiece: false,
      stock: 5,
      availableSizes: ['S', 'M', 'L', 'XL'],
      featured: false
    });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.title || !editingProduct.price) return;

    const fullProduct: Product = {
      id: editingProduct.id || `prod-${Date.now()}`,
      slug: editingProduct.slug || editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: editingProduct.title,
      subtitle: editingProduct.subtitle || '',
      category: (editingProduct.category as Category) || 'objets',
      price: Number(editingProduct.price),
      primaryImage: editingProduct.primaryImage || '/assets/n8/bag_tote_01.png',
      images: editingProduct.images || [editingProduct.primaryImage || '/assets/n8/bag_tote_01.png'],
      description: editingProduct.description || '',
      technique: editingProduct.technique || '',
      materials: editingProduct.materials || '',
      dimensions: editingProduct.dimensions || '',
      year: Number(editingProduct.year) || 2025,
      status: editingProduct.status || 'disponible',
      isUniquePiece: Boolean(editingProduct.isUniquePiece),
      stock: Number(editingProduct.stock) || 0,
      availableSizes: editingProduct.category === 'collections' ? ['S', 'M', 'L', 'XL'] : undefined,
      featured: Boolean(editingProduct.featured),
      collectionName: editingProduct.collectionName || 'Collection 2025'
    };

    const exists = products.find(p => p.id === fullProduct.id);
    if (exists) {
      updateProduct(fullProduct);
    } else {
      createProduct(fullProduct);
    }

    setIsEditingProduct(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    alert('Paramètres de la maison N°8 mis à jour.');
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] min-h-screen pb-24">
      
      {/* Admin Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-amber-400" />
            <h1 className="text-lg font-serif-editorial text-[#E8E5E0] font-medium tracking-wide">
              ADMINISTRATION & ATELIER N°8
            </h1>
          </div>
          <p className="text-[11px] font-mono text-[#777] mt-0.5">
            Tableau de bord financier, gestion du catalogue, commandes et atelier
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-3.5 py-1.5 text-xs font-mono text-[#85817D] hover:text-[#E8E5E0] border border-[#242424] hover:border-[#333] transition-colors cursor-pointer"
          >
            Voir la boutique publique
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-red-400 hover:text-red-300 border border-red-950/60 hover:border-red-900 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-2 border-b border-[#1A1A1A] pb-3 text-xs font-mono">
          {[
            { id: 'kpis', label: 'TABLEAU DE BORD', icon: DollarSign },
            { id: 'products', label: `CATALOGUE (${products.length})`, icon: Package },
            { id: 'orders', label: `COMMANDES (${orders.length})`, icon: ShoppingBag },
            { id: 'settings', label: 'PARAMÈTRES ATELIER', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#181818] border-[#E8E5E0] text-[#E8E5E0] font-bold'
                    : 'bg-transparent border-transparent text-[#777] hover:text-[#AAA]'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: KPIs & Dashboard */}
      {activeTab === 'kpis' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0C0C0C] border border-[#1C1C1C] p-5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#777]">Chiffre d'Affaires Encaissé</span>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-400">
                {formatPrice(totalRevenue)}
              </div>
              <p className="text-[10px] text-[#555] font-mono">{confirmedSales.length} ventes confirmées</p>
            </div>

            <div className="bg-[#0C0C0C] border border-[#1C1C1C] p-5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#777]">Commandes en Cours</span>
              <div className="text-xl font-bold font-mono tabular-nums text-[#E8E5E0]">
                {pendingOrders.length}
              </div>
              <p className="text-[10px] text-[#555] font-mono">À préparer ou expédier</p>
            </div>

            <div className="bg-[#0C0C0C] border border-[#1C1C1C] p-5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#777]">Catalogue Actif</span>
              <div className="text-xl font-bold font-mono tabular-nums text-[#E8E5E0]">
                {availableItems.length}
              </div>
              <p className="text-[10px] text-[#555] font-mono">Pièces & toiles en vente</p>
            </div>

            <div className="bg-[#0C0C0C] border border-[#1C1C1C] p-5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#777]">Œuvres Vendues</span>
              <div className="text-xl font-bold font-mono tabular-nums text-[#A0A0A0]">
                {soldArtworks.length}
              </div>
              <p className="text-[10px] text-[#555] font-mono">Passées en archives privées</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#E8E5E0]">
                DERNIÈRES COMMANDES REÇUES
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-[11px] font-mono text-[#888] hover:text-[#E8E5E0]"
              >
                Gérer toutes les commandes →
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-[#666] py-6 text-center">Aucune commande enregistrée.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-mono">
                  <thead>
                    <tr className="border-b border-[#202020] text-[#777]">
                      <th className="py-2.5">Réf.</th>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Client</th>
                      <th className="py-2.5">Articles</th>
                      <th className="py-2.5">Total</th>
                      <th className="py-2.5">Paiement</th>
                      <th className="py-2.5">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#151515]">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id}>
                        <td className="py-3 font-bold text-[#E8E5E0]">{o.reference}</td>
                        <td className="py-3 text-[#777]">
                          {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 text-[#CCC]">{o.customer.fullName}</td>
                        <td className="py-3 text-[#888]">{o.items.map(i => i.title).join(', ')}</td>
                        <td className="py-3 text-[#E8E5E0] tabular-nums font-medium">
                          {formatPrice(o.total)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 text-[10px] ${
                              o.paymentStatus === 'payee'
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                                : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="text-[#AAA] uppercase text-[10px]">
                            {o.orderStatus.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Product Management */}
      {activeTab === 'products' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#E8E5E0]">
                CATALOGUE DES ŒUVRES & PRODUITS
              </h2>
              <p className="text-xs text-[#777] mt-0.5">
                Créer, modifier les prix, dimensions, stocks et statuts de disponibilité
              </p>
            </div>
            <button
              onClick={openNewProductModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#E8E5E0] text-[#080808] font-sans text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>NOUVEAU PRODUIT</span>
            </button>
          </div>

          {/* Product List Table */}
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] overflow-x-auto">
            <table className="w-full text-xs text-left font-mono">
              <thead>
                <tr className="border-b border-[#202020] text-[#777]">
                  <th className="p-3">Visuel</th>
                  <th className="p-3">Titre & Catégorie</th>
                  <th className="p-3">Prix</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#151515]">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-[#121212] transition-colors">
                    <td className="p-3">
                      <img
                        src={p.primaryImage}
                        alt=""
                        className="w-10 h-12 object-cover bg-[#161616] border border-[#262626]"
                      />
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-[#E8E5E0] uppercase">{p.title}</div>
                      <div className="text-[10px] text-[#666]">{p.category.toUpperCase()} · {p.dimensions}</div>
                    </td>
                    <td className="p-3 text-[#E8E5E0] tabular-nums font-medium">
                      {formatPrice(p.price)}
                    </td>
                    <td className="p-3 text-[#AAA] tabular-nums">
                      {p.stock} {p.stock <= 2 && <span className="text-amber-400 text-[10px]"> (Faible)</span>}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          const nextStatus = p.status === 'disponible' ? 'vendu' : 'disponible';
                          updateProduct({ ...p, status: nextStatus, stock: nextStatus === 'vendu' ? 0 : 1 });
                        }}
                        className={`px-2 py-0.5 text-[10px] uppercase cursor-pointer border ${
                          p.status === 'disponible'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="p-3 text-[#888] text-[10px]">
                      {p.isUniquePiece ? 'Pièce Unique' : 'Édition'}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setIsEditingProduct(true);
                        }}
                        className="p-1.5 text-[#AAA] hover:text-white border border-[#262626] cursor-pointer"
                        title="Modifier"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer définitivement ${p.title} ?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-red-400 hover:text-red-300 border border-red-950 cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Order Management */}
      {activeTab === 'orders' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="pb-4 border-b border-[#1A1A1A]">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#E8E5E0]">
              GESTION DU CARNET DE COMMANDES
            </h2>
            <p className="text-xs text-[#777] mt-0.5">
              Suivi des expéditions, vérification des règlements Mobile Money et virements
            </p>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-[#0C0C0C] border border-[#1A1A1A] p-6 space-y-4 text-xs font-mono"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#171717]">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-[#E8E5E0]">{order.reference}</span>
                    <span className="text-[#666]">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#E8E5E0] tabular-nums">
                    {formatPrice(order.total)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#85817D]">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#555] uppercase">CLIENT</div>
                    <div className="text-[#E8E5E0] font-medium">{order.customer.fullName}</div>
                    <div>{order.customer.phone}</div>
                    <div>{order.customer.email}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-[#555] uppercase">LIVRAISON</div>
                    <div className="text-[#E8E5E0]">{order.customer.address}</div>
                    <div>{order.customer.city}, {order.customer.country}</div>
                    <div className="text-[10px] text-[#AAA]">{order.delivery.title}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] text-[#555] uppercase">STATUTS & ACTIONS</div>
                    
                    {/* Payment status dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#666]">Paiement :</span>
                      <select
                        value={order.paymentStatus}
                        onChange={e => updatePaymentStatus(order.id, e.target.value as PaymentStatus)}
                        className="bg-[#161616] border border-[#2A2A2A] text-[#E8E5E0] px-2 py-1 text-[11px] outline-none"
                      >
                        <option value="payee">Payée</option>
                        <option value="en_attente">En attente</option>
                        <option value="echouee">Échouée</option>
                      </select>
                    </div>

                    {/* Order status dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#666]">Livraison :</span>
                      <select
                        value={order.orderStatus}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-[#161616] border border-[#2A2A2A] text-[#E8E5E0] px-2 py-1 text-[11px] outline-none"
                      >
                        <option value="en_attente">En attente</option>
                        <option value="en_preparation">En préparation</option>
                        <option value="expediee">Expédiée</option>
                        <option value="livree">Livrée</option>
                        <option value="annulee">Annulée</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#141414] text-[11px] text-[#666]">
                  Articles : {order.items.map(i => `${i.title} (x${i.quantity}${i.selectedSize ? ` - ${i.selectedSize}` : ''})`).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Settings Management */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="pb-4 border-b border-[#1A1A1A]">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#E8E5E0]">
              CONFIGURATION DE LA MAISON N°8
            </h2>
            <p className="text-xs text-[#777] mt-0.5">
              Modifier les textes éditoriaux, coordonnées d'atelier et grille tarifaire d'expédition
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#888]">Signature Éditoriale (Tagline)</label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full bg-[#121212] border border-[#262626] p-3 text-[#E8E5E0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#888]">Texte du Manifeste Artistique</label>
              <textarea
                rows={3}
                value={settingsForm.artistStatement}
                onChange={e => setSettingsForm({ ...settingsForm, artistStatement: e.target.value })}
                className="w-full bg-[#121212] border border-[#262626] p-3 text-[#E8E5E0] outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#888]">Adresse Atelier Abidjan</label>
                <input
                  type="text"
                  value={settingsForm.atelierAddress}
                  onChange={e => setSettingsForm({ ...settingsForm, atelierAddress: e.target.value })}
                  className="w-full bg-[#121212] border border-[#262626] p-3 text-[#E8E5E0] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#888]">Téléphone officiel</label>
                <input
                  type="text"
                  value={settingsForm.contactPhone}
                  onChange={e => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                  className="w-full bg-[#121212] border border-[#262626] p-3 text-[#E8E5E0] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#E8E5E0] text-[#080808] font-sans text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors cursor-pointer flex items-center gap-2"
            >
              <Save size={14} />
              <span>ENREGISTRER LES MODIFICATIONS</span>
            </button>
          </form>
        </div>
      )}

      {/* Product Edit / Creation Modal */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0F0F0F] border border-[#262626] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#E8E5E0] my-8 max-h-[90vh] overflow-y-auto font-mono text-xs">
            
            <div className="border-b border-[#222] pb-3">
              <h3 className="text-base font-serif-editorial text-[#E8E5E0]">
                {editingProduct.id && products.some(p => p.id === editingProduct.id)
                  ? 'MODIFIER LA PIÈCE'
                  : 'AJOUTER UNE NOUVELLE CRÉATION'}
              </h3>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Titre du produit / œuvre *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    placeholder="Ex: UNTITLED 07"
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Catégorie *</label>
                  <select
                    value={editingProduct.category || 'objets'}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as Category })}
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  >
                    <option value="galerie">Galerie (Les Toiles)</option>
                    <option value="objets">Objets (Sacs & Accessoires)</option>
                    <option value="collections">Collections (Vêtements)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Prix en XOF (CFA) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Stock disponible</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 1}
                    onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Dimensions</label>
                  <input
                    type="text"
                    value={editingProduct.dimensions || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    placeholder="120 × 100 cm"
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#888]">Sous-titre / Spécification rapide</label>
                <input
                  type="text"
                  value={editingProduct.subtitle || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                  placeholder="Huile sur toile — 120 × 100 cm"
                  className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#888]">Description artistique</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Technique</label>
                  <input
                    type="text"
                    value={editingProduct.technique || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, technique: e.target.value })}
                    placeholder="Huile sur lin, pigments purs"
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#888]">Matériaux</label>
                  <input
                    type="text"
                    value={editingProduct.materials || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, materials: e.target.value })}
                    placeholder="Châssis bois massif, lin belge"
                    className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#888]">Chemin de l'image principale</label>
                <input
                  type="text"
                  value={editingProduct.primaryImage || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, primaryImage: e.target.value })}
                  placeholder="/assets/n8/art_untitled_01.png"
                  className="w-full bg-[#161616] border border-[#262626] p-2.5 text-[#E8E5E0] outline-none"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isUniquePiece || false}
                    onChange={e => setEditingProduct({ ...editingProduct, isUniquePiece: e.target.checked })}
                  />
                  <span>Pièce unique d'artiste</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.status === 'vendu'}
                    onChange={e => setEditingProduct({ ...editingProduct, status: e.target.checked ? 'vendu' : 'disponible' })}
                  />
                  <span>Marquer comme vendu / collection privée</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#222]">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-4 py-2 text-[#777] hover:text-white cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E8E5E0] text-[#080808] font-bold uppercase tracking-wider hover:bg-white cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
