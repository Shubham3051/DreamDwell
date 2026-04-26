import React from "react";
import { MailCheck, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] px-4">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white border border-[#E6E0DA] rounded-2xl p-8 shadow-xl text-center">

          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#D4755B]/10 flex items-center justify-center">
            <MailCheck className="w-7 h-7 text-[#D4755B]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#1C1B1A] mb-2">
            Check Your Email
          </h2>

          {/* Description */}
          <p className="text-sm text-[#64748B] leading-relaxed mb-6">
            We’ve sent a verification link to your email address.  
            Please check your inbox and click the link to activate your account.
          </p>

          {/* Resend Button */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-[#D4755B] hover:bg-[#C05621] transition"
          >
            <RefreshCw className="w-4 h-4" />
            Resend Email
          </button>

          {/* Footer */}
          <p className="text-xs text-[#9CA3AF] mt-5">
            Didn’t receive it? Check spam or try resending.
          </p>

        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-[#64748B] hover:text-[#D4755B] transition"
          >
            ← Back to Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;