/**
 * NutriScan Health - Indian Healthy Alternatives & Quick-Commerce Price Database
 * Maps packaged food categories (Noodles, Sodas, Biscuits, Chips, Butter, Chocolates, Juices)
 * to healthy FSSAI approved substitutes with INR prices and quick-commerce buy links (Blinkit, Instamart, Zepto, BigBasket).
 */

export const INDIAN_HEALTHY_ALTERNATIVES_DB = {
  noodles: [
    {
      name: "Slurrp Farm Foxtail & Ragi Millet Noodles",
      brand: "Slurrp Farm",
      score: 84,
      rating: "Green",
      price: "₹35",
      priceNum: 35,
      unit: "192g pack",
      reason: "Made of 100% Foxtail & Ragi Millets, air-dried, zero palm oil, 60% less sodium than fried instant noodles.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=Slurrp%20Farm%20Millet%20Noodles",
        instamart: "https://www.swiggy.com/instamart/search?query=Slurrp%20Farm%20Millet%20Noodles",
        zepto: "https://www.zepto.co.in/search?q=Slurrp%20Farm%20Millet%20Noodles",
        bigbasket: "https://www.bigbasket.com/ps/?q=Slurrp%20Farm%20Millet%20Noodles"
      }
    },
    {
      name: "WickedGud 100% Atta Noodles (Air-Dried)",
      brand: "WickedGud",
      score: 81,
      rating: "Green",
      price: "₹45",
      priceNum: 45,
      unit: "220g pack",
      reason: "100% Whole Wheat Atta & Oats, zero maida, zero MSG, air-dried not deep fried.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=WickedGud%20Atta%20Noodles",
        instamart: "https://www.swiggy.com/instamart/search?query=WickedGud%20Atta%20Noodles",
        zepto: "https://www.zepto.co.in/search?q=WickedGud%20Atta%20Noodles",
        bigbasket: "https://www.bigbasket.com/ps/?q=WickedGud%20Atta%20Noodles"
      }
    }
  ],
  beverages: [
    {
      name: "Raw Pressery 100% Tender Coconut Water",
      brand: "Raw Pressery",
      score: 95,
      rating: "Green",
      price: "₹60",
      priceNum: 60,
      unit: "200ml bottle",
      reason: "100% natural coconut water, zero added sugar, rich in potassium and hydration electrolytes.",
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=Raw%20Pressery%20Coconut%20Water",
        instamart: "https://www.swiggy.com/instamart/search?query=Raw%20Pressery%20Coconut%20Water",
        zepto: "https://www.zepto.co.in/search?q=Raw%20Pressery%20Coconut%20Water",
        bigbasket: "https://www.bigbasket.com/ps/?q=Raw%20Pressery%20Coconut%20Water"
      }
    },
    {
      name: "Paper Boat Sparkling Water (Lime & Mint)",
      brand: "Paper Boat",
      score: 88,
      rating: "Green",
      price: "₹40",
      priceNum: 40,
      unit: "250ml can",
      reason: "Zero sugar carbonated refresher sweetened naturally with Stevia leaf, zero artificial dyes.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=Paper%20Boat%20Sparkling%20Water",
        instamart: "https://www.swiggy.com/instamart/search?query=Paper%20Boat%20Sparkling%20Water",
        zepto: "https://www.zepto.co.in/search?q=Paper%20Boat%20Sparkling%20Water",
        bigbasket: "https://www.bigbasket.com/ps/?q=Paper%20Boat%20Sparkling%20Water"
      }
    }
  ],
  biscuits: [
    {
      name: "The Whole Truth Dates & Dark Chocolate Bar",
      brand: "The Whole Truth",
      score: 89,
      rating: "Green",
      price: "₹60",
      priceNum: 60,
      unit: "50g bar",
      reason: "Made with 100% dates, raw cocoa & whey protein. Zero added refined sugar, zero palm oil.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=The%20Whole%20Truth%20Bar",
        instamart: "https://www.swiggy.com/instamart/search?query=The%20Whole%20Truth%20Bar",
        zepto: "https://www.zepto.co.in/search?q=The%20Whole%20Truth%20Bar",
        bigbasket: "https://www.bigbasket.com/ps/?q=The%20Whole%20Truth%20Bar"
      }
    },
    {
      name: "Slurrp Farm Oats & Honey Millet Cookies",
      brand: "Slurrp Farm",
      score: 82,
      rating: "Green",
      price: "₹40",
      priceNum: 40,
      unit: "100g pack",
      reason: "Baked with real butter, whole grain oats & unrefined jaggery, zero maida, zero palm oil.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=Slurrp%20Farm%20Cookies",
        instamart: "https://www.swiggy.com/instamart/search?query=Slurrp%20Farm%20Cookies",
        zepto: "https://www.zepto.co.in/search?q=Slurrp%20Farm%20Cookies",
        bigbasket: "https://www.bigbasket.com/ps/?q=Slurrp%20Farm%20Cookies"
      }
    }
  ],
  chips: [
    {
      name: "TagZ Popped Potato Chips (Nacho Cheese)",
      brand: "TagZ Foods",
      score: 78,
      rating: "Green",
      price: "₹35",
      priceNum: 35,
      unit: "44g bag",
      reason: "Popped not fried, 50% less fat, zero palm oil, zero synthetic dyes or E621 MSG.",
      image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=TagZ%20Popped%20Chips",
        instamart: "https://www.swiggy.com/instamart/search?query=TagZ%20Popped%20Chips",
        zepto: "https://www.zepto.co.in/search?q=TagZ%20Popped%20Chips",
        bigbasket: "https://www.bigbasket.com/ps/?q=TagZ%20Popped%20Chips"
      }
    },
    {
      name: "Farmley Himalayan Salted Roasted Makhana",
      brand: "Farmley",
      score: 91,
      rating: "Green",
      price: "₹55",
      priceNum: 55,
      unit: "50g pack",
      reason: "100% slow-roasted foxnuts in olive oil with pink salt. High fiber, zero artificial preservatives.",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=Farmley%20Makhana",
        instamart: "https://www.swiggy.com/instamart/search?query=Farmley%20Makhana",
        zepto: "https://www.zepto.co.in/search?q=Farmley%20Makhana",
        bigbasket: "https://www.bigbasket.com/ps/?q=Farmley%20Makhana"
      }
    }
  ],
  dairy: [
    {
      name: "Amul Traditional Unsalted White Butter (Makhan)",
      brand: "Amul",
      score: 75,
      rating: "Green",
      price: "₹52",
      priceNum: 52,
      unit: "100g pack",
      reason: "Zero added salt, zero sodium retention risk, pure traditional cultured cream fat.",
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80",
      platforms: {
        blinkit: "https://blinkit.com/s/?q=Amul%20White%20Butter",
        instamart: "https://www.swiggy.com/instamart/search?query=Amul%20White%20Butter",
        zepto: "https://www.zepto.co.in/search?q=Amul%20White%20Butter",
        bigbasket: "https://www.bigbasket.com/ps/?q=Amul%20White%20Butter"
      }
    }
  ]
};

