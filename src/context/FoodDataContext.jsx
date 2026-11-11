import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Shared Food & Redistribution Data Context (Sprint 3 Complete Synchronization)
 * Connects Donor, Receiver, and Admin portals into a synchronized reactive store
 * with localStorage persistence and instant Viva demo reset.
 */
const FoodDataContext = createContext(null);

const INITIAL_FOOD_LISTINGS = [
  {
    id: 'DON-101',
    title: 'Fresh Veg Biryani & Cucumber Raita',
    foodType: 'Cooked Meal',
    category: 'Cooked Meal',
    donorName: 'Green Leaf Bistro',
    quantity: '25 Portions',
    cookedAt: 'Today, 1:30 PM',
    expiryEstimate: '5.5 Hours (AI Model)',
    aiHours: 5.5,
    storageCondition: 'Room Temp (25°C)',
    pickupLocation: 'Plot 12, Malviya Nagar, Jaipur',
    address: 'Plot 12, Malviya Nagar, Jaipur',
    distance: '1.8 km',
    expiryStatus: 'Valid for 5.5 hours (AI Score 96%)',
    urgency: 'Moderate',
    status: 'AVAILABLE',
    claimedBy: null,
    co2Saved: '21.5 kg',
    tags: ['vegetarian', 'hot-meal']
  },
  {
    id: 'DON-102',
    title: 'Dal Makhani & Whole Wheat Roti',
    foodType: 'Cooked Meal',
    category: 'Cooked Meal',
    donorName: 'Royal Greens Mess',
    quantity: '40 Portions',
    cookedAt: 'Today, 12:45 PM',
    expiryEstimate: '3.8 Hours (AI Model)',
    aiHours: 3.8,
    storageCondition: 'Heated Warmer (60°C)',
    pickupLocation: 'Royal Greens Mess, Jagatpura, Jaipur',
    address: 'Ramnagaria, Jagatpura, Jaipur',
    distance: '0.6 km',
    expiryStatus: 'Valid for 3.8 hours (AI Score 98%)',
    urgency: 'High',
    status: 'CLAIMED',
    claimedBy: 'Asha Food Relief Society',
    co2Saved: '34.0 kg',
    tags: ['vegetarian', 'mess-food']
  },
  {
    id: 'DON-103',
    title: 'Fresh Artisan Multi-Grain Loaves & Dinner Rolls',
    foodType: 'Bakery & Bread',
    category: 'Bakery & Bread',
    donorName: 'Jaipur Bakers Hub',
    quantity: '18 Packs',
    cookedAt: 'Yesterday, 6:00 PM',
    expiryEstimate: '14 Hours (AI Model)',
    aiHours: 14.0,
    storageCondition: 'Room Temp (22°C)',
    pickupLocation: 'Sector 3, Malviya Nagar, Jaipur',
    address: 'Sector 3, Malviya Nagar, Jaipur',
    distance: '3.4 km',
    expiryStatus: 'Valid for 14 hours (Packaged)',
    urgency: 'Low',
    status: 'AVAILABLE',
    claimedBy: null,
    co2Saved: '15.2 kg',
    tags: ['bakery', 'packaged']
  },
  {
    id: 'DON-104',
    title: 'Steamed Basmati Rice & Paneer Butter Masala',
    foodType: 'Cooked Meal',
    category: 'Cooked Meal',
    donorName: 'Spice Garden Banquets',
    quantity: '30 Portions',
    cookedAt: 'Today, 2:00 PM',
    expiryEstimate: '4.5 Hours (AI Model)',
    aiHours: 4.5,
    storageCondition: 'Room Temp (25°C)',
    pickupLocation: 'Queens Road, Vaishali Nagar, Jaipur',
    address: 'Queens Road, Vaishali Nagar, Jaipur',
    distance: '7.2 km',
    expiryStatus: 'Valid for 4.5 hours (AI Score 93%)',
    urgency: 'Moderate',
    status: 'AVAILABLE',
    claimedBy: null,
    co2Saved: '26.0 kg',
    tags: ['vegetarian', 'banquet']
  },
  {
    id: 'DON-105',
    title: 'Vegetable Khichdi & Cooling Buttermilk',
    foodType: 'Cooked Meal',
    category: 'Cooked Meal',
    donorName: 'Central Kitchen Trust',
    quantity: '40 Portions',
    cookedAt: 'Today, 11:30 AM',
    expiryEstimate: '3.0 Hours (AI Model)',
    aiHours: 3.0,
    storageCondition: 'Room Temp (25°C)',
    pickupLocation: 'Sector 5, Mansarovar, Jaipur',
    address: 'Sector 5, Mansarovar, Jaipur',
    distance: '4.8 km',
    expiryStatus: 'Valid for 3.0 hours (Urgent)',
    urgency: 'High',
    status: 'AVAILABLE',
    claimedBy: null,
    co2Saved: '32.0 kg',
    tags: ['healthy', 'vegetarian']
  },
  {
    id: 'DON-106',
    title: 'Mixed Vegetable Curry & Steamed Rice',
    foodType: 'Cooked Meal',
    category: 'Cooked Meal',
    donorName: 'Central Kitchen Trust',
    quantity: '15 Portions',
    cookedAt: 'Yesterday, 8:00 PM',
    expiryEstimate: 'Handover Completed',
    aiHours: 0,
    storageCondition: 'Refrigerated (4°C)',
    pickupLocation: 'Central Kitchen, Mansarovar, Jaipur',
    address: 'Central Kitchen, Mansarovar, Jaipur',
    distance: '4.8 km',
    expiryStatus: 'Delivered & Verified',
    urgency: 'Low',
    status: 'COMPLETED',
    claimedBy: 'Jaipur Shelter Trust',
    co2Saved: '12.8 kg',
    tags: ['vegetarian']
  }
];

