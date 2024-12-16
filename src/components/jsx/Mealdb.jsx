import React, { useState } from "react";
import "../css/mealdb.css"; // CSS file for styling

function Meal() {
  const [query, setQuery] = useState(""); // Search query state
  const [meals, setMeals] = useState([]); // Fetched meal data state
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedMeal, setSelectedMeal] = useState(null); // Selected meal state

  // Function to fetch meals from API
  const fetchMeals = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setMeals(data.meals || []); // Set meals or empty array if no results
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

  // Handle click on meal image to display modal
  const handleMealClick = (meal) => {
    setSelectedMeal(meal); // Set the selected meal
  };

  // Close the modal
  const handleClearSelection = () => {
    setSelectedMeal(null); // Clear the selected meal
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <h1>Welcome to Meal Page</h1>
      </div>
      <h4>
        "Every dish is a journey, a story told through flavors and ingredients."
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

      {/* Display Meal Details in Popup */}
      {selectedMeal && (
        <div className="meal-modal">
          <div className="modal-content">
            <button onClick={handleClearSelection} className="clear-btn">
              &times; Close
            </button>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="meal-detail-img"
            />
            <h2>{selectedMeal.strMeal}</h2>
            <p>
              <strong>Category:</strong> {selectedMeal.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {selectedMeal.strArea}
            </p>
            <p>
              <strong>Instructions:</strong> {selectedMeal.strInstructions}
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = selectedMeal[`strIngredient${i}`];
                const measure = selectedMeal[`strMeasure${i}`];
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

      {/* Display Meals */}
      <div className="meal-container">
        {loading && <p>Loading...</p>}
        {!loading && meals.length === 0 && query && (
          <p className="no-results">No meals found. Try another search!</p>
        )}
        <div className="meal-grid">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-card"
              onClick={() => handleMealClick(meal)}
            >
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

export default Meal;
