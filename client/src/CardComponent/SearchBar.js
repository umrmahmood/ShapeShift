import react, { useState } from 'react';
// destruction of data
const SearchBar = ({data}) => {
    const [searchQuery, setSeacrhQuery] = useState("");
    const [searchResults, setSeacrhResults] = useState([]);

    const handleSearch = (e)=>{
        const query = e.target.value;
        setSeacrhQuery(query);

        const filteredResult = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    setSeacrhResults(filteredResult);
    }

return(
    <div className="main-page">
<div className="search-box">
{/* search field */}
<input
                    type="text"
                    placeholder="Searching for"
                    value={searchQuery}
                    onChange={handleSearch}
                />
<ul>
{searchResults.map((result, index) =>(
    <li key={index}>{result}</li>
))}
</ul>
</div>
    </div>
)
}

export default SearchBar;