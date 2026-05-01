import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, BedDouble, Bath, Maximize, Plus, Edit3, Trash2, 
  Search, Grid3X3, List as ListIcon, RefreshCw, MapPin, Building2 
} from "lucide-react";
import { toast } from "sonner";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

// Utility for formatting price and joining classes
const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
const cn = (...classes) => classes.filter(Boolean).join(' ');

const PROPERTY_TYPES = ["all", "House", "Apartment", "Office", "Villa"];

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const navigate = useNavigate();

  const fetchProperties = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      else setRefreshing(true);

      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/properties/user/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(res.data || []);
      if (isRefresh) toast.success("List updated");
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load your properties");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Property deleted successfully");
      setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = !searchTerm || 
      [p.title, p.location].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || p.type?.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4755B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5A5856] font-medium animate-pulse">Fetching your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto p-6 pb-20">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1C1B1A]">My Properties</h1>
            <p className="text-[#5A5856] text-sm mt-1">
              You have <span className="text-[#D4755B] font-bold">{filteredProperties.length}</span> active listings
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchProperties(true)}
              className="p-2.5 bg-white border border-[#E6D5C3] rounded-xl text-[#5A5856] hover:text-[#D4755B] transition-all shadow-sm"
              title="Refresh List"
            >
              <RefreshCw className={cn("w-5 h-5", refreshing && "animate-spin")} />
            </button>
            <button
              onClick={() => navigate("/add-property")}
              className="flex items-center gap-2 bg-[#D4755B] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#C05E44] transition shadow-lg shadow-[#D4755B]/20"
            >
              <Plus className="w-5 h-5" />
              Add Property
            </button>
          </div>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6D5C3] shadow-sm mb-8 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F4] border border-[#E6D5C3] rounded-xl outline-none focus:border-[#D4755B] transition-all text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-[#FAF8F4] p-1 rounded-xl border border-[#E6D5C3]">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                    filterType === type ? "bg-[#1C1B1A] text-white shadow-md" : "text-[#5A5856] hover:bg-white"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex bg-[#FAF8F4] p-1 rounded-xl border border-[#E6D5C3]">
              <button 
                onClick={() => setViewMode("grid")}
                className={cn("p-1.5 rounded-lg", viewMode === "grid" ? "bg-white text-[#D4755B] shadow-sm" : "text-gray-400")}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={cn("p-1.5 rounded-lg", viewMode === "list" ? "bg-white text-[#D4755B] shadow-sm" : "text-gray-400")}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <AnimatePresence mode="wait">
          {filteredProperties.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 bg-white rounded-3xl border border-[#E6D5C3] border-dashed"
            >
              <div className="w-20 h-20 bg-[#FAF8F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-[#E6D5C3]" />
              </div>
              <h3 className="text-xl font-bold text-[#1C1B1A]">No properties found</h3>
              <p className="text-[#5A5856] max-w-xs mx-auto mt-2">
                {searchTerm || filterType !== 'all' 
                  ? "Try adjusting your filters or search term to find what you're looking for." 
                  : "You haven't listed any properties yet."}
              </p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div 
              layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} onDelete={handleDelete} navigate={navigate} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              layout className="flex flex-col gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              {filteredProperties.map((property) => (
                <PropertyRow key={property._id} property={property} onDelete={handleDelete} navigate={navigate} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const PropertyCard = ({ property, onDelete, navigate }) => (
  <motion.div
    layout
    whileHover={{ y: -5 }}
    className="bg-white rounded-3xl border border-[#E6D5C3] shadow-sm hover:shadow-xl transition-all overflow-hidden group"
  >
    <div className="relative h-56 bg-[#F5F1E8] overflow-hidden">
      <img
        src={property.image?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
        alt={property.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-[#1C1B1A]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {property.type}
        </span>
      </div>
    </div>

    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-[#1C1B1A] line-clamp-1">{property.title}</h3>
        <p className="text-[#D4755B] font-black">{formatPrice(property.price)}</p>
      </div>
      
      <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
        <MapPin className="w-3 h-3" />
        <span className="truncate">{property.location}</span>
      </div>

      <div className="flex justify-between p-3 bg-[#FAF8F4] rounded-2xl mb-5">
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Beds</p>
          <div className="flex items-center gap-1 text-[#1C1B1A] font-bold">
            <BedDouble className="w-3 h-3 text-[#D4755B]" /> {property.beds}
          </div>
        </div>
        <div className="text-center border-x border-gray-200 px-4">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Baths</p>
          <div className="flex items-center gap-1 text-[#1C1B1A] font-bold">
            <Bath className="w-3 h-3 text-[#D4755B]" /> {property.baths}
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Sqft</p>
          <div className="flex items-center gap-1 text-[#1C1B1A] font-bold">
            <Maximize className="w-3 h-3 text-[#D4755B]" /> {property.sqft}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => navigate(`/update/${property._id}`)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
        >
          <Edit3 className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={() => onDelete(property._id)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-all"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  </motion.div>
);

const PropertyRow = ({ property, onDelete, navigate }) => (
  <motion.div
    layout
    className="bg-white p-4 rounded-2xl border border-[#E6D5C3] flex items-center gap-4 hover:shadow-md transition-shadow"
  >
    <img 
      src={property.image?.[0]} 
      className="w-24 h-24 rounded-xl object-cover flex-shrink-0" 
      alt="" 
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-[#1C1B1A] truncate">{property.title}</h3>
        <span className="text-[9px] font-black px-2 py-0.5 bg-gray-100 rounded text-gray-500 uppercase">{property.type}</span>
      </div>
      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
        <MapPin className="w-3 h-3" /> {property.location}
      </p>
      <div className="flex gap-4 text-xs font-bold text-gray-600">
        <span className="flex items-center gap-1"><BedDouble className="w-3 h-3 text-[#D4755B]" /> {property.beds}</span>
        <span className="flex items-center gap-1"><Bath className="w-3 h-3 text-[#D4755B]" /> {property.baths}</span>
        <span className="flex items-center gap-1"><Maximize className="w-3 h-3 text-[#D4755B]" /> {property.sqft}</span>
      </div>
    </div>
    <div className="text-right px-4">
      <p className="text-lg font-black text-[#D4755B]">{formatPrice(property.price)}</p>
    </div>
    <div className="flex gap-2">
      <button onClick={() => navigate(`/update/${property._id}`)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#1C1B1A] transition-colors">
        <Edit3 className="w-5 h-5" />
      </button>
      <button onClick={() => onDelete(property._id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

export default PropertyList;