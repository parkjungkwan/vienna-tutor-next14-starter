
import { UserData, UserDataPublic } from '@/types/UserData.type';
import { NextRequest, NextResponse } from "next/server"

export interface I_ApiUserLoginRequest {
	email: string;
	password: string;
}

export interface I_ApiUserLoginResponse {
	success: boolean;
	userData?: UserData;
	message?: string;
}

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
	
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+'fake-access-token'
	  },
	})
	.then(async (res)=>{
		return res.ok ?
		res.json().then((json)=>{
			const response = NextResponse.json({ success: true, message: "SUCCESS" }, { status: 200 })
			console.log('------------------ response json ---------------')
			console.log(JSON.stringify(json))
			console.log('------------------ --------------- ---------------')
			response.cookies.set({
				name: 'userData',
				value: "",
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			})
			response.cookies.set({
				name: 'accessToken',
				value: "",
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60),
			})
			response.cookies.set({
				name: 'refreshToken',
				value: "",
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			})
			return response

		})
		: NextResponse.json({success: false, message: (await res.json()).message}, {status: 401})
	})
	.catch(async (err) => {
		return NextResponse.json({success: false, message: err}, {status: 400})
	})
   
	

  }