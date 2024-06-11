'use client';
import React, { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

import { I_ApiUserLoginRequest, I_ApiUserLoginResponse } from '../api/login/route';

export default function LoginPage() {
	const { userData, setUserData } = useApp();

	// Utils
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	// Refs
	const loginRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// State
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [loginIsComplete, setLoginIsComplete] = useState(false);

	// Handlers
	const handleLogin = async () => {
		if (isLoading) return;

		setIsLoading(true);
		setError('');
		try {
			if (!loginRef.current?.value || !passwordRef.current?.value)
				throw new Error('Please enter your credentials.');

			const payload: I_ApiUserLoginRequest = {
				username: loginRef.current?.value,
				password: passwordRef.current?.value,
			};

			// console.log(`1 - 페이로드 정보 : ${JSON.stringify(payload)}`)

			// const response = await fetch('/api/hello', {
			// 	method: 'GET',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	}
			// });

			// -------------------------------------------------------------

			// const response = await fetch('/api/login', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify(payload),
			// });

			// -------------------------------------------------------------

			const response = await fetch('http://localhost:8080/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'API-Key': process.env.DATA_API_KEY!,
			},
			body: JSON.stringify({ time: new Date().toISOString() }),
			})
		
			const data2 = await response.json()

			console.log(`3 - 자바를 다녀 온 정보 :${JSON.stringify(data2)} `)



			const data: I_ApiUserLoginResponse = await response.json();
			console.log(`4 - login/route 에서 온 정보 :${JSON.stringify(data)} `)
			// -------------------------------------------------------------

			if (data.success) {
				setLoginIsComplete(true);
				if (redirect) {
					window.location.replace(redirect);
				} else {
					window.location.replace('/dashboard');
				}
				return;
			}

			throw new Error(data.message);
		} catch (error) {
			let mess = 'Something went wrong.';
			if (error instanceof Error) {
				mess = error.message;
			}
			setError(mess);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className="m-auto flex flex-col gap-6 p-10 w-full max-w-md border-2 rounded-xl"
			style={{ height: '435px' }}
		>
			{loginIsComplete ? (
				<div className="m-auto flex flex-col gap-6 items-center">
					<div className="loading loading-spinner loading-lg"></div>
					<h1 className="text-2xl">Getting things ready...</h1>
				</div>
			) : (
				<>
					<h1 className="text-2xl">Welcome Back!</h1>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Login</span>
						</label>
						<input
							defaultValue="john@example.com"
							type="text"
							ref={loginRef}
							className="input input-bordered"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									if (passwordRef.current) {
										passwordRef.current.focus();
									}
								}
							}}
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							defaultValue="12345"
							type="password"
							ref={passwordRef}
							className="input input-bordered"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleLogin();
								}
							}}
						/>
						<label className="label">
							<span className="label-text-alt text-error">{error}</span>
						</label>
					</div>
					<button
						className="btn btn-primary"
						onClick={handleLogin}
					>
						Login
					</button>
				</>
			)}
		</div>
	);
}