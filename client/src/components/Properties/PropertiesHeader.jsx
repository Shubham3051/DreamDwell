// import React, { useState } from 'react';

// const PropertiesHeader = ({
//   totalProperties = 107,
//   onSortChange,
//   onViewChange
// }) => {
//   const [sortBy, setSortBy] = useState('featured');
//   const [viewMode, setViewMode] = useState('grid');

//   const handleSortChange = (value) => {
//     setSortBy(value);
//     if (onSortChange) onSortChange(value);
//   };

//   const handleViewChange = (mode) => {
//     setViewMode(mode);
//     if (onViewChange) onViewChange(mode);
//   };

//   return (
//     <div className="border-b border-[#E6E0DA] bg-white sticky top-0 z-10">
//       <div className="max-w-[1440px] mx-auto px-8 py-6">
//         <div className="flex items-center justify-between">
          
//           {/* Left */}
//           <div>
//             <h1 className="text-3xl text-[#221410] mb-1">
//               All Properties
//             </h1>
//             <p className="text-sm text-[#6B7280]">
//               Showing {totalProperties}{' '}
//               {totalProperties === 1 ? 'property' : 'properties'}
//             </p>
//           </div>

//           {/* Right */}
//           <div className="flex items-center gap-4">
            
//             {/* Sort */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-[#6B7280]">Sort:</span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => handleSortChange(e.target.value)}
//                 className="border border-[#E6E0DA] rounded-lg px-4 py-2 text-sm cursor-pointer focus:outline-none focus:border-[#D4755B]"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="newest">Newest First</option>
//                 <option value="beds">Most Beds</option>
//               </select>
//             </div>

//             {/* View Toggle */}
//             <div className="flex items-center gap-1 bg-[#F8F6F6] rounded-lg p-1">
//               <button
//                 onClick={() => handleViewChange('grid')}
//                 className={`p-2 rounded ${
//                   viewMode === 'grid'
//                     ? 'bg-white text-[#D4755B] shadow-sm'
//                     : 'text-[#6B7280]'
//                 }`}
//               >
//                 <span className="material-icons">grid_view</span>
//               </button>

//               <button
//                 onClick={() => handleViewChange('list')}
//                 className={`p-2 rounded ${
//                   viewMode === 'list'
//                     ? 'bg-white text-[#D4755B] shadow-sm'
//                     : 'text-[#6B7280]'
//                 }`}
//               >
//                 <span className="material-icons">view_list</span>
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertiesHeader;