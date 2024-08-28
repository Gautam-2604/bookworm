'use client'
import React,{useState} from "react";
import { Input } from "@nextui-org/react";
import { Button } from "./ui/button";
import Image from "next/image";
import Bg from "../../src/assets/bookworm-bg.jpg"
import Link from "next/link";
import axios from "axios";

export default async function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = async()=>{
        try {
            const response = await axios.post(`/api/signup`, { email, password, username });
            console.log(response.data);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }
    return (
        <>
            <div>
                <Image className="h-screen w-screen fixed z-[100]" src={Bg}/>
            </div>
            <div className="h-screen w-screen absolute z-[110] bg-black/70 flex items-center justify-center">
                <div className="w-96 backdrop-blur-xl rounded-xl border-[0.01px] border-primary/40 p-8 flex flex-col items-center gap-5">
                <Input type="email" color="secondary" label="Email" variant="bordered" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Input type="text" color="secondary" label="Username" variant="bordered" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <Input type="text" color="secondary" label="Password" variant="bordered" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <Button className="active:scale-75 transform duration-500 bg-white hover:bg-white text-primary" onClick={onSubmit}>Sign up</Button>
                <Link href="/login" className="text-white">Already have an account.</Link>
                </div>
            </div>
        </>
    )
}