"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
            <div>
            <label className = " p-6 text-amber-200" htmlFor="email">Enter your email to reset password : </label>
            <input
            type="text"
            placeholder="Enter email"
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            className="text-black bg-gray-300 border border-gray-300 rounded-md p-2 mb-4"
            />
            </div>
            <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={async () => {
                if(email.length > 0){
                    try {
                        const response = await axios.post("/api/users/forgotpassword/request", { email });
                        console.log(response.data);
                        router.push("/login");
                        alert(response.data.message);
                    } catch (error: any) {
                        console.log("error : ",error.message);
                        alert(error?.response?.data?.message || "Failed to send reset email");
                    }
                }else{
                    alert("Please enter your email first");
                }
            }}>Submit</button>
        </div>
    )
}
