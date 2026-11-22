import React, { useState } from 'react';
import { REGIONS_DATA } from '../data/regionsData';
import { 
  Compass, 
  MapPin, 
  CloudRain, 
  Layers, 
  Droplet, 
  Thermometer, 
  ShieldAlert, 
  Lightbulb, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

export default function RegionalInsights({ onSelectRegion, lang }) {
  const [activeZone, setActiveZone] = useState('north');

  const zoneInsights = {
    north: {
      title: "North India: Granary of India",
      hindi: "उत्तर भारत: भारत का अन्न भंडार",
      states: "Punjab, Haryana, Uttar Pradesh, Rajasthan, Himachal Pradesh, Uttarakhand, Jammu & Kashmir",
      riverBasins: "Indus basin (Sutlej, Beas, Ravi) & Ganga-Yamuna river plains",
      climateNote: "Continental climate with frosty winter mornings (down to 2°C in plains, sub-zero in hills) and searing hot summers (45°C+ in Rajasthan & south Punjab/Haryana). Significant Western Disturbances bring winter rains vital for Wheat & Mustard.",
      soilType: "Deep Alluvial soils (Khadar & Bhangar) in plains, desert sands in western Rajasthan, acidic hill soils in HP & J&K.",
      strengths: "Highest tube-well & canal network density, extensive mechanization, highest wheat & basmati rice productivity in India.",
      challenges: "Declining groundwater table, paddy stubble residue burning, soil alkalinity / salinity in canal commands.",
      climateSolutions: "Direct Seeded Rice (DSR) to save 30% groundwater, Zero-till Happy Seeder for wheat sowing without residue burning, Summer Moong as green manure."
    },
    south: {
      title: "South India: Peninsula of Spices & Millets",
      hindi: "दक्षिण भारत: मसालों, धान और पोषक अनाजों की भूमि",
      states: "Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala",
      riverBasins: "Cauvery, Krishna, Godavari, Tungabhadra, Periyar river systems",
      climateNote: "Equable tropical maritime climate. Coastal plains enjoy high humidity, while the Deccan interior experiences semi-arid warmth. Uniquely blessed by dual monsoons: Southwest Monsoon (June-Sept) and Northeast Retiring Monsoon (Oct-Dec).",
      soilType: "Red Sandy & Loamy soils, Coastal Deltaic alluvium, Deep Black soils in northern Karnataka & Telangana, Laterite soils in Kerala.",
      strengths: "Year-round cropping opportunities, leadership in high-value spices, coffee, horticulture, silk sericulture, and nutri-millets (Ragi, Jowar).",
      challenges: "Periodic Cauvery/Krishna basin water stress, high humidity fungal pest pressure, localized soil acidity in Western Ghats.",
      climateSolutions: "System of Rice Intensification (SRI), micro-drip fertigation for spices & chillies, farm ponds (Kalyani) for supplemental irrigation."
    },
    west: {
      title: "West India: Cotton, Soybean & Horticulture Powerhouse",
      hindi: "पश्चिम भारत: कपास, सोयाबीन और बागवानी का केंद्र",
      states: "Maharashtra, Gujarat, Goa, Madhya Pradesh (Malwa/Nimar)",
      riverBasins: "Narmada, Tapi, Godavari upper catchment, Sabarmati, Mahi",
      climateNote: "Tropical wet-and-dry with semi-arid rain-shadow plateau in Vidarbha and Marathwada, contrasted with torrential rainfall in Konkan and arid desert in Kutch.",
      soilType: "Volcanic Basalt Deep Black Cotton Soil (Regur) with high swelling/shrinking clay, medium black loam, and saline coastal stretches.",
      strengths: "Pioneer in agricultural cooperative movement, solar micro-irrigation, leading producer of Cotton, Soybean, Onions, Grapes, Pomegranates and Sugarcane.",
      challenges: "Vulnerability to prolonged monsoon dry spells, Pink Bollworm in cotton, high price volatility in onion/soybean crops.",
      climateSolutions: "Broad-Bed Furrow (BBF) sowing technique, solar automated insect traps, farm pond (Shet-tale) protective irrigation, cold storage linkage."
    },
    east: {
      title: "East India & Northeast: Water-Rich Organic Frontier",
      hindi: "पूर्वी भारत व पूर्वोत्तर: प्रचुर जल व जैविक कृषि की असीम संभावनाएं",
      states: "West Bengal, Bihar, Odisha, Jharkhand, Assam & Northeast States",
      riverBasins: "Ganga, Brahmaputra, Mahanadi, Damodar, Teesta river basins",
      climateNote: "Humid subtropical with copious rainfall (1200mm to 3500mm+). Mild winters, prolonged monsoon downpours, and Kalbaisakhi pre-monsoon squalls.",
      soilType: "Fertile Gangetic & Deltaic new alluvium (rich in silt), acidic lateritic soils in plateau (Chota Nagpur), peaty bheel soils.",
      strengths: "Abundant water resources, multiple rice cycles (Aman, Aus, Boro), record Rabi maize yields in Bihar, natural organic tea and bamboo in Northeast.",
      challenges: "Recurrent monsoon floods in North Bihar and Assam, acidic soil limiting phosphorus uptake, fragmented land holdings.",
      climateSolutions: "Submergence-tolerant rice varieties (Swarna Sub-1), deep-water paddy-cum-fish farming, agricultural lime application for soil acidity correction."
    }
  };

  const curr = zoneInsights[activeZone];

  return (
    <div id="regional-insights-section" className="py-12 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'hi' ? 'अखिल भारतीय कृषि पारिस्थितिकी' : 'Pan-India Agro-Ecological Profiling'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'उत्तर, दक्षिण, पश्चिम और पूर्व भारत का तुलनात्मक विवरण' : 'Agro-Climate Landscape: North, South, West & East India'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'प्रत्येक भौगोलिक क्षेत्र की अपनी अनूठी मिट्टी, जल स्रोत और जलवायु परिस्थितियाँ हैं। जानिए अपनी भूमि के अनुसार सर्वश्रेष्ठ वैज्ञानिक रणनीति।'
              : 'Every geographical zone presents unique soil textures, river basins, and seasonal weather patterns. Explore zone-specific challenges and climate-smart solutions.'}
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {[
            { id: 'north', name: 'North India', hindi: 'उत्तर भारत', icon: '🌾' },
            { id: 'south', name: 'South India', hindi: 'दक्षिण भारत', icon: '🥥' },
            { id: 'west', name: 'West India', hindi: 'पश्चिम भारत', icon: '🍇' },
            { id: 'east', name: 'East & Northeast', hindi: 'पूर्वी भारत', icon: '🍵' },
          ].map((tab) => {
            const isSel = activeZone === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveZone(tab.id)}
                className={`p-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all text-left border ${
                  isSel
                    ? 'bg-white border-agri-600 text-agri-900 shadow-md ring-2 ring-agri-500/20'
                    : 'bg-white/60 hover:bg-white text-slate-600 border-slate-200'
                }`}
              >
                <div className="text-2xl mb-1">{tab.icon}</div>
                <div className="font-black text-slate-900">{tab.name}</div>
                <div className="text-xs text-slate-500 font-semibold">{tab.hindi}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Insights Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-agri-700">
                Agro-Climatic Zone In-Depth
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {curr.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                <strong>Covered States:</strong> {curr.states}
              </p>
            </div>

            <button
              onClick={() => onSelectRegion(activeZone)}
              className="px-5 py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm shrink-0"
            >
              <span>View Crops & Seeds for this Zone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            {/* Climate & Soil */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1.5 uppercase">
                  <Thermometer className="w-4 h-4 text-amber-600" />
                  <span>Climate Pattern & Seasonal Nuances</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {curr.climateNote}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1.5 uppercase">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Soil Composition & Hydrology</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  <strong>Soil Types:</strong> {curr.soilType}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Key River Basins:</strong> {curr.riverBasins}
                </p>
              </div>
            </div>

            {/* Strengths, Challenges & Solutions */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1 uppercase">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>Key Agricultural Strengths</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {curr.strengths}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-900 mb-1 uppercase">
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  <span>Regional Farming Challenges</span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  {curr.challenges}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-950 mb-1 uppercase">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span>Climate-Smart Recommended Interventions</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {curr.climateSolutions}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
