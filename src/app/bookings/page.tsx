"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Car,
  Eye,
  Download,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface Booking {
  id: string;
  carName: string;
  carImage: string;
  carType: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: "upcoming" | "active" | "completed" | "cancelled";
  bookingDate: string;
  confirmationNumber: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "all" | "upcoming" | "active" | "completed" | "cancelled"
  >("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockBookings: Booking[] = [
        {
          id: "BK001",
          carName: "Nissan GT-R",
          carImage: "/cars/hero-car-1.svg",
          carType: "Sport",
          startDate: "2024-02-15",
          endDate: "2024-02-18",
          totalAmount: 240.0,
          status: "upcoming",
          bookingDate: "2024-02-01",
          confirmationNumber: "MR-BK-001-2024",
        },
        {
          id: "BK002",
          carName: "Koenigsegg",
          carImage: "/cars/hero-car-2.svg",
          carType: "Sport",
          startDate: "2024-01-20",
          endDate: "2024-01-25",
          totalAmount: 500.0,
          status: "completed",
          bookingDate: "2024-01-10",
          confirmationNumber: "MR-BK-002-2024",
        },
        {
          id: "BK003",
          carName: "Rolls-Royce",
          carImage: "/cars/placeholder.svg",
          carType: "Luxury",
          startDate: "2024-02-10",
          endDate: "2024-02-12",
          totalAmount: 180.0,
          status: "active",
          bookingDate: "2024-01-25",
          confirmationNumber: "MR-BK-003-2024",
        },
      ];

      setBookings(mockBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Calendar className="w-4 h-4" />;
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(
    (booking) => activeTab === "all" || booking.status === activeTab
  );

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage and track all your car rental bookings
          </p>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { key: "all", label: "All Bookings", count: bookings.length },
                {
                  key: "upcoming",
                  label: "Upcoming",
                  count: bookings.filter((b) => b.status === "upcoming").length,
                },
                {
                  key: "active",
                  label: "Active",
                  count: bookings.filter((b) => b.status === "active").length,
                },
                {
                  key: "completed",
                  label: "Completed",
                  count: bookings.filter((b) => b.status === "completed")
                    .length,
                },
                {
                  key: "cancelled",
                  label: "Cancelled",
                  count: bookings.filter((b) => b.status === "cancelled")
                    .length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}>
                  {tab.label}
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.key
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === "all"
                  ? "You haven't made any bookings yet."
                  : `No ${activeTab} bookings found.`}
              </p>
              <button
                onClick={() => (window.location.href = "/cars")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Cars
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.carImage}
                        alt={booking.carName}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.carName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {booking.carType} • Booking #
                          {booking.confirmationNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">
                          {booking.status}
                        </span>
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${booking.totalAmount}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p>
                          {new Date(booking.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">End Date</p>
                        <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p>
                          {calculateDuration(
                            booking.startDate,
                            booking.endDate
                          )}{" "}
                          day
                          {calculateDuration(
                            booking.startDate,
                            booking.endDate
                          ) !== 1
                            ? "s"
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">Booked On</p>
                        <p>
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </button>
                    </div>

                    {booking.status === "upcoming" && (
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                          Modify
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Booking Details
                </h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Car Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Car Information
                  </h3>
                  <div className="flex items-center space-x-4 p-4 bg-transparent border border-gray-200 rounded-lg">
                    <img
                      src={selectedBooking.carImage}
                      alt={selectedBooking.carName}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {selectedBooking.carName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {selectedBooking.carType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Rental Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-500">Start Date:</span>{" "}
                        {new Date(
                          selectedBooking.startDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="text-gray-500">End Date:</span>{" "}
                        {new Date(selectedBooking.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="text-gray-500">Duration:</span>{" "}
                        {calculateDuration(
                          selectedBooking.startDate,
                          selectedBooking.endDate
                        )}{" "}
                        day
                        {calculateDuration(
                          selectedBooking.startDate,
                          selectedBooking.endDate
                        ) !== 1
                          ? "s"
                          : ""}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-500">Booking Date:</span>{" "}
                        {new Date(
                          selectedBooking.bookingDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="text-gray-500">
                          Confirmation Number:
                        </span>{" "}
                        {selectedBooking.confirmationNumber}
                      </p>
                      <p>
                        <span className="text-gray-500">Status:</span>{" "}
                        <span
                          className={`capitalize font-medium ${
                            selectedBooking.status === "completed"
                              ? "text-green-600"
                              : selectedBooking.status === "active"
                              ? "text-blue-600"
                              : selectedBooking.status === "upcoming"
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}>
                          {selectedBooking.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Payment Summary
                  </h4>
                  <div className="bg-transparent border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">
                        ${selectedBooking.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Download Receipt
                  </button>
                  {selectedBooking.status === "upcoming" && (
                    <>
                      <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                        Modify Booking
                      </button>
                      <button className="flex-1 border border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors">
                        Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
