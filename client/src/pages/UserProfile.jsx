import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">

          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

        </div>

        {/* Profile Info */}
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
            <span className="font-medium">User</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>

        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() => navigate("/dashboard")}
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

export default UserProfile;