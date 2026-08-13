import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

import jwt from "jsonwebtoken";

export const getTokenData = async (request: NextRequest) => {

    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value || '';

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decoded.id;
    
    } catch (error : any) {
        throw new Error(error.message);
    }
}