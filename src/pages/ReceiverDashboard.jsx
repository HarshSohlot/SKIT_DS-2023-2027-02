import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { ClaimFoodModal } from '../components/dashboard/ClaimFoodModal';
import { ActiveClaimTracker } from '../components/dashboard/ActiveClaimTracker';
import { JaipurProximityMap } from '../components/dashboard/JaipurProximityMap';
import { NgoNeedsBoard } from '../components/dashboard/NgoNeedsBoard';

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
  PackageCheck,
  Truck,
  Compass,
  Megaphone,
  Layers,
  Utensils,
  Leaf,
  Users
} from 'lucide-react';

/**
 * Revamped Receiver (NGO) Dashboard (Sprint 3 Web Dashboard Design - 75% Milestone)
 * Complete distribution portal for registered NGOs in Jaipur:
 * - Surplus Food Discovery Feed with AI shelf-life urgency
 * - Live Pickup Claims Tracker with 4-stage stepper & OTP pass
 * - Jaipur Geospatial Proximity Visualizer (FR-004)
 * - Emergency Relief Needs Broadcast Board
 */
export const ReceiverDashboard = () => {
  const { user } = useAuth();

  // Active view tab in DashboardLayout: 'feed' | 'tracker' | 'map' | 'needs' | 'security'
  const [activeTab, setActiveTab] = useState('feed');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');

  // Selected food item for Claim modal
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  // Available Surplus Food Listings in Jaipur (matching Harshit's model outputs)
  const [nearbyListings, setNearbyListings] = useState([
    {
      id: 'FOOD-501',
      title: 'Steamed Basmati Rice & Paneer Butter Masala',
      donorName: 'Green Leaf Bistro',
      quantity: '30 Portions',
      category: 'Cooked Meal',
      distance: '1.8 km',
      address: 'Plot 12, Malviya Nagar, Jaipur',
      expiryStatus: 'Valid for 5.0 hours (AI Score 94%)',
      urgency: 'Moderate',
      status: 'AVAILABLE',
      cookedAt: '1.5 hrs ago',
      tags: ['vegetarian', 'hot-meal']
    },
    {
      id: 'FOOD-502',
      title: 'Whole Wheat Chapatis & Mix Veg Sabzi',
      donorName: 'SKIT Campus Mess',
      quantity: '50 Portions',
      category: 'Cooked Meal',
      distance: '0.6 km',
      address: 'Ramnagaria, Jagatpura, Jaipur',
      expiryStatus: 'Valid for 3.5 hours (AI Score 98%)',
      urgency: 'High',
      status: 'AVAILABLE',
      cookedAt: '45 mins ago',
      tags: ['vegetarian', 'campus-mess']
    },
    {
      id: 'FOOD-503',
      title: 'Fresh Artisan Multi-Grain Loaves & Dinner Rolls',
      donorName: 'Jaipur Bakers Hub',
      quantity: '20 Packs',
      category: 'Bakery & Bread',
      distance: '3.4 km',
      address: 'Sector 3, Malviya Nagar, Jaipur',
      expiryStatus: 'Valid for 12 hours (Packaged)',
      urgency: 'Low',
      status: 'AVAILABLE',
      cookedAt: '3 hrs ago',
      tags: ['bakery', 'packaged']
    },
    {
      id: 'FOOD-504',
      title: 'Vegetable Khichdi & Cooling Buttermilk',
      donorName: 'Central Kitchen Trust',
      quantity: '40 Portions',
      category: 'Cooked Meal',
      distance: '4.8 km',
      address: 'Sector 5, Mansarovar, Jaipur',
      expiryStatus: 'Valid for 4.0 hours (AI Score 91%)',
      urgency: 'Moderate',
      status: 'AVAILABLE',
      cookedAt: '2 hrs ago',
      tags: ['healthy', 'vegetarian']
    },
    {
      id: 'FOOD-505',
      title: 'Royal Dal Baati Churma Banquet Surplus',
      donorName: 'Heritage Haveli Banquets',
      quantity: '60 Portions',
      category: 'Cooked Meal',
      distance: '7.2 km',
      address: 'Queens Road, Vaishali Nagar, Jaipur',
      expiryStatus: 'Valid for 2.5 hours (Urgent)',
      urgency: 'High',
      status: 'AVAILABLE',
      cookedAt: '3.5 hrs ago',
      tags: ['banquet', 'hot-food']
    }
  ]);

  // Active NGO Pickup Claims
  const [claimedListings, setClaimedListings] = useState([
    {
      claimId: 'CLM-7841',
      foodId: 'FOOD-499',
      foodTitle: 'Mixed Vegetable Pulao & Raita',
      donorName: 'Royal Greens Mess',
      quantity: '35 Portions',
      pickupAddress: 'Jagatpura, Jaipur',
      distance: '1.2 km',
      expiryStatus: 'Valid for 4 hours',
      pickupWindow: 'Today within 1 hour',
      driverName: 'Mohan Lal (Volunteer Driver)',
      driverPhone: '+91 98291 00223',
      vehicleNo: 'RJ-14-EB-2918',
      beneficiaryGroup: 'Sindhi Camp Night Relief Shelter',
      status: 'APPROVED',
      claimedAt: '30 mins ago',
      otpCode: '492815'
    }
  ]);

  // Handler: When NGO confirms claim in ClaimFoodModal
  const handleConfirmClaim = (newClaim) => {
    // Add to active claims
    setClaimedListings([newClaim, ...claimedListings]);

    // Update listing status in feed
    setNearbyListings(nearbyListings.map((l) => 
      l.id === newClaim.foodId ? { ...l, status: 'CLAIMED' } : l
    ));

    // Automatically switch to tracker tab to show the tracking pass
    setActiveTab('tracker');
  };

  // Handler: Update claim status (e.g. dispatched, completed)
  const handleUpdateClaimStatus = (claimId, newStatus) => {
    setClaimedListings(claimedListings.map((c) =>
      c.claimId === claimId ? { ...c, status: newStatus } : c
    ));
  };

  // Receiver custom sidebar navigation
  const receiverNavItems = [
    {
      id: 'feed',
      label: 'Surplus Food Feed',
      icon: Utensils,
      badge: nearbyListings.filter((l) => l.status === 'AVAILABLE').length
    },
    {
      id: 'tracker',
      label: 'Live Pickup Tracker',
      icon: Truck,
      badge: claimedListings.filter((c) => c.status !== 'COMPLETED').length || null
    },
    {
      id: 'map',
      label: 'Jaipur Radius Map',
      icon: Compass,
      badge: 'FR-004'
    },
    {
      id: 'needs',
      label: 'Broadcast Relief Needs',
      icon: Megaphone,
      badge: 'Shortage'
    },
    {
      id: 'security',
      label: 'JWT & Security Audit',
      icon: ShieldCheck,
      badge: 'NFR-002'
    }
  ];

  // Filter listings
  const filteredListings = nearbyListings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' ? true : item.category === categoryFilter;

    const matchesUrgency =
      urgencyFilter === 'ALL' ? true : item.urgency === urgencyFilter;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const availableCount = nearbyListings.filter((l) => l.status === 'AVAILABLE').length;
  const inProgressClaims = claimedListings.filter((c) => c.status !== 'COMPLETED').length;

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      customNavItems={receiverNavItems}
      portalTitle="NGO Relief & Distribution Portal"
      portalSubtitle="Sprint 3 Milestone (75% Complete): Surplus Feed, Map Engine & Pickup Tracker"
      sprintBadgeText="Sprint 3: 75% Milestone"
    >
      {/* =========================================================================
          TAB 1: SURPLUS FOOD DISCOVERY FEED (Main NGO Feed)
          ========================================================================= */}
      {activeTab === 'feed' && (
        <div className="space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-950/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-amber-200" />
                <span>Jaipur NGO Food Redistribution Hub (Sprint 3: 75% Milestone)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome, {user?.name || 'Asha Food Relief Society'}!
              </h1>
              <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Browse real-time verified surplus food posted by college messes, restaurants, and catering halls across Jaipur. Claim portions to feed vulnerable families before shelf-life expires.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('map')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-amber-900 font-black text-xs shadow-lg hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-700" />
                <span>View Jaipur Radius Map</span>
              </button>
            </div>
          </div>

          {/* Metric Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Nearby Surplus Food"
              value={`${availableCount} Items`}
              subtitle="Valid & open for pickup"
              change="+3 today"
              isPositive={true}
              icon={Utensils}
              colorScheme="amber"
              tooltip="Food currently available from Jaipur donors"
            />
            <StatCard
              title="Active Dispatches"
              value={inProgressClaims}
              subtitle="Volunteers en route"
              change="Real-time OTP"
              isPositive={true}
              icon={Truck}
              colorScheme="teal"
              tooltip="Claims undergoing physical pickup and verification"
            />
            <StatCard
              title="Beneficiaries Fed"
              value={(1240 + claimedListings.length * 30).toLocaleString()}
              subtitle="Portions delivered"
              change="UN SDG 2"
              isPositive={true}
              icon={Users}
              colorScheme="emerald"
              tooltip="Cumulative meal portions distributed to community shelters"
            />
            <StatCard
              title="Food Rescued (kg)"
              value="520 kg"
              subtitle="Diverted from waste"
              change="+18% this week"
              isPositive={true}
              icon={Leaf}
              colorScheme="purple"
              tooltip="Total clean edible food rescued across Jaipur"
            />
          </div>

          {/* Filter, Search & Food Feed Section */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-amber-600" />
                  <span>Surplus Food Discovery Feed</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Select any listing to claim portions, schedule volunteer pickup, and generate verification passes.
                </p>
              </div>

              {/* Urgency Filter */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 text-xs font-bold self-start sm:self-auto overflow-x-auto max-w-full">
                <span className="text-[11px] font-bold text-slate-500 px-2 uppercase">Urgency:</span>
                {['ALL', 'High', 'Moderate', 'Low'].map((urg) => (
                  <button
                    key={urg}
                    onClick={() => setUrgencyFilter(urg)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      urgencyFilter === urg
                        ? 'bg-white text-amber-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {urg === 'ALL' ? 'All Urgencies' : `${urg} (< ${urg === 'High' ? '3h' : '6h'})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar & Category Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by food dish, donor restaurant, or neighborhood (e.g. Jagatpura, Biryani, Roti)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-xs sm:text-sm font-medium outline-hidden shadow-xs"
                />
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 focus:border-amber-500 text-xs sm:text-sm font-medium outline-hidden shadow-xs"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Cooked Meal">Cooked Hot Meals</option>
                  <option value="Bakery & Bread">Bakery & Breads</option>
                </select>
              </div>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 transition-all p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        #{item.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <MapPin className="w-3 h-3 text-emerald-600" /> {item.distance} away
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Donor: <strong className="text-slate-800">{item.donorName}</strong>
                    </p>

                    <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl space-y-2 text-xs border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Quantity Available:</span>
                        <span className="font-bold text-slate-800">{item.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">AI Shelf-Life:</span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          {item.expiryStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Address:</span>
                        <span className="font-semibold text-slate-700 truncate max-w-[150px]" title={item.address}>
                          {item.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.status === 'AVAILABLE' ? (
                    <button
                      onClick={() => setSelectedFoodItem(item)}
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Request Food Claim</span>
                    </button>
                  ) : (
                    <div className="w-full py-2.5 text-center text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl">
                      Claim Request Active
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: LIVE PICKUP TRACKER (Active claims & Stepper)
          ========================================================================= */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>Live Food Pickup Tracker & Verification Passes</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track volunteer driver dispatch stages and show 6-digit OTP codes at donor kitchen handover.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('feed')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl self-start sm:self-auto cursor-pointer"
            >
              + Claim More Food
            </button>
          </div>

          <ActiveClaimTracker
            claims={claimedListings}
            onUpdateStatus={handleUpdateClaimStatus}
          />
        </div>
      )}

      {/* =========================================================================
          TAB 3: JAIPUR PROXIMITY RADIUS MAP (Requirement FR-004)
          ========================================================================= */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <JaipurProximityMap
            listings={nearbyListings}
            onSelectListing={(hub) => {
              const fullItem = nearbyListings.find((l) => l.id === hub.id) || hub;
              setSelectedFoodItem(fullItem);
            }}
            userLocation={user?.address || "Jagatpura, Jaipur"}
          />
        </div>
      )}

      {/* =========================================================================
          TAB 4: NGO COMMUNITY RELIEF NEEDS BOARD
          ========================================================================= */}
      {activeTab === 'needs' && (
        <div className="space-y-6">
          <NgoNeedsBoard />
        </div>
      )}

      {/* =========================================================================
          TAB 5: JWT & SECURITY AUDIT (Academic Viva)
          ========================================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Receiver Role Authorization & Security Audit (NFR-002)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified security claims and token encapsulation for NGO distribution partners.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              Active NGO Bearer Token Claims
            </h3>
            <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl font-mono text-xs space-y-1.5 break-all">
              <div className="text-amber-400 font-bold text-[11px] uppercase">
                Decoded Token Header & Payload (RFC 7519):
              </div>
              <div>alg: "HS256", typ: "JWT"</div>
              <div>sub: "{user?.email || 'ngo@asharelief.org'}"</div>
              <div>role: "{user?.role || 'RECEIVER'}"</div>
              <div>ngo_verification_status: "VERIFIED_501C"</div>
              <div>geospatial_radius_authorization: "JAIPUR_ZONE_A"</div>
            </div>

            <div className="pt-2 text-xs text-slate-600 space-y-2">
              <p>
                <strong>Academic Requirement Mapping:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li><strong>FR-001:</strong> Receiver authentication and profile management.</li>
                <li><strong>FR-004:</strong> Proximity radius filtering based on MongoDB 2dsphere indexes.</li>
                <li><strong>NFR-002:</strong> Tamper-proof OTP verification prevents food diversion.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Claim Food Modal */}
      <ClaimFoodModal
        isOpen={!!selectedFoodItem}
        onClose={() => setSelectedFoodItem(null)}
        foodItem={selectedFoodItem}
        onConfirmClaim={handleConfirmClaim}
      />
    </DashboardLayout>
  );
};
