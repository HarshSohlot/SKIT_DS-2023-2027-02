import React, { useState } from 'react';
import { 
  Megaphone, 
  PlusCircle, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Building2,
  X,
  Share2
} from 'lucide-react';

/**
 * NGO Community Relief Needs & Broadcast Board
 * Enables NGOs to post urgent food shortages for donors to fulfill directly.
 */
export const NgoNeedsBoard = () => {
  const [needs, setNeeds] = useState([
    {
      id: 'NEED-101',
      orgName: 'Asha Food Relief Society',
      title: 'Urgent Dinner Meals for Sindhi Camp Night Shelter',
      quantityNeeded: '60 Portions (Cooked Food)',
      urgency: 'HIGH',
      location: 'Near Jaipur Railway Station, Sindhi Camp',
      requiredBy: 'Today by 7:30 PM',
      beneficiaries: 'Homeless individuals & elderly',
      status: 'OPEN'
    },
    {
      id: 'NEED-102',
      orgName: 'Smile Children Trust',
      title: 'Fresh Milk & Bakery Breads for Breakfast Program',
      quantityNeeded: '25 Packs Milk / Bread',
      urgency: 'MEDIUM',
      location: 'Sector 4, Mansarovar, Jaipur',
      requiredBy: 'Tomorrow morning 8:00 AM',
      beneficiaries: '45 Orphanage children',
      status: 'OPEN'
    },
    {
      id: 'NEED-103',
      orgName: 'Jaipur Community Kitchen',
      title: 'Whole Grain Flour (Atta) & Rice for Community Langar',
      quantityNeeded: '50 kg Raw Grains',
      urgency: 'LOW',
      location: 'Jagatpura Road, Jaipur',
      requiredBy: 'This weekend',
      beneficiaries: 'Slum development initiative',
      status: 'FULFILLED'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newNeed, setNewNeed] = useState({
    title: '',
    quantityNeeded: '',
    urgency: 'HIGH',
    location: 'Jagatpura, Jaipur',
    requiredBy: 'Today by 8:00 PM',
    beneficiaries: ''
  });

  const handleCreateNeed = (e) => {
    e.preventDefault();
    if (!newNeed.title || !newNeed.quantityNeeded) return;

    const item = {
      id: `NEED-${Date.now().toString().slice(-3)}`,
      orgName: 'My NGO (Verified Partner)',
      title: newNeed.title,
      quantityNeeded: newNeed.quantityNeeded,
      urgency: newNeed.urgency,
      location: newNeed.location,
      requiredBy: newNeed.requiredBy,
      beneficiaries: newNeed.beneficiaries || 'Local Community Members',
      status: 'OPEN'
    };

    setNeeds([item, ...needs]);
    setShowAddModal(false);
    setNewNeed({
      title: '',
      quantityNeeded: '',
      urgency: 'HIGH',
      location: 'Jagatpura, Jaipur',
      requiredBy: 'Today by 8:00 PM',
      beneficiaries: ''
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-2">
            <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Community Relief Broadcast Center</span>
          </div>
          <h3 className="text-xl font-black">Broadcast Community Food Needs</h3>
          <p className="text-slate-300 text-xs max-w-xl mt-1">
            Facing a sudden shortage at your shelter or relief distribution camp? Post a broadcast so nearby catering banquets and college messes can respond.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start md:self-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg cursor-pointer transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Relief Need</span>
        </button>
      </div>

      {/* Broadcast Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {needs.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  #{item.id}
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  item.status === 'FULFILLED'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : item.urgency === 'HIGH'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {item.status === 'FULFILLED' ? 'Fulfilled' : `${item.urgency} Urgency`}
                </span>
              </div>

              <h4 className="text-base font-black text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">By {item.orgName}</p>

              <div className="mt-4 p-3 bg-slate-50 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Requirement:</span>
                  <span className="font-bold text-slate-800">{item.quantityNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Needed By:</span>
                  <span className="font-bold text-amber-700">{item.requiredBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Beneficiaries:</span>
                  <span className="font-semibold text-slate-700 truncate max-w-[140px]">{item.beneficiaries}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>

              {item.status !== 'FULFILLED' && (
                <span className="font-bold text-emerald-600 shrink-0">Open for Donors</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Relief Need Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">Broadcast Relief Food Need</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNeed} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Relief Requirement Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need 40 Cooked Meals for Flood Relief Shelter"
                  value={newNeed.title}
                  onChange={(e) => setNewNeed({ ...newNeed, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Quantity Needed *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 Portions"
                    value={newNeed.quantityNeeded}
                    onChange={(e) => setNewNeed({ ...newNeed, quantityNeeded: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={newNeed.urgency}
                    onChange={(e) => setNewNeed({ ...newNeed, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium outline-hidden focus:border-amber-500 bg-white"
                  >
                    <option value="HIGH">High (Immediate Need)</option>
                    <option value="MEDIUM">Medium (Within 24 Hours)</option>
                    <option value="LOW">Low (Regular Ration)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Shelter Location *
                </label>
                <input
                  type="text"
                  required
                  value={newNeed.location}
                  onChange={(e) => setNewNeed({ ...newNeed, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-xs"
                >
                  Broadcast Need
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
