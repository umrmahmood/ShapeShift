import React, { useState, useEffect } from "react";
import placeholder from "../../CardComponent/placeholder.jpg";
import "../../CardComponent/Item2.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import PublicProfile from "../../popups/PublicProfile.jsx";
import ThirdMainContainer from "../FakeReviews.jsx";
import DigitalCard from "./DigitalCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFlag } from "@fortawesome/free-solid-svg-icons";
import SendMessagePop from "../../popups/SendMessagePop.jsx"; // Import the SendMessagePop component

const DigitalItemPage = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);
  const [user, setUser] = useState(null);
  const [showOwnerProfile, setShowOwnerProfile] = useState(false);
  const [digitalProducts, setDigitalProducts] = useState([]); // State to hold products from the same shop

  const userName = user?.profile?.username;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("de-DE"); // "de-DE" formats the date as "dd.mm.yyyy"
  };

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
          console.log("userFire", user.firebaseId);
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

  useEffect(() => {
    axios
      .get("/api/digitals/random-products")
      .then((response) => {
        setDigitalProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleOwnerAvatarClick = () => {
    setShowOwnerProfile(true);
  };

  const randomNumber = Math.floor(Math.random() * (230 - 55 + 1)) + 55;

  return (
    <>
      <div className="item-page-outter">
        <div className="item-page-first-container digitial-item-img-cont">
          <div className="item-page-imagesContainer digitial-item-img-stl">
            {product?.inquiryFile ? (
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
          <div className="item-page-description-container">
            <ul>
              <li>
                <div>
                  <p>
                    request sent by {userName} on{" "}
                    {formatDate(product.createdAt)}
                  </p>
                </div>
              </li>
              <li>
                <h2 className="item-page-product-heading">{product?.name}</h2>
              </li>
              <li>
                {product?.quantity !== undefined && (
                  <p>Inquired Quantity: {product.quantity}</p>
                )}
              </li>
              <li>
                {product?.material && <p>Material: {product.material}</p>}
              </li>
              <div className="item-page-other-butons">
                <div className="item-page-btn">
                  <button onClick={() => setShowSendMessagePopup(true)}>
                    Message {userName}
                  </button>
                </div>
                <div className="item-page-add-to-fav">
                  <div className="item-page-fav-icon">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <button>
                    <div>Add to favorites</div>
                  </button>
                </div>
                <div className="item-page-add-to-fav">
                  <div className="item-page-fav-icon item-page-report">
                    <FontAwesomeIcon icon={faFlag} />
                  </div>
                  <button>Report this item</button>
                </div>
              </div>
              <li>
                <div className="item-page-seller-review">
                  {userName}. This user replied quickly to any messages they
                  received.
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="item-page-second-container">
          <div className="item-page-product-description digital-prod-des">
            <h2>Product description</h2>
            <p>{product?.description}</p>
          </div>
          <div className="item-page-contact">
            {user && (
              <div className="owner-shop">
                <div
                  className="shop-image-owner"
                  onClick={handleOwnerAvatarClick}
                >
                  <img src={user.profile.avatarUrl} alt="user" />
                </div>
                <div className="shop-detail-owner">
                  <h3>{userName}</h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="item-page-review-container">
          <div className="full">
            <h3>{randomNumber} reviews</h3>
            <ThirdMainContainer />
          </div>
        </div>
        <div className="FourthMainContainer">
          <h2 className="item-page-otheritems-head">Other Digital Items</h2>
          <div className="item-page-items-from-same digital-other-prod">
            {digitalProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <DigitalCard product={product} />
              </div>
            ))}
          </div>
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
            firstRecipientUsername={userName} // Pass as a string
            scroll={{}}
          />
        )}
      </div>
    </>
  );
};

export default DigitalItemPage;
