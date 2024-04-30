import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const FilterCategories = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //Fetching data from backend
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  //Function to handle filtering
  const filterByCategory = (category) => {
    let filtered;
    if (category === "all") {
      setFilteredProducts(products);
    } else
      filtered =
        products - filterByCategory((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  return (
    <div className="select-container">
      <select onChange={(e) => filterByCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
        <option value="category4">Category 4</option>
        <option value="category5">Category 5</option>
        <option value="category6">Category 6</option>
      </select>

      <div className="display-product">
        {filteredProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default FilterCategories;
