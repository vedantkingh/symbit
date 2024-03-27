import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Company from "@/models/companyModel"
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

connect()


export async function POST(request: NextRequest){
    try {
        const { url, email} = await request.json();
        if (!url) {
            return NextResponse.json({ error: "Please provide a LinkedIn URL" }, { status: 400 });
        }
        if (!email) {
            return NextResponse.json({ error: "Please provide an Email" }, { status: 400 });
        }

        const response = await axios.post('https://cattle-awake-arguably.ngrok-free.app/scrape', { url });
        const scrapedData = response.data;

        if (!scrapedData) {
            return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
        }

        const newCompanyData = { ...scrapedData, emails: [email] };

        const newCompany = new Company(newCompanyData);
        const savedCompany = await newCompany.save();

        return NextResponse.json({
            message: "Company added successfully",
            data: savedCompany,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}