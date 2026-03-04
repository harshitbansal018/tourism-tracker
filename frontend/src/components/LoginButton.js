// src/components/LoginButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // login page
  };

  return (
    <button onClick={handleClick} className="login-btn">
      Login / Register
    </button>
  );
};

export default LoginButton;