import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const VerifyOTP = () => {
  const navigate = useNavigate();

  // ✅ get email safely
  const email = sessionStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const validate = () => {
    if (otp.length !== 6) {
      return "Enter a valid 6-digit OTP";
    }
    if (!email) {
      return "Session expired. Please try again.";
    }
    return null;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/user/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        toast.success("OTP Verified ✅");

        // ✅ move to reset-password (token based ideally)
        navigate("/change-password");
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 resend OTP
  const handleResend = async () => {
    if (!email) {
      toast.error("Session expired");
      return;
    }

    try {
      setResendLoading(true);

      const res = await api.post("/user/forgot-password", { email });

      if (res.data.success) {
        toast.success("OTP resent successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">

      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white border border-[#E6E0DA] 
                   rounded-2xl shadow-xl p-8 text-center"
      >

        {/* Icon */}
        <div className="text-4xl mb-3">🔐</div>

        <h2 className="text-2xl font-bold text-[#221410] mb-1">
          Verify OTP
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
          placeholder="••••••"
          className="w-full tracking-[0.5em] text-center text-xl font-semibold
                     px-4 py-3 rounded-xl border border-[#E6E0DA]
                     focus:outline-none focus:ring-2 focus:ring-[#D4755B]
                     mb-3"
        />

        {/* Email */}
        <p className="text-xs text-[#9CA3AF] mb-4">
          Sent to: <span className="text-[#D4755B]">{email}</span>
        </p>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-3">{error}</p>
        )}

        {/* Verify Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-[#1C1B1A] hover:bg-[#D4755B]
                     transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <p className="text-sm text-[#6B7280] mt-5">
          Didn’t receive code?{" "}
          <span
            onClick={handleResend}
            className="text-[#D4755B] cursor-pointer font-medium hover:underline"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </span>
        </p>

      </form>
    </div>
  );
};

export default VerifyOTP;