import React from 'react';
import { CheckCircle2, ShieldAlert, Activity, Heart, Clock, Scale, Flame } from 'lucide-react';

export default function HealthReportCard({ product, onAddToCompare, isCompared }) {
  if (!product) return null;

  const isGreen = product.rating === 'Green';
  const isYellow = product.rating === 'Yellow';
  const isRed = product.rating === 'Red';

  const badgeStyle = isGreen ? 'badge-green glow-green' : isYellow ? 'badge-yellow' : 'badge-red glow-red';
  const scoreColorClass = isGreen ? 'text-emerald-400' : isYellow ? 'text-amber-400' : 'text-rose-400';

  return (
    <div id="health-report-section" className="scroll-mt-24 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 mb-12">
      
      {/* Header Banner for Scanned Item */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 overflow-hidden">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4B82] px-2.5 py-0.5 rounded-full bg-[#FF4B82]/10 border border-[#FF4B82]/20">
              Nutritional Report
            </span>
            <span className="text-xs text-slate-400">Barcode: {product.barcode}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] truncate">
            {product.name}
          </h2>
          <p className="text-xs text-slate-400 truncate">
            Brand: <span className="text-slate-200 font-medium">{product.brand}</span> • Category: <span className="text-slate-200 font-medium">{product.category}</span>
          </p>
        </div>

        {/* Action Button Bar */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onAddToCompare(product)}
            className={`btn-secondary text-xs py-2 px-4 ${isCompared ? 'border-[#FF4B82] text-[#FF4B82]' : ''}`}
          >
            <Scale className="w-4 h-4 text-[#FF4B82]" />
            {isCompared ? 'In Compare List' : 'Compare Food'}
          </button>
        </div>
      </div>

      {/* Main Glass Report Container */}
      <div className="glass-panel p-5 sm:p-8 space-y-6">
        
        {/* TOP SECTION: Score Card & Macro Chips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Color Code Score Card */}
          <div className={`lg:col-span-5 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border ${
            isGreen 
              ? 'bg-emerald-950/20 border-emerald-500/30' 
              : isYellow 
              ? 'bg-amber-950/20 border-amber-500/30' 
              : 'bg-rose-950/20 border-rose-500/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Health Score Rating
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full ${isRed ? 'bg-rose-500 shadow-lg shadow-rose-500/50' : 'bg-rose-900/40'}`} />
                <span className={`w-3.5 h-3.5 rounded-full ${isYellow ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 'bg-amber-900/40'}`} />
                <span className={`w-3.5 h-3.5 rounded-full ${isGreen ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-emerald-900/40'}`} />
              </div>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className={`text-5xl sm:text-7xl font-black font-['Outfit'] ${scoreColorClass}`}>
                {product.score}
              </span>
              <span className="text-slate-400 font-bold text-base sm:text-lg">/ 100</span>
            </div>

            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${badgeStyle}`}>
                {product.rating} Tag • {product.rating === 'Green' ? 'Safe & Healthy' : product.rating === 'Yellow' ? 'Moderate Caution' : 'Avoid / Unhealthy'}
              </div>
              <p className="text-xs font-medium text-slate-200 leading-relaxed">
                {product.verdict}
              </p>
            </div>
          </div>

          {/* Right Column: Nutrition Macros & Calories */}
          <div className="lg:col-span-7 bg-white/[0.02] p-5 sm:p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF4B82]" />
                Nutritional Profile (Per {product.servingSize})
              </span>
              <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg">
                {product.caloriesPerServing} kcal
              </span>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-2">
              <div className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Protein</p>
                <p className="text-xs font-bold text-emerald-400">{product.macros?.protein}</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Carbs</p>
                <p className="text-xs font-bold text-sky-400">{product.macros?.carbs}</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Total Fat</p>
                <p className="text-xs font-bold text-amber-400">{product.macros?.fat}</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Sat. Fat</p>
                <p className="text-xs font-bold text-rose-400">{product.macros?.saturatedFat}</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Sugar</p>
                <p className="text-xs font-bold text-purple-400">{product.macros?.sugar}</p>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase">Sodium</p>
                <p className="text-xs font-bold text-rose-300">{product.macros?.sodium}</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2">
              💡 <span className="text-slate-300 font-medium">Health Insight:</span> High sodium and refined palm oil are primary drivers of lower health scores in processed packaged foods.
            </p>
          </div>

        </div>

        {/* PROS VS CONS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          {/* Pros */}
          <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3 font-['Outfit']">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Nutritional Advantages (Pros)
            </h3>
            <ul className="space-y-2">
              {product.pros?.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-3 font-['Outfit']">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Nutritional Disadvantages & Risks (Cons)
            </h3>
            <ul className="space-y-2">
              {product.cons?.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SHORT-TERM VS LONG-TERM BODY IMPACT */}
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-['Outfit']">
            <Activity className="w-5 h-5 text-[#FF4B82]" />
            Body Effect Matrix (Short-Term vs. Long-Term)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Short Term */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <Clock className="w-4 h-4" />
                Short-Term Impact (0 - 24 Hours)
              </div>
              <ul className="space-y-2">
                {product.shortTermEffects?.map((effect, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚡</span>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Long Term */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
                <Heart className="w-4 h-4" />
                Long-Term Impact (Chronic Consumption)
              </div>
              <ul className="space-y-2">
                {product.longTermEffects?.map((effect, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-purple-400 font-bold">⚠️</span>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
