export const INITIAL_FOOD_DATABASE = [
  {
    id: "parle-monaco-salty",
    barcode: "8901719140570",
    name: "Parle Monaco Crispy Light Salty Snack",
    brand: "Parle Biscuits Pvt. Ltd.",
    category: "Biscuits & Salty Snacks",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    score: 36,
    rating: "Red",
    verdict: "Unhealthy - High Sodium (891mg/100g) & Saturated Fats (9.7g/100g)",
    servingSize: "185.6g pack (14.4g per serve)",
    caloriesPerServing: 492,
    macros: {
      protein: "7.9g",
      carbs: "68.8g",
      fat: "20.6g",
      saturatedFat: "9.7g",
      sugar: "7.8g",
      sodium: "891mg",
      fiber: "1.5g"
    },
    productInfo: {
      productName: "Parle Monaco Crispy Light Salty Snack",
      brand: "Parle Biscuits Pvt. Ltd.",
      category: "Biscuits & Salty Snacks",
      netQuantity: "185.6 g",
      mrp: "₹ 35.00 (Incl. of all taxes)",
      manufacturer: "Parle Biscuits Pvt. Ltd., North Level Crossing, Vile Parle East, Mumbai, MH - 400057 • FSSAI Lic No: 10012021000043 / 10012022000118",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from Manufacturing Date",
      consumerCare: "Phone: 1800 209 6929 | Email: cs@parle.biz | Web: www.parleproducts.com | Address: Consumer Care Cell, Parle Biscuits Pvt Ltd, Mumbai - 400057"
    },
    pros: [
      "Crispy light texture",
      "Trans-fat free (0g Trans Fat)"
    ],
    cons: [
      "High sodium concentration (891mg per 100g)",
      "Elevated saturated fat (9.7g per 100g)",
      "Refined wheat flour (Maida) base"
    ],
    shortTermEffects: [
      "Sodium thirst & fluid retention",
      "Glycemic response"
    ],
    longTermEffects: [
      "Cardiovascular stress if consumed in high quantities"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "Contains 68.8g refined wheat carbs and 7.8g sugar." },
      hypertension: { suitable: false, severity: "High Risk", note: "Contains 891mg sodium per 100g, strictly limit for high BP." },
      obesity: { suitable: false, severity: "Caution", note: "Calorically dense (492 kcal/100g) with high fats." },
      thyroid: { suitable: true, severity: "Safe", note: "Regulated bakery ingredients." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "High fat to protein ratio." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High sodium concentration." }
    },
    additives: [
      { code: "E503(ii)", name: "Ammonium Hydrogen Carbonate", risk: "Low", description: "Leavening agent" },
      { code: "E500(ii)", name: "Sodium Hydrogen Carbonate", risk: "Low", description: "Baking soda powder" }
    ],
    alternatives: []
  },
  {
    id: "maggi-2min",
    barcode: "8901058852370",
    name: "Maggi 2-Minute Masala Noodles",
    brand: "Nestlé",
    category: "Instant Noodles / Packaged Snacks",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&auto=format&fit=crop&q=80",
    score: 32, // 0-100 score
    rating: "Red", // Red, Yellow, Green
    verdict: "Unhealthy - High Sodium & Refined Flour (Palmolein Oil)",
    servingSize: "70g",
    caloriesPerServing: 310,
    macros: {
      protein: "7.8g",
      carbs: "46.2g",
      fat: "13.5g",
      saturatedFat: "6.2g",
      sugar: "1.5g",
      sodium: "860mg", // ~37% Daily limit
      fiber: "2.1g"
    },
    productInfo: {
      productName: "Maggi 2-Minute Masala Noodles",
      brand: "Nestlé India Ltd.",
      category: "Instant Noodles / Packaged Snacks",
      netQuantity: "70 g",
      mrp: "₹14.00 (Incl. of all taxes)",
      manufacturer: "Nestlé India Limited, Moga Factory, GT Road, Moga - 142001, Punjab • FSSAI Lic No: 10012011000168",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 9 months from Manufacturing Date (Batch: M8241A)",
      consumerCare: "Toll-Free Helpline: 1800-266-1188 | Email: wecare@nestle.in | Nestlé Consumer Care, P.O. Box 4, New Delhi - 110001"
    },
    pros: [
      "Quick & convenient preparation (2 minutes)",
      "Fortified with Iron & Vitamin A",
      "Contains basic spice mix minerals"
    ],
    cons: [
      "High Palm Oil / Palmolein Content (~13.5g total fat per block)",
      "Excess Sodium (860mg sodium per serving - over 35% daily recommended limit)",
      "Refined Wheat Flour (Maida) base with low dietary fiber",
      "Presence of flavor enhancers like E621 (MSG) and E635"
    ],
    shortTermEffects: [
      "Rapid spike in blood sugar followed by energy crash",
      "Mild sodium-induced water retention and puffiness",
      "Increased thirst and gastric heavy feeling"
    ],
    longTermEffects: [
      "Increased risk of hypertension and cardiovascular stress due to high sodium",
      "Visceral fat accumulation from deep-fried refined flour & palmolein oil",
      "Potential metabolic dysfunction if consumed multiple times a week"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "High Glycemic Index (Maida base) rapidly spikes blood glucose levels." },
      hypertension: { suitable: false, severity: "High Risk", note: "Contains 860mg sodium per pack (~40% RDA), strictly avoid for high BP." },
      obesity: { suitable: false, severity: "High Risk", note: "Calorically dense with high saturated fats and low satiating fiber." },
      thyroid: { suitable: false, severity: "Moderate Risk", note: "Refined carbs can trigger inflammatory flare-ups." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "Low protein quality (7.8g) with high fat-to-carb ratio." },
      kidsParenting: { suitable: false, severity: "Avoid", note: "Additives & high sodium are unsuitable for developing digestive systems." }
    },
    additives: [
      { code: "E621", name: "Monosodium Glutamate (MSG)", risk: "Moderate", description: "Flavor enhancer. May trigger headaches or glutamate sensitivity in susceptible individuals." },
      { code: "E635", name: "Disodium 5'-Ribonucleotides", risk: "Moderate", description: "Synergistic umami additive. Not recommended for gout sufferers." },
      { code: "E501(i)", name: "Potassium Carbonate", risk: "Low", description: "Acidity regulator used for noodle elasticity." },
      { code: "E500(i)", name: "Sodium Carbonate", risk: "Low", description: "Alkalizing salt agent." }
    ],
    alternatives: [
      {
        name: "Slurrp Farm Millet Noodles",
        brand: "Slurrp Farm",
        score: 84,
        rating: "Green",
        reason: "Made of 100% Foxtail & Ragi Millets, not fried, zero palm oil, 60% less sodium.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80"
      },
      {
        name: "WickedGud Whole Wheat Atta Noodles",
        brand: "WickedGud",
        score: 81,
        rating: "Green",
        reason: "Air-dried, zero maida, zero MSG, rich in pea protein and oats fiber.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "parle-g-biscuits",
    barcode: "8901030000013",
    name: "Parle-G Original Glucose Biscuits",
    brand: "Parle Products Pvt. Ltd.",
    category: "Biscuits & Bakery",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    score: 42,
    rating: "Yellow",
    verdict: "Moderate Caution - High Sugar & Refined Wheat Flour",
    servingSize: "65g",
    caloriesPerServing: 290,
    macros: {
      protein: "4.2g",
      carbs: "51.0g",
      fat: "8.5g",
      saturatedFat: "4.1g",
      sugar: "17.0g",
      sodium: "180mg",
      fiber: "1.2g"
    },
    productInfo: {
      productName: "Parle-G Original Glucose Biscuits",
      brand: "Parle Products Pvt. Ltd.",
      category: "Biscuits & Bakery",
      netQuantity: "65 g",
      mrp: "₹10.00 (Incl. of all taxes)",
      manufacturer: "Parle Products Pvt. Ltd., North Level Crossing, Vile Parle East, Mumbai - 400057, Maharashtra • FSSAI Lic No: 10012022000071",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from Manufacturing Date (Batch: PG65M)",
      consumerCare: "Toll-Free Helpline: 1800-22-3588 | Email: cs@parle.biz | Consumer Cell, Mumbai"
    },
    pros: [
      "Quick energy boost with real wheat glucose",
      "Affordable nutrition source"
    ],
    cons: [
      "High added refined sugar (17g per pack)",
      "Refined wheat flour (Maida) base",
      "Contains vegetable palm oil"
    ],
    shortTermEffects: [
      "Fast glycemic energy release",
      "Sugar crash if eaten empty stomach"
    ],
    longTermEffects: [
      "Risk of weight gain and dental cavities with frequent daily intake"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "Contains 17g added sugar and high GI refined wheat." },
      hypertension: { suitable: true, severity: "Safe", note: "Moderate sodium content (180mg)." },
      obesity: { suitable: false, severity: "Caution", note: "High carbohydrate and sugar density." },
      thyroid: { suitable: true, severity: "Safe", note: "Standard bakery ingredient profile." },
      gymFitness: { suitable: true, severity: "Pre-Workout Energy", note: "Fast absorbing carbs before intense workouts." },
      kidsParenting: { suitable: true, severity: "Moderate", note: "Limit daily quantity due to sugar content." }
    },
    additives: [
      { code: "E503(ii)", name: "Ammonium Hydrogen Carbonate", risk: "Low", description: "Leavening agent for crisp texture." },
      { code: "E500(ii)", name: "Sodium Hydrogen Carbonate", risk: "Low", description: "Baking powder." }
    ],
    alternatives: []
  },
  {
    id: "cadbury-dairy-milk",
    barcode: "8901233020945",
    name: "Cadbury Dairy Milk Chocolate Bar",
    brand: "Mondelez India Foods Pvt. Ltd.",
    category: "Chocolates & Confectionery",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
    score: 28,
    rating: "Red",
    verdict: "Unhealthy - High Added Sugar & Milk Fats",
    servingSize: "50g",
    caloriesPerServing: 265,
    macros: {
      protein: "3.8g",
      carbs: "29.5g",
      fat: "15.2g",
      saturatedFat: "9.5g",
      sugar: "28.0g",
      sodium: "75mg",
      fiber: "1.0g"
    },
    productInfo: {
      productName: "Cadbury Dairy Milk Milk Chocolate",
      brand: "Mondelez India Foods Private Limited",
      category: "Chocolates & Confectionery",
      netQuantity: "50 g",
      mrp: "₹45.00 (Incl. of all taxes)",
      manufacturer: "Mondelez India Foods Pvt. Ltd., Unit No. 2001, 20th Floor, Tower-3, Indiabulls Finance Centre, Parel, Mumbai - 400013 • FSSAI Lic No: 10014022002711",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 12 months from Manufacturing Date (Batch: DM50B)",
      consumerCare: "Toll-Free Helpline: 1800-22-7080 | Email: suggestions@mdlz.com | Consumer Cell, Mumbai"
    },
    pros: [
      "Rich cocoa antioxidants",
      "Creamy milk taste profile"
    ],
    cons: [
      "Over 55% of weight is pure added sugar (28g sugar per 50g bar)",
      "High saturated fat content (9.5g)",
      "Calorically dense"
    ],
    shortTermEffects: [
      "Dopamine spike and blood sugar elevation",
      "Craving for additional sweet portion"
    ],
    longTermEffects: [
      "Weight gain, insulin resistance, and dental cavities if consumed daily"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Critical Danger", note: "Contains 28g fast absorbing sugar. Rapid glucose spike!" },
      hypertension: { suitable: true, severity: "Safe", note: "Low sodium content (75mg)." },
      obesity: { suitable: false, severity: "Avoid", note: "High caloric & sugar density." },
      thyroid: { suitable: false, severity: "Caution", note: "High sugar exacerbates metabolic inflammation." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "High fat to protein ratio." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High sugar impairs concentration and dental health." }
    },
    additives: [
      { code: "E442", name: "Ammonium Phosphatides", risk: "Low", description: "Emulsifier for chocolate texture." },
      { code: "E476", name: "PGPR", risk: "Moderate", description: "Synthetic emulsifier replacing cocoa butter." }
    ],
    alternatives: []
  },
  {
    id: "kurkure-masala-munch",
    barcode: "8901491001559",
    name: "Kurkure Masala Munch Crunchy Snacks",
    brand: "PepsiCo India Holdings Pvt. Ltd.",
    category: "Packaged Salty Snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    score: 35,
    rating: "Red",
    verdict: "Unhealthy - Deep Fried Palm Oil, High Sodium & MSG",
    servingSize: "45g",
    caloriesPerServing: 248,
    macros: {
      protein: "2.8g",
      carbs: "25.2g",
      fat: "15.3g",
      saturatedFat: "6.8g",
      sugar: "1.2g",
      sodium: "420mg",
      fiber: "1.8g"
    },
    productInfo: {
      productName: "Kurkure Masala Munch Crunchy Snacks",
      brand: "PepsiCo India Holdings Pvt. Ltd. (Frito-Lay)",
      category: "Packaged Salty Snacks",
      netQuantity: "45 g",
      mrp: "₹20.00 (Incl. of all taxes)",
      manufacturer: "PepsiCo India Holdings Pvt. Ltd., Patiala-Sangrur Road, Sangrur - 148028, Punjab • FSSAI Lic No: 10012063000110",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 4 months from Manufacturing Date (Batch: KK45M)",
      consumerCare: "Toll-Free Helpline: 1800-22-7022 | Email: consumer.feedback@pepsico.com | PepsiCo Care, Gurugram"
    },
    pros: [
      "Authentic Indian spice blend flavor"
    ],
    cons: [
      "Deep fried in refined palmolein vegetable oil (~15.3g total fat)",
      "High sodium concentration (420mg)",
      "Contains flavor enhancers E621 MSG and E635"
    ],
    shortTermEffects: [
      "Hyper-palatability triggers rapid overeating",
      "Sodium-induced thirst and water retention"
    ],
    longTermEffects: [
      "Increased cardiovascular stress and lipid profile deterioration"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "Refined corn & rice meal rapidly converts to glucose." },
      hypertension: { suitable: false, severity: "High Risk", note: "Contains 420mg sodium per bag. Strictly limit for High BP." },
      obesity: { suitable: false, severity: "Avoid", note: "Calorically dense with high fried fat content." },
      thyroid: { suitable: false, severity: "Caution", note: "Refined seed oils exacerbate systemic inflammation." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "Low protein and high fried fat density." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High sodium and MSG flavor enhancers." }
    },
    additives: [
      { code: "E621", name: "MSG", risk: "Moderate", description: "Flavor enhancer." },
      { code: "E635", name: "Disodium 5'-Ribonucleotides", risk: "Moderate", description: "Synergistic umami salt." }
    ],
    alternatives: []
  },
  {
    id: "cocacola-500ml",
    barcode: "5449000000996",
    name: "Coca-Cola Original Taste (500ml)",
    brand: "The Coca-Cola Company",
    category: "Carbonated Soft Drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
    score: 18,
    rating: "Red",
    verdict: "Severe - Ultra-High Added Sugar & Phosphoric Acid",
    servingSize: "500ml",
    caloriesPerServing: 210,
    macros: {
      protein: "0g",
      carbs: "53g",
      fat: "0g",
      saturatedFat: "0g",
      sugar: "53g", // 106% Daily recommended sugar intake
      sodium: "45mg",
      fiber: "0g"
    },
    productInfo: {
      productName: "Coca-Cola Original Taste Carbonated Beverage",
      brand: "The Coca-Cola Company (Hindustan Coca-Cola)",
      category: "Carbonated Soft Drinks",
      netQuantity: "500 ml",
      mrp: "₹40.00 (Incl. of all taxes)",
      manufacturer: "Hindustan Coca-Cola Beverages Pvt. Ltd., Plot No. 1, Bidadi Industrial Area, Ramanagara - 562109, Karnataka • FSSAI Lic No: 10012022000257",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD (Batch No: CC500B)",
      consumerCare: "Toll-Free Helpline: 1800-180-2653 | Email: indiahelpline@coca-cola.com | Consumer Care Cell, Gurgaon, Haryana"
    },
    pros: [
      "Instant caffeine & sugar boost",
      "Refreshing carbonation"
    ],
    cons: [
      "53g of added refined sugar per bottle (equivalent to ~13 teaspoons of sugar)",
      "Zero essential nutrients, vitamins, protein, or dietary fiber",
      "Phosphoric acid can erode tooth enamel and leach calcium from bones over time",
      "Caramel Color (Class IV - E150d) contains 4-MEI traces"
    ],
    shortTermEffects: [
      "Insane blood sugar spike and massive insulin response",
      "Dehydration due to caffeine diuretic effect & high osmolarity",
      "Subsequent sugar crash leading to craving and fatigue"
    ],
    longTermEffects: [
      "High probability of Type-2 Diabetes and Insulin Resistance",
      "Nonalcoholic Fatty Liver Disease (NAFLD) from high fructose intake",
      "Dental caries, tooth decay, and reduced bone mineral density"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Critical Danger", note: "Contains 53g fast-absorbing sugar. Will cause immediate severe glycemic spike!" },
      hypertension: { suitable: false, severity: "High Risk", note: "Fructose metabolism elevates uric acid and arterial stiffness." },
      obesity: { suitable: false, severity: "Critical Danger", note: "210 empty calories that fail to trigger satiety receptors." },
      thyroid: { suitable: false, severity: "High Risk", note: "Refined sugar exacerbates metabolic inflammation." },
      gymFitness: { suitable: false, severity: "Toxic Choice", note: "Pure liquid sugar without recovery nutrients." },
      kidsParenting: { suitable: false, severity: "Strictly Avoid", note: "Caffeine & extreme sugar impair children's concentration & dental health." }
    },
    additives: [
      { code: "E338", name: "Phosphoric Acid", risk: "High", description: "Acidulant that gives tangy kick. Inhibits calcium absorption." },
      { code: "E150d", name: "Sulphite Ammonia Caramel", risk: "Moderate", description: "Coloring agent processed under high pressure/temp." },
      { code: "E211", name: "Sodium Benzoate", risk: "Moderate", description: "Preservative. Can form benzene when combined with Vitamin C." }
    ],
    alternatives: [
      {
        name: "Raw Pressery Coconut Water",
        brand: "Raw Pressery",
        score: 95,
        rating: "Green",
        reason: "100% natural, zero added sugar, rich in potassium and electrolytes.",
        image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&auto=format&fit=crop&q=80"
      },
      {
        name: "Paper Boat Sparkling Lime & Mint (No Sugar)",
        brand: "Paper Boat",
        score: 88,
        rating: "Green",
        reason: "Naturally sweetened with Stevia, zero sugar, zero calories.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "quaker-rolled-oats",
    barcode: "8901491101914",
    name: "Quaker Rolled Whole Oats (100% Natural)",
    brand: "Quaker / PepsiCo",
    category: "Breakfast Cereals & Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    score: 92,
    rating: "Green",
    verdict: "Super Healthy - High Beta-Glucan Fiber & Complex Carbs",
    servingSize: "40g",
    caloriesPerServing: 156,
    macros: {
      protein: "5.4g",
      carbs: "26.8g",
      fat: "3.1g",
      saturatedFat: "0.6g",
      sugar: "0.4g", // Naturally occurring
      sodium: "4mg",
      fiber: "4.2g" // Soluble Beta-Glucan
    },
    productInfo: {
      productName: "Quaker Rolled Whole Oats (100% Natural Grain)",
      brand: "Quaker Oats (PepsiCo India Holdings Pvt. Ltd.)",
      category: "Breakfast Cereals & Whole Grains",
      netQuantity: "1 kg (1000 g)",
      mrp: "₹199.00 (Incl. of all taxes)",
      manufacturer: "PepsiCo India Holdings Pvt. Ltd., Village Channo, Patiala-Sangrur Road, Sangrur - 148028, Punjab • FSSAI Lic No: 10012063000110",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 12 months from MFD (Batch No: QK1000X)",
      consumerCare: "Toll-Free Helpline: 1800-22-7022 | Email: consumer.feedback@pepsico.com | PepsiCo Consumer Care, PO Box 27, Gurugram"
    },
    pros: [
      "100% Whole grain oats with zero added sugars or preservatives",
      "Rich in Beta-Glucan soluble fiber which actively reduces LDL cholesterol",
      "Low Glycemic Index providing sustained energy release",
      "High satiety factor helping with weight management and digestion"
    ],
    cons: [
      "Requires cooking or soaking (plain taste without fruits/honey)",
      "Traces of phytic acid (can be minimized by soaking before eating)"
    ],
    shortTermEffects: [
      "Prolonged satiety and fullness for 4-5 hours",
      "Stable blood sugar levels without spikes",
      "Smooth digestion and healthy gut motility"
    ],
    longTermEffects: [
      "Significantly lowered bad cholesterol (LDL) and improved heart health",
      "Enhanced insulin sensitivity and reduced risk of Type-2 Diabetes",
      "Supported gut microbiome diversity due to prebiotic fiber"
    ],
    diseaseSuitability: {
      diabetes: { suitable: true, severity: "Excellent", note: "Low GI complex carbs slow down glucose absorption in blood stream." },
      hypertension: { suitable: true, severity: "Excellent", note: "Ultra-low sodium (4mg) and high potassium support optimal blood pressure." },
      obesity: { suitable: true, severity: "Highly Recommended", note: "Beta-glucan promotes gut satiety hormone YY release." },
      thyroid: { suitable: true, severity: "Safe & Suitable", note: "Non-inflammatory whole grain." },
      gymFitness: { suitable: true, severity: "Top Choice", note: "Great complex carbohydrate source for pre-workout energy." },
      kidsParenting: { suitable: true, severity: "Excellent", note: "Wholesome natural grain for growing children." }
    },
    additives: [],
    alternatives: []
  },
  {
    id: "doritos-nacho",
    barcode: "8901491503312",
    name: "Doritos Nacho Cheese Tortilla Chips",
    brand: "Frito-Lay",
    category: "Packaged Salty Snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    score: 38,
    rating: "Red",
    verdict: "Unhealthy - Ultra-Processed Corn, MSG & Artificial Dyes",
    servingSize: "50g",
    caloriesPerServing: 260,
    macros: {
      protein: "3.5g",
      carbs: "30.0g",
      fat: "14.0g",
      saturatedFat: "6.5g",
      sugar: "1.0g",
      sodium: "380mg",
      fiber: "2.0g"
    },
    productInfo: {
      productName: "Doritos Nacho Cheese Tortilla Chips",
      brand: "Frito-Lay (PepsiCo India Holdings)",
      category: "Packaged Salty Snacks",
      netQuantity: "50 g",
      mrp: "₹20.00 (Incl. of all taxes)",
      manufacturer: "PepsiCo India Holdings Pvt. Ltd., JLN Marg, Commercial Complex, Vasant Kunj, New Delhi - 110070 • FSSAI Lic No: 10014011000982",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD (Batch No: DR50NC)",
      consumerCare: "Toll-Free Helpline: 1800-22-7022 | Email: feedback@pepsico.com | Frito-Lay Care Cell, Gurugram"
    },
    pros: [
      "Crunchy texture and rich cheesy taste"
    ],
    cons: [
      "Fried in refined vegetable oils (Palm oil/Sunflower oil blend)",
      "Contains artificial food dyes (Yellow 5 / E102 & Yellow 6 / E110)",
      "Flavored with MSG (E621) designed to trigger hyper-palatability overeating",
      "High in calories and saturated fats"
    ],
    shortTermEffects: [
      "Hyper-palatability triggers rapid overconsumption",
      "Sodium thirst & temporary water weight retention"
    ],
    longTermEffects: [
      "Increased systemic inflammation from synthetic dyes and rancid seed oils",
      "Potential weight gain and lipid profile deterioration"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "Refined corn flour turns rapidly into blood sugar." },
      hypertension: { suitable: false, severity: "High Risk", note: "High sodium concentration per bag." },
      obesity: { suitable: false, severity: "Avoid", note: "High caloric density with low satiety." },
      thyroid: { suitable: false, severity: "Caution", note: "Artificial colors (E102, E110) may trigger thyroid inflammation." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "Empty fat and carb calories." },
      kidsParenting: { suitable: false, severity: "Limit", note: "Artificial food dyes are linked to hyperactivity in kids." }
    },
    additives: [
      { code: "E621", name: "MSG", risk: "Moderate", description: "Neuro-excitative flavor enhancer." },
      { code: "E102", name: "Tartrazine (Yellow 5)", risk: "High", description: "Synthetic azo dye linked to pediatric hyper-reactivity." },
      { code: "E110", name: "Sunset Yellow (Yellow 6)", risk: "High", description: "Banned in several EU countries for child safety." }
    ],
    alternatives: [
      {
        name: "TagZ Popped Potato Chips (Nacho Cheese)",
        brand: "TagZ Foods",
        score: 78,
        rating: "Green",
        reason: "Popped not fried, 50% less fat, zero palm oil, zero synthetic dyes.",
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "amul-butter-salted",
    barcode: "8901262010054",
    name: "Amul Pasteurised Salted Butter",
    brand: "Amul (GCMMF)",
    category: "Dairy & Fats",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",
    score: 62,
    rating: "Yellow",
    verdict: "Moderate - Pure Dairy Fat, Consume in Moderation",
    servingSize: "10g",
    caloriesPerServing: 72,
    macros: {
      protein: "0.1g",
      carbs: "0.1g",
      fat: "8.0g",
      saturatedFat: "5.1g",
      sugar: "0.0g",
      sodium: "88mg",
      fiber: "0g"
    },
    productInfo: {
      productName: "Amul Pasteurised Salted Butter",
      brand: "Amul (GCMMF)",
      category: "Dairy & Fats",
      netQuantity: "100 g",
      mrp: "₹60.00 (Incl. of all taxes)",
      manufacturer: "GCMMF Ltd., Amul Dairy Road, Anand - 388001, Gujarat • FSSAI Lic No: 10012021000071",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 12 months from MFD when stored at or below 4°C (Batch: AM100B)",
      consumerCare: "Toll-Free Helpline: 1800-258-3333 | Email: customercare@amul.coop | Amul Dairy Consumer Cell, Anand, Gujarat"
    },
    pros: [
      "100% natural butter fat made from milk",
      "Contains fat-soluble Vitamin A and natural CLA (Conjugated Linoleic Acid)",
      "Zero artificial preservatives or hydrogenated trans fats"
    ],
    cons: [
      "High in saturated fatty acids (5.1g per 10g serving)",
      "Added table salt (88mg sodium per tiny slice)",
      "Calorically dense (720 kcal per 100g)"
    ],
    shortTermEffects: [
      "Satiety and rich mouthfeel",
      "Slow gastric emptying"
    ],
    longTermEffects: [
      "Excessive intake can elevate ApoB and LDL cholesterol in hyper-responders",
      "Weight gain if caloric intake is unmonitored"
    ],
    diseaseSuitability: {
      diabetes: { suitable: true, severity: "Moderate", note: "Zero sugar GI, but monitor total saturated fat calories." },
      hypertension: { suitable: false, severity: "Caution", note: "Salted butter adds extra sodium. Prefer Unsalted Amul White Butter." },
      obesity: { suitable: false, severity: "Portion Control", note: "Calorically dense, strictly limit to 5-10g per day." },
      thyroid: { suitable: true, severity: "Safe", note: "Pure milk fat does not trigger autoimmune reactions." },
      gymFitness: { suitable: true, severity: "Good Fat Source", note: "Great source of natural fat for Keto/Low Carb diets." },
      kidsParenting: { suitable: true, severity: "Healthy", note: "Good for brain development and energy in active children." }
    },
    additives: [
      { code: "E160a(i)", name: "Beta-Carotene Color", risk: "Low", description: "Natural plant extract color." }
    ],
    alternatives: [
      {
        name: "Amul Unsalted White Butter (Makhan)",
        brand: "Amul",
        score: 75,
        rating: "Green",
        reason: "Zero sodium, unpasteurized/traditional culturing, zero added salt.",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "dark-fantasy-choco-fills",
    barcode: "8901030026785",
    name: "Sunfeast Dark Fantasy Choco Fills",
    brand: "ITC",
    category: "Biscuits & Confectionery",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    score: 24,
    rating: "Red",
    verdict: "Unhealthy - High Refined Sugar, Palm Oil & Emulsifiers",
    servingSize: "25g (2 biscuits)",
    caloriesPerServing: 130,
    macros: {
      protein: "1.4g",
      carbs: "16.5g",
      fat: "6.8g",
      saturatedFat: "3.4g",
      sugar: "9.5g",
      sodium: "65mg",
      fiber: "0.5g"
    },
    productInfo: {
      productName: "Sunfeast Dark Fantasy Choco Fills",
      brand: "ITC Limited (Foods Division)",
      category: "Biscuits & Confectionery",
      netQuantity: "75 g (6 biscuits)",
      mrp: "₹40.00 (Incl. of all taxes)",
      manufacturer: "ITC Limited, Virginia House, 37 J.L. Nehru Road, Kolkata - 700071, West Bengal • FSSAI Lic No: 10012031000012",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD (Batch No: ITC75DF)",
      consumerCare: "Toll-Free Helpline: 1800-425-44444 | Email: quality@itc.in | ITC Consumer Care Manager, P.O. Box No. 592, Bengaluru - 560005"
    },
    pros: [
      "Rich molten chocolate taste profile"
    ],
    cons: [
      "Nearly 40% of the biscuit weight is pure added sugar!",
      "Made with refined hydrogenated palm fats",
      "Contains artificial chocolate flavoring agents and soy lecithin emulsifiers",
      "Low satiety leads to easy overeating of multiple biscuits"
    ],
    shortTermEffects: [
      "Rapid glucose elevation followed by hypoglycemia fatigue",
      "Dopamine hit encouraging immediate craving for another biscuit"
    ],
    longTermEffects: [
      "Accelerated skin glycation, weight gain, and dental cavity formation",
      "Elevated systemic inflammatory markers"
    ],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Critical Danger", note: "Contains 9.5g sugar in just 2 small biscuits!" },
      hypertension: { suitable: false, severity: "Caution", note: "Refined sugar spikes vascular inflammation." },
      obesity: { suitable: false, severity: "Avoid", note: "Ultra-processed hyper-palatable dessert." },
      thyroid: { suitable: false, severity: "Avoid", note: "High sugar and palm fat exacerbate metabolic dysfunction." },
      gymFitness: { suitable: false, severity: "Avoid", note: "Empty sugar & palm oil calories." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High sugar leads to dental decay and energy mood swings." }
    },
    additives: [
      { code: "E322", name: "Soy Lecithin", risk: "Low", description: "Emulsifier used to blend chocolate fat." },
      { code: "E476", name: "PGPR", risk: "Moderate", description: "Polyglycerol polyricinoleate, synthetic cocoa butter substitute." }
    ],
    alternatives: [
      {
        name: "The Whole Truth Dark Chocolate Protein Bar",
        brand: "The Whole Truth",
        score: 89,
        rating: "Green",
        reason: "Made with 100% dates, raw cocoa, cashew nuts & whey protein. Zero added refined sugar, zero palm oil.",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "lays-magic-masala",
    barcode: "8901491101820",
    name: "Lay's India's Magic Masala Chips",
    brand: "PepsiCo India Holdings",
    category: "Chips & Snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    score: 30,
    rating: "Red",
    verdict: "Unhealthy - High Sodium & Palmolein Saturated Fat",
    servingSize: "50g",
    caloriesPerServing: 275,
    macros: { protein: "3.5g", carbs: "26.0g", fat: "17.5g", saturatedFat: "7.8g", sugar: "1.2g", sodium: "480mg", fiber: "1.8g" },
    productInfo: {
      productName: "Lay's India's Magic Masala Potato Chips",
      brand: "PepsiCo India Holdings Pvt. Ltd.",
      category: "Chips & Snacks",
      netQuantity: "52 g",
      mrp: "₹20.00 (Incl. of all taxes)",
      manufacturer: "PepsiCo India Holdings Pvt. Ltd., Village Channo, Patiala, Punjab • FSSAI Lic No: 10012063000110",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 4 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-22-4020 | Email: feedback@pepsico.com"
    },
    pros: ["Authentic spicy Indian masala blend", "Crispy fried texture"],
    cons: ["High palmolein oil content (17.5g total fat per serve)", "High sodium concentration (480mg per pack)", "Deep-fried potato starch with low fiber"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "High GI fried starch." },
      hypertension: { suitable: false, severity: "High Risk", note: "High sodium level per serving." },
      obesity: { suitable: false, severity: "Avoid", note: "Calorically dense fried snack." },
      thyroid: { suitable: false, severity: "Caution", note: "Refined palmolein fat." },
      gymFitness: { suitable: false, severity: "Avoid", note: "High fat to protein ratio." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High sodium and MSG flavor enhancers." }
    },
    additives: [
      { code: "E621", name: "Monosodium Glutamate (MSG)", risk: "Moderate", description: "Flavor enhancer" },
      { code: "E635", name: "Disodium 5'-Ribonucleotides", risk: "Moderate", description: "Umami salt" }
    ],
    alternatives: []
  },
  {
    id: "britannia-good-day-cashew",
    barcode: "8901063013216",
    name: "Britannia Good Day Cashew Biscuits",
    brand: "Britannia Industries Ltd.",
    category: "Biscuits & Bakery",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    score: 38,
    rating: "Red",
    verdict: "Unhealthy - High Added Sugar & Vegetable Fat",
    servingSize: "60g",
    caloriesPerServing: 305,
    macros: { protein: "4.5g", carbs: "39.0g", fat: "15.0g", saturatedFat: "7.5g", sugar: "15.5g", sodium: "190mg", fiber: "1.0g" },
    productInfo: {
      productName: "Britannia Good Day Cashew Biscuits",
      brand: "Britannia Industries Limited",
      category: "Biscuits & Bakery",
      netQuantity: "60 g",
      mrp: "₹20.00 (Incl. of all taxes)",
      manufacturer: "Britannia Industries Ltd., Executive Centre, Whitefield, Bengaluru - 560066 • FSSAI Lic No: 10015043001129",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-425-4449 | Email: feedback@britindia.com"
    },
    pros: ["Contains real cashew bits", "Butter-flavored crunch"],
    cons: ["High refined sugar (15.5g per 60g pack)", "Refined wheat flour (Maida) base", "Hydrogenated vegetable palm fat"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "15.5g added sugar." },
      hypertension: { suitable: true, severity: "Safe", note: "Moderate sodium." },
      obesity: { suitable: false, severity: "Caution", note: "Calorically dense." },
      thyroid: { suitable: true, severity: "Safe", note: "Standard bakery fats." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "Low protein quality." },
      kidsParenting: { suitable: false, severity: "Moderate", note: "Limit daily intake due to sugar." }
    },
    additives: [
      { code: "E503(ii)", name: "Ammonium Bicarbonate", risk: "Low", description: "Leavening agent" },
      { code: "E322", name: "Soy Lecithin", risk: "Low", description: "Emulsifier" }
    ],
    alternatives: []
  },
  {
    id: "oreo-original-vanilla",
    barcode: "8901233022109",
    name: "Oreo Original Vanilla Cream Biscuits",
    brand: "Mondelez India Foods",
    category: "Biscuits & Confectionery",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80",
    score: 25,
    rating: "Red",
    verdict: "Unhealthy - Extremely High Added Sugar & Palm Fat",
    servingSize: "50g (5 biscuits)",
    caloriesPerServing: 240,
    macros: { protein: "2.5g", carbs: "35.0g", fat: "10.0g", saturatedFat: "5.0g", sugar: "19.0g", sodium: "220mg", fiber: "1.2g" },
    productInfo: {
      productName: "Oreo Original Sandwich Biscuits (Vanilla Cream)",
      brand: "Mondelez India Foods Pvt. Ltd.",
      category: "Biscuits & Confectionery",
      netQuantity: "120 g",
      mrp: "₹35.00 (Incl. of all taxes)",
      manufacturer: "Mondelez India Foods Pvt. Ltd., Mumbai, MH - 400013 • FSSAI Lic No: 10014022002711",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 9 months from MFD",
      consumerCare: "Helpline: 1800-22-7080 | Email: suggestions@mdlz.com"
    },
    pros: ["Iconic chocolate sandwich cookie taste"],
    cons: ["Over 38% of biscuit weight is pure added sugar (19g sugar per 50g serve)", "Refined palm oil center filling", "Low fiber and high calorie density"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Critical Danger", note: "19g added sugar per serve!" },
      hypertension: { suitable: true, severity: "Moderate", note: "Moderate sodium." },
      obesity: { suitable: false, severity: "Avoid", note: "Hyper-palatable dessert biscuit." },
      thyroid: { suitable: false, severity: "Avoid", note: "High sugar and palm fat." },
      gymFitness: { suitable: false, severity: "Avoid", note: "Empty calories." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "Causes sugar rushes and tooth decay." }
    },
    additives: [
      { code: "E322", name: "Soy Lecithin", risk: "Low", description: "Emulsifier" },
      { code: "E500(ii)", name: "Sodium Bicarbonate", risk: "Low", description: "Raising agent" }
    ],
    alternatives: []
  },
  {
    id: "saffola-oats-natural",
    barcode: "8901088056006",
    name: "Saffola Oats 100% Natural Whole Grain",
    brand: "Marico Limited",
    category: "Breakfast Cereals & Oats",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    score: 94,
    rating: "Green",
    verdict: "Super Healthy - 100% Rolled Oats, High Beta-Glucan Fiber",
    servingSize: "40g",
    caloriesPerServing: 155,
    macros: { protein: "5.5g", carbs: "26.0g", fat: "3.0g", saturatedFat: "0.6g", sugar: "0.4g", sodium: "3mg", fiber: "4.2g" },
    productInfo: {
      productName: "Saffola Oats 100% Natural Rolled Oats",
      brand: "Marico Limited",
      category: "Breakfast Cereals & Oats",
      netQuantity: "500 g",
      mrp: "₹110.00 (Incl. of all taxes)",
      manufacturer: "Marico Limited, Grande Palladium, 175 CST Road, Kalina, Santacruz East, Mumbai - 400098 • FSSAI Lic No: 10012022000258",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 12 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-222-248 | Email: ccc@marico.com"
    },
    pros: ["100% Natural Rolled Oats with zero added sugar", "Rich in soluble Beta-Glucan fiber which lowers LDL cholesterol", "High satiety keeps you full for 4+ hours"],
    cons: ["Plain taste requires natural fruits or milk pairing"],
    diseaseSuitability: {
      diabetes: { suitable: true, severity: "Excellent", note: "Low Glycemic Index helps stabilize blood sugar." },
      hypertension: { suitable: true, severity: "Excellent", note: "Zero added salt; supports arterial health." },
      obesity: { suitable: true, severity: "Ideal Choice", note: "High dietary fiber promotes weight loss." },
      thyroid: { suitable: true, severity: "Safe", note: "Wholesome whole grain cereal." },
      gymFitness: { suitable: true, severity: "Top Pre-Workout", note: "Clean complex carbs & protein." },
      kidsParenting: { suitable: true, severity: "Super Healthy", note: "Ideal breakfast for growing children." }
    },
    additives: [],
    alternatives: []
  },
  {
    id: "epigamia-greek-yogurt-natural",
    barcode: "8908007201019",
    name: "Epigamia Natural Greek Yogurt (Zero Preservatives)",
    brand: "Drums Food International",
    category: "Dairy & Yogurt",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    score: 92,
    rating: "Green",
    verdict: "Super Healthy - High Protein (8g), Zero Added Sugar, Live Probiotics",
    servingSize: "85g cup",
    caloriesPerServing: 75,
    macros: { protein: "8.0g", carbs: "4.5g", fat: "2.8g", saturatedFat: "1.8g", sugar: "3.5g", sodium: "45mg", fiber: "0g" },
    productInfo: {
      productName: "Epigamia Natural Greek Yogurt",
      brand: "Drums Food International Pvt. Ltd.",
      category: "Dairy & Yogurt",
      netQuantity: "85 g",
      mrp: "₹45.00 (Incl. of all taxes)",
      manufacturer: "Drums Food International Pvt. Ltd., Kurla, Mumbai - 400070 • FSSAI Lic No: 10015022003848",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Use within 18 days from MFD (Keep Refrigerated)",
      consumerCare: "Toll-Free Helpline: 1800-266-9999 | Email: hello@epigamia.com"
    },
    pros: ["Double strained Greek Yogurt with 2x Protein of regular dahi", "Zero added refined sugar; contains active live probiotic cultures", "Rich in calcium and natural gut-friendly microbes"],
    cons: ["Must be stored refrigerated at 4°C"],
    diseaseSuitability: {
      diabetes: { suitable: true, severity: "Safe", note: "Zero added sugar; low glycemic load." },
      hypertension: { suitable: true, severity: "Safe", note: "Low sodium dairy profile." },
      obesity: { suitable: true, severity: "High Protein", note: "High protein promotes satiety and muscle preservation." },
      thyroid: { suitable: true, severity: "Safe", note: "Clean dairy protein." },
      gymFitness: { suitable: true, severity: "Ideal Snack", note: "8g quality protein per 85g cup." },
      kidsParenting: { suitable: true, severity: "Super Healthy", note: "Great natural source of calcium & gut bacteria." }
    },
    additives: [],
    alternatives: []
  },
  {
    id: "paperboat-aamras",
    barcode: "8906059530018",
    name: "Paper Boat Aamras Mango Fruit Juice",
    brand: "Hector Beverages Pvt. Ltd.",
    category: "Beverages & Juices",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    score: 46,
    rating: "Yellow",
    verdict: "Moderate - 45% Mango Pulp, High Added Sugar",
    servingSize: "200ml bottle",
    caloriesPerServing: 132,
    macros: { protein: "0.4g", carbs: "32.6g", fat: "0g", saturatedFat: "0g", sugar: "26.0g", sodium: "15mg", fiber: "1.2g" },
    productInfo: {
      productName: "Paper Boat Aamras Real Mango Drink",
      brand: "Hector Beverages Private Limited",
      category: "Beverages & Juices",
      netQuantity: "200 ml",
      mrp: "₹35.00 (Incl. of all taxes)",
      manufacturer: "Hector Beverages Pvt. Ltd., Plot No. 11-B, KIADB Industrial Area, Hoskote, Bengaluru - 562114 • FSSAI Lic No: 10012043000078",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-102-8929 | Email: customercare@hectorbeverages.com"
    },
    pros: ["Made with 45% real Alphonso/Mango pulp", "No artificial colors or preservatives"],
    cons: ["High added sugar content (26g sugar per 200ml bottle)", "High glycemic response"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "26g fast-absorbing fructose & sucrose sugar." },
      hypertension: { suitable: true, severity: "Safe", note: "Low sodium." },
      obesity: { suitable: false, severity: "Caution", note: "Liquid sugar calories." },
      thyroid: { suitable: true, severity: "Safe", note: "Natural fruit pulp base." },
      gymFitness: { suitable: true, severity: "Post-Workout Energy", note: "Fast glycogen replenishment." },
      kidsParenting: { suitable: false, severity: "Moderate", note: "Limit daily quantity due to high sugar." }
    },
    additives: [
      { code: "E330", name: "Citric Acid", risk: "Low", description: "Natural acidity regulator" },
      { code: "E300", name: "Ascorbic Acid (Vitamin C)", risk: "Low", description: "Antioxidant" }
    ],
    alternatives: []
  },
  {
    id: "sprite-crisp-lime",
    barcode: "8901764012204",
    name: "Sprite Crisp Lemon-Lime Sparkling Drink",
    brand: "The Coca-Cola Company",
    category: "Carbonated Soft Drinks",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&auto=format&fit=crop&q=80",
    score: 16,
    rating: "Red",
    verdict: "Unhealthy - 100% Liquid Added Sugar, Zero Fiber/Nutrients",
    servingSize: "250ml",
    caloriesPerServing: 120,
    macros: { protein: "0g", carbs: "30.0g", fat: "0g", saturatedFat: "0g", sugar: "30.0g", sodium: "25mg", fiber: "0g" },
    productInfo: {
      productName: "Sprite Crisp Lemon-Lime Carbonated Water",
      brand: "Coca-Cola India Pvt. Ltd.",
      category: "Carbonated Soft Drinks",
      netQuantity: "250 ml",
      mrp: "₹20.00 (Incl. of all taxes)",
      manufacturer: "Hindustan Coca-Cola Beverages Pvt. Ltd., Gurgaon, HR • FSSAI Lic No: 10012011000120",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-208-2653 | Email: indiahelpline@coca-cola.com"
    },
    pros: ["Instant cooling carbonated refreshment"],
    cons: ["Contains 30g pure refined added sugar per 250ml (~6 teaspoons)", "Zero protein, zero fiber, zero vitamins", "Phosphoric/Citric acidity erodes tooth enamel"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Critical Danger", note: "30g liquid sugar causes extreme glucose spikes!" },
      hypertension: { suitable: false, severity: "Caution", note: "Liquid sugar increases metabolic inflammation." },
      obesity: { suitable: false, severity: "Avoid", note: "Empty liquid calories with zero satiety." },
      thyroid: { suitable: false, severity: "Avoid", note: "Disrupts insulin sensitivity." },
      gymFitness: { suitable: false, severity: "Avoid", note: "Empty sugar." },
      kidsParenting: { suitable: false, severity: "Avoid", note: "Leads to hyperactivity and dental cavities." }
    },
    additives: [
      { code: "E330", name: "Citric Acid", risk: "Low", description: "Acidity regulator" },
      { code: "E331", name: "Sodium Citrates", risk: "Low", description: "Buffering agent" }
    ],
    alternatives: []
  },
  {
    id: "bournvita-pro-health",
    barcode: "8901233023007",
    name: "Cadbury Bournvita Pro-Health Drink",
    brand: "Mondelez India Foods",
    category: "Health Drink Mixes",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
    score: 40,
    rating: "Red",
    verdict: "Unhealthy - Over 50% Added Sugar & Maltodextrin",
    servingSize: "20g powder (1 glass milk)",
    caloriesPerServing: 78,
    macros: { protein: "1.4g", carbs: "17.0g", fat: "0.4g", saturatedFat: "0.2g", sugar: "13.0g", sodium: "40mg", fiber: "0.6g" },
    productInfo: {
      productName: "Cadbury Bournvita Chocolate Health Drink Powder",
      brand: "Mondelez India Foods Pvt. Ltd.",
      category: "Health Drink Mixes",
      netQuantity: "500 g",
      mrp: "₹235.00 (Incl. of all taxes)",
      manufacturer: "Mondelez India Foods Pvt. Ltd., Baddi, HP - 173205 • FSSAI Lic No: 10014022002711",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 12 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-22-7080 | Email: suggestions@mdlz.com"
    },
    pros: ["Fortified with Vitamin D, Calcium & Iron", "Popular malt chocolate taste"],
    cons: ["Over 50% of the powder weight is added refined sugar + maltodextrin (13g sugar in 20g powder)", "Causes blood sugar spikes in children"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "High Risk", note: "Contains 13g added sugar per 20g serving." },
      hypertension: { suitable: true, severity: "Safe", note: "Low sodium." },
      obesity: { suitable: false, severity: "Caution", note: "Concentrated sugar powder." },
      thyroid: { suitable: false, severity: "Avoid", note: "High glycemic load." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "High sugar with low protein." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High added sugar for daily children drinks." }
    },
    additives: [
      { code: "E500(ii)", name: "Sodium Bicarbonate", risk: "Low", description: "Raising agent" },
      { code: "E150c", name: "Caramel I - Plain", risk: "Low", description: "Natural malt color" }
    ],
    alternatives: []
  },
  {
    id: "haldirams-nagpur-bhujia",
    barcode: "8904063200056",
    name: "Haldiram's Nagpur Bhujia Sev",
    brand: "Haldiram Snacks Pvt. Ltd.",
    category: "Namkeen & Traditional Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80",
    score: 28,
    rating: "Red",
    verdict: "Unhealthy - Deep Fried in Palmolein Oil, Extremely High Sodium",
    servingSize: "40g",
    caloriesPerServing: 235,
    macros: { protein: "4.8g", carbs: "16.0g", fat: "17.0g", saturatedFat: "7.5g", sugar: "0.5g", sodium: "640mg", fiber: "2.0g" },
    productInfo: {
      productName: "Haldiram's Nagpur Crisp Spicy Bhujia Sev",
      brand: "Haldiram Snacks Pvt. Ltd.",
      category: "Namkeen & Traditional Snacks",
      netQuantity: "200 g",
      mrp: "₹55.00 (Incl. of all taxes)",
      manufacturer: "Haldiram Snacks Pvt. Ltd., Noida, UP - 201307 • FSSAI Lic No: 10012051000099",
      countryOfOrigin: "India 🇮🇳",
      dateInfo: "Best Before 6 months from MFD",
      consumerCare: "Toll-Free Helpline: 1800-102-5555 | Email: customercare@haldiram.com"
    },
    pros: ["Traditional Indian moth pulse & besan flavor", "Crispy spicy crunch"],
    cons: ["Deep fried in palmolein oil (17g fat per 40g serve)", "High sodium concentration (640mg sodium per serving - over 28% daily limit)"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Caution", note: "High saturated fat slows digestive motility." },
      hypertension: { suitable: false, severity: "High Risk", note: "640mg sodium per 40g serving; strictly limit for high BP." },
      obesity: { suitable: false, severity: "Avoid", note: "Calorically dense fried snack." },
      thyroid: { suitable: false, severity: "Caution", note: "Deep fried palmolein oil." },
      gymFitness: { suitable: false, severity: "Poor Choice", note: "High fat to protein ratio." },
      kidsParenting: { suitable: false, severity: "Restrict", note: "High sodium concentration." }
    },
    additives: [
      { code: "E330", name: "Citric Acid", risk: "Low", description: "Acidity regulator" }
    ],
    alternatives: []
  },
  {
    id: "redbull-energy-drink",
    barcode: "9002490100070",
    name: "Red Bull Energy Drink (250ml)",
    brand: "Red Bull GmbH",
    category: "Energy Drinks",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&auto=format&fit=crop&q=80",
    score: 22,
    rating: "Red",
    verdict: "Unhealthy - High Synthetic Caffeine & Added Sugar",
    servingSize: "250ml can",
    caloriesPerServing: 115,
    macros: { protein: "0g", carbs: "27.0g", fat: "0g", saturatedFat: "0g", sugar: "27.0g", sodium: "105mg", fiber: "0g" },
    productInfo: {
      productName: "Red Bull Energy Drink",
      brand: "Red Bull GmbH, Austria",
      category: "Energy Drinks",
      netQuantity: "250 ml",
      mrp: "₹125.00 (Incl. of all taxes)",
      manufacturer: "Red Bull GmbH, Fuschl am See, Austria • FSSAI Lic No: 10012022000258",
      countryOfOrigin: "Austria 🇦🇹",
      dateInfo: "Best Before 24 months from MFD",
      consumerCare: "Helpline: 1800-22-7332 | Email: info@in.redbull.com"
    },
    pros: ["Contains 80mg caffeine & Taurine for temporary alertness"],
    cons: ["27g added refined sugar per 250ml can", "High caffeine (80mg per can) can trigger heart palpitations and anxiety", "Not recommended for children, pregnant women or caffeine-sensitive people"],
    diseaseSuitability: {
      diabetes: { suitable: false, severity: "Critical Danger", note: "27g fast-absorbing liquid sugar." },
      hypertension: { suitable: false, severity: "High Risk", note: "Caffeine + Taurine spike blood pressure & heart rate." },
      obesity: { suitable: false, severity: "Avoid", note: "Empty liquid sugar calories." },
      thyroid: { suitable: false, severity: "Avoid", note: "Caffeine triggers adrenal cortisol response." },
      gymFitness: { suitable: false, severity: "Caution", note: "High sugar pre-workout." },
      kidsParenting: { suitable: false, severity: "STRICTLY PROHIBITED", note: "High caffeine content is dangerous for children." }
    },
    additives: [
      { code: "E330", name: "Citric Acid", risk: "Low", description: "Acidity regulator" },
      { code: "E150a", name: "Caramel I", risk: "Low", description: "Natural color" }
    ],
    alternatives: []
  }
];
