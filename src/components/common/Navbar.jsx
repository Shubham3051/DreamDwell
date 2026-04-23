import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white sticky top-0 z-50">
      {/* Logo */}
      <h2 className="text-xl font-semibold m-0">🏠 VR Estate</h2>

      {/* Links */}
      <div className="flex gap-6">
        <NavLink to="/" className="hover:text-cyan-400 transition">
          Home
        </NavLink>
        <NavLink to="/properties" className="hover:text-cyan-400 transition">
          Properties
        </NavLink>

        {user && (
          <NavLink
            to="/dashboard"
            className="hover:text-cyan-400 transition"
          >
            Dashboard
          </NavLink>
        )}
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="ml-3 px-3 py-1.5 bg-cyan-500 rounded-md hover:bg-cyan-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="ml-3 px-3 py-1.5 bg-cyan-500 rounded-md hover:bg-cyan-600 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="mr-3">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;