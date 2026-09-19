/**
 * NutriScan AI - Gemini 2.5 Flash Food Label Vision OCR & Nutritional Analyzer
 * Reads physical packet label text (Product Name, Brand, Net Weight, MRP, FSSAI Lic, Manufacturer, Date, Consumer Care)
 */

export async function analyzeFoodLabelImage(base64Image, apiKey) {
  if (!base64Image || !apiKey) return null;

  // Clean base64 string header if present
  const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  const promptText = `
You are NutriScan AI, an expert FSSAI Indian Packaged Food Label Reader.
Examine this food packet image carefully and extract all actual printed label details into a clean JSON object matching this exact structure:

{
  "name": "Exact product name printed on packet",
  "brand": "Exact brand name printed on packet",
  "category": "Food Category (e.g. Instant Noodles, Dairy, Biscuits, Salty Snacks, Beverages)",
  "servingSize": "Net Quantity printed (e.g. 70g, 500ml)",
  "score": 45,
  "rating": "Red",
  "verdict": "Nutritional summary verdict based on FSSAI & WHO standards",
  "caloriesPerServing": 310,
  "macros": {
    "protein": "7.8g",
    "carbs": "46.2g",
    "fat": "13.5g",
    "saturatedFat": "6.2g",
    "sugar": "1.5g",
    "sodium": "860mg",
    "fiber": "2.1g"
  },
  "productInfo": {
    "productName": "Exact product name",
    "brand": "Exact brand owner company",
    "category": "Category",
    "netQuantity": "Net weight/volume",
    "mrp": "MRP ₹ printed on pack",
    "manufacturer": "Exact Manufacturer/Packer name, address & FSSAI Lic No printed on pack",
    "countryOfOrigin": "Country of origin (e.g. India 🇮🇳)",
    "dateInfo": "Mfg Date / Best Before date printed on pack",
    "consumerCare": "Customer care helpline, email & address printed on pack"
  },
  "pros": ["Nutritional advantage 1", "Nutritional advantage 2"],
  "cons": ["Nutritional concern 1", "Nutritional concern 2"],
  "shortTermEffects": ["Short term effect 1", "Short term effect 2"],
  "longTermEffects": ["Long term effect 1"],
  "additives": [
    { "code": "E621", "name": "Monosodium Glutamate (MSG)", "risk": "Moderate", "description": "Flavor enhancer" }
  ]
}

Return ONLY valid JSON. No markdown formatting wrappers.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            response_mime_type: "application/json"
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Gemini Vision API error response:", errText);
      return null;
    }

    const resData = await response.json();
    const candidateText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    const parsedJson = JSON.parse(candidateText.trim());
    return parsedJson;
  } catch (err) {
    console.error("Failed to analyze food label image with Gemini Vision:", err);
    return null;
  }
}

const DEFAULT_RAILWAY_URL = "https://nutriscan-ai-production-1519.up.railway.app";

/**
 * Call live Railway backend service to analyze packet image (with direct client API fallback)
 */
export async function analyzePacketViaRailwayBackend(base64Image) {
  if (!base64Image) return null;
  const backendUrl = import.meta.env.VITE_RAILWAY_BACKEND_URL || DEFAULT_RAILWAY_URL;

  try {
    const res = await fetch(`${backendUrl}/api/analyze-packet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.name && !data.error) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Railway backend fetch failed:", err);
  }

  // Client-side fallback if VITE_GEMINI_API_KEY is available
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (clientApiKey) {
    try {
      const directResult = await analyzeFoodLabelImage(base64Image, clientApiKey);
      if (directResult && directResult.name) {
        return directResult;
      }
    } catch (clientErr) {
      console.warn("Direct Gemini API fallback failed:", clientErr);
    }
  }

  return null;
}

/**
 * Call live Railway backend service to resolve product by barcode or query
 */
export async function analyzeProductViaRailwayBackend({ barcode, query }) {
  if (!barcode && !query) return null;
  const backendUrl = import.meta.env.VITE_RAILWAY_BACKEND_URL || DEFAULT_RAILWAY_URL;

  try {
    const res = await fetch(`${backendUrl}/api/lookup-product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barcode, query })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.name && !data.error && data.name !== "Packaged Food Item") {
        return data;
      }
    }
  } catch (err) {
    console.warn("Railway backend lookup failed:", err);
  }

  // Client-side Gemini fallback if client key exists
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (clientApiKey) {
    try {
      const promptText = `
You are NutriScan AI, an expert FSSAI Indian Packaged Food Database & Nutritional Analyzer.
The user is looking up an Indian packaged food item.
Identifier / Query: ${barcode ? `Barcode number ${barcode}` : `Product name "${query}"`}

Analyze and return the EXACT real-world Indian packaged food details for this item in a clean JSON object.
Do NOT use generic fallback placeholders like "Packaged Food Item". Find the exact real product name, manufacturer, and nutritional values.

JSON structure:
{
  "id": "ai-${barcode || query}",
  "barcode": "${barcode || 'N/A'}",
  "name": "<Exact real product name>",
  "brand": "<Exact real brand owner company name>",
  "category": "<Food Category>",
  "servingSize": "<Standard serving size>",
  "score": <Calculated score 10-98 based on nutrients>,
  "rating": "<Green|Yellow|Red>",
  "verdict": "<Nutritional summary verdict based on FSSAI standards>",
  "caloriesPerServing": <Numeric kcal>,
  "macros": {
    "protein": "<Protein value, e.g. 6.0g>",
    "carbs": "<Carbs value, e.g. 68.0g>",
    "fat": "<Fat value, e.g. 18.0g>",
    "saturatedFat": "<Sat fat value, e.g. 8.5g>",
    "sugar": "<Sugar value, e.g. 24.0g>",
    "sodium": "<Sodium value in mg, e.g. 220mg>",
    "fiber": "<Fiber value, e.g. 1.5g>"
  },
  "productInfo": {
    "productName": "<Exact product name>",
    "brand": "<Exact brand owner company>",
    "category": "<Food Category>",
    "netQuantity": "<Net quantity>",
    "mrp": "<MRP ₹>",
    "manufacturer": "<Exact Manufacturer name, address & FSSAI Lic No>",
    "countryOfOrigin": "India 🇮🇳",
    "dateInfo": "Best Before 6 to 9 months from MFD",
    "consumerCare": "<Customer care helpline & email>"
  },
  "pros": ["<Nutritional advantage 1>", "<Nutritional advantage 2>"],
  "cons": ["<Nutritional concern 1>", "<Nutritional concern 2>"],
  "shortTermEffects": ["<Short term effect 1>"],
  "longTermEffects": ["<Long term effect 1>"],
  "additives": []
}

Return ONLY valid JSON. No markdown wrappers.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${clientApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.1,
              response_mime_type: "application/json"
            }
          })
        }
      );

      if (response.ok) {
        const resData = await response.json();
        const candidateText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const parsed = JSON.parse(candidateText.trim());
          if (parsed && parsed.name && parsed.name !== "Packaged Food Item") {
            return parsed;
          }
        }
      }
    } catch (clientErr) {
      console.warn("Direct Gemini lookup fallback failed:", clientErr);
    }
  }

  return null;
}
