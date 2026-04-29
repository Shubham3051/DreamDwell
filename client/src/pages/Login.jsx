import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth(); // ✅ use context
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) navigate("/select-role");
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // ✅ use AuthContext (not axios)
      const res = await login({ ...form, role });

      if (res.success) {
        toast.success("Welcome back!");

        // role-based redirect
        const userRole = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).role
          : null;

        if (userRole === "admin") navigate("/admin-dashboard");
        else if (userRole === "agent") navigate("/agent-dashboard");
        else navigate("/user-dashboard");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full mt-2 px-4 py-3 rounded-xl border border-[#E6D5C3] outline-none focus:border-[#D4755B] focus:ring-2 focus:ring-[#D4755B]/10 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#D4755B] rounded-xl flex items-center justify-center shadow-md">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-[#1C1B1A]">
              DreamDwell
            </span>
          </Link>
        </div>

        {/* CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E6D5C3] rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-center text-[#1C1B1A]">
            Welcome Back
          </h2>

          <p className="text-center text-sm text-[#5A5856] mt-1 mb-6">
            Login as{" "}
            <span className="text-[#D4755B] uppercase font-semibold">
              {role}
            </span>
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm font-medium text-[#1C1B1A]">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="text-sm font-medium text-[#1C1B1A]">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E6D5C3] outline-none focus:border-[#D4755B] focus:ring-2 focus:ring-[#D4755B]/10 transition"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5856]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* FORGOT */}
          <div className="text-right mb-5">
            <Link
              to="/forgot-password"
              className="text-sm text-accent hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#D4755B] hover:bg-[#C05E44] text-white font-semibold transition shadow-md disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-[#5A5856] mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-accent font-medium">
              Sign Up
            </Link>
          </p>
        </form>

        {/* BACK */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-accent">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;