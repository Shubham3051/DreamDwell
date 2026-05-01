import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { AuthContext } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { toast } from "react-toastify";
import axios from "axios";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageSquare, 
  Calendar,
  X
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { setActiveChat } = useChat();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({ date: "", time: "", phone: "", message: "" });
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/properties/${id}`);
        setProperty(res.data);
      } catch {
        toast.error("Failed to load property portfolio");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/register" replace />;

  if (loading) return (
    <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center italic font-bold text-[#1C1B1A]/40 uppercase tracking-widest">
      Curating Estate Details...
    </div>
  );

  if (!property) return <Navigate to="/404" />;

  const images = Array.isArray(property.image) ? property.image : [property.image];
  const nextImage = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/saved", { propertyId: property._id }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Added to your collection");
    } catch {
      toast.error("Unable to save at this time");
    }
  };

  const handleContactAgent = () => {
    if (!property.postedBy) return toast.error("Agent unavailable");
    setActiveChat({ id: property.postedBy._id, name: property.postedBy.name });
    navigate("/chat");
  };

  const handleBookVisit = async () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.phone) return toast.error("Please complete all fields");
    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/bookings", { propertyId: property._id, agentId: property.postedBy?._id, ...bookingForm }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Visit requested successfully");
      setShowBookingModal(false);
    } catch {
      toast.error("Booking request failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen font-manrope text-[#1C1B1A]">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Breadcrumb / Title Section */}
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B] mb-2">Exclusive Listing</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              <MapPin size={14} className="text-[#D4755B]" />
              {property.location}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: Media Gallery */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative group rounded-[2rem] overflow-hidden bg-black aspect-[16/10] shadow-2xl shadow-black/10">
              <img src={images[currentImage]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Estate" />
              
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevImage} className="p-3 bg-white/90 rounded-full hover:bg-white shadow-xl transform transition hover:scale-110"><ChevronLeft size={20}/></button>
                <button onClick={nextImage} className="p-3 bg-white/90 rounded-full hover:bg-white shadow-xl transform transition hover:scale-110"><ChevronRight size={20}/></button>
              </div>

              <div className="absolute bottom-6 left-6 bg-black/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
                Frame {currentImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {images.map((img, index) => (
                <button key={index} onClick={() => setCurrentImage(index)} className={`relative flex-shrink-0 w-28 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${currentImage === index ? 'ring-2 ring-[#D4755B] ring-offset-4' : 'opacity-60 hover:opacity-100'}`}>
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>

            {/* Description Area */}
            <div className="bg-white rounded-[2rem] p-10 border border-[#1C1B1A]/5">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#D4755B] mb-6">The Narrative</h3>
              <p className="text-lg leading-relaxed font-medium text-gray-600 mb-10">
                {property.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400"><Bed size={18}/> <span className="text-[10px] font-black uppercase tracking-widest">Beds</span></div>
                  <p className="text-xl font-black">{property.beds || '—'}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400"><Bath size={18}/> <span className="text-[10px] font-black uppercase tracking-widest">Baths</span></div>
                  <p className="text-xl font-black">{property.baths || '—'}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400"><Maximize size={18}/> <span className="text-[10px] font-black uppercase tracking-widest">Area</span></div>
                  <p className="text-xl font-black">{property.sqft?.toLocaleString() || '—'} <span className="text-xs italic">sqft</span></p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400"><Home size={18}/> <span className="text-[10px] font-black uppercase tracking-widest">Type</span></div>
                  <p className="text-xl font-black uppercase text-sm tracking-tighter">{property.type || 'Estate'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Transaction Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1C1B1A] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-[#1C1B1A]/20">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B] mb-2">Valuation</p>
                <h2 className="text-5xl font-black tracking-tighter italic mb-8">
                  ₹{property.price?.toLocaleString() || 'P.O.A'}
                </h2>

                <div className="space-y-3">
                  <button onClick={() => setShowBookingModal(true)} className="w-full bg-[#D4755B] hover:bg-white hover:text-[#1C1B1A] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 flex items-center justify-center gap-2 shadow-xl shadow-[#D4755B]/10">
                    <Calendar size={16} /> Book Private Visit
                  </button>
                  <button onClick={handleContactAgent} className="w-full bg-white/10 hover:bg-white/20 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Consult Agent
                  </button>
                  <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 py-4 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                    <Heart size={14} /> Add to Collection
                  </button>
                </div>
              </div>

              {/* Agent Quick Card */}
              {property.postedBy && (
                <div className="bg-white rounded-[2rem] p-6 border border-[#1C1B1A]/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F2EFE9] flex items-center justify-center font-black text-[#D4755B]">
                    {property.postedBy.name?.[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Listed By</p>
                    <p className="font-black uppercase italic tracking-tighter">{property.postedBy.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-[#1C1B1A]/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-[#FAF8F4] w-full max-w-lg rounded-[3rem] p-10 relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-[#1C1B1A] transition-colors"><X size={24}/></button>
            </div>
            
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B] mb-2">Concierge Service</p>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Schedule Visit</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest px-1">Preferred Date</label>
                  <input type="date" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold shadow-sm focus:ring-2 ring-[#D4755B]" onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest px-1">Time Slot</label>
                  <input type="time" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold shadow-sm focus:ring-2 ring-[#D4755B]" onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest px-1">Direct Contact</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold shadow-sm focus:ring-2 ring-[#D4755B]" onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest px-1">Special Requirements</label>
                <textarea rows={3} placeholder="Tell us about your interests..." className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold shadow-sm focus:ring-2 ring-[#D4755B] resize-none" onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})} />
              </div>

              <button 
                onClick={handleBookVisit} 
                disabled={bookingLoading}
                className="w-full bg-[#1C1B1A] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#D4755B] transition-all duration-500 mt-4 disabled:opacity-50"
              >
                {bookingLoading ? "Confirming..." : "Request Appointment"}
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