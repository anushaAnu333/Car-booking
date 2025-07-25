"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Shield,
  Bell,
  CreditCard,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Eye,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const [settings, setSettings] = useState({
    // Profile settings
    theme: "light",
    language: "en",
    timezone: "America/New_York",
    currency: "USD",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,

    // Privacy settings
    profileVisibility: "private",
    showEmail: false,
    showPhone: false,
    dataSharing: false,

    // Security settings
    twoFactorAuth: true,
    loginAlerts: true,
    autoLogout: 30,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to API
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all settings to default values?"
      )
    ) {
      // Reset to default values
      setSettings({
        theme: "light",
        language: "en",
        timezone: "America/New_York",
        currency: "USD",
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        profileVisibility: "private",
        showEmail: false,
        showPhone: false,
        dataSharing: false,
        twoFactorAuth: true,
        loginAlerts: true,
        autoLogout: 30,
      });
      alert("Settings reset to default values!");
    }
  };

  const tabs = [
    { id: "profile", name: "General", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "privacy", name: "Privacy", icon: Shield },
    { id: "security", name: "Security", icon: Shield },
    { id: "billing", name: "Billing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mr-4">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">
                  Manage your account preferences and settings
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleResetSettings}
                className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}>
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* General Settings */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    General Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Appearance */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Appearance
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Theme
                          </label>
                          <div className="flex gap-3">
                            <button
                              onClick={() =>
                                handleSettingChange("theme", "light")
                              }
                              className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
                                settings.theme === "light"
                                  ? "border-blue-600 bg-blue-50 text-blue-600"
                                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
                              }`}>
                              <Sun className="w-4 h-4 mr-2" />
                              Light
                            </button>
                            <button
                              onClick={() =>
                                handleSettingChange("theme", "dark")
                              }
                              className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
                                settings.theme === "dark"
                                  ? "border-blue-600 bg-blue-50 text-blue-600"
                                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
                              }`}>
                              <Moon className="w-4 h-4 mr-2" />
                              Dark
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={settings.language}
                            onChange={(e) =>
                              handleSettingChange("language", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="it">Italian</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Regional */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Regional
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timezone
                          </label>
                          <select
                            value={settings.timezone}
                            onChange={(e) =>
                              handleSettingChange("timezone", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="America/New_York">
                              Eastern Time (ET)
                            </option>
                            <option value="America/Chicago">
                              Central Time (CT)
                            </option>
                            <option value="America/Denver">
                              Mountain Time (MT)
                            </option>
                            <option value="America/Los_Angeles">
                              Pacific Time (PT)
                            </option>
                            <option value="Europe/London">London (GMT)</option>
                            <option value="Europe/Paris">Paris (CET)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                          </label>
                          <select
                            value={settings.currency}
                            onChange={(e) =>
                              handleSettingChange("currency", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CAD">CAD (C$)</option>
                            <option value="AUD">AUD (A$)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Notification Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Communication
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">
                                Email Notifications
                              </p>
                              <p className="text-sm text-gray-600">
                                Receive notifications via email
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleSettingChange(
                                  "emailNotifications",
                                  !settings.emailNotifications
                                )
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.emailNotifications
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}>
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.emailNotifications
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">
                                Push Notifications
                              </p>
                              <p className="text-sm text-gray-600">
                                Receive push notifications
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleSettingChange(
                                  "pushNotifications",
                                  !settings.pushNotifications
                                )
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.pushNotifications
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}>
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.pushNotifications
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">
                                SMS Notifications
                              </p>
                              <p className="text-sm text-gray-600">
                                Receive text messages
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleSettingChange(
                                  "smsNotifications",
                                  !settings.smsNotifications
                                )
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.smsNotifications
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}>
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.smsNotifications
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Marketing
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">
                                Marketing Emails
                              </p>
                              <p className="text-sm text-gray-600">
                                Promotional offers and updates
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleSettingChange(
                                  "marketingEmails",
                                  !settings.marketingEmails
                                )
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.marketingEmails
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}>
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  settings.marketingEmails
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Privacy Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Profile Visibility
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Visibility
                          </label>
                          <select
                            value={settings.profileVisibility}
                            onChange={(e) =>
                              handleSettingChange(
                                "profileVisibility",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="friends">Friends Only</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              Show Email Address
                            </p>
                            <p className="text-sm text-gray-600">
                              Allow others to see your email
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleSettingChange(
                                "showEmail",
                                !settings.showEmail
                              )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.showEmail ? "bg-blue-600" : "bg-gray-300"
                            }`}>
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.showEmail
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              Show Phone Number
                            </p>
                            <p className="text-sm text-gray-600">
                              Allow others to see your phone
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleSettingChange(
                                "showPhone",
                                !settings.showPhone
                              )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.showPhone ? "bg-blue-600" : "bg-gray-300"
                            }`}>
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.showPhone
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Data & Analytics
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            Data Sharing
                          </p>
                          <p className="text-sm text-gray-600">
                            Share usage data to improve services
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(
                              "dataSharing",
                              !settings.dataSharing
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.dataSharing ? "bg-blue-600" : "bg-gray-300"
                          }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.dataSharing
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Authentication
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              Two-Factor Authentication
                            </p>
                            <p className="text-sm text-gray-600">
                              Add an extra layer of security
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleSettingChange(
                                "twoFactorAuth",
                                !settings.twoFactorAuth
                              )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.twoFactorAuth
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}>
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.twoFactorAuth
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              Login Alerts
                            </p>
                            <p className="text-sm text-gray-600">
                              Get notified of new sign-ins
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleSettingChange(
                                "loginAlerts",
                                !settings.loginAlerts
                              )
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.loginAlerts
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}>
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.loginAlerts
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Session Management
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auto-logout (minutes)
                        </label>
                        <select
                          value={settings.autoLogout}
                          onChange={(e) =>
                            handleSettingChange(
                              "autoLogout",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={120}>2 hours</option>
                          <option value={0}>Never</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Password
                      </h3>
                      <div className="space-y-4">
                        <button className="flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                          <Shield className="w-5 h-5 mr-2" />
                          Change Password
                        </button>
                        <button className="flex items-center px-4 py-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye className="w-5 h-5 mr-2" />
                          View Login Activity
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === "billing" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Billing & Payment
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Payment Methods
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                              <div>
                                <p className="font-medium text-gray-900">
                                  •••• •••• •••• 4242
                                </p>
                                <p className="text-sm text-gray-600">
                                  Expires 12/25
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                          + Add New Payment Method
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Billing History
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            date: "2024-02-01",
                            amount: "$240.00",
                            description: "Car Rental - Nissan GT-R",
                          },
                          {
                            date: "2024-01-15",
                            amount: "$180.00",
                            description: "Car Rental - BMW X5",
                          },
                          {
                            date: "2023-12-20",
                            amount: "$320.00",
                            description: "Car Rental - Mercedes S-Class",
                          },
                        ].map((invoice, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">
                                {invoice.description}
                              </p>
                              <p className="text-sm text-gray-600">
                                {invoice.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900">
                                {invoice.amount}
                              </span>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
