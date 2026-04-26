import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbaroo cont ${sticky ? "dark-nav" : ""}`}>
      
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white">DreamDwell</span>
        </Link>
      </div>

      {/* DESKTOP LINKS */}
      <ul className="nav-links hidden md:flex">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/gallery" className="nav-link">Gallery</Link></li>
        <li><Link to="/seemore" className="nav-link">See More</Link></li>
        <li>
          <Link to="/contact" className="btn nav-cta">
            Contact Us
          </Link>
        </li>
      </ul>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-black/90 p-5 flex flex-col gap-4 md:hidden">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/seemore" onClick={() => setOpen(false)}>See More</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;