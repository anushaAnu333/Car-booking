// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Rental/Booking types
export interface Rental {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  // Location fields
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime?: string;
  dropoffTime?: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  updatedAt: string;
}

export interface RentalWithDetails extends Rental {
  car: Car;
  user: User;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  carId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewWithUser extends Review {
  user: User;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface CreateRentalRequest {
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime?: string;
  dropoffTime?: string;
}

export interface CreateReviewRequest {
  carId: string;
  rating: number;
  comment: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface SearchParams {
  q?: string;
  type?: string;
  capacity?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  page?: number;
  limit?: number;
}

// Import Car type from existing file
import { Car } from "./car";

// Location Management
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  contactInfo?: {
    phone: string;
    email: string;
  };
  operatingHours?: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  availableCars?: string[]; // Car IDs available at this location
}

// Car Availability Check
export interface AvailabilityRequest {
  carId?: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation?: string;
}

export interface AvailabilityResponse {
  carId?: string;
  carName?: string;
  isAvailable: boolean;
  conflictingRentals?: Rental[];
  alternativeCars?: string[];
  pricing?: {
    basePrice: number;
    locationFee?: number;
    oneWayFee?: number;
    totalPrice: number;
    days?: number;
  };
}
