import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import { getMaxListeners } from 'events';

const EmailType = {
    VERIFY: "VERIFY",
    RESET: "RESET",
    MAIL: "MAIL"
};

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        const emailContent = {
            [EmailType.VERIFY]: {
                subject: "Verify your email",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
            },
            [EmailType.RESET]: {
                subject: "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`
            },
            [EmailType.MAIL]: {
                subject: "AI Generated Email",
                html: `<p>This is an AI-generated email content.</p>`
            }
        };

        if (emailType === EmailType.VERIFY) {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === EmailType.RESET){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        } else if (emailType === EmailType.MAIL){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        // var transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //       user: process.env.EMAIL_ID,
        //       pass: process.env.EMAIL_PASS
        //       //TODO: add these credentials to .env file
        //     }
        //   });

        var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
        });

        const emailInfo = emailContent[emailType];
        console.log(emailInfo);
        const { subject, html } = emailInfo;
        const mailOptions = {
            from: 'vedant@gmail.com',
            to: email,
            // subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            // html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            // or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            // </p>`
            subject: subject,
            html: html
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}