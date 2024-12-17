import React, { useEffect, useState } from "react";
import "../css/mealdb.css"; // Existing CSS file

function Meal() {
  const [query, setQuery] = useState(""); // Search query
  const [meals, setMeals] = useState([]); // Fetched meals
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedMeal, setSelectedMeal] = useState(null); // Selected meal for the modal

  // Fetch meals from TheMealDB API
  const fetchMeals = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        setMeals(data.meals);
      } else {
        setMeals([]); // Empty state for no results
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.trim() !== "") {
      fetchMeals(searchTerm);
    } else {
      setMeals([]);
    }
  };

  // Open the modal with the selected meal
  const openModal = (meal) => {
    setSelectedMeal(meal);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedMeal(null);
  };

  // Extract meal ingredients dynamically
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure || ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };
    useEffect(()=> {
      fetchMeals("c")
    }, [])
  return (
    <>
      {/* Header Section */}
      <div className="header">
        <h1>Welcome to the Meal Explorer</h1>
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

      {/* Main Content */}
      <div className="meal-container">
        {loading && <p className="loading">Loading meals...</p>}

        {!loading && meals.length === 0 && query && (
          <p className="no-results">No meals found. Try another search!</p>
        )}

        {/* Meal Grid */}
        <div className="meal-grid">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-card"
              onClick={() => openModal(meal)}
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

      {/* Modal Popup */}
      {selectedMeal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedMeal.strMeal}</h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="modal-img"
            />
            <h3>Ingredients</h3>
            <ul>
              {getIngredients(selectedMeal).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedMeal.strInstructions}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Meal;
