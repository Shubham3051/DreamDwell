import dark_arrow from "../../assets/dark-arrow.png";
const videoSource = "https://www.pexels.com/download/video/32638428/"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.4 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } },
  };

  return (
    <div className="relative w-full min-h-[100svh] flex items-center justify-center text-center text-white overflow-hidden font-sans">
      
      {/* Background Video with subtle zoom effect */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Modern Gradient Overlay (Darker at bottom for depth) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      
      <motion.div
        className="relative z-20 max-w-5xl px-6 flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Decorative Badge */}
        <motion.span 
          variants={item}
          className="px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 backdrop-blur-sm"
        >
          Premium Real Estate Services
        </motion.span>

        {/* Heading - Upgraded with tracking and gradient */}
        <motion.h1 
          variants={item} 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tight"
        >
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">Perfect Sanctuary</span>
        </motion.h1>

        {/* Paragraph - Improved readability and line-height */}
        <motion.p 
          variants={item} 
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12 font-light tracking-wide"
        >
          Bridging the gap between vision and reality. We leverage AI-driven market intelligence to secure premium properties that define your lifestyle.
        </motion.p>

        {/* Button - Upgraded with Glassmorphism and better hover */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-5">
          <motion.button
            className="group relative bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Deals 
            <img src={dark_arrow} alt="arrow" className="w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            className="px-10 py-5 rounded-full font-bold text-lg border border-white/30 backdrop-blur-md hover:bg-white/10 transition-all"
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Agent
          </motion.button>
        </motion.div>

        {/* Simple Stats/Trust Indicators */}
        <motion.div 
          variants={item}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-8"
        >
          <div>
            <p className="text-2xl font-bold">12k+</p>
            <p className="text-xs uppercase tracking-widest text-gray-400">Properties</p>
          </div>
          <div>
            <p className="text-2xl font-bold">98%</p>
            <p className="text-xs uppercase tracking-widest text-gray-400">Satisfaction</p>
          </div>
          <div>
            <p className="text-2xl font-bold">25+</p>
            <p className="text-xs uppercase tracking-widest text-gray-400">Awards</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;