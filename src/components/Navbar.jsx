import React from 'react';
import { Scan, Sparkles, Scale, HeartPulse, Layers, FileText } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasScannedProduct, comparisonCount, onOpenComparison }) {
  const navItems = [
    { id: 'scanner', label: 'Scanner', icon: Scan },
    { id: 'report', label: 'Health Report', icon: FileText },
    { id: 'disease', label: 'Disease Risks', icon: HeartPulse },
    { id: 'additives', label: 'Additives', icon: Sparkles },
    { id: 'alternatives', label: 'Healthy Swaps', icon: Layers },
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 5000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid #E2E8F0',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
      }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('scanner')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF4B82] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-md shadow-[#FF4B82]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Scan className="w-4 h-4 text-[#FF4B82]" />
            </div>
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-['Outfit']">
            NutriScan <span className="gradient-text">HEALTH</span>
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 max-w-full p-1 bg-slate-100 rounded-xl border border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF4B82] to-[#6366F1] text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
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
          <button
            onClick={onOpenComparison}
            className="btn-secondary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-[#FF4B82]" />
            <span>Compare</span>
            {comparisonCount > 0 && (
              <span className="ml-1 w-4 h-4 bg-[#FF4B82] text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                {comparisonCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
