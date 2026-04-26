import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaved(res.data || []);
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/saved/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved((prev) => prev.filter((item) => item._id !== id));
      toast.success("Property removed");
    } catch (error) {
      console.error("Error removing property:", error);
      toast.error("Failed to remove");
    }
  };

  const handleOpen = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-20 py-10 bg-[#FAF8F4] min-h-screen">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          ❤️ Saved Properties
        </h1>

        {loading ? (
          <div className="text-gray-500 text-center mt-20 text-lg">
            Loading saved properties...
          </div>
        ) : saved.length === 0 ? (
          <div className="text-gray-500 text-center mt-20 text-lg">
            No saved properties yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {saved.map((property) => {
              const imageUrl = Array.isArray(property.image) ? property.image[0] : property.image;
              return (
                <div
                  key={property._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >

                  {/* Image */}
                  <div
                    onClick={() => handleOpen(property._id)}
                    className="h-48 overflow-hidden cursor-pointer bg-gray-100"
                  >
                    <img
                      src={imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">

                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {property.title}
                    </h2>

                    <p className="text-blue-600 font-bold mt-1">
                      ${property.price ? property.price.toLocaleString() : "N/A"}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      📍 {property.location}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">

                      <button
                        onClick={() => handleOpen(property._id)}
                        className="text-sm bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleRemove(property._id)}
                        className="text-sm border border-red-400 text-red-500 px-4 py-1 rounded-lg hover:bg-red-50 transition"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;