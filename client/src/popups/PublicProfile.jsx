import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
  faLocationDot,
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
          	<ul className="public-profile-ul">
						<li>
							<img
								className="public-profile-picture"
								src={user.profile.avatarUrl}
								alt="User's avatar"
							/>
						</li>
						<li>
							<h2 className="public-profile-name">{user.profile.firstName} {user.profile.lastName} </h2>
						</li>
						<li>
							<div className="public-profile-date-text">
								Member since: {user.createdAt.split("T")[0].replace(/-/g, ".")}
							</div>
						</li>
					</ul>
				</div>
				<div className="public-profile-info-container">
					<ul className="public-profile-ul">
						<li className="public-profile-li">
							<div className="icon-wrapper">
								<FontAwesomeIcon icon={faEnvelope} />
							</div>
							<div className="public-profile-text-wrapper ">{user.email}</div>
						</li>
						<li className="public-profile-li">
							<div className="icon-wrapper">
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className="public-profile-text-wrapper ">{user.address.city}</div>
						</li>

						<li className="public-profile-li">
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
