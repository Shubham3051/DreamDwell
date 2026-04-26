// {
//   name: String,
//   email: String,
//   password: String,
//   role: "user" | "admin"
// }

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "agent", "admin"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: null
  },
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  savedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);