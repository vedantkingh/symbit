import axios from "axios";
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: NextRequest) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Explain the importance of low latency LLMs"
                }
            ],
            model: "gemma-7b-it"
        });
        // const data = {
        //     messages: [
        //         {
        //             role: "user",
        //             content: "Explain the importance of low latency LLMs"
        //         }
        //     ],
        //     model: "gemma-7b-it"
        // }
        // const completion = axios.post("https://api.groq.com/openai/v1/chat/completions", data);
        // console.log(completion.choices[0]?.message?.content || "");
        return NextResponse.json({
            message: "Companies fetched",
            data: completion.choices[0]?.message?.content, 
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}