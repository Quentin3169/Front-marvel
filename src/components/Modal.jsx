import React, { useState } from "react";
import axios from "axios";
import "../styles/modal.css";

const Modal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/signup",
        formData
      );

      if (response.status === 201) {
        alert("Inscription réussie !");
        closeModal();
      } else {
        alert("Erreur lors de l'inscription.");
      }
    } catch (error) {
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />

          <button type="submit">S'inscrire</button>
        </form>
        <button className="close-button" onClick={closeModal}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
