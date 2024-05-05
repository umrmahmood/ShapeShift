import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/SSlogo.png";

const Navbar = ({ onLoginClick }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate(); // Initialize useNavigate

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleShoppingBagClick = () => {
		navigate("/cart"); // Navigate to the cart component
	};

	return (
		<>
			<div className="Navbar-container">
				<div className="Logo">
					<a href="/">
						<img src={logo} alt="logo" />
					</a>
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

					<li className="shoppingbag" onClick={handleShoppingBagClick}>
						{" "}
						{/* Add onClick event */}
						<FontAwesomeIcon icon={faShoppingBag} />
					</li>
					<li>
						<a href="/">
							<FontAwesomeIcon icon={faUser} />
						</a>
					</li>
					<li className="navbar-login-btn">
						<button onClick={onLoginClick}>Login</button>
					</li>
				</div>
			</div>
		</>
	);
};

export default Navbar;
