import React from "react";
import { motion } from "framer-motion";
import program_1 from "../../assets/program-1.jpg";
import program_2 from "../../assets/program-2.webp";
import program_3 from "../../assets/program-3.jpg";
import program_icon_1 from "../../assets/program-icon-1.png";
import program_icon_2 from "../../assets/program-icon-2.png";
import program_icon_3 from "../../assets/program-icon-3.png";

const Programs = () => {
  const propertyTypes = [
    {
      image: program_1,
      icon: program_icon_1,
      title: "Residential Property",
      desc: "Luxury villas, modern apartments, and cozy family homes tailored for comfort.",
    },
    {
      image: program_2,
      icon: program_icon_2,
      title: "Commercial Property",
      desc: "Strategic office spaces and retail hubs designed for business growth.",
    },
    {
      image: program_3,
      icon: program_icon_3,
      title: "Industrial Property",
      desc: "High-capacity warehouses and manufacturing facilities for scaling operations.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm"
        >
          Our Expertise
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3"
        >
          Property Categories
        </motion.h2>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
      </div>

      {/* Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {propertyTypes.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white cursor-pointer"
          >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Overlay Gradient (Hidden until hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Default View (Icon + Title) */}
            <div className="absolute bottom-0 left-0 w-full p-8 text-white transition-transform duration-500 group-hover:translate-y-[-20%]">
              <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:bg-blue-600 group-hover:shadow-lg">
                <img src={item.icon} alt="icon" className="w-8 h-8 brightness-0 invert" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
            </div>

            {/* Hover Reveal Content (Description) */}
            <div className="absolute bottom-8 left-8 right-8 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                {item.desc}
              </p>
              <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/50 pb-1">
                Explore More →
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Programs;
