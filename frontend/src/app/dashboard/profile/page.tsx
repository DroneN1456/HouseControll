import localFont from 'next/font/local'
import ProfileCell from '../components/profile/profileCell'
import { cookies } from 'next/headers'
import { Metadata } from 'next'

const AileronItalic = localFont({src: "../../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../../font/Aileron-UltraLight.otf"})

export const metadata: Metadata = {
    title: "House Controll - Perfil",
  };

async function GetProfile(){
    const token = cookies().get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        next:{
            revalidate: 0
        },
        headers: {
            token: token?.value ?? ''
        }
    })
    const data = await res.json();
    return data;
}

export default async function Page(){
    const user = await GetProfile();
    const format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
    return (
        <div className="d-flex justify-content-center-align-items-center flex-column">
            <div className={AileronItalic.className + " profileNameHeader"}>
                Nome
            </div>
            <div className={AileronLight.className + " profileName mb-5"}>
                {user.Name}
            </div>
            <div className="row">
                <ProfileCell title="Gastos Esse Mês" value={format.format(user.ExpensesThisMonth)} negative={user.ExpensesThisMonth < 0}/>
                <ProfileCell title="Previsão de Saldo" value={format.format(user.BalanceForecast)} negative={user.BalanceForecast < 0}/>
                <ProfileCell title="Devendo" value={format.format(user.Owing)} negative={user.Owing > 0}/>
            </div>
        </div>
    )
}