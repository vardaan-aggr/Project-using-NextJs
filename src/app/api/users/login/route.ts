import {connectDB} from "@/dbConfig/dbConfig.js";

import User  from "@/models/userModel.js";
import { NextResponse , NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connectDB();
export const forgotPassword = async (email : string) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        await sendEmail({
            email: email,
            emailType: "RESET",
            userId: user._id
        });
    } catch (error) {
        console.error("Error occurred while sending forgot password email:", error);
        throw new Error("Failed to send forgot password email");
    }
};

export async function POST(request:NextRequest) {
    
    try{
        const reqBody = await request.json();
        const {email , password} = reqBody;

        // Check if the user exists
        const existingUser = await User.findOne({ email });

        if(!existingUser){
            return NextResponse.json({error:"User does not exist"},{status:400});
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch){
            return NextResponse.json({error:"Invalid credentials"},{status:400});
        }

        //create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        };

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET || "" , { expiresIn: "1h" });

        const response = NextResponse.json({
            message:"User logged in successfully", 
            success : true ,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    }catch(error : any){
        return NextResponse.json({error:error.message},{status:500});
    }

}