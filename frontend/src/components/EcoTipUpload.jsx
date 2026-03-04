import React, { useState } from "react";
import "./EcoTipUpload.css";

const EcoTipUpload = () => {
  const [tip, setTip] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tip.trim() || !file) {
      alert("Please enter a tip and upload an image!");
      return;
    }

   const formData = new FormData();
formData.append("tip", tip.trim());
formData.append("file", file);
formData.append("userId", localStorage.getItem("userId")); // 🔥 ADD THIS

    try {
      const res = await fetch("https://tourism-tracker.onrender.com/api/tips", {
        method: "POST",
        body: formData,
      });

      // ✅ Check if request failed
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Server error. Check backend.");
        return;
      }

      const data = await res.json();

      // ✅ Match backend response
      if (data.success && data.status === "pending") {
        alert("📩 Tip submitted! Waiting for admin approval.");
      } else {
        alert(data.message || "Something went wrong.");
      }

    } catch (err) {
      console.error("Error submitting:", err);
      alert("⚠️ Error connecting to backend.");
    }

    setTip("");
    setFile(null);
  };

  return (
    <div className="eco-tip-upload">
      <h2 className="upload-title">Share Your Eco-Friendly Tips 🌱</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <textarea
          className="eco-input"
          placeholder="Write your eco-friendly tip..."
          value={tip}
          onChange={(e) => setTip(e.target.value)}
        />

        <input
          type="file"
          className="file-input"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="upload-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default EcoTipUpload;