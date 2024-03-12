import { cookies } from "next/headers";
import AddHouse from "../components/houses/addHouse";
import HouseCard from "../components/houses/houseCard";

async function GetHouses(){
    const token = cookies().get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/houses`, {
        next: {
            revalidate: 0
        },
        headers: {
            token: token?.value ?? '',
        },
    })
    const data = await res.json();
    return data;
}
async function EnterNewHouse(data: any){
    'use server'
    const token = cookies().get('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invite/use`, {
      next:{
        revalidate: 0
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token?.value ?? ''
      },
      body: JSON.stringify({InviteId: data.Code})
    })
    const resData = res.json()
    return resData;
}
async function CreateNewHouse(data: any){
    'use server'
    const token = cookies().get('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/house`, {
      next:{
        revalidate: 0
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token?.value ?? ''
      },
      body: JSON.stringify({Name: data.Name})
    })
    const resData = res.json()
    return resData;
}
export default async function Page(){
    const userHouses = await GetHouses();
    const houses = await Promise.all(userHouses.map(async (house: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/house/${house}`, {
            next: {
                revalidate: 0
            },
            headers: {
                token: cookies().get('token')?.value ?? '',
            },
        })
        const houseData = await res.json();
        return houseData;
    }))
    return (
        <div className="container-fluid">
            <div className="row">
                {houses.map((house: any) => {
                    return <HouseCard house={house} key={house.Id}/>
                })}
                <AddHouse enterHouseCallback={EnterNewHouse} newHouseCallback={CreateNewHouse}/>
            </div>
        </div>
    )
}