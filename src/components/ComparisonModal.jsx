import React from 'react';
import { X, Scale, Trophy, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ComparisonModal({ isOpen, onClose, compareList, onRemoveItem }) {
  if (!isOpen) return null;

  const itemA = compareList[0];
  const itemB = compareList[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF4B82]/20 border border-[#FF4B82]/30 flex items-center justify-center">
              <Scale className="w-4 h-4 text-[#FF4B82]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">Side-by-Side Food Comparison</h3>
              <p className="text-xs text-slate-400">Compare nutrition, additives, and traffic light health scores before buying</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Empty state */}
        {compareList.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Scale className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-white">No products selected for comparison</p>
            <p className="text-xs text-slate-400">Click "Compare" on any scanned food report to add up to 2 items</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ITEM A */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 relative">
              {itemA && (
                <>
                  <button 
                    onClick={() => onRemoveItem(itemA.id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-rose-500/20 text-rose-400 hover:bg-rose-500/40"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img src={itemA.image} alt={itemA.name} className="w-full h-36 object-cover rounded-xl mb-3" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    itemA.rating === 'Green' ? 'badge-green' : itemA.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    Score: {itemA.score}/100 • {itemA.rating}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1 font-['Outfit']">{itemA.name}</h4>
                  <p className="text-xs text-slate-400 mb-4">{itemA.brand}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Calories:</span>
                      <span className="font-bold text-white">{itemA.caloriesPerServing} kcal</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Protein:</span>
                      <span className="font-bold text-emerald-400">{itemA.macros?.protein}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Sugar:</span>
                      <span className="font-bold text-purple-400">{itemA.macros?.sugar}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Sodium:</span>
                      <span className="font-bold text-rose-400">{itemA.macros?.sodium}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Additives Count:</span>
                      <span className="font-bold text-amber-400">{itemA.additives?.length || 0}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ITEM B */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 relative">
              {itemB ? (
                <>
                  <button 
                    onClick={() => onRemoveItem(itemB.id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-rose-500/20 text-rose-400 hover:bg-rose-500/40"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img src={itemB.image} alt={itemB.name} className="w-full h-36 object-cover rounded-xl mb-3" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    itemB.rating === 'Green' ? 'badge-green' : itemB.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    Score: {itemB.score}/100 • {itemB.rating}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1 font-['Outfit']">{itemB.name}</h4>
                  <p className="text-xs text-slate-400 mb-4">{itemB.brand}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Calories:</span>
                      <span className="font-bold text-white">{itemB.caloriesPerServing} kcal</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Protein:</span>
                      <span className="font-bold text-emerald-400">{itemB.macros?.protein}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Sugar:</span>
                      <span className="font-bold text-purple-400">{itemB.macros?.sugar}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                      <span>Sodium:</span>
                      <span className="font-bold text-rose-400">{itemB.macros?.sodium}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Additives Count:</span>
                      <span className="font-bold text-amber-400">{itemB.additives?.length || 0}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/10 rounded-2xl text-slate-500">
                  <Scale className="w-8 h-8 mb-2" />
                  <p className="text-xs font-semibold text-slate-300">Select 2nd Food Item</p>
                  <p className="text-[11px] text-slate-500">Scan or select another product from the main page to enable comparison</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
