import React, { useState, useEffect } from "react";
import placeholder from "./placeholder.jpg";
import "./Item.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EditProductModal from "./EditProductModal";
import SendMessagePop from "../popups/SendMessagePop.jsx"; // Import the SendMessagePop component
import useShoppingCart from "../hooks/useShoppingCart.js";
import ShoppingCart from "../popups/CartPop.jsx";
import Card from "../CardComponent/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ItemPage = () => {
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const [product, setProduct] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { productId } = useParams();
  const token = localStorage.getItem("shapeshiftkey");
  const decodedToken = token ? jwtDecode(token) : null;
  const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);
  const [shop, setShop] = useState(null); // State to hold shop data
  const [owner, setOwner] = useState(null); // State to hold owner data
  const [shopProducts, setShopProducts] = useState([]); // State to hold products from the same shop

  // page related declarations
  const shopId = product?.seller;
  const ownerId = shop?.owner;
  const material = product?.material;
  const shopName = shop?.name;
  const productName = product?.name;
  const price = product?.price;

  const { addItem } = useShoppingCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem(product); // Always add one item to the cart
    setItemAddedToCart(true); // Mark that the item has been added to the cart
  };

  useEffect(() => {
    let timeout;
    if (itemAddedToCart) {
      setIsCartOpen(true); // Open the cart after the item has been added to the cart
    }
    timeout = setTimeout(() => {
      setIsCartOpen(false);
      setItemAddedToCart(false); // Reset the flag
    }, 2000);
    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, [itemAddedToCart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/${productId}`
        );
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          const primaryImageId = response.data.images[0];
          const primaryImageResponse = await axios.get(
            `/api/images/${primaryImageId}`
          );
          setMainImage(primaryImageResponse.data.url);

          const secondaryImageIds = response.data.images.slice(0, 5); // Include the initial image in secondary images
          const secondaryImageUrls = await Promise.all(
            secondaryImageIds.map(async (imageId) => {
              try {
                const imageResponse = await axios.get(`/api/images/${imageId}`);
                return imageResponse.data.url;
              } catch (error) {
                console.error("Error fetching image URL:", error);
                return null;
              }
            })
          );
          setSecondaryImages(secondaryImageUrls.filter((url) => url !== null));
          setSelectedImage(primaryImageResponse.data.url); // Set the selected image initially
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [productId]);
  console.log("products", product);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/shop/${shopId}`
        );
        setShop(response.data.shop);
        const shopProductsResponse = await axios.get(
          `http://localhost:5001/api/shop/${shopId}/products`
        );
        setShopProducts(shopProductsResponse.data.products);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        // Handle error or set a loading state
      }
    };
    fetchShop();
  }, [shopId]);
  console.log("shop", shop);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/profile/${ownerId}`
        );
        setOwner(response.data.user);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        // Handle error or set a loading state
      }
    };
    fetchOwner();
  }, [ownerId]);
  console.log("owner", owner);

  const handleEditOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Update selected image
  };

  return (
    <>
      <div className="FirstMainContainer">
        <div className="ImagesContainer left">
          <div className="MainImageContainer">
            <img
              className="main-image"
              src={selectedImage || mainImage || placeholder} // Render selected image or fallback to mainImage or placeholder
              alt={product.name}
              style={{ maxWidth: "600px", maxHeight: "600px" }}
            />
          </div>
          <div className="secondary-images">
            {secondaryImages.map((image, index) => (
              <img
                key={index}
                className="secondary-image"
                src={image}
                alt={product.name}
                onClick={() => handleImageClick(image)} // Handle image click
              />
            ))}
          </div>
        </div>
        <div className="FirstDescriptionContainer right">
          <ul>
            <li>
              <div className="shop-owner">
                {decodedToken &&
                  decodedToken.membership.shopId === product.seller && (
                    <div className="admin-buttons-container">
                      <button
                        className="admin-buttons"
                        onClick={handleEditOpen}
                      >
                        Edit
                      </button>
                      <button className="admin-buttons" onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </li>
            <li>
              <p>Price: ${price}</p>
              <p>VAT included (where applicable), plus shipping</p>
            </li>
            <li>
              <h2>{productName}</h2>
            </li>
            <li>
              <p>{shopName}</p>
              <div className="star-rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </li>
            <li>
              <p>Material: {material}</p>
            </li>
            <li>
              <button>Buy Now</button>
            </li>
            <li>
              <button
                className="feature-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </li>
            <li>
              <button>Add to favorites</button>
            </li>
            <li>
              <button>Report this item</button>
            </li>
            <li>
              <p>
                {shopName}. This seller consistently earned 5-star reviews,
                shipped on time, and replied quickly to any messages they
                received.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="SecondMainContainer">
        <div className="MainDescriptionContainer left">
          <p>{product.description}</p>
        </div>
        <div className="Contact right">
          <div className="owner-shop">
            {owner ? (
              <>
                <div className="shop-image-owner">
                  <img
                    src={owner.profile.avatarUrl || placeholder}
                    alt="Owner"
                  />
                </div>
                <div className="shop-detail-owner">
                  <h3>
                    {owner.profile.username &&
                      owner.profile.username.charAt(0).toUpperCase() +
                        owner.profile.username.slice(1)}
                  </h3>
                </div>
              </>
            ) : (
              <div className="shop-detail-owner">
                <p>Loading owner data...</p>
              </div>
            )}
            <button onClick={() => setShowSendMessagePopup(true)}>
              Message Seller
            </button>
          </div>

          <div className="owner-shop">
            {shop ? (
              <>
                <div className="shop-image-owner">
                  <img src={shop.avatarUrl || placeholder} alt="Shop" />
                </div>
                <div className="shop-detail-owner">
                  <h3>{shop.name || "Shop Name"}</h3>
                </div>
              </>
            ) : (
              <div className="shop-detail-owner">
                <p>Loading shop data...</p>
              </div>
            )}
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
      <div className="ThirdMainContainer">
        <div className="Reviews left"></div>
        <div className="ReviewImages right"></div>
      </div>
      <div className="FourthMainContainer">
        <div className="ShopItems full product-grid">
          {shopProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <Card product={product} />
            </div>
          ))}
        </div>
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>

      {isEditModalOpen && (
        <EditProductModal
          product={product}
          token={token}
          onClose={handleEditClose}
          onSave={handleSave}
        />
      )}
      {showSendMessagePopup && product && (
        <SendMessagePop
          isOpen={true}
          onClose={() => setShowSendMessagePopup(false)}
          firstRecipientId={{ firebaseId: product.shopOwner }} // Ensure you have firebaseId in owner data
          scroll={{}}
        />
      )}
    </>
  );
};

export default ItemPage;
