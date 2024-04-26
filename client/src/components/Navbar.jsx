import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import logo from "../assets/SSlogo.png";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleShoppingBagClick = () => {
        navigate('/cart');  // Navigate to the cart component
    };

    return (
        <>
            <div className="Navbar-container">
                <div className="Logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul className="Navbar">
                    <li>
                        <a href="#">HOME</a>
                    </li>
                    <li>
                        <a href="#">ABOUT US</a>
                    </li>
                    <li>
                        <a href="#">CONTACT US</a>
                    </li>
                    <li>
                        <a href="#">MENU</a>
                    </li>
                </ul>
                <div className="nav-icons">
                    <li>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search"
                        />
                    </li>
                    
                    <li className="shoppingbag" onClick={handleShoppingBagClick}>  {/* Add onClick event */}
                        < FontAwesomeIcon icon={faShoppingBag} />
                    </li>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Navbar;
