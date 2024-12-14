import React, { useState, useEffect } from "react";
import "../css/cocktail.css"; // Use your existing CSS file

function Cocktail() {
  const [query, setQuery] = useState(""); // Search query state
  const [cocktails, setCocktails] = useState([]); // Fetched data state
  const [loading, setLoading] = useState(false); // Loading state

  // Function to fetch cocktails from API
  const fetchCocktails = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setCocktails(data.drinks || []); // Ensure no errors on empty response
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      setCocktails([]);
    }
    setLoading(false);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    if (searchTerm.trim() !== "") {
      fetchCocktails(searchTerm);
    } else {
      setCocktails([]);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <h1>Welcome to Cocktail Page</h1>
      </div>
      <h4>
        "Every cocktail tells a story, a blend of flavors that captivate the
        senses."
      </h4>

      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search for a cocktail..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Display Cocktails */}
      <div className="cocktail-container">
        {loading && <p>Loading...</p>}
        {!loading && cocktails.length === 0 && query && (
          <p className="no-results">No cocktails found. Try another search!</p>
        )}
        <div className="cocktail-grid">
          {cocktails.map((drink) => (
            <div key={drink.idDrink} className="cocktail-card">
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="cocktail-img"
              />
              <h3 className="cocktail-title">{drink.strDrink}</h3>
              <p className="cocktail-category">{drink.strCategory}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cocktail;

  