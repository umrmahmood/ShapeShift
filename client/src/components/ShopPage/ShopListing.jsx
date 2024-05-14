import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/shopListing.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ShopListing = () => {
	const Navigate = useNavigate();

	const [listings, setListings] = useState([]);
	const [imageId, setImageId] = useState([]);
	const [productUrls, setProductUrls] = useState([]);

	useEffect(() => {
		const fetchListings = async () => {
			const token = localStorage.getItem("shapeshiftkey");
			if (token) {
				const decodedToken = jwtDecode(token);
				const shopIdFromToken = decodedToken?.membership?.shopId;
				try {
					const response = await axios.get(
						`http://localhost:5001/api/products/listings/${shopIdFromToken}`
					);
					setListings(response.data);

					const imageIdsArray = [];
					for (const listing of response.data) {
						imageIdsArray.push(listing.images[0]);
					}

					setImageId(imageIdsArray);
				} catch (error) {
					console.error("Error fetching listings:", error);
				}
			}
		};
		fetchListings();
	}, []);

	useEffect(() => {
		const fetchImages = async () => {
			if (imageId !== null && imageId.length > 0) {
				try {
					const imageUrls = [];
					for (const id of imageId) {
						const response = await axios.get(
							`http://localhost:5001/api/images/${id}`
						);
						imageUrls.push(response.data.url);
					}
					setProductUrls(imageUrls);
				} catch (error) {
					console.error("Error fetching images:", error);
				}
			}
		};
		fetchImages();
	}, [imageId]);

	const onAddListing = () => {
		Navigate("/product-form");
	};
	return (
		<>
			<div className="shoplisting-container">
				<h2>Listings</h2>
				<div className="shoplisting-bar">
					<div className="shoplisting-btns">
						<button>Renew</button>
						<button>Deactivate</button>
						<button>Delete</button>
					</div>
					<div className="shoplisting-addlisting-btn">
						<button onClick={onAddListing}>
							<span className="shoplist-plus">+</span> Add a listing
						</button>
					</div>
				</div>
				<div className="shoplisting-card-container">
					{listings.map((listing, index) => (
						<div key={listing._id} className="shoplisting-card">
							<div className="shoplisting-img-container"><img src={productUrls[index]} alt="img" /></div>
							
							<h3>{listing.name}</h3>
							<p>{listing.description}</p>
							<p>
								Price: {listing.price} {listing.currency}
							</p>
							<p>Material: {listing.material.join(", ")}</p>
							<div className="shoplisting-btns">
								<button>Edit</button>
								<button>Delete</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ShopListing;
