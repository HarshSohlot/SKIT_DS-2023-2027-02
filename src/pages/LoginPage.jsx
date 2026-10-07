import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HeartHandshake, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Heart, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Selected role tab: 'DONOR' | 'RECEIVER' | 'ADMIN'
  const [selectedRole, setSelectedRole] = useState('DONOR');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionExpiredMsg, setSessionExpiredMsg] = useState(
    new URLSearchParams(location.search).get('session_expired') === 'true'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password, selectedRole);
      if (res.success) {
        // Redirect to appropriate dashboard based on user role
        if (res.user.role === 'DONOR') navigate('/donor/dashboard');
        else if (res.user.role === 'RECEIVER') navigate('/receiver/dashboard');
        else if (res.user.role === 'ADMIN') navigate('/admin/dashboard');
        else navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill demo credentials for Viva / Presentation demo
  const handleQuickFill = (role) => {
    setSelectedRole(role);
    setError('');
    if (role === 'DONOR') {
      setEmail('donor@carekart.org');
      setPassword('donor123');
    } else if (role === 'RECEIVER') {
      setEmail('receiver@carekart.org');
      setPassword('ngo123');
    } else if (role === 'ADMIN') {
      setEmail('admin@carekart.org');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="max-w-md w-full">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 mb-4">
            <HeartHandshake className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Log in to manage surplus food donations & distribution
          </p>
        </div>

        {/* Quick Autofill Buttons for College Viva / Demo */}
        <div className="mb-6 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Viva / Demo Mode: Quick Auto-Fill</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('DONOR')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'DONOR'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-emerald-100/60 border border-slate-200'
              }`}
            >
              Donor Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('RECEIVER')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'RECEIVER'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-slate-200'
              }`}
            >
              NGO Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('ADMIN')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === 'ADMIN'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-purple-100/60 border border-slate-200'
              }`}
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-8 sm:p-10">
          
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 p-1 mb-6 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => { setSelectedRole('DONOR'); setError(''); }}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'DONOR'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Donor</span>
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole('RECEIVER'); setError(''); }}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'RECEIVER'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Receiver</span>
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole('ADMIN'); setError(''); }}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'ADMIN'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Session Expired Notice */}
          {sessionExpiredMsg && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Your session has expired. Please sign in again.</span>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'DONOR'
                      ? 'donor@carekart.org'
                      : selectedRole === 'RECEIVER'
                      ? 'ngo@carekart.org'
                      : 'admin@carekart.org'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link will be sent to registered email.');
                  }}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-2xl shadow-md shadow-emerald-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating via JWT...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {selectedRole === 'DONOR' ? 'Donor Portal' : selectedRole === 'RECEIVER' ? 'Receiver Portal' : 'Admin Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
                Register here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
