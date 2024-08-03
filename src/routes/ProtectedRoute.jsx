import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
//1. check, signed-in user ?
//2. check, isAdmin ?
//3. if false -> make them go to the Home
//4. if true -> show the Admin the Children
export default function ProtectedRoute({ children, requireAdmin }) {
	const { user } = useAuthContext();
	if (!user || (requireAdmin && !user.isAdmin)) {
		return <Navigate to='/' replace={true} />;
	}
	return children;
}
