import React from 'react';
import { ShieldCheck, Scan, Sparkles, Scale, HeartPulse, DollarSign, UserCheck, Database, Layers, FileText } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasScannedProduct, comparisonCount, onOpenComparison }) {
  const navItems = [
    { id: 'scanner', label: 'Scanner', icon: Scan },
    { id: 'report', label: 'Health Report', icon: FileText },
    { id: 'disease', label: 'Disease Risks', icon: HeartPulse },
    { id: 'additives', label: 'E-Numbers', icon: Sparkles },
    { id: 'alternatives', label: 'Health Swaps', icon: Layers },
    { id: 'sources', label: 'Data Sources', icon: Database },
    { id: 'founder', label: 'Founder Story', icon: UserCheck },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 5000,
        backgroundColor: '#090D16',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '10px 16px'
      }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('scanner')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF4B82] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-lg shadow-[#FF4B82]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
              <Scan className="w-4 h-4 text-[#FF4B82]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-['Outfit']">
                NUTRISCAN <span className="gradient-text">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#FF4B82]/20 text-[#FF4B82] border border-[#FF4B82]/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Tech for Health • Arushi Shivhare
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-1 max-w-full p-1 bg-white/[0.04] rounded-2xl border border-white/10">
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
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>FSSAI Verified</span>
          </div>

          <button
            onClick={onOpenComparison}
            className="relative btn-secondary py-1 px-2.5 sm:py-1.5 sm:px-3 text-xs font-semibold"
          >
            <Scale className="w-3.5 h-3.5 text-[#FF4B82]" />
            <span className="text-xs">Compare</span>
            {comparisonCount > 0 && (
              <span className="ml-1 w-4 h-4 bg-[#FF4B82] text-white font-bold text-[9px] rounded-full flex items-center justify-center animate-bounce">
                {comparisonCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
