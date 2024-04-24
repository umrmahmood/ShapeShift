import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const ProductList=() => {

const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] =  useState([]);;
const [searchTerm, setSearchTerm] = useState("");
//Fetching data from backend
useEffect(() => {
    axios.get('/api/products')
        .then(response => {
            setProducts(response.data);
            setFilteredProducts(response.data);
        })
        .catch(error => console.error('Error fetching products:', error));
}, []);

//Function to handle filtering
const filterByCategory = (category) => {
    if (category === "all"){
        setFilteredProducts(products);
    } else filtere = products-filterByCategory(product =>product.category === category);
    setFilteredProducts(filtered);
}
};

return (
    <div>
        <select onChange={(e) => filterByCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
        </select>

        <div className="display-product">
                {filteredProducts.map(product => (
                    <Card key={product._id} product={product} />

            ))}
        </div>
    </div>
)
export default ProductList;