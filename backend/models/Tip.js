const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // assuming you have a User model
    
  },
  tip: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tip", tipSchema);