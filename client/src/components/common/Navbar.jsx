// import { NavLink, useNavigate } from "react-router-dom";
// import { useContext, useState, useRef, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { Menu } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Home } from "lucide-react";


// const Navbar = ({ setSidebarOpen }) => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleLogout = () => {
//     logout();
//     setOpen(false);
//     navigate("/login");
//   };

//   // Close dropdown outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Role-based dashboard
//   const getDashboardPath = () => {
//     if (!user) return "/";
//     if (user.role === "agent") return "/agent-dashboard";
//     if (user.role === "user") return "/user-dashboard";
//     if (user.role === "admin") return "/admin";
//     return "/";
//   };

//   return (
//     <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-[#1C1B1A] text-white sticky top-0 z-50">

//       {/* LEFT */}
//       <div className="flex items-center gap-4">

//         {/*  Sidebar Toggle (NOW WORKS ON MOBILE) */}
//         {setSidebarOpen && (
//           <button
//             onClick={() => setSidebarOpen(prev => !prev)}
//             className="block"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         )}

//         <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
//                 <Home className="w-5 h-5 text-white" />
//               </div>
//               <span className="font-bold">DreamDwell</span>
//             </Link>
//         </div>
//       </div>

//       {/* CENTER (desktop only) */}
//       <div className="hidden md:flex items-center gap-6">
//         <NavLink to="/" className="hover:text-cyan-400">
//           Home
//         </NavLink>

//         <NavLink to="/properties" className="hover:text-cyan-400">
//           Properties
//         </NavLink>

//         <NavLink to="/agent-dashboard" className="hover:text-cyan-400">
//           Agent Dashboard
//         </NavLink>

//                 <NavLink to="/user-dashboard" className="hover:text-cyan-400">
//           User Dashboard
//         </NavLink>

//         {user && (
//           <NavLink to={getDashboardPath()} className="hover:text-cyan-400">
//             Dashboard
//           </NavLink>
//         )}
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-3">

//         {user && (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setOpen(!open)}
//               className="px-3 py-1.5 bg-gray-700 rounded-md hover:bg-gray-600"
//             >
//               👤 {user.name}
//             </button>

//             {open && (
//               <div className="absolute right-0 top-12 w-44 bg-white text-black rounded-md shadow-lg">

//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     navigate("/user-profile");
//                   }}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Profile
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Menu, Bell, X , Home} from "lucide-react";

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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  const getDashboardPath = () => {
    if (!user) return "/";
    if (user.role === "agent") return "/agent-dashboard";
    if (user.role === "user") return "/user-dashboard";
    if (user.role === "admin") return "/admin";
    return "/";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
  ];

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-[#1C1B1A] text-white sticky top-0 z-50">

      <div className="flex justify-between items-center space-between w-full">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Sidebar Toggle */}
          {setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">DreamDwell</span>
            </Link>
        </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "hover:text-cyan-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 font-semibold"
                  : "hover:text-cyan-400"
              }
            >
              Dashboard
            </NavLink>
          )}

          {user && (
            <>
              <NavLink
                to="/saved-properties"
                className={({ isActive }) =>
                  isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
                }
              >
                ❤️ Saved
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
                }
              >
                💬 Chat
              </NavLink>
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
                }
              >
                📅 Bookings
              </NavLink>
            </>
          )}
          </div>

          {/* 👤 Profile */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="px-3 py-1.5 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                👤 {user.name}
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-44 bg-white text-black rounded-md shadow-lg overflow-hidden">

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/user-profile");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 📱 Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-gray-800 px-6 py-4 flex flex-col gap-4">

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="hover:text-cyan-400"
            >
              {link.name}
            </NavLink>
          ))}

          {user && (
            <NavLink to={getDashboardPath()}>
              Dashboard
            </NavLink>
          )}

          {user && (
            <>
              <NavLink to="/saved-properties">❤️ Saved</NavLink>
              <NavLink to="/chat">💬 Chat</NavLink>
              <NavLink to="/bookings">📅 Bookings</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;