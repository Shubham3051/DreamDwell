import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);

    if (res.success) {
      navigate("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-300 text-sm mb-6">
          Join us and start your journey
        </p>

        {/* Name */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="btn-primary">Register</button>

        <p className="text-sm text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;