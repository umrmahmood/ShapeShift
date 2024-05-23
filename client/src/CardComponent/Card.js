import react, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";

const Card = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState([]);
  console.log(props.product);
  const { _id, name, description, price, ratings, images } = props.product;

  const {addItem, subtractItem, removeItem, editItem, items} = useShoppingCart();
  // useEffect(() => {
  //   if (images && images.length > 0) {
  //     const fetchingImage = async () => {
  //       const imageUrl = images[0]; 

  //       try {
  //         const response = await fetch(`/api/images/${imageUrl}`);
  //         if (response.ok) {
  //           const data = await response.json();
  //           setImageUrl(data.url);
  //           console.log("IMAGEURL:", data);
  //         } else {
  //           throw new Error("Failed to fetch image");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchingImage();
  //   }
  // }, [images]);

  useEffect(() => {
    if (images && images.length > 0) {
      const fetchingImages = async () => {
        try {
          const promises = images.map(async (imageUrl) => {
            const response = await fetch(`/api/images/${imageUrl}`);
            if (response.ok) {
              const data = await response.json();
              return data.url;
            } else {
              throw new Error("Failed to fetch image");
            }
          });
          const urls = await Promise.all(promises);
          setImageUrl(urls);
          console.log("IMAGEURLS:", urls);
        } catch (error) {
          console.error(error);
        }
      };

      fetchingImages();
    }
  }, [images]);

  const handleMoreClick = () => {
    navigate(`/item/${_id}`);
  };

  // const calculateAverageRating = (rating) => {
  //   if (!rating || rating.length === 0) {
  //     return "No ratings yet";
  //   }
  // };
  return (
    <div className="cardMain">
      {imageUrl && <img src={imageUrl[0]} alt={name} />}
      <h2>{name}</h2>
      {/* <p>{description}</p> */}
      {/* <h3 className="rating">Rating:{calculateAverageRating(ratings)}</h3> */}
      <h3>Price {price}</h3>
      <button className="feature-button" onClick={handleMoreClick}>
        More
      </button>
      <div></div>
      <button className="feature-button" onClick={() => addItem(props.product)}>
        Add
      </button>
      <div></div>
      <button className="feature-button" onClick={() => subtractItem(props.product._id)}>
        Subtract
      </button>
      <div></div>
      <button className="feature-button" onClick={() => removeItem(props.product._id)}>
        Remove
      </button>
      <div></div>
      <input
        type="number"
        id="editNumberOfItem"
        onChange={(e) => editItem(props.product._id, e.target.value)}
      />
    </div>
  );
};

export default Card;