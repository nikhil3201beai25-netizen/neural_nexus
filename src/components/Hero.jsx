import React from 'react';
import { 
  Sprout, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sun, 
  CloudRain, 
  ShieldCheck, 
  Truck, 
  BadgePercent 
} from 'lucide-react';

export default function Hero({ 
  onExploreCrops, 
  onShopStore, 
  selectedRegion, 
  setSelectedRegion,
  lang 
}) {
  const zoneStats = [
    { id: 'north', name: 'North India', hindi: 'उत्तर भारत', subtitle: 'Punjab, Haryana, UP, Rajasthan, HP', color: 'from-amber-500 to-amber-700' },
    { id: 'south', name: 'South India', hindi: 'दक्षिण भारत', subtitle: 'TN, Karnataka, AP, Telangana, Kerala', color: 'from-emerald-500 to-emerald-700' },
    { id: 'west', name: 'West India', hindi: 'पश्चिम भारत', subtitle: 'Maharashtra, Gujarat, Goa, MP', color: 'from-orange-500 to-orange-700' },
    { id: 'east', name: 'East & NE India', hindi: 'पूर्वी भारत', subtitle: 'WB, Bihar, Odisha, Assam, Jharkhand', color: 'from-teal-500 to-teal-700' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-agri-950 via-agri-900 to-emerald-950 text-white overflow-hidden py-14 lg:py-20">
      {/* Background organic glow & grid texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'hi' 
                ? 'कृषि क्रांति: आपकी मिट्टी, आपके मौसम के अनुकूल सही फसल व कृषि सामग्री' 
                : 'India’s Unified Smart Farming & Climate Crop Advisory Portal'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            {lang === 'hi' ? (
              <>
                मौसम और जलवायु के अनुसार <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300">सही फसल चुनें</span>, उत्तम उपज पाएं
              </>
            ) : (
              <>
                Climate-Smart Crop Guidance & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300">
                  Certified Agri-Supplies
                </span> for Every Indian Zone
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
            {lang === 'hi'
              ? 'उत्तर, दक्षिण, पश्चिम और पूर्व भारत की जलवायु, मिट्टी और मौसम (खरीफ, रबी, जायद) के अनुसार वैज्ञानिक फसल सिफारिशें पाएं। साथ ही प्रमाणित बीज, खाद व छोटे आधुनिक कृषि यंत्र सीधे घर मंगवाएं।'
              : 'Tailored agronomy for North, South, West, and East India. Discover high-yielding crop varieties for your soil & seasonal weather (Kharif, Rabi, Zaid) plus order certified seeds, fertilizers & subsidized small farm implements delivered to your village.'}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onExploreCrops}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-agri-500 to-emerald-600 hover:from-agri-400 hover:to-emerald-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base"
            >
              <span>{lang === 'hi' ? 'जलवायु अनुसार फसल खोजें' : 'Get Crop Recommendations for My Zone'}</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={onShopStore}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all hover:border-emerald-400/50 text-base"
            >
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'hi' ? 'बीज, खाद व उपकरण स्टोर' : 'Shop Seeds, Fertilizers & Tools'}</span>
            </button>
          </div>

          {/* Four Zone Interactive Picker Cards */}
          <div className="text-left mb-6">
            <p className="text-xs uppercase tracking-wider font-bold text-emerald-300/80 mb-3 text-center sm:text-left">
              {lang === 'hi' ? 'अपनी कृषि जलवायु क्षेत्र चुनें (Select Agro-Climate Zone):' : 'Select Your Agro-Climatic Zone:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {zoneStats.map((zone) => {
                const isSelected = selectedRegion === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSelectedRegion(zone.id);
                      onExploreCrops();
                    }}
                    className={`p-4 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-800/80 to-agri-900 border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-base text-white flex items-center gap-1.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        {zone.name}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-200 font-medium mb-1">{zone.hindi}</p>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{zone.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">4 Agro Zones</p>
              <p className="text-[11px] text-emerald-200/80">North, South, West, East</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Certified</p>
              <p className="text-[11px] text-emerald-200/80">ICAR & NSC Seed Quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <BadgePercent className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">SMAM Subsidy</p>
              <p className="text-[11px] text-emerald-200/80">Up to 50% Off Equipment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Village Delivery</p>
              <p className="text-[11px] text-emerald-200/80">Cash on Delivery & KCC</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
