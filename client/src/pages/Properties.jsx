import React, { useEffect, useState } from "react";
import PropertyCard from "../components/Properties/PropertyCard";
import Navbar from "../components/common/Navbar";
import axios from "axios";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/properties");
        setProperties(res.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-20 py-10 bg-[#FAF8F4] min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Properties
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading properties...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((prop) => (
              <PropertyCard key={prop._id || prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;


// import React, { useState, useEffect, useMemo } from 'react';
// import Navbar from '../components/common/Navbar';
// import Footer from '../components/common/Footer';
// import FilterSidebar from '../components/properties/FilterSidebar';
// import PropertiesHeader from '../components/properties/PropertiesHeader';
// import PropertiesGrid from '../components/properties/PropertiesGrid';
// import LoadingState from '../components/common/LoadingState';
// import { propertiesAPI } from '../services/api';
// import { useSEO } from '../hooks/useSEO';

// const Properties = () => {
//   useSEO({
//     title: 'Properties - Browse Listings',
//     description:
//       'Browse apartments, houses, villas, and more. Filter by location, price, bedrooms, and amenities.',
//   });

//   const [viewMode, setViewMode] = useState('grid');
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('featured');
//   const [filters, setFilters] = useState({});

//   // Fetch properties
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const { data } = await propertiesAPI.getAll();
//         if (data.success && data.property) {
//           setProperties(data.property);
//         }
//       } catch (err) {
//         console.error('Failed to fetch properties:', err);
//         setError('Failed to load properties. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Filtering + Sorting
//   const filteredProperties = useMemo(() => {
//     let result = [...properties];

//     if (filters.location) {
//       result = result.filter((p) =>
//         p.location.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     if (filters.propertyType && filters.propertyType.length > 0) {
//       result = result.filter((p) =>
//         filters.propertyType.some(
//           (t) => t.toLowerCase() === p.type.toLowerCase()
//         )
//       );
//     }

//     if (filters.availability) {
//       result = result.filter(
//         (p) =>
//           p.availability.toLowerCase() ===
//           filters.availability.toLowerCase()
//       );
//     }

//     if (filters.priceRange) {
//       const [min, max] = filters.priceRange;
//       const minPrice = min * 1000000;
//       const maxPrice = max * 1000000;

//       result = result.filter((p) => {
//         if (p.price < minPrice) return false;
//         if (max >= 200) return true;
//         return p.price <= maxPrice;
//       });
//     }

//     if (filters.bedrooms && filters.bedrooms > 0) {
//       result = result.filter((p) => p.beds >= filters.bedrooms);
//     }

//     if (filters.bathrooms && filters.bathrooms > 0) {
//       result = result.filter((p) => p.baths >= filters.bathrooms);
//     }

//     if (filters.amenities && filters.amenities.length > 0) {
//       result = result.filter((p) =>
//         filters.amenities.every((filterAmenity) =>
//           p.amenities.some(
//             (propertyAmenity) =>
//               propertyAmenity.toLowerCase() ===
//               filterAmenity.toLowerCase()
//           )
//         )
//       );
//     }

//     switch (sortBy) {
//       case 'price-low':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'beds':
//         result.sort((a, b) => b.beds - a.beds);
//         break;
//       case 'newest':
//         result.sort((a, b) => b._id.localeCompare(a._id));
//         break;
//       default:
//         break;
//     }

//     return result;
//   }, [properties, filters, sortBy]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const handleSortChange = (sort) => {
//     setSortBy(sort);
//   };

//   const handleViewChange = (mode) => {
//     setViewMode(mode);
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       <div className="flex">
//         <FilterSidebar onFilterChange={handleFilterChange} />

//         <div className="flex-1">
//           <PropertiesHeader
//             totalProperties={filteredProperties.length}
//             onSortChange={handleSortChange}
//             onViewChange={handleViewChange}
//           />

//           {loading && <LoadingState message="Loading properties..." />}

//           {error && !loading && (
//             <div className="flex items-center justify-center py-24">
//               <div className="text-center">
//                 <span className="material-icons text-4xl text-[#D4755B] mb-4">
//                   error_outline
//                 </span>
//                 <p className="font-manrope text-[#374151] mb-4">{error}</p>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="bg-[#D4755B] text-white font-manrope font-bold px-6 py-2 rounded-lg hover:bg-[#B86851]"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           )}

//           {!loading && !error && filteredProperties.length === 0 && (
//             <div className="flex items-center justify-center py-24">
//               <div className="text-center">
//                 <span className="material-icons text-4xl text-[#9CA3AF] mb-4">
//                   search_off
//                 </span>
//                 <p className="font-manrope text-[#374151] mb-2">
//                   No properties found
//                 </p>
//                 <p className="text-sm text-[#6B7280]">
//                   Try adjusting your filters
//                 </p>
//               </div>
//             </div>
//           )}

//           {!loading && !error && filteredProperties.length > 0 && (
//             <PropertiesGrid
//               properties={filteredProperties}
//               viewMode={viewMode}
//             />
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Properties;