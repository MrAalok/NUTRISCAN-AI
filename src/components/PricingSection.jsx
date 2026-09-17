import React from 'react';
import { DollarSign, Check, Zap, Crown, Building2, BarChart2 } from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="pricing-section" className="scroll-mt-24 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Monetization & Business Model</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          NutriScan AI Pricing & Revenue Streams
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-light">
          Freemium model offering free scans for everyone, backed by premium health disease analytics.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* FREE TIER */}
        <div className="glass-panel p-6 flex flex-col justify-between border-white/10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Basic Scanner</span>
              <Zap className="w-5 h-5 text-slate-400" />
            </div>
            <div className="mb-4">
              <span className="text-3xl font-black text-white font-['Outfit']">Free</span>
              <span className="text-xs text-slate-400"> / Forever</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> 10 Free Scans / Day
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Traffic Light Health Score (Red/Yellow/Green)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Basic Macro Breakdown (Carbs, Fats, Protein)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> OpenFoodFacts Barcode Lookup
              </li>
            </ul>
          </div>
          <button className="btn-secondary w-full justify-center text-xs py-2.5">
            Get Started Free
          </button>
        </div>

        {/* PRO SUBSCRIPTION TIER (RECOMMENDED) */}
        <div className="glass-panel p-6 flex flex-col justify-between border-[#FF4B82] relative glow-pink bg-gradient-to-b from-[#FF4B82]/10 to-transparent">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white px-3 py-0.5 rounded-full shadow-lg">
            Most Popular
          </span>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF4B82]">NutriScan Pro</span>
              <Crown className="w-5 h-5 text-[#FF4B82]" />
            </div>
            <div className="mb-4">
              <span className="text-3xl font-black text-white font-['Outfit']">₹199</span>
              <span className="text-xs text-slate-400"> / month ($2.49)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-[#FF4B82]" /> Unlimited AI Camera Scans
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-[#FF4B82]" /> Full E-Number Additive Toxicity Reports
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-[#FF4B82]" /> Personalized Disease Risk Matrix (Diabetes, BP)
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-[#FF4B82]" /> Smart Healthier Alternatives Engine
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-[#FF4B82]" /> Unlimited Side-by-Side Product Comparison
              </li>
            </ul>
          </div>
          <button className="btn-primary w-full justify-center text-xs py-2.5">
            Upgrade to Pro
          </button>
        </div>

        {/* B2B & ENTERPRISE */}
        <div className="glass-panel p-6 flex flex-col justify-between border-white/10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Brand & Analytics</span>
              <Building2 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="mb-4">
              <span className="text-3xl font-black text-white font-['Outfit']">Custom</span>
              <span className="text-xs text-slate-400"> / B2B Partnership</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" /> Healthy Brand Affiliate Collaborations
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" /> Anonymized Consumer Food Trend Analytics
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" /> Enterprise API Access for Dietitians
              </li>
            </ul>
          </div>
          <button className="btn-secondary w-full justify-center text-xs py-2.5">
            Contact Enterprise Team
          </button>
        </div>

      </div>
    </section>
  );
}
