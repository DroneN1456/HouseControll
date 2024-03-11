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
                <AddHouse/>
            </div>
        </div>
    )
}