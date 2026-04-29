import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Home, DollarSign } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const inputClass =
  "w-full px-4 py-3 bg-white border border-[#E6D5C3] rounded-xl text-[#1C1B1A] text-sm outline-none focus:border-[#D4755B] focus:ring-2 focus:ring-[#D4755B]/15";

const sectionClass =
  "bg-white p-6 rounded-2xl border border-[#E6D5C3] shadow-sm mb-5";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "",
    availability: "",
    description: "",
    amenities: "",
    phone: "",
    googleMapLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/properties/${id}`);
        const property = res.data;

        setForm({
          title: property.title || "",
          location: property.location || "",
          price: property.price || "",
          image: Array.isArray(property.image) ? property.image.join(", ") : property.image || "",
          beds: property.beds || "",
          baths: property.baths || "",
          sqft: property.sqft || "",
          type: property.type || "",
          availability: property.availability || "",
          description: property.description || "",
          amenities: Array.isArray(property.amenities) ? property.amenities.join(", ") : property.amenities || "",
          phone: property.phone || "",
          googleMapLink: property.googleMapLink || "",
        });
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        image: form.image
          ? form.image.split(",").map((img) => img.trim()).filter(Boolean)
          : [],
        amenities: form.amenities
          ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean)
          : [],
        price: Number(form.price) || 0,
        beds: Number(form.beds) || 0,
        baths: Number(form.baths) || 0,
        sqft: Number(form.sqft) || 0,
      };

      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/api/properties/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Property updated successfully!");
      navigate("/list"); // Redirect back to list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update property");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex justify-center items-center">
        <p className="text-[#5A5856]">Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl"
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1C1B1A] flex items-center gap-2">
            <Home className="w-5 h-5 text-[#D4755B]" />
            Update Property
          </h1>
          <p className="text-sm text-[#5A5856]">
            Modify details for the existing property
          </p>
        </div>

        {/* BASIC INFO */}
        <div className={sectionClass}>
          <h2 className="font-semibold mb-3 text-[#1C1B1A]">
            Basic Information
          </h2>

          <input
            name="title"
            placeholder="Property Title"
            onChange={handleChange}
            value={form.title}
            className={inputClass}
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            value={form.location}
            className={`${inputClass} mt-3`}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
            className={`${inputClass} mt-3 h-24 resize-none`}
          />
        </div>

        {/* PRICE */}
        <div className={sectionClass}>
          <h2 className="font-semibold mb-3 text-[#1C1B1A] flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#D4755B]" />
            Price & Details
          </h2>

          <input
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            value={form.price}
            className={inputClass}
          />

          <div className="grid grid-cols-3 gap-3 mt-3">
            <input
              name="beds"
              placeholder="Beds"
              type="number"
              onChange={handleChange}
              value={form.beds}
              className={inputClass}
            />
            <input
              name="baths"
              placeholder="Baths"
              type="number"
              onChange={handleChange}
              value={form.baths}
              className={inputClass}
            />
            <input
              name="sqft"
              placeholder="Sqft"
              type="number"
              onChange={handleChange}
              value={form.sqft}
              className={inputClass}
            />
          </div>
        </div>

        {/* MEDIA */}
        <div className={sectionClass}>
          <h2 className="font-semibold mb-3 text-[#1C1B1A]">
            Media
          </h2>

          <input
            name="image"
            placeholder="Image URLs (comma separated)"
            onChange={handleChange}
            value={form.image}
            className={inputClass}
          />
        </div>

        {/* EXTRA INFO */}
        <div className={sectionClass}>
          <h2 className="font-semibold mb-3 text-[#1C1B1A] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4755B]" />
            Additional Info
          </h2>

          <input
            name="type"
            placeholder="Type (House, Apartment...)"
            onChange={handleChange}
            value={form.type}
            className={inputClass}
          />

          <input
            name="availability"
            placeholder="Rent or Buy"
            onChange={handleChange}
            value={form.availability}
            className={`${inputClass} mt-3`}
          />

          <input
            name="amenities"
            placeholder="Amenities (comma separated)"
            onChange={handleChange}
            value={form.amenities}
            className={`${inputClass} mt-3`}
          />
        </div>

        {/* CONTACT */}
        <div className={sectionClass}>
          <h2 className="font-semibold mb-3 text-[#1C1B1A]">
            Contact
          </h2>

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={form.phone}
            className={inputClass}
          />

          <input
            name="googleMapLink"
            placeholder="Google Map Link"
            onChange={handleChange}
            value={form.googleMapLink}
            className={`${inputClass} mt-3`}
          />
        </div>

        {/* SUBMIT */}
        <button
          disabled={submitting}
          className="w-full mt-4 bg-[#D4755B] hover:bg-[#C05E44] text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {submitting ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
