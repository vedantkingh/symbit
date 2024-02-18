"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import HeroComponent from "../components/HeroComponent";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
            toast.success("Signup Complete")
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center">
            <Toaster toastOptions={{ style: { background: "rgb(51 65 85)", color: "#fff" }, }} />
            <HeroComponent/>
            <div className="flex flex-col items-center justify-center w-1/2 h-screen py-2 bg-darkOrange drop-shadow-xl">
                <h1 className="text-2xl font-bold text-darkBlue p-4">{loading ? "Processing" : "Signup"}</h1>
                <hr />

                <div className="flex flex-col items-center justify-center p-8 rounded-2xl  bg-darkBlue drop-shadow-md">
                    <label htmlFor="username">Username</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Username"
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                    />
                    <label htmlFor="Password">password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                    />
                    <button
                        onClick={onSignup}
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
                    <Link href="/login">Visit login page</Link>
                </div>
            </div>
        </div>
    )

}