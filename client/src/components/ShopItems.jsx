import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../CardComponent/Card2.css";

const ShopItems = ({ shopId }, props) => {
  const Navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [imageId, setImageId] = useState([]);
  const [productUrls, setProductUrls] = useState([]);
  // const [itemAddedToCart, setItemAddedToCart] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/listings/${shopId}`
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
    };

    fetchListings(); // No need to pass shopId here, it's already available as a prop
  }, [shopId]); // Dependency added to re-fetch listings when shopId changes

  useEffect(() => {
    const fetchImages = async () => {
      if (imageId !== null && imageId.length > 0) {
        try {
          const imageUrls = [];
          for (const id of imageId) {
            const response = await axios.get(
              `http://localhost:5001/api/images/${id}`
            );
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

  const handleMoreClick = () => {
    // Navigate(`/item/${_id}`);
  };

  const handleAddToCart = () => {
    // addItem(cartItem);
    // setItemAddedToCart(true);
  };

  // useEffect(() => {
  // 	let timeout;
  // 	if (itemAddedToCart) {
  // 		setIsCartOpen(true); // Open the cart after the item has been added to the cart
  // 	}
  // 	timeout = setTimeout(() => {
  // 		setIsCartOpen(false);
  // 		setItemAddedToCart(false); // Reset the flag
  // 	}, 2000);
  // }, [itemAddedToCart]);

  return (
    <>
      <div className="shoplisting-container">
        <h2>Shop Items</h2>
        <div className="shoplisting-card-container">
          {listings.map((listing, index) => (
            <div key={listing._id} className="cardMain">
              <div className="card-image-container" onClick={handleMoreClick}>
                <Link className="profile-links" to={`/item/${listing._id}`}>
                  <img src={productUrls[index]} alt="img" />
                </Link>
              </div>
              <div className="card-description-container shoplisting-card-height">
                <div className="card-para-wrapper">
                  <h2 className="card-shoplisting-head">{listing.name}</h2>

                  <h3>
                    Price: {listing.price} {listing.currency}
                  </h3>
                </div>
                <button
                  className="feature-button"
                  onClick={() => handleAddToCart()}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopItems;
