import localFont from "next/font/local"
import OwingModal from "./owingModal";
import { cookies } from "next/headers";

const AileronLight = localFont({src: "../../../font/Aileron-UltraLight.otf"})

export default function OwingRow({owing} : {owing: any}){

    async function HandlePayment(data: any){
        'use server'
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owing/payOwing`, {
            next: {
                revalidate: 0
            },
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: cookies().get("token")?.value ?? ""
            },
            body: JSON.stringify({
                OwingId: owing._id,
                Value: data.Value
            })
          })
          const resData = await res.json();
          return resData;
    } 
    const formater = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
    const statusText = owing.Status == 1 ? "Pago" : "Pendente";
    return (
        <tr>
            <td className={AileronLight.className + " owingRowData"}>{owing.Debtor}</td>
            <td className={AileronLight.className + " owingRowData"}>{owing.Creditor}</td>
            <td className={AileronLight.className + " owingRowData owingRowValue"}>{formater.format(owing.Status == 1 ? owing.Value : owing.PendingValue)}</td>
            <td className={AileronLight.className + " owingRowData"}>
                <div className={"owingRowStatus p-1 " + (owing.Status == 1 ? "owingRowStatusPaid" : "owingRowStatusPending")}>{statusText}</div>
            </td>
            <OwingModal owing={owing} PaymentCallback={HandlePayment}/>
        </tr>
    )
}
