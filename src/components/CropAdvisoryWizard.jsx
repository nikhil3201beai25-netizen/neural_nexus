import React, { useState } from 'react';
import { REGIONS_DATA } from '../data/regionsData';
import { 
  Sun, 
  CloudRain, 
  Thermometer, 
  Calendar, 
  Award, 
  Layers, 
  Droplets, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  MapPin,
  ChevronRight,
  Info
} from 'lucide-react';

export default function CropAdvisoryWizard({ 
  selectedRegion, 
  setSelectedRegion, 
  onSelectProductForStore,
  lang 
}) {
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedSoil, setSelectedSoil] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [expandedCropId, setExpandedCropId] = useState(null);

  const currentRegionData = REGIONS_DATA[selectedRegion] || REGIONS_DATA.north;

  // Filter crops
  const filteredCrops = currentRegionData.crops.filter((crop) => {
    const matchesSeason = 
      selectedSeason === 'all' || 
      crop.season.toLowerCase().includes(selectedSeason.toLowerCase());
    
    const matchesSoil = 
      selectedSoil === 'all' || 
      crop.idealSoil.toLowerCase().includes(selectedSoil.toLowerCase());

    return matchesSeason && matchesSoil;
  });

  return (
    <div id="crop-advisory-section" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold mb-3 border border-agri-200">
            <Sparkles className="w-3.5 h-3.5 text-agri-600" />
            <span>{lang === 'hi' ? 'जलवायु व ऋतु आधारित फसल चयन' : 'Climate & Seasonal Crop Recommender'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' 
              ? `${currentRegionData.hindiName} के लिए वैज्ञानिक फसल सलाह` 
              : `Scientific Crop Recommendations for ${currentRegionData.name}`}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'क्षेत्र, मौसम (खरीफ, रबी, जायद), तापमान और मिट्टी की किस्म के अनुसार सबसे अधिक उपज देने वाली फसलें और उनकी उचित देखभाल।'
              : 'Empowering farmers across North, South, West & East India with high-yield hybrid varieties tailored to regional climate, soil texture, and season.'}
          </p>
        </div>

        {/* 4 Region Selector Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {[
            { id: 'north', name: 'North India', hindi: 'उत्तर भारत', sub: 'Punjab, Haryana, UP, Raj, HP' },
            { id: 'south', name: 'South India', hindi: 'दक्षिण भारत', sub: 'TN, Kar, AP, Tel, Kerala' },
            { id: 'west', name: 'West India', hindi: 'पश्चिम भारत', sub: 'Maha, Guj, Goa, MP' },
            { id: 'east', name: 'East & NE India', hindi: 'पूर्वी भारत', sub: 'WB, Bihar, Odisha, Assam' },
          ].map((region) => {
            const isActive = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => {
                  setSelectedRegion(region.id);
                  setSelectedState('all');
                  setSelectedSeason('all');
                  setSelectedSoil('all');
                }}
                className={`px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex flex-col items-center border ${
                  isActive
                    ? 'bg-agri-700 text-white border-agri-800 shadow-md shadow-agri-700/25 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  {region.name} ({region.hindi})
                </span>
                <span className={`text-[11px] font-normal mt-0.5 ${isActive ? 'text-agri-200' : 'text-slate-500'}`}>
                  {region.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Region Climate Profile Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
                  Climate Profile
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  States: {currentRegionData.states.join(", ")}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
                {currentRegionData.name} ({currentRegionData.hindiName}) Agro-Ecology
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {currentRegionData.climateDescription}
              </p>

              {/* Climate Stats Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-100">
                  <CloudRain className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-amber-900 uppercase">Annual Rainfall</p>
                    <p className="text-xs text-slate-700 font-medium">{currentRegionData.annualRainfall}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-emerald-900 uppercase">Major Soils</p>
                    <p className="text-xs text-slate-700 font-medium truncate" title={currentRegionData.soilTypes.join(", ")}>
                      {currentRegionData.soilTypes[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                  <Droplets className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-sky-900 uppercase">Irrigation</p>
                    <p className="text-xs text-slate-700 font-medium truncate" title={currentRegionData.irrigationSource}>
                      {currentRegionData.irrigationSource}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Season Calendar for this region */}
            <div className="bg-gradient-to-br from-slate-900 to-agri-950 text-white rounded-2xl p-5 shadow-inner">
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Regional Cropping Seasons
              </h4>
              <div className="space-y-3">
                {currentRegionData.seasons.map((season, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                      <span>{season.name}</span>
                      <span className="text-[10px] text-emerald-300 font-normal">{season.months}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{season.topCrops.join(" • ")}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Filters: Season & Soil Type */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mr-1">
              Filter by Season:
            </span>
            {[
              { id: 'all', label: 'All Seasons' },
              { id: 'rabi', label: 'Rabi (Winter)' },
              { id: 'kharif', label: 'Kharif (Monsoon)' },
              { id: 'zaid', label: 'Zaid / Summer' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedSeason === s.id
                    ? 'bg-agri-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide shrink-0">
              Soil Filter:
            </span>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value)}
              className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-500"
            >
              <option value="all">All Regional Soils</option>
              <option value="alluvial">Alluvial Soil</option>
              <option value="black">Black Cotton Soil (Regur)</option>
              <option value="loam">Sandy Loam / Loam</option>
              <option value="clay">Clayey / Lowland Soil</option>
              <option value="red">Red / Laterite Soil</option>
            </select>
          </div>

        </div>

        {/* Crops List Grid */}
        <div className="space-y-6">
          {filteredCrops.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-800">No specific crops matched this filter</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the season or soil filter above.</p>
              <button
                onClick={() => { setSelectedSeason('all'); setSelectedSoil('all'); }}
                className="mt-3 px-4 py-2 bg-agri-600 text-white text-xs font-bold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredCrops.map((crop) => {
              const isExpanded = expandedCropId === crop.id;
              return (
                <div 
                  key={crop.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Top Bar / Header of Crop Card */}
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-agri-100 flex items-center justify-center text-agri-700 shrink-0 border border-agri-200">
                          <Sparkles className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-agri-100 text-agri-800">
                              {crop.season} Season
                            </span>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                              {crop.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900">
                            {crop.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Ideal Soil: <strong className="text-slate-700">{crop.idealSoil}</strong> | Temp: <strong className="text-slate-700">{crop.tempRange}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Expected Yield & Sowing Windows */}
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Expected Yield</p>
                          <p className="text-sm font-black text-agri-700">{crop.expectedYield}</p>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-slate-200"></div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Sowing Period</p>
                          <p className="text-xs font-bold text-slate-800">{crop.sowingWindow}</p>
                        </div>
                      </div>

                    </div>

                    {/* Recommended Varieties Badges */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          Recommended High-Yield Varieties:
                        </span>
                        {crop.recommendedVarieties.map((variety, vIdx) => (
                          <span 
                            key={vIdx}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-1 rounded-lg border border-slate-200/80 transition"
                          >
                            {variety}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Agronomy Quick Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-500 block mb-0.5">Harvest Window</span>
                        <span className="font-semibold text-slate-800">{crop.harvestWindow}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-500 block mb-0.5">Recommended NPK Ratio</span>
                        <span className="font-semibold text-slate-800">{crop.npkRatio}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-500 block mb-0.5">Rainfall / Water Need</span>
                        <span className="font-semibold text-slate-800">{crop.rainfall}</span>
                      </div>
                    </div>

                    {/* Pro Farmer Agronomist Tip Alert */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-900 leading-relaxed">
                        <strong className="font-bold text-amber-950">Expert Farmer Advisory: </strong>
                        {crop.tips}
                      </p>
                    </div>

                    {/* Action row: Expand Details + Matching Store Inputs */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">
                          Recommended Store Inputs:
                        </span>
                        {crop.recommendedInputs.slice(0, 3).map((inputName, inIdx) => (
                          <button
                            key={inIdx}
                            onClick={() => onSelectProductForStore(inputName)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition"
                          >
                            <ShoppingBag className="w-3 h-3 text-emerald-600" />
                            <span>{inputName}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setExpandedCropId(isExpanded ? null : crop.id)}
                        className="text-xs font-bold text-agri-700 hover:text-agri-800 flex items-center gap-1 ml-auto"
                      >
                        <span>{isExpanded ? 'Hide Equipment & Protocols' : 'View Equipment & Sowing Protocol'}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-dashed border-slate-200 bg-slate-50/70 p-4 rounded-2xl animate-fadeIn space-y-4">
                        <div>
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                            Essential Agricultural Equipment & Tools Needed:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {crop.equipmentNeeded.map((eq, eqIdx) => (
                              <span 
                                key={eqIdx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                {eq}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-600">
                            <strong className="text-slate-900 font-bold">Government Subsidy Tip: </strong>
                            Equipment like Knapsack Sprayers, Seed Drills, and Solar Traps for this crop are eligible for 40-50% subsidy under SMAM (Sub-Mission on Agricultural Mechanization).
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
