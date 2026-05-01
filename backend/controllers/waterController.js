import { verifyWaterBatch, getWaterBatch } from '../services/waterService.js';
import Scan from '../models/Scan.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Verify a water batch by batch ID
 * @route   POST /api/v1/water/verify
 * @access  Private
 */
export const verifyWater = asyncHandler(async (req, res) => {
  const { batchId } = req.body;

  if (!batchId) {
    throw new AppError('Batch ID is required', 400);
  }

  const result = await verifyWaterBatch(batchId);

  // Log scan
  if (result.found) {
    await Scan.create({
      user: req.user.id,
      code: batchId.trim(),
      type: 'manual',
      module: 'water',
      productName: `Water Batch ${result.batchId}`,
      status: result.overallStatus === 'Clinically Safe' ? 'CLINICALLY SAFE' : 'MODERATE RISK',
      statusColor: result.overallStatus === 'Clinically Safe' ? '#16a34a' : '#b45309',
      statusBg: result.overallStatus === 'Clinically Safe' ? '#f0fdf4' : '#fef9c3',
      icon: '💧',
      result,
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get water batch details
 * @route   GET /api/v1/water/batch/:id
 * @access  Private
 */
export const getBatch = asyncHandler(async (req, res) => {
  const batch = await getWaterBatch(req.params.id);

  if (!batch) {
    throw new AppError('Batch not found', 404);
  }

  res.status(200).json({
    success: true,
    data: batch,
  });
});

/**
 * @desc    Get user's water verification history
 * @route   GET /api/v1/water/history
 * @access  Private
 */
export const getWaterHistory = asyncHandler(async (req, res) => {
  const scans = await Scan.find({ user: req.user.id, module: 'water' })
    .sort({ createdAt: -1 })
    .limit(20);

  res.status(200).json({
    success: true,
    data: scans,
  });
});
