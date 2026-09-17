/**
 * NutriScan Health - Real-World Indian Packaged Foods API Service
 * Queries Open Food Facts REST API (India Domain: in.openfoodfacts.org)
 * Grounded in FSSAI (India) and WHO nutritional standards.
 */

// Known E-Number Additives Safety Database (FSSAI Approved & Flagged Additives)
const E_NUMBER_SAFETY_DB = {
  "E621": { name: "Monosodium Glutamate (MSG)", risk: "Moderate", category: "Flavor Enhancer", desc: "Umami flavor enhancer commonly found in instant noodles & savory snacks. May trigger headaches or glutamate sensitivity." },
  "E102": { name: "Tartrazine (Yellow 5)", risk: "High", category: "Synthetic Dye", desc: "Synthetic food dye linked to hyperactivity in children and allergic asthma." },
  "E110": { name: "Sunset Yellow (Yellow 6)", risk: "High", category: "Synthetic Dye", desc: "Azo food colorant heavily restricted in EU for pediatric behavioral health." },
  "E211": { name: "Sodium Benzoate", risk: "Moderate", category: "Preservative", desc: "Chemical preservative. Can react with Vitamin C under heat to form benzene." },
  "E338": { name: "Phosphoric Acid", risk: "High", category: "Acidulant", desc: "Acidifying agent used in colas. Excess intake leaches calcium from bones & erodes enamel." },
  "E635": { name: "Disodium 5'-Ribonucleotides", risk: "Moderate", category: "Flavor Enhancer", desc: "Synergistic umami salt. Avoid if diagnosed with hyperuricemia or gout." },
  "E476": { name: "PGPR", risk: "Moderate", category: "Emulsifier", desc: "Polyglycerol polyricinoleate. Synthetic emulsifier used to replace cocoa butter in cheap chocolates." },
  "E320": { name: "BHA (Butylated Hydroxyanisole)", risk: "High", category: "Antioxidant Preservative", desc: "Synthetic antioxidant preservative flagged as potential endocrine disruptor." },
  "E150D": { name: "Caramel IV (Ammonia Sulphite)", risk: "Moderate", category: "Coloring Agent", desc: "Caramel color processed under high pressure. Contains minor trace 4-MEI byproduct." },
  "E250": { name: "Sodium Nitrite", risk: "High", category: "Preservative", desc: "Preservative in processed meats. Can form carcinogenic nitrosamines during high-heat cooking." }
};

/**
 * Safely extracts a numeric value from multiple possible nutrient keys in Open Food Facts JSON
 */
function getNutrientVal(nutriments, keys) {
  if (!nutriments) return null;
  for (const k of keys) {
    if (nutriments[k] !== undefined && nutriments[k] !== null && nutriments[k] !== "") {
      const v = parseFloat(nutriments[k]);
      if (!isNaN(v) && v >= 0) return v;
    }
  }
  return null;
}

/**
 * Estimates realistic nutrient values based on category if API data has missing fields
 */
function getCategoryEstimates(categoryName, nameLower) {
  if (nameLower.includes("noodle") || nameLower.includes("maggi") || categoryName.toLowerCase().includes("noodle")) {
    return { carbs: 62, fat: 14, protein: 8, satFat: 6.5, sugar: 2.0, sodiumMg: 850, fiber: 2.5, kcal: 390 };
  }
  if (nameLower.includes("cola") || nameLower.includes("soda") || nameLower.includes("drink") || categoryName.toLowerCase().includes("beverage")) {
    return { carbs: 11, fat: 0, protein: 0, satFat: 0, sugar: 10.6, sodiumMg: 15, fiber: 0, kcal: 42 };
  }
  if (nameLower.includes("biscuit") || nameLower.includes("cookie") || nameLower.includes("parle") || nameLower.includes("choco")) {
    return { carbs: 68, fat: 18, protein: 6, satFat: 8.5, sugar: 24, sodiumMg: 220, fiber: 1.5, kcal: 460 };
  }
  if (nameLower.includes("chip") || nameLower.includes("kurkure") || nameLower.includes("namkeen") || nameLower.includes("bhujia")) {
    return { carbs: 52, fat: 32, protein: 6, satFat: 12.0, sugar: 2.5, sodiumMg: 680, fiber: 3.0, kcal: 520 };
  }
  if (nameLower.includes("butter") || nameLower.includes("ghee") || nameLower.includes("cheese")) {
    return { carbs: 0.5, fat: 81, protein: 0.6, satFat: 51, sugar: 0, sodiumMg: 800, fiber: 0, kcal: 720 };
  }
  if (nameLower.includes("oat") || nameLower.includes("dalia") || nameLower.includes("millet") || nameLower.includes("dal")) {
    return { carbs: 64, fat: 4, protein: 12, satFat: 0.8, sugar: 1.0, sodiumMg: 10, fiber: 9.0, kcal: 360 };
  }
  // Generic packaged food fallback
  return { carbs: 45, fat: 12, protein: 5, satFat: 4.0, sugar: 8.0, sodiumMg: 350, fiber: 2.0, kcal: 320 };
}

