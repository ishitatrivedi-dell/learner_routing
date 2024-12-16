import React, { useState, useEffect } from "react";
import "../css/cocktail.css"; // Use your existing CSS file

function Cocktail() {
  const [query, setQuery] = useState(""); // Search query state
  const [cocktails, setCocktails] = useState([]); // Fetched data state
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedCocktail, setSelectedCocktail] = useState(null); // Selected cocktail state

  // Function to fetch cocktails from API
  const fetchCocktails = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setCocktails(data.drinks || []);
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

  // Handle click on cocktail image
  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  // Clear the selected cocktail
  const handleClearSelection = () => {
    setSelectedCocktail(null);
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

      {/* Display Cocktail Details in Popup */}
      {selectedCocktail && (
        <div className="cocktail-modal">
          <div className="modal-content">
            <button onClick={handleClearSelection} className="clear-btn">
              &times; Close
            </button>
            <img
              src={selectedCocktail.strDrinkThumb}
              alt={selectedCocktail.strDrink}
              className="cocktail-detail-img"
            />
            <h2>{selectedCocktail.strDrink}</h2>
            <p><strong>Category:</strong> {selectedCocktail.strCategory}</p>
            <p><strong>Alcoholic:</strong> {selectedCocktail.strAlcoholic}</p>
            <p><strong>Glass:</strong> {selectedCocktail.strGlass}</p>
            <p><strong>Instructions:</strong> {selectedCocktail.strInstructions}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                const ingredient = selectedCocktail[`strIngredient${i}`];
                const measure = selectedCocktail[`strMeasure${i}`];
                return ingredient ? (
                  <li key={i}>
                    {ingredient} {measure ? `- ${measure}` : ""}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Display Cocktails */}
      <div className="cocktail-container">
        {loading && <p>Loading...</p>}
        {!loading && cocktails.length === 0 && query && (
          <p className="no-results">No cocktails found. Try another search!</p>
        )}
        <div className="cocktail-grid">
          {cocktails.map((drink) => (
            <div
              key={drink.idDrink}
              className="cocktail-card"
              onClick={() => handleCocktailClick(drink)}
            >
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
