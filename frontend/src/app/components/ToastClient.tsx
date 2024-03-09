'use client'
import { useEffect, useState } from "react";
import { Slide, ToastContainer, Zoom } from "react-toastify";

export default function ToastClient(){
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, [])
    return (
        <>
            {isClient && 
            <ToastContainer
            theme="colored"
            transition={Slide}
            pauseOnHover={false}
            />}
        </>
    )
}