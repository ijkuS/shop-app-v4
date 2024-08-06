import React from 'react';
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
	return (
		<section className='product-detail-page'>
			<div className='image-container'>
				{images &&
					images.map((image, index) => (
						<img src={image} alt={title + index} />
					))}
			</div>
         <div className='text-container'>
            <p className='title'>{title}</p>
            <p className='category'>{category}</p>
            <p className='price'>{`${price} USD`}</p>

            <p className='description'>{description}</p>
            <p className='options'>{options}</p>
         </div>
		</section>
	);
}
