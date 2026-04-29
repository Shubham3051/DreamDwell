import React, { useState, useEffect, useRef } from "react";

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

  // Sync with parent
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

  const Section = ({ title, children }) => (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{title}</p>
      {children}
    </div>
  );

  return (
    <div className="p-6 space-y-8 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button type="button" onClick={reset} className="text-sm text-orange-500 hover:underline">Reset</button>
      </div>

      <Section title="Location">
        <input
          type="text"
          placeholder="Search city..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </Section>

      <Section title="Property Type">
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map(type => (
            <button
              key={type}
              onClick={() => toggle(propertyType, setPropertyType, type)}
              className={`py-2 rounded-lg border text-sm transition ${propertyType.includes(type) ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:border-orange-400"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Availability">
        <div className="flex gap-2">
          {["buy", "rent"].map(a => (
            <button
              key={a}
              onClick={() => setAvailability(availability === a ? "" : a)}
              className={`flex-1 py-2 rounded-lg border text-sm capitalize transition ${availability === a ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:border-orange-400"}`}
            >
              {a}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => setBedrooms(n)}
              className={`px-3 py-1 rounded-full border text-sm transition ${bedrooms === n ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:border-orange-400"}`}
            >
              {n === 0 ? "Any" : n}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Amenities">
        <div className="space-y-2">
          {amenitiesList.map(a => (
            <label key={a} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={amenities.includes(a)}
                onChange={() => toggle(amenities, setAmenities, a)}
                className="accent-orange-500"
              />
              {a}
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default FilterSidebar;