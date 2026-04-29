
// import React, { useContext, useEffect, useState } from "react";
// import { useParams, Navigate, useNavigate } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// import { AuthContext } from "../context/AuthContext";
// import { useChat } from "../context/ChatContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, loading: authLoading } = useContext(AuthContext);
//   const { setActiveChat } = useChat();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [bookingForm, setBookingForm] = useState({
//     date: "",
//     time: "",
//     phone: "",
//     message: "",
//   });
//   const [bookingLoading, setBookingLoading] = useState(false);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/properties/${id}`);
//         setProperty(res.data);
//       } catch (error) {
//         console.error("Error fetching property:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   // 🔐 AUTH CHECK — wait for auth to finish loading
//   if (authLoading) return null;

//   if (!user) {
//     return <Navigate to="/register" replace />;
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
//         Loading property...
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
//         Property not found.
//       </div>
//     );
//   }

//   //  SAVE PROPERTY
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:8000/api/saved",
//         { propertyId: property._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) {
//         toast.success("Property saved ");
//       } else {
//         toast.info(res.data.message || "Already saved");
//       }
//     } catch (error) {
//       console.error("Error saving property:", error);
//       toast.error("Failed to save property");
//     }
//   };

//   //  CONTACT AGENT
//   const handleContactAgent = () => {
//     if (property.postedBy) {
//       setActiveChat({
//         id: property.postedBy._id,
//         name: property.postedBy.name,
//       });
//       navigate("/chat");
//     } else {
//       toast.error("Agent details not found for this property.");
//     }
//   };


//   const imageUrl = Array.isArray(property.image) ? property.image[0] : property.image;

//   const handleBookVisit = async () => {
//     if (!bookingForm.date || !bookingForm.time || !bookingForm.phone) {
//       toast.error("Please fill date, time, and phone");
//       return;
//     }

//     if (!property.postedBy) {
//       toast.error("Agent details not found for this property");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:8000/api/bookings",
//         {
//           propertyId: property._id,
//           agentId: property.postedBy._id,
//           date: bookingForm.date,
//           time: bookingForm.time,
//           phone: bookingForm.phone,
//           message: bookingForm.message,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         toast.success("Visit booked successfully! 🎉");
//         setShowBookingModal(false);
//         setBookingForm({ date: "", time: "", phone: "", message: "" });
//       } else {
//         toast.info(res.data.message);
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error("Failed to book visit");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="px-6 md:px-12 lg:px-20 py-10  bg-[#f4f1ea] min-h-screen">
//         <div className="grid lg:grid-cols-2 gap-10 bg-[#fefbf6] p-6 md:p-8 rounded-2xl shadow-lg">
//           {/* Image */}
//           <div className="w-full h-72 md:h-[400px] overflow-hidden rounded-xl bg-gray-100">
//             <img
//               src={imageUrl}
//               alt={property.title}
//               className="w-full h-full object-cover hover:scale-105 transition duration-300"
//             />
//           </div>

//           {/* Info */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
//                 {property.title}
//               </h2>

//               <p className="text-2xl font-semibold text-blue-600 mb-2">
//                 ${property.price ? property.price.toLocaleString() : "Contact for price"}
//               </p>

//               <p className="text-gray-500 mb-4 text-sm">
//                 📍 {property.location}
//               </p>

//               <p className="text-gray-700 leading-relaxed">
//                 {property.description}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button 
//                 onClick={handleContactAgent}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                  Contact Agent
//               </button>

//               <button
//                 onClick={handleSave}
//                 className="bg-[#D4755B] text-white font-manrope font-bold px-6 py-2 rounded-lg hover:bg-[#B86851] transition-all hover:shadow-lg"
//               >
//                  Save
//               </button>

//               <button
//                 onClick={() => setShowBookingModal(true)}
//                 className="bg-[#D4755B] text-white font-manrope font-bold px-6 py-2 rounded-lg hover:bg-[#B86851] transition-all hover:shadow-lg"
//               >
//                  Book a Visit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* BOOKING MODAL */}
//       {showBookingModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Book a Visit</h3>
//             <p className="text-sm text-gray-500 mb-4">
//               Schedule a visit to <strong>{property.title}</strong>
//             </p>

