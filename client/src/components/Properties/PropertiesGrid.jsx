import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react'; // Modern icons
import PropertyCard from './PropertyCard';
import { formatPrice } from '../../utils/formatPrice';

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
];

const PropertiesGrid = ({ properties = [], viewMode = 'grid' }) => {
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Subtle waterfall effect
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="flex-1">
      <AnimatePresence mode="wait">
        {properties.length === 0 ? (
          /* Premium Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-[#FAF8F4] rounded-full flex items-center justify-center mb-6 text-gray-300">
              <SearchX size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1C1B1A]">
              No Estates Found
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 max-w-[200px] leading-relaxed">
              Try adjusting your refinement parameters
            </p>
          </motion.div>
        ) : (
          /* Animated Grid/List Container */
          <motion.div
            key={viewMode} // Forces re-animation when switching modes
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12'
                : 'flex flex-col gap-8'
            }
          >
            {properties.map((property) => (
              <motion.div 
                key={property?._id} 
                variants={itemVariants}
                layout // Crucial for smooth grid-to-list transitions
                className="h-full"
              >
                <PropertyCard
                  id={property?._id}
                  viewMode={viewMode} // Pass this down so PropertyCard can adjust its own layout
                  image={
                    Array.isArray(property?.image)
                      ? property.image[0]
                      : property?.image || FALLBACK_IMAGES[0]
                  }
                  name={property?.title || "Exclusive Residence"}
                  price={formatPrice(property?.price || 0)}
                  location={property?.location || "Prime District"}
                  beds={property?.beds || 0}
                  baths={property?.baths || 0}
                  sqft={property?.sqft || 0}
                  badge={property?.availability?.toUpperCase() || "AVAILABLE"}
                  tags={property?.type ? [property.type] : []}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertiesGrid;