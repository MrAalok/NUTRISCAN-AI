import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Search, Zap, CheckCircle2, RefreshCw, Barcode, Sparkles, AlertCircle, Globe, ShieldCheck } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { fetchProductByBarcode, searchFoodProducts } from '../services/openFoodFactsApi';

export default function ScannerHero({ onSelectProduct, isScanning, setIsScanning }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'barcodeInput' | 'search'
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const scannerRef = useRef(null);

  // REAL AUTHENTIC EAN BARCODES (Printed on real Indian/Global food packets)
  const REAL_PRESET_BARCODES = [
    { name: "Maggi 2-Min Masala", brand: "Nestlé", code: "8901058852370", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&auto=format&fit=crop&q=80" },
    { name: "Coca-Cola (500ml)", brand: "Coca-Cola", code: "5449000000996", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=80" },
    { name: "Quaker Whole Oats", brand: "PepsiCo", code: "8901491101914", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80" },
    { name: "Doritos Nacho Cheese", brand: "Frito-Lay", code: "8901491503312", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&auto=format&fit=crop&q=80" },
    { name: "Amul Salted Butter", brand: "Amul", code: "8901262010054", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&auto=format&fit=crop&q=80" },
    { name: "Dark Fantasy Choco Fills", brand: "ITC", code: "8901030026785", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&auto=format&fit=crop&q=80" }
  ];

  // Common Indian Household Search Chips
  const HOUSEHOLD_SEARCH_CHIPS = ["Parle-G", "Dairy Milk", "Lays Magic Masala", "Bournvita", "Horlicks", "Real Orange Juice", "Kurkure"];

  // Fetch real barcode data from OpenFoodFacts API
  const handleRealBarcodeFetch = async (code) => {
    if (!code) return;
    setIsScanning(true);
    setScanError(null);

    const realProduct = await fetchProductByBarcode(code);
    setIsScanning(false);

    if (realProduct) {
      onSelectProduct(realProduct);
    } else {
      setScanError(`Product barcode "${code}" not found in Open Food Facts global database. Try searching by product name.`);
    }
  };

  // Initialize Real Camera Barcode Scanner using html5-qrcode
  useEffect(() => {
    if (activeTab === 'camera' && isCameraActive) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 180 } },
        false
      );

      html5QrcodeScanner.render(
        (decodedText) => {
          html5QrcodeScanner.clear();
          setIsCameraActive(false);
          handleRealBarcodeFetch(decodedText);
        },
        (error) => {}
      );

      scannerRef.current = html5QrcodeScanner;

      return () => {
        try {
          html5QrcodeScanner.clear();
        } catch (e) {}
      };
    }
  }, [activeTab, isCameraActive]);

  // Handle Search submit
  const handleSearchSubmit = async (queryToSearch) => {
    const q = queryToSearch || searchQuery;
    if (!q || !q.trim()) return;
    setIsSearching(true);
    setScanError(null);
    const results = await searchFoodProducts(q);
    setSearchResults(results);
    setIsSearching(false);
    if (results.length === 0) {
      setScanError(`No products found for "${q}". Try typing another brand or item.`);
    }
  };

  return (
    <section className="relative pt-6 pb-10 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow orb */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF4B82]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Header Text */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-4 font-semibold backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          <span>100% Real Live Data • Connected to Open Food Facts Global API</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3 font-['Outfit']">
          Scan Any Packaged Food. <br className="hidden sm:inline" />
          <span className="gradient-text">Know The Hidden Health Truth.</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          "Let's make technology the guardian of our health." Live API barcode lookup for authentic nutrient & additive analysis.
        </p>
      </div>

      {/* Scanner Control Studio Card */}
      <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 relative overflow-hidden">
        
        {/* Input Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/[0.04] rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => { setActiveTab('camera'); setIsCameraActive(true); }}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'camera'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Live Camera Scan
          </button>
          
          <button
            onClick={() => setActiveTab('barcodeInput')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'barcodeInput'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Barcode className="w-4 h-4" />
            Enter Barcode Number
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
            Search Global DB
          </button>
        </div>

        {/* Error Alert Banner */}
        {scanError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{scanError}</span>
          </div>
        )}

        {/* TAB 1: Live Camera Barcode Scanner */}
        {activeTab === 'camera' && (
          <div className="text-center">
            {isCameraActive ? (
              <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-white/20 bg-black p-2">
                <div id="reader" className="w-full text-white"></div>
                <button
                  onClick={() => setIsCameraActive(false)}
                  className="mt-3 btn-secondary text-xs py-1.5 px-4"
                >
                  Close Camera Scanner
                </button>
              </div>
            ) : (
              <div className="relative w-full h-56 sm:h-64 rounded-2xl border-2 border-dashed border-[#FF4B82]/40 bg-[#090D16]/90 flex flex-col items-center justify-center p-4">
                {isScanning && <div className="laser-line" />}
                
                <div className="w-14 h-14 rounded-full bg-[#FF4B82]/10 border border-[#FF4B82]/30 flex items-center justify-center mb-3">
                  <Camera className={`w-7 h-7 text-[#FF4B82] ${isScanning ? 'animate-pulse' : ''}`} />
                </div>

                <p className="text-sm font-semibold text-white mb-1">
                  {isScanning ? 'Fetching Live Data from Open Food Facts API...' : 'Ready to Scan Food Barcode'}
                </p>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Turn on device camera to scan physical barcode or test preset below
                </p>

                <button
                  onClick={() => setIsCameraActive(true)}
                  disabled={isScanning}
                  className="btn-primary py-2.5 px-6 text-xs font-semibold"
                >
                  <Camera className="w-4 h-4" />
                  Open Device Camera Barcode Scanner
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Enter Barcode Number */}
        {activeTab === 'barcodeInput' && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRealBarcodeFetch(barcodeInput);
              }}
              className="flex flex-col sm:flex-row gap-2 mb-4"
            >
              <div className="relative flex-1">
                <Barcode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Enter 13-digit food EAN barcode (e.g. 8901058852370)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#FF4B82]"
                />
              </div>
              <button type="submit" disabled={isScanning} className="btn-primary py-3 px-6 text-xs font-semibold shrink-0">
                {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Fetch Live Barcode Data'}
              </button>
            </form>
            <p className="text-[11px] text-slate-400">
              💡 <span className="text-slate-300 font-medium">Real Data Verification:</span> Type any 13-digit barcode off any food item in your kitchen (e.g. Parle-G: <span className="font-mono text-emerald-400">8901030800040</span>).
            </p>
          </div>
        )}

        {/* TAB 3: Real-Time Open Food Facts Database Search */}
        {activeTab === 'search' && (
          <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type product name or brand (e.g. Oats, Maggi, Kurkure, Lays, Cola)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#FF4B82]"
                />
              </div>
              <button type="submit" disabled={isSearching} className="btn-primary py-3 px-5 text-xs">
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search OpenFoodFacts'}
              </button>
            </form>

            {/* Household Search Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="text-[10px] text-slate-400 font-semibold">Try Quick Search:</span>
              {HOUSEHOLD_SEARCH_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSearchQuery(chip); handleSearchSubmit(chip); }}
                  className="text-[10px] font-medium bg-white/[0.04] hover:bg-white/[0.1] px-2.5 py-1 rounded-full border border-white/10 text-slate-300 transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Live API Results ({searchResults.length}):
                </p>
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 cursor-pointer transition-all gap-3"
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

        {/* Real Product Barcode Demo Presets */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Authentic Real EAN Packet Barcodes:
            </span>
            <span className="text-[10px] font-normal text-slate-400">Live Fetch from Open Food Facts API</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REAL_PRESET_BARCODES.map((item) => (
              <button
                key={item.code}
                onClick={() => handleRealBarcodeFetch(item.code)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all text-left group overflow-hidden w-full"
              >
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" />
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate leading-tight mb-0.5">{item.name}</p>
                  <p className="text-[10px] text-emerald-400 font-mono">EAN: {item.code}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
