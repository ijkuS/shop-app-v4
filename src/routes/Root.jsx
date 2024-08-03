import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import AuthContextProvider from '../context/AuthContext'

export default function Root() {
	return (
		<AuthContextProvider>
			<main>
				<Navbar />
				<Outlet />
			</main>
		</AuthContextProvider>
	);
}
