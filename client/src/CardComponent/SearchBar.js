import react, { useState } from "react";
// destruction of data
const SearchBar = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (trigger) => {
    if (trigger === "Enter" || trigger === "Button") {
      const filteredResults = data.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    handleSearch("Button");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch("Enter");
    }
  };

  return (
    <div className="main-page">
      <div className="search-box">
        {/* search field */}
        <input
          type="text"
          placeholder="Searching for"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <ul>
          <button onClick={handleButtonClick}>Search</button>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