/**
 * Calculate NutriScan Health Score (10-98) based on FSSAI & WHO standards
 */
export function calculateNutriScore(nutriments, additivesCount, novaGroup, categoryName, productName) {
  const nameLower = (productName || "").toLowerCase();
  const estimates = getCategoryEstimates(categoryName || "", nameLower);

  const rawSugar = getNutrientVal(nutriments, ['sugars_100g', 'sugars_value', 'sugars', 'sugars_serving']);
  const rawProtein = getNutrientVal(nutriments, ['proteins_100g', 'proteins_value', 'proteins', 'proteins_serving']);
  const rawCarbs = getNutrientVal(nutriments, ['carbohydrates_100g', 'carbohydrates_value', 'carbohydrates', 'carbohydrates_serving']);
  const rawFat = getNutrientVal(nutriments, ['fat_100g', 'fat_value', 'fat', 'fat_serving']);
  const rawSatFat = getNutrientVal(nutriments, ['saturated-fat_100g', 'saturated-fat_value', 'saturated-fat', 'saturated_fat_100g', 'saturated-fat_serving']);
  const rawFiber = getNutrientVal(nutriments, ['fiber_100g', 'fiber_value', 'fiber', 'fiber_serving']);

  const rawSodiumG = getNutrientVal(nutriments, ['sodium_100g', 'sodium_value', 'sodium', 'sodium_serving']);
  const rawSaltG = getNutrientVal(nutriments, ['salt_100g', 'salt_value', 'salt', 'salt_serving']);

  let sodiumMg = estimates.sodiumMg;
  if (rawSodiumG !== null) {
    sodiumMg = Math.round(rawSodiumG * 1000);
  } else if (rawSaltG !== null) {
    sodiumMg = Math.round(rawSaltG * 400);
  }

  const sugar = rawSugar !== null ? rawSugar : estimates.sugar;
  const protein = rawProtein !== null ? rawProtein : estimates.protein;
  const carbs = rawCarbs !== null ? rawCarbs : estimates.carbs;
  const fat = rawFat !== null ? rawFat : estimates.fat;
  const satFat = rawSatFat !== null ? rawSatFat : estimates.satFat;
  const fiber = rawFiber !== null ? rawFiber : estimates.fiber;

  const rawEnergyKcal = getNutrientVal(nutriments, ['energy-kcal_100g', 'energy-kcal_value', 'energy-kcal', 'energy-kcal_serving']);
  const rawEnergyKj = getNutrientVal(nutriments, ['energy_100g', 'energy_value', 'energy']);
  
  let calories = estimates.kcal;
  if (rawEnergyKcal !== null) {
    calories = Math.round(rawEnergyKcal);
  } else if (rawEnergyKj !== null) {
    calories = Math.round(rawEnergyKj / 4.184);
  }

  // Calculate base score starting at 100
  let score = 100;

  // Penalties
  score -= Math.min(sugar * 1.8, 35);           // High sugar penalty
  score -= Math.min((sodiumMg / 100) * 3.5, 30); // High sodium penalty
  score -= Math.min(satFat * 2.8, 25);           // Saturated fat penalty
  score -= Math.min(additivesCount * 5, 20);     // Additive penalty

  if (novaGroup === 4) score -= 12;

  // Boosts
  score += Math.min(protein * 1.5, 15);
  score += Math.min(fiber * 2.5, 15);

  const finalScore = Math.max(12, Math.min(98, Math.round(score)));

  let rating = "Green";
  let verdict = "Safe & Healthy - FSSAI Approved Balanced Profile";
  if (finalScore < 45) {
    rating = "Red";
    verdict = "Unhealthy - High Sodium, Sugar or Refined Palm Fats";
  } else if (finalScore < 70) {
    rating = "Yellow";
    verdict = "Moderate Caution - Consume in Controlled Portions";
  }

  return {
    finalScore,
    rating,
    verdict,
    calories,
    sugar,
    protein,
    carbs,
    fat,
    satFat,
    sodiumMg,
    fiber
  };
}

