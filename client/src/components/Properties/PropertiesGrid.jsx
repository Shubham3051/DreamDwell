import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { formatPrice } from '../../utils/formatPrice';

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
];

const PropertiesGrid = ({ properties = [], viewMode = 'grid' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      
      {/* DEBUG: shows if data is empty */}
      {properties.length === 0 && (
        <p className="text-center text-gray-500">No properties found</p>
      )}

      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'flex flex-col gap-6'
        }
      >
        {properties?.map((property, index) => (
          <div key={index}>
            <PropertyCard
              id={property?._id}
              image={
                Array.isArray(property?.image)
                  ? property.image[0]
                  : property?.image || FALLBACK_IMAGES[0]
              }
              name={property?.title || "New Property"}
              price={formatPrice(property?.price || 0)}
              location={property?.location || "Unknown location"}
              beds={property?.beds || 0}
              baths={property?.baths || 0}
              sqft={property?.sqft || 0}
              badge={property?.availability?.toUpperCase() || ""}
              tags={property?.type ? [property.type] : []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesGrid;