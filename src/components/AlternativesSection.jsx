import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, ShoppingCart, ExternalLink, TrendingDown } from 'lucide-react';
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
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 border ${
          isHarmful 
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHarmful ? '⚠️ Unhealthy Food Swap Recommended' : 'Healthier Food Alternatives'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mb-2">
          {isHarmful ? 'Upgrade Your Food: Better & Safer Swaps' : 'Top Healthy Alternatives in This Category'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 font-light">
          Instead of <span className="text-rose-400 font-semibold">{product.name}</span> (Score: {product.score}/100), NutriScan recommends these clean, FSSAI-approved substitutes:
        </p>
      </div>

      {/* Alternatives List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alternatives.map((alt, idx) => {
          const platforms = alt.platforms || {
            blinkit: `https://blinkit.com/s/?q=${encodeURIComponent(alt.name)}`,
            instamart: `https://www.swiggy.com/instamart/search?query=${encodeURIComponent(alt.name)}`,
            zepto: `https://www.zepto.co.in/search?q=${encodeURIComponent(alt.name)}`,
            bigbasket: `https://www.bigbasket.com/ps/?q=${encodeURIComponent(alt.name)}`
          };

          const priceText = alt.price || "₹35 - ₹60";

          return (
            <div 
              key={idx} 
              className="glass-panel p-5 sm:p-6 relative group overflow-hidden border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Clean Swap
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 line-through">Score: {product.score}</span>
                    <span className="badge-green px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg shadow-emerald-500/20">
                      Score: {alt.score}/100
                    </span>
                  </div>
                </div>

                {/* Main Product Info */}
                <div className="flex items-start gap-3.5 mb-4">
                  <img 
                    src={alt.image} 
                    alt={alt.name} 
                    className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0 bg-[#090D16]" 
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit'] group-hover:text-emerald-400 transition-colors leading-snug">
                      {alt.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-0.5 mb-2">
                      <span className="text-xs text-slate-400 font-medium">{alt.brand}</span>
                      <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {priceText}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-light leading-relaxed bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                      <span className="font-semibold text-emerald-400">Why it's better: </span>
                      {alt.reason}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Commerce Live Platform Price Comparison Bar */}
              {(() => {
                const pm = alt.priceMatrix || getQuickCommercePriceMatrix(alt.name, alt.mrp);
                return (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#FF4B82]" />
                        Live Price Compare & 1-Tap Delivery:
                      </span>
                      <span className="text-emerald-400 font-bold text-[10px]">
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
                          className={`py-2 px-2 rounded-xl border ${p.bgClass} text-[10px] font-bold flex flex-col items-center justify-center text-center transition-all hover:scale-[1.03] relative`}
                        >
                          {p.isLowest && (
                            <span className="absolute -top-2 bg-emerald-500 text-slate-950 font-black text-[8px] px-1.5 rounded-full uppercase">
                              Best Price
                            </span>
                          )}
                          <span className="text-[10px] text-white flex items-center gap-1">
                            <span>{p.logo}</span> {p.name}
                          </span>
                          <span className="text-xs font-black text-white font-['Outfit'] mt-0.5">
                            {p.price}
                          </span>
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
