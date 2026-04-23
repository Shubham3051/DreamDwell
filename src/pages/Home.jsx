import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/properties")
      .then(res => setProperties(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Featured Properties</h1>

      <div className="grid md:grid-cols-3 gap-6 ">
        {properties.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow">
            <img src={p.image} alt="" className="h-40 w-full object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{p.title}</h2>
            <p className="text-gray-600">₹{p.price}</p>

            <button
              onClick={() => navigate(`/property/${p._id}`)}
              className="mt-3 bg-cyan-500 text-white px-3 py-1 rounded"
            >
              View in VR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;