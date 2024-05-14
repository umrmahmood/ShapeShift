// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import "./UserShop.css";
// import placeholder from "./placeholder.jpg";

// const UserShop = async () => {
//   const [name, setName] = useState(true);

//   const token = localStorage.getItem("shapeshiftkey");
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const shopId = decodedToken?.membership?.shopId;
//             console.log(shopId);
//             if (shopId) {
//                 try {
//                     const response = await axios.get(`http://localhost:5001/api/shop/${shopId}`, {
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},

// 					});
//                     console.log(response);
//                     setName(response.data.shop.name)
//                     console.log('The name is', name);
//                 } catch (error) {
//                     console.error('Error fetching shop data:', error);
//                 }
//             }
//         }

//   return (
//     <div className="shop-container">
//     <div className="banner-container">
//         <img  src={placeholder} alt="Banner"/>
//         </div>
//         <div className="shop-info-container">
//         <div className="user-shop">
//           <div className="shop-image">
//             <img  src={placeholder} alt="Shop"  />
//           </div>
//           <div className="shop-details">
//             <h3>Shop Name</h3>
//             <p>Owner: Owner Name</p>
//             <p>Raitings</p>
//           </div>
//         </div>
//         <div className="owner-shop">
//           <div className="shop-image">
//             <img  src={placeholder} alt="Owner"  />
//           </div>
//           <div className="shop-details">
//             <h3>Owner Shop Name</h3>
//             <p>Owner: Owner Name</p>
//           </div>
//         </div>
//       </div>
//        <div className="additional-info">
//         <h2>Additional Information</h2>
//         <ul>
//           <li>Delivery</li>
//           <li>Finance</li>
//           <li>Orders & Shipping</li>
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default UserShop;

// //Following works good without setting component
// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import "./UserShop.css";
// import placeholder from "./placeholder.jpg";
// import UserShopSettings from "./UserShopSettings";

// const UserShop = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [ownerId, setOwnerId] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail]  = useState('');
//   const [shopRegDate, setShopRegDate]  = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("shapeshiftkey");
//       if (token) {
//         const decodedToken = jwtDecode(token);
//         const shopId = decodedToken?.membership?.shopId;
//         console.log(shopId);
//         if (shopId) {
//           try {
//             const response = await axios.get(`http://localhost:5001/api/shop/${shopId}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             console.log(response);
//             setName(response.data.shop.name);
//             setDescription(response.data.shop.description)
//             setLocation(response.data.shop.location)
//             setOwnerId(response.data.shop.owner)

//           } catch (error) {
//             console.error('Error fetching shop data:', error);
//           }
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("shapeshiftkey");
//       if (token) {
//           try {
//             const response = await axios.get(`http://localhost:5001/api/users/profile/${ownerId}`, {

//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             console.log('the user side response is', response);
//             setUserName(response.data.user.profile.username);
//             setUserEmail(response.data.user.email);
//             const registeredDate = response.data.user.membership.registerDate;
//             const redDateFormated = registeredDate.split('T')[0];
//             setShopRegDate(redDateFormated);

//           } catch (error) {
//             console.error('Error fetching user data:', error);
//           }

//       }
//     };

//     fetchData();
//   }, [ownerId]);

//   return (
//     <div className="shop-container">
//       <div className="banner-container">
//         <img src={placeholder} alt="Banner"/>
//       </div>
//       <div className="shop-info-container">
//         <div className="user-shop">
//           <div className="shop-image">
//             <img src={placeholder} alt="Shop"  />
//           </div>
//           <div className="shop-details">
//             <h3>{name}</h3>
//             <p>Description: {description}</p>
//             <p>Location: {location}</p>
//           </div>
//         </div>
//         <div className="owner-shop">
//           <div className="shop-image">
//             <img src={placeholder} alt="Owner"  />
//           </div>
//           <div className="shop-details">
//             <h3>Owner: {userName}</h3>
//             <p>Email: {userEmail}</p>
//             <p>Registerd Since: {shopRegDate}</p>
//           </div>
//         </div>
//       </div>
//       <div className="additional-info">
//         <h2>Additional Information</h2>
//         <ul>
//           <li>Delivery</li>
//           <li>Finance</li>
//           <li>Orders & Shipping</li>
//           <li>Settings</li>
//         </ul>
//       </div>
//       <UserShopSettings shopId={shopId}/>
//     </div>
//   );
// };

