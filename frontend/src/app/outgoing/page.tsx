import OutgoingEntry from "../components/outgoing/outgoingEntry";
import localFont from 'next/font/local'
import OutgoingModal from "../components/outgoing/outgoingModal";

const AileronItalic = localFont({src: "../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../font/Aileron-UltraLight.otf"})


export default function Page(){
    const outgoingEntries = [];
    outgoingEntries.push({
        id: 1,
        title: 'Mercado',
        value: -20.99,
        type: 'market'
    })
    outgoingEntries.push({
        id: 2,
        title: 'Mercado',
        value: -20.99,
        type: 'market'
    })
    outgoingEntries.push({
        id: 3,
        title: 'Mercado',
        value: -20.99,
        type: 'market'
    })
    outgoingEntries.push({
        id: 4,
        title: 'Pagamento',
        value: 20.99,
        type: 'payment'
    })
    outgoingEntries.push({
        id: 5,
        title: 'Pagamento',
        value: 57.00,
        type: 'payment'
    })
    outgoingEntries.push({
        id: 6,
        title: 'Scandallo',
        value: -1500.00,
        type: 'misc'
    })
    outgoingEntries.push({
        id: 6,
        title: 'Mc Donalds',
        value: -37.99,
        type: 'misc'
    })
    outgoingEntries.push({
        id: 7,
        title: 'Nike',
        value: -599.99,
        type: 'misc'
    })
    outgoingEntries.push({
        id: 8,
        title: 'Pagemento',
        value: 37.99,
        type: 'payment'
    })
    outgoingEntries.push({
        id: 9,
        title: 'Pagamento',
        value: 1500.01,
        type: 'payment'
    })

    outgoingEntries.reverse();
    let finalValue = 0;


    outgoingEntries.forEach((current: any) => {
        finalValue += current.value;
    })

    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})

    const modalCallback = async function(entryObject: any){
        'use server'
        console.log(entryObject)
    }
    return (
        <div className="d-flex flex-column justify-content-center m-0 p-0">
            <div className="row m-0 p-0">
                <div className={AileronLight.className + " col-10 finalValueHeader"}>Saldo Final: </div>
                <div className={"col-2 finalValue " + (finalValue < 0 ? "NegativeValue " : "PositiveValue ") + (AileronItalic.className)}>{format.format(finalValue)}</div>
            </div>
            <div className="row p-0 m-0">
                <OutgoingModal addOutCallback={modalCallback}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center m-0 p-0">
            {outgoingEntries.map((current: any) => {
                return (<OutgoingEntry title={current.title} value={current.value} type={current.type} key={current.id}/>)
            })}
            </div>
        </div>
    )
}