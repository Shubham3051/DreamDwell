import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/common/Footer";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleOpenProperty = (id) => {
    if (id) {
      navigate(`/property/${id}`);
    }
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-20 py-10 bg-[#FAF8F4] min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          📅 My Bookings
        </h1>

        {loading ? (
          <div className="text-gray-500 text-center mt-20 text-lg">
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500 text-center mt-20 text-lg">
            You haven't scheduled any visits yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const property = booking.property;
              const imageUrl = property?.image
                ? Array.isArray(property.image)
                  ? property.image[0]
                  : property.image
                : "";

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div
                    onClick={() => handleOpenProperty(property?._id)}
                    className="h-48 overflow-hidden cursor-pointer bg-gray-100"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={property?.title || "Property"}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2
                          className="text-lg font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-blue-600 transition"
                          onClick={() => handleOpenProperty(property?._id)}
                        >
                          {property?.title || "Property Unavailable"}
                        </h2>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded w-fit capitalize ${
                            statusColor[booking.status]
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm mb-3">
                        📍 {property?.location || "Unknown Location"}
                      </p>

                      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 space-y-1 mb-4">
                        <p>
                          <span className="font-semibold">Agent:</span>{" "}
                          {booking.agent?.name || "Unknown"}
                        </p>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Time:</span> {booking.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Bookings;
