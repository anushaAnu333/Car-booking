"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Car } from "@/types/car";
import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";
import RentalForm from "@/components/RentalForm";
import { Filter, X, RefreshCw, MapPin, Calendar } from "lucide-react";
import { locations } from "@/data/locations";
import LiveNotification from "@/components/LiveNotification";
import DebugPanel from "@/components/DebugPanel";

// Enhanced interface for search data
interface SearchData {
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  pickupTime?: string;
  dropoffTime?: string;
}

interface AvailabilityData {
  carId: string;
  isAvailable: boolean;
  pricing?: {
    basePrice: number;
    locationFee?: number;
    oneWayFee?: number;
    totalPrice: number;
  };
}

function CarsPageContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>(
    []
  );
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Load cars and handle URL parameters
  useEffect(() => {
    fetchCars();

    // Check if there are search parameters in URL
    const pickupLocation = searchParams.get("pickupLocation");
    const dropoffLocation = searchParams.get("dropoffLocation");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const pickupTime = searchParams.get("pickupTime");
    const dropoffTime = searchParams.get("dropoffTime");

    if (pickupLocation && startDate && endDate) {
      const urlSearchData: SearchData = {
        pickupLocation,
        dropoffLocation: dropoffLocation || pickupLocation,
        startDate,
        endDate,
        pickupTime: pickupTime || "",
        dropoffTime: dropoffTime || "",
      };

      setSearchData(urlSearchData);
      setShowSearchResults(true);
    }
  }, [searchParams]);

  // Check availability when cars are loaded and search data exists
  useEffect(() => {
    if (cars.length > 0 && searchData) {
      checkAvailability(searchData);
    }
  }, [cars, searchData]);

  // Real-time updates - check availability every 30 seconds
  useEffect(() => {
    if (!searchData) return;

    const interval = setInterval(() => {
      checkAvailability(searchData);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [searchData]);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      const data = await response.json();
      setCars(data);
      setFilteredCars(data); // Initially show all cars
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: {
    types: string[];
    capacity: string[];
    maxPrice: number;
  }) => {
    // Start with the base set of cars
    // If search is active, start with only available cars
    // If no search, start with all cars
    let baseCars = cars;

    if (showSearchResults && searchData) {
      // When search is active, only filter within available cars
      const availableCarIds = availabilityData
        .filter((item) => item.isAvailable)
        .map((item) => item.carId);
      baseCars = cars.filter((car) => availableCarIds.includes(car.id));
    }

    let filtered = [...baseCars];

    // Apply type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter((car) => filters.types.includes(car.type));
    }

    // Apply capacity filter
    if (filters.capacity.length > 0) {
      filtered = filtered.filter((car) =>
        filters.capacity.includes(`${car.capacity} Person`)
      );
    }

    // Apply price filter
    filtered = filtered.filter((car) => car.price <= filters.maxPrice);

    setFilteredCars(filtered);
  };

  // Real-time availability checking
  const checkAvailability = async (searchParams: SearchData) => {
    setAvailabilityLoading(true);
    try {
      const response = await fetch("/api/cars/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
          pickupLocation: searchParams.pickupLocation,
          dropoffLocation: searchParams.dropoffLocation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailabilityData(data.results || []);

        // Filter cars to ONLY show available ones
        const availableCarIds =
          data.results
            ?.filter((item: { isAvailable: boolean; carId: string }) => item.isAvailable)
            .map((item: { isAvailable: boolean; carId: string }) => item.carId) || [];

        // Filter cars based on availability - ONLY available cars should be shown
        const availableCars = cars.filter((car) =>
          availableCarIds.includes(car.id)
        );

        // Set filtered cars to ONLY the available ones
        setFilteredCars(availableCars);
        setLastUpdate(new Date());

        // Show appropriate notification
        if (availableCarIds.length > 0) {
          setNotification({
            message: `Found ${availableCarIds.length} available car${
              availableCarIds.length !== 1 ? "s" : ""
            } for your dates`,
            type: "success",
          });
        } else {
          setNotification({
            message:
              "No cars available for the selected dates and location. Please try different dates or locations.",
            type: "info",
          });
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Availability API error:", errorData);

        setNotification({
          message:
            errorData.error ||
            "Failed to check availability. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to check availability:", error);
      setNotification({
        message: "Network error. Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const handleRentalSearch = async (rentalData: SearchData) => {
    setSearchData(rentalData);
    setShowSearchResults(true);

    // Check real-time availability
    await checkAvailability(rentalData);
  };

  const clearSearch = () => {
    setSearchData(null);
    setShowSearchResults(false);
    setAvailabilityData([]);
    setFilteredCars(cars); // Reset to show all cars
    setNotification({
      message: "Search cleared. Showing all cars.",
      type: "info",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading available cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Live Notifications */}
      {notification && (
        <LiveNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Rental Form */}
      <RentalForm onSearch={handleRentalSearch} compact={showSearchResults} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Summary */}
        {showSearchResults && searchData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-blue-900">
                  Search Results
                </h3>
                {availabilityLoading && (
                  <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-blue-900">
                  {filteredCars.length} car
                  {filteredCars.length !== 1 ? "s" : ""} available
                </div>
                <button
                  onClick={() => checkAvailability(searchData)}
                  disabled={availabilityLoading}
                  className="text-sm text-blue-700 hover:text-blue-900 font-medium disabled:opacity-50">
                  Refresh
                </button>
                <button
                  onClick={clearSearch}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                  Clear Search
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center text-blue-700">
                <MapPin className="w-4 h-4 mr-2" />
                <span>
                  <strong>Pickup:</strong>{" "}
                  {locations.find((l) => l.id === searchData.pickupLocation)
                    ?.name || "Unknown"}
                </span>
              </div>

              <div className="flex items-center text-blue-700">
                <MapPin className="w-4 h-4 mr-2" />
                <span>
                  <strong>Dropoff:</strong>{" "}
                  {locations.find((l) => l.id === searchData.dropoffLocation)
                    ?.name || "Same as pickup"}
                </span>
              </div>

              <div className="flex items-center text-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  <strong>From:</strong>{" "}
                  {new Date(searchData.startDate).toLocaleDateString()}
                  {searchData.pickupTime && ` at ${searchData.pickupTime}`}
                </span>
              </div>

              <div className="flex items-center text-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  <strong>To:</strong>{" "}
                  {new Date(searchData.endDate).toLocaleDateString()}
                  {searchData.dropoffTime && ` at ${searchData.dropoffTime}`}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between">
              <p className="text-xs text-blue-600">
                Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refreshes
                every 30 seconds
              </p>

              {searchData.pickupLocation !== searchData.dropoffLocation && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  One-way rental (+$50 fee)
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
              <Filter className="w-6 h-6" />
            </button>
          </div>

          {/* Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Mobile Filter Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            </div>
          )}

          {/* Car Grid */}
          <div className="flex-1" id="car-results">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {showSearchResults ? "Available" : "All"} Cars (
                {filteredCars.length})
              </h2>

              {showSearchResults && (
                <div className="flex items-center space-x-2 text-sm">
                  {availabilityLoading ? (
                    <div className="flex items-center text-blue-600">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      <span>Checking availability...</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span>Live availability</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => {
                  const carAvailability = availabilityData.find(
                    (a) => a.carId === car.id
                  );
                  return (
                    <CarCard
                      key={car.id}
                      car={car}
                      availabilityData={carAvailability}
                      searchDates={
                        searchData
                          ? {
                              startDate: searchData.startDate,
                              endDate: searchData.endDate,
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg
                    className="mx-auto h-20 w-20 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {showSearchResults ? "No cars available" : "No cars found"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {showSearchResults
                    ? "No cars are available for the selected dates and location. Try different dates or locations."
                    : "Try adjusting your filters to see more results."}
                </p>
                {showSearchResults && (
                  <button
                    onClick={clearSearch}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    View All Cars
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Debug Panel */}
      <DebugPanel
        searchData={searchData}
        availabilityData={availabilityData}
        lastUpdate={lastUpdate}
        isLoading={availabilityLoading}
      />
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarsPageContent />
    </Suspense>
  );
}
