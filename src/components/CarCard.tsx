"use client";

import { Heart, Fuel, Users, Settings } from "lucide-react";
import { Car } from "@/types/car";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface CarCardProps {
  car: Car;
  availabilityData?: {
    isAvailable: boolean;
    pricing?: {
      basePrice: number;
      locationFee?: number;
      oneWayFee?: number;
      totalPrice: number;
      days?: number;
    };
  };
  searchDates?: {
    startDate: string;
    endDate: string;
  };
}

export default function CarCard({
  car,
  availabilityData,
  searchDates,
}: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(car.isFavorite || false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleRentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookingModalOpen(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Here you would typically make an API call to update the favorite status
    console.log("Toggle favorite for", car.id);
  };

  // Availability status helpers
  const getAvailabilityStatus = () => {
    // If we have availability data from search, use that
    if (availabilityData !== undefined) {
      return availabilityData.isAvailable ? "available" : "rented";
    }

    // Otherwise use car's built-in status
    if (car.availabilityStatus) {
      return car.availabilityStatus;
    }
    if (car.isAvailable === false) {
      return "rented";
    }
    return "available";
  };

  const getAvailabilityColor = () => {
    const status = getAvailabilityStatus();
    switch (status) {
      case "available":
        return "bg-green-500";
      case "rented":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      case "reserved":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailabilityAnimation = () => {
    const status = getAvailabilityStatus();
    return status === "available" ? "animate-pulse" : "";
  };

  const getAvailabilityTextColor = () => {
    const status = getAvailabilityStatus();
    switch (status) {
      case "available":
        return "text-green-600";
      case "rented":
        return "text-red-600";
      case "maintenance":
        return "text-yellow-600";
      case "reserved":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getAvailabilityText = () => {
    const status = getAvailabilityStatus();
    switch (status) {
      case "available":
        return "Available";
      case "rented":
        return "Rented";
      case "maintenance":
        return "Maintenance";
      case "reserved":
        return "Reserved";
      default:
        return "Unknown";
    }
  };

  return (
    <Link href={`/cars/${car.id}`} className="block group h-full">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:border-blue-200 group-hover:-translate-y-1 backdrop-blur-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight">
              {car.name}
            </h3>
            <p className="text-xs font-medium text-gray-500">{car.type}</p>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 ml-2"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }>
            <Heart
              className={`h-5 w-5 transition-all duration-200 ${
                isFavorite
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>
        </div>

        {/* Car Image */}
        <div className="h-36 mb-6 flex items-center justify-center relative rounded-xl overflow-hidden transition-all duration-500 flex-shrink-0">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse w-full h-full rounded-xl opacity-20"></div>
            </div>
          )}
          <img
            src={
              car.images && car.images.length > 0 ? car.images[0] : car.image
            }
            alt={car.name}
            className={`h-full object-contain transition-all duration-500 group-hover:scale-110 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />

          {/* Multiple images indicator */}
          {car.images && car.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm font-medium">
              +{car.images.length - 1}
            </div>
          )}
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-6 flex-shrink-0">
          <div className="flex items-center text-gray-600">
            <div className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0">
              <Fuel className="w-full h-full" />
            </div>
            <span className="text-xs font-medium whitespace-nowrap">
              {car.fuel}L
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <div className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0">
              <Settings className="w-full h-full" />
            </div>
            <span className="text-xs font-medium whitespace-nowrap">
              {car.transmission}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <div className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0">
              <Users className="w-full h-full" />
            </div>
            <span className="text-xs font-medium whitespace-nowrap">
              {car.capacity}
            </span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex-1 min-w-0">
            {availabilityData?.pricing && searchDates ? (
              // Show dynamic pricing for searched dates
              <div>
                <div className="flex items-baseline mb-1">
                  <span className="text-lg font-bold text-gray-900">
                    ${availabilityData.pricing.totalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-gray-500 ml-1">
                    total
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  ${availabilityData.pricing.basePrice.toFixed(2)}/day
                  {availabilityData.pricing.days && (
                    <span>
                      {" "}
                      × {availabilityData.pricing.days} day
                      {availabilityData.pricing.days !== 1 ? "s" : ""}
                    </span>
                  )}
                  {availabilityData.pricing.locationFee &&
                    availabilityData.pricing.locationFee > 0 && (
                      <span>
                        {" "}
                        • +${availabilityData.pricing.locationFee} location fee
                      </span>
                    )}
                  {availabilityData.pricing.oneWayFee &&
                    availabilityData.pricing.oneWayFee > 0 && (
                      <span>
                        {" "}
                        • +${availabilityData.pricing.oneWayFee} one-way
                      </span>
                    )}
                </div>
              </div>
            ) : (
              // Show regular pricing
              <div>
                <div className="flex items-baseline mb-1">
                  <span className="text-xl font-bold text-gray-900">
                    ${car.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-gray-500 ml-1">
                    /day
                  </span>
                </div>
                {car.originalPrice && car.originalPrice > car.price && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    ${car.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleRentClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-xs transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap flex-shrink-0">
            Rent Now
          </button>
        </div>

        {/* Availability indicator */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Status</span>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${getAvailabilityColor()} ${getAvailabilityAnimation()}`}></div>
              <span className={`font-medium ${getAvailabilityTextColor()}`}>
                {getAvailabilityText()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        car={car}
      />
    </Link>
  );
}
