import React, { useState, useEffect } from "react";
import shop from "../../assets/shop_icon.png";
import "../../styling/popupwindowshop.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const OpenShopForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		location: "",
		taxId: "",
	});

	const [showPopup, setShowPopup] = useState(false);
	const [userHasShop, setUserHasShop] = useState(false);
	const [showPopupAlready, setShowPopupAlready] = useState(true);

	const handleGoToShop = () => {};

	useEffect(() => {
		// Decode token and check if user has a shop
		const token = localStorage.getItem("shapeshiftkey");
		if (token) {
			const decodedToken = jwtDecode(token);
			if (decodedToken?.membership?.haveShop) {
				setUserHasShop(true);
			}
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const token = localStorage.getItem("shapeshiftkey");

			const dataToSend = {
				name: formData.name,
				description: formData.description,
				location: formData.location,
				taxId: formData.taxId,
			};
			console.log(dataToSend);
			const response = await axios.post(
				"http://localhost:5001/api/shop/register",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("The response from backend is", response);

			setShowPopup(true);
			setFormData({
				name: "",
				description: "",
				location: "",
				taxId: "",
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handlePopupClose = () => {
		setShowPopup(false);
	};

	const handlePopupCloseAlready = () => {
		setShowPopupAlready(false);
	};

	return (
		<div>
			{userHasShop ? (
				showPopupAlready && (
					<div className="reg-popup">
						<div className="reg-popup-content">
							<h2>Your already have a shop!</h2>
							<div className="reg-regshop-popup-buttons">
								<button onClick={handlePopupCloseAlready}>Close</button>
								<button onClick={handleGoToShop}>Go to My Shop</button>
							</div>
						</div>
					</div>
				)
			) : (
				<div className="regshop-container">
					<div>
						<form onSubmit={handleSubmit}>
							<div className="regshop-field">
								<label>Name</label>
								<div>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="regshop-field">
								<label htmlFor="description">Description</label>

								<div>
									<textarea
										className="description"
										name="description"
										value={formData.description}
										onChange={handleChange}
										maxLength={300}
									/>
								</div>
							</div>

							<div className="regshop-field">
								<label>Location</label>

								<div>
									<input
										type="text"
										name="location"
										value={formData.location}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="regshop-field">
								<label>Tax ID</label>
								<div>
									<input
										type="text"
										name="taxId"
										value={formData.taxId}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="regshop-submit">
								<button type="submit">Submit</button>
							</div>
						</form>
					</div>
					<div className="regshop-image">
						<img src={shop} alt="shopping" />
					</div>
				</div>
			)}
			{showPopup && (
				<div className="reg-popup">
					<div className="reg-popup-content">
						<h2>Your shop has been registered successfully!</h2>
						<div className="reg-regshop-popup-buttons">
							<button onClick={handlePopupClose}>Close</button>
							<button onClick={handleGoToShop}>Go to My Shop</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OpenShopForm;
