import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CartStyle.css";
import useShoppingCart from "../hooks/useShoppingCart";

const ShoppingCart = ({ isOpen, onClose }) => {
  const { removeItem } = useShoppingCart();

  const popupRef = useRef(null);
  const [isNavbarSmall, setIsNavbarSmall] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from local storage whenever the popup opens
  useEffect(() => {
    if (isOpen) {
      const storedCartItems = JSON.parse(
        localStorage.getItem("shoppingCartItems")
      );
      if (storedCartItems && Array.isArray(storedCartItems)) {
        setCartItems(storedCartItems);
      } else {
        setCartItems([]);
      }
    }
  }, [isOpen]);

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

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    // Remove the item from localStorage
    removeItem(itemId);

    // Update cartItems state to remove the deleted item
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  if (!isOpen) return null; // Don't render if isOpen is false

  return (
    <div className="custom-popup-overlay">
      <div
        ref={popupRef}
        className={`custom-popup-content ${isOpen ? "open" : ""}`}
        style={{ top: isNavbarSmall ? "70px" : "120px" }}
      >
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">Cart is empty</div>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <span className="qty-wrapper">{item.quantity}</span>
                <span className="name-wrapper">
                  {item.name.split(" ").slice(0, 2).join(" ")}
                </span>
                <span className="currency-wrapper">{item.currency}</span>
                <span className="price-wrapper">{item.price.toFixed(2)}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleRemoveItem(item.id)}
                />
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
        )}
      </div>
    </div>
  );
};

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShoppingCart;
