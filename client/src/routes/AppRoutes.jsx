import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "../pages/verifyEmail";
import Verify from "../pages/verify";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import UserProfile from "../pages/UserProfile";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      {/* <Route path="/property/:id" element={<PropertyDetails />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/verify-email" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp/:email" element={<VerifyOTP />} />
      <Route path="/change-password/:email" element={<ChangePassword />} />
      <Route path="/user-profile" element={<UserProfile />} />



      {/* Protected Route */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
    <Route
      path="/property/:id"
      element={
      <PrivateRoute>
        <PropertyDetails />
      </PrivateRoute>
  }
/>
      {/* <Route 
        path="/dashboard" 
        element={
        <Dashboard />
        } 
      /> */}


      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;