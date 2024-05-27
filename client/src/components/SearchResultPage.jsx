import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../CardComponent/Card.js"; // Import your Card component
import { useLocation } from "react-router-dom";
import "../styling/searchResultPage.css"
import npf from '../assets/npf.jpg';

const SearchResultPage = () => {
	const location = useLocation();
	const [searchResults, setSearchResults] = useState([]);
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
						setSearchResults(response.data);
						setLoading(false);
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

	return (
		<div className="search-result-page">
			<h1>Search Results</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>Error: {error.message}</div>
			) : searchResults.length === 0 ? (
				<div className="no-search-results">
          <img src={npf} alt="noproductfound"  />
        </div>
			) : (
				<div className="card-block">
					{searchResults.map((product) => (
						<Card key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default SearchResultPage;
