import {connect} from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendGeneratedEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json()
        // const user = await User.findOne({_id: userId}).select("-password");
        const { recipientEmail, purposeEmail, generatedEmail } = reqBody
        await sendGeneratedEmail({replyEmail: 'vedantkingh123@gmail.com', toEmail: recipientEmail, subject: purposeEmail, message: generatedEmail});
        console.log("Mail sent successfully");
        return NextResponse.json({
            message: "Mail sent",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}