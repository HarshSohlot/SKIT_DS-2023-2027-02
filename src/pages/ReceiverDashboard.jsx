import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  HeartHandshake, 
  AlertCircle, 
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

export const ReceiverDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [claimedListings, setClaimedListings] = useState([]);

  // Mock available surplus food listings nearby Jaipur
  const [nearbyListings, setNearbyListings] = useState([
    {
      id: 'FOOD-501',
      title: 'Steamed Rice & Paneer Curry',
      donorName: 'Green Leaf Restaurant',
      quantity: '30 Portions',
      distance: '1.8 km away',
      address: 'Plot 12, Malviya Nagar, Jaipur',
      expiryStatus: 'Valid for 5 hours (AI Score 94%)',
      urgency: 'Moderate',
      status: 'AVAILABLE'
    },
    {
      id: 'FOOD-502',
      title: 'Whole Wheat Chapatis & Mix Veg',
      donorName: 'SKIT Campus Mess',
      quantity: '50 Portions',
      distance: '0.6 km away',
      address: 'Ramnagaria, Jagatpura, Jaipur',
      expiryStatus: 'Valid for 3.5 hours (AI Score 98%)',
      urgency: 'High',
      status: 'AVAILABLE'
    },
    {
      id: 'FOOD-503',
      title: 'Assorted Bakery Bread & Rolls',
      donorName: 'Jaipur Bakers Hub',
      quantity: '20 Packs',
      distance: '3.4 km away',
      address: 'Sector 3, Malviya Nagar, Jaipur',
      expiryStatus: 'Valid for 12 hours (Packaged)',
      urgency: 'Low',
      status: 'AVAILABLE'
    }
  ]);

  const handleClaim = (id) => {
    const item = nearbyListings.find((l) => l.id === id);
    if (!item) return;

    setNearbyListings(nearbyListings.map((l) => l.id === id ? { ...l, status: 'CLAIMED' } : l));
    setClaimedListings([
      ...claimedListings,
      {
        ...item,
        claimedAt: 'Just now',
        status: 'PENDING_PICKUP',
        claimId: `CLM-${Date.now().toString().slice(-4)}`
      }
    ]);
  };

  const filteredListings = nearbyListings.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Receiver / NGO Distribution Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {user?.name || 'NGO Relief Partner'}!
          </h1>
          <p className="text-amber-100 text-sm mt-1 max-w-xl">
            Discover verified surplus food listings nearby. Claim items to distribute to hungry beneficiaries in real-time.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center">
          <p className="text-xs uppercase font-bold text-amber-200">Beneficiaries Fed</p>
          <p className="text-3xl font-black text-white">{user?.stats?.beneficiariesFed || 1240}</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Available Food Nearby</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {nearbyListings.filter((l) => l.status === 'AVAILABLE').length} Listings
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Active Pickup Claims</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {claimedListings.length} In Progress
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Verified Location</p>
          <p className="text-sm font-bold text-slate-800 mt-2 truncate">
            {user?.address || 'Jagatpura, Jaipur'}
          </p>
        </div>
      </div>

      {/* Search & Listings */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-600" />
            <span>Available Surplus Food Nearby</span>
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by food or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 transition-all p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400">#{item.id}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <MapPin className="w-3 h-3 text-emerald-600" /> {item.distance}
                  </span>
                </div>
                
                <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Donor: {item.donorName}</p>

                <div className="mt-4 p-3 bg-slate-50 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-bold text-slate-800">{item.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AI Quality:</span>
                    <span className="font-bold text-emerald-700">{item.expiryStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Address:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[150px]">{item.address}</span>
                  </div>
                </div>
              </div>

              {item.status === 'AVAILABLE' ? (
                <button
                  onClick={() => handleClaim(item.id)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Request Food Claim</span>
                </button>
              ) : (
                <div className="w-full py-2.5 text-center text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl">
                  Claim Request Sent
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Claimed History / Pickups */}
      {claimedListings.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>My Active Claim Requests & Pickup Details</span>
          </h3>
          <div className="divide-y divide-slate-100">
            {claimedListings.map((c) => (
              <div key={c.claimId} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <p className="font-bold text-slate-800">{c.title} ({c.quantity})</p>
                  <p className="text-slate-500">{c.address} • Pickup window: Next 2 Hours</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 text-[10px]">
                    {c.status}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{c.claimId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
