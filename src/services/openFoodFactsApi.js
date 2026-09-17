import { INITIAL_FOOD_DATABASE } from "../data/foodDatabase";

/**
 * Parses raw OpenFoodFacts API product object into NutriScan AI schema
 */
export function parseOpenFoodFactsProduct(offProduct) {
  if (!offProduct) return null;

  const name = offProduct.product_name || offProduct.product_name_en || "Unknown Food Product";
  const brand = offProduct.brands || "Generic Brand";
  const barcode = offProduct.code || "N/A";
  const image = offProduct.image_front_url || offProduct.image_url || "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&auto=format&fit=crop&q=80";
  const category = offProduct.categories ? offProduct.categories.split(",")[0] : "Packaged Food";

  const nutriments = offProduct.nutriments || {};
  const sugar = parseFloat(nutriments["sugars_100g"] || nutriments["sugars_value"] || 0);
  const salt = parseFloat(nutriments["salt_100g"] || nutriments["salt_value"] || 0);
  const sodiumMg = Math.round(salt * 400); // 1g salt ~ 400mg sodium
  const satFat = parseFloat(nutriments["saturated-fat_100g"] || 0);
  const protein = parseFloat(nutriments["proteins_100g"] || 0);
  const fiber = parseFloat(nutriments["fiber_100g"] || 0);
  const calories = Math.round(parseFloat(nutriments["energy-kcal_100g"] || nutriments["energy-kcal_value"] || 0));

  // Compute NutriScan Health Score (0 - 100)
  // Higher sugar, sodium, saturated fat penalize score; high protein & fiber boost score
  let baseScore = 100;
  baseScore -= Math.min(sugar * 1.8, 35);
  baseScore -= Math.min(sodiumMg * 0.04, 30);
  baseScore -= Math.min(satFat * 2.5, 20);
  baseScore += Math.min(protein * 1.5, 15);
  baseScore += Math.min(fiber * 2.0, 15);

  const rawAdditives = offProduct.additives_tags || [];
  baseScore -= Math.min(rawAdditives.length * 4, 20);

  const finalScore = Math.max(5, Math.min(98, Math.round(baseScore)));

  let rating = "Green";
  let verdict = "Healthy - Good Nutritional Profile";
  if (finalScore < 45) {
    rating = "Red";
    verdict = "Unhealthy - High Processed & Harmful Additives";
  } else if (finalScore < 75) {
    rating = "Yellow";
    verdict = "Moderate - Consume in Moderation";
  }

  // Parse additives
  const formattedAdditives = rawAdditives.map((tag) => {
    const cleanCode = tag.replace("en:", "").toUpperCase();
    return {
      code: cleanCode,
      name: `Additive ${cleanCode}`,
      risk: cleanCode.startsWith("E6") || cleanCode.startsWith("E1") || cleanCode.startsWith("E2") ? "High" : "Moderate",
      description: `Preservative or processing agent logged under regulation ${cleanCode}.`
    };
  });

  // Pros & Cons
  const pros = [];
  const cons = [];

  if (protein > 8) pros.push(`High protein content (${protein.toFixed(1)}g per 100g)`);
  if (fiber > 3) pros.push(`Rich in dietary fiber (${fiber.toFixed(1)}g per 100g)`);
  if (sugar < 4) pros.push(`Low sugar content (${sugar.toFixed(1)}g per 100g)`);
  if (sodiumMg < 150) pros.push(`Low sodium level (${sodiumMg}mg per 100g)`);
  if (pros.length === 0) pros.push("Contains energy calories for daily metabolic needs.");

  if (sugar > 12) cons.push(`High added sugar (${sugar.toFixed(1)}g per 100g)`);
  if (sodiumMg > 500) cons.push(`Excess sodium level (${sodiumMg}mg per 100g)`);
  if (satFat > 5) cons.push(`Elevated saturated fat (${satFat.toFixed(1)}g per 100g)`);
  if (rawAdditives.length > 2) cons.push(`Contains ${rawAdditives.length} chemical additives and preservatives`);

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
    caloriesPerServing: calories || 150,
    macros: {
      protein: `${protein.toFixed(1)}g`,
      carbs: `${parseFloat(nutriments["carbohydrates_100g"] || 0).toFixed(1)}g`,
      fat: `${parseFloat(nutriments["fat_100g"] || 0).toFixed(1)}g`,
      saturatedFat: `${satFat.toFixed(1)}g`,
      sugar: `${sugar.toFixed(1)}g`,
      sodium: `${sodiumMg}mg`,
      fiber: `${fiber.toFixed(1)}g`
    },
    pros,
    cons,
    shortTermEffects: [
      sugar > 15 ? "Immediate sugar spike followed by rapid fatigue" : "Sustained energy without sudden crashes",
      sodiumMg > 400 ? "Water retention and temporary elevated vascular pressure" : "Normal hydration balance"
    ],
    longTermEffects: [
      finalScore < 45 ? "Increased chronic metabolic and cardiovascular disease risk over time" : "Supports long-term metabolic health and cellular longevity"
    ],
    diseaseSuitability: {
      diabetes: { suitable: sugar < 8, severity: sugar > 15 ? "High Risk" : "Moderate", note: sugar > 15 ? "High sugar spikes blood glucose levels." : "Acceptable sugar level." },
      hypertension: { suitable: sodiumMg < 300, severity: sodiumMg > 500 ? "High Risk" : "Moderate", note: sodiumMg > 500 ? "High sodium content increases blood pressure." : "Low to moderate sodium." },
      obesity: { suitable: finalScore >= 60, severity: finalScore < 45 ? "Avoid" : "Suitable", note: finalScore < 45 ? "Calorically dense with low satiety." : "Supports weight control." },
      thyroid: { suitable: true, severity: "Safe", note: "No major thyroid contraindications detected." },
      gymFitness: { suitable: protein > 6, severity: protein > 10 ? "Great Choice" : "Average", note: `Contains ${protein.toFixed(1)}g protein per 100g.` },
      kidsParenting: { suitable: finalScore > 65, severity: finalScore < 50 ? "Limit" : "Safe", note: finalScore < 50 ? "High sugar/additives inappropriate for kids." : "Kid friendly product." }
    },
    additives: formattedAdditives,
    alternatives: [
      {
        name: "Whole Organic Snack Alternative",
        brand: "Organic India",
        score: 88,
        rating: "Green",
        reason: "Zero refined sugars, zero artificial additives, 100% natural ingredients.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80"
      }
    ]
  };
}

