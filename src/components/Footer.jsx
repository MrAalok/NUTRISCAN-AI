import React from 'react';
import { Scan, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 pt-12 pb-8 px-4 lg:px-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Col 1: Brand info */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4B82] to-[#6366F1] flex items-center justify-center shadow-sm">
              <Scan className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 font-['Outfit']">
              NUTRISCAN <span className="gradient-text">HEALTH</span>
            </span>
          </div>

          <p className="text-slate-600 text-xs font-normal max-w-sm mb-4 leading-relaxed">
            Empowering Indian families with instant food transparency. Scan packaged food labels to instantly reveal nutritional truth, additive safety ratings, and healthier food choices.
          </p>

          <p className="text-[11px] text-slate-500 italic">
            Disclaimer: NutriScan provides general nutritional analysis based on published regulatory standards (FSSAI/USDA). For specific medical dietary advice, consult a registered dietitian or doctor.
          </p>
        </div>

        {/* Col 2: Data Sources */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-['Outfit']">Supported Indian Databases</h4>
          <ul className="space-y-2 text-slate-600 font-medium">
            <li><a href="https://www.fssai.gov.in/" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">FSSAI India Standards</a></li>
            <li><a href="https://fdc.nal.usda.gov/" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">USDA FoodData Central</a></li>
            <li><a href="https://in.openfoodfacts.org/" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">Open Food Facts India</a></li>
            <li><a href="https://www.who.int/" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">WHO Nutrition Guidelines</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
        <p>© 2026 NutriScan Health India. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-[#FF4B82] fill-[#FF4B82]" /> for a healthier India
        </p>
      </div>
    </footer>
  );
}
