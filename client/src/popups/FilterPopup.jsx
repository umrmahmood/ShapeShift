import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PopMenu.css"; // Reuse the CSS file for styling
import "./FilterPopup.css"; // Add specific styles for filter popup

const FilterPopup = ({ isOpen, onClose, onApplyFilters, activeFilters }) => {
	const popupRef = useRef(null);
	const [location, setLocation] = useState(
		activeFilters.location || "Anywhere"
	);
	const [priceRange, setPriceRange] = useState(
		activeFilters.priceRange || "Any price"
	);
	const [material, setMaterial] = useState(activeFilters.material || "All");
	const [type, setType] = useState(activeFilters.type || "All");
	const [minPrice, setMinPrice] = useState(activeFilters.minPrice || "");
	const [maxPrice, setMaxPrice] = useState(activeFilters.maxPrice || "");
	const [freeShipping, setFreeShipping] = useState(
		activeFilters.freeShipping || false
	);
	const [onSale, setOnSale] = useState(activeFilters.onSale || false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	if (!isOpen) return null;

	const handleFilter = () => {
		onApplyFilters({
			location,
			priceRange,
			material,
			type,
			minPrice,
			maxPrice,
			freeShipping,
			onSale,
		});
		onClose();
	};

	const handleClearFilters = () => {
		setLocation("Anywhere");
		setPriceRange("Any price");
		setMaterial("All");
		setType("All");
		setMinPrice("");
		setMaxPrice("");
		setFreeShipping(false);
		setOnSale(false);
		onApplyFilters({
			location: "Anywhere",
			priceRange: "Any price",
			material: "All",
			type: "All",
			minPrice: "",
			maxPrice: "",
			freeShipping: false,
			onSale: false,
		});
		onClose();
	};

	const handleRemoveFilter = (filterKey) => {
		switch (filterKey) {
			case "location":
				setLocation("Anywhere");
				break;
			case "priceRange":
				setPriceRange("Any price");
				setMinPrice("");
				setMaxPrice("");
				break;
			case "material":
				setMaterial("All");
				break;
			case "type":
				setType("All");
				break;
			case "freeShipping":
				setFreeShipping(false);
				break;
			case "onSale":
				setOnSale(false);
				break;
			default:
				break;
		}
		onApplyFilters({
			location,
			priceRange,
			material,
			type,
			minPrice,
			maxPrice,
			freeShipping,
			onSale,
		});
	};

	return (
		<div className="custom-popup-overlay">
			<div
				ref={popupRef}
				className={`filter-custom-popup-content filter-popup ${
					isOpen ? "open" : ""
				}`}
				style={{ left: "0" }}
			>
				<h2 className="filter-popup-title">Filters</h2>
				<div className="filter-section">
					<label>Shop Location</label>
					<select
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					>
						<option value="Anywhere">Anywhere</option>
						<option value="Europe">Europe</option>
						<option value="Germany">Germany</option>
						<option value="Custom">Custom</option>
					</select>
					{location === "Custom" && (
						<input
							type="text"
							placeholder="Enter location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					)}
					{location !== "Anywhere" && (
						<div className="filter-tag">
							Location: {location}{" "}
							<button className="filter-cancel-btn" onClick={() => handleRemoveFilter("location")}>x</button>
						</div>
					)}
				</div>
				<div className="filter-section">
					<label>Price ($)</label>
					<select
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
					>
						<option value="Any price">Any price</option>
						<option value="Under 25">Under US$25</option>
						<option value="25 to 50">US$25 to US$50</option>
						<option value="50 to 100">US$50 to US$100</option>
						<option value="Over 100">Over US$100</option>
						<option value="Custom">Custom</option>
					</select>
					{priceRange === "Custom" && (
						<>
							<input
								type="number"
								placeholder="Enter minimum price"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
							/>
							to
							<input
								type="number"
								placeholder="Enter maximum price"
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
							/>
						</>
					)}
					{priceRange !== "Any price" && (
						<div className="filter-tag">
							Price: {priceRange}{" "}
							<button className="filter-cancel-btn" onClick={() => handleRemoveFilter("priceRange")}>
								x
							</button>
						</div>
					)}
				</div>
				<div className="filter-section">
					<label>Material</label>
					<select
						value={material}
						onChange={(e) => setMaterial(e.target.value)}
					>
						<option value="All">All</option>
						<option value="PLA">PLA</option>
						<option value="ABS">ABS</option>
						<option value="PETG">PETG</option>
						<option value="TPU">TPU</option>
						<option value="TPE">TPE</option>
						<option value="TPC">TPC</option>
						<option value="Nylon">Nylon</option>
						<option value="ASA">ASA</option>
						<option value="PVB">PVB</option>
						<option value="HIPS">HIPS</option>
						<option value="PVA">PVA</option>
						<option value="PC">PC</option>
						<option value="PEI">PEI</option>
						<option value="PEEK">PEEK</option>
						<option value="PEKK">PEKK</option>
						<option value="PVDF">PVDF</option>
						<option value="PPSU">PPSU</option>
						<option value="Resins">Resins</option>
						<option value="Ceramics">Ceramics</option>
						<option value="Silicone">Silicone</option>
						<option value="Metals">Metals</option>
					</select>
					{material !== "All" && (
						<div className="filter-tag">
							Material: {material}{" "}
							<button className="filter-cancel-btn" onClick={() => handleRemoveFilter("material")}>x</button>
						</div>
					)}
				</div>
				<div className="filter-section">
					<label>Type</label>
					<select value={type} onChange={(e) => setType(e.target.value)}>
						<option value="All">All</option>
						<option value="Physical">Physical</option>
						<option value="Digital">Digital</option>
					</select>
					{type !== "All" && (
						<div className="filter-tag">
							Type: {type}{" "}
							<button className="filter-cancel-btn" onClick={() => handleRemoveFilter("type")}>x</button>
						</div>
					)}
				</div>
				<div className="filter-section">
					<input
						type="checkbox"
						id="freeShipping"
						checked={freeShipping}
						onChange={(e) => setFreeShipping(e.target.checked)}
					/>
					<label htmlFor="freeShipping">FREE shipping</label>
					{freeShipping && (
						<div className="filter-tag">
							Free Shipping{" "}
							<button className="filter-cancel-btn" onClick={() => handleRemoveFilter("freeShipping")}>
								x
							</button>
						</div>
					)}
				</div>
				<div className="filter-section">
					<input
						type="checkbox"
						id="onSale"
						checked={onSale}
						onChange={(e) => setOnSale(e.target.checked)}
					/>
					<label htmlFor="onSale">On Sale</label>
					{onSale && (
						<div className="filter-tag">
							On Sale{" "}
							<button className="filter-cancel-btn" onClick={() => handleRemoveFilter("onSale")}>x</button>
						</div>
					)}
				</div>
				<button className="filter-popup-btn" onClick={handleFilter}>
					Apply Filters
				</button>{" "}
				<button className="filter-popup-btn" onClick={handleClearFilters}>
					Clear Filters
				</button>
			</div>
		</div>
	);
};

FilterPopup.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onApplyFilters: PropTypes.func.isRequired,
	activeFilters: PropTypes.object.isRequired,
};

export default FilterPopup;
