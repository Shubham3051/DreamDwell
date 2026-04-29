import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "../pages/verifyEmail";
import Verify from "../pages/verify";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ChangePassword from "../pages/ChangePassword";
import Profile from "../pages/Profile";
import SelectRole from "../pages/SelectRole";

import PropertyList from "../pages/List";
import AddProperty from "../pages/Add";
import UpdateProperty from "../pages/Update";
import SavedProperties from "../pages/SavedProperties";
import ChatPage from "../pages/ChatPage";
import Bookings from "../pages/Bookings";
import Contact from "../pages/Contact";

import See from "../components/Home/See";


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
      <Route path="/profile" element={<Profile />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/agent-dashboard" element={<AgentDashboard />} />

      <Route path="/saved-properties" element={<SavedProperties />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/bookings" element={<Bookings />} />

      <Route path="/list" element={<PropertyList />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/update/:id" element={<UpdateProperty />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/see-more" element={<See />} />


      {/* Protected Route */}
      {/* <Route 
        path="/user-dashboard" 
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        } 
      /> */}
    <Route path="/property/:id" element={<PropertyDetails />} />
      <Route 
        path="/user-dashboard" 
        element={
        <UserDashboard />
        } 
      />


      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;