import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Building2,
  Calendar,
  MessageCircle,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import { cn } from "../../lib/utils";

const Sidebar = ({ role, isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/register");
  };

  const menus = {
    admin: [
      { path: "/admin", label: "Overview", icon: LayoutDashboard },
      { path: "/admin/users", label: "Directory", icon: Users },
      { path: "/admin/properties", label: "Inventory", icon: Building2 },
    ],
    agent: [
      { path: "/agent-dashboard", label: "Insights", icon: LayoutDashboard },
      { path: "/properties", label: "Market", icon: Building2 },
      { path: "/list", label: "My Listings", icon: MessageCircle },
      { path: "/chat", label: "Messages", icon: MessageCircle },
    ],
    user: [
      { path: "/user-dashboard", label: "Home", icon: Home },
      { path: "/properties", label: "Explore", icon: Building2 },
      { path: "/saved-properties", label: "Wishlist", icon: Heart },
      { path: "/bookings", label: "Schedule", icon: Calendar },
      { path: "/chat", label: "Chat", icon: MessageCircle },
    ],
  };

  const menu = menus[role] || [];

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#1C1B1A] text-white z-50 flex flex-col border-r border-white/5 transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Brand Section */}
        <div className="h-20 flex items-center px-5 border-b border-white/5 overflow-hidden">
          <Link to="/" className="flex items-center gap-3 min-w-max">
            <div className="w-10 h-10 bg-[#D4755B] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4755B]/20 shrink-0">
              <Home className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="font-black text-lg tracking-tighter uppercase italic"
              >
                Dream<span className="text-[#D4755B]">Dwell</span>
              </motion.span>
            )}
          </Link>
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-24 bg-[#D4755B] text-white rounded-full w-6 h-6 items-center justify-center border-4 border-[#1C1B1A] hover:scale-110 transition-transform z-50"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 custom-scrollbar">
          <div className="space-y-2">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">
                Main Menu
              </p>
            )}
            {menu.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300",
                  isActive(item.path)
                    ? "bg-[#D4755B] text-white shadow-lg shadow-[#D4755B]/10"
                    : "hover:bg-white/5 text-gray-400 hover:text-white",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive(item.path) && "scale-110")} />
                {!isCollapsed && <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>}
                
                {/* Tooltip for Collapsed Sidebar */}
                {isCollapsed && (
                  <div className="absolute left-16 px-2 py-1 bg-[#D4755B] text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Profile/Action Section */}
        <div className={cn("p-4 border-t border-white/5 bg-white/[0.02]", isCollapsed ? "items-center" : "")}>
          <div className={cn("flex flex-col gap-2", isCollapsed && "items-center")}>
            <button
              onClick={() => navigate("/profile")}
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-white group",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#D4755B]/20 transition-colors">
                <User size={18} className="group-hover:text-[#D4755B]" />
              </div>
              {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">My Profile</span>}
            </button>

            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl hover:bg-red-500/5 transition-all text-red-400/70 hover:text-red-400 group",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <LogOut size={18} />
              </div>
              {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Glass Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;