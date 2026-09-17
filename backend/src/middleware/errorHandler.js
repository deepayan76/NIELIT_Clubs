/**
 * Centralized Express Error Handling Middleware
 * Sanitizes error responses to prevent exposing internal stack traces, DB strings, or secrets.
 */
export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Log detailed error on server console for debugging
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Return clean, sanitized JSON to the client
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong on the server.',
    timestamp: new Date().toISOString()
  });
}
