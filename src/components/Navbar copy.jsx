// import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

// import Button from './ui/Button';

export default function Navbar() {
	const { user, login, logout } = useAuthContext();
	const [isMobile, setIsMobile] = useState();
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
			<section className='mobile-menu__container'>
				<AiOutlineMenu />
				<div className='logo'>
					<Link to='/'>OOA</Link>
				</div>
				<menu>
				<Link className='button' to='/products'>
						All Products
					</Link>
					{user && user.isAdmin && (
						<Link className='button' to='/products/new'>
							Add New
						</Link>
					)}

					{user && <User user={user} />}
					{user && (

						<button
							className='button logout'
							onClick={logout}>
							Sign Out
						</button>
					)}

					{!user && (
						<button className='button login' onClick={login}>
							Sign In
						</button>
					)}

					<Link className='button carts' to='/carts'>
						<LiaShoppingBagSolid />
					</Link>
				</menu>
			</section>

			<section className='menu__container'>
				<div className='logo'>
					<Link to='/'>OOA</Link>
				</div>

				<menu>
					<Link className='button' to='/products'>
						All Products
					</Link>
					{user && user.isAdmin && (
						<Link className='button' to='/products/new'>
							Add New
						</Link>
					)}

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
			</section>
		</nav>
	);
}
