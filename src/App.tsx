import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { IntroView } from './views/IntroView';
import { HomeView } from './views/HomeView';
import { GalerieView } from './views/GalerieView';
import { ObjetsView } from './views/ObjetsView';
import { CollectionsView } from './views/CollectionsView';
import { ArchivesView } from './views/ArchivesView';
import { AboutView } from './views/AboutView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { AdminView } from './views/AdminView';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  if (currentView === 'intro') {
    return <IntroView />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080808] text-[#E8E5E0] selection:bg-[#E8E5E0] selection:text-[#080808]">
      <Header />
      
      <main className="flex-1 w-full">
        {currentView === 'home' && <HomeView />}
        {currentView === 'galerie' && <GalerieView />}
        {currentView === 'objets' && <ObjetsView />}
        {currentView === 'collections' && <CollectionsView />}
        {currentView === 'archives' && <ArchivesView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
