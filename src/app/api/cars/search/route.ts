import { NextResponse } from "next/server";
import { cars } from "@/data/cars";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get search parameters
    const q = searchParams.get("q")?.toLowerCase() || "";
    const type = searchParams.get("type");
    const capacity = searchParams.get("capacity");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const transmission = searchParams.get("transmission");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Start with all cars
    let filteredCars = [...cars];

    // Text search
    if (q) {
      filteredCars = filteredCars.filter(
        (car) =>
          car.name.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.type.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (type) {
      const types = type.split(",").map((t) => t.trim());
      filteredCars = filteredCars.filter((car) => types.includes(car.type));
    }

    // Capacity filter
    if (capacity) {
      const capacities = capacity.split(",").map((c) => {
        if (c.includes("+")) {
          return parseInt(c);
        }
        return parseInt(c);
      });

      filteredCars = filteredCars.filter((car) => {
        return capacities.some((cap) => {
          if (capacity.includes("+")) {
            return car.capacity >= cap;
          }
          return car.capacity === cap;
        });
      });
    }

    // Price range filter
    if (minPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price <= parseFloat(maxPrice)
      );
    }

    // Transmission filter
    if (transmission) {
      filteredCars = filteredCars.filter(
        (car) => car.transmission.toLowerCase() === transmission.toLowerCase()
      );
    }

    // Calculate pagination
    const total = filteredCars.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedCars,
      total,
      page,
      pageSize: limit,
      totalPages,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to search cars" },
      { status: 500 }
    );
  }
}
