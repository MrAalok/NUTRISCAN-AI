import React, { useState } from 'react';
import { Camera, Upload, Search, Zap, CheckCircle2, RefreshCw, Barcode, Sparkles } from 'lucide-react';
import { INITIAL_FOOD_DATABASE } from '../data/foodDatabase';
import { searchFoodProducts } from '../services/openFoodFactsApi';

export default function ScannerHero({ onSelectProduct, isScanning, setIsScanning }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload' | 'search'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Trigger barcode camera scan simulation
  const handleSimulateScan = async (product) => {
    setIsScanning(true);
    setTimeout(() => {
      onSelectProduct(product);
      setIsScanning(false);
    }, 1200);
  };

  // Search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchFoodProducts(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  // Image Upload handler simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
      setIsScanning(true);
      setTimeout(() => {
        onSelectProduct(INITIAL_FOOD_DATABASE[0]);
        setIsScanning(false);
      }, 1500);
    }
  };

  return (
    <section className="relative pt-6 pb-10 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow orb */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF4B82]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Header Text */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#FF4B82] mb-4 font-medium backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4B82]" />
          <span>Tech for Health Initiative • AI Food Transparency Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3 font-['Outfit']">
          Scan Any Packaged Food. <br className="hidden sm:inline" />
          <span className="gradient-text">Know The Hidden Health Truth.</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          "Let's make technology the guardian of our health." Instant AI breakdown of advantages, short & long-term body impact, E-number additives, and disease suitability.
        </p>
      </div>

      {/* Scanner Control Studio Card */}
      <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 relative overflow-hidden">
        
        {/* Input Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/[0.04] rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'camera'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Live Scanner
          </button>
          
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload Label
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            Search DB
          </button>
        </div>

        {/* TAB 1: Live Camera / Laser Barcode Viewfinder */}
        {activeTab === 'camera' && (
          <div className="text-center">
            <div className="relative w-full h-56 sm:h-64 rounded-2xl border-2 border-dashed border-[#FF4B82]/40 bg-[#090D16]/90 overflow-hidden flex flex-col items-center justify-center p-4">
              
              {/* Laser Animation when scanning */}
              {isScanning && <div className="laser-line" />}

              {/* Viewfinder Corner Framing Lines */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FF4B82]" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FF4B82]" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FF4B82]" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FF4B82]" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#FF4B82]/10 border border-[#FF4B82]/30 flex items-center justify-center mb-3">
                  <Barcode className={`w-7 h-7 text-[#FF4B82] ${isScanning ? 'animate-bounce' : ''}`} />
                </div>

                <p className="text-sm font-semibold text-white mb-1">
                  {isScanning ? 'Scanning Barcode & Decoding AI Nutrition...' : 'Position Barcode inside frame'}
                </p>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Point device camera at any packaged food item or select a demo packet below
                </p>

                <button
                  onClick={() => handleSimulateScan(INITIAL_FOOD_DATABASE[0])}
                  disabled={isScanning}
                  className="btn-primary py-2.5 px-6 text-xs font-semibold"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing Ingredients...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" />
                      Trigger Instant Scan Demo
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Image Upload */}
        {activeTab === 'upload' && (
          <div className="text-center">
            <label className="relative w-full h-56 sm:h-64 rounded-2xl border-2 border-dashed border-purple-500/30 bg-[#090D16]/90 hover:border-purple-500/60 transition-colors flex flex-col items-center justify-center p-6 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedFile ? (
                <div className="flex flex-col items-center">
                  <img src={uploadedFile} alt="Uploaded label" className="w-20 h-20 object-cover rounded-xl mb-2 border border-white/20" />
                  <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Image Uploaded! Extracting Nutrition Table...
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-3">
                    <Upload className="w-7 h-7 text-purple-400" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Drag & Drop Food Label Photo
                  </p>
                  <p className="text-xs text-slate-400 mb-3">
                    Supports PNG, JPG, WEBP • AI OCR will extract ingredients and nutrition values
                  </p>
                  <span className="btn-secondary py-2 px-5 text-xs">
                    Browse File
                  </span>
                </>
              )}
            </label>
          </div>
        )}

        {/* TAB 3: Global Database Search */}
        {activeTab === 'search' && (
          <div>
            <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter product name, barcode, or brand (e.g. Oats, Maggi, Cola)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#FF4B82]"
                />
              </div>
              <button type="submit" disabled={isSearching} className="btn-primary py-3 px-5 text-xs">
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search'}
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Search Results ({searchResults.length}):
                </p>
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 cursor-pointer transition-all gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{prod.brand} • {prod.category}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                      prod.rating === 'Green' ? 'badge-green' : prod.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                    }`}>
                      Score: {prod.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Demo Packets Preset Row (Fixed Non-Overlapping Grid) */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>⚡ Quick Demo - Select a Food Packet to Test:</span>
            <span className="text-[10px] font-normal text-slate-500">1-Click Scan</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INITIAL_FOOD_DATABASE.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSimulateScan(item)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all text-left group overflow-hidden w-full"
              >
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" />
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate leading-tight mb-1">{item.name}</p>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.2 rounded-full ${
                    item.rating === 'Green' ? 'badge-green' : item.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                  }`}>
                    {item.rating} • {item.score}/100
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
