"use client"
import React ,{useEffect} from "react";
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast/headless";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data , setData] = React.useState("no data");
    const logout = async () => {
        try{
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");

        }catch(error : any){
            console.log(error.message);
            toast.error("Logout failed");
        }
    }
    const fetchUserData = async () => {
        try{
            const response = await axios.get("/api/users/me");
            console.log("User data:", response.data); 
            setData(response.data.data._id);      

        }catch(error : any){
            console.log(error.message);
            toast.error("Failed to fetch user data");
        }
    }



    return (
        <div className="flex flex-col flex-1 font-sans dark:bg-black">
            <h1 className="text-2xl bg-amber-500 text-cyan-500 font-bold">Profile</h1>
            <hr/>
            <p>Welcome to your profile page!</p>
            <h2 className="text-lg bg-amber-500 text-cyan-500 font-bold">
                {data === "no data" ? "Nothing" : <Link href = {`/profile/${data}`}>
                        {data}
                </Link>}
            </h2>
            <hr/>
            <button
            onClick={logout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300"
            >
                logout
            </button>

            <button
            onClick={fetchUserData}
            className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-orange-600 transition-colors duration-300"
            >
                fetch user data
            </button>
        </div>
    )
}