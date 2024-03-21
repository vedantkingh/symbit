import React from 'react';
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

interface SettingsModalProps {
    isVisible: boolean;
    onClose: any;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, onClose }) => {
    const [user, setUser] = React.useState({
        name: "",
        position: "",
        organization: "",
        replyEmail: "",
        useInfo: false,
    })

    if (!isVisible) return null;

    const onSave = async () => {
        try {
            const response = await axios.post("/api/users/me", user);
            console.log("Saved successfully", response.data);
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            toast.success("Save Complete")
        }
    }

    const handleClose = (e: any) => {
        if (e.target.id === 'wrapper') onClose();
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-40" onClick={handleClose} id='wrapper'>
            <div className="w-1/3 flex flex-col">
                {/* <button className="text-white text-xl place-self-end" onClick={onClose}>X</button> */}
                <div className="flex flex-col items-center justify-center bg-white text-lightBlack p-5 rounded-lg">
                    <div className="font-semibold text-lg pb-4">Settings</div>
                    <div className="flex flex-col w-full">
                        <label className="font-semibold text-sm">Your Name:</label>
                        <input
                            className="p-2 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            id="name"
                            type="text" 
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className="font-semibold text-sm">Your position in organization:</label>
                        <input
                            className="p-2 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                            id="position"
                            type="text" 
                            value={user.position}
                            onChange={(e) => setUser({ ...user, position: e.target.value })}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className="font-semibold text-sm">Organization:</label>
                        <input
                            className="p-2 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                            id="organization"
                            type="text" 
                            value={user.organization}
                            onChange={(e) => setUser({ ...user, organization: e.target.value })}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className="font-semibold text-sm">Your Email(in order to receive replies):</label>
                        <input
                            className="p-2 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                            id="reply_email"
                            type="text" 
                            value={user.replyEmail}
                            onChange={(e) => setUser({ ...user, replyEmail: e.target.value })}/>
                        <div className='flex w-full items-start justify-start'>
                            <input
                                className="form-checkbox h-4 w-4 text-gray-600 rounded"
                                id="use_info"
                                type="checkbox" 
                                checked={user.useInfo}
                                onChange={(e) => setUser({ ...user, useInfo: e.target.checked })}/>
                            <span className="ml-2 text-sm">Use this information in my mail to greet the recipient</span>
                        </div>
                    </div>
                    <div className='flex w-full items-end justify-end'>
                        <button className='text-sm font-bold py-2 px-4 mt-4 bg-green-500 rounded'>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;