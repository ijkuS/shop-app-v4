import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OnUserStateChange, login, logout } from '../api/fbase';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Button from './ui/Button';

export default function Navbar() {
	const { user, login, logout } = useAuthContext();
	//set user
	// const [user, setUser] = useState();

	// useEffect(() => {
	// 	OnUserStateChange((user) => {
	// 		console.log(user);
	// 		setUser(user);
	// 	});
	// }, []);

	// const handleLogin = () => {
	// 	login().then(setUser);
	// };
	// const handleLogout = () => {
	// 	logout().then(setUser);
	// };

	return (
		<nav>
			<Link className='logo' to='/'>
				OOA
			</Link>
			<menu>
				<Link className='button' to='/products'>
					All Products
				</Link>

				<Link className='button' to='/products/new'>
					Add New
				</Link>
				{user && <User user={user} />}
				{user && (
					// <Button text={'Sign Out'} onClick={logout} />

					<button
						className='button logout'
						onClick={logout}>
						Sign Out
					</button>
				)}

				{!user && (
					// <Button text={'Sign In'} onClick={login} />
					<button className='button login' onClick={login}>
						Sign In
					</button>
				)}

				<Link className='button carts' to='/carts'>
					{/* Carts */}
					<LiaShoppingBagSolid />
				</Link>
			</menu>
		</nav>
	);
}
