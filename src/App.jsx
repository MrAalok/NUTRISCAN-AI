import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ScannerHero from './components/ScannerHero';
import HealthReportCard from './components/HealthReportCard';
import DiseaseMatrix from './components/DiseaseMatrix';
import AdditiveDecoder from './components/AdditiveDecoder';
import AlternativesSection from './components/AlternativesSection';
import ComparisonModal from './components/ComparisonModal';
import Footer from './components/Footer';

import { INITIAL_FOOD_DATABASE } from './data/foodDatabase';
import { INDIAN_GS1_BARCODE_DATABASE } from './data/indianBarcodeDatabase';

// Master combined food catalog
const MASTER_FOOD_CATALOG = Array.from(
  new Map([...INITIAL_FOOD_DATABASE, ...INDIAN_GS1_BARCODE_DATABASE].map(item => [item.id || item.barcode || item.name, item])).values()
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_FOOD_DATABASE[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'report' | 'disease' | 'additives' | 'alternatives'
  
  // Comparison modal state
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Handle product selection & switch to dedicated Report tab
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#FF4B82] selection:text-white pb-28 md:pb-0">
      
      {/* Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasScannedProduct={!!selectedProduct}
        comparisonCount={compareList.length}
        onOpenComparison={() => setIsCompareOpen(true)}
      />

      {/* Sub Header Product Context Strip */}
      {selectedProduct && activeTab !== 'scanner' && (
        <div className="bg-white/95 border-b border-slate-200 py-2.5 px-3 sticky top-[52px] sm:top-[60px] z-40 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setActiveTab('scanner')}
                className="btn-secondary py-1 px-2.5 text-xs flex items-center gap-1 shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Scan New</span>
              </button>
              
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-bold text-slate-900 font-['Outfit'] truncate">{selectedProduct.name}</span>
                <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full shrink-0 ${
                  selectedProduct.rating === 'Green' ? 'badge-green' : selectedProduct.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                }`}>
                  {selectedProduct.score}/100
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('report')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'report' ? 'bg-[#FF4B82] text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Report
              </button>
              <button
                onClick={() => setActiveTab('disease')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'disease' ? 'bg-[#FF4B82] text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Disease
              </button>
              <button
                onClick={() => setActiveTab('additives')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'additives' ? 'bg-[#FF4B82] text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Additives
              </button>
              <button
                onClick={() => setActiveTab('alternatives')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'alternatives' ? 'bg-[#FF4B82] text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Swaps
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 py-4 sm:py-8">
        
        {/* Scanner Screen */}
        {activeTab === 'scanner' && (
          <div className="animate-fadeIn">
            <ScannerHero
              onSelectProduct={handleSelectProduct}
              isScanning={isScanning}
              setIsScanning={setIsScanning}
            />
          </div>
        )}

        {/* Health Report Screen */}
        {activeTab === 'report' && selectedProduct && (
          <div className="animate-fadeIn">
            <HealthReportCard
              product={selectedProduct}
              onAddToCompare={handleAddToCompare}
              isCompared={compareList.some(i => i.id === selectedProduct.id)}
            />
          </div>
        )}

        {/* Disease Risk Checker Screen */}
        {activeTab === 'disease' && selectedProduct && (
          <div className="animate-fadeIn">
            <DiseaseMatrix product={selectedProduct} />
          </div>
        )}

        {/* Additive Decoder Screen */}
        {activeTab === 'additives' && selectedProduct && (
          <div className="animate-fadeIn">
            <AdditiveDecoder product={selectedProduct} />
          </div>
        )}

        {/* Healthier Alternatives Screen */}
        {activeTab === 'alternatives' && selectedProduct && (
          <div className="animate-fadeIn">
            <AlternativesSection
              product={selectedProduct}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        )}

      </main>

      {/* Side by Side Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        setCompareList={setCompareList}
        onRemoveItem={handleRemoveFromCompare}
        allProducts={MASTER_FOOD_CATALOG}
      />

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
