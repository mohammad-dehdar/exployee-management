import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUsersCollection } from "@/utils/db";
import { signupSchema } from "@/schemas/auth.schema";
import { logger } from "@/utils/logger";
import { auditUserManagement, AuditAction, extractRequestMetadata } from "@/utils/audit-trail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { email, password, name, role, phone } = validationResult.data;
    const requestMetadata = extractRequestMetadata(req);

    const usersCollection = await getUsersCollection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      logger.warn('Signup attempt with existing email', {
        email,
        endpoint: '/api/auth/signup',
      });
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      name: name || "",
      role: role || "user",
      phone: phone || "",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userId = result.insertedId.toString();

    // Log successful signup
    auditUserManagement(AuditAction.SIGNUP, userId, {
      endpoint: '/api/auth/signup',
      method: 'POST',
      email,
      role: role || "user",
      ...requestMetadata,
    });

    logger.info('User created successfully', {
      userId,
      email,
      role: role || "user",
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: userId,
          email,
          name: name || "",
          role: role || "user",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Signup error", error, {
      endpoint: '/api/auth/signup',
      method: 'POST',
      ...extractRequestMetadata(req),
    });

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
