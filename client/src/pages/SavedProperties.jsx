import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ExternalLink, HeartOff } from "lucide-react";

// Layout Components
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LoadingState from "../components/common/LoadingState";

const SavedProperties = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaved(res.data || []);
      } catch (error) {
        console.error("Error fetching saved properties:", error);
        toast.error("Session expired. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/saved/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved((prev) => prev.filter((item) => item._id !== id));
      toast.success("Removed from collection");
    } catch (error) {
      toast.error("Failed to update collection");
    }
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen flex flex-col font-manrope">
      <Navbar />

      <main className="flex-1 px-6 md:px-12 lg:px-24 py-10">
        {/* Header Section */}
        <header className="mb-12 border-b border-[#1C1B1A]/5 pb-8">
          <h1 className="text-4xl font-black italic tracking-tighter text-[#1C1B1A] uppercase">
            Your Collection
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">
            {saved.length} Curated Estates Saved
          </p>
        </header>

        {loading ? (
          <div className="py-20">
            <LoadingState message="Restoring your collection..." />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {saved.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <HeartOff size={32} className="text-gray-200" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1C1B1A]">Your vault is empty</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 max-w-xs">
                  Discover exqusite properties and save them to your personal portfolio.
                </p>
                <button 
                  onClick={() => navigate('/properties')}
                  className="mt-8 px-8 py-3 bg-[#1C1B1A] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#D4755B] transition-all duration-500"
                >
                  Explore Portfolio
                </button>
              </motion.div>
            ) : (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {saved.map((property) => {
                  const imageUrl = Array.isArray(property.image) ? property.image[0] : property.image;
                  return (
                    <motion.div
                      layout
                      key={property._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white rounded-[2rem] overflow-hidden border border-[#1C1B1A]/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                          <p className="text-xs font-black tracking-tight text-[#1C1B1A]">
                            ${property.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8">
                        <div className="mb-6">
                          <h2 className="text-lg font-black italic uppercase tracking-tighter text-[#1C1B1A] line-clamp-1 mb-1">
                            {property.title}
                          </h2>
                          <div className="flex items-center gap-1.5 opacity-40">
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                              📍 {property.location}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-6 border-t border-[#1C1B1A]/5">
                          <button
                            onClick={() => navigate(`/property/${property._id}`)}
                            className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#1C1B1A] text-white rounded-2xl hover:bg-[#D4755B] transition-all duration-500 group/btn"
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
                            <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>

                          <button
                            onClick={() => handleRemove(property._id)}
                            className="w-12 h-12 flex items-center justify-center border border-[#1C1B1A]/10 text-gray-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 rounded-2xl transition-all duration-500"
                            title="Remove from saved"
                          >
                            <Trash2 size={18} />
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

export default SavedProperties;