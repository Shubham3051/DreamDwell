import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { toast } from "react-toastify";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { setActiveChat } = useChat();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    phone: "",
    message: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // 🔐 AUTH CHECK — wait for auth to finish loading
  if (authLoading) return null;

  if (!user) {
    return <Navigate to="/select-role" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Property not found.
      </div>
    );
  }

  // 💾 SAVE PROPERTY
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/api/saved",
        { propertyId: property._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Property saved ❤️");
      } else {
        toast.info(res.data.message || "Already saved");
      }
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to save property");
    }
  };

  // 💬 CONTACT AGENT
  const handleContactAgent = () => {
    if (property.postedBy) {
      setActiveChat({
        id: property.postedBy._id,
        name: property.postedBy.name,
      });
      navigate("/chat");
    } else {
      toast.error("Agent details not found for this property.");
    }
  };


  const imageUrl = Array.isArray(property.image) ? property.image[0] : property.image;

  const handleBookVisit = async () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.phone) {
      toast.error("Please fill date, time, and phone");
      return;
    }

    if (!property.postedBy) {
      toast.error("Agent details not found for this property");
      return;
    }

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/api/bookings",
        {
          propertyId: property._id,
          agentId: property.postedBy._id,
          date: bookingForm.date,
          time: bookingForm.time,
          phone: bookingForm.phone,
          message: bookingForm.message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Visit booked successfully! 🎉");
        setShowBookingModal(false);
        setBookingForm({ date: "", time: "", phone: "", message: "" });
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book visit");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-20 py-10  bg-[#fff1e2] min-h-screen">
        <div className="grid lg:grid-cols-2 gap-10 bg-[#FAF8F4] p-6 md:p-8 rounded-2xl shadow-lg">
          {/* Image */}
          <div className="w-full h-72 md:h-[400px] overflow-hidden rounded-xl bg-gray-100">
            <img
              src={imageUrl}
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
                ${property.price ? property.price.toLocaleString() : "Contact for price"}
              </p>

              <p className="text-gray-500 mb-4 text-sm">
                📍 {property.location}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={handleContactAgent}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                💬 Contact Agent
              </button>

              <button
                onClick={handleSave}
                className="bg-[#D4755B] text-white font-manrope font-bold px-6 py-2 rounded-lg hover:bg-[#B86851] transition-all hover:shadow-lg"
              >
                ❤️ Save
              </button>

              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-[#D4755B] text-white font-manrope font-bold px-6 py-2 rounded-lg hover:bg-[#B86851] transition-all hover:shadow-lg"
              >
                📅 Book a Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Book a Visit</h3>
            <p className="text-sm text-gray-500 mb-4">
              Schedule a visit to <strong>{property.title}</strong>
            </p>

            <div className="space-y-3">
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B]"
              />
              <input
                type="time"
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B]"
              />
              <input
                type="tel"
                placeholder="Your phone number"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B]"
              />
              <textarea
                placeholder="Any message for the agent? (optional)"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B] resize-none"
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBookVisit}
                disabled={bookingLoading}
                className="flex-1 py-2 bg-[#D4755B] text-white rounded-xl hover:bg-[#B86851] transition disabled:opacity-50"
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;