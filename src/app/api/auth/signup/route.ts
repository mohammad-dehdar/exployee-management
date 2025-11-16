import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUsersCollection } from "@/utils/db";
import { signupSchema } from "@/schemas/auth.schema";

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

    const usersCollection = await getUsersCollection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
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

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: result.insertedId.toString(),
          email,
          name: name || "",
          role: role || "user",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
