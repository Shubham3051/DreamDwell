import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await axios.post(
                "http://localhost:8000/user/forgot-password",
                { email }
            );

            if (res.data.success) {
                toast.success("OTP sent to your email ✅");
                navigate(`/verify-otp/${email}`);
            } else {
                setError(res.data.message);
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            setError("Something went wrong");
            toast.error("Server error ❌");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-slate-950 via-cyan-900 to-slate-900 px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/10 backdrop-blur-2xl 
                           border border-white/20 p-8 rounded-3xl shadow-2xl
                           transition-all duration-500 hover:shadow-cyan-500/30"
            >
                {/* Heading */}
                <h2 className="text-3xl font-bold text-white text-center mb-2">
                    Forgot Password
                </h2>

                <p className="text-gray-300 text-center text-sm mb-6">
                    Enter your email to receive an OTP
                </p>

                {/* Input */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white 
                                   placeholder-gray-400 border border-white/20 
                                   outline-none focus:ring-2 focus:ring-cyan-400
                                   transition-all duration-300"
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-400 text-sm mb-3 text-center animate-pulse">
                        {error}
                    </p>
                )}

                {/* Button */}
                <button
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl font-semibold text-white
                               bg-gradient-to-r from-cyan-500 to-blue-500
                               hover:from-cyan-400 hover:to-blue-400
                               active:scale-95 disabled:opacity-50
                               transition-all duration-300 shadow-lg hover:shadow-cyan-500/40"
                >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>

                {/* Back to login */}
                <p className="text-center text-gray-300 text-sm mt-6">
                    Remember your password?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;