import React, { useState, useEffect } from "react";
import "../../CardComponent/Item.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SendMessagePop from "../../popups/SendMessagePop.jsx"; // Import the SendMessagePop component
import placeholder from "../../CardComponent/placeholder.jpg";
import { StlViewer } from "react-stl-viewer";

const DigitalItemPage = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/digitals/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [productId]);

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
          <div className="message-seller-btn">
            <button onClick={() => setShowSendMessagePopup(true)}>
              Message Seller
            </button>
          </div>
          <div className="message-seller-btn">
            <button>
              <Link
                className="text-wrapper profile-links"
                to={`/shop/${product.seller}`}
              >
                Visit Shop
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="shop-owner">
        {showSendMessagePopup && product && (
          <SendMessagePop
            isOpen={true}
            onClose={() => setShowSendMessagePopup(false)}
            firstRecipientId={{ firebaseId: product.shopOwner }} // Ensure you have firebaseId in owner data
            scroll={{}}
          />
        )}
      </div>
    </>
  );
};

export default DigitalItemPage;
