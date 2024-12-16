import React, { useEffect, useState } from "react";
import "../css/potter.css"; // Add relevant styles in potter.css

function Potter() {
  const [characters, setCharacters] = useState([]); // State to store character data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the PotterAPI
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://potterapi-fedeperin.vercel.app/en/characters");
        if (!response.ok) {
          throw new Error("Failed to fetch character data");
        }
        const data = await response.json();
        setCharacters(data); // Set fetched characters to state
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="potter-container">
      {/* Header */}
      <header className="potter-header">
        <h1>Harry Potter Characters</h1>
        <h4>
          Dive into the magical world and explore your favorite characters from the wizarding world!
        </h4>
      </header>

      {/* Show loading message */}
      {loading && <p className="loading">Loading characters...</p>}

      {/* Show error message if there's an issue */}
      {error && <p className="error">{error}</p>}

      {/* Character Grid */}
      {!loading && !error && (
        <div className="character-grid">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <img
                src={character.image || "https://via.placeholder.com/150"}
                alt={character.name}
                className="character-image"
              />
              <h3 className="character-name">{character.name}</h3>
              <p className="character-house">{character.house || "Unknown House"}</p>
              <p className="character-role">
                <strong>Role:</strong> {character.role || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Potter;
