import React from 'react';
import { Scan, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060911] pt-12 pb-8 px-4 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Col 1: Brand info */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4B82] to-[#8B5CF6] flex items-center justify-center">
              <Scan className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-white font-['Outfit']">
              NUTRISCAN <span className="gradient-text">AI</span>
            </span>
          </div>

          <p className="text-slate-400 text-xs font-light max-w-sm mb-4 leading-relaxed">
            "Let's make technology the guardian of our health." An AI-powered initiative to bring food transparency to every plate.
          </p>

          <p className="text-[11px] text-slate-500 italic">
            Disclaimer: NutriScan AI provides general nutritional analysis based on published regulatory standards (FSSAI/USDA). For specific medical dietary advice, consult a registered dietitian or doctor.
          </p>
        </div>

        {/* Col 2: Data Sources */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-['Outfit']">Supported Databases</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="https://www.fssai.gov.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">FSSAI India</a></li>
            <li><a href="https://fdc.nal.usda.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">USDA FoodData Central</a></li>
            <li><a href="https://world.openfoodfacts.org/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Open Food Facts API</a></li>
            <li><a href="https://www.who.int/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WHO / FAO Guidelines</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© 2026 NutriScan AI. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-[#FF4B82] fill-[#FF4B82]" /> for a healthier generation
        </p>
      </div>
    </footer>
  );
}
