import type { GetServerSideProps, GetServerSidePropsContext, Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import localFont from 'next/font/local'
import SidebarItem from "./components/sidebarItem";
import MobileSidebar from "./components/mobileSidebar";
import ToastProvider from "../components/ToastProvider";


export const metadata: Metadata = {
  title: "House Controll",
  description: "Criado por Freedom IT",
};

const AileronItalic = localFont({src: "../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../font/Aileron-UltraLight.otf"})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
    <main className={"container-fluid d-flex flex-row row p-0 m-0"} style={{height: '100vh'}}>
      <MobileSidebar/>
      <div className="col-2 sidebar p-0 d-flex flex-column d-none d-md-block">
        <div className={AileronLight.className + " sidebarHeader"}>Bem-Vindo</div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="sidebarHeaderLine col-10" />
        </div>
        <SidebarItem title="Perfil" url="/profile"/>
        <SidebarItem title="Movimentações" url="/expenses"/>
        <SidebarItem title="Dívidas" url="/owing" />
        <SidebarItem title="Houses" url="/houses"/>
      </div>
      <div className="d-flex flex-column col-12 col-md-10 container-fluid p-3" style={{height: '100vh', padding: "0", margin: "0"}}>
        <div className={AileronItalic.className + " d-flex align-items-center justify-content-center title w-100"} style={{height: '100px'}}>
          House Controll
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </main>
    <ToastProvider/>
    </body>
    </html>
  );
}
