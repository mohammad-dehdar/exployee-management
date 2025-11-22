/**
 * Audit Trail Utility
 *
 * Provides structured audit logging for security-sensitive operations:
 * - Authentication events (login, logout, signup)
 * - Data modifications (create, update, delete)
 * - Authorization checks (role changes, access attempts)
 * - Administrative actions
 */

import { logAudit } from './logger';
import type { LogContext } from './logger';

export enum AuditAction {
  // Authentication
  LOGIN = 'LOGIN',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  SIGNUP = 'SIGNUP',
  TOKEN_VALIDATED = 'TOKEN_VALIDATED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  // Authorization
  ACCESS_DENIED = 'ACCESS_DENIED',
  ROLE_CHECK = 'ROLE_CHECK',
  ADMIN_ACCESS = 'ADMIN_ACCESS',

  // User Management
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  PROFILE_CREATED = 'PROFILE_CREATED',
  PROFILE_UPDATED = 'PROFILE_UPDATED',

  // Database
  DB_INDEXES_CREATED = 'DB_INDEXES_CREATED',

  // API
  API_ERROR = 'API_ERROR',
  API_VALIDATION_ERROR = 'API_VALIDATION_ERROR',
}

export interface AuditDetails extends LogContext {
  ipAddress?: string;
  userAgent?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  resourceId?: string;
  resourceType?: string;
  changes?: Record<string, unknown>;
}

/**
 * Log authentication event
 */
export function auditAuth(
  action: AuditAction,
  userId?: string,
  details?: AuditDetails
): void {
  logAudit(action, userId, {
    category: 'AUTHENTICATION',
    ...details,
  });
}

/**
 * Log authorization event
 */
export function auditAuthorization(
  action: AuditAction,
  userId?: string,
  details?: AuditDetails
): void {
  logAudit(action, userId, {
    category: 'AUTHORIZATION',
    ...details,
  });
}

/**
 * Log user management event
 */
export function auditUserManagement(
  action: AuditAction,
  userId?: string,
  details?: AuditDetails
): void {
  logAudit(action, userId, {
    category: 'USER_MANAGEMENT',
    ...details,
  });
}

/**
 * Log data modification event
 */
export function auditDataModification(
  action: AuditAction,
  userId?: string,
  details?: AuditDetails
): void {
  logAudit(action, userId, {
    category: 'DATA_MODIFICATION',
    ...details,
  });
}

/**
 * Log administrative event
 */
export function auditAdmin(
  action: AuditAction,
  userId?: string,
  details?: AuditDetails
): void {
  logAudit(action, userId, {
    category: 'ADMINISTRATIVE',
    ...details,
  });
}

/**
 * Log API error event
 */
export function auditApiError(
  endpoint: string,
  method: string,
  statusCode: number,
  error: Error | unknown,
  userId?: string
): void {
  logAudit(AuditAction.API_ERROR, userId, {
    category: 'API_ERROR',
    endpoint,
    method,
    statusCode,
    error: error instanceof Error ? error.message : String(error),
  });
}

/**
 * Extract IP address and user agent from request
 */
export function extractRequestMetadata(req: Request): Pick<
  AuditDetails,
  'ipAddress' | 'userAgent'
> {
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  const userAgent = req.headers.get('user-agent') || 'unknown';

  return { ipAddress, userAgent };
}
