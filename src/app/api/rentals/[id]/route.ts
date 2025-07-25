import { NextResponse } from "next/server";
import { rentals } from "@/data/rentals";
import { cars } from "@/data/cars";
import { users } from "@/data/users";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rental = rentals.find((r) => r.id === id);

    if (!rental) {
      return NextResponse.json({ error: "Rental not found" }, { status: 404 });
    }

    // Add car and user details
    const car = cars.find((c) => c.id === rental.carId);
    const user = users.find((u) => u.id === rental.userId);

    const rentalWithDetails = {
      ...rental,
      car,
      user,
    };

    return NextResponse.json(rentalWithDetails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rental" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const rentalIndex = rentals.findIndex((r) => r.id === id);

    if (rentalIndex === -1) {
      return NextResponse.json({ error: "Rental not found" }, { status: 404 });
    }

    // Update rental
    rentals[rentalIndex] = {
      ...rentals[rentalIndex],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(rentals[rentalIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update rental" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const rentalIndex = rentals.findIndex((r) => r.id === id);

    if (rentalIndex === -1) {
      return NextResponse.json({ error: "Rental not found" }, { status: 404 });
    }

    // Remove rental
    const deletedRental = rentals.splice(rentalIndex, 1)[0];

    return NextResponse.json({
      message: "Rental cancelled successfully",
      rental: deletedRental,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to cancel rental" },
      { status: 400 }
    );
  }
}
