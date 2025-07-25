"use client";

import {
  Search,
  Heart,
  Bell,
  Settings,
  Shield,
  Menu,
  X,
  User,
  LogOut,
  Car,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set("search", searchQuery.trim());
      router.push(`/cars?${searchParams.toString()}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Cars", href: "/cars" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
  ];

  const profileMenuItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "My Bookings", href: "/bookings", icon: Car },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <>
      {/* Backdrop for mobile menu and dropdowns */}
      {(isProfileOpen || isMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                MORENT
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100">
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Admin Link - Hidden on small mobile */}
              <Link
                href="/admin"
                className="hidden sm:block p-2 rounded-full hover:bg-gray-100 relative group"
                title="Admin Dashboard">
                <Shield className="h-5 w-5 text-gray-600" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Admin
                </span>
              </Link>

              {/* Favorites - Hidden on small mobile */}
              <Link
                href="/favorites"
                className="hidden sm:block p-2 rounded-full hover:bg-gray-100 relative group">
                <Heart className="h-5 w-5 text-gray-600" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Favorites
                </span>
              </Link>

              {/* Notifications - Hidden on small mobile */}
              <Link
                href="/notifications"
                className="hidden sm:block p-2 rounded-full hover:bg-gray-100 relative group">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Notifications
                </span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
                  <img
                    src="/user-avatar.svg"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">john@example.com</p>
                    </div>
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Icon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-100 mt-2">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100">
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </form>
            </div>
          )}

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg">
                    {item.name}
                  </Link>
                ))}

                {/* Mobile-only menu items */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg">
                    <Shield className="h-5 w-5 mr-3" />
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/favorites"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg">
                    <Heart className="h-5 w-5 mr-3" />
                    Favorites
                  </Link>
                  <Link
                    href="/notifications"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg">
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
