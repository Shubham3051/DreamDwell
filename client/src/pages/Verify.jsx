import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TOKEN:", token);

    if (!token) {
      setStatus("❌ Token not found");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("RESPONSE:", res.data);

        if (res.data.success) {
          setStatus("✅ Email Verified Successfully");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setStatus("❌ Invalid or Expired Token");
        }
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
        setStatus("❌ Verification Failed");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2>{status}</h2>
    </div>
  );
};

export default Verify;