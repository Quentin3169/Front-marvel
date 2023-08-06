import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/comics.css";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage, setComicsPerPage] = useState(100);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/comics?limit=${comicsPerPage}&skip=${
            (currentPage - 1) * comicsPerPage
          }`
        );

        if (response.status === 200) {
          setComics(response.data.results);
        } else {
          console.error("Aucune data trouvées");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchComics();
  }, [currentPage, comicsPerPage]);

  return (
    <div className="container comics-container">
      {comics.length > 0 ? (
        comics.map((comic, index) => (
          <div key={index} className="comics-card">
            <h2>{comic.title.substring(0, 30)}</h2>
            <img
              src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              alt={comic.title}
            />
          </div>
        ))
      ) : (
        <p>No comics found</p>
      )}
      <div className="pagination-style">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Page précédente
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Page suivante
        </button>
      </div>
    </div>
  );
};

export default Comics;
