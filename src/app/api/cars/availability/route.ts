import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { locations } from "@/data/locations";
import { AvailabilityRequest, AvailabilityResponse } from "@/types/api";

// Calculate pricing with location fees
function calculatePricing(
  basePrice: number,
  pickupLocation: string,
  startDate: string,
  endDate: string,
  dropoffLocation?: string
) {
  let locationFee = 0;
  let oneWayFee = 0;

  // Calculate rental duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Add location fee for airport locations
  const pickupLoc = locations.find((loc) => loc.id === pickupLocation);
  if (pickupLoc?.name.toLowerCase().includes("airport")) {
    locationFee += 25;
  }

  // Add one-way fee if different locations
  if (dropoffLocation && dropoffLocation !== pickupLocation) {
    const dropoffLoc = locations.find((loc) => loc.id === dropoffLocation);
    if (dropoffLoc) {
      oneWayFee = 50;
      if (dropoffLoc.name.toLowerCase().includes("airport")) {
        locationFee += 25;
      }
    }
  }

  const totalDailyPrice = basePrice * days;

  return {
    basePrice,
    locationFee,
    oneWayFee,
    days,
    totalPrice: totalDailyPrice + locationFee + oneWayFee,
  };
}

export async function POST(request: Request) {
  try {
    const body: AvailabilityRequest = await request.json();
    const { carId, startDate, endDate, pickupLocation, dropoffLocation } = body;

    // Validate input
    if (!startDate || !endDate || !pickupLocation) {
      return NextResponse.json(
        { error: "Start date, end date, and pickup location are required" },
        { status: 400 }
      );
    }

    // Check if dates are valid
    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    // Get collections
    const carsCollection = await getCollection("cars");
    const rentalsCollection = await getCollection("rentals");

    const availabilityResults: AvailabilityResponse[] = [];

    if (carId) {
      // Check availability for specific car
      const car = await carsCollection.findOne({ _id: new ObjectId(carId) });

      if (!car) {
        return NextResponse.json({ error: "Car not found" }, { status: 404 });
      }

      // Check if car is available at pickup location
      const pickupLoc = locations.find((loc) => loc.id === pickupLocation);
      if (!pickupLoc || !pickupLoc.availableCars?.includes(carId)) {
        return NextResponse.json({
          isAvailable: false,
          error: "Car not available at selected location",
        });
      }

      // Check for conflicting rentals
      const conflictingRentals = await rentalsCollection
        .find({
          carId: carId,
          status: { $in: ["confirmed", "active"] },
          $or: [
            {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
            },
          ],
        })
        .toArray();

      const isAvailable =
        conflictingRentals.length === 0 &&
        car.availabilityStatus !== "maintenance" &&
        car.isAvailable !== false;

      const pricing = calculatePricing(
        car.price,
        pickupLocation,
        startDate,
        endDate,
        dropoffLocation
      );

      availabilityResults.push({
        carId: carId,
        isAvailable,
        conflictingRentals: conflictingRentals.map((rental) => ({
          ...rental,
          id: rental._id.toString(),
        })),
        pricing,
      });
    } else {
      // Check availability for all cars at location
      const pickupLoc = locations.find((loc) => loc.id === pickupLocation);
      if (!pickupLoc) {
        return NextResponse.json(
          { error: "Pickup location not found" },
          { status: 404 }
        );
      }

      // Get all cars available at this location
      const availableCarIds = pickupLoc.availableCars || [];
      const cars = await carsCollection
        .find({
          _id: { $in: availableCarIds.map((id) => new ObjectId(id)) },
          isAvailable: { $ne: false },
          availabilityStatus: { $ne: "maintenance" },
        })
        .toArray();

      // Check each car for conflicts
      for (const car of cars) {
        const conflictingRentals = await rentalsCollection
          .find({
            carId: car._id.toString(),
            status: { $in: ["confirmed", "active"] },
            $or: [
              {
                startDate: { $lte: endDate },
                endDate: { $gte: startDate },
              },
            ],
          })
          .toArray();

        const isAvailable = conflictingRentals.length === 0;
        const pricing = calculatePricing(
          car.price,
          pickupLocation,
          startDate,
          endDate,
          dropoffLocation
        );

        availabilityResults.push({
          carId: car._id.toString(),
          isAvailable,
          carName: car.name,
          conflictingRentals: conflictingRentals.map((rental) => ({
            ...rental,
            id: rental._id.toString(),
          })),
          pricing,
        });
      }
    }

    return NextResponse.json(
      carId ? availabilityResults[0] : { results: availabilityResults }
    );
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
