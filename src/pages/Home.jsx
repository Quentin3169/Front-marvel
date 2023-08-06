import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ user }) => {
  const [characters, setCharacters] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/characters`);
        setCharacters(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCharacters();
  }, []);

  const handleFavoriteClick = async (characterId) => {
    console.log(user);
    if (user) {
      try {
        const response = await axios.post(
          `http://localhost:5001/user/favorite`,
          {
            userId: user.id,
            characterId: characterId,
          }
        );

        if (response.status === 200) {
          console.log("Favori mis à jour avec succès !");
        } else {
          console.error("Erreur lors de la mise à jour du favori.");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du favori:", error);
      }
    } else {
      console.log("Veuillez vous connecter pour ajouter des favoris.");
    }
  };

  const filteredCharacters = characters
    ? characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="container">
      <input
        className="filter-characters"
        type="text"
        placeholder="Recherchez votre marvel"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="characters-container">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div key={character._id} className="character-card">
              <div className="character-image">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
                <FontAwesomeIcon
                  title="Ajoutez à vos favoris"
                  icon={faHeart}
                  size="2x"
                  className="heart-icon"
                  onClick={() => handleFavoriteClick(character._id)}
                />
              </div>
              <div>
                <h2>{character.name}</h2>
                {/* <p>{character.description}</p> */}
              </div>
            </div>
          ))
        ) : (
          <p>Votre recherche n'a pas abouti</p>
        )}
      </div>
    </div>
  );
};

export default Home;
