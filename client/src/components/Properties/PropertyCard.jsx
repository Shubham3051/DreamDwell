import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  if (!property) return null;

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // or user

  const handleClick = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please login to view property details");
      return;
    }

    navigate(`/property/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="w-full h-52 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h3>

        <p className="text-xl font-bold text-blue-600 mb-1">
          ${property.price.toLocaleString()}
        </p>

        <p className="text-gray-500 text-sm">
          📍 {property.location}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;