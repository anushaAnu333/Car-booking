"use client";

import { useState } from "react";
import {
  Camera,
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Award,
  Car,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main Street, New York, NY 10001",
    driverLicense: "DL123456789",
    licenseExpiry: "2027-05-15",
    memberSince: "2023-01-15",
    totalBookings: 12,
    totalSpent: 2450.0,
    favoriteCarType: "SUV",
    verificationStatus: "verified",
  });

  const [formData, setFormData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profileData);
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    // Here you would typically save to API
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const stats = [
    {
      icon: Car,
      label: "Total Bookings",
      value: profileData.totalBookings.toString(),
      color: "text-blue-600",
    },
    {
      icon: Award,
      label: "Total Spent",
      value: `$${profileData.totalSpent.toFixed(2)}`,
      color: "text-green-600",
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: new Date(profileData.memberSince).getFullYear().toString(),
      color: "text-purple-600",
    },
    {
      icon: Shield,
      label: "Verification",
      value: "Verified",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden mx-auto">
                    <img
                      src="/user-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {profileData.name}
                </h2>
                <p className="text-gray-600">{profileData.email}</p>
                <div className="flex items-center justify-center mt-2">
                  <Shield className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    Verified Account
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white mr-3`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="font-semibold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Loyalty Status */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-900">
                    Gold Member
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  You&apos;re enjoying premium benefits and exclusive offers.
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  $550 more to reach Platinum status
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {new Date(profileData.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {profileData.address}
                      </span>
                    </div>
                  )}
                </div>

                {/* Driver License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver&apos;s License
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.driverLicense}
                      onChange={(e) =>
                        handleChange("driverLicense", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {profileData.driverLicense}
                      </span>
                    </div>
                  )}
                </div>

                {/* License Expiry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Expiry
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.licenseExpiry}
                      onChange={(e) =>
                        handleChange("licenseExpiry", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {new Date(
                          profileData.licenseExpiry
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Preferences
              </h3>

              <div className="space-y-6">
                {/* Favorite Car Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favorite Car Type
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.favoriteCarType}
                      onChange={(e) =>
                        handleChange("favoriteCarType", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Sport">Sport</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Economy">Economy</option>
                    </select>
                  ) : (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Car className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {profileData.favoriteCarType}
                      </span>
                    </div>
                  )}
                </div>

                {/* Communication Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Communication Preferences
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Email notifications for booking updates
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        SMS notifications for important updates
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Marketing and promotional emails
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Account Security
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-900">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-green-700">
                        Your account is protected
                      </p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Login Activity</p>
                    <p className="text-sm text-gray-600">
                      Monitor your account access
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