//             <div className="space-y-3">
//               <input
//                 type="date"
//                 value={bookingForm.date}
//                 onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B]"
//               />
//               <input
//                 type="time"
//                 value={bookingForm.time}
//                 onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B]"
//               />
//               <input
//                 type="tel"
//                 placeholder="Your phone number"
//                 value={bookingForm.phone}
//                 onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B]"
//               />
//               <textarea
//                 placeholder="Any message for the agent? (optional)"
//                 value={bookingForm.message}
//                 onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#D4755B] resize-none"
//               />
//             </div>

//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={() => setShowBookingModal(false)}
//                 className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBookVisit}
//                 disabled={bookingLoading}
//                 className="flex-1 py-2 bg-[#D4755B] text-white rounded-xl hover:bg-[#B86851] transition disabled:opacity-50"
//               >
//                 {bookingLoading ? "Booking..." : "Confirm Booking"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default PropertyDetails;





import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
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
  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    phone: "",
    message: "",
  });

  const [currentImage, setCurrentImage] = useState(0);

  // FETCH PROPERTY
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/properties/${id}`
        );
        setProperty(res.data);
      } catch {
        toast.error("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/register" replace />;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Property not found
      </div>
    );
  }

  const images = Array.isArray(property.image)
    ? property.image
    : [property.image];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // SAVE
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/saved",
        { propertyId: property._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Saved successfully");
    } catch {
      toast.error("Failed to save");
    }
  };

  // CHAT
  const handleContactAgent = () => {
    if (!property.postedBy) return toast.error("Agent not found");

    setActiveChat({
      id: property.postedBy._id,
      name: property.postedBy.name,
    });

    navigate("/chat");
  };

  // BOOK
  const handleBookVisit = async () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.phone) {
      return toast.error("Fill all required fields");
    }

    try {
      setBookingLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/bookings",
        {
          propertyId: property._id,
          agentId: property.postedBy?._id,
          ...bookingForm,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Visit booked 🎉");
      setShowBookingModal(false);
      setBookingForm({ date: "", time: "", phone: "", message: "" });
    } catch {
      toast.error("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-[#F2EFE9] min-h-screen">

      <Navbar />

      {/* HERO */}
      <div className="max-w-[1280px] mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* IMAGE SLIDER */}
          <div className="lg:col-span-2">

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">

              <img
                src={images[currentImage]}
                className="w-full h-[460px] object-cover"
                alt="property"
              />

              {/* LEFT */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                ‹
              </button>

              {/* RIGHT */}
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                ›
              </button>

              {/* COUNT */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {currentImage + 1} / {images.length}
              </div>

            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setCurrentImage(index)}
                  className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                    currentImage === index
                      ? "border-[#D4755B]"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* SIDE CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {property.title}
            </h2>

            <p className="text-[#D4755B] text-3xl font-bold mb-2">
              ₹{property.price?.toLocaleString()}
            </p>

            <p className="text-gray-500 text-sm mb-6">
              📍 {property.location}
            </p>

            <div className="space-y-3">

              <button
                onClick={handleContactAgent}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Contact Agent
              </button>

              <button
                onClick={handleSave}
                className="w-full border border-[#D4755B] text-[#D4755B] py-3 rounded-xl hover:bg-[#D4755B] hover:text-white transition"
              >
                Save Property
              </button>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-[#D4755B] text-white py-3 rounded-xl hover:bg-[#c45f47] transition"
              >
                Book Visit
              </button>

            </div>
          </div>

        </div>

        {/* ABOUT */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm p-8">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            About This Property
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {property.description}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Beds</p>
              <p className="text-lg font-bold">{property.beds}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Baths</p>
              <p className="text-lg font-bold">{property.baths}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Area</p>
              <p className="text-lg font-bold">{property.sqft} sqft</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Type</p>
              <p className="text-lg font-bold">{property.type}</p>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">

            <h2 className="text-xl font-bold mb-4">Book Visit</h2>

            <div className="space-y-3">

              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, date: e.target.value })
                }
              />

              <input
                type="time"
                className="w-full p-3 border rounded-lg"
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, time: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-3 border rounded-lg"
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, phone: e.target.value })
                }
              />

            </div>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleBookVisit}
                disabled={bookingLoading}
                className="flex-1 bg-[#D4755B] text-white py-2 rounded-lg"
              >
                {bookingLoading ? "Booking..." : "Confirm"}
              </button>

            </div>

          </div>

        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetails;