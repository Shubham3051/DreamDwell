import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Programs from "../components/Home/Programs";
import Title from "../components/Home/Title";
import About from "../components/Home/About";
import Gallery from "../components/Home/Gallery";
import Galtitle from "../components/Home/Galtitle";
import Footer from "../components/common/Footer";

const Home = () => {
  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative antialiased bg-[#FAF8F4] selection:bg-[#D4755B]/30 selection:text-[#1C1B1A]">
      {/* Brand Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#D4755B] origin-left z-[1000] shadow-[0_2px_10px_rgba(212,117,91,0.3)]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <Hero />
        </section>

        {/* MAIN CONTENT WRAPPER */}
        <div className="bg-[#FAF8F4]">
          
          {/* PROGRAMS SECTION */}
          <section id="programs" className="py-20">
            <div className="max-w-7xl mx-auto">
              <Title 
                subtitle="Exquisite Spaces" 
                head="Our Architectural Portfolio" 
              />
              <Programs />
            </div>
          </section>

          {/* ABOUT SECTION */}
          {/* Using a subtle white-to-cream gradient for depth */}
          <section id="about" className="py-20 bg-gradient-to-b from-white to-[#FAF8F4]">
            <div className="max-w-7xl mx-auto">
              <About />
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section id="gallery" className="pb-32">
            <div className="max-w-7xl mx-auto">
              <Galtitle
                heading="THE GALLERY"
                subhead="A curated glimpse of our most prestigious properties and visionary living spaces."
              />
              <Gallery />
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;


