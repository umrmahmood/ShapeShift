import react, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  console.log(props.product);
  const { _id, name, description, price, ratings, images } = props.product;

  useEffect(() => {
    if (images && images.length > 0) {
      const fetchingImage = async () => {
        const imageUrl = images[0]; // Assuming images is an array of image IDs

        try {
          const response = await fetch(`/api/images/${imageUrl}`);
          if (response.ok) {
            const data = await response.json();
            setImageUrl(data.url);
            console.log("IMAGEURL:", data);
          } else {
            throw new Error("Failed to fetch image");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchingImage();
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
      {imageUrl && <img src={imageUrl} alt={name} />}
      <h2>{name}</h2>
      {/* <p>{description}</p> */}
      {/* <h3 className="rating">Rating:{calculateAverageRating(ratings)}</h3> */}
      <h3>Price {price}</h3>
      <button className="feature-button" onClick={handleMoreClick}>
        More
      </button>
    </div>
  );
};

export default Card;
