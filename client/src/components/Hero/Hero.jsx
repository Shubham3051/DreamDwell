import "./Hero.css";
import dark_arrow from '../../assets/dark-arrow.png'
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Step 1 → Go to Login page
    navigate("/login");
  };

  return (
    <div className="hero cont">
      <div className="hero-text">
        <h1>We Ensure You With Good Deals For Your Property</h1>

        <p className="f">
          With years of dedicated experience in the real estate sector, our
          firm is committed to bridging the gap between dreamers and their
          ideal properties...
        </p>

        <button className="btn" onClick={handleClick}>
          Explore <img src={dark_arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
