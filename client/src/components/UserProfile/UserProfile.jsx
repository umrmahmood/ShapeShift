// import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// import "../../styling/userProfile.css";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const UserProfile = () => {
// 	const [user, setUser] = useState("");

//     useEffect(() => {
//         const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

//         if (tokenFromLocalStorage) {
//           const decodedToken = jwtDecode(tokenFromLocalStorage);

//           // Access the payload to see if the member has a shop
//           const userId = decodedToken.id;

//           axios
//             .get(`/api/users/profile/${userId}`)
//             .then((response) => {
//               setUser(response.data.user);
//             })

//             .catch((error) => {
//               console.error("Error fetching user information:", error);
//             });
//         } else {
//           console.log("Token not found in localStorage");
//         }
//       }, []);
//       console.log(user)

// 	return (
//         <>
//       <div className="pagemargin">
//       {user && (
//           <>
//           <div className="popup-avatar-container">
//               <img
//                 className="popup-avatar"
//                 src={user.profile.avatarUrl}
//                 alt="users avatar"
//               />
//             </div>
//             <h2>Welcome, {user.profile.username}!</h2>
//             <div>{user.email}</div>

//             <div>Role: {user.membership.role}</div>
//             <div>Joined:{user.createdAt}</div>
//           </>
//         )}
//         </div>
//         </>
// 	);
// };

// export default UserProfile;

//************** */

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
    username: "",
    firstName: "",
    lastName: "",
    birthday: "",
    pronouns: "",
    bio: "",
    // address: {
    //   street1: "",
    //   street2: "",
    //   city: "",
    //   country: "",
    //   zip: "",
    // },
    address:"",
  });

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
          username: userData.profile.username,
          firstName: userData.profile.firstName,
          lastName: userData.profile.lastName,
          birthday: userData.profile.birthday,
          pronouns: userData.profile.pronouns,
          bio: userData.profile.bio,
          // address: {
          //   street1: userData.address.street1,
          //   street2: userData.address.street2,
          //   city: userData.address.city,
          //   country: userData.address.country,
          //   zip: userData.address.zip,
          // },
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: value,
  //     profile: {
  //       ...prevFormData.profile,
  //       username: name === 'username' ? value : prevFormData.profile.username,

  //     }
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await axios.put(
        `/api/users/profile/${user._id}`,
        formData
      );
      setUser(updatedUser.data.user);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // const handlePasswordChange = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedUser = await axios.put(
  //       `/api/users/profile/${user._id}/password`,
  //       {
  //         password: formData.password,
  //         newPassword: formData.newPassword,
  //         confirmPassword: formData.confirmPassword,
  //       }
  //     );
  //     setUser(updatedUser.data.user);
  //     setEditMode(false);
  //   } catch (error) {
  //     console.error("Error updating password:", error);
  //   }
  // };
  console.log('The user is:', user)

  return (
    <div className="pagemargin">
      {user && (
        <>
          <div className="popup-avatar-container">
            <img
              className="popup-avatar"
              src={user.profile.avatarUrl}
              alt="users avatar"
            />
          </div>
          <h2>Welcome, {user.profile.username}!</h2>
          {editMode ? (
  <form onSubmit={handleSubmit}>
    <label>Email:</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
    <label>Username:</label>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />
    <label>First Name:</label>
    <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
    />
    <label>Last Name:</label>
    <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
    />
    <label>Birthday:</label>
    <input
      type="date"
      name="birthday"
      value={formData.birthday}
      onChange={handleChange}
    />
    <label>Pronouns:</label>
    <select
      name="pronouns"
      value={formData.pronouns}
      onChange={handleChange}
    >
      <option value="he/him/his">He/Him/His</option>
      <option value="she/her/hers">She/Her/Hers</option>
      <option value="they/them/theirs">They/Them/Theirs</option>
    </select>
    <label>Bio:</label>
    <textarea
      name="bio"
      value={formData.bio}
      onChange={handleChange}
    ></textarea>
    {/* <label>Street 1:</label>
    <input
      type="text"
      name="street1"
      value={formData.address.street1}
      onChange={handleChange}
    />
    <label>Street 2:</label>
    <input
      type="text"
      name="street2"
      value={formData.address.street2}
      onChange={handleChange}
    />
    <label>City:</label>
    <input
      type="text"
      name="city"
      value={formData.address.city}
      onChange={handleChange}
    />
    <label>Country:</label>
    <input
      type="text"
      name="country"
      value={formData.address.country}
      onChange={handleChange}
    />
    <label>Zip:</label>
    <input
      type="text"
      name="zip"
      value={formData.address.zip}
      onChange={handleChange}
    /> */}
    <button type="submit">Save</button>
  </form>
) : (
  <>
    <div>Email: {user.email}</div>
    <div>Username: {user.profile.username}</div>
    <div>First Name: {user.profile.firstName}</div>
    <div>Last Name: {user.profile.lastName}</div>
    <div>Birthday: {user.profile.birthday}</div>
    <div>Pronouns: {user.profile.pronouns}</div>
    <div>Bio: {user.profile.bio}</div>
    {/* <div>Address: {user.address}</div> */}
    {/* <div>Address: {user.address.street1}, {user.address.street2}, {user.address.city}, {user.address.country}, {user.address.zip}</div> */}
    <button onClick={() => setEditMode(true)}>Edit</button>
  </>
)}

          {/* Password change form */}
          {/* <form onSubmit={handlePasswordChange}>
            <label>Current Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button type="submit">Change Password</button>
          </form> */}
        </>
      )}
    </div>
  );
};

