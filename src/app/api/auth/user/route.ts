import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUsersCollection } from "@/utils/db";
import { ObjectId } from "mongodb";
import { env } from "@/config/env";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    const usersCollection = await getUsersCollection();
    const userFilter: { _id: ObjectId } = { _id: new ObjectId(decoded.id) };
    const user = await usersCollection.findOne(userFilter);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user._id?.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (_error) {
    return NextResponse.json({ user: null });
  }
}
