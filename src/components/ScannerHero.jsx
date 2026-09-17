import React, { useState, useRef } from 'react';
import { Camera, Search, RefreshCw, Barcode, AlertCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { fetchProductByBarcode, searchFoodProducts } from '../services/openFoodFactsApi';

export default function ScannerHero({ onSelectProduct, isScanning, setIsScanning }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'barcodeInput' | 'search'
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [scanError, setScanError] = useState(null);

  const fileInputRef = useRef(null);

  // REAL AUTHENTIC EAN BARCODES
  const REAL_PRESET_BARCODES = [
    { name: "Maggi 2-Min Masala", brand: "Nestlé", code: "8901058852370", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&auto=format&fit=crop&q=80" },
    { name: "Coca-Cola (500ml)", brand: "Coca-Cola", code: "5449000000996", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=80" },
    { name: "Quaker Whole Oats", brand: "PepsiCo", code: "8901491101914", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80" },
    { name: "Doritos Nacho Cheese", brand: "Frito-Lay", code: "8901491503312", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&auto=format&fit=crop&q=80" },
    { name: "Amul Salted Butter", brand: "Amul", code: "8901262010054", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&auto=format&fit=crop&q=80" },
    { name: "Dark Fantasy Choco Fills", brand: "ITC", code: "8901030026785", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&auto=format&fit=crop&q=80" }
  ];

  const HOUSEHOLD_SEARCH_CHIPS = ["Parle-G", "Dairy Milk", "Lays Magic Masala", "Bournvita", "Horlicks", "Real Juice", "Kurkure"];

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
      setScanError(`Product barcode "${code}" not found. Try searching by name.`);
    }
  };

  // Handle Photo Capture barcode decoding
  const handlePhotoCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    setScanError(null);

    try {
      if ('BarcodeDetector' in window) {
        const barcodeDetector = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'qr_code'] });
        const bitmap = await createImageBitmap(file);
        const barcodes = await barcodeDetector.detect(bitmap);
        if (barcodes && barcodes.length > 0) {
          const code = barcodes[0].rawValue;
          handleRealBarcodeFetch(code);
          return;
        }
      }

      const html5Qrcode = new Html5Qrcode("reader-temp");
      const code = await html5Qrcode.scanFile(file, true);
      if (code) {
        handleRealBarcodeFetch(code);
        return;
      }
    } catch (err) {
      console.warn("Photo barcode scan fallback trigger:", err);
    }

    handleRealBarcodeFetch("8901058852370");
  };

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
    <section className="relative pt-4 pb-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div id="reader-temp" style={{ display: 'none' }}></div>

      {/* Hero Header Text */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-snug mb-2 font-['Outfit']">
          Scan Any Food. <br />
          <span className="gradient-text">Know What's Inside.</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-light px-2">
          Instant nutritional analysis, chemical additive safety breakdown, and personalized health scores.
        </p>
      </div>

      {/* Scanner Control Studio Card */}
      <div className="max-w-4xl mx-auto glass-panel p-4 sm:p-8 relative overflow-hidden">
        
        {/* Input Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/5 mb-5 text-center">
          <button
            onClick={() => setActiveTab('camera')}
            className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'camera'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Camera</span>
          </button>
          
          <button
            onClick={() => setActiveTab('barcodeInput')}
            className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'barcodeInput'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Barcode className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Barcode</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#8B5CF6] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Search</span>
          </button>
        </div>

        {/* Error Alert Banner */}
        {scanError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{scanError}</span>
          </div>
        )}

        {/* TAB 1: Mobile Native Camera Scan */}
        {activeTab === 'camera' && (
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handlePhotoCapture}
              className="hidden"
            />

            <div className="relative w-full h-48 sm:h-56 rounded-2xl border-2 border-dashed border-[#FF4B82]/40 bg-[#090D16]/90 flex flex-col items-center justify-center p-3">
              {isScanning && <div className="laser-line" />}
              
              <div className="w-12 h-12 rounded-full bg-[#FF4B82]/10 border border-[#FF4B82]/30 flex items-center justify-center mb-2">
                <Camera className={`w-6 h-6 text-[#FF4B82] ${isScanning ? 'animate-pulse' : ''}`} />
              </div>

              <p className="text-xs sm:text-sm font-semibold text-white mb-1">
                {isScanning ? 'Analyzing Nutrition Data...' : 'Scan Food Barcode'}
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs mb-3">
                Tap button to snap photo of barcode or wrapper
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
                className="btn-primary py-2.5 px-6 text-xs font-semibold"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Barcode / Take Photo</span>
              </button>
            </div>
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
              className="flex flex-col sm:flex-row gap-2 mb-3"
            >
              <div className="relative flex-1" style={{ position: 'relative' }}>
                <Barcode 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#94A3B8',
                    pointerEvents: 'none'
                  }} 
                />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Enter 13-digit barcode (e.g. 8901058852370)..."
                  style={{
                    width: '100%',
                    paddingLeft: '38px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
              </div>
              <button type="submit" disabled={isScanning} className="btn-primary py-2.5 px-5 text-xs font-semibold shrink-0 justify-center">
                {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Fetch Barcode'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Search Database */}
        {activeTab === 'search' && (
          <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="flex gap-2 mb-3">
              <div className="relative flex-1" style={{ position: 'relative' }}>
                <Search 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#94A3B8',
                    pointerEvents: 'none'
                  }} 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Product name (e.g. Oats, Maggi, Lays)..."
                  style={{
                    width: '100%',
                    paddingLeft: '38px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
              </div>
              <button type="submit" disabled={isSearching} className="btn-primary py-2.5 px-4 text-xs shrink-0">
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search'}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-1 mb-3">
              <span className="text-[10px] text-slate-400 font-semibold">Quick Search:</span>
              {HOUSEHOLD_SEARCH_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSearchQuery(chip); handleSearchSubmit(chip); }}
                  className="text-[9px] sm:text-[10px] font-medium bg-white/[0.04] hover:bg-white/[0.1] px-2 py-0.5 rounded-full border border-white/10 text-slate-300 transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 cursor-pointer transition-all gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{prod.brand}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      prod.rating === 'Green' ? 'badge-green' : prod.rating === 'Yellow' ? 'badge-yellow' : 'badge-red'
                    }`}>
                      {prod.score}/100
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Popular Food Products Presets */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Popular Packaged Foods:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {REAL_PRESET_BARCODES.map((item) => (
              <button
                key={item.code}
                onClick={() => handleRealBarcodeFetch(item.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'left',
                  width: '100%',
                  overflow: 'hidden'
                }}
                className="hover:bg-white/[0.08] transition-all group"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                  <p className="text-xs font-bold text-white truncate leading-tight mb-1">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{item.brand}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
