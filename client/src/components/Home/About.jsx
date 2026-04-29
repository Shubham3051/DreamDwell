import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ArrowRight } from "lucide-react"; 
import About_image from "../../assets/about.png";

const About = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const videoUrl = "https://www.pexels.com/download/video/18271938/"; 

  useEffect(() => {
    document.body.style.overflow = isVideoOpen ? "hidden" : "unset";
  }, [isVideoOpen]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT SIDE - ANIMATED MEDIA */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 aspect-square">
            <motion.img 
              src={About_image} 
              alt="Luxury Estate" 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Animated Play Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 flex items-center justify-center">
              <motion.button 
                onClick={() => setIsVideoOpen(true)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-28 h-28 flex items-center justify-center cursor-pointer"
              >
                {/* Triple Pulse Effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  />
                ))}
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Floating Decor Animations */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full -z-10 blur-3xl"
          />
        </motion.div>

        {/* RIGHT SIDE - STAGGERED REVEAL */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col space-y-10"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3 text-blue-600 font-bold tracking-[0.3em] uppercase text-xs">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                className="h-[2px] bg-blue-600" 
              />
              Established Excellence
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
              Crafting Legacies <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400">
                Through Real Estate.
              </span>
            </h2>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-xl text-gray-500 font-light leading-relaxed">
            We don't just sell properties; we curate lifestyles. Our firm bridges the gap 
            between architectural vision and your personal reality.
          </motion.p>

          {/* Animated Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 gap-12 border-y border-gray-100 py-10"
          >
            <div className="group">
              <motion.h3 
                whileInView={{ scale: [0.5, 1.2, 1] }}
                className="text-4xl font-black text-gray-900 mb-2"
              >
                100%
              </motion.h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Transparency</p>
            </div>
            <div>
              <motion.h3 
                whileInView={{ scale: [0.5, 1.2, 1] }}
                className="text-4xl font-black text-gray-900 mb-2"
              >
                24/7
              </motion.h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Expert Support</p>
            </div>
          </motion.div>

          {/* Magnetic CTA Button */}
          <motion.button
            variants={fadeInUp}
            onClick={() => setIsVideoOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-6 w-fit bg-gray-900 text-white pl-8 pr-3 py-3 rounded-full font-bold group transition-all"
          >
            Watch Story
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* MODAL ANIMATION */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.button 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-10 right-10 text-white/50 hover:text-white"
            >
              <X size={48} strokeWidth={1} />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(37,99,235,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video className="w-full h-full object-cover" controls autoPlay src={videoUrl} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;