import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Community.css";

const Community = ({ addPoints }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, image }]);
      addPoints(input.trim().toLowerCase());
      setInput("");
      setImage(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.section
      id="community"
      className="community"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h1
        whileHover={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Community Engagement
      </motion.h1>

      {/* About Eco-friendly Tourism */}
      <motion.div className="info-card" whileHover={{ scale: 1.02 }}>
        <h4>About Eco-friendly Tourism</h4>
        <p>
          Eco-friendly tourism, also known as sustainable tourism, focuses on
          preserving the natural environment and minimizing the negative
          impacts of tourism. It promotes cultural awareness, conserves natural
          resources, and ensures local communities benefit economically.
        </p>
      </motion.div>

      {/* Benefits as Cards */}
      <h4 className="section-title">Benefits of Eco-friendly Tourism:</h4>
      <div className="benefit-cards">
        {[
          "Environmental Protection",
          "Economic Growth",
          "Cultural Preservation",
          "Health Benefits",
        ].map((benefit, index) => (
          <motion.div
            key={index}
            className="benefit-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {benefit}
          </motion.div>
        ))}
      </div>

      {/* Chat Section as Cards */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className="message-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card-content">
              <p>{msg.text}</p>
              {msg.image && (
                <img src={msg.image} alt="Proof" className="proof-image" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your eco-friendly tips..."
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.1, backgroundColor: "#28a745" }}
          whileTap={{ scale: 0.4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Send
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Community;
