import React from 'react';
import { Scan, FileText, HeartPulse, Sparkles, Layers, DollarSign } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, hasScannedProduct }) {
  const navItems = [
    { id: 'scanner', label: 'Scan', icon: Scan },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'disease', label: 'Disease', icon: HeartPulse },
    { id: 'additives', label: 'Additives', icon: Sparkles },
    { id: 'alternatives', label: 'Swaps', icon: Layers },
    { id: 'pricing', label: 'Plans', icon: DollarSign },
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#060911',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-around',
        boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.7)'
      }}
      className="md:hidden"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 10px',
              borderRadius: '12px',
              border: 'none',
              background: isActive ? 'linear-gradient(135deg, #FF4B82 0%, #8B5CF6 100%)' : 'transparent',
              color: isActive ? '#FFFFFF' : '#94A3B8',
              boxShadow: isActive ? '0 4px 15px rgba(255, 75, 130, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon style={{ width: '18px', height: '18px', marginBottom: '2px' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '-0.02em' }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
