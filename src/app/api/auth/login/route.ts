import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { LoginRequest } from "@/types/api";

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

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Get users collection from MongoDB
    const usersCollection = await getCollection<UserDocument>("users");

    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        id: user._id.toString(), // Convert MongoDB _id to id
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
