import { getProducts } from '../api/fbase';
import ProductCard from '../components/ProductCard';
import '../styles/AllProducts.css';
import { useQuery } from '@tanstack/react-query';

export default function AllProducts() {
	const {
		isPending,
		isError,
		data: products,
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});
	// const [products, setProducts] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);

	// useEffect(() => {
	// 	getProducts()
	// 		.then((data) => {
	// 			console.log(data);
	// 			setProducts(data);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.error('Error fetching products:', err);
	// 			setError(err);
	// 			setLoading(false);
	// 		});
	// }, []);
	// if (loading) {
	// 	return <div>Loading...</div>;
	// }
	// if (error) {
	// 	return <div>Error loading products</div>;
	// }

	return (
		<section >
			{isPending && <p>Loading...</p>}
			{isError && <p>Error loading products</p>}
			{products && (
				<ul className='product-list'>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}

				</ul>
			)}
		</section>
	);
}
