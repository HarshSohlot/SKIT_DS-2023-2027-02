import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  Heart
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'DONOR') return '/donor/dashboard';
    if (user.role === 'RECEIVER') return '/receiver/dashboard';
    return '/admin/dashboard';
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold tracking-wide">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>UN Sustainable Development Goal 2: Zero Hunger</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Bridging Food Surplus & Hunger in <span className="text-emerald-600">Real Time</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              <strong>CareKart</strong> is a cross-platform food redistribution network connecting restaurants, mess halls, and caterers directly with verified NGOs and shelters across Jaipur.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Link
                to={getDashboardLink()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Enter Your Dashboard ({user?.role})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Join as Food Donor / NGO</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Sign In to Portal</span>
                </Link>
              </>
            )}
          </div>

          {/* Stats Bar */}
          <div className="max-w-4xl mx-auto pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100">
              <div className="text-center">
                <p className="text-3xl font-black text-slate-900">33%</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Global Food Wasted Annually</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-emerald-600">&lt; 2 hrs</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Avg. Redistribution Turnaround</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-teal-600">100%</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Direct NGO Handover</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-purple-600">JWT</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">End-to-End Cryptographic Security</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section (Slide 8 from proposal) */}
      <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-black text-slate-900">How CareKart Operates</h2>
          <p className="text-sm text-slate-600">
            A seamless, verified pipeline from kitchen surplus to table distribution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 relative space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Donor Posts Food</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Donors authenticate securely and log surplus food portions, pickup address, and cooking timestamp.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 relative space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 font-black text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">AI Shelf-Life Scoring</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Machine learning Random Forest regression model computes safe edible expiry window before public listing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 relative space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 font-black text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Nearby NGOs Claim</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verified local charity partners within radius receive notifications and lock in claim requests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 relative space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pickup & Confirmation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Receiver picks up food directly from donor with digital handshake confirmation to close loop.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Highlights */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Stack Micro-Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Enterprise Grade Technologies Behind CareKart
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Built under strict final year engineering guidelines with Spring Boot REST microservices, MongoDB NoSQL database, Python AI predictive pipeline, and modern responsive React web architecture.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-emerald-400 font-semibold">Web Frontend</p>
                <p className="text-base font-bold text-white mt-0.5">React.js & Tailwind</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-emerald-400 font-semibold">Security</p>
                <p className="text-base font-bold text-white mt-0.5">JWT Token Interceptor</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-emerald-400 font-semibold">Backend</p>
                <p className="text-base font-bold text-white mt-0.5">Spring Boot (Java)</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-emerald-400 font-semibold">Database</p>
                <p className="text-base font-bold text-white mt-0.5">MongoDB Atlas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
