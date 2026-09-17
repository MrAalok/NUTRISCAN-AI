import React from 'react';
import { Scan, Heart, ExternalLink, ShieldCheck, Database, ShoppingBag, Sparkles, ChevronRight } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { label: "Food Barcode Scanner", icon: Scan },
    { label: "Nutritional Health Score", icon: Sparkles },
    { label: "Disease & Profile Checker", icon: ShieldCheck },
    { label: "E-Number Additive Decoder", icon: Database },
  ];

  const regulatoryDatabases = [
    { name: "FSSAI India Standards", url: "https://www.fssai.gov.in/", badge: "India" },
    { name: "USDA FoodData Central", url: "https://fdc.nal.usda.gov/", badge: "Global DB" },
    { name: "Open Food Facts India", url: "https://in.openfoodfacts.org/", badge: "API" },
    { name: "WHO Nutrition Thresholds", url: "https://www.who.int/", badge: "WHO" },
  ];

  const platformPartners = [
    { name: "Blinkit (10-Min Delivery)", url: "https://blinkit.com/", color: "text-amber-600 bg-amber-50 border-amber-200" },
    { name: "Swiggy Instamart", url: "https://www.swiggy.com/instamart", color: "text-orange-600 bg-orange-50 border-orange-200" },
    { name: "Zepto Instant Grocery", url: "https://www.zepto.co.in/", color: "text-purple-600 bg-purple-50 border-purple-200" },
    { name: "BigBasket Super Saver", url: "https://www.bigbasket.com/", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 text-slate-600 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* BRAND HERO HEADER BLOCK */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF4B82] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-md shadow-[#FF4B82]/20">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Scan className="w-5 h-5 text-[#FF4B82]" />
                </div>
              </div>

              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Outfit']">
                  NutriScan <span className="gradient-text">AI</span>
                </span>
                <span className="ml-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                  FSSAI Verified Standards
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-xs font-normal max-w-xl leading-relaxed">
              Empowering Indian households with instant food transparency. Scan packaged food labels to instantly unveil nutritional truth, toxic additives, disease warnings, and clean food swaps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Real API Data
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              Quick-Commerce Comparison
            </span>
          </div>
        </div>

        {/* VERTICALLY STRUCTURED COLUMNS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* COLUMN 1: APP FEATURES */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-4 font-['Outfit'] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4B82]" />
              Core Capabilities
            </h4>

            <ul className="space-y-2.5">
              {quickLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx}>
                    <span className="group flex items-center justify-between text-xs text-slate-700 hover:text-[#FF4B82] font-semibold transition-all cursor-pointer p-1.5 rounded-lg hover:bg-rose-50/50">
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF4B82] transition-colors" />
                        {item.label}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:translate-x-1 group-hover:text-[#FF4B82] transition-all" />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 2: REGULATORY DATABASES */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-4 font-['Outfit'] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-600" />
              Official Databases
            </h4>

            <ul className="space-y-2.5">
              {regulatoryDatabases.map((db, idx) => (
                <li key={idx}>
                  <a
                    href={db.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-xs text-slate-700 hover:text-purple-700 font-semibold transition-all p-1.5 rounded-lg hover:bg-purple-50/50"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                      {db.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: QUICK COMMERCE PARTNERS */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-4 font-['Outfit'] flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              Delivery Partners
            </h4>

            <ul className="space-y-2">
              {platformPartners.map((partner, idx) => (
                <li key={idx}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs font-bold transition-all hover:scale-[1.02] shadow-sm ${partner.color}`}
                  >
                    <span>{partner.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: DISCLAIMER & SAFETY CARD */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">Medical Disclaimer</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                NutriScan AI provides evidence-based analysis grounded in regulatory thresholds (FSSAI & USDA). For clinical dietary prescriptions, please consult your doctor.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-bold">
              <span>FSSAI Benchmark</span>
              <span className="text-emerald-700">100% Compliant</span>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & CREATOR BAR */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-semibold">
          <p>© 2026 NutriScan AI India. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF4B82] fill-[#FF4B82]" />
            <span>for a healthier India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
