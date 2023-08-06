import "../styles/header.css";
import logo from "../assets/logo.png";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import LoginModal from "./LoginModal";

const Header = ({ handleUserLogin }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null); // Ici, on garde l'utilisateur au niveau local pour l'affichage uniquement.

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleLocalUserLogin = (userData) => {
    console.log("Setting user data:", userData);
    setUser(userData);
    handleUserLogin(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="container header-block">
      <img src={logo} alt="logo-marvel" onClick={() => navigate("/")} />
      <div className="header-menu">
        <p onClick={() => navigate("/")}>Personnages</p>
        <p onClick={() => navigate("/comics")}>Comics</p>
        <p onClick={() => navigate("/favoris")}>Favoris</p>
      </div>
      <div className="header-member">
        {user ? (
          <>
            <p>Bonjour, {user.name}</p>
            <button onClick={handleLogout}>Déconnexion</button>{" "}
          </>
        ) : (
          <>
            <p onClick={openLoginModal}>Log in</p>
            <p onClick={openModal}>Sign up</p>
          </>
        )}
      </div>
      {showModal && <Modal closeModal={closeModal} />}
      {showLoginModal && (
        <LoginModal
          onUserLogin={handleLocalUserLogin}
          closeModal={closeLoginModal}
        />
      )}
    </div>
  );
};

export default Header;
