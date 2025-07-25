import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Rental, CreateRentalRequest } from "@/types/api";

// Simple user extraction from token (you would implement proper JWT validation)
function getUserFromToken(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  // In a real app, you would decode and validate the JWT token here
  // For this demo, we'll just return a mock user ID
  return "1"; // Mock user ID
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    // Get collections
    const rentalsCollection = await getCollection("rentals");
    const carsCollection = await getCollection("cars");

    // Build query
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (status) {
      query.status = status;
    }

    // Fetch rentals
    const rentals = await rentalsCollection.find(query).toArray();

    // Add car details to rentals
    const rentalsWithCarDetails = await Promise.all(
      rentals.map(async (rental) => {
        const car = await carsCollection.findOne({
          _id: new ObjectId(rental.carId),
        });
        return {
          ...rental,
          id: rental._id.toString(),
          car: car
            ? {
                ...car,
                id: car._id.toString(),
              }
            : null,
        };
      })
    );

    return NextResponse.json(rentalsWithCarDetails);
  } catch (error) {
    console.error("Failed to fetch rentals:", error);
    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication (temporarily disabled for testing)
    // const userId = getUserFromToken(request);
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const userId = "user123"; // Temporary test user ID

    const body: CreateRentalRequest = await request.json();
    const { carId, startDate, endDate, pickupLocation, dropoffLocation } = body;

    // Validate input
    if (!carId || !startDate || !endDate || !pickupLocation) {
      return NextResponse.json(
        {
          error:
            "Car ID, start date, end date, and pickup location are required",
        },
        { status: 400 }
      );
    }

    // Get collections
    const carsCollection = await getCollection("cars");
    const rentalsCollection = await getCollection("rentals");

    // Check if car exists
    const car = await carsCollection.findOne({ _id: new ObjectId(carId) });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Calculate total amount
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    const baseAmount = days * car.price;

    // Add location fees (same logic as availability API)
    let locationFee = 0;
    let oneWayFee = 0;

    // Calculate fees using the same logic as availability API
    const { locations } = await import("@/data/locations");
    const pickupLoc = locations.find((loc) => loc.id === pickupLocation);
    if (pickupLoc?.name.toLowerCase().includes("airport")) {
      locationFee += 25;
    }

    if (dropoffLocation && dropoffLocation !== pickupLocation) {
      const dropoffLoc = locations.find((loc) => loc.id === dropoffLocation);
      if (dropoffLoc) {
        oneWayFee = 50;
        if (dropoffLoc.name.toLowerCase().includes("airport")) {
          locationFee += 25;
        }
      }
    }

    const totalAmount = baseAmount + locationFee + oneWayFee;

    // Create new rental document
    const newRentalDoc = {
      userId,
      carId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation: dropoffLocation || pickupLocation,
      totalAmount,
      status: "pending" as const,
      paymentStatus: "pending" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert rental into MongoDB
    const result = await rentalsCollection.insertOne(newRentalDoc);

    const newRental = {
      id: result.insertedId.toString(),
      ...newRentalDoc,
      createdAt: newRentalDoc.createdAt.toISOString(),
      updatedAt: newRentalDoc.updatedAt.toISOString(),
    };

    return NextResponse.json(newRental, { status: 201 });
  } catch (error) {
    console.error("Failed to create rental:", error);
    return NextResponse.json(
      { error: "Failed to create rental" },
      { status: 500 }
    );
  }
}
