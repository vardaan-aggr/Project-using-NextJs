import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse , NextRequest } from "next/server";


connectDB();

export async function POST(request: NextRequest) {

    try{
        const reqBody = await request.json();
        const {token , password } = reqBody;

        console.log("Token received:", token);
        const user = await User.findOne({forgotPasswordToken : token, forgotPasswordTokenExpiry : {$gt : Date.now()}});

        if(!user){
            console.log("No user found with the provided token or token has expired.");
            return NextResponse.json({message : "Invalid or expired token"},{status : 400});
        }
        console.log("User found:", user);

        user.password = await bcryptjs.hash(password, 10);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message : "Password reset successfully",
            success : true
        });

    }catch(error : any){
        return NextResponse.json({message : error.message},{status : 500});
    }
}
