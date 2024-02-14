import React from 'react';
import '@/app/profile/style.css'
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DropDownMenu = () => {
    const router = useRouter()
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

    return (
        <div className="flex flex-col top-0 right-0 mt-20 mr-6 z-10 text-darkBlue bg-lightBlue font-semibold text-sm rounded-lg dropDown before:bg-lightBlue">
            <ul className="flex flex-col gap-4 p-4">
                <li className="cursor-pointer">Settings</li>
                <li className="cursor-pointer" onClick={logout}>Logout</li>
            </ul>            
        </div>
    );
};

export default DropDownMenu;