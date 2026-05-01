import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  ShieldCheck, 
  Briefcase, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight,
  RefreshCw,
  CheckCircle2
} from "lucide-react";

const ROLE_CONFIG = {
  admin: {
    label: "Administrator",
    color: "bg-red-50 text-red-700 border-red-100",
    icon: ShieldCheck,
    dashboard: "/admin",
  },
  agent: {
    label: "Listing Agent",
    color: "bg-orange-50 text-[#D4755B] border-orange-100",
    icon: Briefcase,
    dashboard: "/agent-dashboard",
  },
  user: {
    label: "Standard User",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    icon: User,
    dashboard: "/user-dashboard",
  },
};

const Profile = () => {
  const { user, logout, updateUserRole } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [isChanging, setIsChanging] = useState(false);

  const currentRole = user?.role || "user";
  const config = ROLE_CONFIG[currentRole] || ROLE_CONFIG.user;

  // FIX: handleLogout must be defined within the component
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRoleChange = async (newRole) => {
    if (updateUserRole) {
      await updateUserRole(newRole);
      setIsChanging(false);
    } else {
      console.warn("updateUserRole function missing from AuthContext");
      setIsChanging(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center py-12 px-4 font-sans">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-sm border border-[#E6E0DA] overflow-hidden">
        
        {/* HEADER AREA */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#D4755B] flex items-center justify-center text-white text-3xl font-bold shadow-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1C1B1A]">{user?.name}</h2>
              <p className="text-[#64748B] flex items-center gap-1.5">
                {user?.email} 
                <CheckCircle2 size={14} className="text-green-500" />
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* CURRENT ROLE STATUS CARD */}
          <div className={`mt-2 mb-8 p-4 rounded-2xl border ${config.color} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <config.icon size={20} />
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Account Type</p>
                <p className="font-bold">{config.label}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChanging(!isChanging)}
              className="text-xs bg-white/80 hover:bg-white px-4 py-2 rounded-xl font-bold transition-all shadow-sm border border-black/5"
            >
              {isChanging ? "Cancel" : "Change Role"}
            </button>
          </div>

          {/* ROLE SELECTION DRAWER */}
          {isChanging && (
            <div className="mb-8 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <h3 className="text-xs font-black text-[#64748B] uppercase tracking-widest mb-4 flex items-center gap-2">
                <RefreshCw size={12} /> Select New Role
              </h3>
              {Object.keys(ROLE_CONFIG).map((roleKey) => {
                const role = ROLE_CONFIG[roleKey];
                const isSelected = currentRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => handleRoleChange(roleKey)}
                    disabled={isSelected}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed" 
                        : "bg-white border-[#E6E0DA] hover:border-[#D4755B] hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <role.icon size={18} className={isSelected ? "text-gray-400" : "text-[#D4755B]"} />
                      <span className="font-semibold text-[#1C1B1A]">{role.label}</span>
                    </div>
                    {!isSelected && <ChevronRight size={16} className="text-[#64748B]" />}
                    {isSelected && <span className="text-[10px] font-bold text-gray-400">CURRENT</span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* ACCOUNT DETAILS */}
          {!isChanging && (
            <div className="space-y-4 mb-10">
              <DetailRow label="Display Name" value={user?.name} />
              <DetailRow label="System Email" value={user?.email} />
              <DetailRow label="Status" value="Active" isStatus />
              {currentRole === "agent" && <DetailRow label="Total Listings" value="12" highlight />}
              {currentRole === "admin" && <DetailRow label="Permissions" value="Full Access" highlight />}
            </div>
          )}

          {/* PRIMARY ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E6E0DA]">
            <button
              onClick={() => navigate(config.dashboard)}
              className="flex-1 bg-[#1C1B1A] text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
            >
              <LayoutDashboard size={18} /> 
              Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-white text-[#1C1B1A] border border-[#E6E0DA] py-3.5 rounded-xl font-bold hover:bg-[#FAF8F4] transition-all active:scale-95"
            >
              Home
            </button>
          </div>

          {/* LOGOUT LINK */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 text-[#64748B] hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={14} /> 
            Sign out of DreamDwell
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-[11px] text-[#9CA3AF] text-center">
        DreamDwell v1.0.4 • Secure Session
      </p>
    </div>
  );
};

// Clean Reusable Row
const DetailRow = ({ label, value, highlight, isStatus }) => (
  <div className="flex justify-between items-center py-0.5">
    <span className="text-[#64748B] text-sm">{label}</span>
    <span className={`font-semibold ${highlight ? 'text-[#D4755B]' : 'text-[#1C1B1A]'} ${isStatus ? 'text-green-600' : ''}`}>
      {value}
    </span>
  </div>
);

export default Profile;