import React, { useState, useEffect } from "react";
import "../css/potter.css"; // Your existing or new CSS file

function Potter() {
  const [characters, setCharacters] = useState([]); // State for storing fetched characters
  const [loading, setLoading] = useState(false); // Loading state
  const [query, setQuery] = useState(""); // Search query state

  const API_URL = "https://www.potterapi.com/v1/characters";
  const API_KEY = "your-api-key"; // Replace with your API key

  // Fetching characters from PotterAPI
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`);
      const data = await response.json();
      setCharacters(data); // Set characters in the state
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    }
    setLoading(false);
  };

  // Fetch characters when component mounts
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
  };

  // Filter characters based on search query
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(query)
  );

  return (
    <>
      {/* Header */}
      <div className="header">
        <h1>Welcome to the Potter Page</h1>
      </div>
      <h4>
        "Welcome to the world of magic, where heroes and villains come to life!"
      </h4>

      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search for a character..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Display Characters */}
      <div className="character-container">
        {loading && <p>Loading...</p>}
        {!loading && filteredCharacters.length === 0 && query && (
          <p className="no-results">No characters found. Try another search!</p>
        )}
        <div className="character-grid">
          {filteredCharacters.map((character) => (
            <div key={character._id} className="character-card">
              <img
                src={character.imageUrl || "default-image.jpg"} // Use a placeholder if no image
                alt={character.name}
                className="character-img"
              />
              <h3 className="character-name">{character.name}</h3>
              <p className="character-house">{character.house}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Potter;
