import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomeHero } from '../components/home/HomeHero';
import { RoleExplorer } from '../components/home/RoleExplorer';
import { LiveSurplusPreview } from '../components/home/LiveSurplusPreview';

import { 
  HeartHandshake, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Utensils, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Award,
  Clock,
  Heart,
  Truck,
  Leaf
} from 'lucide-react';

/**
 * CareKart Main Homepage (Sprint 4: 10% Milestone)
 * Designed by Kartavya Vashisth (Member 3: Web Development)
 * Integrated with Live Municipal Ticker, Persona Explorer, and Live Surplus Feed Preview.
 */
export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSurplus = () => {
    const el = document.getElementById('surplus-feed');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* 1. Hero Section with Live Municipal Redistribution Ticker */}
      <HomeHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExploreSurplus={scrollToSurplus}
      />

      {/* 2. Live Surplus Food Discovery Teaser (Available in Jaipur) */}
      <LiveSurplusPreview searchQuery={searchQuery} />

      {/* 3. Interactive Role Explorer (Donors, NGOs, Volunteer Drivers) */}
      <RoleExplorer />

      {/* 4. Operational Pipeline (From Kitchen to Beneficiary) */}
      <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>End-to-End Coordination Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How CareKart Operates Across Jaipur
          </h2>
          <p className="text-sm text-slate-600">
            A verified 4-stage pipeline moving surplus food from cooking pans to community dinner plates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Donor Posts Surplus</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mess managers or restaurant chefs log edible food quantities, packaging condition, and pickup address in under 60 seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">AI Shelf-Life Scoring</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Harshit's Random Forest regression model assesses temperature, moisture, and cooking age to calculate the safe edible consumption window.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">NGO Claims & Dispatches</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nearby registered relief societies reserve food using the Jaipur radius map and assign volunteer drivers with insulated food crates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Secure Handover Pass</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Volunteers present a 6-digit cryptographic OTP pass to kitchen staff, verifying authenticity and updating the live impact ledger.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Enterprise Tech Stack Architecture */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Academic Engineering Architecture (SKIT Jaipur)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Enterprise Full-Stack Architecture
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Designed as a final year CSE (Data Science) project conforming to strict specifications: Spring Boot REST API, MongoDB NoSQL geospatial clustering, Python Scikit-Learn predictive modeling, and React 19 web interfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] font-bold uppercase text-emerald-400">Web Portal (Kartavya)</span>
              <p className="text-sm sm:text-base font-bold text-white">React 19 & Tailwind v4</p>
              <p className="text-[11px] text-slate-400">Responsive across all screens</p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] font-bold uppercase text-emerald-400">AI / ML Engine (Harshit)</span>
              <p className="text-sm sm:text-base font-bold text-white">Random Forest (R² 0.98)</p>
              <p className="text-[11px] text-slate-400">Predicts edible shelf-life</p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] font-bold uppercase text-emerald-400">Backend Server (Karan)</span>
              <p className="text-sm sm:text-base font-bold text-white">Spring Boot & JWT</p>
              <p className="text-[11px] text-slate-400">Stateless HS256 auth APIs</p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] font-bold uppercase text-emerald-400">Mobile Client (Harsh)</span>
              <p className="text-sm sm:text-base font-bold text-white">Kotlin & Jetpack Compose</p>
              <p className="text-[11px] text-slate-400">Native Android 2.0 app</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
