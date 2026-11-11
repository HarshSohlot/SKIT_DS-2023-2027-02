import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  Building2, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  QrCode,
  Heart
} from 'lucide-react';

/**
 * Interactive Role Experience Explorer (Sprint 4: 10% Milestone)
 * Allows visitors to preview personalized workflows for Donors, NGOs, and Volunteer Drivers.
 */
export const RoleExplorer = () => {
  const [selectedRole, setSelectedRole] = useState('DONOR'); // 'DONOR' | 'RECEIVER' | 'VOLUNTEER'

  const roles = [
    {
      id: 'DONOR',
      title: 'Food Donors',
      subtitle: 'Restaurants, College Messes & Banquets',
      icon: Utensils,
      color: 'emerald',
      bannerBg: 'from-emerald-700 to-teal-800',
      badge: 'Zero Food Waste',
      headline: 'Turn Surplus into Community Relief in 60 Seconds',
      description: 'Avoid discarding wholesome cooked meals. Log portions easily, let our machine learning engine assess safe edible shelf-life, and coordinate verified NGO pick-up without disrupting kitchen operations.',
      steps: [
        { title: 'Log Food Portions', desc: 'Specify portions, cooking time, and storage temperature.' },
        { title: 'AI Shelf-Life Scoring', desc: 'Predicts safe consumption window before food reaches risk.' },
        { title: '1-Click Verification', desc: 'Approve pickup requests and hand over meals via secure OTP pass.' }
      ],
      ctaText: 'Register as Food Donor',
      ctaLink: '/register?role=DONOR'
    },
    {
      id: 'RECEIVER',
      title: 'NGOs & Relief Shelters',
      subtitle: 'Orphanages, Ashrams & Community Relief',
      icon: Building2,
      color: 'amber',
      bannerBg: 'from-amber-700 to-orange-800',
      badge: 'Verified Beneficiaries',
      headline: 'Discover & Claim Fresh Surplus Meals Across Jaipur',
      description: 'Receive real-time notifications when food is posted within your neighborhood radius. Lock in portions with our interactive map and ensure meals reach vulnerable families before expiry.',
      steps: [
        { title: 'Live Proximity Feed', desc: 'Filter food by distance (1 km to 10 km) and freshness urgency.' },
        { title: 'Interactive Map Booking', desc: 'Pinpoint nearby donations in Jagatpura, Malviya Nagar & Mansarovar.' },
        { title: 'Safe Van Dispatch', desc: 'Schedule volunteers with thermal containers and digital pickup OTP.' }
      ],
      ctaText: 'Register as NGO Partner',
      ctaLink: '/register?role=RECEIVER'
    },
    {
      id: 'VOLUNTEER',
      title: 'Volunteers & Logistics',
      subtitle: 'Community Couriers & Pickup Drivers',
      icon: Truck,
      color: 'blue',
      bannerBg: 'from-blue-700 to-indigo-800',
      badge: 'Rapid Logistics',
      headline: 'Direct Handshake Delivery with Cryptographic OTP',
      description: 'Assist community shelters by picking up insulated meal crates. Every transfer is confirmed with a digital QR code or 6-digit OTP code, ensuring transparency and zero food diversion.',
      steps: [
        { title: 'Instant Route Alerts', desc: 'Get route navigation straight from donor kitchen to beneficiary shelter.' },
        { title: 'Digital Handshake', desc: 'Show donor staff your encrypted QR pass to confirm correct pickup.' },
        { title: 'Zero Waste Impact', desc: 'Track portions delivered and personal CO2 emissions offset.' }
      ],
      ctaText: 'Join Distribution Network',
      ctaLink: '/register'
    }
  ];

  const current = roles.find((r) => r.id === selectedRole) || roles[0];
  const Icon = current.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tailored Cross-Platform Workflows</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How CareKart Works for Every Role
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Select your organization profile below to preview how our platform optimizes your redistribution experience.
        </p>
      </div>

      {/* Role Tabs Selector */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-2xl mx-auto mb-10 overflow-x-auto p-1.5 bg-slate-200/70 rounded-2xl">
        {roles.map((r) => {
          const TabIcon = r.icon;
          const isActive = selectedRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{r.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Experience Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* Left Column: Role Details & Steps */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{current.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {current.headline}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* 3 Step Workflow */}
          <div className="space-y-4 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Step-by-Step Redistribution Protocol:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.steps.map((st, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    0{i + 1}
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{st.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to={current.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Instant JWT-Secured Onboarding
            </span>
          </div>
        </div>

        {/* Right Column: Visual Persona Preview Banner */}
        <div className={`lg:col-span-5 bg-gradient-to-br ${current.bannerBg} p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden`}>
          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Icon className="w-7 h-7 text-white" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Persona Profile
              </span>
              <h4 className="text-2xl font-black mt-0.5">{current.title}</h4>
              <p className="text-xs text-slate-200 mt-1">{current.subtitle}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Zero Hunger (SDG 2) Direct Impact</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Geospatial Proximity Matching (FR-004)</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Cryptographic OTP Pickup Verification</span>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10 text-[11px] text-slate-300 border-t border-white/15 flex items-center justify-between">
            <span>CareKart v1.4 Network</span>
            <span>Jaipur Municipal Hubs</span>
          </div>
        </div>

      </div>
    </section>
  );
};
