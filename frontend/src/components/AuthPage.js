import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = ({ setIsAuthenticated }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const baseURL = "http://localhost:8000";

      const url = isLogin
        ? `${baseURL}/api/login`
        : `${baseURL}/api/register`;

      const response = await axios.post(url, form);

      if (isLogin) {

        const user = response.data.user;

        // store userId
        localStorage.setItem("userId", user._id);

        setIsAuthenticated(true);

        alert("Login successful");

        // redirect to home
        navigate("/home");

      } else {

        alert("Registration successful. Please login.");

        setIsLogin(true);
      }

      setForm({ username: "", password: "" });

    } catch (err) {

      alert(err.response?.data?.message || "Something went wrong");

    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page">

        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="switch-btn"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default AuthPage;