"use client";

import React , {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation"
import  Axios  from "axios"
import { toast } from "react-hot-toast/headless";

export default function SignupPage() {
    const router = useRouter(); 
    const [user , setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDissabled , setButtonDisabled] = React.useState(false);
    const [loading , setLoading] = React.useState(false);
    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await Axios.post("/api/users/signup" , user);
            console.log("Signup response:", response.data);
            router.push("/login");


        }catch(error:any){
            console.log("Error during signup:", error);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="flex flex-col flex-1 font-sans dark:bg-black">
            <h1 className="text-2xl bg-amber-500 text-cyan-500 font-bold">{loading ? "Loading..." : "Signup"}</h1>
            <hr/>
            <label htmlFor="username">Username:</label>
            <input
                className="w-50 border border-gray-300 rounded-md p-2 mb-4"
                type="text"
                id="username"
                value={user.username}
                placeholder="Username"

                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="email">Email:</label>
            <input
                className=" w-50 border border-gray-300 rounded-md p-2 mb-4"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password:</label>
            <input
                className=" w-50 border border-gray-300 rounded-md p-2 mb-4"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
            className = "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
             onClick={onSignup}
             >{buttonDissabled ? "Disabled" : "Signup"}</button>
             <Link href="/login" className="text-blue-500 hover:underline">
                Visit Login Page
             </Link>
        </div>
    )
}