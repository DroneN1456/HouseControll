'use client'

import { useRouter } from "next/navigation"

export default function SidebarItem({title, url, active = false}: {title: string, url: string, active?: boolean}){
    const router = useRouter();
    function HandleClick(){
        router.push(url)
    }
    return (
    <div className={"sidebarItem " + (active ? "sidebarItemActive" : "")} onClick={HandleClick}>{title}</div>
    )
}