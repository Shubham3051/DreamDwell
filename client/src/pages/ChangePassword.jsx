import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match ❌");
    }

    if (form.newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:8000/user/change-password/${email}`,
        {
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword // ✅ only send newPassword
        }
      );

      if (res.data.success) {
        toast.success("Password changed successfully ✅");
        navigate("/login");
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-slate-950 via-cyan-900 to-slate-900 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl 
        border border-white/20 p-8 rounded-3xl shadow-2xl text-center">

        <div className="text-5xl mb-4">🔑</div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Change Password
        </h2>

        <p className="text-gray-300 text-sm mb-6">
          Enter your new password
        </p>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white 
            placeholder-gray-400 border border-white/20 outline-none 
            focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white 
          placeholder-gray-400 border border-white/20 outline-none 
          mb-4 focus:ring-2 focus:ring-cyan-400"
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-cyan-500 to-blue-500
          hover:from-cyan-400 hover:to-blue-400
          active:scale-95 disabled:opacity-50
          transition-all duration-300 shadow-lg"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;