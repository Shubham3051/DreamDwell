import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Modern icon alternative
import gallery_1 from '../../assets/gallery-1.avif';
import gallery_2 from '../../assets/gallery-2.jpg';
import gallery_3 from '../../assets/gallery-3.jpg';
import gallery_4 from '../../assets/gallery-4.png';

const Gallery = () => {
  const navigate = useNavigate();

  const images = [
    { src: gallery_1, title: "Modern Villas", span: "md:col-span-2 md:row-span-2" },
    { src: gallery_2, title: "Urban Living", span: "md:col-span-1 md:row-span-1" },
    { src: gallery_3, title: "Green Spaces", span: "md:col-span-1 md:row-span-2" },
    { src: gallery_4, title: "Skyline Views", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Animated Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16 h-auto md:h-[600px]">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-[2rem] shadow-lg cursor-pointer ${item.span}`}
            >
              {/* Image */}
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2">View Project</p>
                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upgrade Button */}
        <motion.button 
          onClick={() => navigate("/see-more")} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-blue-600 transition-all duration-300"
        >
          See More Collection 
          <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-2 transition-transform duration-300">
            <ArrowRight size={20} />
          </div>
        </motion.button> 
      </div>
    </section>
  );
};

export default Gallery;