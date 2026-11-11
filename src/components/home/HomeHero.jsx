import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFoodData } from '../../context/FoodDataContext';
import { 
  ArrowRight, 
  Award, 
  Sparkles, 
  Utensils, 
  Truck, 
  Building2, 
  ShieldCheck, 
  Search, 
  HeartHandshake,
  Leaf,
  MapPin,
  Clock
} from 'lucide-react';

/**
 * Modern High-Impact Hero Section for CareKart Homepage (Sprint 4: 10% Milestone)
 * Includes live redistribution ticker, quick Jaipur location search, and dual CTAs.
 */
export const HomeHero = ({ searchQuery, onSearchChange, onExploreSurplus }) => {
  const { isAuthenticated, user } = useAuth();
  const { metrics, listings } = useFoodData();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'DONOR') return '/donor/dashboard';
    if (user.role === 'RECEIVER') return '/receiver/dashboard';
    return '/admin/dashboard';
  };

  const activeSurplusCount = listings.filter(l => l.status === 'AVAILABLE').length;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Academic Project & Sprint 4 Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>UN SDG 2: Zero Hunger Initiative</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Sprint 4: Homepage Design (10% Milestone)</span>
          </div>
        </div>

        {/* Main Pitch & Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Bridging Food Surplus & Hunger in <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Real Time</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            <strong>CareKart</strong> connects college messes, banquets, and restaurants directly with verified NGOs across Jaipur. Powered by machine learning shelf-life predictions to eliminate waste before it starts.
          </p>
        </div>

        {/* Quick Search & Neighborhood Explorer Input */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-2 flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search surplus by dish or Jaipur area (e.g. Jagatpura, Malviya Nagar, Biryani)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-3 pr-4 py-2.5 bg-transparent text-sm font-medium text-slate-800 outline-hidden placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={onExploreSurplus}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>View {activeSurplusCount} Active Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular Jaipur Hubs:</span>
            {['Jagatpura', 'Malviya Nagar', 'Mansarovar', 'Vaishali Nagar'].map((hub) => (
              <button
                key={hub}
                onClick={() => onSearchChange(hub)}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-medium transition-colors cursor-pointer"
              >
                {hub}
              </button>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {isAuthenticated ? (
            <Link
              to={getDashboardLink()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Open My Dashboard ({user?.role})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Register as Food Donor / NGO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-black text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Sign In to Portal</span>
              </Link>
            </>
          )}
        </div>

        {/* Live Municipal Redistribution Stats Ribbon */}
        <div className="max-w-5xl mx-auto pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                Total Meals Saved
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {metrics.totalMeals.toLocaleString()}
              </p>
              <span className="text-[11px] font-semibold text-emerald-600">Zero Hunger Impact</span>
            </div>

            <div className="text-center space-y-1 border-l border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                Avg. Pickup Time
              </span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600">
                &lt; 45 Mins
              </p>
              <span className="text-[11px] font-semibold text-slate-500">Express Van Dispatch</span>
            </div>

            <div className="text-center space-y-1 border-l border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                CO2 Landfill Offset
              </span>
              <p className="text-2xl sm:text-3xl font-black text-teal-600">
                {metrics.co2OffsetKg} kg
              </p>
              <span className="text-[11px] font-semibold text-slate-500">Methane Prevention</span>
            </div>

            <div className="text-center space-y-1 border-l border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                AI Expiry Accuracy
              </span>
              <p className="text-2xl sm:text-3xl font-black text-purple-600">
                98.2%
              </p>
              <span className="text-[11px] font-semibold text-slate-500">Random Forest Regressor</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
