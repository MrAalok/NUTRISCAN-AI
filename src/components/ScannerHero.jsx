import React, { useState, useRef } from 'react';
import { Camera, Search, RefreshCw, Barcode, AlertCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { fetchProductByBarcode, searchFoodProducts } from '../services/openFoodFactsApi';
import { analyzePacketViaRailwayBackend } from '../services/geminiVisionService';

export default function ScannerHero({ onSelectProduct, isScanning, setIsScanning }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'barcodeInput' | 'search'
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [scanError, setScanError] = useState(null);

  const fileInputRef = useRef(null);

  // REAL AUTHENTIC INDIAN GS1 EAN BARCODES (890 PREFIX)
  const REAL_PRESET_BARCODES = [
    { name: "Maggi 2-Min Masala", brand: "Nestlé India", code: "8901058852370", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&auto=format&fit=crop&q=80" },
    { name: "Amul Salted Butter", brand: "Amul India", code: "8901262010054", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&auto=format&fit=crop&q=80" },
    { name: "Parle-G Glucose Biscuits", brand: "Parle India", code: "8901030000013", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&auto=format&fit=crop&q=80" },
    { name: "Cadbury Dairy Milk", brand: "Mondelez India", code: "8901233020945", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&auto=format&fit=crop&q=80" },
    { name: "Kurkure Masala Munch", brand: "PepsiCo India", code: "8901491001559", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&auto=format&fit=crop&q=80" },
    { name: "Quaker Rolled Oats", brand: "PepsiCo India", code: "8901491101914", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80" }
  ];

  const HOUSEHOLD_SEARCH_CHIPS = ["Maggi", "Parle-G", "Amul Butter", "Dairy Milk", "Kurkure", "Lays India", "Bournvita", "Tata Dal"];

  // Fetch real barcode data from Master GS1 Database & OFF API
  // Helper: Resize & compress high-res mobile camera photos (max 800x800, JPEG 0.8)
  const compressAndResizeImage = (file, maxWidth = 800, maxHeight = 800) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  // Fetch real barcode data from Master GS1 Database, OFF API & Railway AI
  const handleRealBarcodeFetch = async (code) => {
    if (!code) return;
    setIsScanning(true);
    setScanError(null);

    const cleanCode = code.toString().replace(/\D/g, '');
    const realProduct = await fetchProductByBarcode(cleanCode || code);
    setIsScanning(false);

    if (realProduct && realProduct.name && realProduct.name !== "Packaged Food Item") {
      onSelectProduct(realProduct);
    } else {
      setScanError(`Barcode "${code}" not found in database. Please upload/take a packet photo or search by product name (e.g. Maggi, Lay's, Oats).`);
    }
  };

  // Handle Photo Capture barcode decoding & Railway AI Vision
  const handlePhotoCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    setScanError(null);

    try {
      // 1. Compress image first to 800x800 max for instant scanning & upload
      const base64Image = await compressAndResizeImage(file);
      if (!base64Image) {
        setIsScanning(false);
        setScanError("Failed to process photo. Please try uploading again or search by product name.");
        return;
      }

      // 2. Try native BarcodeDetector
      let code = null;
      if ('BarcodeDetector' in window) {
        try {
          const barcodeDetector = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'qr_code'] });
          const imgEl = new Image();
          imgEl.src = base64Image;
          await new Promise(r => imgEl.onload = r);
          const barcodes = await barcodeDetector.detect(imgEl);
          if (barcodes && barcodes.length > 0) {
            code = barcodes[0].rawValue;
          }
        } catch (detErr) {
          console.warn("BarcodeDetector attempt:", detErr);
        }
      }

      // 3. Try Html5Qrcode decoder on compressed image file
      if (!code) {
        try {
          const html5Qrcode = new Html5Qrcode("reader-temp");
          const blob = await (await fetch(base64Image)).blob();
          const resizedFile = new File([blob], "packet.jpg", { type: "image/jpeg" });
          code = await html5Qrcode.scanFile(resizedFile, true);
        } catch (qrErr) {
          console.warn("HTML5 QR Code scan attempt:", qrErr);
        }
      }

      // 4. If barcode number extracted, fetch product
      if (code) {
        const cleanCode = code.replace(/\D/g, '');
        if (cleanCode) {
          const realProduct = await fetchProductByBarcode(cleanCode);
          if (realProduct && realProduct.name && realProduct.name !== "Packaged Food Item") {
            setIsScanning(false);
            onSelectProduct(realProduct);
            return;
          }
        }
      }

      // 5. If barcode detector produced no result or unknown product, pass compressed photo to AI Vision!
      const aiResult = await analyzePacketViaRailwayBackend(base64Image);
      setIsScanning(false);

      if (aiResult && aiResult.name && aiResult.name !== "Packaged Food Item") {
        onSelectProduct(aiResult);
      } else {
        setScanError("Barcode or packet label not recognized automatically. Please click the Search tab above to search by product name (e.g. Maggi, Lay's, Oats)!");
      }
    } catch (err) {
      console.error("Photo capture handler error:", err);
      setIsScanning(false);
      setScanError("An error occurred reading photo. Please try searching by product name in Search tab.");
    }
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
      {/* Hidden offscreen container for Html5Qrcode file scan initialization */}
      <div id="reader-temp" style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '400px', height: '400px', opacity: 0, pointerEvents: 'none' }}></div>

      {/* Hero Header Text */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2 font-['Outfit']">
          Scan Any Food. <br />
          <span className="gradient-text">Know What's Inside.</span>
        </h1>

        <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal px-2">
          Instant nutritional analysis, chemical additive safety breakdown, and Indian health ratings.
        </p>
      </div>

      {/* Scanner Control Studio Card */}
      <div className="max-w-4xl mx-auto glass-panel p-4 sm:p-8 relative overflow-hidden bg-white border border-slate-200 shadow-xl">
        
        {/* Input Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-5 text-center">
          <button
            onClick={() => setActiveTab('camera')}
            className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'camera'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#6366F1] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Camera</span>
          </button>
          
          <button
            onClick={() => setActiveTab('barcodeInput')}
            className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'barcodeInput'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#6366F1] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Barcode className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Barcode</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-[#FF4B82] to-[#6366F1] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Search</span>
          </button>
        </div>

        {/* Error Alert Banner */}
        {scanError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{scanError}</span>
            </div>
            <button 
              onClick={() => { setActiveTab('search'); setSearchQuery('Maggi'); handleSearchSubmit('Maggi'); }}
              className="text-[10px] font-bold bg-rose-600 text-white px-2.5 py-1 rounded-md shrink-0"
            >
              Try Search
            </button>
          </div>
        )}

        {/* TAB 1: Mobile Native Camera Scan */}
        {activeTab === 'camera' && (
          <div className="text-center space-y-4">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handlePhotoCapture}
              className="hidden"
            />

            <div className="relative w-full min-h-[220px] rounded-2xl border-2 border-dashed border-[#FF4B82]/40 bg-slate-50 flex flex-col items-center justify-center p-4">
              {isScanning && <div className="laser-line" />}
              
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mb-2">
                <Camera className={`w-6 h-6 text-[#FF4B82] ${isScanning ? 'animate-pulse' : ''}`} />
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                {isScanning ? 'Analyzing Product Nutrition & Labels...' : 'Scan Food Barcode / Packet Photo'}
              </p>
              
              <p className="text-xs text-slate-500 max-w-sm mb-4">
                Point your phone camera at any food barcode or packet label to read instant FSSAI health score.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="btn-primary py-3 px-6 text-xs font-bold shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo / Upload Packet</span>
                </button>
              </div>
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
                    color: '#64748B',
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
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
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
                    color: '#64748B',
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
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
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
              <span className="text-[10px] text-slate-500 font-bold">Quick Search:</span>
              {HOUSEHOLD_SEARCH_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSearchQuery(chip); handleSearchSubmit(chip); }}
                  className="text-[9px] sm:text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full border border-slate-200 text-slate-700 transition-all"
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
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{prod.brand}</p>
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
        <div className="mt-5 pt-4 border-t border-slate-200">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
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
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  textAlign: 'left',
                  width: '100%',
                  overflow: 'hidden'
                }}
                className="hover:bg-slate-100 transition-all group"
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
                  <p className="text-xs font-bold text-slate-900 truncate leading-tight mb-1">{item.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono truncate">{item.brand}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
