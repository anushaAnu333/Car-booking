"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import CarCard from "@/components/CarCard";
import BookingModal from "@/components/BookingModal";
import { Heart, Star } from "lucide-react";

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [recentCars, setRecentCars] = useState<Car[]>([]);
  const [recommendedCars, setRecommendedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch car details
      const carResponse = await fetch(`/api/cars/${id}`);
      if (!carResponse.ok) {
        throw new Error("Car not found");
      }
      const carData = await carResponse.json();
      setCar(carData);
      setIsFavorite(carData.isFavorite || false);

      // Fetch all cars for recommendations
      const recsResponse = await fetch("/api/cars");
      if (recsResponse.ok) {
        const allCars = await recsResponse.json();
        const otherCars = allCars.filter((recCar: Car) => recCar.id !== id);

        // Recent Cars: Get cars of the same type first, then others
        const sameTypeCars = otherCars.filter(
          (recCar: Car) => recCar.type === carData.type
        );
        const differentTypeCars = otherCars.filter(
          (recCar: Car) => recCar.type !== carData.type
        );

        let recentCarsArray = [];
        if (sameTypeCars.length >= 4) {
          recentCarsArray = sameTypeCars.slice(0, 4);
        } else {
          recentCarsArray = [
            ...sameTypeCars,
            ...differentTypeCars.slice(0, 4 - sameTypeCars.length),
          ];
        }

        // Recommended Cars: Get different cars (skip the ones used in recent)
        const usedCarIds = recentCarsArray.map(
          (recentCar: Car) => recentCar.id
        );
        const remainingCars = otherCars.filter(
          (recCar: Car) => !usedCarIds.includes(recCar.id)
        );

        // For recommended, prefer different types or brands
        const differentBrandCars = remainingCars.filter(
          (recCar: Car) => recCar.brand !== carData.brand
        );
        const sameBrandCars = remainingCars.filter(
          (recCar: Car) => recCar.brand === carData.brand
        );

        let recommendedCarsArray = [];
        if (differentBrandCars.length >= 4) {
          recommendedCarsArray = differentBrandCars.slice(0, 4);
        } else {
          recommendedCarsArray = [
            ...differentBrandCars,
            ...sameBrandCars.slice(0, 4 - differentBrandCars.length),
          ];
        }

        setRecentCars(recentCarsArray);
        setRecommendedCars(recommendedCarsArray);
      }
    } catch (error) {
      console.error("Failed to fetch car details:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load car details"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Car Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The car you're looking for doesn't exist."}
          </p>
          <Link
            href="/cars"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Browse All Cars
          </Link>
        </div>
      </div>
    );
  }

  const carImages =
    car.images && car.images.length > 0 ? car.images : [car.image];

  const dynamicReviews = [
    {
      id: 1,
      author: "Alex Stanton",
      role: "CEO at Bukalapak",
      date: "21 July 2022",
      rating: 4,
      content: `We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.`,
      avatar: "AS",
    },
    {
      id: 2,
      author: "Skylar Dias",
      role: "CEO at Amazon",
      date: "20 July 2022",
      rating: 4,
      content: `We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.`,
      avatar: "SD",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Hero Banner Section - Exact Match */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Side - Car Image Display */}
              <div className="lg:col-span-3">
                <div className="bg-transparent rounded-xl relative overflow-hidden w-full min-h-[400px]">
                  {/* Car Image - Prominently displayed */}
                  <div className="relative w-full h-full min-h-[400px] mb-8">
                    <Image
                      src={carImages[selectedImage]}
                      alt={car.name}
                      fill={true}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Car Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {car.name}
                    </h2>
                    <button
                      onClick={toggleFavorite}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}>
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">440+ Reviewer</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    NISMO has become the embodiment of Nissan&apos;s outstanding
                    performance, inspired by the most unforgiving proving
                    ground, the &quot;race track&quot;.
                  </p>

                  {/* Car Specs - 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 text-sm">
                    <div>
                      <span className="text-gray-500 block">Type Car</span>
                      <p className="font-medium text-gray-800">{car.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Capacity</span>
                      <p className="font-medium text-gray-800">
                        {car.capacity} Person
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Steering</span>
                      <p className="font-medium text-gray-800">
                        {car.transmission}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Gasoline</span>
                      <p className="font-medium text-gray-800">{car.fuel}L</p>
                    </div>
                  </div>

                  {/* Price and Rent Button */}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        ${car.price.toFixed(2)}/
                        <span className="text-sm font-normal text-gray-500">
                          days
                        </span>
                      </div>
                      {car.originalPrice && car.originalPrice > car.price && (
                        <div className="text-gray-400 line-through text-sm">
                          ${car.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery - 3 Images in a Row */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl">
              {carImages.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-blue-400"
                  }`}>
                  <Image
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    width={300}
                    height={180}
                    className="w-full h-24 object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                      <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg font-medium">
                        Selected
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg font-medium">
                  {dynamicReviews.length}
                </span>
              </div>

              <div className="space-y-6">
                {dynamicReviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {review.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {review.author}
                          </h4>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">
                            {review.date}
                          </p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full text-center text-blue-600 text-sm mt-6 hover:text-blue-800 font-medium py-2 hover:bg-blue-50 rounded-lg transition">
                Show All
              </button>
            </div>

            {/* Recent Cars Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold text-gray-500">
                  Recent Car
                </h2>
                <Link
                  href="/cars"
                  className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition">
                  View All
                </Link>
              </div>
              {recentCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentCars.map((recCar) => (
                    <CarCard key={recCar.id} car={recCar} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent cars found at the moment.</p>
                </div>
              )}
            </div>

            {/* Recommendation Cars Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold text-gray-500">
                  Recommendation Car
                </h2>
                <Link
                  href="/cars"
                  className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition">
                  View All
                </Link>
              </div>
              {recommendedCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedCars.map((recCar) => (
                    <CarCard key={recCar.id} car={recCar} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recommended cars found at the moment.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Booking Modal */}
      {car && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          car={car}
        />
      )}
    </div>
  );
}
