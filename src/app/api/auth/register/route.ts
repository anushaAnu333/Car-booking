import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { RegisterRequest, User } from "@/types/api";

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
    const body: RegisterRequest = await request.json();
    const { email, password, name, phone } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Get users collection from MongoDB
    const usersCollection = await getCollection<UserDocument>("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user document
    const newUserDoc: Omit<UserDocument, "_id"> = {
      email,
      password: hashedPassword,
      name,
      phone: phone || "",
      avatar: "/user-avatar.svg",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert user into MongoDB
    const result = await usersCollection.insertOne(newUserDoc as UserDocument);

    // Generate JWT token
    const token = generateToken({
      userId: result.insertedId.toString(),
      email,
      role: "user",
    });

    // Create user response (without password)
    const newUser: User = {
      id: result.insertedId.toString(),
      email,
      name,
      phone: phone || "",
      avatar: "/user-avatar.svg",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ user: newUser, token }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
