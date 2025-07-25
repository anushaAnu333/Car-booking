import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { authenticateToken } from "@/lib/jwt";
import { ObjectId } from "mongodb";

// Define User type for MongoDB
interface UserDocument {
  _id: ObjectId;
  email: string;
  password: string; // hashed
  name: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: Request) {
  try {
    // Authenticate the request using JWT
    const payload = await authenticateToken(request);

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get users collection from MongoDB
    const usersCollection = await getCollection<UserDocument>("users");

    // Find user by ID
    const user = await usersCollection.findOne({
      _id: new ObjectId(payload.userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      ...userWithoutPassword,
      id: user._id.toString(), // Convert MongoDB _id to id
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
