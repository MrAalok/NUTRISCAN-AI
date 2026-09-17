import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, Info, HelpCircle } from 'lucide-react';

export default function AdditiveDecoder({ product }) {
  const [searchTerm, setSearchTerm] = useState('');

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold mb-2 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>E-Number & Additive Decoder</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          Unmasking Hidden Food Chemicals
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-light">
          Food manufacturers use complex E-numbers on labels. NutriScan AI translates them into plain language safety reports.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 space-y-6">
        
        {/* Scanned Product Additives */}
        {productAdditives.length > 0 ? (
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 font-['Outfit']">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Additives Detected in "{product.name}" ({productAdditives.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {productAdditives.map((add, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#FF4B82] font-mono bg-[#FF4B82]/10 px-2 py-0.5 rounded border border-[#FF4B82]/20">
                        {add.code}
                      </span>
                      <span className="text-xs font-bold text-white">{add.name}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
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
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>Clean Packet! Zero harmful E-number synthetic additives detected in this food product.</span>
          </div>
        )}

        {/* Global E-Number Reference Table */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-purple-400" />
              Common E-Numbers Reference Database
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {commonENumbers.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-purple-400">{item.code}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    item.risk === 'High' ? 'text-rose-400 bg-rose-500/10' : 'text-amber-400 bg-amber-500/10'
                  }`}>
                    {item.risk} Risk
                  </span>
                </div>
                <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
