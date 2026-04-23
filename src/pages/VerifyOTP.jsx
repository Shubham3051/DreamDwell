import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerifyOTP = () => {
  const { email } = useParams()
  const navigate = useNavigate()

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axios.post(`http://localhost:8000/user/verify-otp/${email}`,
        { email, otp }
      )

      if (res.data.success) {
        toast.success("OTP Verified ✅")
        navigate(`/change-password/${email}`)
      } else {
        setError(res.data.message)
        toast.error(res.data.message)
      }

    } catch (err) {
      console.log(err)
      setError("Verification failed")
      toast.error("Server error ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-slate-950 via-cyan-900 to-slate-900 px-4">

      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl 
                   border border-white/20 p-8 rounded-3xl shadow-2xl
                   text-center transition-all duration-500 
                   hover:shadow-cyan-500/30"
      >

        {/* Icon */}
        <div className="text-5xl mb-4">🔐</div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-300 text-sm mb-6">
          Enter the OTP sent to your email
        </p>

        {/* OTP Input */}
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white 
                     placeholder-gray-400 border border-white/20 
                     outline-none mb-4 text-center tracking-widest text-lg
                     focus:ring-2 focus:ring-cyan-400 transition-all"
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3 animate-pulse">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-cyan-500 to-blue-500
                     hover:from-cyan-400 hover:to-blue-400
                     active:scale-95 disabled:opacity-50
                     transition-all duration-300 shadow-lg hover:shadow-cyan-500/40"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <p className="text-sm text-gray-400 mt-5">
          Didn’t receive OTP?{" "}
          <span
            onClick={() => toast.info("Resend OTP logic here")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>

      </form>
    </div>
  )
}

export default VerifyOTP