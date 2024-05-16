import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopItems = ({ shopId }) => {
  const Navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [imageId, setImageId] = useState([]);
  const [productUrls, setProductUrls] = useState([]);

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

  const onAddListing = () => {
    Navigate("/product-form");
  };
  return (
    <>
      <div className="shoplisting-container">
        <h2>Shop Items</h2>
        <div className="shoplisting-card-container">
          {listings.map((listing, index) => (
            <div key={listing._id} className="shoplisting-card">
              <div className="shoplisting-img-container">
                <img src={productUrls[index]} alt="img" />
              </div>

              <h3>{listing.name}</h3>
              <p>{listing.description}</p>
              <p>
                Price: {listing.price} {listing.currency}
              </p>
              <p>Material: {listing.material.join(", ")}</p>
              <div className="shoplisting-btns">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopItems;
