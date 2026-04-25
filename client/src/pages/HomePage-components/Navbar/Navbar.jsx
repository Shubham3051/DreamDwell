import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll' , () => {
      window.scrollY > 550 ? setSticky(true) : setSticky(false);
    })
  },[]);

  return (
    <nav className={`navbaroo container ${sticky? 'dark-nav' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/seemore">See More</Link>
        </li>
        <li>
          <button className="btn">
            <Link to="#">Contact Us</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
