import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholder from "./placeholder.jpg";
import "./categories.css";
import Card from "./Card";

const Categories = () => {
  const categories = [
    "Pet Accessories",
    "Home Decor",
    "Jewelry & Accessories",
    "Tech Gadgets",
    "Fashion & Apparel",
    "Gadgets & Gizmos",
    "Office & Desk Accessories",
   // "Kitchen & Dining",
    // "Outdoor & Garden",
    // "DIY & Hobby",
    // "Educational & Learning",
    // "Sports & Fitness",
    // "Travel & Adventure",
    // "Art & Sculptures",
    // "Custom & Personalized",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filterByCategory = (category) => {
    if (category === "All Categories") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
    setSelectedCategory(category);
    setShowAllCategories(false); 
  };

  const handleCategoryClick = (category) => {
    filterByCategory(category);
  };

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  return (
    <div className="category">
      <ul className="category-grid">
        {categories.slice(0, 7).map((category, index) => (
          <li className="category-item" key={index}>
            <a
              href="#"
              className={`category-link ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </a>
          </li>
        ))}
        {categories.length > 7 && (
          <li className="category-item dropdown" onClick={() => toggleShowAllCategories()}>
            <a href="#" className="category-link">
            All Categories
            </a>
            <div className="dropdown-container" style={{ display: showAllCategories ? 'block' : 'none' }}>
  {categories.slice(7).map((category, index) => (
    <a
      href="#"
      className={`category-link ${selectedCategory === category ? 'active' : ''}`}
      key={index}
      onClick={() => handleCategoryClick(category)}
    >
      {category}
    </a>
  ))}
</div>
          </li>
        )}
      </ul>

      {/* Render the filtered products */}
      <div className="display-product">
        {filteredProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Categories;