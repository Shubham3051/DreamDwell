import React from 'react';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';

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
  currentSort = 'featured',
  viewMode = 'grid'
}) => {

  const ViewButton = ({ mode, icon: Icon }) => (
    <button
      onClick={() => onViewChange?.(mode)}
      className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
        viewMode === mode
          ? 'bg-white text-[#D4755B] shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-105'
          : 'text-gray-400 hover:text-[#1C1B1A]'
      }`}
      aria-label={`${mode} view`}
    >
      <Icon size={18} strokeWidth={viewMode === mode ? 2.5 : 2} />
    </button>
  );

  return (
    <header className="bg-transparent border-b border-[#1C1B1A]/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Title & Count */}
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-[#1C1B1A] uppercase">
              The Collection
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Discovered {totalProperties} {totalProperties === 1 ? 'Exquisite Estate' : 'Exceptional Properties'}
            </p>
          </div>

          {/* Controls Container */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            
            {/* Custom Sort Control */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-gray-400">
                Sort By
              </span>
              <div className="relative group">
                <select
                  id="sort"
                  value={currentSort}
                  onChange={(e) => onSortChange?.(e.target.value)}
                  className="appearance-none bg-white border border-[#1C1B1A]/10 rounded-2xl pl-5 pr-12 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4755B]/20 transition-all hover:border-[#D4755B]/30 shadow-sm"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="font-sans normal-case">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#D4755B] transition-colors">
                  <ChevronDown size={14} strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-8 bg-[#1C1B1A]/10" />

            {/* View Switcher */}
            <div className="flex items-center gap-1.5 bg-[#1C1B1A]/5 p-1.5 rounded-2xl">
              <ViewButton mode="grid" icon={LayoutGrid} />
              <ViewButton mode="list" icon={List} />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default PropertiesHeader;