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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } },
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAF8F4]">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
          className="text-[#D4755B] font-black uppercase text-[10px] block mb-4"
        >
          Our Expertise
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-[#1C1B1A] tracking-tighter"
        >
          Property Categories
        </motion.h2>
        <div className="w-16 h-1 bg-[#D4755B] mx-auto mt-8" />
      </div>

      {/* Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {propertyTypes.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(28,27,26,0.1)] bg-white cursor-pointer"
          >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            {/* Overlay Gradient (Using Brand Dark) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-[#1C1B1A]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              
              {/* Default View: Icon + Title */}
              <div className="transition-transform duration-500 group-hover:translate-y-[-70px]">
                <div className="bg-[#D4755B] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#D4755B]/30 group-hover:scale-110 transition-transform duration-500">
                  <img src={item.icon} alt="icon" className="w-7 h-7 brightness-0 invert" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase">
                  {item.title.split(' ')[0]} <br/>
                  <span className="text-[#D4755B]">{item.title.split(' ')[1]}</span>
                </h3>
              </div>

              {/* Hover Reveal: Description */}
              <div className="absolute bottom-10 left-10 right-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <p className="text-[#E6E0DA] text-sm leading-relaxed mb-6 font-medium">
                  {item.desc}
                </p>
                <div className="flex items-center gap-3">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                        Explore Portfolio
                    </span>
                    <div className="h-[1px] flex-1 bg-white/20" />
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Programs;