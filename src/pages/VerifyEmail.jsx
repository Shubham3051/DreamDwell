import React from 'react'

const VerifyEmail = () => {
    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-slate-950 via-cyan-900 to-slate-900 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl 
                            border border-white/20 p-8 rounded-3xl shadow-2xl
                            text-center transition-all duration-500 
                            hover:shadow-cyan-500/30">

                {/* Icon */}
                <div className="text-5xl mb-4 animate-bounce">
                    📩
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white mb-3">
                    Check Your Email
                </h2>

                {/* Description */}
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    We’ve sent a verification link to your email.  
                    Please check your inbox and click the link to activate your account.
                </p>

                {/* Button */}
                <button 
                    className="w-full py-3 rounded-xl font-semibold text-white
                               bg-gradient-to-r from-cyan-500 to-blue-500
                               hover:from-cyan-400 hover:to-blue-400
                               active:scale-95 transition-all duration-300
                               shadow-lg hover:shadow-cyan-500/40"
                >
                    Resend Email
                </button>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-5">
                    Didn’t receive the email? Check your spam folder or try again.
                </p>
            </div>
        </div>
    )
}

export default VerifyEmail