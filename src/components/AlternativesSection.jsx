import React from 'react';
import { Sparkles, ShieldCheck, ShoppingCart, ExternalLink } from 'lucide-react';
import { getHealthyAlternativesForProduct, getQuickCommercePriceMatrix } from '../data/categoryAlternatives';

export default function AlternativesSection({ product, onSelectProduct }) {
  if (!product) return null;

  // Always resolve clean healthy alternatives (from API or curated Indian database fallback)
  let alternatives = product.alternatives || [];
  if (!alternatives || alternatives.length === 0) {
    alternatives = getHealthyAlternativesForProduct(product.category, product.name);
  }

  const isHarmful = product.rating === 'Red' || product.rating === 'Yellow' || product.score < 70;

  return (
    <section id="alternatives-section" className="scroll-mt-24 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 mb-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
          isHarmful 
            ? 'bg-rose-50 text-rose-700 border-rose-200' 
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHarmful ? '⚠️ Unhealthy Food Swap Recommended' : 'Healthier Food Alternatives'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mb-2">
          {isHarmful ? 'Upgrade Your Food: Better & Safer Swaps' : 'Top Healthy Alternatives in This Category'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 font-normal">
          Instead of <span className="text-rose-600 font-bold">{product.name}</span> (Score: {product.score}/100), NutriScan recommends these clean, FSSAI-approved substitutes:
        </p>
      </div>

      {/* Alternatives List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alternatives.map((alt, idx) => {
          return (
            <div 
              key={idx} 
              className="glass-panel p-5 sm:p-6 relative group overflow-hidden border border-emerald-200 bg-white hover:border-emerald-300 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Clean Swap
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 line-through">Score: {product.score}</span>
                    <span className="badge-green px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm">
                      Score: {alt.score}/100
                    </span>
                  </div>
                </div>

                {/* Main Product Info */}
                <div className="flex items-start gap-3.5 mb-4">
                  <img 
                    src={alt.image} 
                    alt={alt.name} 
                    className="w-20 h-20 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50 shadow-sm" 
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit'] group-hover:text-emerald-700 transition-colors leading-snug">
                      {alt.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-0.5 mb-2">
                      <span className="text-xs text-slate-500 font-semibold">{alt.brand}</span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        MRP: ₹{alt.mrp || 35}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 font-normal leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="font-bold text-emerald-700">Why it's better: </span>
                      {alt.reason}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Commerce Live Platform Price Comparison Bar */}
              {(() => {
                const pm = alt.priceMatrix || getQuickCommercePriceMatrix(alt.name, alt.mrp, alt.customPrices);
                return (
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 font-bold flex items-center gap-1">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#FF4B82]" />
                        Live Platform Price Compare & Buy:
                      </span>
                      <span className="text-emerald-700 font-bold text-[10px]">
                        MRP: {pm.baseMrp}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {pm.platforms.map((p) => (
                        <a
                          key={p.key}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2 rounded-xl border bg-slate-50 hover:bg-slate-100 border-slate-200 text-[10px] font-bold flex flex-col items-center justify-center text-center transition-all hover:scale-[1.03] shadow-sm"
                        >
                          <div className="flex items-center justify-center gap-1 w-full truncate">
                            <span className="shrink-0">{p.logo}</span>
                            <span className="truncate text-slate-900 font-bold">{p.name}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-0.5">
                            <span className="text-xs font-black text-slate-900 font-['Outfit']">
                              {p.price}
                            </span>
                            {p.isLowest && (
                              <span className="bg-emerald-600 text-white font-black text-[7px] px-1 py-0.5 rounded uppercase leading-none shrink-0">
                                BEST
                              </span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })()}

            </div>
          );
        })}
      </div>
    </section>
  );
}
