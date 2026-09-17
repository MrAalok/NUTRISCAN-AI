import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function AlternativesSection({ product, onSelectProduct }) {
  if (!product || !product.alternatives || product.alternatives.length === 0) return null;

  return (
    <section id="alternatives-section" className="scroll-mt-24 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Healthier Food Alternatives</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          Upgrade Your Plate: Swap for Better Health
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-light">
          Instead of <span className="text-rose-400 font-semibold">{product.name}</span>, NutriScan recommends these clean, high-nutrition substitutes:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.alternatives.map((alt, idx) => (
          <div key={idx} className="glass-panel p-6 relative group overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40">
            {/* Top Score Comparison Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Healthy Alternative
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">Score: {product.score}</span>
                <span className="badge-green px-2.5 py-0.5 rounded-full text-xs font-bold">
                  Score: {alt.score}/100
                </span>
              </div>
            </div>

            {/* Product Card Body */}
            <div className="flex items-start gap-4 mb-4">
              <img src={alt.image} alt={alt.name} className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit'] group-hover:text-emerald-400 transition-colors">
                  {alt.name}
                </h3>
                <p className="text-xs text-slate-400">{alt.brand}</p>
                <div className="mt-2 text-xs text-slate-300 font-light leading-relaxed bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                  <span className="font-semibold text-emerald-400">Why it's better: </span>
                  {alt.reason}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-end pt-3 border-t border-white/5">
              <button 
                onClick={() => {
                  onSelectProduct({
                    ...alt,
                    barcode: "8901234567890",
                    category: product.category,
                    servingSize: "100g",
                    caloriesPerServing: 140,
                    macros: { protein: "9.2g", carbs: "22g", fat: "2.1g", saturatedFat: "0.4g", sugar: "0.2g", sodium: "120mg", fiber: "5.5g" },
                    pros: ["Whole millet grain", "Zero palm oil", "High fiber"],
                    cons: ["Slightly higher cost per pack"],
                    shortTermEffects: ["Steady sustained energy"],
                    longTermEffects: ["Supports gut motility and cardiovascular fitness"],
                    diseaseSuitability: {
                      diabetes: { suitable: true, severity: "Safe", note: "Low GI grain base." },
                      hypertension: { suitable: true, severity: "Safe", note: "Low sodium." },
                      obesity: { suitable: true, severity: "Safe", note: "High fiber promotes fullness." },
                      thyroid: { suitable: true, severity: "Safe", note: "Clean grain base." },
                      gymFitness: { suitable: true, severity: "Great Choice", note: "Good clean protein." },
                      kidsParenting: { suitable: true, severity: "Highly Recommended", note: "Kid friendly." }
                    },
                    additives: []
                  });
                }}
                className="text-xs font-semibold text-[#FF4B82] hover:text-white flex items-center gap-1 transition-colors"
              >
                Inspect Full Analysis Report
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
