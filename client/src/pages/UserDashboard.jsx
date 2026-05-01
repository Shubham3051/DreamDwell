import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";
import StatCard from "../components/common/StatCard";
import { Heart, Calendar, MessageCircle, Eye, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    saved: 0,
    bookings: 0,
    messages: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/user/me");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout role="user">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B] mb-2">
              Overview
            </p>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[#1C1B1A]">
              My <span className="text-[#D4755B]">Sanctuary</span>
            </h1>
          </div>
          <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
            Welcome back, {stats.name || "Resident"}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard 
              title="Saved Homes" 
              value={stats.saved} 
              icon={Heart} 
              color="text-[#D4755B]" 
              className="bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <StatCard 
              title="Tour Bookings" 
              value={stats.bookings} 
              icon={Calendar} 
              color="text-[#D4755B]" 
              className="bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <StatCard 
              title="Inquiries" 
              value={stats.messages} 
              icon={MessageCircle} 
              color="text-[#D4755B]" 
              className="bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <StatCard 
              title="Recent Views" 
              value={stats.views} 
              icon={Eye} 
              color="text-[#D4755B]" 
              className="bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            />
          </motion.div>
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#1C1B1A] rounded-3xl p-8 text-white min-h-[300px] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Find your next investment.</h3>
              <p className="text-gray-400 font-light max-w-xs">Our latest exclusive listings in Himachal are now available for viewing.</p>
            </div>
            <button className="relative z-10 flex items-center gap-2 text-[#D4755B] font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
              Browse Properties <ArrowUpRight size={16} />
            </button>
            
            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#D4755B] rounded-full blur-[100px] opacity-20" />
          </div>

          <div className="bg-[#FAF8F4] border border-gray-200 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Calendar className="text-[#D4755B]" />
            </div>
            <h4 className="font-bold text-gray-900">Next Viewing</h4>
            <p className="text-sm text-gray-500 mt-1">No upcoming tours scheduled.</p>
            <button className="mt-6 text-xs font-black uppercase tracking-widest border-b-2 border-[#D4755B] pb-1 hover:text-[#D4755B] transition-colors">
              Schedule Tour
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;