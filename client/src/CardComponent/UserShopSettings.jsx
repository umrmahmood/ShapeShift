import React, { useState, useEffect } from "react";
import axios from "axios";
import ".//../styling/userShopSettings.css";

const UserShopSettings = ({ shopId, setShopAvatar, setShopBanner }) => {
	const [avatar, setAvatar] = useState(null);
	const [banner, setBanner] = useState(null);
	const [uploadStatus, setUploadStatus] = useState("");

	const handleAvatarChange = (event) => {
		setAvatar(event.target.files[0]);
	};

	const handleBannerChange = (event) => {
		setBanner(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

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

			// Optionally, you can add a success message or redirect the user
		} catch (error) {
			console.error("Error uploading images:", error);
		}
	};


	useEffect(() => {
		if (uploadStatus) {
			alert("upload successful, Please refresh the page to see changes");
			// window.location.reload();
		}
	}, [uploadStatus]);

	// useEffect(() => {
    //     if (uploadStatus) {
    //         setTimeout(() => {
    //             alert(uploadStatus);
    //             setUploadStatus("");
    //         }, 3000); 
    //     }
    // }, [uploadStatus]);

	return (
		<div>
			<p>Change Images</p>
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
					<button type="submit">Save Changes</button>
				</div>
			</form>
		</div>
	);
};

export default UserShopSettings;

//with useEffect if u want to trigger some action after both images are completed
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserShopSettings = ({ shopId }) => {
//   const [avatar, setAvatar] = useState(null);
//   const [banner, setBanner] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');

//   const handleAvatarChange = (event) => {
//     setAvatar(event.target.files[0]);
//   };

//   const handleBannerChange = (event) => {
//     setBanner(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const token = localStorage.getItem("shapeshiftkey");

//       if (avatar) {
//         const avatarFormData = new FormData();
//         avatarFormData.append('image', avatar);

//         await axios.post(`http://localhost:5001/api/images/upload/shop/${shopId}`, avatarFormData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         setUploadStatus('Avatar uploaded successfully!');
//       }

//       if (banner) {
//         const bannerFormData = new FormData();
//         bannerFormData.append('image', banner);

//         await axios.post(`http://localhost:5001/api/images/upload/shopbanner/${shopId}`, bannerFormData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         setUploadStatus('Banner uploaded successfully!');
//       }

//     } catch (error) {
//       console.error('Error uploading images:', error);
//     }
//   };

//   useEffect(() => {
//     if (uploadStatus) {
//       console.log(uploadStatus);
//     }
//   }, [uploadStatus]);

//   return (
//     <div>
//       <h2>Shop Settings</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="avatar">Shop Avatar:</label>
//           <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
//         </div>
//         <div>
//           <label htmlFor="banner">Shop Banner:</label>
//           <input type="file" id="banner" accept="image/*" onChange={handleBannerChange} />
//         </div>
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default UserShopSettings;
