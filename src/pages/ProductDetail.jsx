import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
	const {
		state: {
			product: {
				id,
				title,
				category,
				images,
				price,
				description,
				options,
			},
		},
	} = useLocation();
	const [selected, setSelected] = useState(false);
	const handleClick = (e) => {
		e.preventDefault();
		setSelected(e.target.value);
		console.log(e.target.value);
	};
	return (
		<section className='product-detail-page'>
			<div className='thumbnail-wrapper'>
			{images &&
						images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={title + index}
							/>
						))}
			</div>
			<div className='main-image-wrapper'>
				<div className='image-container'>
					{images &&
						images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={title + index}
							/>
						))}
				</div>
				<div className='text-container'>
					<p className='title'>{title}</p>
					<p className='category'>{category}</p>
					<p className='price'>{`${price} USD`}</p>

					<p className='description'>{description}</p>
					<div className='size-option-buttons'>
						{options &&
							options.map((option, index) => (
								<button
									key={index}
									onClick={handleClick}
									className={
										selected === option
											? `${option} selected`
											: `${option}`
									}
									value={option}>
									{option}
								</button>
							))}
					</div>
					<p className='disclaimer'>4 interest-free payments of $30.99 with Klarna. Learn More</p>
					<button className='button-add-cart'>Add to Bag</button>
				</div>
			</div>
		</section>
	);
}
