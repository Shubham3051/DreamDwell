import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 text-2xl font-bold text-blue-600">
          DreamDwell
        </div>

        <nav className="mt-6 flex flex-col gap-5 px-4">
          <a href="/dashboard" className="block w-full text-left px-4 py-4 rounded-lg bg-blue-200 text-gray-600 font-medium hover:bg-blue-700 transition">
            Dashboard
          </a>
          <a href="/saved" className="block w-full text-left px-4 py-4 rounded-lg bg-blue-200 text-gray-600 font-medium hover:bg-blue-700 transition">
            Saved Properties
          </a>
          <a href="/my-inquiries" className="block w-full text-left px-4 py-4 rounded-lg bg-blue-200 text-gray-600 font-medium hover:bg-blue-700 transition">
            My Inquiries
          </a>
          <a href="/user-profile" className="block w-full text-left px-4 py-4 rounded-lg bg-blue-200 text-gray-600 font-medium hover:bg-blue-700 transition">
            Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <div className="flex items-center gap-4">
          <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => window.location.href = "/properties"}>
            Browse Properties
          </button>
          <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}>
            logout
          </button>
          </div>
        </div>


        
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Saved Properties</h2>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Inquiries Sent</h2>
            <p className="text-2xl font-bold text-green-600">5</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Viewed Properties</h2>
            <p className="text-2xl font-bold text-yellow-600">28</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Profile Completion</h2>
            <p className="text-2xl font-bold text-purple-600">80%</p>
          </div>

        </div>

        {/* Saved Properties */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Saved Properties</h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">
              <div>
                <h3 className="font-medium">Modern Apartment</h3>
                <p className="text-sm text-gray-500">New York</p>
              </div>
              <span className="text-blue-600 font-semibold">$2,000/mo</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <div>
                <h3 className="font-medium">Luxury Villa</h3>
                <p className="text-sm text-gray-500">Miami</p>
              </div>
              <span className="text-blue-600 font-semibold">$750,000</span>
            </div>

            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">Beach House</h3>
                <p className="text-sm text-gray-500">California</p>
              </div>
              <span className="text-blue-600 font-semibold">$1,200,000</span>
            </div>

          </div>
        </div>

        {/* Recommended Properties */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>

          <div className="grid md:grid-cols-3 gap-4">

            <div className="border rounded-lg p-4 hover:shadow">
              <h3 className="font-semibold">City Apartment</h3>
              <p className="text-sm text-gray-500">Los Angeles</p>
              <p className="text-blue-600 font-bold mt-2">$1,500/mo</p>
            </div>

            <div className="border rounded-lg p-4 hover:shadow">
              <h3 className="font-semibold">Family House</h3>
              <p className="text-sm text-gray-500">Texas</p>
              <p className="text-blue-600 font-bold mt-2">$320,000</p>
            </div>

            <div className="border rounded-lg p-4 hover:shadow">
              <h3 className="font-semibold">Luxury Condo</h3>
              <p className="text-sm text-gray-500">Chicago</p>
              <p className="text-blue-600 font-bold mt-2">$900,000</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
