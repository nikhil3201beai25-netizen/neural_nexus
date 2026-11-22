import React, { useState } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2, 
  Calendar, 
  Info,
  Scale
} from 'lucide-react';

const CROP_NPK_DATABASE = {
  wheat: {
    name: "Wheat (गेहूं)",
    n: 120, p: 60, k: 40, zn: 25,
    splits: [
      { stage: "Basal (बुवाई के समय)", desc: "Full DAP + Full MOP + 1/3rd Urea + Full Zinc Sulphate" },
      { stage: "1st Top Dressing (21 DAS - CRI)", desc: "1/3rd Urea right after first light irrigation" },
      { stage: "2nd Top Dressing (45-50 DAS)", desc: "Remaining 1/3rd Urea at late tillering / jointing stage" }
    ]
  },
  paddy: {
    name: "Basmati Paddy (बासमती धान)",
    n: 100, p: 50, k: 50, zn: 25,
    splits: [
      { stage: "Basal (रोपाई के समय)", desc: "Full DAP + 50% MOP + 1/3rd Urea + Zinc Sulphate broadcasted" },
      { stage: "Active Tillering (25-30 DAT)", desc: "1/3rd Urea + Nano Urea foliar spray" },
      { stage: "Panicle Initiation (45-50 DAT)", desc: "Remaining 1/3rd Urea + Remaining 50% MOP for grain weight" }
    ]
  },
  mustard: {
    name: "Mustard / Sarson (सरसों)",
    n: 80, p: 40, k: 40, zn: 15,
    splits: [
      { stage: "Basal (बुवाई के समय)", desc: "Full DAP + Full MOP + 50% Urea + 20kg Elemental Sulphur" },
      { stage: "1st Irrigation (30-35 DAS)", desc: "Remaining 50% Urea top-dressed before flowering" }
    ]
  },
  cotton: {
    name: "Cotton (कपास)",
    n: 150, p: 60, k: 60, zn: 25,
    splits: [
      { stage: "Basal (बुवाई के समय)", desc: "Full DAP + 50% MOP + 25% Urea" },
      { stage: "Square Formation (45 DAS)", desc: "35% Urea + 19:19:19 foliar spray" },
      { stage: "Peak Flowering / Boll Formation", desc: "Remaining 40% Urea + Remaining 50% MOP" }
    ]
  },
  maize: {
    name: "Maize / Corn (मक्का)",
    n: 120, p: 60, k: 40, zn: 20,
    splits: [
      { stage: "Basal (बुवाई के समय)", desc: "Full DAP + Full MOP + 25% Urea + Zinc Sulphate" },
      { stage: "Knee-High Stage (30-35 DAS)", desc: "50% Urea side-dressed along crop rows" },
      { stage: "Tasseling Stage (55-60 DAS)", desc: "Remaining 25% Urea for heavy cob grain filling" }
    ]
  },
  potato: {
    name: "Potato (आलू)",
    n: 150, p: 80, k: 100, zn: 20,
    splits: [
      { stage: "Basal (रोपाई/बिजाई)", desc: "Full DAP + 50% MOP + 50% Urea + Vermicompost" },
      { stage: "Earthing-Up (30-35 DAP)", desc: "Remaining 50% Urea + Remaining 50% MOP before ridging" }
    ]
  }
};

