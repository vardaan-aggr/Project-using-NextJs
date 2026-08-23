import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({ email: email });
        console.log("User found for forgot password request:", user);
        if (!user) {
            return NextResponse.json({ message: "User not found Please check your email." }, { status: 404 });
        }

        // return NextResponse.json({link : `/forgotpassword?token=${encodeURIComponent(hashedToken)}` , message: "Request processed successfully"},{status : 200});

        // to usse sendEmail function to send email to user with the reset password link

        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });



    } catch (error) {
        console.log("Error in forgot password request:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
