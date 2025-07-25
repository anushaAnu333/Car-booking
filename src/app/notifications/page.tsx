"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Check,
  Trash2,
  Filter,
  Car,
  Calendar,
  CreditCard,
  Gift,
  CheckCircle,
  Info,
} from "lucide-react";

interface Notification {
  id: string;
  type: "booking" | "payment" | "reminder" | "promotion" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    | "all"
    | "unread"
    | "booking"
    | "payment"
    | "reminder"
    | "promotion"
    | "system"
  >("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "booking",
          title: "Booking Confirmed",
          message:
            "Your booking for Nissan GT-R has been confirmed for February 15, 2024.",
          timestamp: "2024-02-01T10:30:00Z",
          read: false,
          priority: "high",
        },
        {
          id: "2",
          type: "reminder",
          title: "Rental Start Reminder",
          message:
            "Your Nissan GT-R rental starts tomorrow. Please ensure you have all required documents ready.",
          timestamp: "2024-02-14T18:00:00Z",
          read: false,
          priority: "high",
        },
        {
          id: "3",
          type: "payment",
          title: "Payment Processed",
          message:
            "Your payment of $240.00 has been successfully processed for booking #MR-BK-001-2024.",
          timestamp: "2024-02-01T10:35:00Z",
          read: true,
          priority: "medium",
        },
        {
          id: "4",
          type: "promotion",
          title: "Special Offer - 20% Off",
          message:
            "Get 20% off your next booking! Use code SAVE20 at checkout. Valid until February 29, 2024.",
          timestamp: "2024-02-10T09:00:00Z",
          read: false,
          priority: "low",
        },
        {
          id: "5",
          type: "system",
          title: "Account Verification Complete",
          message:
            "Your driver's license has been verified successfully. You can now book premium vehicles.",
          timestamp: "2024-01-20T14:20:00Z",
          read: true,
          priority: "medium",
        },
        {
          id: "6",
          type: "booking",
          title: "Booking Cancelled",
          message:
            "Your booking for Koenigsegg has been cancelled as requested. Refund will be processed in 3-5 business days.",
          timestamp: "2024-01-25T16:45:00Z",
          read: true,
          priority: "medium",
        },
        {
          id: "7",
          type: "reminder",
          title: "Return Reminder",
          message:
            "Please return your Rolls-Royce by 12:00 PM today to avoid late fees.",
          timestamp: "2024-02-12T08:00:00Z",
          read: false,
          priority: "high",
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Car className="w-5 h-5" />;
      case "payment":
        return <CreditCard className="w-5 h-5" />;
      case "reminder":
        return <Calendar className="w-5 h-5" />;
      case "promotion":
        return <Gift className="w-5 h-5" />;
      case "system":
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600 bg-red-100";

    switch (type) {
      case "booking":
        return "text-blue-600 bg-blue-100";
      case "payment":
        return "text-green-600 bg-green-100";
      case "reminder":
        return "text-orange-600 bg-orange-100";
      case "promotion":
        return "text-purple-600 bg-purple-100";
      case "system":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
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
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4 relative">
                <Bell className="w-6 h-6 text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-600">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${
                        unreadCount !== 1 ? "s" : ""
                      }`
                    : "All caught up!"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All Read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="flex items-center mr-4">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "unread", label: "Unread", count: unreadCount },
              {
                key: "booking",
                label: "Bookings",
                count: notifications.filter((n) => n.type === "booking").length,
              },
              {
                key: "payment",
                label: "Payments",
                count: notifications.filter((n) => n.type === "payment").length,
              },
              {
                key: "reminder",
                label: "Reminders",
                count: notifications.filter((n) => n.type === "reminder")
                  .length,
              },
              {
                key: "promotion",
                label: "Promotions",
                count: notifications.filter((n) => n.type === "promotion")
                  .length,
              },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === filterOption.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}>
                {filterOption.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === filterOption.key
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                  {filterOption.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {filter === "all"
                ? "No Notifications"
                : `No ${filter} Notifications`}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              {filter === "all"
                ? "You're all caught up! New notifications will appear here."
                : `You don't have any ${filter} notifications at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border border-gray-100 overflow-hidden transition-all hover:shadow-md ${
                  !notification.read ? "border-l-4 border-l-blue-600" : ""
                }`}>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${getNotificationColor(
                          notification.type,
                          notification.priority
                        )}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <h3
                            className={`text-lg font-semibold mr-3 ${
                              !notification.read
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p
                          className={`text-sm mb-3 ${
                            !notification.read
                              ? "text-gray-700"
                              : "text-gray-600"
                          }`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                              notification.priority
                            )}`}>
                            {notification.priority.charAt(0).toUpperCase() +
                              notification.priority.slice(1)}{" "}
                            Priority
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as read">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete notification">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notification Settings */}
        {notifications.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Notification Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Booking confirmations and updates
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Payment receipts and reminders
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Promotional offers
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Push Notifications
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Rental start and end reminders
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Important account updates
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Special deals and discounts
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
