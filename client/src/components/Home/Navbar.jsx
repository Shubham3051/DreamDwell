import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
        sticky 
          ? "bg-[#1a1a1a] shadow-lg py-3" 
          : "bg-transparent"
      }`}
    >
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            DreamDwell
          </span>
        </Link>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-8 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
          </li>
          <li>
            <Link to="/properties" className="hover:text-blue-400 transition-colors">Properties</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4 ml-4">
          <Link 
            to="/select-role" 
            className="text-white font-medium hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`absolute top-full left-0 w-full bg-[#1a1a1a] border-t border-white/10 p-6 flex flex-col gap-6 md:hidden transition-all duration-300 origin-top ${
          open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <Link to="/" className="text-white text-lg font-medium" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/contact" className="text-white text-lg font-medium" onClick={() => setOpen(false)}>Contact Us</Link>
        <hr className="border-white/10" />
        <Link to="/select-role" className="text-white text-lg font-medium" onClick={() => setOpen(false)}>Sign In</Link>
        <Link 
          to="/register" 
          className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold" 
          onClick={() => setOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;