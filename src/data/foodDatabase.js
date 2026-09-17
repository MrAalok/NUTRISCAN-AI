export const INITIAL_FOOD_DATABASE = [
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
  }
];
