import React, { useState, useEffect, useRef } from "react";
import { Search, Home, MapPin, Bed, Bath, Sparkles, RotateCcw } from "lucide-react";

const propertyTypes = ["Apartment", "House", "Villa", "Office"];
const amenitiesList = ["Parking", "Gym", "Pool", "Lift"];

const FilterSidebar = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [availability, setAvailability] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    onFilterChange({ location, propertyType, availability, bedrooms, bathrooms, amenities });
  }, [location, propertyType, availability, bedrooms, bathrooms, amenities]);

  const toggle = (list, setFn, val) => {
    setFn(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const reset = () => {
    setLocation("");
    setPropertyType([]);
    setAvailability("");
    setBedrooms(0);
    setBathrooms(0);
    setAmenities([]);
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div className="pb-6 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        {Icon && <Icon size={14} className="stroke-[2.5px]" />}
        <p className="text-[10px] font-bold uppercase tracking-[0.15em]">{title}</p>
      </div>
      {children}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 space-y-6 h-full overflow-y-auto no-scrollbar border border-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Filters</h2>
          <p className="text-xs text-slate-400">Find your dream space</p>
        </div>
        <button 
          type="button" 
          onClick={reset} 
          className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors bg-orange-50 px-3 py-2 rounded-xl"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Location Search */}
        <Section title="Location" icon={MapPin}>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search city..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </Section>

        {/* Property Type Grid */}
        <Section title="Property Type" icon={Home}>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(type => {
              const active = propertyType.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => toggle(propertyType, setPropertyType, type)}
                  className={`py-2.5 rounded-xl border-2 text-xs font-bold transition-all duration-200 ${
                    active 
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200" 
                    : "bg-white border-slate-100 text-slate-600 hover:border-orange-200"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Availability Toggle */}
        <Section title="Transaction" icon={Sparkles}>
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            {["buy", "rent"].map(a => (
              <button
                key={a}
                onClick={() => setAvailability(availability === a ? "" : a)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  availability === a 
                  ? "bg-white text-orange-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </Section>

        {/* Bedrooms Horizontal List */}
        <Section title="Bedrooms" icon={Bed}>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[0, 1, 2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setBedrooms(n)}
                className={`flex-shrink-0 w-11 h-11 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all ${
                  bedrooms === n 
                  ? "bg-slate-800 border-slate-800 text-white" 
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                }`}
              >
                {n === 0 ? "Any" : n + "+"}
              </button>
            ))}
          </div>
        </Section>

        {/* Custom Amenity Checkboxes */}
        <Section title="Amenities" icon={Sparkles}>
          <div className="space-y-3">
            {amenitiesList.map(a => (
              <label key={a} className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.includes(a)}
                    onChange={() => toggle(amenities, setAmenities, a)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-slate-200 rounded-md bg-white peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">
                    <svg size={12} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {a}
                </span>
              </label>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default FilterSidebar;