import "./Hero.css";
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  return (
    <>
      <div className="hero container">
        <div className="hero-text">
          <h1>We Ensure You With Good Deals For Your Property</h1>
          <p className="f">
            With years of dedicated experience in the real estate sector, our
            firm is committed to bridging the gap between dreamers and their
            ideal properties. We believe in transparency, integrity, and client
            satisfaction above all else. Whether you are looking to buy, sell,
            or rent residential plots, luxurious apartments, or commercial
            spaces, our expert consultants provide honest, market-driven advice
            to ensure you grab profitable deals. We don't just close deals; we
            build lasting relationships based on trust.
          </p>
          <button className="btn">Explore<img src={dark_arrow} /></button>
        </div>
      </div>
    </>
  );
};

export default Hero;
