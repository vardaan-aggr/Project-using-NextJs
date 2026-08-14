import {connectDB} from "@/dbConfig/dbConfig.js";

import User  from "@/models/userModel.js";
import { NextResponse , NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connectDB();

export async function POST(request:NextRequest) {
    
    try{
        const reqBody = await request.json();
        const {username , email , password} = reqBody;

        console.log("Request Body:", reqBody);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        }
    );

        // Save the user to the database
        const savedUser = await newUser.save();

        console.log("Saved User:", savedUser);
        // Send verification email, but do not fail signup if email delivery breaks.
        try {
            await sendEmail({
                email, emailType:"VERIFY", userId:savedUser._id
            });
        } catch (emailError: any) {
            console.error("Verification email failed:", emailError.message);
        }
        
        return NextResponse.json({
            message:"User created successfully ", 
            success : true ,
            savedUser
        
        });

    }catch(error : any){
        return NextResponse.json({error:error.message},{status:500});
    }

}
