import { verifyAlcoholProduct, getAlcoholProduct } from '../services/alcoholService.js';
import Scan from '../models/Scan.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Verify an alcohol product by security code
 * @route   POST /api/v1/alcohol/verify
 * @access  Private
 */
export const verifyAlcohol = asyncHandler(async (req, res) => {
  const { code, location = 'Unknown' } = req.body;

  if (!code) {
    throw new AppError('Security code is required', 400);
  }

  const result = await verifyAlcoholProduct(code, location);

  // Log scan
  if (result.found) {
    await Scan.create({
      user: req.user.id,
      code: code.trim(),
      type: 'manual',
      module: 'alcohol',
      productName: result.product.productName,
      status: result.isDuplicate ? 'SUSPICIOUS' : 'VERIFIED',
      statusColor: result.isDuplicate ? '#dc2626' : '#16a34a',
      statusBg: result.isDuplicate ? '#fee2e2' : '#f0fdf4',
      icon: '🥃',
      result,
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get alcohol product details by code
 * @route   GET /api/v1/alcohol/product/:code
 * @access  Private
 */
export const getProduct = asyncHandler(async (req, res) => {
  const product = await getAlcoholProduct(req.params.code);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Get user's alcohol verification history
 * @route   GET /api/v1/alcohol/history
 * @access  Private
 */
export const getAlcoholHistory = asyncHandler(async (req, res) => {
  const scans = await Scan.find({ user: req.user.id, module: 'alcohol' })
    .sort({ createdAt: -1 })
    .limit(20);

  res.status(200).json({
    success: true,
    data: scans,
  });
});
