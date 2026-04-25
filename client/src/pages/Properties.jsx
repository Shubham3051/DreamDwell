import React from "react";
import PropertyCard from "../components/Properties/PropertyCard";
import { properties } from "../data/mockData";
import Navbar from "../components/common/Navbar";

const Properties = () => {
  return (

    <div>
       <Navbar />

    <div className="px-6 md:px-12 lg:px-20 py-10 bg-gray-50 min-h-screen">
      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Properties
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>

    </div>

  </div>
  );
};

export default Properties;
