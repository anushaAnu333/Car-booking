import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Define Car type for MongoDB
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
  image: string; // Primary image for backward compatibility
  images?: string[]; // Array of multiple images
  imagePublicIds?: string[]; // Cloudinary public IDs for image management
  isFavorite?: boolean;
  isRecommended?: boolean;
  // Availability fields
  isAvailable?: boolean;
  availabilityStatus?: "available" | "rented" | "maintenance" | "reserved";
  currentLocation?: string;
  locations?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    // Get cars collection from MongoDB
    const carsCollection = await getCollection<CarDocument>("cars");

    // Fetch all cars
    const cars = await carsCollection.find({}).toArray();

    // Transform MongoDB documents to API format
    const transformedCars = cars.map((car) => ({
      id: car._id.toString(),
      name: car.name,
      type: car.type,
      brand: car.brand,
      fuel: car.fuel,
      transmission: car.transmission,
      capacity: car.capacity,
      price: car.price,
      originalPrice: car.originalPrice,
      image: car.image,
      images: car.images || [car.image], // Return images array or fallback to single image
      imagePublicIds: car.imagePublicIds || [], // Return public IDs for Cloudinary management
      isFavorite: car.isFavorite || false,
      isRecommended: car.isRecommended || false,
      // Availability fields
      isAvailable: car.isAvailable !== false, // Default to true if not set
      availabilityStatus: car.availabilityStatus || "available",
      currentLocation: car.currentLocation,
      locations: car.locations || [],
    }));

    return NextResponse.json(transformedCars);
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "type",
      "brand",
      "fuel",
      "transmission",
      "capacity",
      "price",
    ];
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate images - either image or images array is required
    if (!body.image && (!body.images || body.images.length === 0)) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Get cars collection from MongoDB
    const carsCollection = await getCollection<CarDocument>("cars");

    // Handle images array
    const images =
      body.images && Array.isArray(body.images) && body.images.length > 0
        ? body.images.slice(0, 4) // Limit to maximum 4 images
        : body.image
        ? [body.image]
        : [];

    const imagePublicIds =
      body.imagePublicIds && Array.isArray(body.imagePublicIds)
        ? body.imagePublicIds.slice(0, 4) // Limit to maximum 4 public IDs
        : [];

    const primaryImage = images.length > 0 ? images[0] : body.image;

    // Create new car document
    const newCarDoc: Omit<CarDocument, "_id"> = {
      name: body.name,
      type: body.type,
      brand: body.brand,
      fuel: body.fuel,
      transmission: body.transmission,
      capacity: Number(body.capacity),
      price: Number(body.price),
      originalPrice: body.originalPrice
        ? Number(body.originalPrice)
        : undefined,
      image: primaryImage, // Primary image for backward compatibility
      images: images, // Array of all images
      imagePublicIds: imagePublicIds, // Cloudinary public IDs
      isFavorite: false,
      isRecommended: false,
      // Availability fields
      isAvailable: body.isAvailable !== false,
      availabilityStatus: body.availabilityStatus || "available",
      currentLocation: body.currentLocation,
      locations: body.locations || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert car into MongoDB
    const result = await carsCollection.insertOne(newCarDoc as CarDocument);

    // Return the created car
    const newCar = {
      id: result.insertedId.toString(),
      ...newCarDoc,
    };

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error("Failed to create car:", error);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 400 }
    );
  }
}
