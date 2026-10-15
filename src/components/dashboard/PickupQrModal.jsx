import React from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Clock, MapPin, Download } from 'lucide-react';

/**
 * Handover & Verification QR Pass Modal
 * Allows donors to verify physical handover to the NGO pickup driver
 */
export const PickupQrModal = ({ isOpen, onClose, item, onConfirmHandover }) => {
  if (!isOpen || !item) return null;

  const otpCode = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-2">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-black tracking-tight">CareKart Handover Pass</h3>
          <p className="text-xs text-emerald-200 mt-0.5">
            Show this QR code or 6-digit OTP to the pickup driver
          </p>
        </div>

        <div className="p-6 text-center space-y-5">
          
          {/* Simulated QR Code Box */}
          <div className="bg-slate-50 border-2 border-dashed border-emerald-300 rounded-2xl p-6 mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-inner relative group">
            <div className="grid grid-cols-6 gap-1 w-32 h-32 p-1 bg-white border border-slate-200 rounded-lg shadow-xs">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${
                    (i % 2 === 0 && i % 3 === 0) || i % 7 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                      ? 'bg-slate-900'
                      : 'bg-emerald-600/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2">
              CAREKART-SECURE-PASS
            </span>
          </div>

          {/* 6-Digit OTP Alternative */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Alternative Pickup OTP Code
            </span>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xl font-mono font-black text-emerald-800 tracking-widest">
              {otpCode}
            </div>
          </div>

          {/* Item Recap */}
          <div className="bg-slate-50 rounded-xl p-3 text-left text-xs space-y-1.5 text-slate-600 border border-slate-100">
            <div className="flex justify-between font-bold text-slate-800">
              <span>{item.title}</span>
              <span className="text-emerald-700">{item.quantity}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{item.pickupLocation}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Expires in {item.expiryEstimate}</span>
            </div>
          </div>

          {/* Confirm Handover Button */}
          <button
            onClick={() => {
              if (onConfirmHandover) onConfirmHandover(item.id);
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-700/20 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Handover Completed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
