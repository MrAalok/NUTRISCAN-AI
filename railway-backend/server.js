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
You are NutriScan AI, an expert FSSAI Indian Packaged Food Label Reader.
Examine this food packet image carefully and extract all actual printed label details into a clean JSON object matching this exact structure:

{
  "name": "Exact product name printed on packet",
  "brand": "Exact brand name printed on packet",
  "category": "Food Category",
  "servingSize": "Net Quantity printed",
  "score": 45,
  "rating": "Red",
  "verdict": "Nutritional summary verdict based on FSSAI standards",
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
    "countryOfOrigin": "India 🇮🇳",
    "dateInfo": "Mfg Date / Best Before date printed on pack",
    "consumerCare": "Customer care helpline, email & address printed on pack"
  },
  "pros": ["Nutritional advantage"],
  "cons": ["Nutritional concern"],
  "shortTermEffects": ["Short term effect"],
  "longTermEffects": ["Long term effect"],
  "additives": []
}

Return ONLY valid JSON.
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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

Analyze and return the EXACT real-world Indian packaged food details for this item in a clean JSON object matching this exact structure:

{
  "id": "ai-${barcode || query}",
  "barcode": "${barcode || 'N/A'}",
  "name": "Exact real product name (e.g. Britannia Good Day Butter Cookies)",
  "brand": "Exact real brand owner company name",
  "category": "Food Category",
  "servingSize": "Standard serving size (e.g. 75g)",
  "score": 42,
  "rating": "Yellow",
  "verdict": "Nutritional summary verdict based on FSSAI & WHO standards",
  "caloriesPerServing": 320,
  "macros": {
    "protein": "6.0g",
    "carbs": "68.0g",
    "fat": "18.0g",
    "saturatedFat": "8.5g",
    "sugar": "24.0g",
    "sodium": "220mg",
    "fiber": "1.5g"
  },
  "productInfo": {
    "productName": "Exact product name",
    "brand": "Exact brand owner company",
    "category": "Category",
    "netQuantity": "Net quantity",
    "mrp": "MRP ₹ (approx.)",
    "manufacturer": "Exact Manufacturer name, address & FSSAI Lic No if known",
    "countryOfOrigin": "India 🇮🇳",
    "dateInfo": "Best Before 6 to 9 months from MFD",
    "consumerCare": "Customer care helpline & email"
  },
  "pros": ["Nutritional advantage 1", "Nutritional advantage 2"],
  "cons": ["Nutritional concern 1", "Nutritional concern 2"],
  "shortTermEffects": ["Short term effect 1"],
  "longTermEffects": ["Long term effect 1"],
  "additives": []
}

Return ONLY valid JSON. No markdown wrappers.
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
