import ExpenseEntry from "../components/expenses/expenseEntry";
import localFont from 'next/font/local'
import ExpenseModal from "../components/expenses/expenseModal";
import { cookies } from "next/headers";
import { Metadata } from "next";

const AileronItalic = localFont({src: "../../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../../font/Aileron-UltraLight.otf"})

export const metadata: Metadata = {
    title: "House Controll - Despesas",
  };

async function GetExpenses(){
    const token = cookies().get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense`,{
        next: {
            revalidate: 0
        },
        headers: {
            token: token?.value ?? '' 
        }, 
    });
    const data = await res.json();
    return data;
}
async function GetExpensesAllTime(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense/expensesAllTime`,{
        next:{
            revalidate: 0
        },
        headers: {
            token: cookies().get('token')?.value ?? ''
        }
    })
    const data = await res.json();
    return data.ExpensesAllTime;
}
async function DeleteExpense(expenseId: any){
    'use server'
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense/${expenseId}`,{
        next:{
            revalidate: 0
        },
        headers: {
            token: cookies().get('token')?.value ?? ''
        },
        method: 'DELETE'
    })
    return res.status;

}
export default async function Page(){
    const expenses = await GetExpenses();

    const expensesAllTime = await GetExpensesAllTime();

    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})


    const modalCallback = async function(entryObject: any){
        'use server'
        const token = cookies().get('token');
        let statusCode = 0;
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense`,{
            next: {
                revalidate: 0
            },
            headers: {
                'Content-Type': 'application/json',
                token: token?.value ?? ''
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
                <div className={AileronLight.className + " col-6 col-md-8 finalValueHeader"}>Saldo Final: </div>
                <div className={"col-6 col-md-4 finalValue " + (expensesAllTime < 0 ? "NegativeValue " : "PositiveValue ") + (AileronItalic.className)}>{format.format(expensesAllTime)}</div>
            </div>
            <div className="row m-0 p-0 d-flex flex-column justify-content-center align-items-center px-2">
                <ExpenseModal addOutCallback={modalCallback}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center m-0 px-2">
                {expenses.reverse().map((expense: any) => {
                    return (<ExpenseEntry expense={expense} DeleteCallback={DeleteExpense} key={expense._id}/>)
                })}
            </div>
        </div>
    )
}