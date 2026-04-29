import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  AnimatePresence } from "framer-motion";
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
  LucideBuilding,
  Building,
} from "lucide-react";
import { cn } from "../../lib/utils";

const Sidebar = ({ role, isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Save collapse state
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/register");
  };

  // 🔥 Role-based menu
  const menus = {
    admin: [
      { path: "/admin", label: "Dashboard", icon: Home },
      { path: "/admin/users", label: "Users", icon: Users },
      { path: "/admin/properties", label: "Properties", icon: Building2 },
    ],
    agent: [
      { path: "/agent-dashboard", label: "Dashboard", icon: Home },
      { path: '/properties', label: 'All Properties', icon: Building2 },
      // { path: "/agent/leads", label: "Leads", icon: Users },
      { path: "/chat", label: "Chat", icon: MessageCircle },
    ],
    user: [
      { path: "/user-dashboard", label: "Dashboard", icon: Home },
      { path: "/properties", label: "Properties", icon: Building },
      { path: "/saved-properties", label: "Saved", icon: Building2 },
      { path: "/bookings", label: "Bookings", icon: Calendar },
      { path: "/chat", label: "Chat", icon: MessageCircle },
    ],
  };

  const menu = menus[role] || [];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#1C1B1A] text-white z-50 flex flex-col transition-all duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!isCollapsed ? (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">DreamDwell</span>
            </Link>
          ) : (
            <Home className="mx-auto" />
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 bg-[#D4755B] rounded-full w-6 h-6 items-center justify-center"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-2">
          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg mb-1 transition-all",
                isActive(item.path)
                  ? "bg-[#D4755B]"
                  : "hover:bg-white/10 text-gray-300",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
                  <User size={16} />
                </div>
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm">
            Profile
          </button>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogout}>
              <LogOut />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 bg-[#1C1B1A] border border-white/10 rounded-lg shadow-lg text-[#FAF8F4]"
      >
        {isOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>
    </>
  );
};

export default Sidebar;