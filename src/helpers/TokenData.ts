import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

import jwt from "jsonwebtoken";

export const getTokenData = async (request: NextRequest) => {

    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value || '';

        if (!token) {
            throw new Error("No token found");
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        if (typeof decoded === "string") {
            throw new Error("Invalid token payload");
        }

        return decoded.id;
    
    } catch (error : any) {
        throw new Error(error.message);
    }
}
