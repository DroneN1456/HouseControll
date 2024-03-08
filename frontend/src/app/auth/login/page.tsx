import Head from "next/head";
import LoginContainer from "./components/LoginContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "House Controll - Entrar",
  };
export default function Page(){
    async function HandleLogin(data: any){
        'use server'
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,{
            next:{
            revalidate: 0
            },
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res.json();
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div>
                <LoginContainer loginCallback={HandleLogin}/>
            </div>
        </div>
    )
}