import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NotFound from './pages/NotFound';
import AllProducts from './pages/AllProducts';
import AddNewPage from './pages/AddNewPage';
import MyCart from './pages/MyCart';
import ProductDetail from './pages/ProductDetail';

import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import ShopApp from './ShopApp';
import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{ index: true, element: <ShopApp /> },
			{ path: '/products', element: <AllProducts /> },
			{
				path: '/products/new',
				element: (
					<ProtectedRoute requireAdmin>
						<AddNewPage />
					</ProtectedRoute>
				),
			},
			{ path: '/products/:productId', element: <ProductDetail /> },
			{
				path: '/carts',
				element: (
					<ProtectedRoute>
						<MyCart />
					</ProtectedRoute>
				),
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
