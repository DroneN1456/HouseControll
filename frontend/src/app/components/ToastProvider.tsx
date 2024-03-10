import React from "react";
import { Slide, ToastContainer } from "react-toastify";

export default function ToastProvider(){
    return (
        <> 
            <ToastContainer
            theme="colored"
            transition={Slide}
            pauseOnHover={false}/>
        </>
    )
}