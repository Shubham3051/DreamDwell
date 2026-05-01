import React from 'react';
import { motion } from "framer-motion";

const Galtitle = ({ heading, subhead }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-10 bg-[#FAF8F4]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        {/* Left Side: Animated Brand Heading */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="h-1 bg-[#D4755B] rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="h-1 bg-[#1C1B1A] rounded-full"
            />
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
            className="text-5xl md:text-7xl font-black text-[#1C1B1A] tracking-tighter uppercase leading-[0.9]"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Right Side: Elegant Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#64748B] text-lg md:text-xl font-light max-w-sm md:text-right leading-relaxed"
        >
          {subhead}
        </motion.p>
      </div>
      
      {/* Decorative Brand Divider */}
      <div className="relative w-full h-[1px] bg-[#E6E0DA] mt-12 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#D4755B]/20 to-transparent"
          />
      </div>
    </div>
  );
};

export default Galtitle;