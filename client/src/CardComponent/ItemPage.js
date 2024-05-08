import React, { useState, useEffect } from "react";
import placeholder from "./placeholder.jpg";
import "./Item.css";
import axios from "axios";
import { useParams} from 'react-router-dom'
const ItemPage = ({  }) => {
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
  const [product, setProduct] = useState([]);
  const { productId} = useParams();
  const {
    name,
    description,
    category,
    price,
    images,
    seller,
    designer,
    quantity,
    dimensions,
    material,
    tags,
    ratings,
    createdAt,
    updatedAt,
  } = product;

 useEffect(() => {
  if (images && images.length > 0) {
      const fetchingImage = async () => {
        const imageUrl = images[0]; 

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
        console.log("Response:", response);
        setProduct(response.data);
        if (response.data && response.data.images && response.data.images.length > 0) {
          setMainImage(response.data.images[0]);
          setImageUrl(response.data.images[0]);
          setSecondaryImage(response.data.images.slice(1)); // Set secondary images here
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
}, [productId]);
// useEffect(() => {
//     if (product && product.images && product.images.length > 0) {
//       setMainImage(product.images[0]);
//       setSecondaryImage(response.data.images.slice(1));
//     }
//   }, [product]);
//   if (!product) {
//     return <div>Loading...</div>;
//   }
  // Calculating reviews from DB
// useEffect(() => {
//     // Calculate average rating from the reviews
//     if (reviews.length > 0) {
//         const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//         const average = totalRating / reviews.length;
//         setAverageRating(average);
//     }
// }, [reviews]);
  return (
    <div className="MainContainer">
        <div className="ImagesContainer">
        <div className="MainImageContainer">
          
        </div>
        <img className="main-image" src={imageUrl || placeholder} alt={name} style={{ maxWidth: "600px", maxHeight: "600px" }} />
        <div className="secondary-image">
        {secondaryImage.map((image, index) => (
            <img key={index} className="secondary-image" src={image} alt={name} style={{ maxWidth: "200px", maxHeight: "200px" }} />
          ))}
        </div>
        </div>
        <div className="DescriptionContainer">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <p>Seller: {seller}</p>
            <p>Designer: {designer}</p>
            <p>Quantity: {quantity}</p>
            <p>Material: {material}</p>
            {/* <p>Tags: {tags.join(', ')}</p> */}
            <p>Created At: {createdAt}</p>
            <p>Updated At: {updatedAt}</p>
        </div>
    </div>
);
};
export default ItemPage;