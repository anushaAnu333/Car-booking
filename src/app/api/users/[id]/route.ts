import { NextResponse } from "next/server";
import { users } from "@/data/users";
import { UpdateUserRequest } from "@/types/api";

// Helper function to get user from token
function getUserIdFromToken(request: Request): string | null {
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const currentUserId = getUserIdFromToken(request);

    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Users can only view their own profile unless they're admin
    const currentUser = users.find((u) => u.id === currentUserId);
    if (currentUserId !== id && currentUser?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
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
    const currentUserId = getUserIdFromToken(request);

    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Users can only update their own profile
    if (currentUserId !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body: UpdateUserRequest = await request.json();
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user (only allow certain fields to be updated)
    users[userIndex] = {
      ...users[userIndex],
      name: body.name || users[userIndex].name,
      phone: body.phone || users[userIndex].phone,
      avatar: body.avatar || users[userIndex].avatar,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
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
    const currentUserId = getUserIdFromToken(request);

    if (!currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can delete users
    const currentUser = users.find((u) => u.id === currentUserId);
    if (currentUser?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Don't allow deleting the last admin
    const user = users[userIndex];
    if (user.role === "admin") {
      const adminCount = users.filter((u) => u.role === "admin").length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot delete the last admin user" },
          { status: 400 }
        );
      }
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 400 }
    );
  }
}
