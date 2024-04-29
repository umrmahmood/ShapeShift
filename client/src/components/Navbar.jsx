import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";


import logo from "../assets/SSlogo.png";

const Navbar = ({ onLoginClick }) => {
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
                        <a href="#">Sell</a>
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
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </li>
                    <li className='navbar-login-btn'>
                        <button onClick={onLoginClick}>Login</button>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Navbar;
