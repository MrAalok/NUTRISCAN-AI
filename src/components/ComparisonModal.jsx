import React, { useState } from 'react';
import { X, Scale, Search } from 'lucide-react';

export default function ComparisonModal({
  isOpen,
  onClose,
  compareList = [],
  setCompareList,
  onRemoveItem,
  allProducts = []
}) {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [isChangingA, setIsChangingA] = useState(false);
  const [isChangingB, setIsChangingB] = useState(false);

  if (!isOpen) return null;

  const itemA = compareList[0] || null;
  const itemB = compareList[1] || null;

  const handleSelectProductForSlot = (product, slotIndex) => {
    const updated = [...compareList];
    updated[slotIndex] = product;
    setCompareList(updated.filter(Boolean));
    if (slotIndex === 0) setIsChangingA(false);
    if (slotIndex === 1) setIsChangingB(false);
  };

  const handleQuickPreset = (prodA, prodB) => {
    if (prodA && prodB) {
      setCompareList([prodA, prodB]);
      setIsChangingA(false);
      setIsChangingB(false);
    }
  };

  // Pre-configured comparisons for quick selection
  const maggi = allProducts.find(p => p.id === 'maggi-2min' || p.name.includes('Maggi'));
  const slurrp = allProducts.find(p => p.name.includes('Slurrp') || p.name.includes('Millet'));
  const monaco = allProducts.find(p => p.id === 'parle-monaco-salty' || p.name.includes('Monaco'));
  const cadbury = allProducts.find(p => p.id === 'cadbury-dairy-milk' || p.name.includes('Cadbury'));
  const parleG = allProducts.find(p => p.id === 'parle-g-biscuits' || p.name.includes('Parle-G'));

  // Filter products for dropdown
  const filteredProductsA = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchA.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchA.toLowerCase())
  );

  const filteredProductsB = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchB.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchB.toLowerCase())
  );

  // Helper numerical extractor for comparison (e.g. "860mg" -> 860, "7.8g" -> 7.8)
  const parseVal = (valStr) => {
    if (!valStr) return 0;
    const match = String(valStr).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Determine winner when both items are present
  let winner = null;
  let loser = null;
  if (itemA && itemB) {
    if (itemA.score >= itemB.score) {
      winner = itemA;
      loser = itemB;
    } else {
      winner = itemB;
      loser = itemA;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl my-auto max-h-[92vh] overflow-y-auto p-4 sm:p-6 relative bg-white border border-slate-200 shadow-2xl rounded-3xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF4B82] to-[#6366F1] flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
                Food Product Comparison Studio
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Compare nutrition, additives & health scores to choose the safest food item
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-slate-100 text-xs font-semibold">
          <span className="text-slate-400 font-bold shrink-0">Quick Compare:</span>
          {maggi && slurrp && (
            <button 
              onClick={() => handleQuickPreset(maggi, slurrp)}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              🍜 Maggi vs Slurrp Millet Noodles
            </button>
          )}
          {monaco && cadbury && (
            <button 
              onClick={() => handleQuickPreset(monaco, cadbury)}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              🍪 Monaco Biscuit vs Cadbury
            </button>
          )}
          {maggi && parleG && (
            <button 
              onClick={() => handleQuickPreset(maggi, parleG)}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              ⚡ Maggi vs Parle-G
            </button>
          )}
        </div>

        {/* TOP WINNER BANNER (IF BOTH ITEMS SELECTED) */}
        {itemA && itemB && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-50 to-rose-500/10 border border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
                  🟢
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-wider uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    HEALTHIER CHOICE WINNER
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5 font-['Outfit']">
                    {winner.name} (Score: {winner.score}/100)
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {winner.name} is significantly safer than {loser.name} (Score: {loser.score}/100) with better nutritional balance.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                <span>{itemA.name.split(' ')[0]}</span>
                <span className="text-slate-400">vs</span>
                <span>{itemB.name.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        )}

        {/* COMPARISON SLOTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* PRODUCT A SLOT */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <span className="text-xs font-black tracking-wider uppercase text-slate-500">
                PRODUCT 1
              </span>
              {itemA && !isChangingA && (
                <button 
                  onClick={() => setIsChangingA(true)}
                  className="text-xs font-bold text-[#6366F1] hover:underline"
                >
                  Change Product
                </button>
              )}
            </div>

            {(!itemA || isChangingA) ? (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-700">Select Product 1 for comparison:</p>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search food item (e.g. Maggi, Monaco, Cadbury)..."
                    value={searchA}
                    onChange={(e) => setSearchA(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4B82]"
                  />
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                  {filteredProductsA.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProductForSlot(prod, 0)}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#FF4B82] hover:bg-rose-50/50 cursor-pointer transition-all flex items-center gap-3"
                    >
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg bg-slate-100" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h5>
                        <p className="text-[10px] text-slate-500 truncate">{prod.brand}</p>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        prod.rating === 'Green' ? 'bg-emerald-100 text-emerald-700' : prod.rating === 'Yellow' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {prod.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="relative mb-3">
                  <img src={itemA.image} alt={itemA.name} className="w-full h-40 object-cover rounded-xl bg-white border border-slate-200 shadow-inner" />
                  <button 
                    onClick={() => onRemoveItem(itemA.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    itemA.rating === 'Green' ? 'badge-green' : itemA.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    Score: {itemA.score}/100 • {itemA.rating} Rating
                  </span>
                  {winner?.id === itemA.id && itemB && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      ✓ WINNER
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 font-['Outfit'] leading-snug">{itemA.name}</h4>
                <p className="text-xs text-slate-500 font-semibold mb-3">{itemA.brand}</p>
              </div>
            )}
          </div>

          {/* PRODUCT B SLOT */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <span className="text-xs font-black tracking-wider uppercase text-slate-500">
                PRODUCT 2
              </span>
              {itemB && !isChangingB && (
                <button 
                  onClick={() => setIsChangingB(true)}
                  className="text-xs font-bold text-[#6366F1] hover:underline"
                >
                  Change Product
                </button>
              )}
            </div>

            {(!itemB || isChangingB) ? (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-700">Select Product 2 for comparison:</p>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search food item (e.g. Slurrp Farm, Quaker Oats)..."
                    value={searchB}
                    onChange={(e) => setSearchB(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                  {filteredProductsB.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProductForSlot(prod, 1)}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#6366F1] hover:bg-indigo-50/50 cursor-pointer transition-all flex items-center gap-3"
                    >
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg bg-slate-100" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h5>
                        <p className="text-[10px] text-slate-500 truncate">{prod.brand}</p>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        prod.rating === 'Green' ? 'bg-emerald-100 text-emerald-700' : prod.rating === 'Yellow' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {prod.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="relative mb-3">
                  <img src={itemB.image} alt={itemB.name} className="w-full h-40 object-cover rounded-xl bg-white border border-slate-200 shadow-inner" />
                  <button 
                    onClick={() => onRemoveItem(itemB.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    itemB.rating === 'Green' ? 'badge-green' : itemB.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    Score: {itemB.score}/100 • {itemB.rating} Rating
                  </span>
                  {winner?.id === itemB.id && itemA && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      ✓ WINNER
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 font-['Outfit'] leading-snug">{itemB.name}</h4>
                <p className="text-xs text-slate-500 font-semibold mb-3">{itemB.brand}</p>
              </div>
            )}
          </div>

        </div>

        {/* DETAILED METRICS SIDE-BY-SIDE TABLE */}
        {itemA && itemB && (
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-900 text-white px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
              <span>Nutritional & Safety Breakdown Comparison</span>
              <span>FSSAI Standards</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              
              {/* Score Metric */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-50/80">
                <span className="font-extrabold text-slate-700">Health Score (0-100)</span>
                <div className="text-center font-extrabold">
                  <span className={`px-2 py-0.5 rounded-md ${itemA.score > itemB.score ? 'bg-emerald-100 text-emerald-800' : 'text-slate-900'}`}>
                    {itemA.score}/100
                  </span>
                </div>
                <div className="text-center font-extrabold">
                  <span className={`px-2 py-0.5 rounded-md ${itemB.score > itemA.score ? 'bg-emerald-100 text-emerald-800' : 'text-slate-900'}`}>
                    {itemB.score}/100
                  </span>
                </div>
              </div>

              {/* Calories */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-50/80">
                <span className="font-semibold text-slate-600">Calories (Per Serving)</span>
                <span className="text-center font-bold text-slate-900">{itemA.caloriesPerServing} kcal</span>
                <span className="text-center font-bold text-slate-900">{itemB.caloriesPerServing} kcal</span>
              </div>

              {/* Sugar */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-50/80">
                <span className="font-semibold text-slate-600">Added Sugar</span>
                <div className="text-center font-bold">
                  <span className={parseVal(itemA.macros?.sugar) > parseVal(itemB.macros?.sugar) ? 'text-rose-600 font-extrabold' : 'text-slate-800'}>
                    {itemA.macros?.sugar || 'N/A'} {parseVal(itemA.macros?.sugar) > parseVal(itemB.macros?.sugar) && '⚠️ High'}
                  </span>
                </div>
                <div className="text-center font-bold">
                  <span className={parseVal(itemB.macros?.sugar) > parseVal(itemA.macros?.sugar) ? 'text-rose-600 font-extrabold' : 'text-slate-800'}>
                    {itemB.macros?.sugar || 'N/A'} {parseVal(itemB.macros?.sugar) > parseVal(itemA.macros?.sugar) && '⚠️ High'}
                  </span>
                </div>
              </div>

              {/* Sodium */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-50/80">
                <span className="font-semibold text-slate-600">Sodium Concentration</span>
                <div className="text-center font-bold">
                  <span className={parseVal(itemA.macros?.sodium) > parseVal(itemB.macros?.sodium) ? 'text-rose-600 font-extrabold' : 'text-emerald-700'}>
                    {itemA.macros?.sodium || 'N/A'} {parseVal(itemA.macros?.sodium) > parseVal(itemB.macros?.sodium) && '🔴 High Sodium'}
                  </span>
                </div>
                <div className="text-center font-bold">
                  <span className={parseVal(itemB.macros?.sodium) > parseVal(itemA.macros?.sodium) ? 'text-rose-600 font-extrabold' : 'text-emerald-700'}>
                    {itemB.macros?.sodium || 'N/A'} {parseVal(itemB.macros?.sodium) > parseVal(itemA.macros?.sodium) && '🔴 High Sodium'}
                  </span>
                </div>
              </div>

              {/* Protein */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-50/80">
                <span className="font-semibold text-slate-600">Dietary Protein</span>
                <span className={`text-center font-bold ${parseVal(itemA.macros?.protein) > parseVal(itemB.macros?.protein) ? 'text-emerald-600 font-extrabold' : 'text-slate-800'}`}>
                  {itemA.macros?.protein || 'N/A'} {parseVal(itemA.macros?.protein) > parseVal(itemB.macros?.protein) && '🟢 Higher'}
                </span>
                <span className={`text-center font-bold ${parseVal(itemB.macros?.protein) > parseVal(itemA.macros?.protein) ? 'text-emerald-600 font-extrabold' : 'text-slate-800'}`}>
                  {itemB.macros?.protein || 'N/A'} {parseVal(itemB.macros?.protein) > parseVal(itemA.macros?.protein) && '🟢 Higher'}
                </span>
              </div>

              {/* Additives Count */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-50/80">
                <span className="font-semibold text-slate-600">Chemical Additives Count</span>
                <span className={`text-center font-bold ${(itemA.additives?.length || 0) > (itemB.additives?.length || 0) ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {itemA.additives?.length || 0} Additive(s)
                </span>
                <span className={`text-center font-bold ${(itemB.additives?.length || 0) > (itemA.additives?.length || 0) ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {itemB.additives?.length || 0} Additive(s)
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
