import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock } from "lucide-react";
import api from "../services/api"; // ✅ use axios instance

const ChangePassword = () => {
  const { token } = useParams(); // 🔥 use token instead of email
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (form.newPassword.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (form.newPassword !== form.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post(`/user/reset-password/${token}`, {
        password: form.newPassword,
      });

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

        <h2 className="text-2xl font-bold text-[#221410] mb-1">
          Reset Password
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Enter a new password for your account
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
            onClick={() => setShowPassword((prev) => !prev)}
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
                     transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

      </form>
    </div>
  );
};

export default ChangePassword;