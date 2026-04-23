import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from 'react-toastify';



const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  // const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handlehange = (e)=>{
  //   setFormData((prev)=>({
  //     ...prev,
  //     [name]:value
  //   }))
  // }

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(form);

  try {
    setIsLoading(true);

    const res = await axios.post(
      "http://localhost:8000/user/register",
      form,
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message); 
      navigate("/verify");
    } else {
      toast.error(res.data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong"); 
  } finally {
    setIsLoading(false);
  }
};

  //   const res = await register(form);
  //   if (res.success) {
  //     navigate("/login");
  //   } else {
  //     alert(res.message);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl space-y-5"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Create Account 
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Join us and start your journey
          </p>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white placeholder-gray-400 
                         border border-white/20 outline-none
                         focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                         transition-all duration-300"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-cyan-500 to-blue-500
                     hover:from-cyan-400 hover:to-blue-400
                     active:scale-95
                     transition-all duration-300 shadow-lg hover:shadow-cyan-500/40">
          Register
        </button>

        <div className="text-md text-center text-gray-300 mt-6">
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium">
            Already have an account?{" "} Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;