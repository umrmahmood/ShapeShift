import React, { useState, useEffect } from "react";
import placeholder from "./placeholder.jpg";
import "./Item.css";
import axios from "axios";
import { useParams} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ItemPage = ({  }) => {
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [product, setProduct] = useState([]);
  const { productId} = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const token = localStorage.getItem("shapeshiftkey");
  console.log(token)
  //   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
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
          const secondaryImages = response.data.images.slice(1);
          const secondaryImageUrls = await Promise.all(secondaryImages.map(async (imageUrl) => {
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
          }));
          setSecondaryImage(secondaryImageUrls.filter(url => url !== null));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Item will be deleted. Are you sure?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5001/api/products/${productId}`,
          {
            headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "multipart/form-data",
						},
          }
        );
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  const decodedToken = jwtDecode(token);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/products/${productId}`, editedProduct);
      console.log(response.data); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Calculating reviews from DB
// useEffect(() => {
//     // Calculate average rating from the reviews
//     if (reviews.length > 0) {
//         const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//         const average = totalRating / reviews.length;
//         setAverageRating(average);
//     }
// }, [reviews]);
console.log("decoded token is : " , decodedToken)
  return (
    <div className="MainContainer">
        <div className="ImagesContainer">
        <div className="MainImageContainer">
          
        </div>
        <img className="main-image" src={imageUrl || placeholder} alt={name} style={{ maxWidth: "600px", maxHeight: "600px" }} />
        <div className="secondary-image">
  {secondaryImage.map((image, index) => (
    <img
      key={index}
      className="secondary-image"
      src={image}
      alt={name}
    
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
  {product.seller && <p>Seller: {product.seller}</p>}
  {product.designer && <p>Designer: {product.designer}</p>}
  {product.quantity !== undefined && <p>Quantity: {product.quantity}</p>}
  {product.material && <p>Material: {product.material}</p>}
</div>
<div className="shop-owner">
{ decodedToken.membership.shopId === product.seller && (
            <div>
              <button onClick={handleChange}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
</div>
    </div>
);
};
export default ItemPage;