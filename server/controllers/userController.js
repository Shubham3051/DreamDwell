import { sendOtpMail } from "../emailverify/sendOtpMail.js";
import { verifyMail } from "../emailverify/verifyMail.js";
import Session from "../models/Session.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        verifyMail(token, email);

        newUser.token = token

        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully", data:newUser })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const verfication = async(req, res)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({ success: false, message: "Authorization token is missing or invalid" });
        }

        const token = authHeader.split(" ")[1]

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(400).json({ success: false, message: "The registration token has expired" });
            }
            return res.status(401).json({ success: false, message: "Authorization token verification failed" });
        }
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.token = null
        user.isVerified = true
        await user.save()

        return res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(!passwordCheck){
            return res.status(402).json({ success: false, message: "Incorrect Password" });
        }

        //check if user varified
        if(user.isVerified !== true){
            return res.status(403).json({ success: false, message: "Verify your account then login" });
        }

        // chech for exising session and delete it
        const existingSession = await Session.findOne({ userId: user._id });
        if(existingSession){
            await Session.deleteOne({ userId: user._id });
        }

        //create a new session
        await Session.create({ userId: User._id })

        //generate tokens
        const accessToken = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"10d"})
        const refreshToken = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"10d"})

        user.isLoggedIn = true;
        await user.save()

        return res.status(200).json({ success: true, message: `Welcome back ${user.name}` , accessToken, refreshToken , data:user});

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const logoutUser = async (req, res) =>{
    try {
        const userId = req.userId;
        await Session.deleteMany({userId});
        await User.findByIdAndUpdate(userId, {isLoggedIn: false})
        return res.status(200).json({ success: true, message: "Logged out successfully" });

    } catch (error) {
       return res.status(500).json({ success: false, message: error.message }); 
    }
}


export const forgotPassword = async(req, res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save()
        await sendOtpMail(email, otp);
        return res.status(200).json({ success: true, message: "Otp send successfully" });

    } catch (error) {
       return res.status(500).json({ success: false, message: error.message }); 
    }
}


export const verifyOTP = async(req, res) =>{
    const {otp} = req.body
    const email = req.params.email

    if(!otp){
        return res.status(400).json({ success: false, message: "OTP is requried" });
    }

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({ success: false, message: "OTP not generated or already verified" });
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({ success: false, message: "OTP has expired. Please request for new one" });
        }
        if(otp !== user.otp){
            return res.status(400).json({ success: false, message: "Invalid otp" });
        }
        user.otp = null
        user.otpExpiry = null
        await user.save()
        return res.status(200).json({ success: true, message: "OTP verified sucessfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const changePassword =  async(req, res) =>{
    const {newPassword, confirmPassword} = req.body
    const email = req.params.email
    if(!newPassword || !confirmPassword){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({ success: false, message: "Password don't match" });
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save
        return res.status(200).json({ success: true, message: "Password changed successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}