'use client'

import { useRouter } from "next/navigation";

export default function ExpenseEntry({expense, DeleteCallback}: {expense: any, DeleteCallback: any}){
    const router = useRouter();
    
    async function HandleDelete(){
        const resStatus = await DeleteCallback(expense._id);
        if(resStatus == 200){
            router.refresh();
        }
    }
    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
    let icon = ''
    switch(expense.Type){
        case 'market':
            icon = 'bi bi-basket2';
            break;
        case 'payment':
            icon = 'bi bi-currency-dollar';
            break;
        case 'misc':
            icon = 'bi bi-three-dots'
            break;
        case 'owing':
            icon = 'bi bi-cash-coin'
            break;
        default:
            break;
    }
    return (
        <div className="row expenseEntry d-flex align-items-center m-0 p-0 mt-3">
            <div className={"col-2 expenseEntryIcon d-flex align-items-center justify-content-center " + (icon)}/>
            <div className="col-7 expenseEntryTitle d-flex align-items-center justify-content-center">{expense.Title}</div>
            <div className={"col-2 d-flex align-items-center justify-content-center " + (expense.Value < 0 ? "NegativeValue" : "PositiveValue")}>{format.format(expense.Value)}</div>
            <div className="col-1">
                <button className="btn btn-danger entryDelete" onClick={HandleDelete}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    )
}