const INITIAL_CLAIMS = [
  {
    id: 'CLM-901',
    claimId: 'CLM-901',
    foodId: 'DON-102',
    ngoName: 'Asha Food Relief Society',
    foodTitle: 'Dal Makhani & Whole Wheat Roti',
    quantity: '40 Portions',
    requestedTime: 'Within 45 mins (Pickup Van En Route)',
    contactPhone: '+91 98290 11223',
    driverName: 'Ramesh Sharma (Volunteer)',
    driverPhone: '+91 98290 44556',
    vehicleNo: 'RJ-14-GA-4892 (Eco Van)',
    beneficiaryGroup: 'Jaipur Railway Station Relief Shelter',
    pickupAddress: 'Ramnagaria, Jagatpura, Jaipur',
    distance: '0.6 km',
    expiryStatus: 'Valid for 3.8 hours',
    pickupWindow: 'Within 45 mins',
    note: 'Distributing to night shelter near Jaipur Railway Station.',
    status: 'APPROVED',
    claimedAt: '25 mins ago',
    otpCode: '492815'
  }
];

export const FoodDataProvider = ({ children }) => {
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('carekart_food_listings');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_LISTINGS;
    } catch {
      return INITIAL_FOOD_LISTINGS;
    }
  });

  const [claims, setClaims] = useState(() => {
    try {
      const saved = localStorage.getItem('carekart_food_claims');
      return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
    } catch {
      return INITIAL_CLAIMS;
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('carekart_food_listings', JSON.stringify(listings));
    } catch (e) {
      console.error("Failed to save listings to localStorage", e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('carekart_food_claims', JSON.stringify(claims));
    } catch (e) {
      console.error("Failed to save claims to localStorage", e);
    }
  }, [claims]);

  // Action: Add new food listing (Donor)
  const addDonation = (newDonation) => {
    setListings(prev => [newDonation, ...prev]);
  };

  // Action: Request claim (Receiver NGO)
  const requestClaim = (claimRecord) => {
    setClaims(prev => [claimRecord, ...prev]);
    setListings(prev => prev.map(item => {
      if (item.id === claimRecord.foodId || item.title === claimRecord.foodTitle) {
        return {
          ...item,
          status: 'CLAIMED',
          claimedBy: claimRecord.ngoName || claimRecord.beneficiaryGroup
        };
      }
      return item;
    }));
  };

  // Action: Approve claim (Donor)
  const approveClaim = (claimId) => {
    let targetFoodTitle = '';
    setClaims(prev => prev.map(c => {
      if (c.id === claimId || c.claimId === claimId) {
        targetFoodTitle = c.foodTitle;
        return { ...c, status: 'APPROVED' };
      }
      return c;
    }));

    if (targetFoodTitle) {
      setListings(prev => prev.map(l => {
        if (l.title === targetFoodTitle) {
          return { ...l, status: 'CLAIMED' };
        }
        return l;
      }));
    }
  };

  // Action: Reject claim (Donor)
  const rejectClaim = (claimId) => {
    let targetFoodTitle = '';
    setClaims(prev => prev.filter(c => {
      if (c.id === claimId || c.claimId === claimId) {
        targetFoodTitle = c.foodTitle;
        return false;
      }
      return true;
    }));

    if (targetFoodTitle) {
      setListings(prev => prev.map(l => {
        if (l.title === targetFoodTitle) {
          return { ...l, status: 'AVAILABLE', claimedBy: null };
        }
        return l;
      }));
    }
  };

  // Action: Update claim status (Stepper: PENDING_APPROVAL -> APPROVED -> IN_TRANSIT -> COMPLETED)
  const updateClaimStatus = (claimId, newStatus) => {
    let targetFoodId = '';
    setClaims(prev => prev.map(c => {
      if (c.id === claimId || c.claimId === claimId) {
        targetFoodId = c.foodId;
        return { ...c, status: newStatus };
      }
      return c;
    }));

    if (newStatus === 'COMPLETED') {
      setListings(prev => prev.map(l => {
        if (l.id === targetFoodId) {
          return { ...l, status: 'COMPLETED' };
        }
        return l;
      }));
    }
  };

  // Action: Update food listing status directly
  const updateListingStatus = (listingId, newStatus) => {
    setListings(prev => prev.map(l => (l.id === listingId ? { ...l, status: newStatus } : l)));
  };

  // Action: Reset to clean academic viva demo data
  const resetToDemoData = () => {
    setListings(INITIAL_FOOD_LISTINGS);
    setClaims(INITIAL_CLAIMS);
    try {
      localStorage.setItem('carekart_food_listings', JSON.stringify(INITIAL_FOOD_LISTINGS));
      localStorage.setItem('carekart_food_claims', JSON.stringify(INITIAL_CLAIMS));
    } catch {}
  };

  // Computed global metrics
  const activeAvailableCount = listings.filter(l => l.status === 'AVAILABLE').length;
  const claimedCount = listings.filter(l => l.status === 'CLAIMED').length;
  const completedCount = listings.filter(l => l.status === 'COMPLETED').length;
  const totalMealsRedistributed = (completedCount * 30) + 15420;

  return (
    <FoodDataContext.Provider
      value={{
        listings,
        claims,
        addDonation,
        requestClaim,
        approveClaim,
        rejectClaim,
        updateClaimStatus,
        updateListingStatus,
        resetToDemoData,
        metrics: {
          available: activeAvailableCount,
          claimed: claimedCount,
          completed: completedCount,
          totalMeals: totalMealsRedistributed,
          co2OffsetKg: 365 + (completedCount * 18)
        }
      }}
    >
      {children}
    </FoodDataContext.Provider>
  );
};

export const useFoodData = () => {
  const context = useContext(FoodDataContext);
  if (!context) {
    throw new Error('useFoodData must be used within a FoodDataProvider');
  }
  return context;
};
