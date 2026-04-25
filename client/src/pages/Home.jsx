import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Programs from "../components/Programs/Programs";
import Title from "../components/Title/Title";
import About from "../components/About/About";
import Gallery from "../components/Gallery/Gallery";
import Galtitle from "../components/GT/Galtitle";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />

      <div className="cont">
        <Title subtitle="Our Program" head="What We Offer" />
        <Programs />
        <About />
        <Galtitle
          heading="Gallery"
          subhead="Some Of The Property Images We Sell"
        />
        <Gallery />
      </div>
    </div>
  );
};

export default Home;