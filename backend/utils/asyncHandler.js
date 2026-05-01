/**
 * Wraps async controller functions to avoid repetitive try/catch blocks.
 * Catches any thrown error and passes it to Express error middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