export default function SoilCalculator({ onAddToCart, lang }) {
  const [cropKey, setCropKey] = useState('wheat');
  const [area, setArea] = useState(2);
  const [unit, setUnit] = useState('acre'); // acre or hectare
  const [soilOrganicCarbon, setSoilOrganicCarbon] = useState('medium'); // low, medium, high

  const currentCrop = CROP_NPK_DATABASE[cropKey] || CROP_NPK_DATABASE.wheat;

  // Conversion: 1 hectare = 2.47 acres
  const effectiveAcres = unit === 'hectare' ? area * 2.47 : area;

  // Organic carbon modifier
  const multiplier = soilOrganicCarbon === 'low' ? 1.15 : soilOrganicCarbon === 'high' ? 0.85 : 1.0;

  // Required active NPK in kg (recommended rates per hectare basis scaled)
  const reqN = (currentCrop.n / 2.47) * effectiveAcres * multiplier;
  const reqP = (currentCrop.p / 2.47) * effectiveAcres * multiplier;
  const reqK = (currentCrop.k / 2.47) * effectiveAcres * multiplier;
  const reqZn = (currentCrop.zn / 2.47) * effectiveAcres;

  // Commercial bag calculations:
  // DAP 18:46 gives 46% P2O5 and 18% N. A 50kg bag gives 23kg P2O5 and 9kg N.
  const dapBags = Math.ceil(reqP / 23);
  const nSuppliedByDap = dapBags * 9;
  const remainingN = Math.max(0, reqN - nSuppliedByDap);

  // Urea 46% N: A 45kg bag provides 20.7 kg N.
  const ureaBags = Math.ceil(remainingN / 20.7);

  // MOP 60% K2O: A 50kg bag provides 30 kg K2O.
  const mopBags = Math.ceil(reqK / 30);

  // Zinc Sulphate 33%: 5kg packs
  const zincPacks = Math.ceil(reqZn / 5);

  // Nano Urea alternative (1 bottle = 1 bag of 45kg urea)
  const nanoUreaBottles = ureaBags;

  return (
    <div id="fertilizer-calc-section" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'hi' ? 'स्मार्ट खाद व पोषण कैलकुलेटर' : 'Smart Fertilizer & NPK Requirement Calculator'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'अपनी ज़मीन के लिए सटीक खाद व बोरी संख्या गणना' : 'Scientific Fertilizer Dosage & Commercial Bag Calculator'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'फसल और खेत के क्षेत्रफल के आधार पर यूरिया, डीएपी, पोटाश और जिंक सल्फेट की उचित मात्रा व देने का सही समय।'
              : 'Calculate exact bags of Urea, DAP, MOP Potash & Micronutrients needed based on soil fertility and land size. Prevent fertilizer waste.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Input Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-agri-600" />
              <span>{lang === 'hi' ? 'खेत व फसल विवरण दर्ज करें' : 'Enter Land & Crop Details'}</span>
            </h3>

            {/* Select Crop */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Select Crop (फसल चुनें)
              </label>
              <select
                value={cropKey}
                onChange={(e) => setCropKey(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500"
              >
                {Object.entries(CROP_NPK_DATABASE).map(([key, data]) => (
                  <option key={key} value={key}>{data.name}</option>
                ))}
              </select>
            </div>

            {/* Area and Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Land Area (रकबा)
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={area}
                  onChange={(e) => setArea(Math.max(0.5, parseFloat(e.target.value) || 1))}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Unit (इकाई)
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500"
                >
                  <option value="acre">Acres (एकड़)</option>
                  <option value="hectare">Hectares (हेक्टेयर)</option>
                </select>
              </div>
            </div>

            {/* Soil Organic Carbon */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Soil Health / Organic Carbon (मिट्टी का उपजाऊपन)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: 'Low (< 0.5%)', sub: '+15% dose' },
                  { id: 'medium', label: 'Medium (Normal)', sub: 'Standard' },
                  { id: 'high', label: 'High (> 0.75%)', sub: '-15% dose' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSoilOrganicCarbon(s.id)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition ${
                      soilOrganicCarbon === s.id
                        ? 'bg-agri-600 text-white border-agri-700 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[10px] font-normal opacity-80">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pure Nutrient Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                Net Pure Nutrients Required:
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Nitrogen</span>
                  <strong className="text-slate-900">{Math.round(reqN)} kg</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Phosphorus</span>
                  <strong className="text-slate-900">{Math.round(reqP)} kg</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Potash</span>
                  <strong className="text-slate-900">{Math.round(reqK)} kg</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Zinc Sul.</span>
                  <strong className="text-slate-900">{Math.round(reqZn)} kg</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Result Output: Exact Bags & Split Timing */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Commercial Bags Recommendation Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900">
                  Recommended Commercial Bag Quantities
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  For {area} {unit}s of {currentCrop.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Urea Bag */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Urea 46% N (45kg bag)</span>
                    <h4 className="text-2xl font-black text-slate-900 mt-0.5">{ureaBags} Bags</h4>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      or {nanoUreaBottles} Bottles of Nano Urea Liquid
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-agri-100 flex items-center justify-center text-agri-700 font-bold text-lg">
                    45k
                  </div>
                </div>

                {/* DAP Bag */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">DAP 18:46:0 (50kg bag)</span>
                    <h4 className="text-2xl font-black text-slate-900 mt-0.5">{dapBags} Bags</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Basal application at sowing</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-lg">
                    50k
                  </div>
                </div>

                {/* MOP Bag */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">MOP Potash 60% (50kg bag)</span>
                    <h4 className="text-2xl font-black text-slate-900 mt-0.5">{mopBags} Bags</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Stiffens stems & grain luster</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 font-bold text-lg">
                    50k
                  </div>
                </div>

                {/* Zinc Sulphate */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Zinc Sulphate 33% (5kg)</span>
                    <h4 className="text-2xl font-black text-slate-900 mt-0.5">{zincPacks} Packs</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Prevents Khaira / yellow leaf</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-800 font-bold text-lg">
                    5k
                  </div>
                </div>

              </div>
            </div>

            {/* Split Schedule Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-agri-600" />
                <span>Scientific Split Application Schedule:</span>
              </h4>

              <div className="space-y-3">
                {currentCrop.splits.map((split, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-emerald-950">{split.stage}</p>
                      <p className="text-xs text-emerald-800 mt-0.5">{split.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
