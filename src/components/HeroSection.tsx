import React from "react";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main Hero Content */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
          <span className="text-blue-600 text-sm font-medium">
            Premium Car Rental Service
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Rent Your Dream Car
          <br />
          <span className="text-blue-600">Effortlessly</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience the freedom of the road with our premium fleet. Safe,
          reliable, and affordable car rentals at your fingertips.
        </p>
      </div>
    </div>
  );
}
