import React from 'react';
import { 
  Building2, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Bell, 
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';

/**
 * Claim Requests Notification & Coordination Panel
 * Allows Donors to approve pending claims from verified NGOs in Jaipur.
 */
export const ClaimNotificationPanel = ({ claims, onApprove, onReject }) => {
  if (!claims || claims.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <Bell className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">No Pending Claim Requests</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          When a registered NGO or community shelter requests pickup for your listings, their requests will appear here for one-click verification.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {claims.map((claim) => (
        <div
          key={claim.id}
          className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs hover:shadow-md transition-all space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{claim.ngoName}</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified NGO
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Requested item: <strong className="text-slate-800">{claim.foodTitle}</strong> ({claim.quantity})
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Pending Donor Approval
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Requested Pickup: <strong>{claim.requestedTime}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Contact: <strong>{claim.contactPhone}</strong></span>
            </div>
          </div>

          {claim.note && (
            <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
              "{claim.note}"
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onReject && onReject(claim.id)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => onApprove && onApprove(claim.id)}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approve & Issue Pickup Pass</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
