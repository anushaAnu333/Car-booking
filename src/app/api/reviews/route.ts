import { NextResponse } from "next/server";
import { users } from "@/data/users";
import { CreateReviewRequest, Review, ReviewWithUser } from "@/types/api";

// In-memory storage for reviews (in production, use a database)
const reviews: Review[] = [
  {
    id: "1",
    userId: "2",
    carId: "1",
    rating: 4,
    comment:
      "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    createdAt: "2024-07-21T00:00:00Z",
    updatedAt: "2024-07-21T00:00:00Z",
  },
  {
    id: "2",
    userId: "3",
    carId: "1",
    rating: 4,
    comment:
      "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    createdAt: "2024-07-20T00:00:00Z",
    updatedAt: "2024-07-20T00:00:00Z",
  },
];

// Helper function to get user from token
function getUserFromToken(request: Request): string | null {
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("carId");

    let filteredReviews = [...reviews];

    // Filter by car if specified
    if (carId) {
      filteredReviews = filteredReviews.filter((r) => r.carId === carId);
    }

    // Add user details
    const reviewsWithUsers: ReviewWithUser[] = filteredReviews.map((review) => {
      const user = users.find((u) => u.id === review.userId);
      return {
        ...review,
        user: user!,
      };
    });

    return NextResponse.json(reviewsWithUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateReviewRequest = await request.json();
    const { carId, rating, comment } = body;

    // Validate input
    if (!carId || !rating || !comment) {
      return NextResponse.json(
        { error: "Car ID, rating, and comment are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user already reviewed this car
    const existingReview = reviews.find(
      (r) => r.userId === userId && r.carId === carId
    );

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this car" },
        { status: 409 }
      );
    }

    // Create new review
    const newReview: Review = {
      id: String(reviews.length + 1),
      userId,
      carId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reviews.push(newReview);

    // Return review with user details
    const user = users.find((u) => u.id === userId);
    const reviewWithUser: ReviewWithUser = {
      ...newReview,
      user: user!,
    };

    return NextResponse.json(reviewWithUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
