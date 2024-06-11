import { NextRequest, NextResponse } from "next/server"


export async function GET(request:NextRequest) {
    console.log(`1 - GET 정보 : 진입 성공 `)
    const greeting = "Hello Next 14 !!"
    const json = {
        greeting
    }
    return NextResponse.json(json);    
}