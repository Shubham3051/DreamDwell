import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white sticky top-0 z-50">

      {/* Logo */}
      <h2 className="text-xl font-semibold m-0">🏠 DreamDwell</h2>

      <div className="flex gap-6">

      {/* Links */}
      <div className="flex gap-6 mt-5">
        <NavLink to="/" className="hover:text-cyan-400 transition">
          Home
        </NavLink>

        <NavLink to="/properties" className="hover:text-cyan-400 transition">
          Properties
        </NavLink>

        {user && (
          <NavLink to="/dashboard" className="hover:text-cyan-400 transition">
            Dashboard
          </NavLink>
        )}
      </div>

      {/* User Section */}
      <div className="relative" ref={dropdownRef}>
        {user && (
          <>
            {/* User Button */}
            <button
              onClick={() => setOpen(!open)}
              className="px-3 py-1.5 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              👤 {user.name}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-12 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden">

                <button
                  onClick={() => setOpen(false) || navigate("/user-profile")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
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
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;