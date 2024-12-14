import React, { useState, useEffect } from "react";
import "../css/mealdb.css"; // Use your existing or new CSS file

function Mealdb() {
  const [query, setQuery] = useState(""); // Search query state
  const [meals, setMeals] = useState([]); // Fetched meals data state
  const [loading, setLoading] = useState(false); // Loading state

  // Function to fetch meals from API
  const fetchMeals = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setMeals(data.meals || []); // Ensure no errors on empty response
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
    }
    setLoading(false);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    if (searchTerm.trim() !== "") {
      fetchMeals(searchTerm);
    } else {
      setMeals([]);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <h1>Welcome to the MealDB Page</h1>
      </div>
      <h4>
        "Good food brings people together and leaves lasting memories."
      </h4>

      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search for a meal..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Display Meals */}
      <div className="meal-container">
        {loading && <p>Loading...</p>}
        {!loading && meals.length === 0 && query && (
          <p className="no-results">No meals found. Try another search!</p>
        )}
        <div className="meal-grid">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-img"
              />
              <h3 className="meal-title">{meal.strMeal}</h3>
              <p className="meal-category">{meal.strCategory}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Mealdb;
