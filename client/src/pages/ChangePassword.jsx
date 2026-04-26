import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock } from "lucide-react";

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
      return setError("Passwords do not match");
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
        }
      );

      if (res.data.success) {
        toast.success("Password updated successfully");
        navigate("/login");
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-[#E6E0DA] 
                   rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-[#D4755B]/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#D4755B]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#221410] mb-1">
          Change Password
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Create a strong new password for your account
        </p>

        {/* New Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#E6E0DA]
                       focus:outline-none focus:ring-2 focus:ring-[#D4755B]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-[#E6E0DA]
                     focus:outline-none focus:ring-2 focus:ring-[#D4755B]
                     mb-4"
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-3">{error}</p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-[#1C1B1A] hover:bg-[#D4755B]
                     transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

        {/* Email info */}
        <p className="text-xs text-[#9CA3AF] mt-5">
          Resetting for: <span className="text-[#D4755B]">{email}</span>
        </p>
      </form>
    </div>
  );
};

export default ChangePassword;