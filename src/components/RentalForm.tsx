"use client";

import { ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Location } from "@/types/api";

interface SearchData {
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  pickupTime?: string;
  dropoffTime?: string;
}

interface RentalFormProps {
  onSearch?: (searchData: SearchData) => void;
  compact?: boolean;
}

export default function RentalForm({
  onSearch,
  compact = false,
}: RentalFormProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "",
    dropoffTime: "",
  });

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations?active=true");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSwapLocations = () => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: prev.dropoffLocation,
      dropoffLocation: prev.pickupLocation,
    }));
  };

  const handleSearch = async () => {
    // Validation
    if (!formData.pickupLocation) {
      alert("Please select a pickup location");
      return;
    }

    if (!formData.pickupDate) {
      alert("Please select a pickup date");
      return;
    }

    if (!formData.dropoffDate) {
      alert("Please select a dropoff date");
      return;
    }

    // Validate dates
    const pickupDate = new Date(formData.pickupDate);
    const dropoffDate = new Date(formData.dropoffDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickupDate < today) {
      alert("Pickup date cannot be in the past");
      return;
    }

    if (dropoffDate <= pickupDate) {
      alert("Dropoff date must be after pickup date");
      return;
    }

    setLoading(true);

    const searchData = {
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation || formData.pickupLocation,
      startDate: formData.pickupDate,
      endDate: formData.dropoffDate,
      pickupTime: formData.pickupTime,
      dropoffTime: formData.dropoffTime,
    };

    // If onSearch callback is provided, use it (for cars page)
    if (onSearch) {
      onSearch(searchData);
      setLoading(false);
      return;
    }

    // Otherwise, redirect to cars page (for homepage)
    try {
      const params = new URLSearchParams(searchData);
      window.location.href = `/cars?${params.toString()}`;
    } catch (error) {
      console.error("Failed to search:", error);
      alert("Failed to search. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        compact ? "py-4" : "py-8"
      }`}>
      <div
        className={`grid grid-cols-1 ${
          compact ? "md:grid-cols-2" : "lg:grid-cols-2"
        } gap-${compact ? "4" : "6"} relative`}>
        {/* Pick-Up Section */}
        <div
          className={`bg-white rounded-xl ${
            compact ? "p-4" : "p-6"
          } shadow-sm border border-gray-100`}>
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-75"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pick - Up</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Locations
              </label>
              <select
                value={formData.pickupLocation}
                onChange={(e) =>
                  handleInputChange("pickupLocation", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                disabled={loading}>
                <option value="">Select pickup location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  handleInputChange("pickupDate", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) =>
                  handleInputChange("pickupTime", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10">
          <button
            onClick={handleSwapLocations}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 group"
            title="Swap pickup and dropoff locations">
            <ArrowUpDown className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Drop-Off Section */}
        <div
          className={`bg-white rounded-xl ${
            compact ? "p-4" : "p-6"
          } shadow-sm border border-gray-100`}>
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 bg-blue-100 rounded-full mr-3 border-2 border-blue-500 relative">
              <div className="absolute inset-0.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Drop - Off</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Locations
              </label>
              <select
                value={formData.dropoffLocation}
                onChange={(e) =>
                  handleInputChange("dropoffLocation", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                disabled={loading}>
                <option value="">Select dropoff location (optional)</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.dropoffDate}
                onChange={(e) =>
                  handleInputChange("dropoffDate", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={
                  formData.pickupDate || new Date().toISOString().split("T")[0]
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.dropoffTime}
                onChange={(e) =>
                  handleInputChange("dropoffTime", e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className={`flex justify-center ${compact ? "mt-4" : "mt-8"}`}>
        <button
          onClick={handleSearch}
          disabled={
            loading ||
            !formData.pickupLocation ||
            !formData.pickupDate ||
            !formData.dropoffDate
          }
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? "Loading..." : "Search Available Cars"}
        </button>
      </div>
    </div>
  );
}
