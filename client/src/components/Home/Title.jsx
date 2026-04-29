import React from "react";
import { motion } from "framer-motion";

const Title = ({ subtitle, head }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      {/* Subtitle with Animated Underline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
          {subtitle}
        </p>
        <div className="w-12 h-[2px] bg-blue-600 mb-4" />
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight max-w-2xl"
      >
        {head}
      </motion.h2>
    </div>
  );
};

export default Title;