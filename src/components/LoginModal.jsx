import React, { useState } from "react";
import axios from "axios";
import "../styles/loginmodal.css";

const LoginModal = ({ closeModal, onUserLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        formData
      );

      if (response.status === 200) {
        alert("Vous êtes maintenant connecté !");
        console.log("User data from API:", response.data);
        onUserLogin(response.data);
        closeModal();
      } else {
        alert("Erreur lors de la connexion.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input type="submit" value="Se connecter" />
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
