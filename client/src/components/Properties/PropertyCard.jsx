import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!property) return null;

  const handleClick = () => {
    if (!user) {
      navigate("/select-role");
      return;
    }

    navigate(`/property/${property._id || property.id}`);
  };

  const imageUrl = Array.isArray(property.image) ? property.image[0] : property.image;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      <div className="w-full h-52 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h3>

        <p className="text-xl font-bold text-blue-600 mb-1">
          ${property.price.toLocaleString()}
        </p>

        <p className="text-gray-500 text-sm">
          📍 {property.location}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const PropertyCard = ({
//   id,
//   image,
//   name,
//   price,
//   location,
//   beds,
//   baths,
//   sqft,
//   badge,
//   tags = []
// }) => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   return (
//     <Link to={`/property/${id}`} className="block">
//       <div className="bg-white border border-[#E6E0DA] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
        
//         {/* Image */}
//         <div className="relative aspect-[340/240] overflow-hidden">
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           />

//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-20" />

//           {/* Badge */}
//           {badge && (
//             <div
//               className={`absolute top-4 left-4 px-3 py-1.5 rounded text-white text-xs font-bold shadow-lg ${
//                 badge === 'HOT'
//                   ? 'bg-[#D4755B]'
//                   : badge === 'SOLD'
//                   ? 'bg-gray-500'
//                   : badge === 'FOR RENT'
//                   ? 'bg-blue-500'
//                   : 'bg-[#10B981]'
//               }`}
//             >
//               {badge}
//             </div>
//           )}

//           {/* Favorite */}
//           <button
//             onClick={(e) => {
//               e.preventDefault(); // 🔥 important fix (prevents Link navigation)
//               e.stopPropagation();
//               setIsFavorite(!isFavorite);
//             }}
//             className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
//           >
//             <span
//               className={`material-icons text-xl ${
//                 isFavorite ? 'text-[#D4755B]' : 'text-[#6B7280]'
//               }`}
//             >
//               {isFavorite ? 'favorite' : 'favorite_border'}
//             </span>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-5">
//           {/* Price */}
//           <div className="flex items-baseline gap-1 mb-2">
//             <span className="font-bold text-xl text-[#D4755B]">₹</span>
//             <span className="font-bold text-2xl text-[#D4755B]">
//               {price}
//             </span>
//           </div>

//           {/* Title */}
//           <h3 className="text-lg text-[#221410] mb-1">
//             {name}
//           </h3>

//           {/* Location */}
//           <div className="flex items-center gap-1 mb-4">
//             <span className="material-icons text-[#D4755B] text-sm">
//               location_on
//             </span>
//             <span className="text-sm text-[#6B7280]">
//               {location}
//             </span>
//           </div>

//           {/* Specs */}
//           <div className="flex items-center gap-4 pb-4 border-b border-[#E6E0DA]">
//             <div className="flex items-center gap-1.5">
//               <span className="material-icons text-[#6B7280] text-lg">
//                 bed
//               </span>
//               <span className="text-sm">{beds} Beds</span>
//             </div>

//             <div className="flex items-center gap-1.5">
//               <span className="material-icons text-[#6B7280] text-lg">
//                 bathtub
//               </span>
//               <span className="text-sm">{baths} Baths</span>
//             </div>

//             <div className="flex items-center gap-1.5">
//               <span className="material-icons text-[#6B7280] text-lg">
//                 square_foot
//               </span>
//               <span className="text-sm">
//                 {sqft ? sqft.toLocaleString() : 0} sqft
//               </span>
//             </div>
//           </div>

//           {/* Tags */}
//           {tags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-4 mb-4">
//               {tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-[#F8F6F6] border rounded-full text-xs text-[#6B7280]"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}

//           <button className="w-full mt-2 border border-[#D4755B] text-[#D4755B] py-2 rounded-lg hover:bg-[#D4755B] hover:text-white transition-all">
//             View Details
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PropertyCard;