/* eslint-disable no-unused-vars */
import pino from 'pino';
const logger = pino();

export const apiErrorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  // 1️⃣ Zod validation errors
  if (err?.name === 'ZodError' || err?.issues) {
    const issues = err.issues || err.errors;
    logger.warn({ err, issues }, 'Validation error');
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      message: 'Invalid request data',
      details: issues.map(i => ({
        path: Array.isArray(i.path) ? i.path.join('.') : i.path,
        message: i.message,
      })),
    });
  }

  // 2️⃣ Custom app errors (AppError pattern)
  if (err?.status && err?.message) {
    logger.warn({ err }, 'Client error');
    return res.status(err.status).json({
      success: false,
      error: err.name || 'Error',
      message: isProd ? 'Request failed' : err.message,
    });
  }

  // 3️⃣ Unexpected errors (fallback)
  const log = req.log?.error || logger.error.bind(logger);
  log({ err }, 'Unhandled error');

  const payload = {
    success: false,
    error: 'ServerError',
    message: isProd ? 'Internal server error' : (err.message || 'Something went wrong'),
  };

  if (!isProd && err.stack) payload.stack = err.stack;

  res.status(500).json(payload);
};
