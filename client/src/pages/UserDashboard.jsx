import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";
import StatCard from "../components/common/StatCard";
import { Heart, Calendar, MessageCircle, Eye } from "lucide-react";
import axios from "axios";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    saved: 0,
    bookings: 0,
    messages: 0,
    views: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/user/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout role="user">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#FAF8F4]">
        <StatCard
          title="Saved Properties"
          value={stats.saved}
          icon={Heart}
          color="text-red-500"
        />
        <StatCard
          title="Bookings"
          value={stats.bookings}
          icon={Calendar}
          color="text-green-500"
        />
        <StatCard
          title="Messages"
          value={stats.messages}
          icon={MessageCircle}
          color="text-blue-500"
        />
        <StatCard
          title="Property Views"
          value={stats.views}
          icon={Eye}
          color="text-purple-500"
        />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;