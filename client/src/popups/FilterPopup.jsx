import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PopMenu.css"; // Reuse the CSS file for styling
import "./FilterPopup.css"; // Add specific styles for filter popup

const FilterPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [location, setLocation] = useState("Anywhere");
  const [priceRange, setPriceRange] = useState("Any price");
  const [material, setMaterial] = useState("All");

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
    // Implement the filter logic here
    console.log("Location:", location);
    console.log("Price Range:", priceRange);
    console.log("Material:", material);
    onClose();
  };

  return (
    <div className="custom-popup-overlay">
      <div
        ref={popupRef}
        className={`custom-popup-content filter-popup ${isOpen ? "open" : ""}`}
        style={{ left: "0" }}
      >
        <h2 className="popup-title">Filters</h2>
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
            <>
              <input
                type="text"
                placeholder="Enter location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </>
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
                onChange={(e) => setPriceRange(e.target.value)}
              />
              to
              <input
                type="number"
                placeholder="Enter maximum price"
                onChange={(e) => setPriceRange(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="filter-section">
          <label>Material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Physical items">Physical items</option>
            <option value="Digital downloads">Digital downloads</option>
          </select>
        </div>
        <div className="filter-section">
          <input type="checkbox" id="freeShipping" />
          <label htmlFor="freeShipping">FREE shipping</label>
        </div>
        <div className="filter-section">
          <input type="checkbox" id="onSale" />
          <label htmlFor="onSale">On sale</label>
        </div>
        <button onClick={handleFilter}>Apply Filters</button>
      </div>
    </div>
  );
};

FilterPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterPopup;
