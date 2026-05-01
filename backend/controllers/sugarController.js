import SugarEntry from '../models/SugarEntry.js';
import Scan from '../models/Scan.js';
import { fetchSugarDataByBarcode, processManualEntry, calculateSugarStats } from '../services/sugarService.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Scan a barcode and get sugar data (uses Open Food Facts)
 * @route   POST /api/v1/sugar/scan
 * @access  Private
 */
export const scanSugar = asyncHandler(async (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    throw new AppError('Barcode is required', 400);
  }

  // Fetch from Open Food Facts (or fallback)
  const sugarData = await fetchSugarDataByBarcode(barcode);

  // Save to user's sugar entries
  const entry = await SugarEntry.create({
    user: req.user.id,
    ...sugarData,
  });

  // Also log as a scan
  await Scan.create({
    user: req.user.id,
    code: barcode,
    type: 'barcode',
    module: 'sugar',
    productName: sugarData.name,
    status: sugarData.risk === 'HIGH' ? 'HAZARDOUS' : sugarData.risk === 'WATCH' ? 'MODERATE RISK' : 'CLINICALLY SAFE',
    statusColor: sugarData.riskColor,
    statusBg: sugarData.riskBg,
    icon: sugarData.emoji,
    result: sugarData,
  });

  res.status(200).json({
    success: true,
    data: {
      ...sugarData,
      id: entry._id,
      time: 'Just now',
    },
  });
});

/**
 * @desc    Add a manual sugar entry (matches frontend Formik form)
 * @route   POST /api/v1/sugar/manual
 * @access  Private
 */
export const addManualEntry = asyncHandler(async (req, res) => {
  const { name, sub, category, sugar, emoji } = req.body;

  if (!name || sugar === undefined || sugar === '') {
    throw new AppError('Item name and sugar amount are required', 400);
  }

  const entryData = processManualEntry({ name, sub, category, sugar, emoji });

  const entry = await SugarEntry.create({
    user: req.user.id,
    ...entryData,
  });

  res.status(201).json({
    success: true,
    data: {
      id: entry._id,
      ...entryData,
      time: 'Just now',
    },
  });
});

/**
 * @desc    Get user's sugar scan history
 * @route   GET /api/v1/sugar/history
 * @access  Private
 */
export const getSugarHistory = asyncHandler(async (req, res) => {
  const { limit = 50 } = req.query;

  const entries = await SugarEntry.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

  // Format entries for frontend
  const formattedEntries = entries.map((e) => ({
    id: e._id,
    name: e.name,
    sub: e.sub,
    category: e.category,
    sugar: e.sugar,
    risk: e.risk,
    riskColor: e.riskColor,
    riskBg: e.riskBg,
    time: formatTime(e.createdAt),
    emoji: e.emoji,
  }));

  res.status(200).json({
    success: true,
    data: formattedEntries,
  });
});

/**
 * @desc    Get sugar stats (weekly intake, daily average, chart data)
 * @route   GET /api/v1/sugar/stats
 * @access  Private
 */
export const getSugarStats = asyncHandler(async (req, res) => {
  const entries = await SugarEntry.find({ user: req.user.id }).sort({ createdAt: -1 });

  const stats = calculateSugarStats(entries);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

// --- Helpers ---

const formatTime = (date) => {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
