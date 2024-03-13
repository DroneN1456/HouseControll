'use client'

import { useEffect, useState } from "react"
import { Offcanvas } from "react-bootstrap";
import SidebarItem from "./sidebarItem";
import { usePathname, useSearchParams } from "next/navigation";
import localFont from 'next/font/local'
const AileronLight = localFont({src: "../../font/Aileron-UltraLight.otf"})

export default function MobileSidebar(){
    const [show, setShow] = useState(false);
    const pathname = usePathname()
 
    useEffect(() => {
      setShow(false);
    }, [pathname])

    function HandleShow(){
        setShow(true);
    }
    return (
        <div className="d-block d-md-none">
        <button className="sidebarButton btn btn-primary" onClick={HandleShow}><i className="bi bi-list"></i></button>
        <Offcanvas show={show} onHide={() => setShow(false)}>
            <Offcanvas.Header>
                <Offcanvas.Title className="w-100"><div className={AileronLight.className + " sidebarHeader ml-auto"}>Bem-Vindo</div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="sidebarHeaderLine col-12" />
        </div></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SidebarItem title="Perfil" url="/profile"/>
              <SidebarItem title="Despesas" url="/expenses"/>
              <SidebarItem title="Dívidas" url="/owing" />
              <SidebarItem title="Houses" url="/houses" />
            </Offcanvas.Body>
        </Offcanvas>
        </div>
    )
}