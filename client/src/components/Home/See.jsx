import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Maximize2, X } from "lucide-react";

// Assuming you have these or similar assets
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
    // Add more images here to fill the page
  ];

  const filteredImages = filter === "All" 
    ? allImages 
    : allImages.filter(img => img.cat === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
              The <span className="text-blue-600">Collection.</span>
            </h1>
            <p className="text-gray-500 mt-4 max-w-md">
              A curated selection of our most prestigious properties and architectural masterpieces.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <motion.div 
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative group aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl bg-white cursor-zoom-in"
              onClick={() => setSelectedImg(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">{img.cat}</p>
                <h3 className="text-white text-xl font-bold">{img.title}</h3>
                <Maximize2 className="text-white mt-4 opacity-50" size={20} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default See;