import React from 'react';
import { motion } from "framer-motion";

const Galtitle = ({ heading, subhead }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-20 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left Side: Animated Heading */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-blue-600 rounded-full"
          />
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Right Side: Subtle Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-lg md:text-xl font-light max-w-md md:text-right"
        >
          {subhead}
        </motion.p>
      </div>
      
      {/* Divider Line */}
      <div className="w-full h-[1px] bg-gray-100 mt-8" />
    </div>
  );
};

export default Galtitle;