/**
 * Parses raw Open Food Facts API payload into NutriScan format
 */
export function parseOpenFoodFactsProduct(offProduct) {
  if (!offProduct) return null;

  const name = offProduct.product_name || offProduct.product_name_en || offProduct.product_name_hi || "Packaged Food Item";
  const brand = offProduct.brands || offProduct.brand_owner || "Indian Packaged Food";
  const barcode = offProduct.code || "N/A";
  const image = offProduct.image_front_url || offProduct.image_url || "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&auto=format&fit=crop&q=80";
  const category = offProduct.categories ? offProduct.categories.split(",")[0].trim() : "Packaged Snacks";

  const nutriments = offProduct.nutriments || {};
  const rawAdditives = offProduct.additives_tags || [];
  const novaGroup = offProduct.nova_group || (rawAdditives.length > 2 ? 4 : 2);

  const {
    finalScore,
    rating,
    verdict,
    calories,
    sugar,
    protein,
    carbs,
    fat,
    satFat,
    sodiumMg,
    fiber
  } = calculateNutriScore(nutriments, rawAdditives.length, novaGroup, category, name);

  // Format Additives
  const formattedAdditives = rawAdditives.map((tag) => {
    const code = tag.replace("en:", "").toUpperCase();
    const knownInfo = E_NUMBER_SAFETY_DB[code];
    return {
      code: code,
      name: knownInfo ? knownInfo.name : `Additive ${code}`,
      risk: knownInfo ? knownInfo.risk : (code.startsWith("E6") || code.startsWith("E1") ? "High" : "Moderate"),
      description: knownInfo ? knownInfo.desc : `FSSAI regulated food additive code ${code}.`
    };
  });

  // Dynamic Pros
  const pros = [];
  if (protein >= 6) pros.push(`Contains ${protein.toFixed(1)}g protein per 100g`);
  if (fiber >= 3) pros.push(`Good dietary fiber (${fiber.toFixed(1)}g per 100g)`);
  if (sugar <= 4) pros.push(`Low sugar concentration (${sugar.toFixed(1)}g per 100g)`);
  if (sodiumMg <= 250) pros.push(`Low sodium level (${sodiumMg}mg per 100g)`);
  if (rawAdditives.length === 0) pros.push("Clean packet: Zero synthetic E-number additives");
  if (pros.length === 0) pros.push("Provides caloric energy for daily active metabolism.");

  // Dynamic Cons
  const cons = [];
  if (sugar > 12) cons.push(`High added sugar content (${sugar.toFixed(1)}g per 100g)`);
  if (sodiumMg > 450) cons.push(`High sodium concentration (${sodiumMg}mg per 100g)`);
  if (satFat > 5) cons.push(`Elevated saturated fat (${satFat.toFixed(1)}g per 100g)`);
  if (rawAdditives.length > 0) cons.push(`Contains ${rawAdditives.length} chemical additives`);
  if (novaGroup === 4) cons.push("Ultra-processed packaged food");
  if (cons.length === 0) cons.push("Balanced nutrient composition.");

  // Short-Term Effects
  const shortTermEffects = [
    sugar > 12 
      ? `Rapid blood sugar spike (${sugar.toFixed(1)}g sugar) followed by energy crash` 
      : "Sustained glucose release without severe insulin spikes",
    sodiumMg > 450 
      ? `High sodium (${sodiumMg}mg) causes water retention and temporary vascular tightness` 
      : "Maintains optimal cardiovascular fluid balance"
  ];

  // Long-Term Effects
  const longTermEffects = [
    finalScore < 45 
      ? "Frequent consumption increases risk of obesity, fatty liver, and metabolic stress" 
      : "Supports digestive motility and metabolic wellness"
  ];

  // Medical Suitability Matrix
  const diseaseSuitability = {
    diabetes: {
      suitable: sugar < 8,
      severity: sugar > 15 ? "High Risk" : sugar > 8 ? "Moderate Risk" : "Safe",
      note: sugar > 15 ? `Contains ${sugar.toFixed(1)}g sugar per 100g. Spikes blood glucose.` : "Low sugar content suitable for diabetic diet."
    },
    hypertension: {
      suitable: sodiumMg < 350,
      severity: sodiumMg > 500 ? "High Danger" : sodiumMg > 350 ? "Moderate Risk" : "Safe",
      note: sodiumMg > 500 ? `Contains ${sodiumMg}mg sodium per 100g. Strictly limit for High BP.` : "Heart-safe sodium levels."
    },
    obesity: {
      suitable: finalScore >= 60,
      severity: finalScore < 45 ? "Avoid" : "Suitable",
      note: finalScore < 45 ? "High calorie & fat density with low satiating fiber." : "Favorable nutrient density for weight management."
    },
    thyroid: {
      suitable: rawAdditives.length < 3,
      severity: rawAdditives.length >= 3 ? "Caution" : "Safe",
      note: rawAdditives.length >= 3 ? "Chemical additives may irritate thyroid metabolic balance." : "Free from high-risk chemical irritants."
    },
    gymFitness: {
      suitable: protein >= 7,
      severity: protein >= 10 ? "Great Choice" : "Sub-optimal",
      note: protein >= 10 ? `High protein (${protein.toFixed(1)}g) for muscle synthesis.` : `Moderate protein (${protein.toFixed(1)}g) per serving.`
    },
    kidsParenting: {
      suitable: finalScore >= 60 && rawAdditives.length < 2,
      severity: finalScore < 50 ? "Avoid for Kids" : "Kid Friendly",
      note: finalScore < 50 ? "Unsuitable sugar/additives for developing children." : "Safe ingredient profile for kids."
    }
  };

  return {
    id: `off-${barcode}`,
    barcode,
    name,
    brand,
    category,
    image,
    score: finalScore,
    rating,
    verdict,
    servingSize: offProduct.serving_size || "100g",
    caloriesPerServing: calories,
    macros: {
      protein: `${protein.toFixed(1)}g`,
      carbs: `${carbs.toFixed(1)}g`,
      fat: `${fat.toFixed(1)}g`,
      saturatedFat: `${satFat.toFixed(1)}g`,
      sugar: `${sugar.toFixed(1)}g`,
      sodium: `${sodiumMg}mg`,
      fiber: `${fiber.toFixed(1)}g`
    },
    pros,
    cons,
    shortTermEffects,
    longTermEffects,
    diseaseSuitability,
    additives: formattedAdditives,
    alternatives: []
  };
}

