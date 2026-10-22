import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  BellRing, 
  TrendingUp, 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles,
  HeartHandshake,
  Layers,
  Leaf,
  MapPin,
  ClipboardList,
  Compass
} from 'lucide-react';

/**
 * Reusable Dashboard Layout Shell (Sprint 3 Architecture - 75% Milestone)
 * Provides sidebar navigation, responsive drawer, top bar, and role badges for both DONOR and RECEIVER.
 */
export const DashboardLayout = ({ 
  children, 
  activeTab, 
  onTabChange, 
  unreadClaimsCount = 0,
  customNavItems,
  portalTitle = "Kartavya's Web Dashboard Portal",
  portalSubtitle = "Sprint 3 Milestone: Food Redistribution & Receiver Control Center",
  sprintBadgeText = "Sprint 3: 75% Milestone"
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Default Donor nav items if customNavItems not provided
  const defaultNavItems = [
    {
      id: 'overview',
      label: 'Overview & Listings',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'requests',
      label: 'Live Claim Requests',
      icon: BellRing,
      badge: unreadClaimsCount > 0 ? unreadClaimsCount : null
    },
    {
      id: 'impact',
      label: 'Impact & SDG 2 Analytics',
      icon: Leaf,
      badge: 'UN SDG 2'
    },
    {
      id: 'security',
      label: 'JWT & Security Audit',
      icon: ShieldCheck,
      badge: 'NFR-002'
    }
  ];

  const navItems = customNavItems || defaultNavItems;

  const isReceiver = user?.role === 'RECEIVER';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Brand & Sprint Indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs ${
                isReceiver 
                  ? 'bg-gradient-to-tr from-amber-600 to-orange-500' 
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-500'
              }`}>
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-slate-900 text-base tracking-tight block">
                  Care<span className={isReceiver ? "text-amber-600" : "text-emerald-600"}>Kart</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Web Portal v1.2
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Identity */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center shrink-0 ${
              isReceiver 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="truncate">
              <span className="font-bold text-xs text-slate-800 block truncate">
                {user?.name || (isReceiver ? 'Asha Food Relief NGO' : 'Registered Donor')}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                isReceiver
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-50 text-emerald-700'
              }`}>
                {user?.role || 'RECEIVER'}
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
              Navigation Menu
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (onTabChange) onTabChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? isReceiver
                        ? 'bg-amber-600 text-white shadow-xs shadow-amber-700/20'
                        : 'bg-emerald-600 text-white shadow-xs shadow-emerald-700/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : typeof item.badge === 'number'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Project Academic Meta */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
          <div className="px-2 py-2 rounded-xl bg-white border border-slate-200/60 text-[11px] space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-semibold">
              <span>Project ID:</span>
              <span className="text-slate-700 font-mono font-bold">DS-02</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 font-semibold">
              <span>Sprint Task:</span>
              <span className="text-amber-700 font-bold">Sprint 3 (75%)</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 font-bold text-xs cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg border border-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-black text-slate-800">
                {portalTitle}
              </h2>
              <p className="text-[11px] text-slate-500">
                {portalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 75% Sprint Badge */}
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isReceiver 
                ? 'bg-amber-50 text-amber-800 border-amber-200' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                isReceiver ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />
              <span>{sprintBadgeText}</span>
            </span>

            {/* Quick Profile Link */}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Account</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
};
