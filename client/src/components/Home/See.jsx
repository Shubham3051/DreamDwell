import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Maximize2, X } from "lucide-react";

import gallery_1 from "../../assets/gallery-1.avif";
import gallery_2 from "../../assets/gallery-2.jpg";
import gallery_3 from "../../assets/gallery-3.jpg";
import gallery_4 from "../../assets/gallery-4.png";

const See = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);

  const categories = ["All", "Interior", "Exterior", "Luxury", "Modern"];

  const allImages = [
    { src: gallery_1, cat: "Exterior", title: "Sunset Villa" },
    { src: gallery_2, cat: "Interior", title: "Modern Kitchen" },
    { src: gallery_3, cat: "Luxury", title: "Infinity Pool" },
    { src: gallery_4, cat: "Modern", title: "Skyline Suite" },
    // Fillers to demonstrate the grid
    { src: gallery_1, cat: "Luxury", title: "Royal Gardens" },
    { src: gallery_2, cat: "Modern", title: "Minimalist Loft" },
  ];

  const filteredImages = filter === "All" 
    ? allImages 
    : allImages.filter(img => img.cat === filter);

  return (
    <div className="min-h-screen bg-[#FAF8F4] py-24 px-6 md:px-12 lg:px-24 font-sans">
      {/* Navigation & Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-[#64748B] hover:text-[#D4755B] transition-all mb-12 font-bold uppercase text-xs tracking-widest group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Sanctuary
        </motion.button>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#D4755B] font-black tracking-[0.4em] uppercase text-[10px]"
            >
              Curated Masterpieces
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-[#1C1B1A] tracking-tighter leading-[0.9]">
              THE <span className="italic text-[#D4755B]">COLLECTION.</span>
            </h1>
            <p className="text-[#64748B] mt-6 max-w-md text-lg font-light leading-relaxed">
              Explore our architectural legacy through a lens of modern luxury and sustainable design.
            </p>
          </div>

          {/* Luxury Filter Tabs */}
          <div className="flex flex-wrap gap-3 bg-white/50 p-2 rounded-[2rem] border border-[#E6E0DA] backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  filter === cat 
                  ? "bg-[#1C1B1A] text-white shadow-xl scale-105" 
                  : "text-[#64748B] hover:text-[#1C1B1A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <motion.div 
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              key={img.title + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(28,27,26,0.08)] bg-white cursor-zoom-in"
              onClick={() => setSelectedImg(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
              />
              
              {/* Brand Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-[#1C1B1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-10 flex flex-col justify-end">
                <p className="text-[#D4755B] text-[10px] font-black uppercase tracking-[0.3em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.cat}
                </p>
                <h3 className="text-white text-2xl font-black tracking-tighter uppercase italic">{img.title}</h3>
                <div className="flex items-center gap-4 mt-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                   <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Maximize2 className="text-white" size={18} />
                   </div>
                   <span className="text-white text-[10px] font-bold uppercase tracking-widest">Enlarge View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox with Brand Blur */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1C1B1A]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1 }}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <X size={48} strokeWidth={1} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImg} 
              className="max-w-full max-h-[85vh] rounded-[2rem] object-contain shadow-[0_0_100px_rgba(212,117,91,0.2)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default See;