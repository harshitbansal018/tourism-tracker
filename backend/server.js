const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();

const connectDB = require('./db'); 
const authRoutes = require('./routes/auth');
const tipRoutes = require('./routes/tips'); 

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log("👉 Incoming request:", req.method, req.url);
  next();
});

// Routes
app.use("/api", authRoutes);
app.use("/api/tips", tipRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hi from Backend!" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});