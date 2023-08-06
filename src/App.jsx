// Package
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//Component

import Header from "./components/Header";
import Modal from "./components/Modal";

//Pages

import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleUserLogin = (userData) => {
    setLoggedInUser(userData.user);
  };

  return (
    <Router>
      <Header handleUserLogin={handleUserLogin} />
      <Routes>
        <Route path="/" element={<Home user={loggedInUser} />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris user={loggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
