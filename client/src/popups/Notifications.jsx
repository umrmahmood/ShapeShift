import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// CSS import
import "./PopMenu.css"; // Import the CSS file for styling

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

const Notifications = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isNavbarSmall, setIsNavbarSmall] = useState(false);

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
      <div ref={popupRef} className={`custom-popup-content ${isOpen ? "open" : ""}`}
      style={{ top: isNavbarSmall ? "70px" : "120px" }}>
        {/* Content for the profile popup */}
        <h2 className="popup-title">Notifications</h2>
        <ul>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
            <div className="text-wrapper">View Notifications</div>
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
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="text-wrapper">Messages</div>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div className="text-wrapper">Settings</div>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            <div className="text-wrapper">Sign Out</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notifications;
