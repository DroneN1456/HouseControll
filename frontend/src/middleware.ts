import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest){
    const token = request.cookies.get('token')

    console.log(token)
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    if(!token){
        return NextResponse.redirect(url)
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`;
    console.log(apiUrl)
    const res = await fetch(apiUrl, {
        next: {
            revalidate: 0
        },
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({token: token.value})
    })
    console.log(res)
    const data = await res.json()
    console.log(data)
    if(data.statusCode){
        return NextResponse.redirect(url)
    }
    
}
export const config = {
    matcher: '/dashboard/:path*'
}