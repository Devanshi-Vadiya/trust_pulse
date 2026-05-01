import Scan from '../models/Scan.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Create a new scan (core engine — routes to appropriate module)
 * @route   POST /api/v1/scan
 * @access  Private
 */
export const createScan = asyncHandler(async (req, res) => {
  const { code, type = 'manual', module = 'general' } = req.body;

  if (!code) {
    throw new AppError('Scan code is required', 400);
  }

  // Determine module from code pattern if not specified
  const detectedModule = module !== 'general' ? module : detectModule(code);

  const scan = await Scan.create({
    user: req.user.id,
    code: code.trim(),
    type,
    module: detectedModule,
    productName: 'Scanning...',
    status: 'NOT FOUND',
  });

  res.status(201).json({
    success: true,
    data: {
      scan,
      detectedModule,
      redirectTo: getModuleRoute(detectedModule),
    },
  });
});

/**
 * @desc    Get user's scan history
 * @route   GET /api/v1/scan/history
 * @access  Private
 */
export const getScanHistory = asyncHandler(async (req, res) => {
  const { limit = 20, page = 1 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const scans = await Scan.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Scan.countDocuments({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: {
      scans,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    },
  });
});

/**
 * @desc    Get single scan by ID
 * @route   GET /api/v1/scan/:id
 * @access  Private
 */
export const getScan = asyncHandler(async (req, res) => {
  const scan = await Scan.findOne({ _id: req.params.id, user: req.user.id });

  if (!scan) {
    throw new AppError('Scan not found', 404);
  }

  res.status(200).json({
    success: true,
    data: scan,
  });
});

/**
 * @desc    Get scan analytics / dashboard stats
 * @route   GET /api/v1/scan/stats
 * @access  Private
 */
export const getScanStats = asyncHandler(async (req, res) => {
  const totalScans = await Scan.countDocuments({ user: req.user.id });

  const moduleCounts = await Scan.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: '$module', count: { $sum: 1 } } },
  ]);

  const statusCounts = await Scan.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalScans,
      byModule: Object.fromEntries(moduleCounts.map((m) => [m._id, m.count])),
      byStatus: Object.fromEntries(statusCounts.map((s) => [s._id, s.count])),
    },
  });
});

// --- Helpers ---

/**
 * Detect module from code pattern.
 */
const detectModule = (code) => {
  const c = code.trim().toUpperCase();

  // Alcohol codes: format AX-XXXX-XX or similar with dashes
  if (/^[A-Z]{2}-\d{4}-[A-Z0-9]{2,}$/i.test(c)) return 'alcohol';

  // Water batch: format W-XXXX-XXX
  if (/^W-\d{4}-\d{2,3}[A-Z]?$/i.test(c)) return 'water';

  // Numeric barcodes: 8-14 digit → sugar/food
  if (/^\d{8,14}$/.test(c)) return 'sugar';

  return 'general';
};

/**
 * Get frontend route for a module.
 */
const getModuleRoute = (module) => {
  const routes = {
    sugar: '/sugar-tracker',
    alcohol: '/alcohol-verification',
    water: '/water-verification',
    general: '/product',
  };
  return routes[module] || '/product';
};
