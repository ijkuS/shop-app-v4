import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import AuthContextProvider from '../context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Root() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<main>
					<Navbar />
					<div className='outlet-container'>
						<Outlet />
					</div>
				</main>
			</AuthContextProvider>
		</QueryClientProvider>
	);
}
