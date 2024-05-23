import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styling/updateShop.css";

const UpdateShop = ({ shopId }) => {
	const [shopData, setShopData] = useState({
		name: "",
		description: "",
		location: "",
		// categories: [],
	});

	useEffect(() => {
		const fetchShopData = async () => {
			const token = localStorage.getItem("shapeshiftkey");
			if (token) {
				try {
					const response = await axios.get(
						`http://localhost:5001/api/shop/${shopId}`,
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					const { name, description, location, categories } =
						response.data.shop;
					setShopData({ name, description, location, categories });
				} catch (error) {
					console.error("Error fetching shop data:", error);
				}
			}
		};
		if (shopId) fetchShopData();
	}, [shopId]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setShopData({ ...shopData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("shapeshiftkey");
		if (token) {
			try {
				await axios.put(`http://localhost:5001/api/shop/${shopId}`, shopData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				alert("Shop information updated successfully! Please refresh to see the changes");
			} catch (error) {
				console.error("Error updating shop data:", error);
				alert("Failed to update shop information.");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Update Shop Info</h3>
			<div className="profile-field">
				<div className="profile-title">
					<label>Shop Name</label>
				</div>
				<div>
					<input
						type="text"
						name="name"
						value={shopData.name}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="profile-field">
            <div className="profile-title">
					<label>Description (max. 300 characters)</label>
				</div>
				<div>
					<textarea
						name="description"
						value={shopData.description}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="profile-field">
            <div className="profile-title">
					<label>Location</label>
				</div>
				<div>
					<input
						type="text"
						name="location"
						value={shopData.location}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			{/* <div>
				<label>Categories</label>
				<input
					type="text"
					name="categories"
					value={shopData.categories.join(", ")}
					onChange={(e) =>
						setShopData({
							...shopData,
							categories: e.target.value.split(",").map((cat) => cat.trim()),
						})
					}
				/>
			</div> */}
			<div className="profile-page-edit">
				<button type="submit">Update Shop</button>
			</div>
		</form>
	);
};

export default UpdateShop;
