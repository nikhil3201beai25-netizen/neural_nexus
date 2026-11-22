import React, { useState } from 'react';
import { WEATHER_ADVISORIES } from '../data/advisoriesData';
import { 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function WeatherAdvisory({ selectedRegion, setSelectedRegion, lang }) {
  const currentAdvisory = WEATHER_ADVISORIES[selectedRegion] || WEATHER_ADVISORIES.north;

  return (
    <div id="weather-advisory-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3 border border-sky-200">
            <CloudSun className="w-3.5 h-3.5 text-sky-600" />
            <span>{lang === 'hi' ? 'मौसम व कृषि विज्ञान बुलेटिन' : 'Agro-Meteorological Advisory & Crop Alerts'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' 
              ? `${currentAdvisory.region} मौसम पूर्वानुमान व सामयिक कृषि सलाह` 
              : `Current Weather & Field Action Alerts for ${currentAdvisory.region}`}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'आने वाले 7 दिनों का मौसम पूर्वानुमान, कीट प्रकोप चेतावनी और सिंचाई व छिड़काव का सही समय।'
              : '7-day localized weather trends, crop phenology stages, pest alerts, and agronomic guidance from ICAR-IMD bulletins.'}
          </p>
        </div>

        {/* Region Switcher Pills */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'north', name: 'North India' },
            { id: 'south', name: 'South India' },
            { id: 'west', name: 'West India' },
            { id: 'east', name: 'East India' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedRegion === r.id
                  ? 'bg-sky-600 text-white border-sky-700 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Main Weather Card */}
        <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-800/40 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Live Weather Gauge */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>{currentAdvisory.region} Live Weather</span>
              </div>
              
              <div className="flex items-baseline gap-3 my-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {currentAdvisory.temp}
                </span>
                <span className="text-sm font-semibold text-sky-200">
                  {currentAdvisory.condition}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" /> Humidity
                  </span>
                  <span className="font-bold text-white text-sm">{currentAdvisory.humidity}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Active Stage
                  </span>
                  <span className="font-bold text-white text-xs truncate block">{currentAdvisory.currentStage}</span>
                </div>
              </div>
            </div>

            {/* Forecast & Alerts */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-3.5 bg-sky-900/40 border border-sky-700/50 rounded-2xl">
                <p className="text-xs text-sky-200">
                  <strong className="text-white font-bold">Rainfall Forecast: </strong>
                  {currentAdvisory.rainfallForecast}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentAdvisory.alerts.map((alert, aIdx) => {
                  let alertColor = "bg-sky-500/10 border-sky-500/30 text-sky-200";
                  let Icon = Info;
                  if (alert.type === 'warning') {
                    alertColor = "bg-amber-500/15 border-amber-500/30 text-amber-200";
                    Icon = AlertTriangle;
                  } else if (alert.type === 'success') {
                    alertColor = "bg-emerald-500/15 border-emerald-500/30 text-emerald-200";
                    Icon = CheckCircle2;
                  }

                  return (
                    <div 
                      key={aIdx} 
                      className={`p-3.5 rounded-2xl border ${alertColor} flex items-start gap-3`}
                    >
                      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">
                          {alert.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-200">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
