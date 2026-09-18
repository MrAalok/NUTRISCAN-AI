const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'NutriScan AI Railway Backend Service is Live & Running!',
    health: '/api/health',
    endpoints: {
      analyzePacket: 'POST /api/analyze-packet'
    }
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NutriScan AI Railway Backend', timestamp: new Date() });
});

// Analyze Packet Photo using Gemini 2.5 Flash AI Vision
app.post('/api/analyze-packet', async (req, res) => {
  try {
    const { base64Image } = req.body;
    if (!base64Image) {
      return res.status(400).json({ error: 'base64Image is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable missing on Railway' });
    }

    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const promptText = `
You are NutriScan AI, an expert FSSAI Indian Packaged Food Label Reader & Nutritional Analyzer.
Examine this food packet image carefully and extract all ACTUAL printed label details from the image.

IMPORTANT INSTRUCTIONS:
1. Read the EXACT product name, brand name, and manufacturer printed on the package.
2. Read the ACTUAL Nutritional Information table printed on the back/side of the pack (Per 100g or Per Serving).
3. Do NOT copy sample numbers. Extract real values for Calories, Protein, Carbohydrates, Total Fat, Saturated Fat, Sugar, Sodium, and Fiber from the image.
4. Calculate an authentic FSSAI health score (10 to 98) based on sugar, sodium, saturated fat, additives, and protein/fiber.
5. Return ONLY a valid JSON object. No markdown wrappers.

JSON structure:
{
  "name": "<Real Product Name from image>",
  "brand": "<Real Brand Name from image>",
  "category": "<Food Category, e.g. Instant Noodles, Biscuits, Chips, Milk, Juice, Butter>",
  "servingSize": "<Serving size printed on pack>",
  "score": <Calculated score 10-98 based on nutrients>,
  "rating": "<Green|Yellow|Red>",
  "verdict": "<Short 1-line health verdict based on FSSAI standards>",
  "caloriesPerServing": <Numeric kcal>,
  "macros": {
    "protein": "<Real protein value, e.g. 7.5g>",
    "carbs": "<Real carbs value, e.g. 52.0g>",
    "fat": "<Real fat value, e.g. 14.0g>",
    "saturatedFat": "<Real sat fat value, e.g. 6.0g>",
    "sugar": "<Real sugar value, e.g. 2.0g>",
    "sodium": "<Real sodium value in mg, e.g. 450mg>",
    "fiber": "<Real fiber value, e.g. 2.0g>"
  },
  "productInfo": {
    "productName": "<Real Product Name>",
    "brand": "<Real Brand Owner Company>",
    "category": "<Food Category>",
    "netQuantity": "<Net quantity/weight printed>",
    "mrp": "<MRP printed on pack, e.g. ₹20 (Incl. of all taxes)>",
    "manufacturer": "<Real Manufacturer / Packer name, factory address & FSSAI Lic No printed on pack>",
    "countryOfOrigin": "India 🇮🇳",
    "dateInfo": "<Mfg Date / Expiry / Best Before printed>",
    "consumerCare": "<Helpline number or email printed on pack>"
  },
  "pros": ["<Nutritional advantage 1>", "<Nutritional advantage 2>"],
  "cons": ["<Nutritional risk/concern 1>", "<Nutritional risk/concern 2>"],
  "shortTermEffects": ["<Short term effect 1>", "<Short term effect 2>"],
  "longTermEffects": ["<Long term effect 1>"],
  "additives": [
    { "code": "<E-Number>", "name": "<Additive Name>", "risk": "<Low|Moderate|High>", "description": "<Short description>" }
  ]
}
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: cleanBase64
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            response_mime_type: 'application/json'
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(500).json({ error: 'Gemini API Error', details: errText });
    }

    const data = await geminiRes.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return res.status(500).json({ error: 'Empty AI response' });
    }

    const resultJson = JSON.parse(candidateText.trim());
    return res.json(resultJson);

  } catch (err) {
    console.error('Railway Backend Packet Analysis Error:', err);
    res.status(500).json({ error: 'Server error processing packet image', message: err.message });
  }
});

// Lookup product by barcode or product query using Gemini 2.5 Flash AI
app.post('/api/lookup-product', async (req, res) => {
  try {
    const { barcode, query } = req.body;
    if (!barcode && !query) {
      return res.status(400).json({ error: 'barcode or query is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable missing on Railway' });
    }

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

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.1,
            response_mime_type: 'application/json'
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(500).json({ error: 'Gemini API Error', details: errText });
    }

    const data = await geminiRes.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return res.status(500).json({ error: 'Empty AI response' });
    }

    const resultJson = JSON.parse(candidateText.trim());
    return res.json(resultJson);

  } catch (err) {
    console.error('Railway Backend Product Lookup Error:', err);
    res.status(500).json({ error: 'Server error looking up product', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`NutriScan AI Railway Backend running on port ${PORT}`);
});
