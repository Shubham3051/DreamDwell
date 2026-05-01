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
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-5 flex items-center justify-between ${
        sticky 
          ? "bg-[#1C1B1A]/90 backdrop-blur-md shadow-2xl py-4" 
          : "bg-transparent"
      }`}
    >
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="w-10 h-10 bg-[#D4755B] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-[#D4755B]/20">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">
            Dream<span className="text-[#D4755B] not-italic">Dwell</span>
          </span>
        </Link>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex items-center gap-8 text-[#E6E0DA] font-semibold text-sm uppercase tracking-widest">
          <li>
            <Link to="/" className="hover:text-[#D4755B] transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4755B] transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/properties" className="hover:text-[#D4755B] transition-colors relative group">
              Properties
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4755B] transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#D4755B] transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4755B] transition-all group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-10">
          <Link 
            to="/select-role" 
            className="text-[#E6E0DA] text-sm font-bold hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-[#D4755B] hover:bg-[#c0664d] text-white px-8 py-2.5 rounded-full text-sm font-black transition-all shadow-lg shadow-[#D4755B]/20 uppercase tracking-tighter"
          >
            Join Us
          </Link>
        </div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-white p-2 bg-white/5 rounded-full border border-white/10 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`absolute top-full left-0 w-full bg-[#1C1B1A] border-t border-[#D4755B]/20 p-8 flex flex-col gap-8 md:hidden transition-all duration-500 ease-in-out shadow-2xl origin-top ${
          open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-[#E6E0DA] text-2xl font-black italic tracking-tighter" onClick={() => setOpen(false)}>HOME</Link>
          <Link to="/properties" className="text-[#E6E0DA] text-2xl font-black italic tracking-tighter" onClick={() => setOpen(false)}>PROPERTIES</Link>
          <Link to="/contact" className="text-[#E6E0DA] text-2xl font-black italic tracking-tighter" onClick={() => setOpen(false)}>CONTACT</Link>
        </div>
        
        <hr className="border-white/5" />
        
        <div className="flex flex-col gap-4">
          <Link 
            to="/select-role" 
            className="text-[#E6E0DA] text-center py-4 rounded-2xl font-bold border border-white/10" 
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-[#D4755B] text-white text-center py-4 rounded-2xl font-black uppercase tracking-tighter" 
            onClick={() => setOpen(false)}
          >
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;