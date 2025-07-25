"use client";

import { useState, useEffect } from "react";
import { X, Calendar, CreditCard, MapPin } from "lucide-react";
import { Car } from "@/types/car";
import { Location } from "@/types/api";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  dropoffTime: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  car,
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupTime: "",
    dropoffTime: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen]);

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations?active=true");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = async () => {
    try {
      // Validate required fields
      if (
        !formData.pickupLocation ||
        !formData.dropoffLocation ||
        !formData.startDate ||
        !formData.endDate
      ) {
        alert("Please fill in all required fields");
        return;
      }

      // Create rental booking
      const rentalData = {
        carId: car.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
      };

      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Note: In a real app, you'd include authentication headers here
        },
        body: JSON.stringify(rentalData),
      });

      if (response.ok) {
        const rental = await response.json();
        console.log("Booking created:", rental);
        alert(
          `Booking confirmed! Confirmation ID: ${rental.id}. You will receive a confirmation email shortly.`
        );

        onClose();
        setCurrentStep(1);
        setFormData({
          name: "",
          email: "",
          phone: "",
          startDate: "",
          endDate: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupTime: "",
          dropoffTime: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardName: "",
        });
      } else {
        const error = await response.json();
        alert(`Booking failed: ${error.error || "Please try again"}`);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed due to a network error. Please try again.");
    }
  };

  if (!isOpen) return null;

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const totalAmount = car.price * calculateDays();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Complete Your Booking
            </h2>
            <p className="text-gray-600">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                    {step}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step ? "text-blue-600" : "text-gray-500"
                    }`}>
                    {step === 1 && "Personal Info"}
                    {step === 2 && "Rental Details"}
                    {step === 3 && "Payment"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Rental Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Rental Details
              </h3>

              {/* Location Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Pickup Location *
                  </label>
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) =>
                      handleInputChange("pickupLocation", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select pickup location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} - {location.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Dropoff Location *
                  </label>
                  <select
                    value={formData.dropoffLocation}
                    onChange={(e) =>
                      handleInputChange("dropoffLocation", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select dropoff location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} - {location.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={
                      formData.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    required
                  />
                </div>
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) =>
                      handleInputChange("pickupTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dropoff Time
                  </label>
                  <input
                    type="time"
                    value={formData.dropoffTime}
                    onChange={(e) =>
                      handleInputChange("dropoffTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Rental Summary */}
              <div className="bg-transparent border border-gray-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Rental Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Car:</span>
                    <span className="font-medium">{car.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {calculateDays()} day{calculateDays() !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per day:</span>
                    <span className="font-medium">${car.price}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold text-blue-600">
                        ${totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) =>
                      handleInputChange("cardName", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name on card"
                    required
                  />
                </div>
              </div>

              {/* Final Summary */}
              <div className="bg-transparent border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Final Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Car: {car.name}</span>
                    <span>
                      {calculateDays()} day{calculateDays() !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">${totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={currentStep === 1 ? onClose : handlePrevStep}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              {currentStep === 1 ? "Cancel" : "Previous"}
            </button>

            <button
              onClick={currentStep === 3 ? handleBooking : handleNextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {currentStep === 3 ? "Complete Booking" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
