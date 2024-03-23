"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DropDownMenu from "./DropDownMenu";
import '@/app/profile/style.css'
import { Input, Autocomplete, AutocompleteItem, Textarea, input} from "@nextui-org/react";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [openDropdown, setOpenDropdown] = useState(false)
    const [recipientEmail, setRecipientEmail] = useState('');
    const [purposeEmail, setPurposeEmail] = useState('');
    const [instructionsEmail, setInstructionsEmail] = useState('');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [sendingMail, setSendingMail] = useState(false);

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

    const sendMail = async () => {
        try {
            setSendingMail(true);
            const data = {
                recipientEmail: recipientEmail,
                purposeEmail: purposeEmail,
                generatedEmail: generatedEmail,
            };
            const response = await axios.post("/api/users/sendmail", data);
            console.log(response.data);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        } finally {
            setSendingMail(false)
            toast.success('Mail Sent Successfully')
        }
    }

    const handleRecipientEmailChange = (event: any) => {
        setRecipientEmail(event.target.value);
    }
    const handlePurposeEmailChange = (event: any) => {
        setPurposeEmail(event.target.value);
    }
    const handleInstructionsEmailChange = (event: any) => {
        setInstructionsEmail(event.target.value);
    }
    const handleGeneratedEmailChange = (event: any) => {
        setGeneratedEmail(event.target.value);
    }

    return (
        <div className="flex relative text-lg">
            <Toaster toastOptions={{ style: { background: "rgb(51 65 85)", color: "#fff" }, }} />
            <div className="absolute top-0 left-0 mt-6 ml-6">
                <Image src="/symbit_logo_blue.svg" alt="Symbit logo" width={150} height={37} />
            </div>
            <div className="absolute top-0 right-0 mt-6 mr-6 bg-lightBlue px-3 py-5 rounded-lg z-10 cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)}>
                <div className={openDropdown ? "activeHamburger bg-darkBlue after:bg-darkBlue before:bg-darkBlue" : "hamburger bg-darkBlue after:bg-darkBlue before:bg-darkBlue"} />
            </div>
            {
                openDropdown && <DropDownMenu />
            }
            <div className="w-1/2 h-screen bg-lightOrange">
                <div className="flex flex-col items-center justify-center h-screen p-10">
                    <Autocomplete className="w-2/3 pb-4" label='Select Company or Enter LinkedIn URL' allowsCustomValue={true}>
                        <AutocompleteItem className="text-black" key='1'>hello </AutocompleteItem>
                        <AutocompleteItem className="text-black" key='2'>lelo</AutocompleteItem>
                    </Autocomplete>
                    <Input className="w-2/3 pb-4" type="email" label="Recipient Organization Email" id="organization_email"
                        value={recipientEmail}
                        onChange={handleRecipientEmailChange} />
                    {/* <label className="font-semibold text-darkBlue w-2/3">Recipient Organization E-mail:</label> */}
                    {/* <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-2/3"
                        id="organization_email"
                        type="text"
                        value={recipientEmail}
                        onChange={handleRecipientEmailChange}
                        placeholder="Select recipient’s email address.." /> */}
                    <Input className="w-2/3 pb-4" type="text" label="Purpose of Email" id="organization_email"
                        value={purposeEmail}
                        onChange={handlePurposeEmailChange} />
                    {/* <label className="font-semibold text-darkBlue w-2/3">Purpose of E-mail:</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-2/3"
                        id="purpose_of_email"
                        type="text"
                        value={purposeEmail}
                        onChange={handlePurposeEmailChange}
                        placeholder="Select your purpose.." /> */}
                    {/* <label className="font-semibold text-darkBlue w-2/3">Custom Instructions:</label> */}
                    <Textarea
                        className="w-2/3 pb-4"
                        id="custom_instructions"
                        minRows={7}
                        value={instructionsEmail}
                        onChange={handleInstructionsEmailChange}
                        placeholder="Add custom instructions.." />
                    <button className="bg-lightBlue py-4 px-6 font-semibold text-darkBlue rounded-lg">Generate mail</button>
                </div>
            </div>
            <div className="w-1/2 h-screen bg-darkOrange drop-shadow-xl">
                <div className="flex flex-col items-center justify-center h-screen p-10">
                    <label className="font-semibold text-darkBlue mb-3">Generated Mail</label>
                    <Textarea
                        className="w-2/3 pb-4"
                        classNames={{
                            input: "resize-y max-h-[75vh]",
                        }}
                        id="generated_mail"
                        minRows={10}
                        value={generatedEmail}
                        onChange={handleGeneratedEmailChange} />
                    <button className="bg-lightBlue py-4 px-6 font-semibold text-darkBlue rounded-lg" onClick={sendMail}>{sendingMail ? 'Sending' : 'Send'}</button>
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