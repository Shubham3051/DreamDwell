import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; // ✅ ADD THIS

const DashboardLayout = ({ children, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar
        role={role}
        isOpen={isOpen}          
        setIsOpen={setIsOpen}    
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col bg-[#e6d5c3]  h-100%">

        {/* CONTENT */}
        <main
          className={`
            flex-1 p-4 transition-all duration-300
            ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
          `}
        >
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;


// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar"; 

// const DashboardLayout = ({ children, role }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden">

//       {/* Sidebar */}
//       <Sidebar
//         role={role}
//         open={isOpen}
//         setOpen={setIsOpen}
//         collapsed={isCollapsed}
//         setCollapsed={setIsCollapsed}
//       />

//       {/* Right Section */}
//       <div className="flex flex-col flex-1">

//         {/* Navbar */}
//         <Navbar setSidebarOpen={setIsOpen} />

//         {/* Main Content */}
//         <main
//           className={`
//             flex-1 p-4 overflow-y-auto transition-all duration-300
//             ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
//           `}
//         >
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;