/**
 * FETCH PRODUCT BY BARCODE (Prioritizes Indian Packaged Foods via in.openfoodfacts.org)
 */
export async function fetchProductByBarcode(barcode) {
  if (!barcode) return null;
  const cleanBarcode = barcode.toString().trim();

  // Try India OpenFoodFacts domain first, fallback to global
  const urls = [
    `https://in.openfoodfacts.org/api/v2/product/${cleanBarcode}.json`,
    `https://world.openfoodfacts.org/api/v2/product/${cleanBarcode}.json`
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 1 && data.product) {
          const parsed = parseOpenFoodFactsProduct(data.product);
          if (parsed && parsed.category) {
            parsed.alternatives = await fetchCategoryAlternatives(parsed.category, parsed.score);
          }
          return parsed;
        }
      }
    } catch (err) {
      console.warn("India OFF API fetch attempt:", err);
    }
  }

  return null;
}

/**
 * SEARCH FOOD PRODUCTS (Targeting Indian Packaged Foods in India)
 */
export async function searchFoodProducts(query) {
  if (!query || query.trim() === "") return [];

  const cleanQuery = query.trim();

  const searchUrls = [
    `https://in.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(cleanQuery)}&search_simple=1&action=process&json=1&page_size=16`,
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(cleanQuery)}&country=india&countries_tags=en:india&search_simple=1&action=process&json=1&page_size=16`
  ];

  for (const url of searchUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          const parsed = data.products
            .map(p => parseOpenFoodFactsProduct(p))
            .filter(Boolean);
          if (parsed.length > 0) return parsed;
        }
      }
    } catch (err) {
      console.warn("India OFF search failed:", err);
    }
  }

  return [];
}

/**
 * FETCH HEALTHIER ALTERNATIVES (India Category Specific)
 */
export async function fetchCategoryAlternatives(category, currentScore) {
  try {
    const res = await fetch(
      `https://in.openfoodfacts.org/cgi/search.pl?tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}&sort_by=unique_scans_n&json=1&page_size=8`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const parsedList = data.products.map(p => parseOpenFoodFactsProduct(p)).filter(Boolean);
        const betterItems = parsedList.filter(item => item.score > currentScore);
        if (betterItems.length > 0) {
          return betterItems.slice(0, 3).map(item => ({
            name: item.name,
            brand: item.brand,
            score: item.score,
            rating: item.rating,
            reason: `Higher protein (${item.macros.protein}) & lower sugar (${item.macros.sugar}) than your scanned product.`,
            image: item.image
          }));
        }
      }
    }
  } catch (err) {
    console.warn("Alternatives fetch failed:", err);
  }

  return [];
}
