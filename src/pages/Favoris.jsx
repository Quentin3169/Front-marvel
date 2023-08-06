import React, { useState, useEffect } from "react";
import axios from "axios";

const Favoris = ({ user }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      try {
        const allCharacters = await axios.get(
          `http://localhost:5001/characters`
        );

        if (user) {
          const response = await axios.get(
            `http://localhost:5001/user/${user.id}/favorites`
          );
          const userFavorites = response.data.favorites;

          const filtered = allCharacters.data.results.filter((character) =>
            userFavorites.includes(character._id)
          );
          setFavoriteCharacters(filtered);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteCharacters();
  }, [user]);

  return (
    <div className="container">
      <h1>Mes personnages préférés</h1>
      <div className="characters-container">
        {favoriteCharacters.map((character) => (
          <div key={character._id} className="character-card">
            <div className="character-image">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
            </div>
            <div>
              <h2>{character.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoris;
