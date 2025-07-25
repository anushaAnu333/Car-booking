import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const db = await getDatabase();
    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Convert _id to id for frontend compatibility
    const carResponse = {
      ...car,
      id: car._id.toString(),
      _id: undefined,
    };

    return NextResponse.json(carResponse);
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const db = await getDatabase();

    // Remove id and _id from body to prevent conflicts
    const { id: _bodyId, _id: _bodyObjectId, ...updateData } = body;

    // Add updatedAt timestamp
    const updatedData = {
      ...updateData,
      updatedAt: new Date(),
    };

    const result = await db
      .collection("cars")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedData },
        { returnDocument: "after" }
      );

    if (!result) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Convert _id to id for frontend compatibility
    const carResponse = {
      ...result,
      id: result._id.toString(),
      _id: undefined,
    };

    return NextResponse.json(carResponse);
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid car ID" }, { status: 400 });
    }

    const db = await getDatabase();

    const result = await db.collection("cars").findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Car deleted successfully",
      car: {
        ...result,
        id: result._id.toString(),
        _id: undefined,
      },
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}
