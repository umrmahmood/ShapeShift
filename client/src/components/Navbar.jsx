import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Added cart icon

import logo from "../assets/SSlogo.png";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
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
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faShoppingCart} /> {/* Cart icon */}
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </a>
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