export default UserProfile;

// import { useState, useEffect } from "react";
// import "../../styling/userProfile.css";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const UserProfile = () => {
// 	const [user, setUser] = useState("");
// 	const [editMode, setEditMode] = useState(false);
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		username: "",
// 	});

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
// 						username: userData.profile.username,
// 					});
// 				})
// 				.catch((error) => {
// 					console.error("Error fetching user information:", error);
// 				});
// 		} else {
// 			console.log("Token not found in localStorage");
// 		}
// 	}, []);

// 	// const handleChange = (e) => {
// 	//   setFormData({ ...formData, [e.target.name]: e.target.value });
// 	// };

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prevFormData) => ({
// 			...prevFormData,
// 			[name]: value,
// 			profile: {
// 				...prevFormData.profile,
// 				username: name === "username" ? value : prevFormData.profile.username,
// 			},
// 		}));
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const updatedUser = await axios.put(
// 				`/api/users/profile/${user._id}`,
// 				formData
// 			);
// 			setUser(updatedUser.data.user);
// 			setEditMode(false);
// 		} catch (error) {
// 			console.error("Error updating user profile:", error);
// 		}
// 	};

// 	console.log("The user is:", user);

// 	return (
// 		<div className="pagemargin">
// 			{user && (
// 				<>
// 					<div className="popup-avatar-container">
// 						<img
// 							className="popup-avatar"
// 							src={user.profile.avatarUrl}
// 							alt="users avatar"
// 						/>
// 					</div>
// 					<h2>Welcome, {user.profile.username}!</h2>
// 					{editMode ? (
// 						<form onSubmit={handleSubmit}>
// 							<label>Email:</label>
// 							<input
// 								type="email"
// 								name="email"
// 								value={formData.email}
// 								onChange={handleChange}
// 							/>
// 							<label>Username:</label>
// 							<input
// 								type="text"
// 								name="username"
// 								value={formData.username}
// 								onChange={handleChange}
// 							/>

// 							<button type="submit">Save</button>
// 						</form>
// 					) : (
// 						<>
// 							<div>Email: {user.email}</div>
// 							<div>Username: {user.profile.username}</div>

// 							<button onClick={() => setEditMode(true)}>Edit</button>
// 						</>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default UserProfile;




// import { useState, useEffect } from "react";
// import "../../styling/userProfile.css";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const UserProfile = () => {
//   const [user, setUser] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     username: "",
//   });
//   const [avatarFile, setAvatarFile] = useState(null); // State to store avatar image file

//   useEffect(() => {
//     const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

//     if (tokenFromLocalStorage) {
//       const decodedToken = jwtDecode(tokenFromLocalStorage);
//       const userId = decodedToken.id;

//       axios
//         .get(`/api/users/profile/${userId}`)
//         .then((response) => {
//           const userData = response.data.user;
//           setUser(userData);
//           setFormData({
//             email: userData.email,
//             username: userData.profile.username,
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching user information:", error);
//         });
//     } else {
//       console.log("Token not found in localStorage");
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//       profile: {
//         ...prevFormData.profile,
//         username:
//           name === "username" ? value : prevFormData.profile.username,
//       },
//     }));
//   };

//   const handleAvatarChange = (e) => {
//     setAvatarFile(e.target.files[0]); // Store the selected file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (avatarFile) {
//         // If a new avatar file is selected
//         const formData = new FormData();
//         formData.append("avatar", avatarFile);

//         // Upload avatar file
//         const uploadResponse = await axios.put(
//           `/api/users/profile/${user._id}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         // Update user's avatar URL with the response from the server
//         setUser((prevUser) => ({
//           ...prevUser,
//           profile: {
//             ...prevUser.profile,
//             avatarUrl: uploadResponse.data.avatarUrl,
//           },
//         }));
//       }

//       // Update user's profile information
//       const updatedUser = await axios.put(
//         `/api/users/profile/${user._id}`,
//         formData
//       );
//       setUser(updatedUser.data.user);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//     }
//   };

//   console.log("The user is:", user);

//   return (
//     <div className="pagemargin">
//       {user && (
//         <>
//           <div className="popup-avatar-container">
//             <img
//               className="popup-avatar"
//               src={user.profile.avatarUrl}
//               alt="users avatar"
//             />
//             <label>Upload:
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarChange}
//             />
//             </label>
//           </div>
//           <h2>Welcome, {user.profile.username}!</h2>
//           {editMode ? (
//             <form onSubmit={handleSubmit}>
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <label>Username:</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />

//               <button type="submit">Save</button>
//             </form>
//           ) : (
//             <>
//               <div>Email: {user.email}</div>
//               <div>Username: {user.profile.username}</div>

//               <button onClick={() => setEditMode(true)}>Edit</button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
