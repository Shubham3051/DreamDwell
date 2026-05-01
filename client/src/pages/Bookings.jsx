import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, MapPin, ExternalLink, Inbox } from "lucide-react";

// Layout Components
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LoadingState from "../components/common/LoadingState";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen flex flex-col font-manrope">
      <Navbar />

      <main className="flex-1 px-6 md:px-12 lg:px-24 py-10">
        {/* Header Section */}
        <header className="mb-12 border-b border-[#1C1B1A]/5 pb-8">
          <h1 className="text-4xl font-black italic tracking-tighter text-[#1C1B1A] uppercase">
            Scheduled Visits
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">
            Your upcoming property itineraries
          </p>
        </header>

        {loading ? (
          <div className="py-20">
            <LoadingState message="Retrieving your schedule..." />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {bookings.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Inbox size={32} className="text-gray-200" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1C1B1A]">No Bookings Yet</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                  Start your journey by scheduling a private tour.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {bookings.map((booking, idx) => {
                  const property = booking.property;
                  const imageUrl = Array.isArray(property?.image) ? property.image[0] : property?.image;

                  return (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.1 } }}
                      className="group bg-white rounded-[2rem] border border-[#1C1B1A]/5 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-700"
                    >
                      {/* Image Area */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={property?.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-gray-300">
                            No Visual Available
                          </div>
                        )}
                        {/* Floating Status */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${statusStyles[booking.status]}`}>
                          • {booking.status}
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="p-8">
                        <h2 className="text-lg font-black italic uppercase tracking-tighter text-[#1C1B1A] line-clamp-1 mb-2">
                          {property?.title || "Exclusive Estate"}
                        </h2>
                        
                        <div className="flex items-center gap-2 text-gray-400 mb-6">
                          <MapPin size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                            {property?.location || "Prime District"}
                          </span>
                        </div>

                        {/* Itinerary Details */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#1C1B1A]/5">
                            <Calendar size={14} className="text-[#D4755B] mb-2" />
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Date</p>
                            <p className="text-xs font-black text-[#1C1B1A] truncate">
                              {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#1C1B1A]/5">
                            <Clock size={14} className="text-[#D4755B] mb-2" />
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Time</p>
                            <p className="text-xs font-black text-[#1C1B1A]">{booking.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-[#1C1B1A]/5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                              <User size={14} />
                            </div>
                            <div>
                              <p className="text-[8px] font-bold text-gray-400 uppercase">Agent</p>
                              <p className="text-[10px] font-black text-[#1C1B1A]">{booking.agent?.name || "Assigning..."}</p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => navigate(`/property/${property?._id}`)}
                            className="p-3 bg-[#1C1B1A] text-white rounded-xl hover:bg-[#D4755B] transition-all duration-300"
                          >
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Bookings;
