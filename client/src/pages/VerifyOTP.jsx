import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:8000/user/verify-otp/${email}`,
        { email, otp }
      );

      if (res.data.success) {
        toast.success("OTP Verified ✅");
        navigate(`/change-password/${email}`);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      setError("Verification failed");
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
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

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#221410] mb-1">
          Verify OTP
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Input */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="••••••"
          className="w-full tracking-[0.5em] text-center text-xl font-semibold
                     px-4 py-3 rounded-xl border border-[#E6E0DA]
                     focus:outline-none focus:ring-2 focus:ring-[#D4755B]
                     mb-3"
        />

        {/* Email display */}
        <p className="text-xs text-[#9CA3AF] mb-4">
          Sent to: <span className="text-[#D4755B]">{email}</span>
        </p>

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
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <p className="text-sm text-[#6B7280] mt-5">
          Didn’t receive code?{" "}
          <span
            onClick={() => toast.info("Resend OTP feature coming soon")}
            className="text-[#D4755B] cursor-pointer font-medium hover:underline"
          >
            Resend OTP
          </span>
        </p>
      </form>
    </div>
  );
};

export default VerifyOTP;