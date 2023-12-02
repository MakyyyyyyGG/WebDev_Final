import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
		import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
		import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

		// TODO: Add SDKs for Firebase products that you want to use
		// https://firebase.google.com/docs/web/setup#available-libraries

		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: "AIzaSyDs1lfKYOB5--BiDaVHBWu9baIM8GHAnlo",
			authDomain: "sample-42d4a.firebaseapp.com",
			projectId: "sample-42d4a",
			storageBucket: "sample-42d4a.appspot.com",
			messagingSenderId: "508468942956",
			appId: "1:508468942956:web:65600c02f26dfd1b1f2049"
		};

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const db = getDatabase();
		const auth = getAuth(app);
		const dbref = ref(db);


		// Function to get product details
		const getProductDetails = () => {
			// List of product IDs, replace these with your actual product IDs
			const productIds = ['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6', 'prod7', 'prod8'];
			// const prodImg = gdocument.getElementById("prodImg");

			//use google drive images link from firebase and use it in html
			const replaceDriveLink = (driveLink) => {
				// Replace the specific part of the Google Drive shareable link
				let replacedLink = driveLink.replace('https://drive.google.com/file/d/', 'https://drive.google.com/uc?export=view&id=');

				// Remove the additional part of the link
				replacedLink = replacedLink.replace('/view?usp=drive_link', '');

				return replacedLink;
			};

			productIds.forEach(productId => {
				const productRef = child(dbref, `Products/${productId}`);
				const prodImgElement = document.getElementById(`${productId}_img`);
				// const prodImgElement = document.getElementById(`${productId}_img`);

				get(productRef).then((snapshot) => {
					if (snapshot.exists()) {
						const productData = snapshot.val();

						// Assuming you have elements with IDs like 'prod1_name', 'prod2_name', etc.
						const productNameElement = document.getElementById(`${productId}_name`);
						const productPriceElement = document.getElementById(`${productId}_price`);

						if (productNameElement && productPriceElement && prodImgElement) {
							productNameElement.innerHTML = `${productData.Name}`;
							productPriceElement.innerHTML = `${productData.Price}`;


							const replacedDriveLink = replaceDriveLink(productData.prodImg);
							prodImgElement.src = replacedDriveLink || 'default-image-url.jpg';

							console.log(`Product ${productId} Name:`, productData.Name);
							console.log(`Product ${productId} Price:`, productData.Price);
							console.log(prodImgElement);
						} else {
							console.log(`HTML elements for Product ${productId} not found`);
						}
					} else {
						console.log(`Product ${productId} not found`);
					}
				}).catch((error) => {
					console.error(`Error fetching product ${productId} details:`, error.message);
				});
			});
		};

		// Call the function to get product details
		window.addEventListener('DOMContentLoaded', getProductDetails);


