import React from 'react';
import { Scan, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const databases = [
    { name: "FSSAI India Standards", url: "https://www.fssai.gov.in/", tag: "Regulatory Body" },
    { name: "USDA FoodData Central", url: "https://fdc.nal.usda.gov/", tag: "Global Scientific DB" },
    { name: "Open Food Facts India", url: "https://in.openfoodfacts.org/", tag: "Real-Time API" },
    { name: "WHO Guidelines", url: "https://www.who.int/", tag: "Global Thresholds" },
  ];

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/70 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP SECTION: BRAND & DATABASES */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* BRAND & DISCLAIMER (COL 1-7) */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF4B82] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Scan className="w-4 h-4 text-[#FF4B82]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-slate-900 font-['Outfit'] tracking-tight">
                NUTRISCAN <span className="gradient-text">AI</span>
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed max-w-lg font-normal">
              Empowering Indian families with instant food transparency. Scan packaged food labels to reveal nutritional truth, additive safety ratings, and healthier food choices.
            </p>

            <p className="text-[11px] text-slate-500 italic max-w-lg font-medium pt-1">
              Disclaimer: NutriScan AI provides general nutritional analysis based on published regulatory standards (FSSAI/USDA). For specific medical dietary advice, consult a registered dietitian or doctor.
            </p>
          </div>

          {/* AESTHETIC SUPPORTED DATABASES LINKS (COL 8-12) */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-['Outfit']">
              Supported Indian Databases
            </h4>

            <div className="space-y-2">
              {databases.map((db, idx) => (
                <a
                  key={idx}
                  href={db.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-rose-50/40 border border-slate-200/80 hover:border-rose-200/80 transition-all duration-200 shadow-sm hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#FF4B82] group-hover:scale-125 transition-transform shrink-0" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-slate-900 truncate">
                      {db.name}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                      {db.tag}
                    </span>
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF4B82] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <p>© 2026 NutriScan AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF4B82] fill-[#FF4B82]" />
            <span>for a healthier India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
