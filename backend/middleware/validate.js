import AppError from '../utils/AppError.js';

/**
 * Request body validation middleware factory.
 * Validates that required fields are present in req.body.
 * @param {string[]} requiredFields - Array of required field names
 */
export const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || value === '';
    });

    if (missing.length > 0) {
      throw new AppError(`Missing required fields: ${missing.join(', ')}`, 400);
    }

    next();
  };
};

/**
 * Validate email format.
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength.
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};
