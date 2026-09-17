import React from 'react';
import { Scan, FileText, HeartPulse, Sparkles, Layers, DollarSign } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, hasScannedProduct }) {
  const navItems = [
    { id: 'scanner', label: 'Scan', icon: Scan },
    ...(hasScannedProduct ? [{ id: 'report', label: 'Report', icon: FileText }] : []),
    { id: 'disease', label: 'Disease', icon: HeartPulse },
    { id: 'additives', label: 'Additives', icon: Sparkles },
    { id: 'alternatives', label: 'Swaps', icon: Layers },
    { id: 'pricing', label: 'Plans', icon: DollarSign },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060911]/95 border-t border-white/10 backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg shadow-[#FF4B82]/30 scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
