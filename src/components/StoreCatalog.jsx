import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS_DATA } from '../data/productsData';
import { 
  Sprout, 
  FlaskConical, 
  Wrench, 
  ShieldCheck, 
  Star, 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus, 
  BadgePercent, 
  MapPin, 
  Eye, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

const CATEGORY_ICONS = {
  all: Sparkles,
  seeds: Sprout,
  fertilizers: FlaskConical,
  equipment: Wrench,
  protection: ShieldCheck
};

export default function StoreCatalog({ 
  onAddToCart, 
  onOpenProductModal, 
  searchQuery, 
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  cartItems,
  lang 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [subsidyOnly, setSubsidyOnly] = useState(false);

  // Filter products
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Region filter
    if (regionFilter !== 'all' && !product.suitableRegions.includes(regionFilter)) {
      return false;
    }

    // Subsidy filter
    if (subsidyOnly && !product.subsidyEligible) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchHindi = product.hindiName && product.hindiName.includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchTag = product.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchHindi && !matchDesc && !matchTag) return false;
    }

    return true;
  });

  const getItemCartQty = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div id="agri-store-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'hi' ? '100% प्रमाणित कृषि इनपुट बाज़ार' : 'Direct Farmer Store: Certified Inputs'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' 
              ? 'प्रमाणित बीज, पोषक खाद व आधुनिक कृषि यंत्र' 
              : 'Certified Seeds, Fertilizers & Small Farm Equipment'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'राष्ट्रीय बीज निगम (NSC), इफको और प्रतिष्ठित कृषि संस्थानों से सीधे आपके गांव व घर तक आपूर्ति। नकद भुगतान (COD) व किसान क्रेडिट कार्ड स्वीकार्य।'
              : 'Direct supply to your village. Free delivery on orders above ₹999. Tested for maximum germination, purity, and subsidized for Indian farmers.'}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
                  isSelected
                    ? 'bg-agri-600 text-white border-agri-700 shadow-md shadow-agri-600/25 scale-105'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Store Control Bar: Search + Region Filter + Subsidy Filter */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Regional Suitability:
            </span>
            {[
              { id: 'all', label: 'All India' },
              { id: 'north', label: 'North India' },
              { id: 'south', label: 'South India' },
              { id: 'west', label: 'West India' },
              { id: 'east', label: 'East India' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setRegionFilter(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  regionFilter === reg.id
                    ? 'bg-agri-700 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={subsidyOnly}
                onChange={(e) => setSubsidyOnly(e.target.checked)}
                className="w-4 h-4 text-agri-600 rounded focus:ring-agri-500"
              />
              <span className="flex items-center gap-1">
                <BadgePercent className="w-3.5 h-3.5 text-amber-600" />
                Govt Subsidy Eligible Only
              </span>
            </label>

            <span className="text-xs text-slate-500 font-semibold">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <Sprout className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              No agricultural inputs matched your active search or filters. Try clearing search keywords or resetting category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setRegionFilter('all');
                setSubsidyOnly(false);
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-agri-600 text-white rounded-xl text-xs font-bold"
            >
              Reset All Store Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCartQty = getItemCartQty(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-agri-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onOpenProductModal(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Discount & Subsidy Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.discount && (
                        <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm">
                          {product.discount}
                        </span>
                      )}
                      {product.subsidyEligible && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
                          <BadgePercent className="w-3 h-3" />
                          Subsidy
                        </span>
                      )}
                    </div>

                    {/* Quick view button overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Quick View & Specs
                      </span>
                    </div>

                    {/* Pack size pill */}
                    <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      {product.packSize}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand & Rating */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-agri-700 truncate">{product.brand}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onOpenProductModal(product)}
                        className="text-base font-extrabold text-slate-900 line-clamp-2 hover:text-agri-600 cursor-pointer transition-colors mb-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                        {product.hindiName}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Add to Cart Section */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-700 font-bold ml-auto">
                          GST Included
                        </span>
                      </div>

                      {/* Add to Cart or Quantity Stepper */}
                      {inCartQty === 0 ? (
                        <button
                          onClick={() => onAddToCart(product, 1)}
                          className="w-full py-2.5 px-4 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow-md shadow-agri-600/20 flex items-center justify-center gap-2 transition active:scale-98"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{lang === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-agri-50 border border-agri-200 rounded-xl p-1">
                          <button
                            onClick={() => onAddToCart(product, inCartQty - 1)}
                            className="w-8 h-8 rounded-lg bg-white text-agri-800 flex items-center justify-center hover:bg-agri-100 transition shadow-sm font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-extrabold text-sm text-agri-900">
                            {inCartQty} in Cart
                          </span>
                          <button
                            onClick={() => onAddToCart(product, inCartQty + 1)}
                            className="w-8 h-8 rounded-lg bg-agri-600 text-white flex items-center justify-center hover:bg-agri-700 transition shadow-sm font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Quick Dosage view link */}
                      <button
                        onClick={() => onOpenProductModal(product)}
                        className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-agri-700 mt-2 transition"
                      >
                        View Dosage, Composition & Specs →
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
