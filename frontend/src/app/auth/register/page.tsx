import RegisterContainer from "./components/RegisterContainer";

export default function Page(){
    async function HandleRegister(data: any){
        'use server'
        const res = await fetch(`${process.env.API_URL}/user`, {
            next: {
                revalidate: 0,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            method: 'POST'
        })
        return res.status;

    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div>
                <RegisterContainer RegisterCallback={HandleRegister}/>
            </div>
        </div>
    )
}