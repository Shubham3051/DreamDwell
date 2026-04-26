import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        setStatus("verifying");

        const res = await axios.post(
          "http://localhost:8000/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <>
            <Loader2 className="w-10 h-10 text-[#D4755B] animate-spin" />
            <h2 className="text-xl font-semibold text-[#1C1B1A] mt-4">
              Verifying your email...
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Please wait while we confirm your account
            </p>
          </>
        );

      case "success":
        return (
          <>
            <CheckCircle className="w-10 h-10 text-green-500" />
            <h2 className="text-xl font-semibold text-[#1C1B1A] mt-4">
              Email Verified!
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Redirecting to login...
            </p>
          </>
        );

      case "error":
      default:
        return (
          <>
            <XCircle className="w-10 h-10 text-red-500" />
            <h2 className="text-xl font-semibold text-[#1C1B1A] mt-4">
              Verification Failed
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              The link is invalid or expired
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-5 px-5 py-2 bg-[#D4755B] text-white rounded-xl text-sm font-medium hover:bg-[#C05621] transition"
            >
              Go to Login
            </button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-[#D4755B] rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E6E0DA] rounded-2xl p-8 shadow-xl text-center">

          {renderContent()}

        </div>

      </div>
    </div>
  );
};

export default Verify;