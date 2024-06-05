import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import MyProfile from "../popups/MyProfile.jsx";
import MyShop from "../popups/MyShop.jsx";
import ShoppingCart from "../popups/CartPop.jsx";
import MenuItems from "../popups/MenuItems.jsx";
import NotificationContext from "./NotificationContext.jsx";

import logo from "../assets/SSlogo.png";
import smallLogo from "../assets/SSlogo-small.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShop,
  faBars,
  faEnvelope,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "../styling/navbar.css";

const Navbar = ({ onLoginClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // New state for highlighted suggestion
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [isMyShopOpen, setIsMyShopOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(false);
  const [showEnvelopeIcon, setShowEnvelopeIcon] = useState(true);
  const { unreadMessages } = useContext(NotificationContext);
  const [isNavbarSmall, setIsNavbarSmall] = useState(false);

  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setIsScrolled(true);
      setIsNavbarSmall(true);
    } else {
      setIsScrolled(false);
      setIsNavbarSmall(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");
  let haveShop = false;

  if (tokenFromLocalStorage) {
    const decodedToken = jwtDecode(tokenFromLocalStorage);
    haveShop = decodedToken.membership.haveShop;
  }

  const onSellClick = () => {
    if (haveShop) {
      navigate("/product-form");
    } else {
      navigate("/openshop");
    }
  };

  const toggleMyProfile = () => {
    setIsMyProfileOpen((prev) => !prev);
    setShowEnvelopeIcon(false); // Hide the envelope icon when the profile icon is clicked
  };

  const toggleMenuItems = () => {
    setMenuItems((prev) => !prev);
  };

  const toggleMyShop = () => {
    setIsMyShopOpen((prev) => !prev);
  };

  const toggleShoppingCart = () => {
    setIsShoppingCartOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("shapeshiftkey");
    setIsLoggedIn(!!token);
  }, [tokenFromLocalStorage]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlightedIndex(-1); // Reset highlighted index when search query changes

    if (query.trim() !== "") {
      axios
        .get(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        handleSuggestionClick(searchResults[highlightedIndex]);
      } else if (searchQuery.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setSearchResults([]);
      }
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.name;
    setSearchQuery(""); // Clear the search input
    setSearchResults([]); // Clear the search results
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className={`Navbar-container ${isScrolled ? "small" : ""}`}>
        <div className="nav-logo">
          <a href="/">
            <img src={isScrolled ? smallLogo : logo} alt="Logo" />
          </a>
        </div>
        <div className="nav-search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress} // Use onKeyDown to capture arrow keys
            placeholder="Search..."
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div
                  key={result._id}
                  className={`search-result-item ${
                    index === highlightedIndex ? "highlighted" : ""
                  }`}
                  onClick={() => handleSuggestionClick(result)}
                >
                  {result.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="nav-icons">
          <li className="navbar-login-btn">
            <button
              onClick={onLoginClick}
              style={{ border: isLoggedIn ? "none" : "1px solid black" }}
            >
              {isLoggedIn ? "" : "Login"}
            </button>
          </li>

          {isLoggedIn && (
            <>
              <div className="navbar-conditional-icon">
                <div className="navbar-sell-btn nav-sell-btn">
                  <button onClick={onSellClick}>Sell</button>
                </div>
                <li>
                  <div
                    className="profile-icon icon-pointer"
                    onClick={toggleMyProfile}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    {unreadMessages && showEnvelopeIcon && (
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        className="unread-icon-navbar"
                        style={{ top: isNavbarSmall ? "35px" : "75px" }}
                      />
                    )}
                  </div>
                  <MyProfile
                    isOpen={isMyProfileOpen}
                    onClose={toggleMyProfile}
                  />
                </li>

                {haveShop && (
                  <li>
                    <div
                      className="shop-icon icon-pointer"
                      onClick={toggleMyShop}
                    >
                      <FontAwesomeIcon icon={faShop} />
                    </div>
                    <MyShop isOpen={isMyShopOpen} onClose={toggleMyShop} />
                  </li>
                )}
              </div>
            </>
          )}

          <li>
            <div
              className="shopping-icon icon-pointer"
              onClick={toggleShoppingCart}
            >
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
            <ShoppingCart
              isOpen={isShoppingCartOpen}
              onClose={toggleShoppingCart}
            />
          </li>
          <li>
            <div
              className="profile-icon icon-pointer"
              onClick={toggleMenuItems}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
            <MenuItems isOpen={menuItems} onClose={toggleMenuItems} />
          </li>
        </div>
      </div>
    </>
  );
};

export default Navbar;
