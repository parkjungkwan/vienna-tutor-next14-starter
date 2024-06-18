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
				email: loginRef.current?.value,
				password: passwordRef.current?.value,
			};
			
			console.log(`2 - App Routing POST`)
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			


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
						<label className="label bg-blue-300 mr-10">
							<span className="label-text">Login</span>
						</label>
						<input
							defaultValue="tom@test.com"
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
						<label className="label bg-blue-300 mr-10">
							<span className="label-text">Password</span>
						</label>
						<input
							defaultValue="1234"
							type="password"
							ref={passwordRef}
							className="input input-bordered border-solid"
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
						className="btn btn-primary bg-blue-500"
						onClick={handleLogin}
					>
						Login
					</button>
				</>
			)}
		</div>
	);
}