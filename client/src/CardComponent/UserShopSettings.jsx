import React, { useState, useEffect } from "react";
import axios from "axios";
import ".//../styling/userShopSettings.css";

const UserShopSettings = ({ shopId, setShopAvatar, setShopBanner }) => {
	const [avatar, setAvatar] = useState(null);
	const [banner, setBanner] = useState(null);
	const [uploadStatus, setUploadStatus] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAvatarChange = (event) => {
		setAvatar(event.target.files[0]);
	};

	const handleBannerChange = (event) => {
		setBanner(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true); 

		try {
			const token = localStorage.getItem("shapeshiftkey");

			if (avatar) {
				const avatarFormData = new FormData();
				avatarFormData.append("image", avatar);

				await axios.post(
					`http://localhost:5001/api/images/upload/shop/${shopId}`,
					avatarFormData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				setUploadStatus("Avatar uploaded successfully!");
			}

			if (banner) {
				const bannerFormData = new FormData();
				bannerFormData.append("image", banner);

				await axios.post(
					`http://localhost:5001/api/images/upload/shopbanner/${shopId}`,
					bannerFormData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				setUploadStatus("Banner uploaded successfully!");
			}

		} catch (error) {
			console.error("Error uploading images:", error);
			setUploadStatus("Error uploading images.");
		} finally {
			setLoading(false); 
		}
	};

	useEffect(() => {
		if (uploadStatus) {
			alert(uploadStatus)
		}
	}, [uploadStatus]);

	return (
		<div>
			<h3>Update Images</h3>
			<form className="userShop-settings-form" onSubmit={handleSubmit}>
				<div className="userShop-settings-images">
					<div className="shop-avatar">
						<label htmlFor="avatar">Change Avatar</label>
						<input
							type="file"
							id="avatar"
							accept="image/*"
							onChange={handleAvatarChange}
						/>
						{avatar && <div className="userShop-uploaded"> File uploaded</div>}
					</div>
					<div className="shop-banner">
						<label htmlFor="banner">Change Banner</label>
						<input
							type="file"
							id="banner"
							accept="image/*"
							onChange={handleBannerChange}
						/>
						{banner && <div className="userShop-uploaded">File uploaded</div>}
					</div>
				</div>
				<div className="shop-images-submit">
					<button type="submit" disabled={loading}>Save Changes</button>
				</div>
				{loading && <div className="loader">Upload in progress...</div>} 
			</form>
		</div>
	);
};

export default UserShopSettings;
