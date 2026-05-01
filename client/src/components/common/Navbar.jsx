import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X, Home, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  const dashboardPaths = {
    user: "/user-dashboard",
    agent: "/agent-dashboard",
    admin: "/admin",
  };

  const getDashboardPath = () => {
    if (!user || !user.role) return "/";
    return dashboardPaths[user.role] || "/";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
  ];

  const roleLinks = {
    user: [
      { name: "Schedule", path: "/bookings" },
      { name: "Saved", path: "/saved-properties" },
    ],
    agent: [
      { name: "My Listings", path: "/list" },
      { name: "Inquiries", path: "/chat" },
    ],
    admin: [
      { name: "Manage Users", path: "/admin/users" },
    ],
  };

  const renderLinks = (isMobile = false) => {
    const baseClass = isMobile
      ? "text-lg font-medium py-2 border-b border-white/5 transition-all"
      : ({ isActive }) =>
          `relative px-1 transition-all duration-300 text-sm font-bold uppercase tracking-widest ${
            isActive ? "text-[#D4755B]" : "text-white/70 hover:text-white"
          }`;

    return (
      <>
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={baseClass}>
            {link.name}
            {!isMobile && location.pathname === link.path && (
              <motion.div layoutId="navUnderline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4755B]" />
            )}
          </NavLink>
        ))}

        {user && (
          <NavLink to={getDashboardPath()} className={baseClass}>
            Dashboard
            {!isMobile && location.pathname === getDashboardPath() && (
              <motion.div layoutId="navUnderline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4755B]" />
            )}
          </NavLink>
        )}

        {user && roleLinks[user.role]?.map((link) => (
          <NavLink key={link.path} to={link.path} className={baseClass}>
            {link.name}
            {!isMobile && location.pathname === link.path && (
              <motion.div layoutId="navUnderline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4755B]" />
            )}
          </NavLink>
        ))}
      </>
    );
  };

  return (
    <nav className="w-full bg-[#1C1B1A] text-white sticky top-0 z-[100] border-b border-white/5 backdrop-blur-md bg-[#1C1B1A]/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        
        {/* LEFT: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {setSidebarOpen && (
            <button onClick={() => setSidebarOpen((prev) => !prev)} className="lg:hidden text-white/70 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#D4755B] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-[-5deg] shadow-lg shadow-[#D4755B]/20">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic">
              Dream<span className="text-[#D4755B]">Dwell</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {renderLinks()}
        </div>

        {/* RIGHT: Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#D4755B] flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-xs font-bold uppercase tracking-widest">{user.name}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-56 bg-[#262524] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                  >
                    <button
                      onClick={() => { setOpen(false); navigate("/profile"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium transition-colors"
                    >
                      <User size={16} className="text-[#D4755B]" /> Profile
                    </button>
                    <div className="h-[1px] bg-white/5 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 text-sm font-medium transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/register" className="px-6 py-2 bg-[#D4755B] text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#c2644d] transition-all shadow-lg shadow-[#D4755B]/10">
              Sign Up
            </Link>
          )}

          <button className="lg:hidden text-white/70 hover:text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#1C1B1A] border-t border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4 px-8 py-8">
              {renderLinks(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

// import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
// import { useContext, useState, useRef, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { Menu, Bell, X, Home } from "lucide-react";

// const Navbar = ({ setSidebarOpen }) => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [open, setOpen] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleLogout = () => {
//     logout();
//     setOpen(false);
//     navigate("/register");
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenu(false);
//   }, [location.pathname]);

//   // ✅ Dashboard paths by role
//   const dashboardPaths = {
//     user: "/user-dashboard",
//     agent: "/agent-dashboard",
//     admin: "/admin",
//   };

//   const getDashboardPath = () => {
//     if (!user || !user.role) return "/";
//     return dashboardPaths[user.role] || "/";
//   };

//   // ✅ Base nav links
//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Properties", path: "/properties" },
//   ];

//   // ✅ Role-based links
//   const roleLinks = {
//     user: [
//       { name: "Chat", path: "/chat" },
//       { name: "Bookings", path: "/bookings" },
//     ],
//     agent: [
//       { name: "Chat", path: "/chat" },
//       { name: "My Listings", path: "/list" },
//     ],
//     admin: [
//       { name: "Users", path: "/admin/users" },
//       { name: "Properties", path: "/admin/properties" },
//     ],
//   };

//   const renderLinks = (isMobile = false) => {
//     const baseClass = isMobile
//       ? "hover:text-cyan-400"
//       : ({ isActive }) =>
//           `transition ${
//             isActive
//               ? "text-cyan-400 font-semibold"
//               : "hover:text-cyan-400"
//           }`;

//     return (
//       <>
//         {/* Common Links */}
//         {navLinks.map((link) => (
//           <NavLink key={link.path} to={link.path} className={baseClass}>
//             {link.name}
//           </NavLink>
//         ))}

//         {/* Dashboard */}
//         {user && (
//           <NavLink to={getDashboardPath()} className={baseClass}>
//             Dashboard
//           </NavLink>
//         )}

//         {/* Role Links */}
//         {user &&
//           roleLinks[user.role]?.map((link) => (
//             <NavLink key={link.path} to={link.path} className={baseClass}>
//               {link.name}
//             </NavLink>
//           ))}
//       </>
//     );
//   };

//   return (
//     <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-[#1C1B1A] text-white sticky top-0 z-50">

//       <div className="flex justify-between items-center w-full">

//         {/* LEFT */}
//         <div className="flex items-center gap-4">

//           {/* Sidebar Toggle */}
//           {setSidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen((prev) => !prev)}
//               className="md:hidden"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           )}

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
//               <Home className="w-5 h-5 text-white" />
//             </div>
//             <span className="font-bold">DreamDwell</span>
//           </Link>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3">

//           {/* DESKTOP NAV */}
//           <div className="hidden md:flex items-center gap-6">
//             {renderLinks()}
//           </div>

//           {/* 👤 Profile */}
//           {user && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="px-3 py-1.5 bg-gray-700 rounded-md hover:bg-gray-600"
//               >
//                 👤 {user.name}
//               </button>

//               {open && (
//                 <div className="absolute right-0 top-12 w-44 bg-white text-black rounded-md shadow-lg overflow-hidden">

//                   <button
//                     onClick={() => {
//                       setOpen(false);
//                       navigate("/profile");
//                     }}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Profile
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenu(!mobileMenu)}
//           >
//             {mobileMenu ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenu && (
//       <div className="absolute top-full left-0 w-full md:hidden bg-[#1C1B1A] shadow-lg border-t border-white/10 z-50 animate-fadeIn">
//         <div className="flex flex-col gap-4 px-6 py-4">
//           {renderLinks(true)}
//         </div>
//       </div>
//     )}
//     </nav>
//   );
// };

// export default Navbar;