import React from 'react';
import { 
  Sprout, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart,
  Truck,
  CreditCard,
  Banknote
} from 'lucide-react';

export default function Footer({ onSelectTab, onSelectRegion, lang }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Upper Footer: Value Props */}
      <div className="border-b border-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">100% Certified Products</p>
              <p className="text-[11px] text-slate-500">ICAR, NSC & Govt certified batches</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Direct Village Delivery</p>
              <p className="text-[11px] text-slate-500">Pan-India doorstep farm dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">COD & KCC Accepted</p>
              <p className="text-[11px] text-slate-500">Cash on Delivery & Kisan Credit Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">24x7 Agronomy Desk</p>
              <p className="text-[11px] text-slate-500">Toll-Free 1800-180-1551 Helpline</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-agri-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Agri<span className="text-agri-500">Connect</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering millions of Indian farmers with climate-smart seasonal crop advisories, certified seeds, water-soluble fertilizers, and subsidized small agricultural implements for sustainable prosperity.
            </p>
            <div className="flex items-center gap-2 text-slate-300 font-semibold pt-1">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>National Agri-Tech Complex, New Delhi - 110012, India</span>
            </div>
          </div>

          {/* Regional Agro-Zones */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Agro-Climatic Zones
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { onSelectRegion('north'); onSelectTab('advisory'); }}
                  className="hover:text-white transition"
                >
                  North India (उत्तर भारत)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectRegion('south'); onSelectTab('advisory'); }}
                  className="hover:text-white transition"
                >
                  South India (दक्षिण भारत)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectRegion('west'); onSelectTab('advisory'); }}
                  className="hover:text-white transition"
                >
                  West India (पश्चिम भारत)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectRegion('east'); onSelectTab('advisory'); }}
                  className="hover:text-white transition"
                >
                  East & Northeast (पूर्वी भारत)
                </button>
              </li>
            </ul>
          </div>

          {/* Agri-Store Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Agri-Input Store
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('store')} className="hover:text-white transition">
                  Certified Hybrid Seeds
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('store')} className="hover:text-white transition">
                  NPK & Liquid Nano Fertilizers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('store')} className="hover:text-white transition">
                  Battery Knapsack Sprayers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('store')} className="hover:text-white transition">
                  Push Seed Drills & Harvesters
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('store')} className="hover:text-white transition">
                  Organic Neem Oil & Bio-Fungicides
                </button>
              </li>
            </ul>
          </div>

          {/* Farmer Tools & Helplines */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Farmer Utilities
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('calculator')} className="hover:text-white transition">
                  NPK Fertilizer Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('weather')} className="hover:text-white transition">
                  7-Day Weather & Pest Alerts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-white transition">
                  SMAM 50% Subsidy Portal
                </button>
              </li>
              <li>
                <a href="tel:18001801551" className="text-emerald-400 font-bold hover:underline">
                  KCC Helpline: 1800-180-1551
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 AgriConnect India Platform. Dedicated to the Prosperity of Annadata Farmers.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Agriculture
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
