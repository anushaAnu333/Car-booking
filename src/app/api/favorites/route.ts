import { NextResponse } from "next/server";
import { cars } from "@/data/cars";

// In-memory storage for user favorites (in production, use a database)
const userFavorites: Record<string, string[]> = {};

// Helper function to get user from token
function getUserFromToken(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = Buffer.from(token, "base64").toString();
    const [userId] = decoded.split(":");
    return userId;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favoriteCarIds = userFavorites[userId] || [];
    const favoriteCars = cars.filter((car) => favoriteCarIds.includes(car.id));

    return NextResponse.json(favoriteCars);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { carId } = await request.json();

    if (!carId) {
      return NextResponse.json(
        { error: "Car ID is required" },
        { status: 400 }
      );
    }

    // Check if car exists
    const car = cars.find((c) => c.id === carId);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Initialize user favorites if not exists
    if (!userFavorites[userId]) {
      userFavorites[userId] = [];
    }

    // Add to favorites if not already there
    if (!userFavorites[userId].includes(carId)) {
      userFavorites[userId].push(carId);
    }

    return NextResponse.json({
      message: "Added to favorites",
      favorites: userFavorites[userId],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { carId } = await request.json();

    if (!carId) {
      return NextResponse.json(
        { error: "Car ID is required" },
        { status: 400 }
      );
    }

    // Remove from favorites
    if (userFavorites[userId]) {
      userFavorites[userId] = userFavorites[userId].filter(
        (id) => id !== carId
      );
    }

    return NextResponse.json({
      message: "Removed from favorites",
      favorites: userFavorites[userId] || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 }
    );
  }
}
