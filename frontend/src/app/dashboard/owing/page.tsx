import { cookies } from "next/headers";
import OwingRow from "../components/owing/owingRow";
import OwingModal from "../components/owing/owingModal";
import CreateOwingModal from "../components/owing/createOwingModal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "House Controll - Devendo",
  };

async function GetOwings(){
    const token = cookies().get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owing`, {
        next: {
            revalidate: 0
        },
        headers: {
            "Content-Type": "application/json",
            token: token?.value ?? ""
        }
    })
    const data = await res.json();
    return data;
}

async function GetCreditors(){
    const token = cookies().get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allExceptMe`, {
        next: {
            revalidate: 0
        },
        headers: {
            "Content-Type": "application/json",
            token: token?.value ?? ""
        }
    })
    const data = await res.json();
    return data;
    
}

async function HandleCreate(data: any){
    'use server'
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owing`, {
        next: {
            revalidate: 0
        },
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: cookies().get("token")?.value ?? ""
        },
        body: JSON.stringify({
            Creditor: data.Creditor,
            Value: data.Value
        })
    })
    const resData = await res.json();
    return resData;
}

export default async function Page(){
    const owings = await GetOwings();
    const creditors = await GetCreditors();
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Devedor</th>
                        <th scope="col">Credor</th>
                        <th scope="col">Valor</th>
                        <th scope="col" className="">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {owings.map((owing: any) => {
                        return(
                            <OwingRow owing={owing} key={owing._id}/>
                        )
                    })}
                    <tr>
                        <td colSpan={5}>
                            <CreateOwingModal Creditors={creditors} CreateCallback={HandleCreate}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}