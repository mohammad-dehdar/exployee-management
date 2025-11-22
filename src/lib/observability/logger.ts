/**
 * Logger Utility
 *
 * Provides structured logging with different log levels:
 * - debug: Detailed information for debugging
 * - info: General informational messages
 * - warn: Warning messages for potential issues
 * - error: Error messages for failures
 *
 * In production, logs can be sent to external services (e.g., Sentry, LogRocket)
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogContext {
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private minLevel: LogLevel;

  constructor() {
    // In development, show all logs. In production, only show WARN and ERROR
    this.minLevel =
      process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG;
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];

    let formatted = `[${timestamp}] [${levelName}] ${message}`;

    if (context && Object.keys(context).length > 0) {
      formatted += ` | Context: ${JSON.stringify(context)}`;
    }

    if (error) {
      formatted += ` | Error: ${error.message}`;
      if (error.stack) {
        formatted += ` | Stack: ${error.stack}`;
      }
    }

    return formatted;
  }

  /**
   * Create log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };
  }

  /**
   * Write log to console (and potentially to external services in production)
   */
  private writeLog(entry: LogEntry): void {
    if (entry.level < this.minLevel) {
      return;
    }

    const formatted = this.formatMessage(
      entry.level,
      entry.message,
      entry.context,
      entry.error
    );

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.ERROR:
        console.error(formatted);
        // In production, send errors to external logging service
        // Example: Sentry.captureException(entry.error);
        break;
    }
  }

  /**
   * Debug log - detailed information for debugging
   */
  debug(message: string, context?: LogContext): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, message, context);
    this.writeLog(entry);
  }

  /**
   * Info log - general informational messages
   */
  info(message: string, context?: LogContext): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, context);
    this.writeLog(entry);
  }

  /**
   * Warning log - potential issues
   */
  warn(message: string, context?: LogContext): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, context);
    this.writeLog(entry);
  }

  /**
   * Error log - errors and failures
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const err = error instanceof Error ? error : new Error(String(error));
    const entry = this.createLogEntry(LogLevel.ERROR, message, context, err);
    this.writeLog(entry);
  }

  /**
   * Audit log - for security-sensitive operations
   */
  audit(
    action: string,
    userId?: string,
    details?: LogContext
  ): void {
    const context: LogContext = {
      action,
      ...(userId && { userId }),
      ...details,
    };

    const entry = this.createLogEntry(
      LogLevel.INFO,
      `AUDIT: ${action}`,
      context
    );

    // Always log audit events
    this.minLevel = LogLevel.DEBUG; // Temporarily lower level to ensure audit logs
    this.writeLog(entry);
    this.minLevel =
      process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = (message: string, context?: LogContext) =>
  logger.debug(message, context);
export const logInfo = (message: string, context?: LogContext) =>
  logger.info(message, context);
export const logWarn = (message: string, context?: LogContext) =>
  logger.warn(message, context);
export const logError = (message: string, error?: Error | unknown, context?: LogContext) =>
  logger.error(message, error, context);
export const logAudit = (action: string, userId?: string, details?: LogContext) =>
  logger.audit(action, userId, details);
