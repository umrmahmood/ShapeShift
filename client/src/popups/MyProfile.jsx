import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NotificationContext from "../components/NotificationContext.jsx";

// CSS import
import "./PopMenu.css";

// Font Awesome icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowUpRightFromSquare,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const MyProfile = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isNavbarSmall, setIsNavbarSmall] = useState(false);
  const { unreadMessages, markMessagesAsRead } =
    useContext(NotificationContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("shapeshiftkey");
    navigate("/");
  };

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

  // Track scroll position to adjust navbar and popup position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavbarSmall(true);
      } else {
        setIsNavbarSmall(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isOpen) return null; // Don't render if isOpen is false

  return (
    <div className="custom-popup-overlay">
      <div
        ref={popupRef}
        className={`custom-popup-content ${isOpen ? "open" : ""}`}
        style={{ top: isNavbarSmall ? "70px" : "120px" }}
      >
        {user && (
          <>
            <p className="profile-popup-username">{user.email}</p>
            <div className="popup-avatar-container">
              <img
                className="popup-avatar"
                src={user.profile.avatarUrl}
                alt="users avatar"
              />
            </div>
            <h2 className="popup-title">Welcome, {user.profile.username}!</h2>
          </>
        )}

        <ul className="profile-popup-ul">
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
            <Link
              className="text-wrapper profile-links"
              to="/myprofile"
              onClick={(e) => {
                onClose();
              }}
            >
              View Profile
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="text-wrapper">Favorites</div>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
            </div>
            <div className="text-wrapper">Purchases</div>
          </li>
          <li>
            <div className="icon-wrapper">
              {unreadMessages > 0 ? (
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="unread-icon-profile"
                />
              ) : (
                <FontAwesomeIcon icon={faEnvelope} />
              )}{" "}
            </div>
            <Link
              className="text-wrapper profile-links"
              to="/messages"
              onClick={(e) => {
                onClose();
              }}
            >
              Messages
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <Link
              className="text-wrapper profile-links"
              to="/myprofile"
              onClick={(e) => {
                onClose();
              }}
            >
              Settings
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            <Link
              className="text-wrapper profile-links"
              to="/"
              onClick={(e) => {
                handleLogout();
                onClose();
              }}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

MyProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MyProfile;
