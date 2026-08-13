import mongoose from "mongoose";
import { verify } from "node:crypto";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [ true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, "Password is required"],
    },  
    isVerified: {
        type: Boolean,
        default: false, 
    },
    isAdmin: {
        type: Boolean,
        default: false, 
    },
    date: {
        type: String,
        default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;