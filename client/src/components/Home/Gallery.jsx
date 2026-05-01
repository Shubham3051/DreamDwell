import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; 
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
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Animated Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20 h-auto md:h-[700px]">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.6, 0.05, -0.01, 0.9] }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-[2.5rem] shadow-[0_15px_40px_rgba(28,27,26,0.12)] bg-white cursor-pointer ${item.span}`}
            >
              {/* Image with subtle brand-tinted overlay */}
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              {/* Premium Hover Overlay using Brand Colors */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-[#1C1B1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0 }} // Hidden until hover via parent group
                  className="text-[#D4755B] text-[10px] font-black tracking-[0.3em] uppercase mb-3 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  Featured Project
                </motion.p>
                <h3 className="text-white text-3xl font-black tracking-tighter uppercase italic leading-none transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  {item.title}
                </h3>
                
                {/* Decorative Line that expands on hover */}
                <div className="w-0 h-[2px] bg-[#D4755B] mt-6 group-hover:w-full transition-all duration-700 delay-150" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand-Consistent CTA Button */}
        <motion.button 
          onClick={() => navigate("/see-more")} 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-8 bg-[#1C1B1A] text-white pl-12 pr-4 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:shadow-[#D4755B]/20 transition-all duration-500"
        >
          View Full Collection 
          <div className="bg-[#D4755B] rounded-full w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-45deg]">
            <ArrowRight size={22} className="text-white" />
          </div>
        </motion.button> 
      </div>
    </section>
  );
};

export default Gallery;