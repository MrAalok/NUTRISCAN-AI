import React from 'react';
import { Database, ExternalLink, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';

export default function DataSources() {
  const sources = [
    {
      title: "FSSAI (Food Safety & Standards Authority of India)",
      description: "Official Indian government body regulating approved additives, ingredient safety limits, and packaging standards.",
      url: "https://www.fssai.gov.in/",
      badge: "India Regulation"
    },
    {
      title: "USDA FoodData Central",
      description: "Comprehensive global scientific database for macro/micronutrient breakdown, USDA dietary reference intake data.",
      url: "https://fdc.nal.usda.gov/",
      badge: "Global Scientific DB"
    },
    {
      title: "WHO & FAO Nutrition Reports",
      description: "World Health Organization threshold benchmarks for daily sodium limits (2000mg/day), added sugar limits (<25g/day), and trans fats.",
      url: "https://www.who.int/",
      badge: "Global Thresholds"
    },
    {
      title: "Open Food Facts API",
      description: "Global open-source barcode database powered by millions of verified crowd-contributed and open food labels.",
      url: "https://world.openfoodfacts.org/",
      badge: "Real-Time Barcode API"
    }
  ];

  return (
    <section className="scroll-mt-24 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2 border border-blue-500/20">
          <Database className="w-3.5 h-3.5" />
          <span>Data Sources & Scientific Transparency</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          How We Collect Our Data
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-light">
          NutriScan AI grounds every health score in authentic regulatory and scientific databases. Zero guesswork.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sources.map((src, idx) => (
          <div key={idx} className="glass-panel p-5 hover:border-blue-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {src.badge}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 font-['Outfit']">{src.title}</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                {src.description}
              </p>
            </div>

            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Visit Official Database</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
