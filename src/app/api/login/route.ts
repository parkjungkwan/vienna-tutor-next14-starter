
import { UserData, UserDataPublic } from '@/types/UserData.type';
import { NextRequest, NextResponse } from "next/server"

export interface I_ApiUserLoginRequest {
	username: string;
	password: string;
}

export interface I_ApiUserLoginResponse {
	success: boolean;
	userData?: UserData;
	message?: string;
}

export const dynamic = 'force-dynamic';


export async function POST() {
	console.log(`2 - POST 정보 : 진입 성공 `)
	// const res = await fetch('http://localhost:8080/api/users/login', {
	//   method: 'POST',
	//   headers: {
	// 	'Content-Type': 'application/json',
	// 	'API-Key': process.env.DATA_API_KEY!,
	//   },
	//   body: JSON.stringify({ time: new Date().toISOString() }),
	// })
   
	// const data = await res.json()

	// console.log(`3 - 자바를 다녀 온 정보 :${JSON.stringify(data)} `)

	const greeting = "Login Next 14 !!"
    const json = {
        greeting
    }
   
	return NextResponse.json(json);   
  }