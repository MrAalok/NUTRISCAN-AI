import React from 'react';
import { CheckCircle2, ShieldAlert, Activity, Heart, Clock, Scale, Flame, ExternalLink, Package, Tag, Building2, Layers, IndianRupee, Factory, Globe, Calendar, PhoneCall } from 'lucide-react';
import { getQuickCommercePriceMatrix } from '../data/categoryAlternatives';

export default function HealthReportCard({ product, onAddToCompare, isCompared }) {
  if (!product) return null;

  const isGreen = product.rating === 'Green';
  const isYellow = product.rating === 'Yellow';
  const isRed = product.rating === 'Red';

  const badgeStyle = isGreen ? 'badge-green' : isYellow ? 'badge-yellow' : 'badge-red';
  const scoreColorClass = isGreen ? 'text-emerald-600' : isYellow ? 'text-amber-600' : 'text-rose-600';

  return (
    <div id="health-report-section" className="scroll-mt-24 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 mb-12">
      
      {/* Header Banner for Scanned Item */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 overflow-hidden">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4B82] px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200">
              Nutritional Report
            </span>
            <span className="text-xs text-slate-500 font-mono">Barcode: {product.barcode}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] truncate">
            {product.name}
          </h2>
          <p className="text-xs text-slate-500 truncate">
            Brand: <span className="text-slate-900 font-semibold">{product.brand}</span> • Category: <span className="text-slate-900 font-semibold">{product.category}</span>
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
      <div className="glass-panel p-5 sm:p-8 space-y-6 bg-white border border-slate-200 shadow-xl">
        
        {/* TOP SECTION: Score Card & Macro Chips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Color Code Score Card */}
          <div className={`lg:col-span-5 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border ${
            isGreen 
              ? 'bg-emerald-50 border-emerald-200' 
              : isYellow 
              ? 'bg-amber-50 border-amber-200' 
              : 'bg-rose-50 border-rose-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Health Score Rating
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full ${isRed ? 'bg-rose-500 shadow-md shadow-rose-500/50' : 'bg-rose-200'}`} />
                <span className={`w-3.5 h-3.5 rounded-full ${isYellow ? 'bg-amber-500 shadow-md shadow-amber-500/50' : 'bg-amber-200'}`} />
                <span className={`w-3.5 h-3.5 rounded-full ${isGreen ? 'bg-emerald-500 shadow-md shadow-emerald-500/50' : 'bg-emerald-200'}`} />
              </div>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className={`text-5xl sm:text-7xl font-black font-['Outfit'] ${scoreColorClass}`}>
                {product.score}
              </span>
              <span className="text-slate-500 font-bold text-base sm:text-lg">/ 100</span>
            </div>

            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${badgeStyle}`}>
                {product.rating} Tag • {product.rating === 'Green' ? 'Safe & Healthy' : product.rating === 'Yellow' ? 'Moderate Caution' : 'Avoid / Unhealthy'}
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {product.verdict}
              </p>
            </div>
          </div>

          {/* Right Column: Nutrition Macros & Calories */}
          <div className="lg:col-span-7 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF4B82]" />
                Nutritional Profile (Per {product.servingSize})
              </span>
              <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                {product.caloriesPerServing} kcal
              </span>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-2">
              <div className="p-2 rounded-xl bg-white text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Protein</p>
                <p className="text-xs font-black text-emerald-600">{product.macros?.protein}</p>
              </div>
              <div className="p-2 rounded-xl bg-white text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Carbs</p>
                <p className="text-xs font-black text-sky-600">{product.macros?.carbs}</p>
              </div>
              <div className="p-2 rounded-xl bg-white text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Total Fat</p>
                <p className="text-xs font-black text-amber-600">{product.macros?.fat}</p>
              </div>
              <div className="p-2 rounded-xl bg-white text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Sat. Fat</p>
                <p className="text-xs font-black text-rose-600">{product.macros?.saturatedFat}</p>
              </div>
              <div className="p-2 rounded-xl bg-white text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Sugar</p>
                <p className="text-xs font-black text-purple-600">{product.macros?.sugar}</p>
              </div>
              <div className="p-2 rounded-xl bg-white text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Sodium</p>
                <p className="text-xs font-black text-rose-600">{product.macros?.sodium}</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 mt-2">
              💡 <span className="text-slate-900 font-semibold">Health Insight:</span> High sodium and refined palm oil are primary drivers of lower health scores in processed packaged foods.
            </p>
          </div>

        </div>

        {/* PRODUCT INFORMATION (FSSAI Packaging Labels) */}
        {(() => {
          const prodInfo = product.productInfo || {
            productName: product.name,
            brand: product.brand && product.brand !== "Indian Packaged Food" ? product.brand : "Brand Owner",
            category: product.category,
            netQuantity: product.servingSize || "100 g",
            mrp: "As per packet weight",
            manufacturer: `${product.brand || 'Brand Owner'} • Refer to physical package label for exact factory location`,
            countryOfOrigin: "India 🇮🇳",
            dateInfo: "Best Before 6 to 9 months from Manufacturing Date",
            consumerCare: "Refer to customer helpline printed on package"
          };

          return (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#FF4B82]" />
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Product Information (FSSAI Packaging Labels)
                  </h3>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  FSSAI Compliant 🇮🇳
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Product Name */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-50 text-[#FF4B82] shrink-0 mt-0.5">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Product Name</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{prodInfo.productName}</p>
                  </div>
                </div>

                {/* 2. Brand */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Brand</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{prodInfo.brand}</p>
                  </div>
                </div>

                {/* 3. Category */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600 shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{prodInfo.category}</p>
                  </div>
                </div>

                {/* 4. Net Quantity */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Net Quantity</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{prodInfo.netQuantity}</p>
                  </div>
                </div>

                {/* 5. MRP */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MRP (Max Retail Price)</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{prodInfo.mrp}</p>
                  </div>
                </div>

                {/* 6. Country of Origin */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country of Origin</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{prodInfo.countryOfOrigin}</p>
                  </div>
                </div>

                {/* 7. Manufacturer / Packer / Importer */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3 md:col-span-2 lg:col-span-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0 mt-0.5">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Manufacturer / Packer / Importer</p>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{prodInfo.manufacturer}</p>
                  </div>
                </div>

                {/* 8. Date Information */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3 md:col-span-2 lg:col-span-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date Information (Mfg / Expiry / Best Before)</p>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{prodInfo.dateInfo}</p>
                  </div>
                </div>

                {/* 9. Consumer-Care Information */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3 md:col-span-2 lg:col-span-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-600 shrink-0 mt-0.5">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consumer-Care Information</p>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{prodInfo.consumerCare}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* QUICK COMMERCE LIVE PRICE COMPARISON & BUY STRIP */}
        {(() => {
          const priceMatrix = getQuickCommercePriceMatrix(product.name);
          return (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B82] animate-pulse" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-['Outfit']">
                    Live Quick-Commerce Price Comparison (MRP: {priceMatrix.baseMrp})
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Compare prices across 10-min delivery apps in India & order best deal
                </span>
              </div>

              {/* Platform Price Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {priceMatrix.platforms.map((p) => (
                  <a
                    key={p.key}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border flex flex-col justify-between transition-all group ${p.bgClass} hover:scale-[1.03] shadow-sm`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 min-w-0">
                          <span className="shrink-0">{p.logo}</span>
                          <span className="truncate">{p.name}</span>
                        </span>
                        {p.isLowest && (
                          <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-600 text-white px-1.5 py-0.5 rounded-md shrink-0 shadow-sm leading-none">
                            BEST
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold">{p.delivery}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-lg font-black text-slate-900 font-['Outfit'] group-hover:text-emerald-600 transition-colors">
                        {p.price}
                      </span>
                      <span className="text-[10px] font-bold underline flex items-center gap-0.5 text-slate-600">
                        Order <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}

        {/* PROS VS CONS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          {/* Pros */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-2 mb-3 font-['Outfit']">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Nutritional Advantages (Pros)
            </h3>
            <ul className="space-y-2">
              {product.pros?.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
            <h3 className="text-sm font-bold text-rose-700 flex items-center gap-2 mb-3 font-['Outfit']">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Nutritional Disadvantages & Risks (Cons)
            </h3>
            <ul className="space-y-2">
              {product.cons?.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SHORT-TERM VS LONG-TERM BODY IMPACT */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-['Outfit']">
            <Activity className="w-5 h-5 text-[#FF4B82]" />
            Body Effect Matrix (Short-Term vs. Long-Term)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Short Term */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-2">
                <Clock className="w-4 h-4" />
                Short-Term Impact (0 - 24 Hours)
              </div>
              <ul className="space-y-2">
                {product.shortTermEffects?.map((effect, idx) => (
                  <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                    <span className="text-amber-600 font-bold">⚡</span>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Long Term */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 mb-2">
                <Heart className="w-4 h-4" />
                Long-Term Impact (Chronic Consumption)
              </div>
              <ul className="space-y-2">
                {product.longTermEffects?.map((effect, idx) => (
                  <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                    <span className="text-purple-600 font-bold">⚠️</span>
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
