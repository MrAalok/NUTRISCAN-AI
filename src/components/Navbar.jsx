import React from 'react';
import { ShieldCheck, Scan, Sparkles, Scale, HeartPulse, DollarSign, UserCheck, Database, Layers, FileText } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasScannedProduct, comparisonCount, onOpenComparison }) {
  const navItems = [
    { id: 'scanner', label: 'Scanner', icon: Scan },
    ...(hasScannedProduct ? [{ id: 'report', label: 'Health Report', icon: FileText }] : []),
    { id: 'disease', label: 'Disease Risks', icon: HeartPulse },
    { id: 'additives', label: 'E-Numbers', icon: Sparkles },
    { id: 'alternatives', label: 'Health Swaps', icon: Layers },
    { id: 'sources', label: 'Data Sources', icon: Database },
    { id: 'founder', label: 'Founder Story', icon: UserCheck },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#090D16]/95 border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('scanner')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4B82] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-lg shadow-[#FF4B82]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
              <Scan className="w-5 h-5 text-[#FF4B82] group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">
                NUTRISCAN <span className="gradient-text">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FF4B82]/20 text-[#FF4B82] border border-[#FF4B82]/30">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Tech for Health • Arushi Shivhare
            </p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto max-w-full p-1 bg-white/[0.04] rounded-2xl border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg shadow-[#FF4B82]/25 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-[11px] bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>FSSAI Verified</span>
          </div>

          <button
            onClick={onOpenComparison}
            className="relative btn-secondary py-1.5 px-3 text-xs font-semibold"
          >
            <Scale className="w-4 h-4 text-[#FF4B82]" />
            <span>Compare</span>
            {comparisonCount > 0 && (
              <span className="ml-1 w-5 h-5 bg-[#FF4B82] text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                {comparisonCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
