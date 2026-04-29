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
import { Menu, Bell, X, Home } from "lucide-react";

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
    navigate("/register");
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

  // ✅ Dashboard paths by role
  const dashboardPaths = {
    user: "/user-dashboard",
    agent: "/agent-dashboard",
    admin: "/admin",
  };

  const getDashboardPath = () => {
    if (!user || !user.role) return "/";
    return dashboardPaths[user.role] || "/";
  };

  // ✅ Base nav links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
  ];

  // ✅ Role-based links
  const roleLinks = {
    user: [
      { name: "Chat", path: "/chat" },
      { name: "Bookings", path: "/bookings" },
    ],
    agent: [
      { name: "Chat", path: "/chat" },
      { name: "My Listings", path: "/list" },
    ],
    admin: [
      { name: "Users", path: "/admin/users" },
      { name: "Properties", path: "/admin/properties" },
    ],
  };

  const renderLinks = (isMobile = false) => {
    const baseClass = isMobile
      ? "hover:text-cyan-400"
      : ({ isActive }) =>
          `transition ${
            isActive
              ? "text-cyan-400 font-semibold"
              : "hover:text-cyan-400"
          }`;

    return (
      <>
        {/* Common Links */}
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={baseClass}>
            {link.name}
          </NavLink>
        ))}

        {/* Dashboard */}
        {user && (
          <NavLink to={getDashboardPath()} className={baseClass}>
            Dashboard
          </NavLink>
        )}

        {/* Role Links */}
        {user &&
          roleLinks[user.role]?.map((link) => (
            <NavLink key={link.path} to={link.path} className={baseClass}>
              {link.name}
            </NavLink>
          ))}
      </>
    );
  };

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-[#1C1B1A] text-white sticky top-0 z-50">

      <div className="flex justify-between items-center w-full">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Sidebar Toggle */}
          {setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">DreamDwell</span>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {renderLinks()}
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
                      navigate("/profile");
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
      <div className="absolute top-full left-0 w-full md:hidden bg-[#1C1B1A] shadow-lg border-t border-white/10 z-50 animate-fadeIn">
        <div className="flex flex-col gap-4 px-6 py-4">
          {renderLinks(true)}
        </div>
      </div>
    )}
    </nav>
  );
};

export default Navbar;