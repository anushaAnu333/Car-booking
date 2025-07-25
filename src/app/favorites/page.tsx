"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  Filter,
  Grid,
  List,
  Trash2,
  Share2,
} from "lucide-react";
import CarCard from "@/components/CarCard";
import { Car } from "@/types/car";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      // Simulate API call - in real app, this would fetch user's favorites
      const response = await fetch("/api/cars");
      const allCars = await response.json();
      // Simulate some cars being favorited
      const favoriteCars = allCars.slice(0, 6).map((car: Car) => ({
        ...car,
        isFavorite: true,
      }));
      setFavorites(favoriteCars);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (carId: string) => {
    setFavorites(favorites.filter((car) => car.id !== carId));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      setFavorites([]);
    }
  };

  const filteredFavorites = favorites.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      car.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return a.price - b.price;
      case "type":
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const carTypes = [...new Set(favorites.map((car) => car.type))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mr-4">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  My Favorites
                </h1>
                <p className="text-gray-600">
                  {favorites.length} {favorites.length === 1 ? "car" : "cars"}{" "}
                  saved
                </p>
              </div>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Favorites Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start browsing cars and click the heart icon to save your
                favorites here.
              </p>
              <Link
                href="/cars"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Cars
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Filters and Search */}
            <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 lg:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search favorites..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Filter by Type */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="all">All Types</option>
                    {carTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="type">Sort by Type</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedFavorites.length} of {favorites.length} favorites
                {searchQuery && ` for "${searchQuery}"`}
                {filterType !== "all" && ` in ${filterType}`}
              </p>
            </div>

            {/* Cars Grid/List */}
            {sortedFavorites.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No matches found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                {sortedFavorites.map((car) => (
                  <div key={car.id} className="relative group">
                    <CarCard car={car} />

                    {/* Favorite Actions Overlay */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveFavorite(car.id)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Remove from favorites">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: car.name,
                                text: `Check out this ${car.name} on MORENT`,
                                url: `${window.location.origin}/cars/${car.id}`,
                              });
                            } else {
                              // Fallback for browsers that don't support Web Share API
                              navigator.clipboard.writeText(
                                `${window.location.origin}/cars/${car.id}`
                              );
                              alert("Link copied to clipboard!");
                            }
                          }}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Share car">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Love these cars?
              </h3>
              <p className="text-gray-600 mb-4">
                Share your favorites with friends or start booking your next
                rental.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const favoritesText = sortedFavorites
                      .map((car) => `${car.name} - $${car.price}/day`)
                      .join("\n");

                    if (navigator.share) {
                      navigator.share({
                        title: "My Favorite Cars on MORENT",
                        text: `Check out my favorite cars:\n\n${favoritesText}`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(
                        `My Favorite Cars:\n\n${favoritesText}`
                      );
                      alert("Favorites list copied to clipboard!");
                    }
                  }}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Favorites
                </button>
                <Link
                  href="/cars"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Browse More Cars
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
