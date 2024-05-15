import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styling/userProfile.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
	const [user, setUser] = useState("");

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");
    
        if (tokenFromLocalStorage) {
          const decodedToken = jwtDecode(tokenFromLocalStorage);
    
          // Access the payload to see if the member has a shop
          const userId = decodedToken.id;
    
          axios
            .get(`/api/users/profile/${userId}`)
            .then((response) => {
              setUser(response.data.user);
            })
           
            .catch((error) => {
              console.error("Error fetching user information:", error);
            });
        } else {
          console.log("Token not found in localStorage");
        }
      }, []);
      console.log(user)

	return (
        <>
      
      {user && (
          <>
            <div>{user.email}</div>
            <div className="popup-avatar-container">
              <img
                className="popup-avatar"
                src={user.profile.avatarUrl}
                alt="users avatar"
              />
            </div>
            <div>Welcome, {user.profile.username}!</div>
            <div>{user.membership.role}</div>
            <div>Joined:{user.createdAt}</div>
          </>
        )}
        </>
	);
};

export default UserProfile;
