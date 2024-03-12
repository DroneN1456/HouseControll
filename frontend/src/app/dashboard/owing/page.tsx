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

async function GetKnownUsers(){
    'use server'
    const token = cookies().get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getKnownUsers`, {
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
            Debtor: data.Debtor,
            Creditor: data.Creditor,
            Value: data.Value
        })
    })
    const resData = await res.json();
    return resData;
}

export default async function Page(){
    const owings = await GetOwings();
    const knownUsers = await GetKnownUsers();
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Devedor</th>
                        <th scope="col">Credor</th>
                        <th scope="col">Valor</th>
                        <th scope="col" className=""><span className="d-none d-md-block">Status</span></th>
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
                            <CreateOwingModal KnownUsers={knownUsers} CreateCallback={HandleCreate}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}