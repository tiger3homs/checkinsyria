"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AdminNavbar from "@/components/AdminNavbar";
import { Users, BedDouble, CalendarCheck, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", bookings: 65 },
  { name: "Feb", bookings: 59 },
  { name: "Mar", bookings: 80 },
  { name: "Apr", bookings: 81 },
  { name: "May", bookings: 56 },
  { name: "Jun", bookings: 55 },
];

const stats = [
  {
    name: "Total Bookings",
    value: "396",
    change: "+12%",
    icon: CalendarCheck,
  },
  {
    name: "Active Rooms",
    value: "48",
    change: "+4",
    icon: BedDouble,
  },
  {
    name: "Total Guests",
    value: "892",
    change: "+18%",
    icon: Users,
  },
  {
    name: "Revenue",
    value: "$48,294",
    change: "+8%",
    icon: TrendingUp,
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Dashboard Overview
          </h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.name}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.name}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-500 text-sm font-medium">
                      {stat.change}
                    </span>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      from last month
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Booking Trends
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#0D9488"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  {
                    action: "New Booking",
                    details: "Room 304 booked for 3 nights",
                    time: "5 minutes ago",
                  },
                  {
                    action: "Room Status Updated",
                    details: "Room 201 marked as available",
                    time: "1 hour ago",
                  },
                  {
                    action: "Payment Received",
                    details: "Booking #12345 payment confirmed",
                    time: "2 hours ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.details}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}