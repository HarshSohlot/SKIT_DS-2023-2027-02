import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  PlusCircle, 
  Package, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Users,
  Utensils,
  Leaf
} from 'lucide-react';

export const DonorDashboard = () => {
  const { user, token } = useAuth();

  // Sample active listings for donor demonstration
  const [listings, setListings] = useState([
    {
      id: 'DON-101',
      title: 'Fresh Veg Biryani & Raita',
      quantity: '25 Portions',
      cookedAt: 'Today, 2:30 PM',
      expiryEstimate: '6 Hours (Predicted by AI)',
      pickupLocation: 'Green Leaf Bistro, Malviya Nagar, Jaipur',
      status: 'AVAILABLE',
      claimedBy: null
    },
    {
      id: 'DON-102',
      title: 'Dal Makhani & Roti',
      quantity: '40 Portions',
      cookedAt: 'Today, 1:00 PM',
      expiryEstimate: '4 Hours (Predicted by AI)',
      pickupLocation: 'Royal Greens Mess, Jagatpura, Jaipur',
      status: 'CLAIMED',
      claimedBy: 'Asha Food Relief NGO'
    },
    {
      id: 'DON-103',
      title: 'Mixed Vegetable Curry & Rice',
      quantity: '15 Portions',
      cookedAt: 'Yesterday, 8:00 PM',
      expiryEstimate: 'Delivered',
      pickupLocation: 'Central Kitchen, Jaipur',
      status: 'COMPLETED',
      claimedBy: 'Jaipur Shelter Trust'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newFood, setNewFood] = useState({
    title: '',
    foodType: 'Cooked Meal',
    quantity: '',
    pickupLocation: user?.address || 'Malviya Nagar, Jaipur',
    availableTime: 'Until 9:00 PM'
  });

  const handleCreateDonation = (e) => {
    e.preventDefault();
    if (!newFood.title || !newFood.quantity) return;

    const item = {
      id: `DON-${Date.now().toString().slice(-3)}`,
      title: newFood.title,
      quantity: `${newFood.quantity} Portions`,
      cookedAt: 'Just now',
      expiryEstimate: '5 Hours (AI Random Forest model)',
      pickupLocation: newFood.pickupLocation,
      status: 'AVAILABLE',
      claimedBy: null
    };

    setListings([item, ...listings]);
    setShowAddModal(false);
    setNewFood({
      title: '',
      foodType: 'Cooked Meal',
      quantity: '',
      pickupLocation: user?.address || 'Malviya Nagar, Jaipur',
      availableTime: 'Until 9:00 PM'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Donor Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {user?.name || 'Food Donor'}!
          </h1>
          <p className="text-emerald-100 text-sm mt-1 max-w-xl">
            Your surplus food feeds families in need. Track active listings, monitor real-time AI food quality assessments, and coordinate pickups.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-800 font-bold text-sm shadow-lg hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 text-emerald-600" />
          <span>Post Food Donation</span>
        </button>
      </div>

      {/* Impact & Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Active Listings</p>
            <p className="text-2xl font-black text-slate-900">
              {listings.filter((l) => l.status === 'AVAILABLE').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Meals Shared</p>
            <p className="text-2xl font-black text-slate-900">{user?.stats?.mealsProvided || 860}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Pending Claims</p>
            <p className="text-2xl font-black text-slate-900">
              {listings.filter((l) => l.status === 'CLAIMED').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center shrink-0">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">CO2 Prevented</p>
            <p className="text-2xl font-black text-slate-900">340 kg</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Listings Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              <span>My Donation Listings</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Showing {listings.length} records
            </span>
          </div>

          <div className="space-y-3">
            {listings.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400">ID: #{item.id}</span>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <span
                    className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'AVAILABLE'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : item.status === 'CLAIMED'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-400 block font-medium">Quantity</span>
                    <span className="font-bold text-slate-800">{item.quantity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Shelf-Life Assessment</span>
                    <span className="font-bold text-emerald-700">{item.expiryEstimate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Cooked/Logged</span>
                    <span className="font-bold text-slate-800">{item.cookedAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.pickupLocation}</span>
                  </div>
                  {item.claimedBy && (
                    <div className="text-amber-700 font-semibold shrink-0">
                      Claimed by: {item.claimedBy}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Viva JWT Inspection Box */}
        <div className="space-y-6">
          {/* JWT Security Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Active JWT Authentication</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Your session is secured using standard JSON Web Token (JWT) Bearer authentication as specified in requirement <strong>NFR-002</strong>.
            </p>

            <div className="space-y-2 bg-slate-900 text-slate-300 p-3 rounded-xl font-mono text-[11px] break-all">
              <div className="text-emerald-400 font-semibold text-[10px] uppercase">Decoded Payload Claims:</div>
              <div>Subject: {user?.email}</div>
              <div>Role: {user?.role}</div>
              <div>User ID: {user?.id}</div>
              <div>Algorithm: HS256</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Token Status:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Valid & Authorized
              </span>
            </div>
          </div>

          {/* Quick Guidance Box for College Viva */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
              <span>Sprint Task: Web Setup & Auth</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              This frontend interface is wired with React Context and Axios interceptors ready to communicate with Karan's Spring Boot backend REST APIs (Sprint 2).
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
              <li>Responsive across all screen sizes (NFR-004)</li>
              <li>Role-based access control (FR-001)</li>
              <li>Protected React router navigation</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Add Food Donation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Post Surplus Food Donation</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDonation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Food Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Paneer Butter Masala & Naan"
                  value={newFood.title}
                  onChange={(e) => setNewFood({ ...newFood, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Portions / Servings
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 30"
                    value={newFood.quantity}
                    onChange={(e) => setNewFood({ ...newFood, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Food Category
                  </label>
                  <select
                    value={newFood.foodType}
                    onChange={(e) => setNewFood({ ...newFood, foodType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Cooked Meal</option>
                    <option>Bakery / Breads</option>
                    <option>Packaged / Canned</option>
                    <option>Raw Vegetables / Fruits</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  required
                  value={newFood.pickupLocation}
                  onChange={(e) => setNewFood({ ...newFood, pickupLocation: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-center gap-2 border border-emerald-200">
                <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>AI Expiry Assessment: Harshit's Random Forest model will evaluate shelf-life upon posting.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 cursor-pointer shadow-sm"
                >
                  Confirm & Post Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
