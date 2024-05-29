import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styling/shopListing.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../CardComponent/Card2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ShopListing = () => {
  const Navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [imageId, setImageId] = useState([]);
  const [productUrls, setProductUrls] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("shapeshiftkey");
      if (token) {
        const decodedToken = jwtDecode(token);
        const shopIdFromToken = decodedToken?.membership?.shopId;
        try {
          const response = await axios.get(
            `/api/products/listings/${shopIdFromToken}`
          );
          setListings(response.data);

          const imageIdsArray = [];
          for (const listing of response.data) {
            imageIdsArray.push(listing.images[0]);
          }

          setImageId(imageIdsArray);
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (imageId !== null && imageId.length > 0) {
        try {
          const imageUrls = [];
          for (const id of imageId) {
            const response = await axios.get(`/api/images/${id}`);
            imageUrls.push(response.data.url);
          }
          setProductUrls(imageUrls);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    };
    fetchImages();
  }, [imageId]);

  //delete
  const deleteProduct = async (productId, imageIds) => {
    const token = localStorage.getItem("shapeshiftkey");
    if (token) {
      const decodedToken = jwtDecode(token);
      const shopIdFromToken = decodedToken?.membership?.shopId;

      try {
        await axios.delete(`http://localhost:5001/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the token
          },
        });
        // Delete images associated with the product
        // for (const imageId of imageIds) {
        //     await axios.delete(`http://localhost:5001/api/images/${imageId}`);
        // }

        // Refresh listings after deletion
        const response = await axios.get(
          `http://localhost:5001/api/products/listings/${shopIdFromToken}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Authorization header with the token
            },
          }
        );
        setListings(response.data);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const onDeleteListing = async (productId, imageIds) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId, imageIds);
    }
  };

  const onAddListing = () => {
    Navigate("/product-form");
  };
  return (
    <>
      <div className="shoplisting-container">
        <h2 className="shoplisting-container-heading">Listings</h2>
        <div className="shoplisting-bar">
          <div className="shoplisting-btns">
            <button>Renew</button>
            <button>Deactivate</button>
            <button>Delete</button>
          </div>
          <div className="shoplisting-addlisting-btn">
            <button onClick={onAddListing}>
              <span className="shoplist-plus">+</span> Add a listing
            </button>
          </div>
        </div>
        <div className="shoplisting-card-container">
          {listings.map((listing, index) => (
            <div key={listing._id} className="cardMain">
              <div className="card-image-container">
                <Link className="profile-links" to={`/item/${listing._id}`}>
                  <img src={productUrls[index]} alt="img" />
                </Link>
              </div>
              <div className="card-description-container">
                <div className="card-para-wrapper">
                  <h2 className="card-shoplisting-head">{listing.name}</h2>
                  {/* <p>{listing.description}</p> */}
                  <h3>
                    Price: {listing.price} {listing.currency}
                  </h3>
                </div>

                {/* <p>Material: {listing.material.join(", ")}</p> */}
                <div className="listing-trash-wrapper">
                  {/* <button>Edit</button> */}
                  <button
                    className="listing-trash-btn"
                    onClick={() =>
                      onDeleteListing(
                        listing._id,
                        listing.images.map((img) => img._id)
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopListing;
