import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Scan, HeartPulse, Sparkles, Layers, Database, UserCheck, DollarSign, ArrowRight, ArrowLeft, Activity } from 'lucide-react';

import Navbar from './components/Navbar';
import ScannerHero from './components/ScannerHero';
import HealthReportCard from './components/HealthReportCard';
import DiseaseMatrix from './components/DiseaseMatrix';
import AdditiveDecoder from './components/AdditiveDecoder';
import AlternativesSection from './components/AlternativesSection';
import ComparisonModal from './components/ComparisonModal';
import DataSources from './components/DataSources';
import AboutFounder from './components/AboutFounder';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

import { INITIAL_FOOD_DATABASE } from './data/foodDatabase';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_FOOD_DATABASE[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'report' | 'disease' | 'additives' | 'alternatives' | 'sources' | 'founder' | 'pricing'
  
  // Comparison modal state
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Handle product selection & switch to dedicated Report tab!
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);

    if (product.rating === 'Green') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#34D399', '#6EE7B7']
      });
    }

    // Switch to dedicated Report tab cleanly
    setActiveTab('report');
  };

  // Add item to compare list (max 2)
  const handleAddToCompare = (product) => {
    if (compareList.some(item => item.id === product.id)) return;
    if (compareList.length >= 2) {
      setCompareList([compareList[1], product]);
    } else {
      setCompareList([...compareList, product]);
    }
    setIsCompareOpen(true);
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareList(compareList.filter(item => item.id !== productId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white selection:bg-[#FF4B82] selection:text-white">
      
      {/* Top Glass Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasScannedProduct={!!selectedProduct}
        comparisonCount={compareList.length}
        onOpenComparison={() => setIsCompareOpen(true)}
      />

      {/* Sub Header Product Context Strip */}
      {selectedProduct && activeTab !== 'scanner' && activeTab !== 'sources' && activeTab !== 'founder' && activeTab !== 'pricing' && (
        <div className="bg-[#121826]/95 border-b border-white/10 py-3 px-4 sticky top-[60px] z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setActiveTab('scanner')}
                className="btn-secondary py-1 px-3 text-xs flex items-center gap-1.5 shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Scan New Packet</span>
              </button>
              
              <div className="flex items-center gap-2 truncate">
                <span className="text-slate-400">Selected Item:</span>
                <span className="font-bold text-white font-['Outfit'] truncate">{selectedProduct.name}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                  selectedProduct.rating === 'Green' ? 'badge-green' : selectedProduct.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                }`}>
                  Score: {selectedProduct.score}/100
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('report')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'report' ? 'bg-[#FF4B82] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Report
              </button>
              <button
                onClick={() => setActiveTab('disease')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'disease' ? 'bg-[#FF4B82] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Disease Risks
              </button>
              <button
                onClick={() => setActiveTab('additives')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'additives' ? 'bg-[#FF4B82] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Additives
              </button>
              <button
                onClick={() => setActiveTab('alternatives')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'alternatives' ? 'bg-[#FF4B82] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Swaps
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container - DEDICATED SINGLE-PURPOSE SCREENS */}
      <main className="flex-1 py-8">
        
        {/* PAGE 1: AI Scanner Studio Only (Zero clutter) */}
        {activeTab === 'scanner' && (
          <div className="animate-fadeIn">
            <ScannerHero
              onSelectProduct={handleSelectProduct}
              isScanning={isScanning}
              setIsScanning={setIsScanning}
            />
          </div>
        )}

        {/* PAGE 2: Dedicated AI Health Report Card Only */}
        {activeTab === 'report' && selectedProduct && (
          <div className="animate-fadeIn">
            <HealthReportCard
              product={selectedProduct}
              onAddToCompare={handleAddToCompare}
              isCompared={compareList.some(i => i.id === selectedProduct.id)}
            />
          </div>
        )}

        {/* PAGE 3: Dedicated Disease Risk Checker Only */}
        {activeTab === 'disease' && selectedProduct && (
          <div className="animate-fadeIn">
            <DiseaseMatrix product={selectedProduct} />
          </div>
        )}

        {/* PAGE 4: Dedicated E-Number Additive Decoder Only */}
        {activeTab === 'additives' && selectedProduct && (
          <div className="animate-fadeIn">
            <AdditiveDecoder product={selectedProduct} />
          </div>
        )}

        {/* PAGE 5: Dedicated Healthier Alternatives Recommender Only */}
        {activeTab === 'alternatives' && selectedProduct && (
          <div className="animate-fadeIn">
            <AlternativesSection
              product={selectedProduct}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        )}

        {/* PAGE 6: Dedicated Data Sources & Verification Only */}
        {activeTab === 'sources' && (
          <div className="animate-fadeIn">
            <DataSources />
          </div>
        )}

        {/* PAGE 7: Dedicated Founder Spotlight & Pitch Presentation Only */}
        {activeTab === 'founder' && (
          <div className="animate-fadeIn">
            <AboutFounder />
          </div>
        )}

        {/* PAGE 8: Dedicated Business Plans & Monetization Only */}
        {activeTab === 'pricing' && (
          <div className="animate-fadeIn">
            <PricingSection />
          </div>
        )}

      </main>

      {/* Side by Side Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveItem={handleRemoveFromCompare}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
