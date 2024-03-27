import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Company from "@/models/companyModel"
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const companies = await Company.find({});
        return NextResponse.json({
            message: "Companies fetched",
            data: companies, 
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}

// export async function POST(request:NextRequest){
//     try {
//         const reqBody = await request.json()
//         const {name, position, organization, replyEmail, useInfo} = reqBody
//         // const user 
//     } catch (error:any) {
//         return NextResponse.json({error: error.message}, {status: 400});
//     }
// }