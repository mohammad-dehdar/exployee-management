import { NextResponse } from "next/server";
import { createAllIndexes } from "@/utils/db-indexes";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { auditAdmin, AuditAction, extractRequestMetadata } from "@/utils/audit-trail";
import type { TokenPayload } from "@/services/types";

/**
 * Get authenticated user from request
 */
function getAuthenticatedUser(req: Request): TokenPayload | null {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) return null;

    const tokenEntry = cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("token="));

    if (!tokenEntry) return null;

    const token = tokenEntry.split("token=")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * POST /api/admin/db/setup
 * Setup database indexes (Admin only)
 */
export async function POST(req: Request) {
  try {
    // Check authentication
    const user = getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check admin role
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Create all indexes
    await createAllIndexes();

    // Log admin action
    auditAdmin(AuditAction.DB_INDEXES_CREATED, user.id, {
      endpoint: '/api/admin/db/setup',
      method: 'POST',
      ...extractRequestMetadata(req),
    });

    logger.info('Database indexes created', {
      userId: user.id,
      email: user.email,
    });

    return NextResponse.json({
      message: "Database indexes created successfully",
    });
  } catch (error) {
    logger.error("Database setup error", error, {
      endpoint: '/api/admin/db/setup',
      method: 'POST',
      userId: user?.id,
      ...extractRequestMetadata(req),
    });

    return NextResponse.json(
      {
        message: "Failed to setup database indexes",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
