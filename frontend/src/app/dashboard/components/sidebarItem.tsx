'use client'

import { useRouter } from "next/navigation"

export default function SidebarItem({title, url, active = false}: {title: string, url: string, active?: boolean}){
    const router = useRouter();
    function HandleClick(){
        console.log(url)
        router.push('/dashboard' + url);
    }
    return (
    <div className={"sidebarItem " + (active ? "sidebarItemActive" : "")} onClick={HandleClick}>{title}</div>
    )
}