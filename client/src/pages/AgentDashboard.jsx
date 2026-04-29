import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";
import StatCard from "../components/common/StatCard";
import { Home, Users, Calendar, DollarSign } from "lucide-react";
import { useSocket } from "../hooks/useSocket";
import axios from "axios";
import { toast } from "react-toastify";

const AgentDashboard = () => {
  const socketRef = useSocket();

  const [stats, setStats] = useState({
    properties: 0,
    leads: 0,
    appointments: 0,
    earnings: 0,
  });

  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial stats
    const fetchAgentStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/user/agent-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats({
          properties: res.data.properties || 0,
          leads: res.data.leads || 0,
          appointments: res.data.appointments || 0,
          earnings: res.data.earnings || 0,
        });
      } catch (err) {
        console.error("Error fetching agent stats:", err);
      }
    };
    fetchAgentStats();

    if (!socketRef.current) return;

    const socket = socketRef.current;

    // ✅ Listen for updates
    socket.on("statsUpdate", (data) => {
      setStats({
        properties: data?.properties || 0,
        leads: data?.leads || 0,
        appointments: data?.appointments || 0,
        earnings: data?.earnings || 0,
      });
    });

    // ✅ Cleanup listener ONLY
    return () => {
      socket.off("statsUpdate");
    };
  }, [socketRef]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/bookings/agent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setBookingsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleBookingAction = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:8000/api/bookings/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status } : b
          )
        );
        toast.success(`Booking ${status}`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <DashboardLayout role="agent">
      <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Properties" value={stats.properties} icon={Home} color="text-orange-500" />
        <StatCard title="Leads" value={stats.leads} icon={Users} color="text-blue-500" />
        <StatCard title="Appointments" value={bookings.length} icon={Calendar} color="text-green-500" />
        <StatCard title="Earnings" value={`₹${stats.earnings}`} icon={DollarSign} color="text-purple-500" />
      </div>

      {/* BOOKINGS SECTION */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Visit Bookings</h2>

        {bookingsLoading ? (
          <p className="text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const imageUrl = Array.isArray(booking.property?.image)
                ? booking.property.image[0]
                : booking.property?.image;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4"
                >
                  {/* Property image */}
                  {imageUrl && (
                    <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {booking.property?.title || "Property"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      📍 {booking.property?.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      👤 {booking.user?.name} ({booking.user?.email})
                    </p>
                    <p className="text-sm text-gray-600">
                      📞 {booking.phone} &nbsp;|&nbsp;
                      📅 {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                    {booking.message && (
                      <p className="text-sm text-gray-500 mt-1 italic">
                        "{booking.message}"
                      </p>
                    )}
                  </div>

                  {/* Status + Actions */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[booking.status]}`}>
                      {booking.status.toUpperCase()}
                    </span>

                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBookingAction(booking._id, "confirmed")}
                          className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleBookingAction(booking._id, "cancelled")}
                          className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;