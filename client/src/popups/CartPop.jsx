import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CartStyle.css";
import useShoppingCart from "../hooks/useShoppingCart";
import emptyCart from "../../src/assets/emptyCart.png";

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
          <div className="popup-empty-cart">
            <div>
              {" "}
              <img src={emptyCart} alt="emptyCart" />
            </div>
            <div className="empty-cart-message">Your cart is empty</div>
            <p className="popup-empty-cart-para">
              Check out our{" "}
              <Link
                className={"empty-cart-para-link"}
                to="/home"
                onClick={onClose}
              >
                market place
              </Link>
            </p>
          </div>
        ) : (
          <>
            <h3 className="popup-items-in-cart">Items in Cart</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li className="popup-cart-items-list" key={index}>
                  <div>{item.quantity}</div>
                  <span className="fixed-width">
                    {item.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <span>
                    {item.price.toFixed(2)} {item.currency}
                  </span>
                  <div className="popup-cart-trash">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </li>
              ))}
              <li>
                <Link
                  className="popup-checkout-cart-btn"
                  to="/cart"
                  onClick={(e) => {
                    onClose();
                  }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} /> View cart and
                  check out
                </Link>
              </li>
            </ul>
          </>
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
