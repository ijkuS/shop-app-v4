import React, { useEffect, useState } from 'react';
import '../styles/AddNewPage.css';
import { addNewProduct, uploadFiles } from '../api/fbase';

export default function AddNewPage() {
	const [files, setFiles] = useState([]);
	const [product, setProduct] = useState({
		title: '',
		price: '',
		category: '',
		description: '',
		options: '',
	});
	// const [imageList, setImageList] = useState([]);
	const [previewUrls, setPreviewUrls] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value, files: newFiles } = e.target;
		if (name === 'files') {
			const fileArray = Array.from(newFiles);
			setFiles((prevFiles) =>
				[...prevFiles, ...fileArray].slice(0, 10)
			);
			const newUrls = fileArray.map((file) =>
				URL.createObjectURL(file)
			);
			setPreviewUrls((prevUrls) =>
				[...prevUrls, ...newUrls].slice(0, 10)
			);
			return;
		} else {
			setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsUploading(true);
		try {
			const urls = await uploadFiles(files);
			addNewProduct(product, urls);
			setProduct((prevProduct) => ({
				...prevProduct,
				imageUrls: [...(prevProduct.imageUrls || []), ...urls],
			}));
			console.log(urls);
			console.log(product);
			setSuccess(true);
		} catch (error) {
			console.error('Error on handleSubmit', error);
			setSuccess(false);
		}
		setTimeout(() => setSuccess(null), 4000);
		setIsUploading(false);
		setPreviewUrls([]);
		setFiles([]);
		setProduct({
			title: '',
			price: '',
			category: '',
			description: '',
			options: '',
		});
	};
	const handleClick = (e) => {
		e.preventDefault();
		handleSubmit(e);
	};

	useEffect(() => {});

	return (
		<section className='page__add-new'>
			<h2>Add New Products</h2>
			<div className='subwrapper'>
				<div className='preview-images'>
					{previewUrls &&
						previewUrls.map((url, index) => (
							<img
								src={url}
								key={index}
								alt={`preview-${index}`}
							/>
						))}
				</div>
				<form onSubmit={handleSubmit}>
					<div className='disclaimer'>
						<p>You can attach up to 10 images at once.</p>
						<p>
							Currently, you have attached
							{` ${files.length} ` +
								`${
									files.length > 1
										? 'images'
										: 'image'
								}. `}
							You can upload {`${10 - files.length}`} more.
						</p>
					</div>
					<div className='file-input-area'>
						<label htmlFor='file-input'>
							Add files
							{/* {files.length > 0 ? 'Choose files' : 'Add files'} */}
						</label>
						<input
							type='file'
							accept='image/*'
							name='files'
							multiple
							required
							id='file-input'
							onChange={handleChange}
						/>
					</div>
					<input
						type='text'
						name='title'
						placeholder='Product name'
						value={product.title}
						required
						onChange={handleChange}
					/>
					<input
						type='text'
						name='category'
						placeholder='Category'
						value={product.category}
						required
						onChange={handleChange}
					/>
					<input
						type='number'
						name='price'
						placeholder='Price (USD)'
						value={product.price}
						required
						onChange={handleChange}
					/>
					<input
						type='text'
						name='description'
						placeholder='Description'
						value={product.description}
						required
						onChange={handleChange}
					/>
					<input
						type='text'
						name='options'
						placeholder='Options(separated by commas)'
						value={product.options}
						required
						onChange={handleChange}
					/>
					<button
						className='button-upload'
						disabled={isUploading}
						onClick={handleClick}>
						{isUploading ? 'Uploading...' : 'Click to Upload'}
					</button>
					{success && (
						<p className='alert success'>Upload succesful!</p>
					)}
				</form>
			</div>
		</section>
	);
}
