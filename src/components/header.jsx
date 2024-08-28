"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import Lg from "../../src/assets/logo.png"
// import { usePathname } from "next/navigation";

export default function Header() {
    
    const handleLogout = async ()=>{
        await fetch('/api/logout', {
            method: 'POST',
          });
          
        };
    

    return (
        <>
            <div className="fixed z-10 w-full h-16 px-2.5 lg:px-5 border-b-[0.01px] border-secondary/50 flex items-center justify-between gap-2.5 lg:gap-5">
                <Image className="h-16 w-16 flex items-center justify-center" src={Lg} />
                {/* <div className="flex items-start justify-center gap-10">
                    <Link href="/" className={`text-sm text-neutral-500 uppercase ${isActive("/")?"font-bold scale-150":"font-medium scale-100"} p-1`}>Lend</Link>
                    <Link href="/" className={`text-sm text-neutral-500 uppercase ${isActive("/")?"font-bold scale-150":"font-medium scale-100"} p-1`}>Borrow</Link>
                </div> */}
                <Button className="active:scale-75 transform duration-500 bg-white hover:bg-white text-secondary" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}