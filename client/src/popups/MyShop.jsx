import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

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

const MyShop = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode(tokenFromLocalStorage);

      // Access the payload to see if the member has a shop
      const shopId = decodedToken.shopId;

      axios
        .get(`/api/shop/${shopId}`)
        .then((response) => {
          setShop(response.data.shop);
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

  if (!isOpen) return null; // Don't render if isOpen is false

  return (
    <div className="custom-popup-overlay">
      <div ref={popupRef} className="custom-popup-content">
        <button className="custom-popup-close-btn" onClick={onClose}>
          &times;
        </button>
        {/* Content for the profile popup */}
        <div className="popup-avatar-container">
          <img
            className="popup-avatar"
            src={shop.avatarUrl}
            alt="users avatar"
          />
        </div>
        <h2>{shop.name}</h2>
        <ul>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
            <Link
              className="text-wrapper"
              to="/user-shop"
              onClick={(e) => onClose()}
            >
              View Shop
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <Link
              className="text-wrapper"
              to="/user-shop?active=Listings"
              onClick={(e) => onClose()}
            >
              Listings
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
            </div>
            <Link
              className="text-wrapper"
              to="/user-shop?active=Orders"
              onClick={(e) => onClose()}
            >
              Orders
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <Link className="text-wrapper" to="/" onClick={(e) => onClose()}>
              Messages
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <Link
              className="text-wrapper"
              to="/user-shop?active=Settings"
              onClick={(e) => onClose()}
            >
              Settings
            </Link>
            {/* <div className="text-wrapper">Settings</div> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

MyShop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MyShop;
