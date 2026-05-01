import Report from '../models/Report.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Create a new report (with optional file upload)
 * @route   POST /api/v1/reports
 * @access  Private
 */
export const createReport = asyncHandler(async (req, res) => {
  const { category, productName, description } = req.body;

  if (!category || !productName || !description) {
    throw new AppError('Category, product name, and description are required', 400);
  }

  // Process uploaded files
  const evidence = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      evidence.push({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: `/uploads/${file.filename}`,
      });
    });
  }

  const report = await Report.create({
    user: req.user.id,
    category,
    productName,
    description,
    evidence,
  });

  res.status(201).json({
    success: true,
    data: report,
    message: 'Report submitted successfully. Our team will review it shortly.',
  });
});

/**
 * @desc    Get user's reports
 * @route   GET /api/v1/reports
 * @access  Private
 */
export const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    success: true,
    data: reports,
  });
});

/**
 * @desc    Get single report
 * @route   GET /api/v1/reports/:id
 * @access  Private
 */
export const getReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, user: req.user.id });

  if (!report) {
    throw new AppError('Report not found', 404);
  }

  res.status(200).json({
    success: true,
    data: report,
  });
});
