import React, { createContext, useContext, useEffect, useState } from 'react';
import { OnUserStateChange, login, logout } from '../api/fbase';
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState();
	useEffect(() => {
		OnUserStateChange((user) => {
			setUser(user);
		});
	}, []);
	return (
		<AuthContext.Provider
			value={{ user, uid: user && user.uid, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
export function useAuthContext() {
	return useContext(AuthContext);
}
