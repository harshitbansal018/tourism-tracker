import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import EcoTipUpload from "./components/EcoTipUpload";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import EcoTourismCards from "./components/EcoTourismCards";

import "./App.css";

const App = () => {

  const [points, setPoints] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user points
  const fetchPoints = async () => {

    try {

      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`http://localhost:8000/api/points/${userId}`);
      const data = await res.json();

      if (res.ok) {
        setPoints(data.points);
      }

    } catch (err) {
      console.error("Error fetching points:", err);
    }

  };

  // When login happens fetch points
  useEffect(() => {

    if (isAuthenticated) {
      fetchPoints();
    }

  }, [isAuthenticated]);

  // Redeem points
  const redeemPoints = async () => {

    try {

      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`http://localhost:8000/api/tips/redeem/${userId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {

        alert("🎉 Points redeemed successfully!");

        // Update points instantly
        setPoints(data.points);

      } else {

        alert(data.message || "Not enough points");

      }

    } catch (err) {

      console.error("Redeem error:", err);

    }

  };

  return (

    <Router>

      <div className="App">

        <Navbar />

        <Routes>

          {/* Login Page */}
          <Route
            path="/"
            element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected Home */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <>
                  <Dashboard />

                  <EcoTourismCards
                    points={points}
                    handleRedeem={redeemPoints}
                  />

                  <EcoTipUpload />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

        </Routes>

        <Footer />

      </div>

    </Router>
  );
};

export default App;