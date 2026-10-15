import React from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  QrCode, 
  Building2, 
  Utensils, 
  ArrowRight,
  ShieldCheck,
  Package
} from 'lucide-react';

/**
 * High-Fidelity Food Listing Card
 * Displays donation details, AI shelf-life estimation, and status workflows.
 */
export const FoodListingCard = ({ 
  item, 
  onShowQr, 
  onStatusChange 
}) => {
  // Determine freshness risk level badge based on AI prediction
  const getRiskIndicator = () => {
    const hours = item.aiHours || 5;
    if (hours >= 6) {
      return {
        label: 'Safe Shelf-Life',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500'
      };
    } else if (hours >= 3) {
      return {
        label: 'Moderate Urgency',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500'
      };
    } else {
      return {
        label: 'High Urgency (Consume Soon)',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500 animate-pulse'
      };
    }
  };

  const risk = getRiskIndicator();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all duration-200 shadow-xs hover:shadow-md p-5 flex flex-col justify-between gap-4">
      
      {/* Card Header: ID, Category & Status */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              #{item.id}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
              {item.foodType || 'Cooked Meal'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Status Badge */}
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            item.status === 'AVAILABLE'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : item.status === 'CLAIMED'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {item.status}
        </span>
      </div>

      {/* Information Grid: Quantity, AI Shelf Life, Cooking Time */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 font-medium block text-[11px]">Quantity</span>
          <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
            <Utensils className="w-3.5 h-3.5 text-slate-500" />
            {item.quantity}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-medium block text-[11px]">AI Shelf-Life</span>
          <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5" title="Predicted by Harshit's Random Forest Model">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {item.expiryEstimate || `${item.aiHours || 5} Hours`}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="text-slate-400 font-medium block text-[11px]">Logged At</span>
          <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {item.cookedAt}
          </span>
        </div>
      </div>

      {/* AI Risk & Quality Assessment Pill */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${risk.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
          <span>{risk.label}</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[180px] sm:max-w-[220px]" title={item.pickupLocation}>
            {item.pickupLocation}
          </span>
        </div>
      </div>

      {/* Claimed Details (if claimed by NGO) */}
      {item.claimedBy && (
        <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold text-amber-900 block">Claimed by: {item.claimedBy}</span>
              <span className="text-[11px] text-amber-700">Pickup window: Today before 8:00 PM</span>
            </div>
          </div>
          <button
            onClick={() => onShowQr && onShowQr(item)}
            className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1 text-xs shrink-0 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Pass</span>
          </button>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">
          Storage: {item.storageCondition || 'Room Temp (25°C)'}
        </span>

        <div className="flex items-center gap-2">
          {item.status === 'AVAILABLE' && (
            <button
              onClick={() => onShowQr && onShowQr(item)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1 text-xs cursor-pointer transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-500" />
              <span>QR Code</span>
            </button>
          )}

          {item.status === 'CLAIMED' && (
            <button
              onClick={() => onStatusChange && onStatusChange(item.id, 'COMPLETED')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 text-xs cursor-pointer transition-all shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm Handover</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
