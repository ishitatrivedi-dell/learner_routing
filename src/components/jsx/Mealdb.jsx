import React, { useState, useEffect } from "react";
import "../css/mealdb.css"; // CSS file for styling

function Meal() {
  const [query, setQuery] = useState(""); // Search query state
  const [meals, setMeals] = useState([]); // Fetched meal data state
  const [loading, setLoading] = useState(false); // Loading state
  const [randomMeals, setRandomMeals] = useState([]); // Multiple random meals state

  // Function to fetch multiple random meals from API
  const fetchRandomMeals = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      const mealsData = data.map((item) => item.meals[0]);
      setRandomMeals(mealsData);
    } catch (error) {
      console.error("Error fetching random meals:", error);
    }
  };

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
      setMeals([]); // Clear results if search is empty
    }
  };

  // Fetch random meals on component mount
  useEffect(() => {
    fetchRandomMeals();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Welcome to Meal Page</h1>
      </div>
      <h4>
        "Every dish is a journey, a story told through flavors and ingredients."
      </h4>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a meal..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Display Multiple Random Meals */}
      <div className="random-meal-container">
        {randomMeals.length > 0 &&
          randomMeals.map((meal) => (
            <div key={meal.idMeal} className="random-meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="random-meal-img"
              />
              <h3 className="random-meal-title">{meal.strMeal}</h3>
            </div>
          ))}
      </div>

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

export default Meal;
