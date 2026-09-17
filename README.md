# NutriScan AI 🥗 - AI-Powered Food Transparency Platform

> **"Let's make technology the guardian of our health."**
> 
> *Presented by: **Tech for Health** (Founder: **Arushi Shivhare**)*

NutriScan AI is a modern web application designed to turn complex, confusing packaged food labels into instant, transparent, color-coded health reports.

![NutriScan AI](src/assets/hero.png)

---

## ⚡ Key Features

1. **📷 AI Camera & Barcode Scanner Studio**:
   - Simulated laser viewfinder scanning animation for instant barcode decoding.
   - Food label image upload with AI OCR extraction simulation.
   - Real-time **OpenFoodFacts REST API** integration for global food lookups.

2. **🚦 Color-Coded Traffic Light Rating**:
   - 🟢 **Green (75-100)**: Healthy & Safe for regular consumption.
   - 🟡 **Yellow (45-74)**: Moderate Caution / Consume occasionally.
   - 🔴 **Red (0-44)**: Unhealthy / Ultra-processed / High sodium & palm oil.

3. **📊 Short-Term vs. Long-Term Body Impact Matrix**:
   - **Short-Term (0-24h)**: Glycemic spikes, sugar crashes, sodium water retention.
   - **Long-Term**: Chronic risk assessment (Hypertension, Fatty Liver, Cardiovascular stress).

4. **🩸 Personalized Disease & Lifestyle Risk Checker**:
   - Custom risk alerts for **Diabetes**, **Hypertension (BP)**, **Obesity**, **Thyroid**, **Gym & High Protein**, and **Kids Safety**.

5. **🧪 E-Number & Chemical Additive Decoder**:
   - Translates cryptic E-numbers (*E621 MSG, E102 Tartrazine, E211 Sodium Benzoate, E338 Phosphoric Acid*) into plain-English toxicity risk meters (Low, Moderate, High).

6. **🔄 AI Healthier Substitute Product Recommender**:
   - Suggests clean, higher-scoring food alternatives (*Slurrp Farm Millet Noodles, Raw Pressery Coconut Water, TagZ Popped Chips*).

7. **⚖️ Side-by-Side Product Comparison Tool**:
   - Compare 2 packaged foods head-to-head before making a store purchase.

8. **🏛️ Authentic Data Sources**:
   - Grounded in published guidelines from **FSSAI (India)**, **USDA FoodData Central**, **WHO & FAO Standards**, and **Open Food Facts API**.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Dark Glassmorphism Design System (CSS3 + Lucide Icons)
- **APIs**: OpenFoodFacts API (`https://world.openfoodfacts.org/`)
- **Effects**: Canvas Confetti for healthy food achievements

---

## 🚀 Quick Start (Local Setup)

```bash
# Clone the repository
git clone https://github.com/MrAalok/NUTRISCAN-AI.git

# Navigate into project directory
cd NUTRISCAN-AI

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📜 License

Created for **Tech for Health** • Solo Project Initiative by Arushi Shivhare.
