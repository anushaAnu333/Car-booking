import { NextResponse } from "next/server";
import { users } from "@/data/users";

// Helper function to check if user is admin
function isAdmin(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = Buffer.from(token, "base64").toString();
    const [userId] = decoded.split(":");
    const user = users.find((u) => u.id === userId);
    return user?.role === "admin";
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  try {
    // Check if user is admin
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const q = searchParams.get("q")?.toLowerCase();

    let filteredUsers = [...users];

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter((u) => u.role === role);
    }

    // Search by name or email
    if (q) {
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    // Remove password from response
    const safeUsers = filteredUsers.map(({ ...user }) => user);

    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
