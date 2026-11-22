import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  PhoneCall, 
  Menu, 
  X, 
  Search, 
  CloudSun, 
  Calculator, 
  MapPin, 
  Compass,
  Sparkles,
  Languages,
  User,
  LogOut,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  setIsCartOpen, 
  searchQuery, 
  setSearchQuery,
  lang,
  setLang,
  selectedRegion,
  setSelectedRegion,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'advisory', label: lang === 'hi' ? 'फसल सलाहकार' : 'Crop Advisory', icon: Compass },
    { id: 'store', label: lang === 'hi' ? 'कृषि स्टोर' : 'Agri-Store', icon: Sprout },
    { id: 'regions', label: lang === 'hi' ? 'क्षेत्रीय विवरण' : 'Regional Zones', icon: MapPin },
    { id: 'weather', label: lang === 'hi' ? 'मौसम व सलाह' : 'Weather & Alerts', icon: CloudSun },
    { id: 'calculator', label: lang === 'hi' ? 'खाद कैलकुलेटर' : 'Fertilizer Calc', icon: Calculator },
    { id: 'schemes', label: lang === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes', icon: Sparkles },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Notification & Helpline Bar */}
      <div className="bg-agri-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-medium text-emerald-200">
              {lang === 'hi' 
                ? '🌾 रबी और ग्रीष्मकालीन फसल बुवाई सलाह 2026 सक्रिय है' 
                : '🌾 2026 Rabi & Zaid Crop Climate Advisory is Active'}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-200">
              {lang === 'hi' ? 'अखिल भारतीय डिलीवरी' : 'Pan-India Village Delivery & Kisan Subsidy Support'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="tel:18001801551" 
              className="flex items-center gap-1.5 hover:text-emerald-300 font-semibold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'hi' ? 'किसान कॉल सेंटर: 1800-180-1551' : 'Toll-Free Helpline: 1800-180-1551'}</span>
            </a>

            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-xs transition"
              title="Toggle English / हिंदी"
            >
              <Languages className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-bold">{lang === 'en' ? 'हिंदी में बदलें' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('advisory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-agri-700 to-agri-500 flex items-center justify-center text-white shadow-md shadow-agri-600/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  Agri<span className="text-agri-600">Connect</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  India
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'hi' ? 'भारतीय किसान का डिजिटल साथी' : 'Smart Climate Crops & Agri-Store'}
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={lang === 'hi' ? "बीज, खाद, स्प्रेयर या फसल खोजें..." : "Search certified seeds, fertilizers, sprayers..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'store') setActiveTab('store');
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm rounded-xl border border-slate-200 focus:border-agri-500 focus:outline-none focus:ring-2 focus:ring-agri-500/20 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Quick Region Selector Pill */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
            <span className="px-2 text-slate-400 font-normal">Zone:</span>
            {[
              { id: 'north', label: 'North' },
              { id: 'south', label: 'South' },
              { id: 'west', label: 'West' },
              { id: 'east', label: 'East' }
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => {
                  setSelectedRegion(reg.id);
                  setActiveTab('advisory');
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedRegion === reg.id 
                    ? 'bg-agri-600 text-white shadow-sm' 
                    : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Actions: Farmer Auth, Cart & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            
            {/* Farmer Authentication Button or Profile Pill */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                    {currentUser.name ? currentUser.name.charAt(0) : 'K'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold leading-tight">
                      {currentUser.state} • {currentUser.landHolding}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500">+91 {currentUser.phone}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {currentUser.role === 'farmer' ? 'Verified Farmer' : currentUser.role}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {currentUser.landHolding}
                        </span>
                      </div>
                    </div>

                    <div className="px-4 py-2 text-xs text-slate-600 border-b border-slate-100">
                      <p className="font-bold text-slate-800 mb-1">Registered Crops:</p>
                      <p className="text-[11px] text-slate-500">
                        {currentUser.primaryCrops ? currentUser.primaryCrops.join(', ') : 'Wheat, Mustard'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'लॉगआउट करें (Sign Out)' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm active:scale-95"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{lang === 'hi' ? 'किसान लॉगिन' : 'Kisan Login / Sign Up'}</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-agri-50 hover:bg-agri-100 text-agri-800 border border-agri-200 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-agri-700" />
              <span className="hidden sm:inline">{lang === 'hi' ? 'कार्ट' : 'Cart'}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-agri-600 text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 py-2 border-t border-slate-100 text-sm font-semibold">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-agri-600 text-white shadow-sm shadow-agri-600/20'
                    : 'text-slate-600 hover:text-agri-700 hover:bg-agri-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={lang === 'hi' ? "बीज, खाद, उपकरण खोजें..." : "Search seeds, fertilizers, tools..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('store');
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm border border-slate-200"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {!currentUser && (
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-agri-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{lang === 'hi' ? 'किसान लॉगिन / नया खाता' : 'Farmer Login / Register Account'}</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-bold transition text-left ${
                    isActive
                      ? 'bg-agri-600 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500">Selected Zone:</span>
            <div className="flex gap-1">
              {['north', 'south', 'west', 'east'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2 py-1 rounded uppercase text-[11px] ${
                    selectedRegion === reg ? 'bg-agri-600 text-white' : 'bg-slate-100'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
