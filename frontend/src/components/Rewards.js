import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./Rewards.css";

const Rewards = ({ points, handleRedeem }) => {
  return (
    <motion.section
      id="rewards"
      className="rewards"
      initial={{ opacity: 0, y: 100 }} // Starts hidden and slightly off-screen
      whileInView={{ opacity: 1, y: 2 }} // Fades in and moves to its original position
      transition={{ duration: 1.2, ease: "easeOut" }} // Smooth easing for animation
      viewport={{ twice: true, amount: 0.6 }} // Trigger animation only once, when 20% of the component is visible
    >
      <h2>Redeem Your Points</h2>
      <p>You have {points} points available.</p>
      <motion.button
        onClick={handleRedeem}
        whileHover={{ scale: 1.1, backgroundColor: "#28a745" }} // Enlarge and change color on hover
        whileTap={{ scale: 1.9 }} // Slightly shrink on tap
        transition={{ type: "spring", stiffness: 300 }}
      >
        Redeem for Discount
      </motion.button>
    </motion.section>
  );
};

export default Rewards;
