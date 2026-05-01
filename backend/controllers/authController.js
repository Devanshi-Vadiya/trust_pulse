import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req, res) => {
  const { name, fullName, email, password } = req.body;

  // Accept both 'name' and 'fullName' (frontend sends fullName)
  const userName = name || fullName;

  if (!userName || !email || !password) {
    throw new AppError('Please provide name, email, and password', 400);
  }

  // Check for existing user
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError('An account with this email already exists', 400);
  }

  // Create user
  const user = await User.create({
    name: userName,
    email: email.toLowerCase(),
    password,
  });

  sendTokenResponse(user, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Find user and include password for comparison
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Get current logged-in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user: user.toAuthJSON(),
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (email) fieldsToUpdate.email = email.toLowerCase();
  if (avatar !== undefined) fieldsToUpdate.avatar = avatar;

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user: user.toAuthJSON(),
  });
});

// --- Helper ---

/**
 * Generate JWT token and send response.
 * Response shape: { success, token, user: { id, name, email, role } }
 * This MUST match what frontend loginSuccess() expects.
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    user: user.toAuthJSON(),
  });
};
