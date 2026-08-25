import {connectDB} from "@/dbConfig/dbConfig.js";
import User  from "@/models/userModel.js";
import { NextResponse , NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

connectDB();

export async function GET() {
    
    try{
         const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "No token found" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

        return NextResponse.json({ user: decoded },{status:200});

    }catch(error : any){
        return NextResponse.json({error:error.message},{status:500});
    }

}
