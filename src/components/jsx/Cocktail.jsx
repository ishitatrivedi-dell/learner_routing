import React, { useState, useEffect } from "react";
import "../css/cocktail.css"; // CSS file for styling

function Cocktail() {
  const [query, setQuery] = useState(""); // Search query state
  const [cocktails, setCocktails] = useState([]); // Fetched cocktail data state
  const [loading, setLoading] = useState(false); // Loading state
  const [randomCocktails, setRandomCocktails] = useState([]); // Multiple random cocktails state

  // Function to fetch multiple random cocktails from API
  const fetchRandomCocktails = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: 15 }).map(() =>
          fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      const cocktailsData = data.map((item) => item.drinks[0]);
      setRandomCocktails(cocktailsData);
    } catch (error) {
      console.error("Error fetching random cocktails:", error);
    }
  };

  // Function to fetch cocktails from API based on search
  const fetchCocktails = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchTerm}`
      );
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging line to log the response
      setCocktails(data.drinks || []); // Set cocktails or empty array if no results
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      setCocktails([]);
    }
    setLoading(false);
  };

  // Handle search input change
  // const handleSearch = (e) => {
  //   const searchTerm = e.target.value;
  //   setQuery(searchTerm);
  //   if (searchTerm.trim() !== "") {
  //     fetchCocktails(searchTerm);
  //   } else {
  //     setCocktails([]); // Clear results if search is empty
  //   }
  // };

  // Fetch random cocktails on component mount
  useEffect(() => {
    fetchRandomCocktails();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Welcome to Cocktail Page</h1>
      </div>
      <h4>
        "A cocktail is a journey into a world of flavors and creativity."
      </h4>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a cocktail..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Display Multiple Random Cocktails */}
      <div className="random-cocktail-container">
        {randomCocktails.length > 0 &&
          randomCocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="random-cocktail-card">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="random-cocktail-img"
              />
              <h3 className="random-cocktail-title">{cocktail.strDrink}</h3>
            </div>
          ))}
      </div>

      <div className="cocktail-container">
        {loading && <p>Loading...</p>}
        {!loading && cocktails.length === 0 && query && (
          <p className="no-results">No cocktails found. Try another search!</p>
        )}

        <div className="cocktail-grid">
          {cocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="cocktail-card">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="cocktail-img"
              />
              <h3 className="cocktail-title">{cocktail.strDrink}</h3>
              <p className="cocktail-category">{cocktail.strCategory}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cocktail;
