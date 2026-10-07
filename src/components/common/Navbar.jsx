import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartHandshake, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Menu, 
  X, 
  ShieldCheck, 
  Building2, 
  Heart,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, isMockMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'DONOR') return '/donor/dashboard';
    if (user.role === 'RECEIVER') return '/receiver/dashboard';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    return '/';
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'DONOR':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Heart className="w-3 h-3 text-emerald-600" /> Donor
          </span>
        );
      case 'RECEIVER':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Building2 className="w-3 h-3 text-amber-600" /> Receiver / NGO
          </span>
        );
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <ShieldCheck className="w-3 h-3 text-purple-600" /> Admin
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner when running in Demo/Presentation mode */}
      {isMockMode && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>CareKart Demo Mode Active — Backend Spring Boot offline fallback enabled for viva presentation.</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Care<span className="text-emerald-600">Kart</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 hidden sm:inline-block">
                  SDG 2
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-1">
                Share Food, Share Hope
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <a href="#about" className="hover:text-emerald-600 transition-colors">
              About Project
            </a>
            <a href="#workflow" className="hover:text-emerald-600 transition-colors">
              How It Works
            </a>
            <a href="#sdg" className="hover:text-emerald-600 transition-colors">
              Zero Hunger Mission
            </a>
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 transition-all border border-slate-200/80 hover:border-emerald-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span>Dashboard</span>
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[140px]">
                      {user?.name}
                    </p>
                    <div className="mt-0.5">{getRoleBadge(user?.role)}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center border border-emerald-300 hover:ring-2 hover:ring-emerald-400 transition-all"
                    title="User Profile"
                  >
                    {user?.name?.charAt(0) || 'U'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm shadow-emerald-600/30 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            About Project
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            How It Works
          </a>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="px-3 py-2 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                {getRoleBadge(user?.role)}
              </div>
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-slate-100 text-slate-700"
              >
                <User className="w-4 h-4" />
                My Account
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-rose-600 bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
