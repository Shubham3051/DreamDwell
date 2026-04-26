import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield, BadgeCheck } from "lucide-react";

const SelectRole = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    localStorage.setItem("role", role);
    navigate("/login");
  };

  const roles = [
    {
      id: "user",
      title: "User",
      desc: "Browse & buy/rent properties",
      icon: User,
    },
    {
      id: "agent",
      title: "Agent",
      desc: "Manage listings & clients",
      icon: BadgeCheck,
    },
    {
      id: "admin",
      title: "Admin",
      desc: "Full system control",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1C1B1A]">
            Select Your Role
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Choose how you want to use DreamDwell
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-4">

          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.id}
                onClick={() => handleSelect(role.id)}
                className="
                  w-full text-left p-5 rounded-2xl
                  bg-white border border-[#E6E0DA]
                  hover:border-[#D4755B] hover:shadow-lg
                  transition-all duration-200
                  flex items-center gap-4
                "
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#D4755B]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#D4755B]" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-[#1C1B1A]">
                    {role.title}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {role.desc}
                  </p>
                </div>
              </button>
            );
          })}

        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          You can change your role anytime from settings
        </p>

      </div>
    </div>
  );
};

export default SelectRole;