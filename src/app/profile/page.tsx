"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex relative">
            <div className="absolute top-0 right-0 mt-6 mr-6 bg-lightBlue p-6 shadow-lg rounded z-10">
                {/* <ul>
                    <li><a href="#">Menu Item 1</a></li>
                    <li><a href="#">Menu Item 2</a></li>
                    <li><a href="#">Menu Item 3</a></li>
                </ul> */}
            </div>
            <div className="w-1/2 h-screen bg-lightOrange">
                <div className="flex flex-col items-center justify-center h-screen p-10">
                    <label className="font-semibold text-darkBlue w-2/3">Recipient Organization E-mail:</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-2/3"
                        id="organization_email"
                        type="text"
                        placeholder="Select recipient’s email address.." />
                    <label className="font-semibold text-darkBlue w-2/3">Purpose of E-mail:</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-2/3"
                        id="purpose_of_email"
                        type="text"
                        placeholder="Select your purpose.." />
                    <label className="font-semibold text-darkBlue w-2/3">Custom Instructions:</label>
                    <textarea
                        className="p-2 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:border-gray-600 text-black w-2/3 text-wrap"
                        id="purpose_of_email"
                        rows={7}
                        placeholder="Add custom instructions.." />
                    <button className="bg-lightBlue py-4 px-6 font-semibold text-darkBlue rounded-lg">Generate mail</button>
                </div>
            </div>
            <div className="w-1/2 h-screen bg-darkOrange drop-shadow-xl">
                <div className="flex flex-col items-center justify-center h-screen p-10">
                    <label className="font-semibold text-darkBlue mb-4">Generated Mail</label>
                    <textarea
                        className="p-2 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:border-gray-600 text-black w-2/3 text-wrap"
                        id="purpose_of_email"
                        rows={14}
                        placeholder="Add custom instructions.." />
                    <button className="bg-lightBlue py-4 px-6 font-semibold text-darkBlue rounded-lg">Send</button>
                </div>
            </div>
        </div>

        // <div className="flex flex-col items-center justify-center min-h-screen py-2">
        //     <h1>Profile</h1>
        //     <hr />
        //     <p>Profile page</p>
        //     <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
        //     </Link>}</h2>
        //     <hr />
        //     <button
        //         onClick={logout}
        //         className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        //     >Logout</button>

        //     <button
        //         onClick={getUserDetails}
        //         className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        //     >GetUser Details</button>
        // </div>
    )
}