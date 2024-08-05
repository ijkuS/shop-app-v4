// import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LiaShoppingBagSolid, LiaTimesSolid } from 'react-icons/lia';

import User from './User';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

// import Button from './ui/Button';

export default function Navbar() {
	const { user, login, logout } = useAuthContext();
	const [isMenuOpen, setIsMenuOpen] = useState();
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav>
			<section
				className={`menu__container ${isMenuOpen ? 'open' : ''}`}>
				<button
					className={`menu-toggle-button ${
						isMenuOpen ? 'open' : ''
					}`}
					onClick={toggleMenu}>
					<AiOutlineMenu />
				</button>
				<div className='logo'>
					<Link to='/'>OOA</Link>
				</div>

				<menu>
					<button className='delete' onClick={toggleMenu}>
						<LiaTimesSolid />
					</button>

					<Link className='button' to='/products'>
						All Products
					</Link>
					{user && user.isAdmin && (
						<Link className='button' to='/products/new'>
							Add New
						</Link>
					)}

					{user && (
						<div className='user-profile'>
							<User user={user} />
						</div>
					)}
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
						{/* Carts */}
						<LiaShoppingBagSolid />
					</Link>
				</menu>
			</section>
		</nav>
	);
}
