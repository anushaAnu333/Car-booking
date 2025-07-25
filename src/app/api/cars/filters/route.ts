import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface CarDocument {
  _id: ObjectId;
  name: string;
  type: string;
  brand: string;
  fuel: string;
  transmission: string;
  capacity: number;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  imagePublicIds?: string[];
  isFavorite?: boolean;
  isRecommended?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    // Get cars collection from MongoDB
    const carsCollection = await getCollection<CarDocument>("cars");

    // Fetch all cars
    const cars = await carsCollection.find({}).toArray();

    // Calculate filter statistics
    const typeStats: Record<string, number> = {};
    const capacityStats: Record<string, number> = {};
    let minPrice = Infinity;
    let maxPrice = 0;

    cars.forEach((car) => {
      // Count car types
      typeStats[car.type] = (typeStats[car.type] || 0) + 1;

      // Count capacity ranges
      const capacity = car.capacity;
      let capacityRange: string;

      if (capacity <= 2) {
        capacityRange = "2 Person";
      } else if (capacity <= 4) {
        capacityRange = "4 Person";
      } else if (capacity <= 6) {
        capacityRange = "6 Person";
      } else {
        capacityRange = "8 or More";
      }

      capacityStats[capacityRange] = (capacityStats[capacityRange] || 0) + 1;

      // Track price range
      minPrice = Math.min(minPrice, car.price);
      maxPrice = Math.max(maxPrice, car.price);
    });

    // Convert to arrays with name and count
    const carTypes = Object.entries(typeStats).map(([name, count]) => ({
      name,
      count,
    }));

    const capacityOptions = Object.entries(capacityStats).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    // Round up max price to nearest 10
    const roundedMaxPrice = Math.ceil(maxPrice / 10) * 10;

    return NextResponse.json({
      carTypes,
      capacityOptions,
      priceRange: {
        min: Math.floor(minPrice),
        max: roundedMaxPrice,
      },
      totalCars: cars.length,
    });
  } catch (error) {
    console.error("Failed to fetch filter options:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter options" },
      { status: 500 }
    );
  }
}
