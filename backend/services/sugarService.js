import axios from 'axios';
import env from '../config/env.js';

/**
 * Sugar Service — integrates with Open Food Facts API.
 * Falls back to mock data if external API is unavailable.
 */

// Risk calculation helpers
const calculateTeaspoons = (grams) => +(grams / 4.2).toFixed(1);
const calculateDailyPercentage = (grams) => Math.round((grams / 50) * 100); // AHA daily limit = 50g

const getRiskLevel = (grams) => {
  if (grams > 15) return { risk: 'HIGH', riskColor: '#dc2626', riskBg: '#fee2e2' };
  if (grams >= 5) return { risk: 'WATCH', riskColor: '#b45309', riskBg: '#fef9c3' };
  return { risk: 'SAFE', riskColor: '#1d4ed8', riskBg: '#eff6ff' };
};

/**
 * Fetch product data from Open Food Facts by barcode.
 * @param {string} barcode
 * @returns {object} Structured sugar data
 */
export const fetchSugarDataByBarcode = async (barcode) => {
  try {
    const url = `${env.OPENFOODFACTS_BASE_URL}/product/${barcode}.json`;
    const response = await axios.get(url, { timeout: 8000 });

    if (response.data.status === 0 || !response.data.product) {
      // Product not found in Open Food Facts — use fallback
      return getFallbackData(barcode);
    }

    const product = response.data.product;
    const nutriments = product.nutriments || {};

    // Extract sugar content (per 100g or per serving)
    let sugarGrams = nutriments.sugars_serving || nutriments.sugars_100g || 0;
    sugarGrams = parseFloat(sugarGrams) || 0;

    const servingSize = product.serving_size || product.quantity || 'N/A';
    const productName = product.product_name || product.product_name_en || 'Unknown Product';
    const brand = product.brands || 'Unknown Brand';
    const ingredients = product.ingredients_text || product.ingredients_text_en || '';
    const category = mapCategory(product.categories_tags || []);

    const riskInfo = getRiskLevel(sugarGrams);

    return {
      barcode,
      name: productName,
      sub: servingSize,
      brand,
      category,
      sugar: sugarGrams,
      teaspoons: calculateTeaspoons(sugarGrams),
      dailyPercentage: calculateDailyPercentage(sugarGrams),
      ...riskInfo,
      emoji: getCategoryEmoji(category),
      ingredients,
      source: 'openfoodfacts',
    };
  } catch (error) {
    console.warn(`⚠️  Open Food Facts API failed for barcode ${barcode}:`, error.message);
    return getFallbackData(barcode);
  }
};

/**
 * Process manual sugar entry (from frontend Formik form).
 */
export const processManualEntry = (data) => {
  const sugarGrams = parseFloat(data.sugar) || 0;
  const riskInfo = getRiskLevel(sugarGrams);

  return {
    barcode: '',
    name: data.name,
    sub: data.sub || 'Manual Entry',
    brand: '',
    category: data.category || 'Other',
    sugar: sugarGrams,
    teaspoons: calculateTeaspoons(sugarGrams),
    dailyPercentage: calculateDailyPercentage(sugarGrams),
    ...riskInfo,
    emoji: data.emoji || '🍽️',
    ingredients: '',
    source: 'manual',
  };
};

/**
 * Calculate weekly stats for a user's sugar entries.
 */
export const calculateSugarStats = (entries) => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weeklyEntries = entries.filter((e) => new Date(e.createdAt) >= weekAgo);
  const todayEntries = entries.filter((e) => {
    const d = new Date(e.createdAt);
    return d.toDateString() === now.toDateString();
  });

  const totalWeeklyIntake = weeklyEntries.reduce((sum, e) => sum + e.sugar, 0);
  const totalDailyIntake = todayEntries.reduce((sum, e) => sum + e.sugar, 0);
  const dailyAverage = weeklyEntries.length > 0 ? +(totalWeeklyIntake / 7).toFixed(1) : 0;

  // Build 7-day chart data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sugarData = days.map((day, i) => {
    const targetDate = new Date(weekAgo.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
    const dayEntries = weeklyEntries.filter(
      (e) => new Date(e.createdAt).toDateString() === targetDate.toDateString()
    );
    return {
      day,
      intake: dayEntries.reduce((sum, e) => sum + e.sugar, 0),
    };
  });

  return {
    dailyTotal: totalDailyIntake,
    dailyLimit: 50,
    weeklyTotal: totalWeeklyIntake,
    dailyAverage,
    itemsTracked: entries.length,
    sugarData,
    recentScans: todayEntries,
  };
};

// --- Helpers ---

const mapCategory = (tags) => {
  if (!tags || tags.length === 0) return 'Other';
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('beverage') || tagStr.includes('drink')) return 'Beverages';
  if (tagStr.includes('dairy') || tagStr.includes('milk')) return 'Dairy Alt';
  if (tagStr.includes('snack') || tagStr.includes('chip') || tagStr.includes('bar')) return 'Snacks';
  if (tagStr.includes('pastry') || tagStr.includes('cake') || tagStr.includes('bread')) return 'Pastry';
  if (tagStr.includes('meal') || tagStr.includes('soup') || tagStr.includes('sauce')) return 'Meals';
  return 'Other';
};

const getCategoryEmoji = (category) => {
  const emojiMap = {
    Beverages: '🥤',
    'Dairy Alt': '🥛',
    Snacks: '🍫',
    Pastry: '🥐',
    Meals: '🍽️',
    Other: '📦',
  };
  return emojiMap[category] || '📦';
};

/**
 * Fallback mock data when Open Food Facts is unavailable.
 */
const getFallbackData = (barcode) => {
  // Realistic fallback products
  const fallbacks = [
    { name: 'Energy Drink 500ml', sugar: 28, category: 'Beverages', emoji: '🥤', sub: '500ml can' },
    { name: 'Organic Yogurt Cup', sugar: 12, category: 'Dairy Alt', emoji: '🥛', sub: '150g cup' },
    { name: 'Granola Bar', sugar: 8, category: 'Snacks', emoji: '🍫', sub: '1 bar (35g)' },
    { name: 'Fruit Juice Box', sugar: 22, category: 'Beverages', emoji: '🧃', sub: '200ml' },
  ];

  const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  const riskInfo = getRiskLevel(fallback.sugar);

  return {
    barcode,
    name: fallback.name,
    sub: fallback.sub,
    brand: 'Generic Brand',
    category: fallback.category,
    sugar: fallback.sugar,
    teaspoons: calculateTeaspoons(fallback.sugar),
    dailyPercentage: calculateDailyPercentage(fallback.sugar),
    ...riskInfo,
    emoji: fallback.emoji,
    ingredients: 'Product data from fallback source',
    source: 'mock',
  };
};
