"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarCard from "./CarCard";
import { Car } from "@/types/car";

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(15);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount((prev) => prev + 15);
      setLoadingMore(false);
    }, 500);
  };

  // Different car sections
  const popularCars = cars.slice(0, 4); // First 4 cars
  const recommendationCars = cars.slice(4, 8); // Next 4 cars (index 4-7)
  const remainingCars = cars.slice(8); // Cars from index 8 onwards
  const displayedRemainingCars = remainingCars.slice(0, displayCount - 8);
  const hasMoreCars = displayCount < cars.length && cars.length > 8;
  const remainingCount = cars.length - Math.min(displayCount, cars.length);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <span className="ml-3 text-gray-600">Loading cars...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Popular Cars Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base font-semibold text-gray-500">Popular Car</h2>
          <button
            onClick={() => router.push("/cars")}
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-200 hover:underline">
            View All
          </button>
        </div>

        {popularCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">
              No popular cars available at the moment.
            </p>
          </div>
        )}
      </section>

      {/* Recommendation Cars Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base font-semibold text-gray-500">
            Recommendation Car
          </h2>
        </div>

        {recommendationCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendationCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">
              No recommended cars available at the moment.
            </p>
          </div>
        )}
      </section>

      {/* More Cars Section with Load More */}
      {remainingCars.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-base font-semibold text-gray-500">
              More Cars ({remainingCars.length} available)
            </h2>
          </div>

          {displayedRemainingCars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedRemainingCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          {/* Load More Section */}
          {hasMoreCars && (
            <div className="flex flex-col items-center justify-center pt-8 border-t border-gray-100">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-12 py-4 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-lg disabled:shadow-md mb-6 min-w-[200px]">
                {loadingMore ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  `Load More Cars (${remainingCount} remaining)`
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-400 font-medium">
                  Showing {Math.min(displayCount, cars.length)} of {cars.length}{" "}
                  Car{cars.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}

          {/* All Cars Loaded Message */}
          {!hasMoreCars &&
            remainingCars.length > 0 &&
            displayCount >= cars.length && (
              <div className="flex flex-col items-center justify-center pt-8 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-green-600 font-medium mb-2">
                    ✅ All cars loaded!
                  </p>
                  <p className="text-sm text-gray-400 font-medium">
                    Showing all {cars.length} Car{cars.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}
        </section>
      )}

      {/* Empty State */}
      {cars.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cars available
          </h3>
          <p className="text-gray-500 mb-6">
            We&apos;re currently updating our inventory. Please check back soon!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
