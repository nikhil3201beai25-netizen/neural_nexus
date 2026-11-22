import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CropAdvisoryWizard from './components/CropAdvisoryWizard';
import StoreCatalog from './components/StoreCatalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import RegionalInsights from './components/RegionalInsights';
import WeatherAdvisory from './components/WeatherAdvisory';
import SoilCalculator from './components/SoilCalculator';
import KisanHelp from './components/KisanHelp';
import Footer from './components/Footer';
import { CheckCircle2, UserCheck, Sparkles, MapPin, Sprout } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('advisory');
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState('en'); // 'en' or 'hi'

  // Farmer User Authentication state (persisted to localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('agriconnect_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('agriconnect_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('agriconnect_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('agriconnect_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('agriconnect_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.state) {
      const stateToRegion = {
        'Punjab': 'north', 'Haryana': 'north', 'Uttar Pradesh': 'north', 'Rajasthan': 'north',
        'Tamil Nadu': 'south', 'Karnataka': 'south', 'Andhra Pradesh': 'south',
        'Maharashtra': 'west', 'Gujarat': 'west',
        'West Bengal': 'east', 'Bihar': 'east', 'Assam': 'east'
      };
      if (stateToRegion[user.state]) {
        setSelectedRegion(stateToRegion[user.state]);
      }
    }
    showToast(`Welcome back, ${user.name}! Connected to ${user.state} Agri-Grid.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out of Kisan portal');
  };

  // Cart operations
  const handleAddToCart = (product, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(product.id);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: quantity } : i
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });

    showToast(`Added ${product.name} to cart`);
  };

  const handleUpdateQty = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProductForStore = (productKeyword) => {
    setSearchQuery(productKeyword);
    setActiveTab('store');
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-agri-200 selection:text-agri-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        lang={lang}
        setLang={setLang}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        currentUser={currentUser}
        onOpenAuth={() => { setAuthInitialMode('login'); setIsAuthOpen(true); }}
        onLogout={handleLogout}
      />

      {/* Logged-In Farmer Welcome Strip */}
      {currentUser && (
        <div className="bg-gradient-to-r from-emerald-800 via-agri-900 to-emerald-950 text-white text-xs py-2 px-4 border-b border-emerald-700/40">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-extrabold text-emerald-200">
                Namaste, {currentUser.name}!
              </span>
              <span className="text-slate-300">
                ({currentUser.district || currentUser.state} • {currentUser.landHolding} Land • Crops: {currentUser.primaryCrops ? currentUser.primaryCrops.slice(0, 2).join(', ') : 'Wheat, Mustard'})
              </span>
            </div>
            <div className="flex items-center gap-3 text-emerald-300 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Kisan Subsidy & KCC Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <Hero
        onExploreCrops={() => {
          setActiveTab('advisory');
          const el = document.getElementById('crop-advisory-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onShopStore={() => {
          setActiveTab('store');
          const el = document.getElementById('agri-store-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        lang={lang}
      />

      {/* Main Tabbed Views */}
      <main className="flex-1">
        {activeTab === 'advisory' && (
          <CropAdvisoryWizard
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            onSelectProductForStore={handleSelectProductForStore}
            lang={lang}
          />
        )}

        {activeTab === 'store' && (
          <StoreCatalog
            onAddToCart={handleAddToCart}
            onOpenProductModal={(prod) => setModalProduct(prod)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            cartItems={cartItems}
            lang={lang}
          />
        )}

        {activeTab === 'regions' && (
          <RegionalInsights
            onSelectRegion={(reg) => {
              setSelectedRegion(reg);
              setActiveTab('advisory');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            lang={lang}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherAdvisory
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            lang={lang}
          />
        )}

        {activeTab === 'calculator' && (
          <SoilCalculator
            onAddToCart={handleAddToCart}
            lang={lang}
          />
        )}

        {activeTab === 'schemes' && (
          <KisanHelp lang={lang} />
        )}

        {activeTab === 'advisory' && (
          <>
            <StoreCatalog
              onAddToCart={handleAddToCart}
              onOpenProductModal={(prod) => setModalProduct(prod)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              cartItems={cartItems}
              lang={lang}
            />
            <RegionalInsights
              onSelectRegion={(reg) => {
                setSelectedRegion(reg);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              lang={lang}
            />
            <WeatherAdvisory
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              lang={lang}
            />
            <SoilCalculator
              onAddToCart={handleAddToCart}
              lang={lang}
            />
            <KisanHelp lang={lang} />
          </>
        )}
      </main>

      {/* Product Detail Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={handleAddToCart}
          lang={lang}
        />
      )}

      {/* Farmer Login / Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authInitialMode}
        lang={lang}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onSelectRegion={setSelectedRegion}
        lang={lang}
      />
    </div>
  );
}
