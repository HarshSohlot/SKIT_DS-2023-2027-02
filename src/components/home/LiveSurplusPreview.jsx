import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFoodData } from '../../context/FoodDataContext';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Utensils, 
  PackageCheck, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Heart
} from 'lucide-react';

/**
 * Live Surplus Food Discovery Teaser (Sprint 4: 10% Milestone)
 * Displays real-time edible food items available across Jaipur straight on the homepage.
 */
export const LiveSurplusPreview = ({ searchQuery }) => {
  const { isAuthenticated, user } = useAuth();
  const { listings } = useFoodData();

  // Filter listings based on search term
  const filtered = listings.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.pickupLocation.toLowerCase().includes(q) ||
      (item.donorName && item.donorName.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const displayListings = filtered.slice(0, 4);

  return (
    <section id="surplus-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Community Redistribution Feed</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Surplus Food Available in Jaipur Right Now
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Real-time surplus logged by college messes, banquet caterers, and restaurants across Jaipur.
          </p>
        </div>

        <Link
          to={isAuthenticated ? (user?.role === 'RECEIVER' ? '/receiver/dashboard' : '/donor/dashboard') : '/login'}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>Access Full Geo-Fenced Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Food Listings */}
      {displayListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayListings.map((food) => {
            const isAvailable = food.status === 'AVAILABLE';

            return (
              <div
                key={food.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      #{food.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isAvailable 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {food.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-sm line-clamp-1">{food.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{food.donorName}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 text-xs border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quantity:</span>
                      <span className="font-bold text-slate-800">{food.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Shelf-Life:</span>
                      <span className="font-bold text-emerald-700">{food.expiryEstimate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[190px]">{food.pickupLocation}</span>
                  </div>
                </div>

                {isAvailable ? (
                  <Link
                    to={isAuthenticated ? '/receiver/dashboard' : '/login'}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Claim as Verified NGO</span>
                  </Link>
                ) : (
                  <div className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs text-center border border-slate-200">
                    Claimed by NGO Partner
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Utensils className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">No Surplus Found for "{searchQuery}"</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for other Jaipur neighborhoods like "Jagatpura", "Malviya Nagar", or "Mansarovar".
          </p>
        </div>
      )}

    </section>
  );
};