// export default UserShop;
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import "./UserShop.css";
// import usericon from "../assets/usericon.png";
// import UserShopSettings from "./UserShopSettings";

// const UserShop = () => {
// 	const [name, setName] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [location, setLocation] = useState("");
// 	const [ownerId, setOwnerId] = useState("");
// 	const [userName, setUserName] = useState("");
// 	const [userEmail, setUserEmail] = useState("");
// 	const [shopRegDate, setShopRegDate] = useState("");
// 	const [shopId, setShopId] = useState(null);
// 	const [shopAvatar, setShopAvatar] = useState("");
// 	const [shopBanner, setShopBanner] = useState("");

// 	//getting shop info
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			const token = localStorage.getItem("shapeshiftkey");
// 			if (token) {
// 				const decodedToken = jwtDecode(token);
// 				const shopIdFromToken = decodedToken?.membership?.shopId;
// 				console.log("The shop id is:", shopIdFromToken);
// 				if (shopIdFromToken) {
// 					try {
// 						const response = await axios.get(
// 							`http://localhost:5001/api/shop/${shopIdFromToken}`,
// 							{
// 								headers: {
// 									Authorization: `Bearer ${token}`,
// 								},
// 							}
// 						);
// 						console.log(response);
// 						setName(response.data.shop.name);
// 						setDescription(response.data.shop.description);
// 						setLocation(response.data.shop.location);
// 						setOwnerId(response.data.shop.owner);
// 						setShopId(shopIdFromToken);
// 					} catch (error) {
// 						console.error("Error fetching shop data:", error);
// 					}
// 				}
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	//setting Avatar and Banner
// 	useEffect(() => {
// 		const fetchData = async (url) => {
// 			const token = localStorage.getItem("shapeshiftkey");
// 			if (token) {
// 				try {
// 					const response = await axios.get(url, {
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					});
// 					console.log("Data:", response);
// 					if (url.includes("avatar")) {
// 						setShopAvatar(response.data.url);
// 					}
// 					if (url.includes("banner")) {
// 						setShopBanner(response.data.url);
// 					}
// 				} catch (error) {
// 					console.error("Error fetching data:", error);
// 				}
// 			}
// 		};

// 		fetchData(`http://localhost:5001/api/images/shop/avatar/${shopId}`);
// 		fetchData(`http://localhost:5001/api/images/shop/banner/${shopId}`);
// 	}, [shopId]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			const token = localStorage.getItem("shapeshiftkey");
// 			if (token) {
// 				try {
// 					const response = await axios.get(
// 						`http://localhost:5001/api/users/profile/${ownerId}`,
// 						{
// 							headers: {
// 								Authorization: `Bearer ${token}`,
// 							},
// 						}
// 					);
// 					console.log("the user side response is", response);
// 					setUserName(response.data.user.profile.username);
// 					setUserEmail(response.data.user.email);
// 					const registeredDate = response.data.user.membership.registerDate;
// 					const regDateFormated = registeredDate.split("T")[0];
// 					setShopRegDate(regDateFormated);
// 				} catch (error) {
// 					console.error("Error fetching user data:", error);
// 				}
// 			}
// 		};

// 		fetchData();
// 	}, [ownerId]);

// 	return (
// 		<div className="user-shop-container">
// 			<div className="user-shop-banner-container">
// 				<img src={shopBanner} alt="shopBanner" />
// 			</div>
// 			<div className="shop-info-container">
// 				<div className="user-shop-image-container">
// 					<div className="shop-image">
// 						<img src={shopAvatar} alt="ShopAvatar" />
// 					</div>
// 					<div className="shop-details">
// 						<h3>{name}</h3>
// 						<p>
// 							{description} <br />
// 							<span className="user-shop-location">
// 								<FontAwesomeIcon icon={faLocationDot} />{" "}
// 							</span>
// 							{location}
// 						</p>
// 					</div>
// 				</div>
// 				<div className="owner-shop">
// 					<div className="shop-image-owner">
// 						<img src={usericon} alt="Owner" />
// 					</div>
// 					<div className="shop-detail-owner">
// 						<h3>{userName}</h3>
// 						<p>
// 							<span className="user-shop-envelope">
// 								<FontAwesomeIcon icon={faEnvelope} />{" "}
// 							</span>
// 							{userEmail} <br />
// 							Registerd since: {shopRegDate}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="user-shop-additional-info">
// 				<h2>Additional Information</h2>

