import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUsersCollection } from "@/utils/db";
import { loginSchema } from "@/schemas/auth.schema";
import { findAllowedUser } from "@/config/allowed-users";
import { env } from "@/config/env";
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
    const allowedUser = findAllowedUser(email);

    if (!allowedUser) {
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
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const usersCollection = await getUsersCollection();
    let user = await usersCollection.findOne<User>({ email });

    if (!user) {
      const now = new Date();
      const result = await usersCollection.insertOne({
        email: allowedUser.email,
        password: allowedUser.passwordHash,
        role: allowedUser.role || "user",
        name: allowedUser.name || "",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });

      user = {
        _id: result.insertedId,
        email: allowedUser.email,
        password: allowedUser.passwordHash,
        role: allowedUser.role || "user",
        name: allowedUser.name || "",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      };
    } else {
      const updates: Partial<User> = {};
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

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
