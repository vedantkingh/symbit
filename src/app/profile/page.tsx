"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DropDownMenu from "./DropDownMenu";
import '@/app/profile/style.css'
import { Button, Input, Autocomplete, AutocompleteItem, Textarea, input} from "@nextui-org/react";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [openDropdown, setOpenDropdown] = useState(false)
    const [recipientEmail, setRecipientEmail] = useState('');
    const [purposeEmail, setPurposeEmail] = useState('');
    const [instructionsEmail, setInstructionsEmail] = useState('');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [sendingMail, setSendingMail] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [isCustomValue, setIsCustomValue] = useState(true);

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

    const addCompany = async () => {
        try {
            const data = {
                url: linkedInUrl,
                email: inputMail,
            }
            const response = await axios.post("/api/companies/addcompany", data);
            console.log(response.data);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getCompanies = async () => {
        try {
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail);
            if(isEmailValid){
                const response = await axios.get('/api/companies/getcompany');
                setCompanies(response.data);
            } else {
                toast('Invalid Email');
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    // const handleSelectCompany = (value: any) => {
    //     setLinkedInUrl(value);
    //     setIsCustomValue(false);
    // };
    const handleUrlChange = (value: any) => {
        setLinkedInUrl(value);
        const isLinkedInUrl = /^https:\/\/www\.linkedin\.com\/company\//.test(value);
        setIsCustomValue(!isLinkedInUrl);
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
                    <Autocomplete className="w-5/6 pb-4" label='Select Company or Enter LinkedIn URL' allowsCustomValue={true} isRequired onInputChange={handleUrlChange}>
                        <AutocompleteItem className="text-black" key='1'>hello </AutocompleteItem>
                        <AutocompleteItem className="text-black" key='2'>lelo</AutocompleteItem>
                    </Autocomplete>
                    <div className="flex w-5/6 pb-4 items-center">
                        <Input className="" type="email" label="Recipient Organization Email" id="organization_email" isRequired
                            value={recipientEmail}
                            onChange={handleRecipientEmailChange} />
                        <Button className="ml-4 max-h-max text-xs bg-lightBlue py-4 px-6 font-semibold text-darkBlue" size="lg" onClick={getCompanies} isDisabled={isCustomValue}>
                            Get company details
                        </Button>
                    </div>
                    <Input className="w-5/6 pb-4" type="text" label="Purpose of Email" id="organization_email" isRequired
                        value={purposeEmail}
                        onChange={handlePurposeEmailChange} />
                    <Textarea
                        className="w-5/6 pb-4"
                        id="custom_instructions"
                        minRows={7}
                        value={instructionsEmail}
                        onChange={handleInstructionsEmailChange}
                        placeholder="Add custom instructions.." />
                    <Button className="bg-lightBlue py-4 px-6 font-semibold text-darkBlue rounded-lg">Generate mail</Button>
                </div>
            </div>
            <div className="w-1/2 h-screen bg-darkOrange drop-shadow-xl">
                <div className="flex flex-col items-center justify-center h-screen p-10">
                    <label className="font-semibold text-darkBlue text-base mb-3">Generated Mail</label>
                    <Textarea
                        className="w-5/6 pb-4"
                        classNames={{
                            input: "resize-y max-h-[75vh] min-h-[40vh]",
                        }}
                        id="generated_mail"
                        minRows={10}
                        value={generatedEmail}
                        onChange={handleGeneratedEmailChange} />
                    <Button className="bg-lightBlue py-4 px-6 font-semibold text-darkBlue rounded-lg" onClick={sendMail}>{sendingMail ? 'Sending' : 'Send'}</Button>
                </div>
            </div>
        </div>
    )
}