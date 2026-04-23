import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    if (res.success) {
      navigate("/");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/20"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-300 text-sm mb-6">
          Login to continue your journey
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-400 
                       border border-white/20 outline-none
                       focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                       transition-all duration-300"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white placeholder-gray-400 
                         border border-white/20 outline-none
                         focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                         transition-all duration-300"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-cyan-500 to-blue-500
                     hover:from-cyan-400 hover:to-blue-400
                     active:scale-95
                     transition-all duration-300 shadow-lg hover:shadow-cyan-500/40">
          Login
        </button>

        {/* Footer */}
        <p className="text-md text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;