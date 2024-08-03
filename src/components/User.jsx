import React from 'react';

export default function User({ user }) {
	return (
		<>
			<div className='user-info'>
				<img
					class='user-photo'
					src={user.photoURL}
					alt={user.displayName}
				/>
				<span class='user-name'>{user.displayName}</span>
			</div>

		</>
	);
}