// 				<div className="shop-additional-info-section">
// 					<div>
// 						<ul>
// 							<li>Description</li>
// 							<li>Listings</li>
// 							<li>Orders & Shipping</li>
// 							<li>Settings</li>
// 						</ul>
// 					</div>
// 					<div>
// 						<UserShopSettings shopId={shopId} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default UserShop;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./UserShop.css";
import usericon from "../assets/usericon.png";
import UserShopSettings from "./UserShopSettings";
import ShopListing from "../components/ShopPage/ShopListing";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const UserShop = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [shopRegDate, setShopRegDate] = useState("");
  const [shopId, setShopId] = useState(null);
  const [shopAvatar, setShopAvatar] = useState("");
  const [shopBanner, setShopBanner] = useState("");
  const [selectedSection, setSelectedSection] = useState("Description");

  // component change dor popup buttons
  const navigate = useNavigate();
  const { search } = useLocation();
  const active = React.useMemo(() => new URLSearchParams(search), [search]).get(
    "active"
  );

  useEffect(() => {
    if (active) setSelectedSection(active);
    else setSelectedSection("Listings");
  }, [active]);

  //getting shop info
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        const decodedToken = jwtDecode(token);
        const shopIdFromToken = decodedToken?.membership?.shopId;
        console.log("The shop id is:", shopIdFromToken);
        if (shopIdFromToken) {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/shop/${shopIdFromToken}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response);
            setName(response.data.shop.name);
            setDescription(response.data.shop.description);
            setLocation(response.data.shop.location);
            setOwnerId(response.data.shop.owner);
            setShopId(shopIdFromToken);
          } catch (error) {
            console.error("Error fetching shop data:", error);
          }
        }
      }
    };

    fetchData();
  }, []);

  //setting Avatar and Banner
  useEffect(() => {
    const fetchData = async (url) => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Data:", response);
          if (url.includes("avatar")) {
            setShopAvatar(response.data.url);
          }
          if (url.includes("banner")) {
            setShopBanner(response.data.url);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData(`http://localhost:5001/api/images/shop/avatar/${shopId}`);
    fetchData(`http://localhost:5001/api/images/shop/banner/${shopId}`);
  }, [shopId]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/users/profile/${ownerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("the user side response is", response);
          setUserName(response.data.user.profile.username);
          setUserEmail(response.data.user.email);
          const registeredDate = response.data.user.membership.registerDate;
          const regDateFormated = registeredDate.split("T")[0];
          setShopRegDate(regDateFormated);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [ownerId]);

  const handleSectionClick = (section) => {
    // React.useMemo(() => new URLSearchParams(search), [search]).set(
    //   "active",
    //   section
    // );

    setSelectedSection(section);
    navigate("/user-shop?active=" + section);
  };

  return (
    <div className="user-shop-container">
      <div className="user-shop-banner-container">
        <img src={shopBanner} alt="shopBanner" />
      </div>
      <div className="shop-info-container">
        <div className="user-shop-image-container">
          <div className="shop-image">
            <img src={shopAvatar} alt="ShopAvatar" />
          </div>
          <div className="shop-details">
            <h3>{name}</h3>
            <p>
              <span className="user-shop-location">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
              </span>
              {location}
            </p>
          </div>
        </div>
        <div className="owner-shop">
          <div className="shop-image-owner">
            <img src={usericon} alt="Owner" />
          </div>
          <div className="shop-detail-owner">
            <h3>{userName}</h3>
            <p>
              <span className="user-shop-envelope">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
              </span>
              {userEmail} <br />
              Registerd since: {shopRegDate}
            </p>
          </div>
        </div>
      </div>
      <div className="user-shop-additional-info">
        <h2>Additional Information</h2>

        <div className="shop-additional-info-section">
          <div>
            <ul>
              <li onClick={() => handleSectionClick("Description")}>
                Description
              </li>
              <li onClick={() => handleSectionClick("Listings")}>Listings</li>
              <li onClick={() => handleSectionClick("Orders & Shipping")}>
                Orders & Shipping
              </li>
              <li onClick={() => handleSectionClick("Settings")}>Settings</li>
            </ul>
          </div>
          <div className="rendered-sects">
            {selectedSection === "Settings" && (
              <UserShopSettings shopId={shopId} />
            )}
            {selectedSection === "Description" && <p>{description}</p>}
            {selectedSection === "Orders & Shipping" && (
              <p>
                Order will be delivered within 24hrs after the confirmation.
              </p>
            )}
            {selectedSection === "Listings" && <ShopListing />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShop;
