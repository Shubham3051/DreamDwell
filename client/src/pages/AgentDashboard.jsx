import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { 
  Home, 
  Users, 
  Calendar, 
  DollarSign, 
  Check, 
  X, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Activity 
} from "lucide-react";

// Internal Components & Hooks
import DashboardLayout from "../components/common/DashboardLayout";
import StatCard from "../components/common/StatCard";
import { useSocket } from "../hooks/useSocket";
import { cn } from "../lib/utils";

const AgentDashboard = () => {
  const socketRef = useSocket();
  const navigate = useNavigate();
  
  // State Management
  const [stats, setStats] = useState({ properties: 0, leads: 0, appointments: 0, earnings: 0 });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Live Stats & Socket Sync
  useEffect(() => {
    const fetchAgentStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/user/agent-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching agent stats:", err);
      }
    };

    fetchAgentStats();

    // Socket Event Listener
    if (socketRef.current) {
      const socket = socketRef.current;
      socket.on("statsUpdate", (data) => {
        setStats(prev => ({ ...prev, ...data }));
      });
      return () => socket.off("statsUpdate");
    }
  }, [socketRef]);

  // 2. Fetch Pending/Confirmed Bookings
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
        toast.error("Network error: Could not load visits");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // 3. Action Handlers (Approve/Reject)
  const handleBookingAction = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:8000/api/bookings/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.status === 200) {
        setBookings((prev) => 
          prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
        );
        toast.success(`Visit ${status === 'confirmed' ? 'Approved' : 'Declined'}`);
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
    }
  };

  // 4. Contact Navigation (Fixes 404)
  const openChat = (userId) => {
    if (!userId) return toast.error("User details missing");
    // CRITICAL: Path must match your App.jsx route exactly
    navigate(`/dashboard/messages?recipientId=${userId}`);
  };

  const statusStyles = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <DashboardLayout role="agent">
      <div className="max-w-7xl mx-auto space-y-10 pb-20">
        
        {/* Branding Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B] mb-2">Internal Terminal</p>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[#1C1B1A]">
              Agent <span className="text-[#D4755B]">Command</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sync Active</span>
          </div>
        </header>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Portfolio" value={stats.properties} icon={Home} color="text-[#D4755B]" />
          <StatCard title="Total Leads" value={stats.leads} icon={Users} color="text-[#D4755B]" />
          <StatCard title="Visits" value={bookings.length} icon={Calendar} color="text-[#D4755B]" />
          <StatCard title="Total Revenue" value={`₹${stats.earnings?.toLocaleString()}`} icon={DollarSign} color="text-[#D4755B]" />
        </div>

        {/* Bookings Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1C1B1A] flex items-center gap-3">
              <Activity size={18} className="text-[#D4755B]" /> Request Feed
            </h2>
            <div className="h-px flex-1 bg-gray-100 mx-6 hidden md:block" />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#D4755B] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-[#FAF8F4] rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Zero pending requests</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {bookings.map((booking, idx) => (
                  <motion.div
                    key={booking._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-[#D4755B]/20 hover:shadow-2xl transition-all flex flex-col lg:flex-row items-center gap-8"
                  >
                    {/* Image Preview */}
                    <div className="w-full lg:w-44 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img 
                        src={Array.isArray(booking.property?.image) ? booking.property.image[0] : booking.property?.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-duration-700" 
                        alt="" 
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-black italic uppercase text-lg text-[#1C1B1A]">{booking.property?.title}</h3>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                            <MapPin size={10} /> {booking.property?.location}
                          </p>
                        </div>
                        <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", statusStyles[booking.status])}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Prospect</span>
                          <p className="text-xs font-black text-[#1C1B1A]">{booking.user?.name}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Schedule</span>
                          <p className="text-xs font-black text-[#1C1B1A]">
                            {new Date(booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} • {booking.time}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Phone</span>
                          <p className="text-xs font-black text-[#1C1B1A]">{booking.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Hub */}
                    <div className="flex lg:flex-col gap-2 w-full lg:w-40 shrink-0">
                      {booking.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleBookingAction(booking._id, "confirmed")}
                            className="flex-1 py-3 bg-[#D4755B] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1C1B1A] transition-all flex items-center justify-center gap-2"
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking._id, "cancelled")}
                            className="flex-1 py-3 bg-white text-rose-500 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                          >
                            <X size={14} /> Decline
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => openChat(booking.user?._id)}
                          className="flex-1 py-3 bg-[#1C1B1A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#D4755B] transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 group"
                        >
                          <MessageSquare size={14} className="group-hover:rotate-12 transition-transform" /> 
                          Contact
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;






// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../components/common/DashboardLayout";
// import StatCard from "../components/common/StatCard";
// import { Home, Users, Calendar, DollarSign, Check, X, MapPin, Phone, MessageSquare } from "lucide-react";
// import { useSocket } from "../hooks/useSocket";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { cn } from "../lib/utils.js";

// const AgentDashboard = () => {
//   const socketRef = useSocket();
//   const [stats, setStats] = useState({ properties: 0, leads: 0, appointments: 0, earnings: 0 });
//   const [bookings, setBookings] = useState([]);
//   const [bookingsLoading, setBookingsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAgentStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:8000/user/agent-stats", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setStats({
//           properties: res.data.properties || 0,
//           leads: res.data.leads || 0,
//           appointments: res.data.appointments || 0,
//           earnings: res.data.earnings || 0,
//         });
//       } catch (err) {
//         console.error("Error fetching agent stats:", err);
//       }
//     };
//     fetchAgentStats();

