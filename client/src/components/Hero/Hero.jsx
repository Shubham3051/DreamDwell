import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-role");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="hero cont">
      <motion.div
        className="hero-text"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Heading */}
        <motion.h1 variants={item}>
          We Ensure You With Good Deals For Your Property
        </motion.h1>

        {/* Paragraph */}
        <motion.p className="f" variants={item}>
          With years of dedicated experience in the real estate sector, our
          firm is committed to bridging the gap between dreamers and their
          ideal properties. We combine market intelligence with AI-driven
          insights to help you find the perfect home faster and smarter.
        </motion.p>

        {/* Button */}
        <motion.div variants={item}>
          <motion.button
            className="btn"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore <img src={dark_arrow} alt="arrow" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;