import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  Heart, 
  Utensils, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Activity,
  Award
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();

  const platformStats = [
    { label: 'Total Registered Donors', value: '142', icon: Heart, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Verified NGO Receivers', value: '86', icon: Building2, color: 'text-amber-600 bg-amber-50' },
    { label: 'Meals Redistributed', value: '15,420', icon: Utensils, color: 'text-blue-600 bg-blue-50' },
    { label: 'AI Validation Accuracy', value: '96.2%', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
  ];

  const recentUsers = [
    { name: 'Royal Greens Mess', role: 'DONOR', location: 'Jagatpura, Jaipur', status: 'VERIFIED', date: 'Oct 06, 2026' },
    { name: 'Asha Food Relief NGO', role: 'RECEIVER', location: 'Malviya Nagar, Jaipur', status: 'VERIFIED', date: 'Oct 05, 2026' },
    { name: 'Spice Garden Catering', role: 'DONOR', location: 'Vaishali Nagar, Jaipur', status: 'PENDING', date: 'Oct 05, 2026' },
    { name: 'Smile Children Trust', role: 'RECEIVER', location: 'Mansarovar, Jaipur', status: 'VERIFIED', date: 'Oct 04, 2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-950/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-purple-100 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CareKart Platform Administration & Analytics (FR-005)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            System Admin Overview
          </h1>
          <p className="text-purple-200 text-sm mt-1 max-w-xl">
            Live monitoring for active donation listings, NGO authenticity validation, and SDG 2 impact tracking across Jaipur.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-3">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div className="text-left text-xs">
            <p className="text-slate-300">Backend System</p>
            <p className="font-bold text-white">99.8% Uptime (NFR-003)</p>
          </div>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {platformStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Management & Security Audits */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">User Authentication Audit (FR-001)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Donors and Receivers registered with JWT tokens</p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Total Active Sessions: 28
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Entity Name</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Registration Date</th>
                <th className="py-3 px-6">JWT Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentUsers.map((u, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{u.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      u.role === 'DONOR' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{u.location}</td>
                  <td className="py-4 px-6 text-slate-500">{u.date}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
