'use client'

import { useEffect, useState } from "react"
import { Offcanvas } from "react-bootstrap";
import SidebarItem from "./sidebarItem";
import { usePathname, useSearchParams } from "next/navigation";

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
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SidebarItem title="Perfil" url="/profile"/>
              <SidebarItem title="Despesas" url="/expenses"/>
              <SidebarItem title="Dívidas" url="/owing" />
            </Offcanvas.Body>
        </Offcanvas>
        </div>
    )
}