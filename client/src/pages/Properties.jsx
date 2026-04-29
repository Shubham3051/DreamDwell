import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Layout Components
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingState from '../components/common/LoadingState';

// Feature Components
import FilterSidebar from '../components/properties/FilterSidebar';
import PropertiesHeader from '../components/properties/PropertiesHeader';
import PropertiesGrid from '../components/properties/PropertiesGrid';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({});

  // ✅ FINAL FIXED FETCH FUNCTION
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("http://localhost:8000/api/properties");

      // 🔍 Debug (optional)
      console.log("API RESPONSE:", res.data);

      // ✅ Handle all response formats
      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data?.properties)) {
        data = res.data.properties;
      } else if (Array.isArray(res.data?.property)) {
        data = res.data.property;
      } else if (Array.isArray(res.data?.data)) {
        data = res.data.data;
      }

      setProperties(data);

    } catch (err) {
      console.error("API Error:", err);
      setError("We couldn't load the listings. Please try again.");
      setProperties([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ FILTER + SORT
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.location) {
      result = result.filter((p) =>
        p.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType?.length > 0) {
      result = result.filter((p) =>
        filters.propertyType.some(
          (t) => t.toLowerCase() === p.type?.toLowerCase()
        )
      );
    }

    if (filters.bedrooms > 0) {
      result = result.filter((p) => (p.beds || 0) >= filters.bedrooms);
    }

    if (filters.availability) {
      result = result.filter(
        (p) => p.availability?.toLowerCase() === filters.availability.toLowerCase()
      );
    }

    if (filters.bathrooms > 0) {
      result = result.filter((p) => (p.baths || 0) >= filters.bathrooms);
    }

    if (filters.amenities?.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((a) => p.amenities?.includes(a))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        result.sort((a, b) =>
          (b._id || '').localeCompare(a._id || '')
        );
        break;
      default:
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  return (
    <div className="bg-[#FAF8F4]/30 min-h-screen flex flex-col font-manrope">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-[#E6E0DA] bg-white sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
          <FilterSidebar onFilterChange={setFilters} />
        </aside>

        <main className="flex-1 flex flex-col">
          <PropertiesHeader
            totalProperties={filteredProperties.length}
            currentSort={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewChange={setViewMode}
          />

          <section className="flex-1 p-4 md:p-6 lg:p-8">
            {loading ? (
              <LoadingState message="Curating best properties for you..." />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchProperties}
                  className="px-6 py-2 bg-[#D4755B] text-white rounded-lg hover:bg-[#B8624A] transition"
                >
                  Retry Load
                </button>
              </div>
            ) : (
              <PropertiesGrid
                properties={filteredProperties}
                viewMode={viewMode}
              />
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;