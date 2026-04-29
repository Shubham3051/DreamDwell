import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ simple validation
  const validate = () => {
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!form.email.includes("@")) {
      toast.error("Invalid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);

      const res = await register(form);

      if (res.success) {
        toast.success("Account created. Please verify your email.");
        navigate("/verify");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-[#E6E0DA] rounded-xl bg-white text-[#1C1B1A] text-sm outline-none focus:border-[#D4755B] focus:ring-2 focus:ring-[#D4755B]/20 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">
      <div className="max-w-[480px] w-full">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#D4755B] rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#1C1B1A]">DreamDwell</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E6E0DA] rounded-2xl p-8 shadow-xl">

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1C1B1A]">
              Create Account
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Register as User or Agent
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-[#1C1B1A]">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-[#1C1B1A]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#1C1B1A]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-[#1C1B1A]">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-[#D4755B] hover:bg-[#C05621] transition disabled:opacity-60"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-sm text-[#64748B] mt-5">
            Already have an account?{" "}
            <Link to="/select-role" className="font-semibold text-accent">
              Login
            </Link>
          </p>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-accent hover:text-[#D4755B]">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;