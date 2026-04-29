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
    <div className="relative antialiased bg-white">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[1000]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <Hero />
        </section>

        {/* MAIN CONTENT WRAPPER */}
        {/* Changed background to a more sophisticated off-white/gray-50 */}
        <div className="bg-gray-50/50">
          
          {/* PROGRAMS SECTION */}
          <section id="programs" className="py-10">
            <div className="max-w-7xl mx-auto">
              <Title subtitle="Our Collection" head="Property Categories" />
              <Programs />
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto">
              <About />
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section id="gallery" className="py-20">
            <div className="max-w-7xl mx-auto">
              <Galtitle
                heading="Visual Gallery"
                subhead="A curated glimpse of our most prestigious properties"
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


