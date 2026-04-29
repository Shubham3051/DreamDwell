import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import api from "../services/api"; // ✅ use central API

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!email.includes("@")) {
      return "Enter a valid email";
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

    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/user/forgot-password", { email });

      if (res.data.success) {
        toast.success("OTP sent to your email");

        // ✅ store email temporarily (better than URL)
        sessionStorage.setItem("resetEmail", email);

        navigate("/verify-otp");
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Server error";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
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
            <Mail className="w-5 h-5 text-[#D4755B]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#221410] mb-1">
          Forgot Password
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Enter your email to receive a reset OTP
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          disabled={isLoading}
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-[#1C1B1A] hover:bg-[#D4755B]
                     transition disabled:opacity-60"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Back */}
        <p className="text-sm text-[#6B7280] mt-5">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#D4755B] cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;