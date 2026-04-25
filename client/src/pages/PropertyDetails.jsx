import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { properties } from "../data/mockData";
import Navbar from "../components/common/Navbar";

const PropertyDetails = () => {
  const { id } = useParams();

  // 🔐 CHECK LOGIN
  const isLoggedIn = localStorage.getItem("token");

  // 🚫 REDIRECT IF NOT LOGGED IN
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const property = properties.find((item) => String(item.id) === id);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Property not found.
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-20 py-10 bg-gray-50 min-h-screen">

        <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 md:p-8 rounded-2xl shadow-lg">

          {/* Image */}
          <div className="w-full h-72 md:h-[400px] overflow-hidden rounded-xl">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {property.title}
              </h2>

              <p className="text-2xl font-semibold text-blue-600 mb-2">
                ${property.price.toLocaleString()}
              </p>

              <p className="text-gray-500 mb-4 text-sm">
                📍 {property.location}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Contact Agent
              </button>

              <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                Save
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;