//     if (!socketRef.current) return;
//     const socket = socketRef.current;
//     socket.on("statsUpdate", (data) => {
//       setStats({
//         properties: data?.properties || 0,
//         leads: data?.leads || 0,
//         appointments: data?.appointments || 0,
//         earnings: data?.earnings || 0,
//       });
//     });
//     return () => { socket.off("statsUpdate"); };
//   }, [socketRef]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:8000/api/bookings/agent", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setBookingsLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleBookingAction = async (bookingId, status) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.patch(
//         `http://localhost:8000/api/bookings/${bookingId}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) {
//         setBookings((prev) => prev.map((b) => b._id === bookingId ? { ...b, status } : b));
//         toast.success(`Visit ${status} successfully`);
//       }
//     } catch (error) {
//       toast.error("Action failed");
//     }
//   };

//   const statusStyles = {
//     pending: "bg-amber-50 text-amber-600 border-amber-100",
//     confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
//     cancelled: "bg-rose-50 text-rose-600 border-rose-100",
//   };

//   return (
//     <DashboardLayout role="agent">
//       <div className="max-w-7xl mx-auto space-y-10">
        
//         {/* Header Area */}
//         <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//           <div>
//             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B] mb-2">Executive</p>
//             <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[#1C1B1A]">
//               Agent <span className="text-[#D4755B]">Terminal</span>
//             </h1>
//           </div>
//           <div className="flex gap-2">
//              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-2" />
//              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Live Market Sync Active</span>
//           </div>
//         </header>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard title="Portfolio" value={stats.properties} icon={Home} color="text-[#D4755B]" className="bg-white border-none shadow-sm" />
//           <StatCard title="Hot Leads" value={stats.leads} icon={Users} color="text-[#D4755B]" className="bg-white border-none shadow-sm" />
//           <StatCard title="Visits" value={bookings.length} icon={Calendar} color="text-[#D4755B]" className="bg-white border-none shadow-sm" />
//           <StatCard title="Revenue" value={`₹${stats.earnings.toLocaleString()}`} icon={DollarSign} color="text-[#D4755B]" className="bg-white border-none shadow-sm" />
//         </div>

//         {/* BOOKINGS SECTION */}
//         <section className="mt-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-black uppercase tracking-widest text-[#1C1B1A]">Upcoming Visits</h2>
//             <div className="h-px flex-1 bg-gray-200 mx-6 hidden md:block" />
//           </div>

//           {bookingsLoading ? (
//             <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#D4755B] border-t-transparent rounded-full animate-spin" /></div>
//           ) : bookings.length === 0 ? (
//             <div className="bg-[#FAF8F4] rounded-3xl p-20 text-center border border-dashed border-gray-300">
//               <p className="text-gray-400 font-medium">No site visits currently scheduled.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-4">
//               <AnimatePresence>
//                 {bookings.map((booking, idx) => (
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: idx * 0.05 }}
//                     key={booking._id}
//                     className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#D4755B]/30 hover:shadow-xl hover:shadow-[#D4755B]/5 transition-all flex flex-col lg:flex-row items-center gap-6"
//                   >
//                     {/* Property Thumbnail */}
//                     <div className="w-full lg:w-40 h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
//                       <img 
//                         src={Array.isArray(booking.property?.image) ? booking.property.image[0] : booking.property?.image} 
//                         alt="" 
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
//                       />
//                     </div>

//                     {/* Client & Property Details */}
//                     <div className="flex-1 w-full">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="font-bold text-lg text-[#1C1B1A] truncate">{booking.property?.title}</h3>
//                         <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", statusStyles[booking.status])}>
//                           {booking.status}
//                         </span>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <Users size={14} className="text-[#D4755B]" />
//                           <span className="font-semibold text-gray-700">{booking.user?.name}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <MapPin size={14} />
//                           <span className="truncate">{booking.property?.location}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <Calendar size={14} />
//                           <span>{new Date(booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} • {booking.time}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <Phone size={14} />
//                           <span>{booking.phone}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Sidebar */}
//                     <div className="flex lg:flex-col gap-2 w-full lg:w-auto shrink-0">
//                       {booking.status === "pending" ? (
//                         <>
//                           <button
//                             onClick={() => handleBookingAction(booking._id, "confirmed")}
//                             className="flex-1 lg:w-32 py-2.5 bg-[#D4755B] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#1C1B1A] transition-colors flex items-center justify-center gap-2"
//                           >
//                             <Check size={14} /> Confirm
//                           </button>
//                           <button
//                             onClick={() => handleBookingAction(booking._id, "cancelled")}
//                             className="flex-1 lg:w-32 py-2.5 bg-white text-rose-500 border border-rose-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
//                           >
//                             <X size={14} /> Decline
//                           </button>
//                         </>
//                       ) : (
//                         <button 
//                         className="flex-1 lg:w-32 py-2.5 bg-gray-50 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest cursor-default flex items-center justify-center gap-2">
//                           <MessageSquare size={14} /> Chat
//                         </button>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </section>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AgentDashboard;