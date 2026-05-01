import AlcoholProduct from '../models/AlcoholProduct.js';

/**
 * Alcohol Service — Verifies product authenticity using MongoDB dataset.
 * Detects duplicate scans and potential label cloning.
 */

/**
 * Verify an alcohol product by its security code.
 * @param {string} code - Product security code
 * @param {string} userLocation - Approximate scan location
 * @returns {object} Verification result matching frontend display
 */
export const verifyAlcoholProduct = async (code, userLocation = 'Unknown') => {
  const normalizedCode = code.trim().toUpperCase();
  const product = await AlcoholProduct.findOne({ productCode: normalizedCode });

  if (!product) {
    return {
      found: false,
      status: 'unknown',
      message: 'Product code not found in our verification database.',
      product: null,
      isDuplicate: false,
      custodyHistory: [],
    };
  }

  // Record this scan
  product.scanCount += 1;
  product.scanLocations.push({
    location: userLocation,
    timestamp: new Date(),
    source: 'Mobile App User',
  });

  // Duplicate detection: multiple scans across different locations within 48h
  const isDuplicate = detectDuplicate(product);

  // Update product status if duplicate detected
  if (isDuplicate && product.status === 'genuine') {
    product.status = 'suspicious';
  }

  await product.save();

  // Build status styles matching frontend
  const statusStyles = getStatusStyles(product.status, isDuplicate, product.scanCount);

  return {
    found: true,
    status: product.status,
    ...statusStyles,
    isDuplicate,
    scanCount: product.scanCount,
    product: {
      productCode: product.productCode,
      productName: product.productName,
      brand: product.brand,
      batchNumber: product.batchNumber,
      productionDate: product.productionDate,
      distilleryLocation: product.distilleryLocation,
      intendedMarket: product.intendedMarket,
      volume: product.volume,
      abv: product.abv,
      description: product.description,
    },
    custodyHistory: product.custodyHistory,
  };
};

/**
 * Get a product by code without recording a scan (for detail views).
 */
export const getAlcoholProduct = async (code) => {
  const product = await AlcoholProduct.findOne({ productCode: code.toUpperCase() });
  return product;
};

// --- Helpers ---

/**
 * Detect duplicate scans: >1 scan from different locations within 48 hours.
 */
const detectDuplicate = (product) => {
  if (product.scanCount <= 1) return false;

  const now = new Date();
  const threshold = 48 * 60 * 60 * 1000; // 48 hours in ms

  const recentScans = product.scanLocations.filter(
    (scan) => now - new Date(scan.timestamp) < threshold
  );

  // Check unique locations in recent scans
  const uniqueLocations = new Set(recentScans.map((s) => s.location));
  return recentScans.length > 1 && uniqueLocations.size > 1;
};

/**
 * Get visual status styles matching frontend AlcoholVerificationPage.
 */
const getStatusStyles = (status, isDuplicate, scanCount) => {
  if (isDuplicate || status === 'suspicious') {
    return {
      statusLabel: 'Suspicious',
      statusMessage: 'Multiple scans detected.',
      warningTitle: 'Duplicate Scan Warning',
      warningDescription: `This genuine code has been scanned ${scanCount} times across multiple geographical locations within 48 hours. High probability of label cloning.`,
      codeMatchLabel: 'Code Matches Product',
    };
  }

  if (status === 'counterfeit') {
    return {
      statusLabel: 'Counterfeit',
      statusMessage: 'This product has been flagged as counterfeit.',
      warningTitle: 'Counterfeit Alert',
      warningDescription: 'This product code has been identified as fraudulent.',
      codeMatchLabel: 'Code Mismatch',
    };
  }

  return {
    statusLabel: 'Genuine',
    statusMessage: 'Product verified as authentic.',
    warningTitle: null,
    warningDescription: null,
    codeMatchLabel: 'Code Matches Product',
  };
};
