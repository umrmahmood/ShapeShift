import React, { useState, useEffect } from "react";
import "../../CardComponent/Item.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SendMessagePop from "../../popups/SendMessagePop.jsx";
import placeholder from "../../CardComponent/placeholder.jpg";
import { StlViewer } from "react-stl-viewer";
import PublicProfile from "../../popups/PublicProfile.jsx";

const DigitalItemPage = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);
  const [user, setUser] = useState(null);
  const [showOwnerProfile, setShowOwnerProfile] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/digitals/${productId}`
        );
        if (response.data) {
          setProduct(response.data);
          const userId = response.data.inquiryUser;
          fetchUser(userId);
        } else {
          console.error("Product data is empty");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/profile/${userId}`
        );
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          console.error("User data is empty");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  console.log("Product:", product);
  console.log("User:", user);

  const handleOwnerAvatarClick = () => {
    setShowOwnerProfile(true);
  };

  return (
    <>
      <div className="MainContainer">
        <div className="ImagesContainer">
          {product.inquiryFile ? (
            <StlViewer
              style={{ width: "600px", height: "600px" }}
              orbitControls
              shadows
              url={product.inquiryFile}
            />
          ) : (
            <img src={placeholder} alt="placeholder" />
          )}
        </div>
        <div className="DescriptionContainer">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {product.category && <p>Category: {product.category}</p>}
          {product.inquiryUser && <p>Designer: {product.inquiryUser}</p>}
          {product.quantity !== undefined && (
            <p>Quantity: {product.quantity}</p>
          )}
          {product.material && <p>Material: {product.material}</p>}

          {user && (
            <div className="owner-shop">
              <div
                className="shop-image-owner"
                onClick={handleOwnerAvatarClick}
              >
                <img src={user.profile.avatarUrl} alt="user" />
              </div>
              <div className="shop-detail-owner">
                <h3>
                  {user.profile.username.charAt(0).toUpperCase() +
                    user.profile.username.slice(1)}
                </h3>
              </div>
              <div className="message-seller-btn">
                <button onClick={() => setShowSendMessagePopup(true)}>
                  Message{" "}
                  {user.profile.username.charAt(0).toUpperCase() +
                    user.profile.username.slice(1)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="shop-owner">
        {showOwnerProfile && user && (
          <PublicProfile
            isOpen={true}
            onClose={() => setShowOwnerProfile(false)}
            userId={user._id}
          />
        )}
        {showSendMessagePopup && user && (
          <SendMessagePop
            isOpen={true}
            onClose={() => setShowSendMessagePopup(false)}
            firstRecipientId={{ firebaseId: user.firebaseId }}
            scroll={{}}
          />
        )}
      </div>
    </>
  );
};

export default DigitalItemPage;
