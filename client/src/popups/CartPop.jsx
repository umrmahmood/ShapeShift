import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./CartStyle.css";

const ShoppingCart = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [isNavbarSmall, setIsNavbarSmall] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage
  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("shoppingCartItems")
    );
    if (storedCartItems && Array.isArray(storedCartItems)) {
      setCartItems(storedCartItems);
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
      setIsNavbarSmall(window.scrollY > 100);
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
        {/* Content for the profile popup */}
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <span className="qty-wrapper">{item.quantity}</span>
              <span className="name-wrapper">
                {item.name.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="currency-wrapper">{item.currency}</span>
              <span className="price-wrapper">{item.price.toFixed(2)}</span>
            </li>
          ))}
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