/**
 * Returns quick-commerce search links for any Indian product name
 */
export function getProductQuickCommerceLinks(productName) {
  const q = encodeURIComponent(productName || "");
  return {
    blinkit: `https://blinkit.com/s/?q=${q}`,
    instamart: `https://www.swiggy.com/instamart/search?query=${q}`,
    zepto: `https://www.zepto.co.in/search?q=${q}`,
    bigbasket: `https://www.bigbasket.com/ps/?q=${q}`
  };
}

/**
 * Helper to fetch category-matched healthy alternatives for any product
 */
export function getHealthyAlternativesForProduct(categoryName, productName) {
  const nameLower = (productName || "").toLowerCase();
  const catLower = (categoryName || "").toLowerCase();

  if (nameLower.includes("noodle") || nameLower.includes("maggi") || catLower.includes("noodle")) {
    return INDIAN_HEALTHY_ALTERNATIVES_DB.noodles;
  }
  if (nameLower.includes("cola") || nameLower.includes("coke") || nameLower.includes("drink") || nameLower.includes("soda") || catLower.includes("beverage")) {
    return INDIAN_HEALTHY_ALTERNATIVES_DB.beverages;
  }
  if (nameLower.includes("biscuit") || nameLower.includes("cookie") || nameLower.includes("dark fantasy") || nameLower.includes("parle") || catLower.includes("biscuit")) {
    return INDIAN_HEALTHY_ALTERNATIVES_DB.biscuits;
  }
  if (nameLower.includes("chip") || nameLower.includes("doritos") || nameLower.includes("kurkure") || nameLower.includes("namkeen") || catLower.includes("snack")) {
    return INDIAN_HEALTHY_ALTERNATIVES_DB.chips;
  }
  if (nameLower.includes("butter") || nameLower.includes("ghee") || catLower.includes("dairy")) {
    return INDIAN_HEALTHY_ALTERNATIVES_DB.dairy;
  }

  // Fallback default healthy items
  return [
    INDIAN_HEALTHY_ALTERNATIVES_DB.noodles[0],
    INDIAN_HEALTHY_ALTERNATIVES_DB.chips[1]
  ];
}
