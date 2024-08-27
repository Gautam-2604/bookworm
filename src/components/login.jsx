import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "./ui/button";
import Image from "next/image";
import Bg from "../../src/assets/bookworm-bg.jpg"
import Link from "next/link";

export default async function Login() {
    return (
        <>
            <div>
                <Image className="h-screen w-screen fixed z-[100]" src={Bg}/>
            </div>
            <div className="h-screen w-screen absolute z-[110] bg-black/70 flex items-center justify-center">
                <div className="w-96 backdrop-blur-xl rounded-xl border-[0.01px] border-primary/40 p-8 flex flex-col items-center gap-5">
                <Input type="text" color="secondary" label="Username / Email" variant="bordered"/>
                <Input type="text" color="secondary" label="Password" variant="bordered"/>
                <Button className="active:scale-75 transform duration-500 bg-white hover:bg-white text-primary">Log in</Button>
                <Link href="/signup" className="text-white">New here! Create an account.</Link>
                </div>
            </div>
        </>
    )
}