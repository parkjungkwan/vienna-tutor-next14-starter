'use client';
import { Link } from 'nextjs13-progress';
import { useApp } from '@/contexts/AppContext';
import {useState} from 'react'

export default function Home() {
	// const { userData } = useApp();
	const [isLogined, setIsLogined] = useState(false)
	return (
		<div className="m-auto flex flex-col gap-6 text-center items-center">
			{isLogined ? (
				<>
					<h1 className="text-2xl">Welcome Back!</h1>
					<p className="text-xl">Your name is: </p>
					<Link
						className="btn btn-primary"
						href="/dashboard"
					>
						Go to dashboard
					</Link>
					<Link
						className="btn btn-primary"
						href="/logout"
					><h3 className="text-2xl">Logout</h3></Link>
				</>
			) : (
				<>
					<h1 className="text-2xl">Welcome!</h1>
					<Link
						className="btn btn-primary"
						href="/login"
					>
						Login
					</Link>
				</>
			)}
		</div>
	);
}