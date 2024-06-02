import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../CardComponent/Card.js"; // Import your Card component
import { useLocation } from "react-router-dom";
import "../styling/searchResultPage.css";
import npf from "../assets/npf.jpg";

import transportationImg from '../../src/assets/transportSearch.jpg';
import homeDecoImg from '../../src/assets/homedecorSearch.jpg';
import jewelryImg from '../../src/assets/jewelSearchbanner.jpg';
import accessoriesImg from '../../src/assets/accesories.jpg';
// import toolsImg from '../assets/tools.jpg';
// import toysImg from '../assets/toys.jpg';

const getCategoryImage = (category) => {
	switch (category.toLowerCase()) {
	  case 'transportation':
		return transportationImg;
	  case 'home deco':
		return homeDecoImg;
	  case 'jewelry':
		return jewelryImg;
	  case 'accessories':
		return accessoriesImg;
	//   case 'tools':
	// 	return toolsImg;
	//   case 'toys':
	// 	return toysImg;
	  default:
		return ''; // Default image if category doesn't match
	}
  };

const SearchResultPage = () => {
	const location = useLocation();
	const [searchResults, setSearchResults] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const searchQuery = new URLSearchParams(location.search).get("q");
		if (searchQuery) {
			if (searchQuery === "search") {
				// Handle the "search" query without querying the database
				setSearchResults([]);
				setLoading(false);
			} else {
				axios
					.get(`http://localhost:5001/api/products/search?q=${searchQuery}`)
					.then((response) => {
						const products = response.data;
						setSearchResults(products);
						setLoading(false);

						// Fetch related products based on the category of the first search result
						if (products.length > 0) {
							const category = products[0].category;
							fetchRelatedProducts(category);
						}
					})
					.catch((error) => {
						setError(error);
						setLoading(false);
					});
			}
		} else {
			setLoading(false);
		}
	}, [location.search]);

	const fetchRelatedProducts = (category) => {
		axios
			.get(`http://localhost:5001/api/products/category/${category}`)
			.then((response) => {
				setRelatedProducts(response.data);
			})
			.catch((error) => {
				console.error("Error fetching related products:", error);
			});
	};

	console.log(searchResults);
	console.log(relatedProducts);

	return (
		<div className="search-result-page">
			<h1>Search Results</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>Error: {error.message}</div>
			) : searchResults.length === 0 ? (
				<div className="no-search-results">
					<img src={npf} alt="noproductfound" />
				</div>
			) : (
				<>
					<div className="card-block">
						{searchResults.map((product) => (
							<Card key={product._id} product={product} />
						))}
					</div>
					{relatedProducts.length > 0 && (
						<>
						<div>  <img src={getCategoryImage(relatedProducts[0].category)} alt={relatedProducts[0].category} /></div>
							<h2 className="search-result-other-items">
								Other items you might be interested in
							</h2>
							<div className="card-block">
								{relatedProducts.map((product) => (
									<Card key={product._id} product={product} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SearchResultPage;
