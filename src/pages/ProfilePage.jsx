import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Building,
  Key
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-black border border-white/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-black">{user?.name}</h1>
              <p className="text-emerald-100 text-xs font-medium">{user?.email}</p>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white text-emerald-800 shadow-xs">
            {user?.role}
          </span>
        </div>

        {/* Profile Body */}
        <div className="p-8 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Building className="w-3.5 h-3.5" /> Organization Type
              </span>
              <p className="font-bold text-slate-800 text-sm">{user?.organizationType || 'Partner'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5" /> Contact Phone
              </span>
              <p className="font-bold text-slate-800 text-sm">{user?.phone || '+91 98765 43210'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 md:col-span-2">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5" /> Registered Address / Location
              </span>
              <p className="font-bold text-slate-800 text-sm">
                {user?.address || 'Jagatpura, Jaipur, Rajasthan'} ({user?.pincode || '302017'})
              </p>
            </div>
          </div>

          {/* Token Security Section */}
          <div className="p-4 bg-slate-900 text-slate-300 rounded-2xl text-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" /> Bearer Token Storage
              </span>
              <span>localStorage: carekart_token</span>
            </div>
            <p className="text-[11px] text-slate-400 break-all font-mono">
              {token || 'No active token'}
            </p>
          </div>

          {/* Sign Out Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of CareKart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
