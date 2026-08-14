"use client";
import axios from "axios";
import { useEffect , useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);

    const [error , setError] = useState(false);
    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        }catch(error : any){
            setError(true);
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        if(urlToken){
            setToken(urlToken);
        }
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <h1 className = "text-2xl font-bold mb-4">
                Verify Email
            </h1>
            <h2 className = "text-lg font-bold"> {token ? `Verifying email with token: ${token}` : 'No token found'}</h2>
            {verified && (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                    <h2>Email verified successfully! You  can now </h2>
                    <Link href="/login" className="text-blue-500 underline">login</Link>.
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
