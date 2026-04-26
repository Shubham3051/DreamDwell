import React from "react";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <div className="flex justify-between items-center mb-2">
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
};

export default StatCard;