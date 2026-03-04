import React from "react";
import "./EcoTourismCards.css";

export default function EcoTourismCards({ points, handleRedeem }) {
  return (
    <section className="cards-section">
      <div className="cards-container">
        
        {/* Card 1 - Redeem Points */}
        <div className="card">
          <h2 className="card-title">Redeem Your Points</h2>
          <p className="card-text">You have {points} points available.</p>
          <button className="card-btn" onClick={handleRedeem}>
            Redeem for Discount
          </button>
        </div>

        {/* Card 2 - Community Engagement */}
        <div className="card">
          <h2 className="card-title">Community Engagement</h2>
          <p className="card-text">
            Eco-friendly tourism, also known as sustainable tourism, focuses on
            preserving the natural environment and minimizing the negative
            impacts of tourism. It promotes cultural awareness, conserves
            natural resources, and ensures local communities benefit
            economically.
          </p>
        </div>

        {/* Card 3 - Benefits */}
        <div className="card">
          <h2 className="card-title">Benefits of Eco-friendly Tourism</h2>
          <ul className="benefits-list">
            <li>🌱 Environmental Protection</li>
            <li>💰 Economic Growth</li>
            <li>🤝 Community Empowerment</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
