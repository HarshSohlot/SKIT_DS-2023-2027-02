import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  MapPin, 
  Clock, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  Users
} from 'lucide-react';

/**
 * Claim Food Donation Modal (Sprint 3 Web Dashboard Design - 75% Milestone)
 * Allows registered NGOs to claim surplus food, assign pickup drivers, and schedule delivery.
 */
export const ClaimFoodModal = ({ isOpen, onClose, foodItem, onConfirmClaim }) => {
  if (!isOpen || !foodItem) return null;

  const [claimData, setClaimData] = useState({
    portionsToClaim: foodItem.quantity.split(' ')[0] || '25',
    pickupTimeWindow: 'Within 45 Minutes (Express Pickup)',
    driverName: 'Ramesh Sharma (Volunteer)',
    driverPhone: '+91 98290 44556',
    vehicleNo: 'RJ-14-GA-4892 (Eco Van)',
    beneficiaryGroup: 'Jaipur Railway Station Relief Shelter',
    notes: 'Transporting with insulated thermal hot-boxes for immediate hot serving.',
    safetyAgreement: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimData.safetyAgreement) return;

    const claimRecord = {
      claimId: `CLM-${Date.now().toString().slice(-4)}`,
      foodId: foodItem.id,
      foodTitle: foodItem.title,
      donorName: foodItem.donorName,
      quantity: `${claimData.portionsToClaim} Portions`,
      pickupAddress: foodItem.address,
      distance: foodItem.distance,
      expiryStatus: foodItem.expiryStatus,
      pickupWindow: claimData.pickupTimeWindow,
      driverName: claimData.driverName,
      driverPhone: claimData.driverPhone,
      vehicleNo: claimData.vehicleNo,
      beneficiaryGroup: claimData.beneficiaryGroup,
      status: 'PENDING_APPROVAL',
      claimedAt: 'Just now',
      otpCode: Math.floor(100000 + Math.random() * 900000).toString()
    };

    onConfirmClaim(claimRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Request Food Claim</h3>
              <p className="text-xs text-amber-100">
                Direct NGO Pickup Coordination & Distribution Scheduling
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Item Recap Card */}
        <div className="p-6 bg-amber-50/60 border-b border-amber-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-800">
                #{foodItem.id}
              </span>
              <span className="text-xs font-bold text-amber-900">
                {foodItem.donorName}
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">{foodItem.title}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{foodItem.address}</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                {foodItem.distance}
              </span>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-xs font-bold text-slate-400 uppercase block">AI Freshness</span>
            <span className="text-sm font-black text-emerald-700 flex items-center sm:justify-end gap-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {foodItem.expiryStatus}
            </span>
            <span className="text-xs font-bold text-slate-700 block mt-0.5">
              Available: {foodItem.quantity}
            </span>
          </div>
        </div>

        {/* Claim Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Section 1: Portions & Pickup Window */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>1. Allocation & Pickup Window</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Portions to Claim *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    required
                    value={claimData.portionsToClaim}
                    onChange={(e) => setClaimData({ ...claimData, portionsToClaim: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold outline-hidden"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">
                    Portions
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Pickup Window *
                </label>
                <select
                  value={claimData.pickupTimeWindow}
                  onChange={(e) => setClaimData({ ...claimData, pickupTimeWindow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium outline-hidden bg-white"
                >
                  <option value="Within 30 Minutes (Urgent Hot Delivery)">Within 30 Minutes (Urgent Hot Delivery)</option>
                  <option value="Within 45 Minutes (Express Pickup)">Within 45 Minutes (Express Pickup)</option>
                  <option value="Within 1 - 2 Hours">Within 1 - 2 Hours</option>
                  <option value="Today Evening (Before 7:00 PM)">Today Evening (Before 7:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Driver & Logistics Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>2. Assigned Volunteer & Vehicle Logistics</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Volunteer / Driver Name
                </label>
                <input
                  type="text"
                  required
                  value={claimData.driverName}
                  onChange={(e) => setClaimData({ ...claimData, driverName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-xs font-medium outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Driver Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={claimData.driverPhone}
                  onChange={(e) => setClaimData({ ...claimData, driverPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-xs font-medium outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vehicle Registration
                </label>
                <input
                  type="text"
                  required
                  value={claimData.vehicleNo}
                  onChange={(e) => setClaimData({ ...claimData, vehicleNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-xs font-medium outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Beneficiary Group & Safety Note */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Beneficiary Shelter & Distribution Details</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Designated Community Center / Beneficiary Group *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sindhi Camp Night Shelter, Jaipur"
                value={claimData.beneficiaryGroup}
                onChange={(e) => setClaimData({ ...claimData, beneficiaryGroup: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium outline-hidden"
              />
            </div>

            {/* Food Safety Compliance Checkbox */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
              <input
                type="checkbox"
                id="safetyCheck"
                checked={claimData.safetyAgreement}
                onChange={(e) => setClaimData({ ...claimData, safetyAgreement: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="safetyCheck" className="text-xs text-slate-600 cursor-pointer leading-relaxed">
                <strong>Zero-Waste Food Safety Pledge:</strong> Our NGO verifies that we possess insulated food containers and will distribute this surplus meal within the AI-predicted shelf-life window.
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!claimData.safetyAgreement}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black text-xs shadow-md shadow-amber-600/20 cursor-pointer transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Dispatch Driver</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
