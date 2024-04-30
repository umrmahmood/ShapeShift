import React, { useState, useEffect } from "react";
import placeholder from "./placeholder.jpg";
import "./Item.css";
import axios from "axios";


const ItemPage = ({ product }) => {
  const [mainImage, setMainImage] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
  const [products, setProducts] = useState([]);

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
      setMainImage(images[0]);
    }
  }, [images]);


  useEffect(() => {
    axios.get(`/api/product/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

// Calculating reviews from DB
// useEffect(() => {
//     // Calculate average rating from the reviews
//     if (reviews.length > 0) {
//         const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//         const average = totalRating / reviews.length;
//         setAverageRating(average);
//     }
// }, [reviews]);

const handleImageClick = (image) => {
    setMainImage(image);
};


  return (
    <div className="MainContainer">
        <div className="ImagesContainer">
            <div className="MainImageContainer">
                <img className="main-image" src={mainImage} alt={name} />
            </div>
            <div className="ThumbnailImagesContainer">
                {images.map((image, index) => (
                    <img key={index} className="thumbnail-image" src={image} alt={name} onClick={() => handleImageClick(image)} />
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
            <p>Dimensions: {dimensions.width} x {dimensions.height} x {dimensions.depth}</p>
            <p>Material: {material}</p>
            <p>Tags: {tags.join(', ')}</p>
            <p>Created At: {createdAt}</p>
            <p>Updated At: {updatedAt}</p>
          
        </div>
    </div>
);
};
export default ItemPage;
