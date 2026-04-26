// import React, { useState, useEffect, useRef } from 'react';

// const FilterSidebar = ({ onFilterChange }) => {
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedPropertyType, setSelectedPropertyType] = useState([]);
//   const [selectedAvailability, setSelectedAvailability] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 200]);
//   const [bedrooms, setBedrooms] = useState(0);
//   const [bathrooms, setBathrooms] = useState(0);
//   const [selectedAmenities, setSelectedAmenities] = useState([]);
//   const isFirstRender = useRef(true);

//   const propertyTypes = [
//     { id: 'apartment', label: 'Apartment', icon: 'apartment' },
//     { id: 'house', label: 'House', icon: 'house' },
//     { id: 'villa', label: 'Villa', icon: 'villa' },
//     { id: 'office', label: 'Office', icon: 'business' },
//   ];

//   const availabilityTypes = [
//     { id: 'buy', label: 'Buy' },
//     { id: 'rent', label: 'Rent' },
//   ];

//   const amenitiesList = [
//     'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security',
//     'Clubhouse', 'Power Backup', 'Lift', 'Balcony', 'CCTV Surveillance',
//     'Children Play Area', 'Gated Community',
//   ];

//   const formatPriceLabel = (value) => {
//     if (value >= 200) return '20+ Cr';
//     if (value >= 10) return `${(value / 10).toFixed(value % 10 === 0 ? 0 : 1)} Cr`;
//     return `${value * 10} L`;
//   };

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }

//     const filters = {};
//     if (selectedLocation) filters.location = selectedLocation;
//     if (selectedPropertyType.length > 0) filters.propertyType = selectedPropertyType;
//     if (selectedAvailability) filters.availability = selectedAvailability;
//     if (priceRange[0] > 0 || priceRange[1] < 200) filters.priceRange = priceRange;
//     if (bedrooms > 0) filters.bedrooms = bedrooms;
//     if (bathrooms > 0) filters.bathrooms = bathrooms;
//     if (selectedAmenities.length > 0) filters.amenities = selectedAmenities;

//     if (onFilterChange) onFilterChange(filters);
//   }, [
//     selectedLocation,
//     selectedPropertyType,
//     selectedAvailability,
//     priceRange,
//     bedrooms,
//     bathrooms,
//     selectedAmenities,
//   ]);

//   const handleReset = () => {
//     setSelectedLocation('');
//     setSelectedPropertyType([]);
//     setSelectedAvailability('');
//     setPriceRange([0, 200]);
//     setBedrooms(0);
//     setBathrooms(0);
//     setSelectedAmenities([]);
//     if (onFilterChange) onFilterChange({});
//   };

//   const togglePropertyType = (type) => {
//     if (selectedPropertyType.includes(type)) {
//       setSelectedPropertyType(selectedPropertyType.filter((t) => t !== type));
//     } else {
//       setSelectedPropertyType([...selectedPropertyType, type]);
//     }
//   };

//   const toggleAmenity = (amenity) => {
//     if (selectedAmenities.includes(amenity)) {
//       setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
//     } else {
//       setSelectedAmenities([...selectedAmenities, amenity]);
//     }
//   };

//   return (
//     <div className="w-[359px] bg-white border-r border-[#E6E0DA] h-screen sticky top-20 overflow-y-auto pb-24">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="font-manrope font-extralight text-lg text-[#111827]">
//             Refine Your Search
//           </h2>
//           <button
//             onClick={handleReset}
//             className="text-sm text-[#D4755B] hover:underline"
//           >
//             Reset all
//           </button>
//         </div>

//         {/* Location */}
//         <div className="mb-8 border-b pb-8">
//           <h3 className="text-sm mb-4 uppercase">Location</h3>
//           <input
//             type="text"
//             value={selectedLocation}
//             onChange={(e) => setSelectedLocation(e.target.value)}
//             placeholder="City, neighborhood..."
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         {/* Availability */}
//         <div className="mb-8 border-b pb-8">
//           <h3 className="text-sm mb-4 uppercase">Availability</h3>
//           <div className="flex gap-3">
//             {availabilityTypes.map((avail) => (
//               <button
//                 key={avail.id}
//                 onClick={() =>
//                   setSelectedAvailability(
//                     selectedAvailability === avail.id ? '' : avail.id
//                   )
//                 }
//                 className={`flex-1 h-11 border rounded-xl ${
//                   selectedAvailability === avail.id
//                     ? 'bg-[#D4755B] text-white'
//                     : 'bg-white'
//                 }`}
//               >
//                 {avail.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Property Type */}
//         <div className="mb-8 border-b pb-8">
//           <h3 className="text-sm mb-4 uppercase">Property Type</h3>
//           <div className="grid grid-cols-2 gap-3">
//             {propertyTypes.map((type) => (
//               <button
//                 key={type.id}
//                 onClick={() => togglePropertyType(type.label)}
//                 className={`p-4 border rounded-xl ${
//                   selectedPropertyType.includes(type.label)
//                     ? 'bg-[#D4755B] text-white'
//                     : 'bg-white'
//                 }`}
//               >
//                 {type.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Bedrooms */}
//         <div className="mb-8 border-b pb-8">
//           <h3 className="text-sm mb-4 uppercase">Bedrooms</h3>
//           <div className="flex gap-2">
//             {[0, 1, 2, 3, 4, 5].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => setBedrooms(num)}
//                 className={`flex-1 border rounded-lg ${
//                   bedrooms === num ? 'bg-[#D4755B] text-white' : ''
//                 }`}
//               >
//                 {num === 0 ? 'Any' : num === 5 ? '5+' : num}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Bathrooms */}
//         <div className="mb-8 border-b pb-8">
//           <h3 className="text-sm mb-4 uppercase">Bathrooms</h3>
//           <div className="flex gap-2">
//             {[0, 1, 2, 3, 4].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => setBathrooms(num)}
//                 className={`flex-1 border rounded-lg ${
//                   bathrooms === num ? 'bg-[#D4755B] text-white' : ''
//                 }`}
//               >
//                 {num === 0 ? 'Any' : num === 4 ? '4+' : num}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Amenities */}
//         <div className="mb-8">
//           <h3 className="text-sm mb-4 uppercase">Amenities</h3>
//           {amenitiesList.map((amenity) => (
//             <label key={amenity} className="block">
//               <input
//                 type="checkbox"
//                 checked={selectedAmenities.includes(amenity)}
//                 onChange={() => toggleAmenity(amenity)}
//               />
//               {amenity}
//             </label>
//           ))}
//         </div>

//         <button
//           onClick={handleReset}
//           className="w-full border text-[#D4755B] py-3 rounded-xl"
//         >
//           Reset Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;