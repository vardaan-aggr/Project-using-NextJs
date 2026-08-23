"use client";
import axios from "axios";
import { useEffect , useState } from "react";
import {Eye , EyeOff} from "lucide-react";
import Link from "next/link";
// import {sendEmail} from "@/helpers/mailer";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);
 
  
    const [error , setError] = useState(false);
    const forgotPassword = async () => {
        try {
            await axios.post('/api/users/forgotpassword', { token, password });
            window.alert("Password reset successful. You can now log in with your new password.");
            // Optionally, redirect the user to the login page after successful password reset
            window.location.href = "/login";
        }catch(error : any){
            setError(true);
            console.log("error : ",error.message);
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleConfirmedPasswordVisibility = () => {
        setShowConfirmedPassword(!showConfirmedPassword);
    }
    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if(urlToken){
            setToken(urlToken);
        }

    }, []);

    useEffect(() => {
        if(password.length > 0 && confirmedPassword.length > 0 && password === confirmedPassword) {
            setIsPasswordsMatch(true);
        } else {
            setIsPasswordsMatch(false);
        }
    }, [password, confirmedPassword]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">

            <h1 className = "text-2xl font-bold mb-4">
                Reset Password
            </h1>
            <h2 className = "text-lg font-bold"> {token ? `Resetting password with token: ${token}` : 'No token found'}</h2>

            <div className="relative">
            <label className = " p-6 text-amber-200" htmlFor="password">New Password : </label>
                <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900 border border-gray-900 rounded py-2 px-7 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
            <div className="relative">
            <label className = " p-2 text-amber-200" htmlFor="confirmedPassword">Confirm Password :   </label>
            <input 
                type={showConfirmedPassword ? "text" : "password"}
                placeholder="Enter confirmed password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                className="  bg-gray-900 border border-gray-500 rounded py-2 px-7 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
                <button
                    type="button"
                    onClick={toggleConfirmedPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 focus:outline-none"
                    aria-label={showConfirmedPassword ? "Hide Confirmed password" : "Show Confirmed password"}
                    >
                    {showConfirmedPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
            <button
                onClick={isPasswordsMatch ? forgotPassword : undefined}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isPasswordsMatch ? "Reset Password" : "Enter Matching Passwords"}
            </button>                                                   



            {password !== confirmedPassword && (
                <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                    <h2>Passwords do not match.</h2>
                </div>
            )}
            {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                    <h2>Error verifying email.</h2>
                </div>
            )}

        </div>
    )
}

