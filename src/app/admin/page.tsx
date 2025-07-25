"use client";

import { useEffect, useState } from "react";
import { Car, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalUsers: 0,
    totalRevenue: 0,
    activeRentals: 0,
  });
  const [recentRentals, setRecentRentals] = useState<Array<{
    id: string;
    customer: string;
    car: string;
    startDate: string;
    endDate: string;
    status: string;
    amount: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch cars count
      const carsResponse = await fetch("/api/cars");
      const carsData = await carsResponse.json();

      // Mock data for other stats
      setStats({
        totalCars: carsData.length,
        totalUsers: 1283,
        totalRevenue: 48293,
        activeRentals: 42,
      });

      // Mock recent rentals
      setRecentRentals([
        {
          id: "1",
          customer: "Alex Johnson",
          car: "Koenigsegg",
          startDate: "2024-01-15",
          endDate: "2024-01-20",
          status: "active",
          amount: 495,
        },
        {
          id: "2",
          customer: "Sarah Williams",
          car: "Nissan GT-R",
          startDate: "2024-01-14",
          endDate: "2024-01-17",
          status: "completed",
          amount: 240,
        },
        {
          id: "3",
          customer: "Mike Chen",
          car: "Rolls-Royce",
          startDate: "2024-01-16",
          endDate: "2024-01-18",
          status: "active",
          amount: 192,
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Cars",
      value: stats.totalCars,
      icon: Car,
      color: "bg-blue-500",
      href: "/admin/cars",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "bg-green-500",
      href: "/admin/users",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-purple-500",
      href: "#",
    },
    {
      title: "Active Rentals",
      value: stats.activeRentals,
      icon: TrendingUp,
      color: "bg-orange-500",
      href: "#",
    },
  ];

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Rentals */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Rentals
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Car</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRentals.map(
                (rental: {
                  id: string;
                  customer: string;
                  car: string;
                  startDate: string;
                  endDate: string;
                  amount: number;
                  status: string;
                }) => (
                  <tr key={rental.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{rental.customer}</td>
                    <td className="px-6 py-4 text-sm">{rental.car}</td>
                    <td className="px-6 py-4 text-sm">
                      {rental.startDate} - {rental.endDate}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      ${rental.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          rental.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                        {rental.status}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
