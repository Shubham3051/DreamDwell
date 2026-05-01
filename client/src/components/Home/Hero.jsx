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
    <div className="relative w-full min-h-[100svh] flex items-center justify-center text-center text-white overflow-hidden font-sans bg-[#1C1B1A]">
      
      {/* Background Video with subtle zoom effect */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute z-0 w-full h-full object-cover opacity-60" // Reduced opacity to let Brand Dark peek through
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Brand-consistent Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1C1B1A]/70 via-transparent to-[#1C1B1A]/90"></div>
      
      <motion.div
        className="relative z-20 max-w-5xl px-6 flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Decorative Badge - Using Terra Cotta (#D4755B) */}
        <motion.span 
          variants={item}
          className="px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-[#D4755B]/20 border border-[#D4755B]/40 rounded-full text-[#D4755B] backdrop-blur-md"
        >
          Premium Real Estate Services
        </motion.span>

        {/* Heading - Integrated with Warm Neutrals */}
        <motion.h1 
          variants={item} 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tight text-white"
        >
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4755B] via-[#E6E0DA] to-white">Perfect Sanctuary</span>
        </motion.h1>

        {/* Paragraph - Improved contrast with Slate/Warm Gray */}
        <motion.p 
          variants={item} 
          className="text-lg md:text-xl text-[#E6E0DA] max-w-2xl mx-auto leading-relaxed mb-12 font-light tracking-wide"
        >
          Bridging the gap between vision and reality. We leverage AI-driven market intelligence to secure premium properties that define your lifestyle.
        </motion.p>

        {/* Buttons - Using Brand Colors */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-5">
          <motion.button
            className="group relative bg-[#D4755B] text-white px-10 py-5 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-[#c0664d] hover:shadow-[0_10px_20px_rgba(212,117,91,0.3)]"
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Deals 
            <img src={dark_arrow} alt="arrow" className="w-5 brightness-0 invert transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            className="px-10 py-5 rounded-full font-bold text-lg border-2 border-white/20 backdrop-blur-md hover:bg-white/10 transition-all text-white"
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Agent
          </motion.button>
        </motion.div>

        {/* Stats - Using Brand Border and Accents */}
        <motion.div 
          variants={item}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-8"
        >
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">12k+</p>
            <p className="text-[10px] uppercase font-black tracking-widest text-[#D4755B]">Properties</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">98%</p>
            <p className="text-[10px] uppercase font-black tracking-widest text-[#D4755B]">Satisfaction</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">25+</p>
            <p className="text-[10px] uppercase font-black tracking-widest text-[#D4755B]">Awards</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;