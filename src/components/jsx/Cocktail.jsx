import React, { useEffect, useState } from "react";
import "../css/cocktail.css"; // Existing CSS file

function Cocktail() {
  const [query, setQuery] = useState(""); // Search query
  const [cocktails, setCocktails] = useState([]); // Fetched cocktails
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedCocktail, setSelectedCocktail] = useState(null); // Selected cocktail for the modal

  // Fetch cocktails from TheCocktailDB API
  const fetchCocktails = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      if (data.drinks && data.drinks.length > 0) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]); // Empty state for no results
      }
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.trim() !== "") {
      fetchCocktails(searchTerm);
    } else {
      setCocktails([]);
    }
  };

  // Open the modal with the selected cocktail
  const openModal = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedCocktail(null);
  };

  // Extract cocktail ingredients dynamically
  const getIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure || ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  useEffect(()=> {
    fetchCocktails("c")
  }, [])

  return (
    <>
      {/* Header Section */}
      <div className="header">
        <h1>Welcome to the Cocktail Explorer</h1>
      </div>
      <h4>
        "Explore a world of refreshing cocktails, crafted with love and flavors."
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

      {/* Main Content */}
      <div className="cocktail-container">
        {loading && <p className="loading">Loading cocktails...</p>}

        {!loading && cocktails.length === 0 && query && (
          <p className="no-results">No cocktails found. Try another search!</p>
        )}

        {/* Cocktail Grid */}
        <div className="cocktail-grid">
          {cocktails.map((drink) => (
            <div
              key={drink.idDrink}
              className="cocktail-card"
              onClick={() => openModal(drink)}
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

      {/* Modal Popup */}
      {selectedCocktail && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedCocktail.strDrink}</h2>
            <img
              src={selectedCocktail.strDrinkThumb}
              alt={selectedCocktail.strDrink}
              className="modal-img"
            />
            <h3>Ingredients</h3>
            <ul>
              {getIngredients(selectedCocktail).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedCocktail.strInstructions}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Cocktail;
