import React, { useState, useEffect } from "react";
import placeholder from "./placeholder.jpg";
import "./Item.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EditProductModal from "./EditProductModal";
import SendMessagePop from "../popups/SendMessagePop.jsx"; // Import the SendMessagePop component

const ItemPage = () => {
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [product, setProduct] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { productId } = useParams();
  const token = localStorage.getItem("shapeshiftkey");
  const decodedToken = token ? jwtDecode(token) : null;
  const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/${productId}`
        );
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setMainImage(response.data.images[0]);
          const secondaryImages = response.data.images.slice(1);
          const secondaryImageUrls = await Promise.all(
            secondaryImages.map(async (imageUrl) => {
              try {
                const response = await fetch(`/api/images/${imageUrl}`);
                if (response.ok) {
                  const data = await response.json();
                  return data.url;
                } else {
                  throw new Error("Failed to fetch image");
                }
              } catch (error) {
                console.error(error);
                return null;
              }
            })
          );
          setSecondaryImage(secondaryImageUrls.filter((url) => url !== null));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      const fetchingImage = async () => {
        const imageUrl = product.images[0];
        try {
          const response = await fetch(`/api/images/${imageUrl}`);
          if (response.ok) {
            const data = await response.json();
            setImageUrl(data.url);
          } else {
            throw new Error("Failed to fetch image");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchingImage();
    }
  }, [product.images]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/${productId}`
        );
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (token) {
      fetchCurrentUser();
    }
  }, [token]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Item will be deleted. Are you sure?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5001/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleEditOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/products/${productId}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProduct(response.data);
      handleEditClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="MainContainer">
        <div className="ImagesContainer">
          <div className="MainImageContainer">
            <img
              className="main-image"
              src={imageUrl || placeholder}
              alt={product.name}
              style={{ maxWidth: "600px", maxHeight: "600px" }}
            />
          </div>
          <div className="secondary-image">
            {secondaryImage.map((image, index) => (
              <img
                key={index}
                className="secondary-image"
                src={image}
                alt={product.name}
                onMouseEnter={(e) => {
                  e.target.style.maxWidth = "600px";
                  e.target.style.maxHeight = "600px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.maxWidth = "200px";
                  e.target.style.maxHeight = "200px";
                }}
              />
            ))}
          </div>
        </div>
        <div className="DescriptionContainer">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {product.category && <p>Category: {product.category}</p>}
          {product.price && <p>Price: ${product.price}</p>}
          {product.designer && <p>Designer: {product.designer}</p>}
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
        {decodedToken && decodedToken.membership.shopId === product.seller && (
          <div className="admin-buttons-container">
            <button className="admin-buttons" onClick={handleEditOpen}>
              Edit
            </button>
            <button className="admin-buttons" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        {showSendMessagePopup && product && (
          <SendMessagePop
            isOpen={true}
            onClose={() => setShowSendMessagePopup(false)}
            firstRecipientId={{ firebaseId: product.shopOwner }} // Ensure you have firebaseId in owner data
            scroll={{}}
          />
        )}
      </div>
      {isEditModalOpen && (
        <EditProductModal
          product={product}
          token={token}
          onClose={handleEditClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ItemPage;
