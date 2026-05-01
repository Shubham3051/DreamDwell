import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MapPin, Home, DollarSign, Image as ImageIcon, Phone, Info, Plus } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 bg-white border border-[#E6D5C3] rounded-xl text-[#1C1B1A] text-sm outline-none transition-all duration-300 focus:border-[#D4755B] focus:ring-4 focus:ring-[#D4755B]/10 placeholder:text-gray-300";

const labelClass = 
  "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const AddProperty = () => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "House",
    availability: "buy",
    description: "",
    amenities: "",
    phone: "",
    googleMapLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return toast.error("Please fill in required fields");

    try {
      setLoading(true);
      const payload = {
        ...form,
        image: form.image ? form.image.split(",").map((img) => img.trim()) : [],
        amenities: form.amenities ? form.amenities.split(",").map((a) => a.trim()) : [],
        price: Number(form.price),
        beds: Number(form.beds),
        baths: Number(form.baths),
        sqft: Number(form.sqft),
      };

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/properties", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Estate listed successfully!");
      setForm({
        title: "", location: "", price: "", image: "", beds: "", baths: "",
        sqft: "", type: "House", availability: "buy", description: "",
        amenities: "", phone: "", googleMapLink: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to list property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] py-12 px-6 lg:px-24 flex justify-center font-manrope">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Main Form */}
        <div className="lg:col-span-8 space-y-6">
          <header className="mb-8">
            <h1 className="text-4xl font-black italic tracking-tighter text-[#1C1B1A] uppercase flex items-center gap-3">
              New Listing
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">
              Broadcast your property to the global portfolio
            </p>
          </header>

          <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="bg-white p-8 rounded-[2rem] border border-[#E6D5C3] shadow-sm">
            <h2 className={labelClass}>Core Specifications</h2>
            <div className="space-y-4">
              <input name="title" placeholder="Property Title (e.g. Skyline Penthouse)" onChange={handleChange} value={form.title} className={inputClass} />
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-[#D4755B]" />
                <input name="location" placeholder="Full Address / Location" onChange={handleChange} value={form.location} className={`${inputClass} pl-11`} />
              </div>
              <textarea name="description" placeholder="The narrative of the property..." onChange={handleChange} value={form.description} className={`${inputClass} h-32 resize-none`} />
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="bg-white p-8 rounded-[2rem] border border-[#E6D5C3] shadow-sm">
            <h2 className={labelClass}>Financials & Layout</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2">
                <DollarSign className="absolute left-4 top-3.5 w-4 h-4 text-[#D4755B]" />
                <input name="price" placeholder="Valuation (USD)" type="number" onChange={handleChange} value={form.price} className={`${inputClass} pl-11 font-bold`} />
              </div>
              <input name="beds" placeholder="Bedrooms" type="number" onChange={handleChange} value={form.beds} className={inputClass} />
              <input name="baths" placeholder="Bathrooms" type="number" onChange={handleChange} value={form.baths} className={inputClass} />
              <input name="sqft" placeholder="Total Sq. Ft." type="number" onChange={handleChange} value={form.sqft} className={`${inputClass} col-span-2`} />
            </div>
          </motion.section>
        </div>

        {/* RIGHT COLUMN: Media & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="bg-[#1C1B1A] p-8 rounded-[2rem] text-white">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Gallery Links</h2>
            <div className="space-y-4">
               <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <img src={form.image.split(",")[0]} className="w-full h-full object-cover opacity-60" alt="Preview" />
                ) : (
                  <ImageIcon className="text-white/20 w-8 h-8" />
                )}
               </div>
               <textarea name="image" placeholder="Image URLs (Separated by commas)" onChange={handleChange} value={form.image} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs outline-none focus:border-[#D4755B] h-24 resize-none" />
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="bg-white p-8 rounded-[2rem] border border-[#E6D5C3] shadow-sm">
            <h2 className={labelClass}>Market Status</h2>
            <div className="space-y-4">
              <select name="availability" onChange={handleChange} value={form.availability} className={inputClass}>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <input name="type" placeholder="Style (e.g. Modern Villa)" onChange={handleChange} value={form.type} className={inputClass} />
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-[#D4755B]" />
                <input name="phone" placeholder="Contact Line" onChange={handleChange} value={form.phone} className={`${inputClass} pl-11`} />
              </div>
            </div>
          </motion.section>

          <button
            disabled={loading}
            className="w-full group bg-[#D4755B] hover:bg-[#1C1B1A] text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all duration-700 flex items-center justify-center gap-3 shadow-xl shadow-[#D4755B]/20"
          >
            {loading ? "Processing..." : (
              <>
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                Publish Estate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;