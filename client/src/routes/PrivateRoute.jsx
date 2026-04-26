// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // 🟡 Prevent instant redirect while state is loading
  if (user === undefined) return null;

  return user ? children : <Navigate to="/select-role" />;
};

export default PrivateRoute;