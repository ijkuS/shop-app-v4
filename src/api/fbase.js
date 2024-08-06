// Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app';

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
	signOut,
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref as dbRef, get, set } from 'firebase/database';
import {
	getDownloadURL,
	getStorage,
	// listAll,
	ref,
	uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage(app);

export async function login() {
	return signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			console.log(user);
			return user;
		})
		.catch((error) => console.log(error));
}
export async function logout() {
	return signOut(auth)
		.then(() => null)
		.catch((error) => console.log(error));
}
export function OnUserStateChange(callback) {
	return onAuthStateChanged(auth, async (user) => {
		user && adminUserCheck(user);
		const updatedUser = user ? await adminUserCheck(user) : null;
		console.log(updatedUser);
		callback(updatedUser);
	});
}
async function adminUserCheck(user) {
	return get(dbRef(database, 'admins')).then((snapshot) => {
		if (snapshot.exists()) {
			const admins = snapshot.val();
			const isAdmin = admins.includes(user.uid);
			return { ...user, isAdmin };
		}
		return user;
	});
}

export async function uploadFiles(files) {
	try {
		const uploadPromises = Array.from(files).map((file) => {
			const fileRef = ref(storage, `images/${file.name}`);
			return uploadBytes(fileRef, file).then((snapshot) => {
				console.log(snapshot);
				return getDownloadURL(snapshot.ref);
			});
		});
		const urls = await Promise.all(uploadPromises);
		console.log(urls);
		return urls;
	} catch (error) {
		console.error('Error uploading files:', error);
	}
}

export async function addNewProduct(product, imageUrls) {
	const id = uuidv4();
	try {
		set(dbRef(database, `products/${id}`), {
			...product,
			id,
			price: product.price,
			images: Array.isArray(imageUrls) ? imageUrls : [imageUrls],
			options: product.options.split(','),
		});
	} catch (error) {
		console.error('Error adding new product:', error);
	}
}

// later! for product card and list
export async function getProducts() {
	return get(dbRef(database, 'products')).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return []; //snapshot이 없다면 텅텅빈 배열 전달해줘
	});
}
