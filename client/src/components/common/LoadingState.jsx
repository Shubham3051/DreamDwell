import React from 'react';

const LoadingState = ({ message = "Loading properties...", fullPage = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'h-screen' : 'py-24'} w-full`}>
      {/* Animated Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-12 h-12 border-4 border-orange-100 rounded-full"></div>
        {/* Spinning Top Ring */}
        <div className="absolute w-12 h-12 border-4 border-[#D4755B] border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Optional Message */}
      {message && (
        <p className="mt-4 text-sm font-medium text-[#6B7280] animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingState;