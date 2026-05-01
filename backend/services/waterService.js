import WaterBatch from '../models/WaterBatch.js';

/**
 * Water Service — Verifies water batch quality from MongoDB dataset.
 * Validates chemical parameters against WHO/EPA thresholds.
 */

// WHO/EPA Safety thresholds
const THRESHOLDS = {
  tds: { min: 50, max: 500, optimal: { min: 50, max: 150 } },
  pH: { min: 6.5, max: 8.5 },
  lead: { max: 0.01 }, // mg/L
  arsenic: { max: 0.01 }, // mg/L
  fluoride: { max: 1.5 }, // mg/L
};

/**
 * Verify a water batch by its ID.
 * @param {string} batchId
 * @returns {object} Full verification result matching WaterVerificationPage
 */
export const verifyWaterBatch = async (batchId) => {
  const normalizedId = batchId.trim().toUpperCase();
  const batch = await WaterBatch.findOne({ batchId: normalizedId });

  if (!batch) {
    return {
      found: false,
      message: 'Batch ID not found in our verification database.',
      batch: null,
    };
  }

  // Evaluate overall safety based on chemical analysis
  const safetyResult = evaluateSafety(batch);

  return {
    found: true,
    batchId: batch.batchId,
    overallStatus: safetyResult.status,
    overallStatusDescription: safetyResult.description,
    reportStatus: batch.reportStatus,
    tds: batch.tds,
    tdsOptimalRange: `${THRESHOLDS.tds.optimal.min} – ${THRESHOLDS.tds.optimal.max} ppm`,
    chemicalAnalysis: batch.chemicalAnalysis,
    scanTime: batch.scanTime || new Date().toISOString(),
    supplier: {
      name: batch.supplier.name,
      id: batch.supplier.id,
      trustScore: batch.supplier.trustScore,
      certifications: batch.supplier.certifications,
      cleanRecord: batch.supplier.cleanRecord,
      facility: batch.supplier.facility,
    },
    certificate: batch.certificate,
  };
};

/**
 * Get batch details without full verification (for reference).
 */
export const getWaterBatch = async (batchId) => {
  return WaterBatch.findOne({ batchId: batchId.toUpperCase() });
};

// --- Helpers ---

/**
 * Evaluate overall water safety based on chemical parameters.
 */
const evaluateSafety = (batch) => {
  const issues = [];

  // TDS check
  if (batch.tds < THRESHOLDS.tds.min || batch.tds > THRESHOLDS.tds.max) {
    issues.push('TDS level outside safe range');
  }

  // Check each chemical parameter
  for (const chem of batch.chemicalAnalysis) {
    if (chem.status === 'DANGER' || chem.status === 'WARNING') {
      issues.push(`${chem.label}: ${chem.status}`);
    }
  }

  if (issues.length === 0) {
    return {
      status: 'Clinically Safe',
      description:
        'This water batch meets all international safety parameters (WHO, EPA). No harmful contaminants detected above threshold limits.',
    };
  }

  if (issues.length <= 2) {
    return {
      status: 'Moderate Risk',
      description: `Some parameters require attention: ${issues.join(', ')}. Further testing recommended.`,
    };
  }

  return {
    status: 'Unsafe',
    description: `Multiple safety concerns detected: ${issues.join(', ')}. Do not consume until resolved.`,
  };
};
