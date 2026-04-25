import React from "react";
import "./About.css";
import About_image from "../../assets/about.jpeg";
import Play_icon from "../../assets/play-icon.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={About_image} alt="Image" className="about-img" />
        <img src={Play_icon} alt="Image" className="play-icon" />
      </div>
      <div className="about-right">
        <h2 className="about-righth2"> About Our Organization</h2>
        <p className="about-rightp">
          We are dedicated to helping you find more than just a property — we
          help you find a place to call home. With deep knowledge of the real
          estate market and a commitment to transparency, we guide our clients
          through every step of buying, selling, or investing. Our focus is on
          delivering trusted advice, personalized service, and the best possible
          opportunities tailored to your needs. Whether you are searching for
          your dream home or a smart investment, we strive to make your real
          estate journey smooth, secure, and successful.
        </p>
      </div>
    </div>
  );
};

export default About;
