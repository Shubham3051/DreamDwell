// import { useEffect, useState } from "react";
// import axios from "axios";
// import VRViewer from "./components/vr/VRViewer";

// function App() {
//   const [properties, setProperties] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/properties")
//       .then(res => setProperties(res.data));
//   }, []);

//   return (
//     <div>
//       <h1>Real Estate VR App</h1>

//       {!selected ? (
//         properties.map(p => (
//           <div key={p._id}>
//             <h2>{p.title}</h2>
//             <p>{p.price}</p>
//             <button onClick={() => setSelected(p)}>
//               View in VR
//             </button>
//           </div>
//         ))
//       ) : (
//         <VRViewer image={selected.vrImage} />
//       )}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;