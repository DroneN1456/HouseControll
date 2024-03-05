import ExpenseEntry from "../components/expenses/expenseEntry";
import localFont from 'next/font/local'
import ExpenseModal from "../components/expenses/expenseModal";

const AileronItalic = localFont({src: "../../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../../font/Aileron-UltraLight.otf"})


export default async function Page(){


    const res = await fetch(`${process.env.API_URL}/expense`,{
        next: {
            revalidate: 0
        },
        headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiU2FtdWVsIiwiVXNlcklkIjoiNjVlNTEyM2JkN2M1YTc4MzQ1YzA0Y2NhIiwiaWF0IjoxNzA5NTExMjYzLCJleHAiOjE3MDk1MTQ4NjN9.LvM5fQOhNCztlzI6FknRc4OEUI6FrVXo7Y-z8eFUFVg'
        }, 
    });
    const data = await res.json();

    let finalValue = 0;

    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})


    const modalCallback = async function(entryObject: any){
        'use server'
        let statusCode = 0;
        return fetch(`${process.env.API_URL}/expense`,{
            next: {
                revalidate: 0
            },
            headers: {
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiU2FtdWVsIiwiVXNlcklkIjoiNjVlNTEyM2JkN2M1YTc4MzQ1YzA0Y2NhIiwiaWF0IjoxNzA5NTExMjYzLCJleHAiOjE3MDk1MTQ4NjN9.LvM5fQOhNCztlzI6FknRc4OEUI6FrVXo7Y-z8eFUFVg'
            },
            body: JSON.stringify(entryObject), 
            method: 'POST'
        }).then(x => x.json()).then(x => {
           return x;
        })
    }
    return (
        <div className="d-flex flex-column justify-content-center m-0 p-0">
            <div className="row m-0 p-0">
                <div className={AileronLight.className + " col-10 finalValueHeader"}>Saldo Final: </div>
                <div className={"col-2 finalValue " + (finalValue < 0 ? "NegativeValue " : "PositiveValue ") + (AileronItalic.className)}>{format.format(finalValue)}</div>
            </div>
            <div className="row p-0 m-0">
                <ExpenseModal addOutCallback={modalCallback}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center m-0 p-0">
                {data.reverse().map((x: any) => {
                    return (<ExpenseEntry title={x.Title} value={x.Value} type={x.Type} key={x._id}/>)
                })}
            </div>
        </div>
    )
}