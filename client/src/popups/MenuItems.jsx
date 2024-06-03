import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useNavigate, Link } from "react-router-dom";

// CSS import
import "./PopMenu.css";

const MenuItems = ({ isOpen, onClose }) => {
	const popupRef = useRef(null);
	const [isNavbarSmall, setIsNavbarSmall] = useState(false);
	const navigate = useNavigate();

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
				<ul className="profile-popup-ul">
					<li>
						<Link
							className="text-wrapper profile-links"
							to="/"
							onClick={(e) => {
								onClose();
							}}
						>
							Home
						</Link>
					</li>

					<li>
						<Link
							className="text-wrapper profile-links"
							to="/home"
							onClick={(e) => {
								onClose();
							}}
						>
							Market Place
						</Link>
					</li>
					<li>
						<Link
							className="text-wrapper profile-links"
							to="/digital"
							onClick={(e) => {
								onClose();
							}}
						>
							Digital Products
						</Link>
					</li>
					<li>
						<Link
							className="text-wrapper profile-links"
							to="/config"
							onClick={(e) => {
								onClose();
							}}
						>
							Post Inquiry
						</Link>
					</li>
                    <li>
						<Link
							className="text-wrapper profile-links"
							to="/"
							onClick={(e) => {
								onClose();
							}}
						>
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

MenuItems.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default MenuItems;
