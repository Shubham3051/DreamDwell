import React from 'react';

// Move constants outside to avoid re-creation
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'beds', label: 'Most Beds' },
];

const PropertiesHeader = ({ 
  totalProperties = 0, 
  onSortChange, 
  onViewChange,
  currentSort = 'featured', // Controlled from parent
  viewMode = 'grid'         // Controlled from parent
}) => {

  const ViewButton = ({ mode, icon }) => (
    <button
      onClick={() => onViewChange?.(mode)}
      className={`p-2 rounded transition-all ${
        viewMode === mode
          ? 'bg-white text-[#D4755B] shadow-sm'
          : 'text-[#6B7280] hover:text-[#D4755B]'
      }`}
    >
      <span className="material-icons text-[20px]">{icon}</span>
    </button>
  );

  return (
    <header className="border-b border-[#E6E0DA] bg-white sticky top-0 z-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Title & Count */}
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-[#221410]">
              All Properties
            </h1>
            <p className="text-sm text-[#6B7280]">
              Showing {totalProperties} {totalProperties === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="hidden md:inline text-sm text-[#6B7280]">Sort:</label>
              <select
                id="sort"
                value={currentSort}
                onChange={(e) => onSortChange?.(e.target.value)}
                className="bg-transparent border border-[#E6E0DA] rounded-lg px-3 py-2 text-sm cursor-pointer focus:ring-1 focus:ring-[#D4755B] outline-none"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-1 bg-[#F8F6F6] rounded-lg p-1">
              <ViewButton mode="grid" icon="grid_view" />
              <ViewButton mode="list" icon="view_list" />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default PropertiesHeader;