"use client";

import { useState, useEffect } from "react";

interface FilterOption {
  name: string;
  count: number;
}

interface FilterData {
  carTypes: FilterOption[];
  capacityOptions: FilterOption[];
  priceRange: {
    min: number;
    max: number;
  };
  totalCars: number;
}

interface FilterOptions {
  types: string[];
  capacity: string[];
  maxPrice: number;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterData();
  }, []);

  const fetchFilterData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars/filters");
      if (response.ok) {
        const data = await response.json();
        setFilterData(data);
        // Set initial max price to the maximum available price
        setMaxPrice(data.priceRange.max);

        // Call onFilterChange with initial values
        if (onFilterChange) {
          onFilterChange({
            types: [],
            capacity: [],
            maxPrice: data.priceRange.max,
          });
        }
      } else {
        console.error("Failed to fetch filter data");
      }
    } catch (error) {
      console.error("Error fetching filter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);

    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        types: newTypes,
        capacity: selectedCapacity,
        maxPrice,
      });
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const newCapacity = selectedCapacity.includes(capacity)
      ? selectedCapacity.filter((c) => c !== capacity)
      : [...selectedCapacity, capacity];
    setSelectedCapacity(newCapacity);

    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        types: selectedTypes,
        capacity: newCapacity,
        maxPrice,
      });
    }
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);

    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        types: selectedTypes,
        capacity: selectedCapacity,
        maxPrice: price,
      });
    }
  };

  if (loading) {
    return (
      <div className="w-64 bg-white p-6 rounded-lg h-fit border border-gray-100 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!filterData) {
    return (
      <div className="w-64 bg-white p-6 rounded-lg h-fit border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm">Failed to load filters</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white p-6 rounded-lg h-fit border border-gray-100 shadow-sm">
      {/* Type Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
          TYPE
        </h3>
        <div className="space-y-4">
          {filterData.carTypes.map((type) => (
            <label
              key={type.name}
              className="flex items-center cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1 rounded-md transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.name)}
                  onChange={() => handleTypeChange(type.name)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedTypes.includes(type.name)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}>
                  {selectedTypes.includes(type.name) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className={`ml-3 text-sm font-medium transition-colors ${
                  selectedTypes.includes(type.name)
                    ? "text-gray-900"
                    : "text-gray-600"
                }`}>
                {type.name}
              </span>
              <span className="ml-auto text-sm text-gray-400 font-medium">
                ({type.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
          CAPACITY
        </h3>
        <div className="space-y-4">
          {filterData.capacityOptions.map((option) => (
            <label
              key={option.name}
              className="flex items-center cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1 rounded-md transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCapacity.includes(option.name)}
                  onChange={() => handleCapacityChange(option.name)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedCapacity.includes(option.name)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}>
                  {selectedCapacity.includes(option.name) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className={`ml-3 text-sm font-medium transition-colors ${
                  selectedCapacity.includes(option.name)
                    ? "text-gray-900"
                    : "text-gray-600"
                }`}>
                {option.name}
              </span>
              <span className="ml-auto text-sm text-gray-400 font-medium">
                ({option.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
          PRICE
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="range"
              min={filterData.priceRange.min}
              max={filterData.priceRange.max}
              value={maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <style jsx>{`
              .slider::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
              }
              .slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
              }
            `}</style>
          </div>
          <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
            <span className="text-sm font-semibold text-gray-700">
              Max. <span className="text-blue-600">${maxPrice}.00</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
