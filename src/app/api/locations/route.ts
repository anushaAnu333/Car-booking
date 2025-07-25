import { NextResponse } from "next/server";
import { locations } from "@/data/locations";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("active");
    const city = searchParams.get("city");

    let filteredLocations = locations;

    // Filter by active status
    if (isActive !== null) {
      const activeFilter = isActive === "true";
      filteredLocations = filteredLocations.filter(
        (location) => location.isActive === activeFilter
      );
    }

    // Filter by city
    if (city) {
      filteredLocations = filteredLocations.filter((location) =>
        location.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Sort by name
    const sortedLocations = filteredLocations.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return NextResponse.json(sortedLocations);
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

// For future admin functionality
export async function POST(request: Request) {
  try {
    // This would be for admin users to add new locations
    // For now, return method not allowed
    return NextResponse.json(
      { error: "Method not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
