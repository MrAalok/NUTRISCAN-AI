import React, { useState, useEffect } from 'react';
import { X, Scale, Search, Loader2 } from 'lucide-react';

export default function ComparisonModal({
  isOpen,
  onClose,
  compareList = [],
  setCompareList,
  onRemoveItem,
  allProducts = []
}) {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [isChangingA, setIsChangingA] = useState(false);
  const [isChangingB, setIsChangingB] = useState(false);

  // Live OpenFoodFacts search states
  const [apiResultsA, setApiResultsA] = useState([]);
  const [apiResultsB, setApiResultsB] = useState([]);
  const [isLoadingApiA, setIsLoadingApiA] = useState(false);
  const [isLoadingApiB, setIsLoadingApiB] = useState(false);

  const itemA = compareList[0] || null;
  const itemB = compareList[1] || null;

  // Helper to parse OpenFoodFacts product item into NutriScan AI format
  const formatOFFProduct = (offItem) => {
    const nutriscore = (offItem.nutriscore_grade || 'c').toLowerCase();
    let score = 50;
    if (nutriscore === 'a') score = 88;
    else if (nutriscore === 'b') score = 72;
    else if (nutriscore === 'c') score = 52;
    else if (nutriscore === 'd') score = 35;
    else if (nutriscore === 'e') score = 20;

    const sugars = offItem.nutriments?.sugars_100g || offItem.nutriments?.sugars || 0;
    const sodium = (offItem.nutriments?.sodium_100g || offItem.nutriments?.sodium || 0) * 1000;
    const protein = offItem.nutriments?.proteins_100g || offItem.nutriments?.proteins || 0;
    const calories = Math.round(offItem.nutriments?.['energy-kcal_100g'] || offItem.nutriments?.['energy-kcal'] || 220);

    const rating = score >= 75 ? 'Green' : score >= 45 ? 'Yellow' : 'Red';

    return {
      id: `off-${offItem.code || offItem._id || Math.random()}`,
      barcode: offItem.code || '',
      name: offItem.product_name_en || offItem.product_name || 'Market Packaged Food',
      brand: offItem.brands || 'Commercial Food Brand',
      category: offItem.categories || 'Packaged Foods',
      image: offItem.image_front_small_url || offItem.image_front_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
      score: score,
      rating: rating,
      verdict: `${rating === 'Green' ? 'Healthy choice' : rating === 'Yellow' ? 'Moderate caution' : 'High risk'} - OpenFoodFacts verified data`,
      servingSize: '100g standard',
      caloriesPerServing: calories,
      macros: {
        protein: `${Math.round(protein * 10) / 10}g`,
        carbs: `${Math.round((offItem.nutriments?.carbohydrates_100g || 0) * 10) / 10}g`,
        fat: `${Math.round((offItem.nutriments?.fat_100g || 0) * 10) / 10}g`,
        saturatedFat: `${Math.round((offItem.nutriments?.['saturated-fat_100g'] || 0) * 10) / 10}g`,
        sugar: `${Math.round(sugars * 10) / 10}g`,
        sodium: `${Math.round(sodium)}mg`,
        fiber: `${Math.round((offItem.nutriments?.fiber_100g || 0) * 10) / 10}g`
      },
      productInfo: {
        productName: offItem.product_name || 'Food Item',
        brand: offItem.brands || 'Market Brand',
        category: offItem.categories || 'Packaged Snacks',
        countryOfOrigin: offItem.countries || 'India 🇮🇳'
      },
      additives: (offItem.additives_tags || []).slice(0, 4).map(tag => ({
        code: tag.replace('en:', '').toUpperCase(),
        name: `Additive ${tag.replace('en:', '').toUpperCase()}`,
        risk: 'Moderate',
        description: 'Synthetic food processing additive'
      }))
    };
  };

  // Live OpenFoodFacts search for Slot 1
  useEffect(() => {
    if (!searchA || searchA.trim().length < 2) {
      setApiResultsA([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoadingApiA(true);
      try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchA)}&search_simple=1&action=process&json=1&page_size=8`);
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            setApiResultsA(data.products.filter(p => p.product_name).map(formatOFFProduct));
          }
        }
      } catch (err) {
        console.warn('OpenFoodFacts API Error (Slot 1):', err);
      } finally {
        setIsLoadingApiA(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchA]);

  // Live OpenFoodFacts search for Slot 2
  useEffect(() => {
    if (!searchB || searchB.trim().length < 2) {
      setApiResultsB([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoadingApiB(true);
      try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchB)}&search_simple=1&action=process&json=1&page_size=8`);
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            setApiResultsB(data.products.filter(p => p.product_name).map(formatOFFProduct));
          }
        }
      } catch (err) {
        console.warn('OpenFoodFacts API Error (Slot 2):', err);
      } finally {
        setIsLoadingApiB(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchB]);

  const handleSelectProductForSlot = (product, slotIndex) => {
    const updated = [...compareList];
    updated[slotIndex] = product;
    setCompareList(updated.filter(Boolean));
    if (slotIndex === 0) setIsChangingA(false);
    if (slotIndex === 1) setIsChangingB(false);
  };

  const handleQuickPreset = (prodA, prodB) => {
    if (prodA && prodB) {
      setCompareList([prodA, prodB]);
      setIsChangingA(false);
      setIsChangingB(false);
    }
  };

  // Pre-configured comparisons for quick selection
  const maggi = allProducts.find(p => p.id === 'maggi-2min' || p.name.includes('Maggi'));
  const slurrp = allProducts.find(p => p.name.includes('Slurrp') || p.name.includes('Millet'));
  const monaco = allProducts.find(p => p.id === 'parle-monaco-salty' || p.name.includes('Monaco'));
  const cadbury = allProducts.find(p => p.id === 'cadbury-dairy-milk' || p.name.includes('Cadbury'));
  const parleG = allProducts.find(p => p.id === 'parle-g-biscuits' || p.name.includes('Parle-G'));
  const lays = allProducts.find(p => p.name.includes("Lay's") || p.name.includes('Chips'));
  const oats = allProducts.find(p => p.name.includes('Oats') || p.name.includes('Saffola'));

  // Filter local products for dropdown
  const localFilteredA = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchA.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchA.toLowerCase())
  );

  const localFilteredB = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchB.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchB.toLowerCase())
  );

  // Combine Local + Live Global OpenFoodFacts API search results without duplicates
  const displayProductsA = Array.from(
    new Map([...localFilteredA, ...apiResultsA].map(item => [item.id || item.name, item])).values()
  );

  const displayProductsB = Array.from(
    new Map([...localFilteredB, ...apiResultsB].map(item => [item.id || item.name, item])).values()
  );

  // Helper numerical extractor for comparison (e.g. "860mg" -> 860, "7.8g" -> 7.8)
  const parseVal = (valStr) => {
    if (!valStr) return 0;
    const match = String(valStr).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Determine winner when both items are present
  let winner = null;
  let loser = null;
  if (itemA && itemB) {
    if (itemA.score >= itemB.score) {
      winner = itemA;
      loser = itemB;
    } else {
      winner = itemB;
      loser = itemA;
    }
  }

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        overflowY: 'auto'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          padding: '24px',
          position: 'relative'
        }}
      >
        
        {/* Modal Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '16px',
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF4B82 0%, #6366F1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(255, 75, 130, 0.3)'
              }}
            >
              <Scale style={{ width: '22px', height: '22px', color: '#FFFFFF' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>
                Food Product Comparison Studio
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                Compare Indian & Global packaged foods with live database lookup
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s'
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '20px',
            borderBottom: '1px solid #F1F5F9'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', whiteSpace: 'nowrap' }}>⚡ Quick Compare:</span>
          {maggi && slurrp && (
            <button 
              onClick={() => handleQuickPreset(maggi, slurrp)}
              style={{
                padding: '6px 14px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              🍜 Maggi vs Slurrp Millet Noodles
            </button>
          )}
          {lays && oats && (
            <button 
              onClick={() => handleQuickPreset(lays, oats)}
              style={{
                padding: '6px 14px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              🥔 Lay's Chips vs Saffola Oats
            </button>
          )}
          {monaco && cadbury && (
            <button 
              onClick={() => handleQuickPreset(monaco, cadbury)}
              style={{
                padding: '6px 14px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              🍪 Monaco vs Cadbury
            </button>
          )}
        </div>

        {/* TOP WINNER BANNER (IF BOTH ITEMS SELECTED) */}
        {itemA && itemB && (
          <div 
            style={{
              marginBottom: '24px',
              padding: '16px 20px',
              borderRadius: '20px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 900
                }}
              >
                🟢
              </div>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                  HEALTHIER CHOICE WINNER
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginTop: '2px', fontFamily: "'Outfit', sans-serif" }}>
                  {winner.name} (Score: {winner.score}/100)
                </h4>
                <p style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                  {winner.name} is safer than {loser.name} (Score: {loser.score}/100) with better nutritional balance.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '8px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
              <span>{itemA.name.split(' ')[0]}</span>
              <span style={{ color: '#94A3B8', margin: '0 6px' }}>vs</span>
              <span>{itemB.name.split(' ')[0]}</span>
            </div>
          </div>
        )}

        {/* COMPARISON SLOTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          
          {/* PRODUCT A SLOT */}
          <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                PRODUCT 1
              </span>
              {itemA && !isChangingA && (
                <button 
                  onClick={() => setIsChangingA(true)}
                  style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#6366F1', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Change Product
                </button>
              )}
            </div>

            {(!itemA || isChangingA) ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Type or select Product 1:</p>
                
                {/* Search Box with explicit padding & absolute icon positioning */}
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="Search any food (e.g. Lay's, Oreo, Sprite, Nutella)..."
                    value={searchA}
                    onChange={(e) => setSearchA(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: '38px',
                      paddingRight: '36px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '12px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {isLoadingApiA && (
                    <Loader2 style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#6366F1', animation: 'spin 1s linear infinite' }} />
                  )}
                </div>

                {/* Filtered Products List with clean vertical gaps */}
                <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                  {displayProductsA.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProductForSlot(prod, 0)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#F1F5F9', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h5 style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</h5>
                        <p style={{ fontSize: '10px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.brand}</p>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px', backgroundColor: prod.rating === 'Green' ? '#DCFCE7' : prod.rating === 'Yellow' ? '#FEF3C7' : '#FEE2E2', color: prod.rating === 'Green' ? '#15803D' : prod.rating === 'Yellow' ? '#B45309' : '#B91C1C' }}>
                        {prod.score}/100
                      </span>
                    </div>
                  ))}

                  {displayProductsA.length === 0 && (
                    <p style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center', padding: '12px' }}>
                      Type a product name above to search live database...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <img src={itemA.image} alt={itemA.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }} />
                  <button 
                    onClick={() => onRemoveItem(itemA.id)}
                    style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px', borderRadius: '50%', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                  >
                    <X style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', backgroundColor: itemA.rating === 'Green' ? '#DCFCE7' : itemA.rating === 'Yellow' ? '#FEF3C7' : '#FEE2E2', color: itemA.rating === 'Green' ? '#15803D' : itemA.rating === 'Yellow' ? '#B45309' : '#B91C1C' }}>
                    Score: {itemA.score}/100 • {itemA.rating}
                  </span>
                  {winner?.id === itemA.id && itemB && (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '12px', backgroundColor: '#10B981', color: '#FFFFFF' }}>
                      ✓ WINNER
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>{itemA.name}</h4>
                <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{itemA.brand}</p>
              </div>
            )}
          </div>

          {/* PRODUCT B SLOT */}
          <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                PRODUCT 2
              </span>
              {itemB && !isChangingB && (
                <button 
                  onClick={() => setIsChangingB(true)}
                  style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#6366F1', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Change Product
                </button>
              )}
            </div>

            {(!itemB || isChangingB) ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Type or select Product 2:</p>
                
                {/* Search Box with explicit padding & absolute icon positioning */}
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="Search any food (e.g. Saffola Oats, Real Juice, Sprite)..."
                    value={searchB}
                    onChange={(e) => setSearchB(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: '38px',
                      paddingRight: '36px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '12px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {isLoadingApiB && (
                    <Loader2 style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#6366F1', animation: 'spin 1s linear infinite' }} />
                  )}
                </div>

                {/* Filtered Products List with clean vertical gaps */}
                <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                  {displayProductsB.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProductForSlot(prod, 1)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#F1F5F9', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h5 style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</h5>
                        <p style={{ fontSize: '10px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.brand}</p>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px', backgroundColor: prod.rating === 'Green' ? '#DCFCE7' : prod.rating === 'Yellow' ? '#FEF3C7' : '#FEE2E2', color: prod.rating === 'Green' ? '#15803D' : prod.rating === 'Yellow' ? '#B45309' : '#B91C1C' }}>
                        {prod.score}/100
                      </span>
                    </div>
                  ))}

                  {displayProductsB.length === 0 && (
                    <p style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center', padding: '12px' }}>
                      Type a product name above to search live database...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <img src={itemB.image} alt={itemB.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }} />
                  <button 
                    onClick={() => onRemoveItem(itemB.id)}
                    style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px', borderRadius: '50%', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                  >
                    <X style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', backgroundColor: itemB.rating === 'Green' ? '#DCFCE7' : itemB.rating === 'Yellow' ? '#FEF3C7' : '#FEE2E2', color: itemB.rating === 'Green' ? '#15803D' : itemB.rating === 'Yellow' ? '#B45309' : '#B91C1C' }}>
                    Score: {itemB.score}/100 • {itemB.rating}
                  </span>
                  {winner?.id === itemB.id && itemA && (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '12px', backgroundColor: '#10B981', color: '#FFFFFF' }}>
                      ✓ WINNER
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>{itemB.name}</h4>
                <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{itemB.brand}</p>
              </div>
            )}
          </div>

        </div>

        {/* DETAILED METRICS SIDE-BY-SIDE TABLE */}
        {itemA && itemB && (
          <div style={{ borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
            <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '12px 16px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between' }}>
              <span>Nutritional & Safety Breakdown Comparison</span>
              <span>FSSAI Standards</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
              
              {/* Score Metric */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontWeight: 800, color: '#334155' }}>Health Score (0-100)</span>
                <span style={{ textAlign: 'center', fontWeight: 900, color: itemA.score >= itemB.score ? '#15803D' : '#0F172A' }}>
                  {itemA.score}/100
                </span>
                <span style={{ textAlign: 'center', fontWeight: 900, color: itemB.score >= itemA.score ? '#15803D' : '#0F172A' }}>
                  {itemB.score}/100
                </span>
              </div>

              {/* Calories */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontWeight: 600, color: '#64748B' }}>Calories (Per Serving)</span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: '#0F172A' }}>{itemA.caloriesPerServing} kcal</span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: '#0F172A' }}>{itemB.caloriesPerServing} kcal</span>
              </div>

              {/* Sugar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontWeight: 600, color: '#64748B' }}>Added Sugar</span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: parseVal(itemA.macros?.sugar) > parseVal(itemB.macros?.sugar) ? '#DC2626' : '#0F172A' }}>
                  {itemA.macros?.sugar || 'N/A'} {parseVal(itemA.macros?.sugar) > parseVal(itemB.macros?.sugar) && '⚠️ High'}
                </span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: parseVal(itemB.macros?.sugar) > parseVal(itemA.macros?.sugar) ? '#DC2626' : '#0F172A' }}>
                  {itemB.macros?.sugar || 'N/A'} {parseVal(itemB.macros?.sugar) > parseVal(itemA.macros?.sugar) && '⚠️ High'}
                </span>
              </div>

              {/* Sodium */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontWeight: 600, color: '#64748B' }}>Sodium Concentration</span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: parseVal(itemA.macros?.sodium) > parseVal(itemB.macros?.sodium) ? '#DC2626' : '#15803D' }}>
                  {itemA.macros?.sodium || 'N/A'} {parseVal(itemA.macros?.sodium) > parseVal(itemB.macros?.sodium) && '🔴 High Sodium'}
                </span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: parseVal(itemB.macros?.sodium) > parseVal(itemA.macros?.sodium) ? '#DC2626' : '#15803D' }}>
                  {itemB.macros?.sodium || 'N/A'} {parseVal(itemB.macros?.sodium) > parseVal(itemA.macros?.sodium) && '🔴 High Sodium'}
                </span>
              </div>

              {/* Protein */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontWeight: 600, color: '#64748B' }}>Dietary Protein</span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: parseVal(itemA.macros?.protein) > parseVal(itemB.macros?.protein) ? '#16A34A' : '#0F172A' }}>
                  {itemA.macros?.protein || 'N/A'} {parseVal(itemA.macros?.protein) > parseVal(itemB.macros?.protein) && '🟢 Higher'}
                </span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: parseVal(itemB.macros?.protein) > parseVal(itemA.macros?.protein) ? '#16A34A' : '#0F172A' }}>
                  {itemB.macros?.protein || 'N/A'} {parseVal(itemB.macros?.protein) > parseVal(itemA.macros?.protein) && '🟢 Higher'}
                </span>
              </div>

              {/* Additives Count */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 16px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#64748B' }}>Chemical Additives Count</span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: (itemA.additives?.length || 0) > (itemB.additives?.length || 0) ? '#D97706' : '#15803D' }}>
                  {itemA.additives?.length || 0} Additive(s)
                </span>
                <span style={{ textAlign: 'center', fontWeight: 700, color: (itemB.additives?.length || 0) > (itemA.additives?.length || 0) ? '#D97706' : '#15803D' }}>
                  {itemB.additives?.length || 0} Additive(s)
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
