import React from "react";  
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate(); // initialize navigation

  return (
    <motion.section
      id="dashboard"
      className="dashboard"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Slider Container for Background Images */}
      <div className="slider-container"></div>

      <h2>Your Eco-Friendly Actions</h2>
      <ul>
        {/* Add gesture animations to list items */}
        <motion.li
          whileTap={{ scale: 0.9, color: "#007bff" }}
          drag="x"
          dragConstraints={{ left: -50, right: 50 }}
        >
          Used public transport - 10 points
        </motion.li>
        <motion.li
          whileTap={{ scale: 0.9, color: "#28a745" }}
          drag="x"
          dragConstraints={{ left: -50, right: 50 }}
        >
          Recycled waste - 15 points
        </motion.li>
        <motion.li
          whileTap={{ scale: 0.9, color: "#ffc107" }}
          drag="x"
          dragConstraints={{ left: -50, right: 50 }}
        >
          Used reusable bags - 5 points
        </motion.li>
      </ul>

     
    </motion.section>
  );
};

export default Dashboard;
