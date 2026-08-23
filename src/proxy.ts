import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {cookies} from "next/headers";

// This function can be marked `async` if using `await` inside
export function proxy (request: NextRequest) {
    const  path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/";
    const token = request.cookies.get("token")?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }
    
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login" , request.nextUrl))
    }
}
 

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/signup', '/profile' , '/verifyemail'] ,
}