/**
 * Fetch product by Barcode from OpenFoodFacts or fallback database
 */
export async function fetchProductByBarcode(barcode) {
  // First check local mock database
  const localMatch = INITIAL_FOOD_DATABASE.find(item => item.barcode === barcode);
  if (localMatch) return localMatch;

  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
    if (!res.ok) throw new Error("API network error");
    const data = await res.json();
    if (data.status === 1 && data.product) {
      return parseOpenFoodFactsProduct(data.product);
    }
  } catch (err) {
    console.warn("OpenFoodFacts Barcode fetch failed, using fallback:", err);
  }
  return null;
}

/**
 * Search products by keyword query
 */
export async function searchFoodProducts(query) {
  if (!query || query.trim() === "") return INITIAL_FOOD_DATABASE;

  const cleanQuery = query.toLowerCase().trim();

  // Local search first
  const localResults = INITIAL_FOOD_DATABASE.filter(item =>
    item.name.toLowerCase().includes(cleanQuery) ||
    item.brand.toLowerCase().includes(cleanQuery) ||
    item.category.toLowerCase().includes(cleanQuery) ||
    item.barcode.includes(cleanQuery)
  );

  if (localResults.length > 0) return localResults;

  try {
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8`);
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        return data.products.map(p => parseOpenFoodFactsProduct(p)).filter(Boolean);
      }
    }
  } catch (err) {
    console.warn("OpenFoodFacts Search query failed:", err);
  }

  return localResults;
}
