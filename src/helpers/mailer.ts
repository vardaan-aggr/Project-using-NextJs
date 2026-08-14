import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// const nodemailer = require("nodemailer");

// Create a transporter using SMTP


export const sendEmail = async ({email,emailType,userId} : any) =>{
    try{
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,{
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000, // 1 hour from now
        });}else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
            });
        }

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const smtpSecure = process.env.SMTP_SECURE === "true";
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        
        if(!smtpHost || !smtpUser || !smtpPass){
            throw new Error("Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.");
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const mailOptions = {
            from : process.env.SMTP_FROM || smtpUser,
            to : email,
            subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html : `
                <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${encodeURIComponent(hashedToken)}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
            `
        };

        const mailResponse =await transporter.sendMail(mailOptions);
        return mailResponse;

    }catch(error : any){
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
