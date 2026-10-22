import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  QrCode, 
  ChevronRight,
  ExternalLink,
  Navigation
} from 'lucide-react';

/**
 * Active Claim Tracker & Handover Verification Component
 * Displays live progress stepper, pickup pass, and donor communication for NGOs.
 */
export const ActiveClaimTracker = ({ claims, onUpdateStatus }) => {
  const [otpInputs, setOtpInputs] = useState({});

  if (!claims || claims.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
          <Truck className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800 text-base">No Active Pickup Claims</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore the surplus food feed and request a claim. Your active pickup dispatches and verification OTPs will appear here.
        </p>
      </div>
    );
  }

  const getStepProgress = (status) => {
    switch (status) {
      case 'PENDING_APPROVAL':
        return 1;
      case 'APPROVED':
        return 2;
      case 'IN_TRANSIT':
        return 3;
      case 'COMPLETED':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="space-y-6">
      {claims.map((claim) => {
        const currentStep = getStepProgress(claim.status);

        return (
          <div
            key={claim.claimId}
            className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400/80 transition-all shadow-xs hover:shadow-md p-6 space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {claim.claimId}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Claimed {claim.claimedAt}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{claim.foodTitle}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Donor: <strong className="text-slate-800">{claim.donorName}</strong> • {claim.quantity}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  claim.status === 'COMPLETED'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : claim.status === 'APPROVED'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {claim.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Visual 4-Step Progress Stepper */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                {[
                  { step: 1, title: 'Requested', desc: 'Awaiting Donor' },
                  { step: 2, title: 'Approved', desc: 'Pass Generated' },
                  { step: 3, title: 'En Route', desc: 'Driver Moving' },
                  { step: 4, title: 'Delivered', desc: 'Handover Verified' },
                ].map((s) => {
                  const isDone = currentStep >= s.step;
                  const isCurrent = currentStep === s.step;

                  return (
                    <div key={s.step} className="flex flex-col items-center text-center relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isDone
                          ? 'bg-amber-600 text-white shadow-xs ring-4 ring-amber-100'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                      </div>
                      <span className={`text-xs font-bold mt-2 ${isCurrent ? 'text-amber-900' : 'text-slate-600'}`}>
                        {s.title}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:block">
                        {s.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pickup Location & Assigned Driver Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Pickup Location</span>
                    <span>{claim.pickupAddress}</span>
                    <span className="text-emerald-700 font-bold block mt-0.5">Distance: {claim.distance}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Scheduled Pickup: <strong>{claim.pickupWindow}</strong></span>
                </div>
              </div>

              <div className="space-y-2 md:border-l md:border-slate-200 md:pl-4">
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Assigned Volunteer & Vehicle</span>
                    <span>{claim.driverName} • {claim.driverPhone}</span>
                    <span className="font-mono text-[11px] text-slate-500 block">Reg: {claim.vehicleNo}</span>
                  </div>
                </div>

                <div className="text-slate-500 pt-1">
                  Shelter Target: <strong className="text-slate-700">{claim.beneficiaryGroup}</strong>
                </div>
              </div>
            </div>

            {/* Handover OTP Pass & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 uppercase">Verification OTP:</span>
                  <span className="font-mono font-black text-amber-900 text-base tracking-widest">
                    {claim.otpCode || '582914'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 max-w-[200px]">
                  Provide this code to the donor kitchen staff at handover.
                </span>
              </div>

              <div className="flex items-center gap-2">
                {claim.status === 'PENDING_APPROVAL' && (
                  <button
                    onClick={() => onUpdateStatus && onUpdateStatus(claim.claimId, 'APPROVED')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Simulate Donor Approval
                  </button>
                )}

                {claim.status === 'APPROVED' && (
                  <button
                    onClick={() => onUpdateStatus && onUpdateStatus(claim.claimId, 'IN_TRANSIT')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Dispatch Volunteer</span>
                  </button>
                )}

                {claim.status === 'IN_TRANSIT' && (
                  <button
                    onClick={() => onUpdateStatus && onUpdateStatus(claim.claimId, 'COMPLETED')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Handover (Complete)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
