export default function ExpenseEntry({title, value, type}: {title: string, value: number, type: string}){
    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
    let icon = ''
    switch(type){
        case 'market':
            icon = 'bi bi-basket2';
            break;
        case 'payment':
            icon = 'bi bi-currency-dollar';
            break;
        case 'misc':{
            icon = 'bi bi-three-dots'
        }
        default:
            break;
    }
    return (
        <div className="row expenseEntry d-flex align-items-center m-0 p-0">
            <div className={"col-2 expenseEntryIcon d-flex align-items-center justify-content-center " + (icon)}/>
            <div className="col-7 expenseEntryTitle d-flex align-items-center justify-content-center">{title}</div>
            <div className={"col-3 d-flex align-items-center justify-content-center " + (value < 0 ? "NegativeValue" : "PositiveValue")}>{format.format(value)}</div>
        </div>
    )
}