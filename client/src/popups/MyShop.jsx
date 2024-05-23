import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

// CSS import
import "./PopMenu.css"; // Import the CSS file for styling

// Font Awesome icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowUpRightFromSquare,
  faMoneyBillTransfer,
  faGear,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const MyShop = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [shop, setShop] = useState(null);
  const [isNavbarSmall, setIsNavbarSmall] = useState(false);

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
        <h2 className="popup-title">{shop.name}</h2>
        {/* Content for the profile popup */}
        <div className="popup-avatar-container">
          <img
            className="popup-avatar"
            src={shop.avatarUrl}
            alt="users avatar"
          />
        </div>

        <ul>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
            <Link
              className="text-wrapper profile-links"
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
              className="text-wrapper profile-links"
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
              className="text-wrapper profile-links"
              to="/user-shop?active=Orders"
              onClick={(e) => onClose()}
            >
              Orders
            </Link>
          </li>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <Link
              className="text-wrapper profile-links"
              to="/user-shop?active=UpdateShop"
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
