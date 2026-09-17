import React from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function AdditiveDecoder({ product }) {

  const commonENumbers = [
    { code: "E621", name: "Monosodium Glutamate (MSG)", risk: "Moderate", category: "Flavor Enhancer", note: "Excites taste receptors. May trigger migraines in sensitive individuals." },
    { code: "E102", name: "Tartrazine", risk: "High", category: "Synthetic Dye", note: "Yellow colorant linked to hyperactivity in children and asthma." },
    { code: "E211", name: "Sodium Benzoate", risk: "Moderate", category: "Preservative", note: "Inhibits mold growth. Can react with Vitamin C to form benzene." },
    { code: "E338", name: "Phosphoric Acid", risk: "High", category: "Acidulant", note: "Gives tangy cola flavor. Excess intake impairs calcium absorption in bones." },
    { code: "E635", name: "Disodium Ribonucleotides", risk: "Moderate", category: "Flavor Enhancer", note: "Synergistic with MSG. Avoid if prone to gout." },
    { code: "E476", name: "PGPR", risk: "Moderate", category: "Emulsifier", note: "Synthetic fat substitute used to cheapen cocoa butter in chocolates." }
  ];

  const productAdditives = product?.additives || [];

  return (
    <section id="additives-section" className="scroll-mt-24 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2 border border-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>E-Number & Additive Decoder</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Unmasking Hidden Food Chemicals
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-normal">
          Food manufacturers use complex E-numbers on labels. NutriScan translates them into plain language safety reports.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 space-y-6 bg-white border border-slate-200 shadow-xl">
        
        {/* Scanned Product Additives */}
        {productAdditives.length > 0 ? (
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 font-['Outfit']">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Additives Detected in "{product.name}" ({productAdditives.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {productAdditives.map((add, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#FF4B82] font-mono bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {add.code}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">{add.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {add.description}
                    </p>
                  </div>
                  
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase ${
                    add.risk === 'High' 
                      ? 'badge-red' 
                      : add.risk === 'Moderate' 
                      ? 'badge-yellow' 
                      : 'badge-green'
                  }`}>
                    {add.risk} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>Clean Packet! Zero harmful E-number synthetic additives detected in this food product.</span>
          </div>
        )}

        {/* Global E-Number Reference Table */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-purple-600" />
              Common E-Numbers Reference Database
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {commonENumbers.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-purple-700">{item.code}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    item.risk === 'High' ? 'text-rose-700 bg-rose-100' : 'text-amber-700 bg-amber-100'
                  }`}>
                    {item.risk} Risk
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 font-medium">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
