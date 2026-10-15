import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { FoodListingCard } from '../components/dashboard/FoodListingCard';
import { PostFoodModal } from '../components/dashboard/PostFoodModal';
import { ClaimNotificationPanel } from '../components/dashboard/ClaimNotificationPanel';
import { PickupQrModal } from '../components/dashboard/PickupQrModal';

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
  Leaf,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';

export const DonorDashboard = () => {
  const { user } = useAuth();

  // Active navigation tab inside DashboardLayout ('overview' | 'requests' | 'impact' | 'security')
  const [activeTab, setActiveTab] = useState('overview');

  // Filter for listings ('ALL' | 'AVAILABLE' | 'CLAIMED' | 'COMPLETED')
  const [listingFilter, setListingFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedQrItem, setSelectedQrItem] = useState(null);

  // Active food listings data
  const [listings, setListings] = useState([
    {
      id: 'DON-101',
      title: 'Fresh Veg Biryani & Cucumber Raita',
      foodType: 'Cooked Meal',
      quantity: '25 Portions',
      cookedAt: 'Today, 1:30 PM',
      expiryEstimate: '5.5 Hours (AI Model)',
      aiHours: 5.5,
      storageCondition: 'Room Temp (25°C)',
      pickupLocation: 'Green Leaf Bistro, Malviya Nagar, Jaipur',
      status: 'AVAILABLE',
      claimedBy: null,
      co2Saved: '21.5 kg'
    },
    {
      id: 'DON-102',
      title: 'Dal Makhani & Whole Wheat Roti',
      foodType: 'Cooked Meal',
      quantity: '40 Portions',
      cookedAt: 'Today, 12:45 PM',
      expiryEstimate: '3.8 Hours (AI Model)',
      aiHours: 3.8,
      storageCondition: 'Heated Warmer (60°C)',
      pickupLocation: 'Royal Greens Mess, Jagatpura, Jaipur',
      status: 'CLAIMED',
      claimedBy: 'Asha Food Relief NGO',
      co2Saved: '34.0 kg'
    },
    {
      id: 'DON-103',
      title: 'Fresh Artisan Loaves & Dinner Rolls',
      foodType: 'Bakery & Bread',
      quantity: '18 Packs',
      cookedAt: 'Yesterday, 6:00 PM',
      expiryEstimate: '14 Hours (AI Model)',
      aiHours: 14.0,
      storageCondition: 'Room Temp (22°C)',
      pickupLocation: 'Jaipur Bakers Hub, Sector 3, Malviya Nagar',
      status: 'AVAILABLE',
      claimedBy: null,
      co2Saved: '15.2 kg'
    },
    {
      id: 'DON-104',
      title: 'Mixed Vegetable Curry & Steamed Rice',
      foodType: 'Cooked Meal',
      quantity: '15 Portions',
      cookedAt: 'Yesterday, 8:00 PM',
      expiryEstimate: 'Handover Completed',
      aiHours: 0,
      storageCondition: 'Refrigerated (4°C)',
      pickupLocation: 'Central Kitchen, Mansarovar, Jaipur',
      status: 'COMPLETED',
      claimedBy: 'Jaipur Shelter Trust',
      co2Saved: '12.8 kg'
    }
  ]);

  // Live incoming claim requests from NGOs
  const [claims, setClaims] = useState([
    {
      id: 'CLM-901',
      ngoName: 'Asha Food Relief Society',
      foodTitle: 'Fresh Veg Biryani & Cucumber Raita',
      quantity: '25 Portions',
      requestedTime: 'Within 45 mins (Pickup Van En Route)',
      contactPhone: '+91 98290 11223',
      note: 'Distributing to night shelter near Jaipur Railway Station.'
    }
  ]);

  // Handler: Add new donation from PostFoodModal
  const handleAddDonation = (newDonation) => {
    setListings([newDonation, ...listings]);
  };

  // Handler: Approve NGO claim
  const handleApproveClaim = (claimId) => {
    const claim = claims.find((c) => c.id === claimId);
    if (!claim) return;

    // Update listing status
    setListings(listings.map((l) => {
      if (l.title === claim.foodTitle) {
        return {
          ...l,
          status: 'CLAIMED',
          claimedBy: claim.ngoName
        };
      }
      return l;
    }));

    // Remove claim from pending
    setClaims(claims.filter((c) => c.id !== claimId));
  };

  // Handler: Reject NGO claim
  const handleRejectClaim = (claimId) => {
    setClaims(claims.filter((c) => c.id !== claimId));
  };

  // Handler: Change listing status (e.g. mark completed)
  const handleStatusChange = (listingId, newStatus) => {
    setListings(listings.map((l) => (l.id === listingId ? { ...l, status: newStatus } : l)));
  };

  // Filtered listings based on search and status tabs
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.foodType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      listingFilter === 'ALL' ? true : item.status === listingFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate dynamic stats
  const activeCount = listings.filter((l) => l.status === 'AVAILABLE').length;
  const claimedCount = listings.filter((l) => l.status === 'CLAIMED').length;
  const completedCount = listings.filter((l) => l.status === 'COMPLETED').length;
  const totalMeals = completedCount * 25 + 860; // historical + current

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      unreadClaimsCount={claims.length}
    >
      {/* =========================================================================
          TAB 1: OVERVIEW & LISTINGS (Sprint 3 Core Dashboard Design)
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>Donor Command & Food Quality Center (Sprint 3)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {user?.name || 'Jaipur Food Donor'}!
              </h1>
              <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Connect surplus food with verified NGOs across Jaipur. Log items with real-time AI shelf-life assessment and coordinate direct zero-waste handovers.
              </p>
            </div>

            <button
              onClick={() => setShowPostModal(true)}
              className="relative z-10 self-start lg:self-auto flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-black text-sm shadow-xl hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              <span>Post Food Donation</span>
            </button>
          </div>

          {/* Key Performance Indicators (KPIs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Available Listings"
              value={activeCount}
              subtitle="Open for NGO pickup"
              change="+2 today"
              isPositive={true}
              icon={Utensils}
              colorScheme="emerald"
              tooltip="Food currently listed and valid for claims"
            />
            <StatCard
              title="Pending Claims"
              value={claimedCount}
              subtitle="Awaiting pickup handover"
              change={`${claims.length} new request`}
              isPositive={true}
              icon={Clock}
              colorScheme="amber"
              tooltip="Listings claimed by an NGO awaiting verification"
            />
            <StatCard
              title="Meals Redistributed"
              value={totalMeals.toLocaleString()}
              subtitle="Fed to people in need"
              change="+14% this month"
              isPositive={true}
              icon={Users}
              colorScheme="teal"
              tooltip="Total verified meal portions delivered via CareKart"
            />
            <StatCard
              title="CO2 Emissions Offset"
              value="365 kg"
              subtitle="Food waste prevented"
              change="UN SDG 2"
              isPositive={true}
              icon={Leaf}
              colorScheme="purple"
              tooltip="Calculated methane & CO2 footprint avoided"
            />
          </div>

          {/* Main Content Area: Search, Filters, and Listing Cards */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <span>My Food Donation Listings</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Manage active items, view AI shelf-life predictions, and generate handover passes.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 text-xs font-bold self-start sm:self-auto overflow-x-auto max-w-full">
                {['ALL', 'AVAILABLE', 'CLAIMED', 'COMPLETED'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setListingFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      listingFilter === tab
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'ALL' ? 'All Listings' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search listings by food title, category, or location (e.g. Malviya Nagar, Biryani)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium outline-hidden shadow-xs"
              />
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredListings.map((item) => (
                  <FoodListingCard
                    key={item.id}
                    item={item}
                    onShowQr={setSelectedQrItem}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">No Listings Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No food donations matched your filter or search query. Click "Post Food Donation" to create a new surplus listing.
                </p>
                <button
                  onClick={() => setShowPostModal(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer transition-all inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Listing</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: LIVE CLAIM REQUESTS (NGO Requests to Approve)
          ========================================================================= */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>Incoming NGO Claim Requests ({claims.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified non-profit organizations requesting to pick up your surplus food items.
            </p>
          </div>

          <ClaimNotificationPanel
            claims={claims}
            onApprove={handleApproveClaim}
            onReject={handleRejectClaim}
          />
        </div>
      )}

      {/* =========================================================================
          TAB 3: IMPACT & SDG 2 ZERO HUNGER ANALYTICS
          ========================================================================= */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>Sustainability & UN SDG 2 Impact Analytics</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking of hunger mitigation, food rescued from landfills, and environmental footprint savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Total Food Rescued</h3>
              <p className="text-3xl font-black text-emerald-700">420 kg</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clean, safe cooked meals redistributed to vulnerable communities in Jaipur.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Methane & CO2 Prevented</h3>
              <p className="text-3xl font-black text-teal-700">365 kg</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                By preventing organic matter decomposition in landfills, you lower greenhouse gas emissions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Community Trust Tier</h3>
              <p className="text-3xl font-black text-purple-700">Gold Donor</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Top 5% verified food contributors on the Jaipur municipal zero-waste leaderboard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: JWT & SECURITY AUDIT (Viva Reference)
          ========================================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Security Architecture & Token Inspector (NFR-002)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verification details for mentor reviews and academic examination.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              Active Session Verification
            </h3>
            <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs space-y-1.5 break-all">
              <div className="text-emerald-400 font-bold text-[11px] uppercase">
                Decoded JWT Claims (RFC 7519):
              </div>
              <div>iss: "carekart-backend"</div>
              <div>sub: "{user?.email || 'donor@carekart.in'}"</div>
              <div>role: "{user?.role || 'DONOR'}"</div>
              <div>auth: "ROLE_DONOR"</div>
              <div>exp: "24 Hours (Stateless Bearer)"</div>
            </div>

            <div className="pt-2 text-xs text-slate-600 space-y-2">
              <p>
                <strong>Academic Requirement Mapping:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li><strong>FR-001:</strong> Role-based access control guarding donor routes.</li>
                <li><strong>NFR-002:</strong> HMAC-SHA256 signature verification preventing token tampering.</li>
                <li><strong>NFR-004:</strong> Fluid responsiveness across desktop, tablet, and mobile browsers.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS
          ========================================================================= */}
      {/* Post Food Donation Modal with AI Shelf-life Estimator */}
      <PostFoodModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onAddDonation={handleAddDonation}
        userAddress={user?.address}
      />

      {/* Handover QR Code / OTP Modal */}
      <PickupQrModal
        isOpen={!!selectedQrItem}
        onClose={() => setSelectedQrItem(null)}
        item={selectedQrItem}
        onConfirmHandover={(id) => handleStatusChange(id, 'COMPLETED')}
      />
    </DashboardLayout>
  );
};
