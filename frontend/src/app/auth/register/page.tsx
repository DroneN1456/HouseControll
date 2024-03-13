import Head from "next/head";
import RegisterContainer from "./components/RegisterContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "House Controll - Registro",
  };
export default function Page(){
    async function HandleRegister(data: any){
        'use server'
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            next: {
                revalidate: 0,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            method: 'POST'
        })
        const resData = await res.json()
        return resData;

    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Head>
                <title>Login</title>
            </Head>
            <div>
                <RegisterContainer RegisterCallback={HandleRegister}/>
            </div>
        </div>
    )
}