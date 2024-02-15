import {connect} from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        await sendEmail({email: "vedantkingh123@gmail.com", emailType: "MAIL", userId: user._id});
        console.log("Mail sent successfully");
        return NextResponse.json({
            message: "Mail sent",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}