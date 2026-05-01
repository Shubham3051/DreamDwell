import React from "react";
import { motion } from "framer-motion";

const Title = ({ subtitle, head }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-transparent">
      {/* Subtitle with Animated Brand Accent */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 mb-6"
      >
        <p className="text-[#D4755B] font-black tracking-[0.5em] uppercase text-[10px] md:text-xs">
          {subtitle}
        </p>
        
        {/* Modern Minimalist Line */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[1.5px] bg-[#1C1B1A]" 
        />
      </motion.div>

      {/* Main Heading with Brand Typography */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="text-4xl md:text-6xl font-black text-[#1C1B1A] leading-[1.1] tracking-tighter max-w-3xl uppercase italic"
      >
        {head}
      </motion.h2>
      
      {/* Decorative Blur Element (Optional background flair) */}
      <div className="absolute -z-10 w-64 h-64 bg-[#D4755B]/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default Title;