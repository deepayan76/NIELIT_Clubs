import AuditLog from '../models/AuditLog.js';

/**
 * Strips sensitive keys from metadata objects before persisting audit records
 */
function sanitizeMetadata(data) {
  if (!data || typeof data !== 'object') return {};
  const clean = { ...data };
  const sensitiveKeys = [
    'password',
    'passwordHash',
    'token',
    'jwt',
    'secret',
    'apiKey',
    'tokenHash',
    'temporaryPassword'
  ];

  for (const key of Object.keys(clean)) {
    if (sensitiveKeys.some((s) => key.toLowerCase().includes(s.toLowerCase()))) {
      clean[key] = '[REDACTED]';
    }
  }
  return clean;
}

/**
 * Creates an asynchronous audit record
 */
export async function logAuditEvent({
  req,
  actorRole = 'SYSTEM',
  actorIdentifier = 'system',
  action,
  targetType = 'SYSTEM',
  targetId = null,
  metadata = {}
}) {
  try {
    const ip = req ? req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip : null;
    const userAgent = req ? req.headers['user-agent'] : null;

    const entry = new AuditLog({
      actorRole,
      actorIdentifier: String(actorIdentifier).trim(),
      action,
      targetType,
      targetId: targetId ? String(targetId) : null,
      metadata: sanitizeMetadata(metadata),
      ip: ip ? String(ip).substring(0, 100) : null,
      userAgent: userAgent ? String(userAgent).substring(0, 300) : null
    });

    await entry.save();
  } catch (err) {
    // Non-blocking: Audit failure must never crash the primary request
    console.error('Audit log write error:', err.message || err);
  }
}

export default logAuditEvent;
