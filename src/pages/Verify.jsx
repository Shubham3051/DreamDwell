import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/verify/${token}`
        );

        if (res.data.success) {
          setStatus("✅ Email Verified Successfully");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("❌ Invalid or Expired Token");
        }
      } catch (error) {
        console.error(error);
        setStatus("❌ Verification Failed. Please try again");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-xl font-semibold">{status}</h2>
      </div>
    </div>
  );
};

export default Verify;