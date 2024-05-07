// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingBag, faEarth, faShop } from "@fortawesome/free-solid-svg-icons";
// import {
//   faUser,
//   faBell,
//   // faSearch,
// } from "@fortawesome/free-regular-svg-icons";

// import { useNavigate } from "react-router-dom";
// import logo from "../assets/SSlogo.png";
// import "../styling/navbar.css";

// const Navbar = ({ onLoginClick }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

//   useEffect(() => {
//     const token = localStorage.getItem("shapeshiftkey");
//     setIsLoggedIn(!!token);
//   }, [tokenFromLocalStorage]);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleShoppingBagClick = () => {
//     navigate("/cart");
//   };

//   return (
//     <>
//       <div className="Navbar-container">
//         <div className="nav-logo">
//           <a href="/">
//             <img src={logo} alt="logo" />
//           </a>
//         </div>
//         <div className="nav-search">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchInputChange}
//             placeholder="Search for anything"
//           />
//         </div>

//         <div className="nav-icons">
//           <li className="navbar-login-btn">
//             <button onClick={onLoginClick}>{isLoggedIn ? "Sell" : "Login"}</button>
//           </li>

//           <li>
//             <a href="/">
//               <FontAwesomeIcon icon={faEarth} />
//             </a>
//           </li>

//           {isLoggedIn && (
//             <>
//               <li>
//                 <a href="/">
//                   <FontAwesomeIcon icon={faBell} />
//                 </a>
//               </li>
//               <li>
//                 <a href="/">
//                   <FontAwesomeIcon icon={faUser} />
//                 </a>
//               </li>
// 			  <li>
//                 <a href="/">
//                   <FontAwesomeIcon icon={faShop} />
//                 </a>
//               </li>
//             </>

//           )}

//           <li className="shoppingbag" onClick={handleShoppingBagClick}>
//             <FontAwesomeIcon icon={faShoppingBag} />
//           </li>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
// import jwt_decode from 'jwt-decode';
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
// 	faShoppingBag,
// 	faEarth,
// 	faShop,
// } from "@fortawesome/free-solid-svg-icons";
// import {
// 	faUser,
// 	faBell,
// 	// faSearch,
// } from "@fortawesome/free-regular-svg-icons";

// import { useNavigate } from "react-router-dom";
// import logo from "../assets/SSlogo.png";
// import "../styling/navbar.css";

// const Navbar = ({ onLoginClick }) => {
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [isLoggedIn, setIsLoggedIn] = useState(false);
// 	const navigate = useNavigate();

// 	const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");
//   if (tokenFromLocalStorage) {
//     // Decode the token
//     const decodedToken = jwt_decode(tokenFromLocalStorage);

//     // Access the payload
//     const payload = decodedToken.payload;

//     // You can now access the data in the payload
//     console.log(payload);
// } else {
//     console.log('Token not found in localStorage');
// }

// 	useEffect(() => {
// 		const token = localStorage.getItem("shapeshiftkey");
// 		setIsLoggedIn(!!token);
// 	}, [tokenFromLocalStorage]);

// 	const handleSearchInputChange = (event) => {
// 		setSearchQuery(event.target.value);
// 	};

// 	const handleShoppingBagClick = () => {
// 		navigate("/cart");
// 	};

//   const onSellClick = () =>{
//     navigate("/product-form")
//   }

// 	return (
// 		<>
// 			<div className="Navbar-container">
// 				<div className="nav-logo">
// 					<a href="/">
// 						<img src={logo} alt="logo" />
// 					</a>
// 				</div>
// 				<div className="nav-search">
// 					<input
// 						type="text"
// 						value={searchQuery}
// 						onChange={handleSearchInputChange}
// 						placeholder="Search for anything"
// 					/>
// 				</div>

// 				<div className="nav-icons">
// 					<li className="navbar-login-btn">
// 						<button
// 							onClick={onLoginClick}
// 							style={{ border: isLoggedIn ? "none" : "1px solid black" }}
// 						>
// 							{isLoggedIn ? "" : "Login"}
// 						</button>
// 					</li>

// 					{isLoggedIn && (
// 						<>
// 							<li className="navbar-login-btn">
// 								<button onClick={onSellClick}>Sell</button>
// 							</li>
// 							<li>
// 								<a href="/">
// 									<FontAwesomeIcon icon={faBell} />
// 								</a>
// 							</li>
// 							<li>
// 								<a href="/">
// 									<FontAwesomeIcon icon={faUser} />
// 								</a>
// 							</li>
// 							<li>
// 								<a href="/">
// 									<FontAwesomeIcon icon={faShop} />
// 								</a>
// 							</li>
// 						</>
// 					)}

// 					<li className="shoppingbag" onClick={handleShoppingBagClick}>
// 						<FontAwesomeIcon icon={faShoppingBag} />
// 					</li>
// 					<li>
// 						<a href="/">
// 							<FontAwesomeIcon icon={faEarth} />
// 						</a>
// 					</li>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Navbar;

import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faShoppingBag,
	faEarth,
	faShop,
} from "@fortawesome/free-solid-svg-icons";
import {
	faUser,
	faBell,
	// faSearch,
} from "@fortawesome/free-regular-svg-icons";

import { useNavigate } from "react-router-dom";
import logo from "../assets/SSlogo.png";
import "../styling/navbar.css";

const Navbar = ({ onLoginClick }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");

	let haveShop = false;

	if (tokenFromLocalStorage) {
		const decodedToken = jwtDecode(tokenFromLocalStorage);

		// Access the payload to see if the member has a shop
		haveShop = decodedToken.membership.haveShop;
	} else {
		console.log("Token not found in localStorage");
	}

	const onSellClick = () => {
		if (haveShop) {
			navigate("/product-form");
		} else {
			navigate("/openshop");
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("shapeshiftkey");
		setIsLoggedIn(!!token);
	}, [tokenFromLocalStorage]);

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleShoppingBagClick = () => {
		navigate("/cart");
	};

	return (
		<>
			<div className="Navbar-container">
				<div className="nav-logo">
					<a href="/">
						<img src={logo} alt="logo" />
					</a>
				</div>
				<div className="nav-search">
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchInputChange}
						placeholder="Search for anything"
					/>
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
							<div className="navbar-login-btn nav-sell-btn">
								<button onClick={onSellClick}>Sell</button>
							</div>
							<li>
								<a href="/">
									<FontAwesomeIcon icon={faBell} />
								</a>
							</li>
							<li>
								<a href="/">
									<FontAwesomeIcon icon={faUser} />
								</a>
							</li>
							{haveShop ? (
								<li>
									<a href="/">
										<FontAwesomeIcon icon={faShop} />
									</a>
								</li>
							) : (
								""
							)}
							</div>
						</>
					)}

					<li className="shoppingbag" onClick={handleShoppingBagClick}>
						<FontAwesomeIcon icon={faShoppingBag} />
					</li>
					<li>
						<a href="/">
							<FontAwesomeIcon icon={faEarth} />
						</a>
					</li>
				</div>
			</div>
		</>
	);
};

export default Navbar;
