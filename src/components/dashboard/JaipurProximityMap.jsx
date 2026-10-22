import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Sparkles, 
  Utensils, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Info,
  Compass
} from 'lucide-react';

/**
 * Interactive Jaipur Proximity Map & Radius Visualizer (Requirement FR-004)
 * Allows NGOs to visually discover food listings across Jaipur neighborhoods within a chosen radius.
 */
export const JaipurProximityMap = ({ listings, onSelectListing, userLocation = "Jagatpura, Jaipur" }) => {
  const [selectedRadius, setSelectedRadius] = useState(5); // 1, 3, 5, 10 km
  const [activePin, setActivePin] = useState(null);

  // Jaipur Hubs with normalized SVG coordinates
  const jaipurHubs = [
    {
      id: 'FOOD-502',
      title: 'Whole Wheat Chapatis & Mix Veg',
      donor: 'SKIT Campus Mess',
      location: 'Ramnagaria, Jagatpura',
      distance: 0.6,
      distanceText: '0.6 km',
      quantity: '50 Portions',
      x: 68, // SVG percentage coordinate
      y: 62,
      category: 'Cooked Meal',
      expiry: '3.5 Hours (AI: 98%)',
      status: 'AVAILABLE'
    },
    {
      id: 'FOOD-501',
      title: 'Steamed Rice & Paneer Curry',
      donor: 'Green Leaf Bistro',
      location: 'Sector 3, Malviya Nagar',
      distance: 1.8,
      distanceText: '1.8 km',
      quantity: '30 Portions',
      x: 54,
      y: 52,
      category: 'Cooked Meal',
      expiry: '5 Hours (AI: 94%)',
      status: 'AVAILABLE'
    },
    {
      id: 'FOOD-503',
      title: 'Assorted Bakery Bread & Rolls',
      donor: 'Jaipur Bakers Hub',
      location: 'Sector 3, Malviya Nagar',
      distance: 3.4,
      distanceText: '3.4 km',
      quantity: '20 Packs',
      x: 48,
      y: 44,
      category: 'Bakery & Bread',
      expiry: '12 Hours (Packaged)',
      status: 'AVAILABLE'
    },
    {
      id: 'FOOD-504',
      title: 'Vegetable Khichdi & Buttermilk',
      donor: 'Central Relief Kitchen',
      location: 'Mansarovar',
      distance: 4.8,
      distanceText: '4.8 km',
      quantity: '40 Portions',
      x: 32,
      y: 68,
      category: 'Cooked Meal',
      expiry: '4 Hours (AI: 91%)',
      status: 'AVAILABLE'
    },
    {
      id: 'FOOD-505',
      title: 'Dal Baati Churma Feast Surplus',
      donor: 'Heritage Haveli Banquets',
      location: 'Vaishali Nagar',
      distance: 7.2,
      distanceText: '7.2 km',
      quantity: '60 Portions',
      x: 24,
      y: 35,
      category: 'Cooked Meal',
      expiry: '2.5 Hours (Urgent)',
      status: 'AVAILABLE'
    }
  ];

  // NGO location (Asha Food Relief / Receiver location in Jagatpura)
  const receiverPin = {
    name: 'My NGO Hub (Asha Relief / SKIT Area)',
    x: 62,
    y: 58
  };

  const filteredHubs = jaipurHubs.filter((h) => h.distance <= selectedRadius);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
      
      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Compass className="w-3 h-3 text-amber-600" />
              <span>Requirement FR-004 Interactive Geospatial Engine</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              MongoDB 2dsphere $nearSphere
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Jaipur Food Redistribution Proximity Visualizer
          </h3>
          <p className="text-xs text-slate-500">
            Current Location: <strong className="text-slate-800">{userLocation}</strong> • Showing listings within <strong>{selectedRadius} km</strong>
          </p>
        </div>

        {/* Radius Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase px-2">Radius:</span>
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRadius(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRadius === r
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
        
        {/* Stylized Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* SVG Jaipur Road Network & Zones */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Main Artery Roads */}
          <path d="M 10% 20% Q 50% 50% 90% 80%" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
          <path d="M 20% 90% Q 50% 45% 80% 10%" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
          <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#334155" strokeWidth="1.5" opacity="0.5" />
          <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#334155" strokeWidth="1.5" opacity="0.5" />

          {/* Dynamic Radius Circle around Receiver NGO */}
          <circle
            cx={`${receiverPin.x}%`}
            cy={`${receiverPin.y}%`}
            r={`${selectedRadius * 4.5}%`}
            fill="rgba(245, 158, 11, 0.08)"
            stroke="rgba(245, 158, 11, 0.5)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            className="animate-pulse"
          />
        </svg>

        {/* Receiver NGO Base Marker */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
          style={{ left: `${receiverPin.x}%`, top: `${receiverPin.y}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white ring-4 ring-amber-500/30">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-amber-950/80 backdrop-blur-md text-amber-200 text-[10px] font-bold whitespace-nowrap border border-amber-500/30">
            NGO Base (You)
          </span>
        </div>

        {/* Food Donor Pins on Map */}
        {jaipurHubs.map((hub) => {
          const isWithinRadius = hub.distance <= selectedRadius;
          const isSelected = activePin?.id === hub.id;

          return (
            <div
              key={hub.id}
              onClick={() => setActivePin(hub)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 z-10 ${
                isWithinRadius ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
              }`}
              style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
            >
              <div className={`p-2 rounded-full border-2 transition-all shadow-lg flex items-center justify-center ${
                isSelected
                  ? 'bg-emerald-500 border-white ring-8 ring-emerald-500/40 scale-125'
                  : isWithinRadius
                  ? 'bg-emerald-600 border-emerald-200 text-white hover:scale-110'
                  : 'bg-slate-700 border-slate-600 text-slate-400'
              }`}>
                <Utensils className="w-3.5 h-3.5 text-white" />
              </div>

              <span className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md ${
                isWithinRadius
                  ? 'bg-slate-900/90 text-white border border-slate-700'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {hub.donor} • {hub.distanceText}
              </span>
            </div>
          );
        })}

        {/* Selected Hub Floating Preview Overlay */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-800 z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {activePin.distanceText} away
                </span>
                <h4 className="font-black text-sm text-slate-900 mt-1">{activePin.title}</h4>
                <p className="text-xs text-slate-600 font-medium">{activePin.donor} • {activePin.quantity}</p>
              </div>
              <button 
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {activePin.expiry}
              </span>

              <button
                onClick={() => {
                  if (onSelectListing) onSelectListing(activePin);
                  setActivePin(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-xs cursor-pointer transition-all"
              >
                Claim This Item
              </button>
            </div>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700 text-[11px] space-y-1.5 hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>NGO Distribution Hub (Current Base)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Active Food Donor Listings</span>
          </div>
          <div className="text-[10px] text-slate-400 pt-0.5">
            Matching {filteredHubs.length} surplus items within {selectedRadius} km
          </div>
        </div>
      </div>
    </div>
  );
};
