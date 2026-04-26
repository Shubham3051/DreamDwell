import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Role-based dashboard redirect
  const getDashboard = () => {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "agent") return "/agent-dashboard";
    return "/user-dashboard";
  };

  // ✅ Role badge color
  const getRoleStyle = () => {
    switch (user?.role) {
      case "admin":
        return "bg-red-100 text-red-600";
      case "agent":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">

        {/* 🔥 HEADER */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">

          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name}
            </h2>
            <p className="text-gray-500">{user?.email}</p>

            {/* ✅ Role Badge */}
            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getRoleStyle()}`}>
              {user?.role}
            </span>
          </div>

        </div>

        {/* 🔥 PROFILE INFO */}
        <div className="grid gap-4">

          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">Full Name</span>
            <span className="font-medium">{user?.name}</span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">Account Type</span>
            <span className="font-medium capitalize">{user?.role}</span>
          </div>

          {/* ✅ Agent Only */}
          {user?.role === "agent" && (
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">Total Listings</span>
              <span className="font-medium">12</span>
            </div>
          )}

          {/* ✅ Admin Only */}
          {user?.role === "admin" && (
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">System Access</span>
              <span className="font-medium text-red-500">Full Control</span>
            </div>
          )}

          {/* ✅ Common */}
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>

        </div>

        {/* 🔥 ACTIONS */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() => navigate(getDashboard())}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;