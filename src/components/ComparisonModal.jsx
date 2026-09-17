import React from 'react';
import { X, Scale } from 'lucide-react';

export default function ComparisonModal({ isOpen, onClose, compareList, onRemoveItem }) {
  if (!isOpen) return null;

  const itemA = compareList[0];
  const itemB = compareList[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative bg-white border border-slate-200 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
              <Scale className="w-4 h-4 text-[#FF4B82]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Side-by-Side Food Comparison</h3>
              <p className="text-xs text-slate-500 font-medium">Compare nutrition, additives, and traffic light health scores before buying</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Empty state */}
        {compareList.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Scale className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <p className="text-sm font-bold text-slate-900">No products selected for comparison</p>
            <p className="text-xs text-slate-500">Click "Compare" on any scanned food report to add up to 2 items</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ITEM A */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
              {itemA && (
                <>
                  <button 
                    onClick={() => onRemoveItem(itemA.id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img src={itemA.image} alt={itemA.name} className="w-full h-36 object-cover rounded-xl mb-3 bg-white border border-slate-200" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    itemA.rating === 'Green' ? 'badge-green' : itemA.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    Score: {itemA.score}/100 • {itemA.rating}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1 font-['Outfit']">{itemA.name}</h4>
                  <p className="text-xs text-slate-500 mb-4 font-semibold">{itemA.brand}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Calories:</span>
                      <span className="font-extrabold text-slate-900">{itemA.caloriesPerServing} kcal</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Protein:</span>
                      <span className="font-extrabold text-emerald-600">{itemA.macros?.protein}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Sugar:</span>
                      <span className="font-extrabold text-purple-600">{itemA.macros?.sugar}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Sodium:</span>
                      <span className="font-extrabold text-rose-600">{itemA.macros?.sodium}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>Additives Count:</span>
                      <span className="font-extrabold text-amber-600">{itemA.additives?.length || 0}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ITEM B */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
              {itemB ? (
                <>
                  <button 
                    onClick={() => onRemoveItem(itemB.id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img src={itemB.image} alt={itemB.name} className="w-full h-36 object-cover rounded-xl mb-3 bg-white border border-slate-200" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    itemB.rating === 'Green' ? 'badge-green' : itemB.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    Score: {itemB.score}/100 • {itemB.rating}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1 font-['Outfit']">{itemB.name}</h4>
                  <p className="text-xs text-slate-500 mb-4 font-semibold">{itemB.brand}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Calories:</span>
                      <span className="font-extrabold text-slate-900">{itemB.caloriesPerServing} kcal</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Protein:</span>
                      <span className="font-extrabold text-emerald-600">{itemB.macros?.protein}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Sugar:</span>
                      <span className="font-extrabold text-purple-600">{itemB.macros?.sugar}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                      <span>Sodium:</span>
                      <span className="font-extrabold text-rose-600">{itemB.macros?.sodium}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-700">
                      <span>Additives Count:</span>
                      <span className="font-extrabold text-amber-600">{itemB.additives?.length || 0}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                  <Scale className="w-8 h-8 mb-2 text-slate-400" />
                  <p className="text-xs font-bold text-slate-700">Select 2nd Food Item</p>
                  <p className="text-[11px] text-slate-500 font-medium">Scan or select another product from the main page to enable comparison</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
