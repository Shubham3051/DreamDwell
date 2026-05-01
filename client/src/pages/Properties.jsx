import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

// Layout Components
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingState from '../components/common/LoadingState';

// Feature Components
import FilterSidebar from '../components/properties/FilterSidebar';
import PropertiesHeader from '../components/properties/PropertiesHeader';
import PropertiesGrid from '../components/properties/PropertiesGrid';

// Icons
import { SlidersHorizontal, X, ChevronLeft } from 'lucide-react'; 

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({});
  
  // Sidebar Toggle State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Memoized fetch function to prevent dependency loops
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:8000/api/properties");
      
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.properties)) data = res.data.properties;
      else if (Array.isArray(res.data?.data)) data = res.data.data;
      
      setProperties(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("We couldn't load the listings.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // ✅ Complete Filter & Sort Logic
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

    // Sorting Logic
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        result.sort((a, b) => (b._id || '').localeCompare(a._id || ''));
        break;
      default:
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  return (
    <div className="bg-[#FAF8F4] min-h-screen flex flex-col font-manrope selection:bg-[#D4755B]/30">
      <Navbar />

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* ✅ ENHANCED SIDEBAR DRAWER */}
        <aside 
          className={`
            fixed top-[72px] left-0 z-50 
            h-[calc(100vh-72px)] bg-white border-r border-[#1C1B1A]/5
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'}
            overflow-hidden
          `}
        >
          <div className="w-80 h-full flex flex-col">
            <div className="p-6 border-b border-[#1C1B1A]/5 flex justify-between items-center bg-white">
              <div>
                <h2 className="font-black italic uppercase tracking-tighter text-xl text-[#1C1B1A]">Refine</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Adjust parameters</p>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-[#1C1B1A] hover:text-white rounded-full transition-all duration-300 group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <FilterSidebar onFilterChange={setFilters} />
            </div>
          </div>
        </aside>

        {/* ✅ MAIN CONTENT AREA */}
        <main 
          className={`
            flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out
            ${isSidebarOpen ? 'lg:ml-80' : 'ml-0'}
          `}
        >
          {/* Header & Controls Toolbar */}
          <div className="px-4 md:px-8  flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`
                  group flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300
                  ${isSidebarOpen 
                    ? 'bg-[#1C1B1A] text-white border-[#1C1B1A]' 
                    : 'bg-white text-[#1C1B1A] border-[#1C1B1A]/10 hover:border-[#D4755B] shadow-sm'}
                `}
              >
                {isSidebarOpen ? <ChevronLeft size={18} /> : <SlidersHorizontal size={18} />}
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  {isSidebarOpen ? 'Close' : 'Filter'}
                </span>
              </button>

              <div className="h-10 w-[1px] bg-[#1C1B1A]/10 hidden md:block" />
              
              <div>
                <h1 className="text-2xl font-black italic tracking-tighter text-[#1C1B1A] uppercase">Properties</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {filteredProperties.length} curated results
                </p>
              </div>
            </div>

            {/* ✅ FIXED: Passed totalProperties back to the header */}
            <PropertiesHeader
              totalProperties={filteredProperties.length}
              currentSort={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          <section className="flex-1 p-4 md:p-8">
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                 <LoadingState message="Scanning the architecture..." />
              </div>
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

        {/* Backdrop for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Properties;