import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/common/Navbar";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsloading(true);

      const res = await axios.post(
        "http://localhost:8000/user/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.success) {
        // ✅ FIX: pass FULL user object (not only _id)
        const userData = res.data.data;

        login(userData); // 🔥 FIXED HERE

        // optional: if token exists
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 px-4">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
        >

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
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 text-white"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Password</label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* forgot password */}
          <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-cyan-400 text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-300 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-cyan-400">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;