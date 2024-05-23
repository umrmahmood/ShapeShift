import { useState, useEffect } from "react";
import "../../styling/userProfile.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
	const [user, setUser] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		newPassword: "",
		confirmPassword: "",
		profile: {
			username: "",
			firstName: "",
			lastName: "",
			birthday: "",
			pronouns: "",
			bio: "",
		},
		address: {
			street1: "",
			street2: "",
			city: "",
			country: "",
			zip: "",
		},
	});
	const [avatarFile, setAvatarFile] = useState(null);

	useEffect(() => {
		const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

		if (tokenFromLocalStorage) {
			const decodedToken = jwtDecode(tokenFromLocalStorage);
			const userId = decodedToken.id;

			axios
				.get(`/api/users/profile/${userId}`)
				.then((response) => {
					const userData = response.data.user;
					setUser(userData);
					setFormData({
						email: userData.email,
						profile: {
							username: userData.profile.username,
							firstName: userData.profile.firstName,
							lastName: userData.profile.lastName,
							birthday: userData.profile.birthday,
							pronouns: userData.profile.pronouns,
							bio: userData.profile.bio,
						},
						address: {
							street1: userData.address.street1,
							street2: userData.address.street2,
							city: userData.address.city,
							country: userData.address.country,
							zip: userData.address.zip,
						},
					});
				})
				.catch((error) => {
					console.error("Error fetching user information:", error);
				});
		} else {
			console.log("Token not found in localStorage");
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// If the field is nested (e.g., profile.firstName), update the nested object
		if (name.includes(".")) {
			const [parent, child] = name.split(".");
			setFormData((prevData) => ({
				...prevData,
				[parent]: {
					...prevData[parent],
					[child]: value,
				},
			}));
		} else {
			// If the field is not nested, update the top-level object
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleAvatarChange = (e) => {
		setAvatarFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("First updates user:", user);
			// Update user profile data
			const updatedUser = await axios.put(
				`/api/users/profile/${user._id}`,
				formData
			);
			setUser(updatedUser.data.user);
			setEditMode(false);
		} catch (error) {
			console.error("Error updating user profile:", error);
		}

		if (avatarFile) {
			// If a new avatar file is selected
			const formData = new FormData();
			formData.append("image", avatarFile);

			// Upload avatar file
			const uploadResponse = await axios.post(
				`/api/images/upload/profile/${user._id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// Update user's avatar URL with the response from the server
			setUser((prevUser) => ({
				...prevUser,
				profile: {
					...prevUser.profile,
					avatarUrl: uploadResponse.data.avatarUrl,
				},
			}));
		}
	};

	return (
		<div className="pagemargin profile-page-section">
			{user && (
				<>
					<div className="profile-heading">
						<h2>
							Welcome, {user.profile.pronouns} {user.profile.firstName}!
						</h2>
					</div>
					{editMode ? (
						<>
							<div className="edit-avatar-container">
								<label htmlFor="avatarInput">
									<img
										className="edit-avatar"
										src={user.profile.avatarUrl}
										alt="user's avatar"
									/>
									<span>Change Avatar</span>
									<input
										id="avatarInput"
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
										style={{ display: "none" }}
									/>
								</label>
							</div>
							<form
								onSubmit={handleSubmit}
								className="display-profile-container"
							>
<div className="display-profile-wrapper edit-profile-wrapper">
	<div className="profile-field">
		<div className="profile-title">
			<label>Bio</label>
		</div>
		<textarea
			name="profile.bio"
			value={formData.profile.bio}
			onChange={handleChange}
		></textarea>
	</div>
	<div className="profile-field">
		<div className="profile-title">
			<label>Salutation</label>
		</div>
		<div className="profile-salutation">
			<select
				name="profile.pronouns"
				value={formData.profile.pronouns}
				onChange={handleChange}
			>
				<option value="Mr.">Mr.</option>
				<option value="Mrs.">Mrs.</option>
				<option value="Miss">Miss</option>
				<option value="Ms.">Ms.</option>
				<option value="Dr.">Dr.</option>
			</select>
		</div>
	</div>

	<div className="profile-address">
		<div className="profile-field">
			<div className="profile-title">
				<label>First Name</label>
			</div>
			<div>
				<input
					type="text"
					name="profile.firstName"
					value={formData.profile.firstName}
					onChange={handleChange}
				/>
			</div>
		</div>

		<div className="profile-field">
			<div className="profile-title">
				<label>Last Name</label>
			</div>
			<div>
				<input
					type="text"
					name="profile.lastName"
					value={formData.profile.lastName}
					onChange={handleChange}
				/>
			</div>
		</div>
	</div>

	<div className="profile-field-set">
		<div className="profile-field">
			<div className="profile-title">
				<label>Birthday</label>
			</div>
			<div>
				<input
					type="date"
					name="profile.birthday"
					value={formData.profile.birthday}
					onChange={handleChange}
				/>
			</div>
		</div>
		<div className="profile-field">
			<div className="profile-title">
				<label>Username</label>
			</div>
			<div>
				<input
					type="text"
					name="profile.username"
					value={formData.profile.username}
					onChange={handleChange}
				/>
			</div>
		</div>
	</div>

	<div className="profile-address">
		<div className="profile-field ">
			<div className="profile-title">
				<label>Street 1</label>
			</div>
			<div>
				<input
					type="text"
					name="address.street1"
					value={formData.address.street1}
					onChange={handleChange}
				/>
			</div>
		</div>
		<div className="profile-field ">
			<div className="profile-title">
				<label>Street 2</label>
			</div>
			<div>
				<input
					type="text"
					name="address.street2"
					value={formData.address.street2}
					onChange={handleChange}
				/>
			</div>
		</div>
	</div>

	<div className="profile-address">
		<div className="profile-field">
			<div className="profile-title">
				<label>City</label>
			</div>
			<div>
				<input
					type="text"
					name="address.city"
					value={formData.address.city}
					onChange={handleChange}
				/>
			</div>
		</div>

		<div className="profile-field">
			<div>
				<label className="profile-title">Zip</label>
			</div>
			<div>
				<input
					type="text"
					name="address.zip"
					value={formData.address.zip}
					onChange={handleChange}
				/>
			</div>
		</div>
	</div>
	<div>
		<div className="profile-field">
			<div>
				<label className="profile-title">Country</label>
			</div>
			<div>
				<input
					type="text"
					name="address.country"
					value={formData.address.country}
					onChange={handleChange}
				/>
			</div>
		</div>
	</div>
									<div className="profile-page-edit">
										<button type="submit">Save</button>
									</div>
								</div>
							</form>
						</>
					) : (
						<>
<div className="display-profile-container">
	<div className="profile-avatar-container">
		<img
			className="profile-avatar"
			src={user.profile.avatarUrl}
			alt="users avatar"
		/>
	</div>
	<div className="display-profile-wrapper">
		<div className="profile-field">
			<div className="profile-title">Email</div>
			<div>{user.email}</div>
		</div>
		<div className="profile-field">
			<div className="profile-title">Username</div>
			<div> {user.profile.username}</div>
		</div>
		<div className="profile-field">
			<div className="profile-title">First Name</div>
			<div>{user.profile.firstName}</div>
		</div>

		<div className="profile-field">
			<div className="profile-title">Last Name</div>
			<div>{user.profile.lastName}</div>
		</div>
		<div className="profile-field">
			<div className="profile-title">Date of Birth</div>
			<div>
				{user.profile.birthday &&
					user.profile.birthday.split("T")[0]}
			</div>
		</div>

		<div className="profile-field">
			<div className="profile-title">About me </div>
			<div>{user.profile.bio}</div>
		</div>

		<div className="profile-field">
			<div className="profile-title">Address</div>
			{user.address.street1}, {user.address.street2},{" "}
			{user.address.city}, {user.address.country},{" "}
			{user.address.zip}
		</div>
		<div className="profile-page-edit">
			<button onClick={() => setEditMode(true)}>Edit</button>
		</div>
	</div>
</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default UserProfile;


// //with Password Change

// import { useState, useEffect } from "react";
// import "../../styling/userProfile.css";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const UserProfile = () => {
// 	const [user, setUser] = useState("");
// 	const [editMode, setEditMode] = useState(false);
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		currentPassword: "",
// 		newPassword: "",
// 		confirmPassword: "",
// 		profile: {
// 			username: "",
// 			firstName: "",
// 			lastName: "",
// 			birthday: "",
// 			pronouns: "",
// 			bio: "",
// 		},
// 		address: {
// 			street1: "",
// 			street2: "",
// 			city: "",
// 			country: "",
// 			zip: "",
// 		},
// 	});
// 	const [avatarFile, setAvatarFile] = useState(null);

// 	useEffect(() => {
// 		const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

// 		if (tokenFromLocalStorage) {
// 			const decodedToken = jwtDecode(tokenFromLocalStorage);
// 			const userId = decodedToken.id;

// 			axios
// 				.get(`/api/users/profile/${userId}`)
// 				.then((response) => {
// 					const userData = response.data.user;
// 					setUser(userData);
// 					setFormData({
// 						email: userData.email,
// 						profile: {
// 							username: userData.profile.username,
// 							firstName: userData.profile.firstName,
// 							lastName: userData.profile.lastName,
// 							birthday: userData.profile.birthday,
// 							pronouns: userData.profile.pronouns,
// 							bio: userData.profile.bio,
// 						},
// 						address: {
// 							street1: userData.address.street1,
// 							street2: userData.address.street2,
// 							city: userData.address.city,
// 							country: userData.address.country,
// 							zip: userData.address.zip,
// 						},
// 					});
// 				})
// 				.catch((error) => {
// 					console.error("Error fetching user information:", error);
// 				});
// 		} else {
// 			console.log("Token not found in localStorage");
// 		}
// 	}, []);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		// If the field is nested (e.g., profile.firstName), update the nested object
// 		if (name.includes(".")) {
// 			const [parent, child] = name.split(".");
// 			setFormData((prevData) => ({
// 				...prevData,
// 				[parent]: {
// 					...prevData[parent],
// 					[child]: value,
// 				},
// 			}));
// 		} else {
// 			// If the field is not nested, update the top-level object
// 			setFormData({ ...formData, [name]: value });
// 		}
// 	};

// 	const handleAvatarChange = (e) => {
// 		setAvatarFile(e.target.files[0]);
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			console.log("First updates user:", user);
// 			// Update user profile data
// 			// const updatedUser = await axios.put(
// 			// 	`/api/users/profile/${user._id}`,
// 			// 	formData
// 			// );
// 			// setUser(updatedUser.data.user);
// 			// setEditMode(false);

// 			const { currentPassword, newPassword, confirmPassword, ...profileData } =
// 				formData;
// 			const updatedUser = await axios.put(
// 				`/api/users/profile/${user._id}`,
// 				profileData
// 			);
// 			setUser(updatedUser.data.user);
// 			setEditMode(false);

// 			if (newPassword !== "" && newPassword === confirmPassword) {
// 				// If newPassword is not empty and matches confirmPassword
// 				// Change password
// 				await axios.put(`/api/users/password/${user._id}`, {
// 					currentPassword,
// 					newPassword,
// 				});
// 			}

// 			if (avatarFile) {
// 				// If a new avatar file is selected
// 				const formData = new FormData();
// 				formData.append("image", avatarFile);

// 				// Upload avatar file
// 				const uploadResponse = await axios.post(
// 					`/api/images/upload/profile/${user._id}`,
// 					formData,
// 					{
// 						headers: {
// 							"Content-Type": "multipart/form-data",
// 						},
// 					}
// 				);

// 				// Update user's avatar URL with the response from the server
// 				setUser((prevUser) => ({
// 					...prevUser,
// 					profile: {
// 						...prevUser.profile,
// 						avatarUrl: uploadResponse.data.avatarUrl,
// 					},
// 				}));
// 			}

// 			// Reset password fields after successful update
// 			setFormData((prevData) => ({
// 				...prevData,
// 				currentPassword: "",
// 				newPassword: "",
// 				confirmPassword: "",
// 			}));
// 		} catch (error) {
// 			console.error("Error updating user profile:", error);
// 		}
// 	};

// 	return (
// 		<div className="pagemargin">
// 			{user && (
// 				<>
// 					<div className="profile-heading">
// 						<h2>
// 							Welcome, {user.profile.pronouns} {user.profile.firstName}!
// 						</h2>
// 					</div>
// 					{editMode ? (
// 						<>
// 							<div className="edit-avatar-container">
// 								<label htmlFor="avatarInput">
// 									<img
// 										className="edit-avatar"
// 										src={user.profile.avatarUrl}
// 										alt="user's avatar"
// 									/>
// 									<span>Change Avatar</span>
// 									<input
// 										id="avatarInput"
// 										type="file"
// 										accept="image/*"
// 										onChange={handleAvatarChange}
// 										style={{ display: "none" }}
// 									/>
// 								</label>
// 							</div>
// 							<form
// 								onSubmit={handleSubmit}
// 								className="display-profile-container"
// 							>
// 								<div className="display-profile-wrapper edit-profile-wrapper">
// 									<div className="profile-field">
// 										<div className="profile-title">
// 											<label>Bio</label>
// 										</div>
// 										<textarea
// 											name="profile.bio"
// 											value={formData.profile.bio}
// 											onChange={handleChange}
// 										></textarea>
// 									</div>
// 									<div className="profile-field">
// 										<div className="profile-title">
// 											<label>Salutation</label>
// 										</div>
// 										<div className="profile-salutation">
// 											<select
// 												name="profile.pronouns"
// 												value={formData.profile.pronouns}
// 												onChange={handleChange}
// 											>
// 												<option value="Mr.">Mr.</option>
// 												<option value="Mrs.">Mrs.</option>
// 												<option value="Miss">Miss</option>
// 												<option value="Ms.">Ms.</option>
// 												<option value="Dr.">Dr.</option>
// 											</select>
// 										</div>
// 									</div>

// 									<div className="profile-address">
// 										<div className="profile-field">
// 											<div className="profile-title">
// 												<label>First Name</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="profile.firstName"
// 													value={formData.profile.firstName}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>

// 										<div className="profile-field">
// 											<div className="profile-title">
// 												<label>Last Name</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="profile.lastName"
// 													value={formData.profile.lastName}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 									</div>

// 									<div className="profile-field-set">
// 										<div className="profile-field">
// 											<div className="profile-title">
// 												<label>Birthday</label>
// 											</div>
// 											<div>
// 												<input
// 													type="date"
// 													name="profile.birthday"
// 													value={formData.profile.birthday}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 										<div className="profile-field">
// 											<div className="profile-title">
// 												<label>Username</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="profile.username"
// 													value={formData.profile.username}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 									</div>

// 									<div className="profile-address">
// 										<div className="profile-field ">
// 											<div className="profile-title">
// 												<label>Street 1</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="address.street1"
// 													value={formData.address.street1}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 										<div className="profile-field ">
// 											<div className="profile-title">
// 												<label>Street 2</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="address.street2"
// 													value={formData.address.street2}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 									</div>

// 									<div className="profile-address">
// 										<div className="profile-field">
// 											<div className="profile-title">
// 												<label>City</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="address.city"
// 													value={formData.address.city}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>

// 										<div className="profile-field">
// 											<div>
// 												<label className="profile-title">Zip</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="address.zip"
// 													value={formData.address.zip}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 									</div>
// 									<div>
// 										<div className="profile-field">
// 											<div>
// 												<label className="profile-title">Country</label>
// 											</div>
// 											<div>
// 												<input
// 													type="text"
// 													name="address.country"
// 													value={formData.address.country}
// 													onChange={handleChange}
// 												/>
// 											</div>
// 										</div>
// 									</div>

// 									{/* New password change fields */}
// 									<div className="profile-field">
// 										<div className="profile-title">
// 											<label>Current Password</label>
// 										</div>
// 										<input
// 											type="password"
// 											name="currentPassword"
// 											value={formData.currentPassword}
// 											onChange={handleChange}
// 										/>
// 									</div>
// 									<div className="profile-field">
// 										<div className="profile-title">
// 											<label>New Password</label>
// 										</div>
// 										<input
// 											type="password"
// 											name="newPassword"
// 											value={formData.newPassword}
// 											onChange={handleChange}
// 										/>
// 									</div>
// 									<div className="profile-field">
// 										<div className="profile-title">
// 											<label>Confirm Password</label>
// 										</div>
// 										<input
// 											type="password"
// 											name="confirmPassword"
// 											value={formData.confirmPassword}
// 											onChange={handleChange}
// 										/>
// 									</div>

// 									{/* Submit button */}
// 									<div className="profile-page-edit">
// 										<button type="submit">Save</button>
// 									</div>
// 								</div>
// 							</form>
// 						</>
// 					) : (
// 						<>
// 							<div className="display-profile-container">
// 								<div className="profile-avatar-container">
// 									<img
// 										className="profile-avatar"
// 										src={user.profile.avatarUrl}
// 										alt="users avatar"
// 									/>
// 								</div>
// 								<div className="display-profile-wrapper">
// 									<div className="profile-field">
// 										<div className="profile-title">Email</div>
// 										<div>{user.email}</div>
// 									</div>
// 									<div className="profile-field">
// 										<div className="profile-title">Username</div>
// 										<div> {user.profile.username}</div>
// 									</div>
// 									<div className="profile-field">
// 										<div className="profile-title">First Name</div>
// 										<div>{user.profile.firstName}</div>
// 									</div>

// 									<div className="profile-field">
// 										<div className="profile-title">Last Name</div>
// 										<div>{user.profile.lastName}</div>
// 									</div>
// 									<div className="profile-field">
// 										<div className="profile-title">Date of Birth</div>
// 										<div>
// 											{user.profile.birthday &&
// 												user.profile.birthday.split("T")[0]}
// 										</div>
// 									</div>

// 									<div className="profile-field">
// 										<div className="profile-title">About me </div>
// 										<div>{user.profile.bio}</div>
// 									</div>

// 									<div className="profile-field">
// 										<div className="profile-title">Address</div>
// 										{user.address.street1}, {user.address.street2},{" "}
// 										{user.address.city}, {user.address.country},{" "}
// 										{user.address.zip}
// 									</div>
// 									<div className="profile-page-edit">
// 										<button onClick={() => setEditMode(true)}>Edit</button>
// 									</div>
// 								</div>
// 							</div>
// 						</>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default UserProfile;
