import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongoServerError } from "mongodb";
import { getUsersCollection } from "@/utils/db";
import { loginSchema } from "@/schemas/auth.schema";
import { findAllowedUser } from "@/config/allowed-users";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { auditAuth, AuditAction, extractRequestMetadata } from "@/utils/audit-trail";
import type { User } from "@/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;
    const sanitizedEmail = email.trim().toLowerCase();
    const requestMetadata = extractRequestMetadata(req);

    const allowedUser = findAllowedUser(sanitizedEmail);

    if (!allowedUser) {
      auditAuth(AuditAction.LOGIN_FAILED, undefined, {
        endpoint: '/api/auth/login',
        method: 'POST',
        email: sanitizedEmail,
        ...requestMetadata,
      });
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      allowedUser.passwordHash
    );

    if (!isPasswordValid) {
      auditAuth(AuditAction.LOGIN_FAILED, undefined, {
        endpoint: '/api/auth/login',
        method: 'POST',
        email: sanitizedEmail,
        ...requestMetadata,
      });
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const canonicalEmail = allowedUser.email.trim().toLowerCase();

    const usersCollection = await getUsersCollection();
    let user = await usersCollection.findOne<User>({ email: canonicalEmail });

    if (!user) {
      const now = new Date();
      try {
        const result = await usersCollection.insertOne({
          email: canonicalEmail,
          password: allowedUser.passwordHash,
          role: allowedUser.role || "user",
          name: allowedUser.name || "",
          isActive: true,
          createdAt: now,
          updatedAt: now,
        });

        user = {
          _id: result.insertedId,
          email: canonicalEmail,
          password: allowedUser.passwordHash,
          role: allowedUser.role || "user",
          name: allowedUser.name || "",
          isActive: true,
          createdAt: now,
          updatedAt: now,
        };
      } catch (insertError) {
        if (
          insertError instanceof MongoServerError &&
          insertError.code === 11000
        ) {
          user = await usersCollection.findOne<User>({
            email: canonicalEmail,
          });
        } else {
          throw insertError;
        }
      }
    } else {
      const updates: Partial<User> = {};
      if (user.email !== canonicalEmail) {
        updates.email = canonicalEmail;
      }
      if (user.password !== allowedUser.passwordHash) {
        updates.password = allowedUser.passwordHash;
      }
      if (
        allowedUser.role &&
        user.role?.toLowerCase() !== allowedUser.role.toLowerCase()
      ) {
        updates.role = allowedUser.role;
      }
      if (allowedUser.name && user.name !== allowedUser.name) {
        updates.name = allowedUser.name;
      }
      if (Object.keys(updates).length > 0) {
        updates.updatedAt = new Date();
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: updates }
        );
        user = { ...user, ...updates } as User;
      }
    }

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id?.toString(),
        email: user.email,
        role: user.role || "user"
      },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Logged in",
      user: {
        id: user._id?.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
      }
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Log successful login
    auditAuth(AuditAction.LOGIN, user._id?.toString(), {
      endpoint: '/api/auth/login',
      method: 'POST',
      email: user.email,
      role: user.role,
      ...requestMetadata,
    });

    logger.info('User logged in successfully', {
      userId: user._id?.toString(),
      email: user.email,
      role: user.role,
    });

    return response;
  } catch (error) {
    logger.error("Login error", error, {
      endpoint: '/api/auth/login',
      method: 'POST',
      ...extractRequestMetadata(req),
    });

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
