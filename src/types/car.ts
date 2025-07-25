export interface Car {
  id: string;
  name: string;
  type: string;
  brand: string;
  fuel: string;
  transmission: string;
  capacity: number;
  price: number;
  originalPrice?: number;
  image: string; // Primary image for backward compatibility
  images?: string[]; // Array of multiple images (up to 4)
  imagePublicIds?: string[]; // Cloudinary public IDs for image management
  isFavorite?: boolean;
  isRecommended?: boolean;
  // New availability fields
  isAvailable?: boolean;
  availabilityStatus?: "available" | "rented" | "maintenance" | "reserved";
  // Location-based availability
  locations?: string[]; // Available locations for this car
  currentLocation?: string; // Current location of the car
  // Maintenance and availability dates
  unavailableDates?: DateRange[];
  maintenanceSchedule?: DateRange[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
  reason?: string; // maintenance, booked, etc.
}

export interface RentalFormData {
  startDate: string;
  endDate: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupTime?: string;
  dropoffTime?: string;
}
