"use client";

import React ,{useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast/headless";

export default function LoginPage() {
    const router = useRouter();
    const [user , setUser] = React.useState({
        email: "",
        password: ""
    })
    const [buttonDisabled , setButtonDisabled] = React.useState(true);
    const [loading , setLoading] = React.useState(false);
    


    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login response:", response.data);
            toast.success("Login successful");
            router.push("/profile");

            // const decodedData = await axios.get("/api/users/decode");

            // router.push(`/profile/${decodedData.data.username}`);

            // router.push(`/profile/${response.data.user.username}`);
            // router.push(`/profile/${response.cookies.get("token").value}`);
            
        }catch(error : any){
            console.log(error.message);
            toast.error("Login failed");

         }finally{
            setLoading(false);
         }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }

    } , [user])
    return (
        <div className="flex flex-col flex-1 font-sans dark:bg-black">
            <h1 className="text-2xl bg-amber-500 text-cyan-500 font-bold">Login</h1>
            <hr/>
            
            <label htmlFor="email">Email:</label>
            <input
                className="border border-gray-300 rounded-md p-2 mb-4"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password:</label>
            <input
                className="border border-gray-300 rounded-md p-2 mb-4"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
            className = "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
             onClick={onLogin}
             >Login</button>
             <Link href="/signup" className="text-blue-500 hover:underline">
                Visit Signup Page
             </Link>
        </div>
    )
}




