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

const ShoppingCart = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

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
        <ul>
          <li>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
            <div className="text-wrapper">View Profile</div>
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
            <Link
              className="text-wrapper"
              to="/cart"
              onClick={(e) => {
                onClose();
              }}
            >
              Check Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShoppingCart;
