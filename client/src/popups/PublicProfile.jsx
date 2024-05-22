import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationCrosshairs,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import "./PublicProfile.css"; // Import the CSS file for styling

const PublicProfile = ({ isOpen, onClose, userId }) => {
  const popupRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(`/api/users/profile/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, [userId]);

  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen || !user) return null; // Don't render if isOpen is false or user is not loaded

  // PublicProfile.jsx

  // Inside the return statement:

  return (
    <div className="public-profile-overlay">
      <div className="public-profile-content" ref={popupRef}>
        <div className="public-profile-image-container">
          <ul>
            <li>
              <img
                className="profile-picture"
                src={user.profile.avatarUrl}
                alt="User's avatar"
              />
            </li>
            <li>
              <h2>{user.profile.username}</h2>
            </li>
            <li>
              <div className="date-text">
                Member since: {user.createdAt.split("T")[0].replace(/-/g, ".")}
              </div>
            </li>
          </ul>
        </div>
        <div className="public-profile-info-container">
          <ul>
            <li>
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="text-wrapper">{user.email}</div>
            </li>
            <li>
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faLocationCrosshairs} />
              </div>
              <div className="text-wrapper">{user.address.city}</div>
            </li>
            <li></li>
            <li></li>
            <li></li>

            <li>
              <div className="star-rating">
                {[...Array(user.profile.starRating)].map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

PublicProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired, // Assuming userId is a string
};

export default PublicProfile;
