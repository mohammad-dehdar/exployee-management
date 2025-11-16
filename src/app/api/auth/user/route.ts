import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUsersCollection } from "@/utils/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.id),
    } as any);

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
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
