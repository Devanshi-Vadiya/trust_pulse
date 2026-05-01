import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import env from '../config/env.js';

/**
 * Protect routes — verifies JWT from Authorization header.
 * Attaches full user object to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Extract token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized. Please log in.', 401);
  }

  // Verify token
  const decoded = jwt.verify(token, env.JWT_SECRET);

  // Get user from DB (exclude password)
  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    throw new AppError('User associated with this token no longer exists.', 401);
  }

  req.user = user;
  next();
});

/**
 * Optional auth — attaches user if token present, but doesn't block.
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch {
      // Token invalid, continue without user
    }
  }

  next();
});

/**
 * Restrict to specific roles.
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action.', 403);
    }
    next();
  };
};
