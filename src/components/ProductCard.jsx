import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllProducts.css';


export default function ProductCard({ product }) {
	const { id, title, category, images, price } = product;
   const navigate = useNavigate();
   const handleClick = (e) =>{
      e.preventDefault();
      navigate(`/products/${id}`, {state:{product}})
    }

	return (
		<div className='product-card' onClick={handleClick}>
			<div className='image-container'>
				<img src={images[0]} alt={title} />
			</div>
			<div className='text-container'>
				<p className='title'>{title}</p>
				<p className='category'>{category}</p>
				<p className='price'>{`${price} USD`}</p>
			</div>
		</div>
	);
}
