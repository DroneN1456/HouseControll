import localFont from 'next/font/local'
import ProfileCell from '../components/profile/profileCell'
const AileronItalic = localFont({src: "../../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../../font/Aileron-UltraLight.otf"})

export default function Page(){
    const user = {
        name: "Matheus Manuera Gigadick"
    }
    const owing = 0;
    const balanceForecast = 55.99;
    const monthExpenses = 0;
    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
    return (
        <div className="d-flex justify-content-center-align-items-center flex-column">
            <div className={AileronItalic.className + " profileNameHeader"}>
                Nome
            </div>
            <div className={AileronLight.className + " profileName mb-5"}>
                {user.name}
            </div>
            <div className="row">
                <ProfileCell title="Gastos Esse Mês" value={format.format(monthExpenses)} negative={monthExpenses > 0}/>
                <ProfileCell title="Previsão de Saldo" value={format.format(balanceForecast)} negative={balanceForecast < 0}/>
                <ProfileCell title="Devendo" value={format.format(owing)} negative={owing > 0}/>
            </div>
        </div>
    )
}