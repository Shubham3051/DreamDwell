import React from "react";
import { Link } from "react-router-dom";
import { MoveLeft, Map } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center relative">
        
        {/* Background Decorative Number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[250px] font-black opacity-[0.03] select-none text-[#1C1B1A]">
            404
          </h1>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-black text-xl tracking-tighter uppercase italic">
              Dream<span className="text-[#D4755B]">Dwell</span>
            </span>
          </Link>
        </div>
          {/* Icon/Visual Element */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2.5rem] shadow-2xl shadow-[#D4755B]/10 rotate-12 mb-4">
            <Map size={36} className="text-[#D4755B] -rotate-12" />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4755B]">
              Address Not Found
            </p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-[#1C1B1A]">
              Lost in <span className="text-white drop-shadow-[2px_2px_0px_#D4755B]">Space</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
              The property or page you are looking for has been moved, sold, or doesn't exist in our current portfolio.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-[#1C1B1A] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#D4755B] hover:shadow-2xl hover:shadow-[#D4755B]/30 transition-all duration-500 group"
            >
              <MoveLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              Return to Estate
            </Link>
          </div>
        </div>

        {/* Footer Detail */}
        <div className="mt-20 pt-8 border-t border-[#1C1B1A]/5 flex justify-center gap-8">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inquiries: 001-DWEL-99</span>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Privacy Secured</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;