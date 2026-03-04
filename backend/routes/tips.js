const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Tip = require("../models/Tip");
const router = express.Router();
const User = require("../models/User");


// Multer setup with diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure uploads/ exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});
router.post("/check", (req, res) => {
  res.json({ message: "POST check working" });
});
// POST /api/tips
// POST /api/tips
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { tip } = req.body;
    const file = req.file;

    if (!tip || !file) {
      return res.status(400).json({ error: "Tip and image are required" });
    }

    // ✅ Save as pending
    const newTip = new Tip({
      user: req.body.userId,
      tip,
      imageUrl: `/uploads/${file.filename}`,
      status: "pending",  // use status instead of verified
    });

    await newTip.save();

    res.json({
      success: true,
      message: "Tip submitted for admin approval",
      status: "pending",
    });

  } catch (err) {
  console.error("❌ REAL ERROR:", err);
  res.status(500).json({ error: err.message });
}
});
// PUT /api/tips/approve/:id
router.put("/approve/:id", async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    if (tip.status === "approved") {
      return res.json({ message: "Already approved" });
    }

    if (!tip.user) {
      return res.status(400).json({ error: "Tip has no associated user" });
    }

    tip.status = "approved";
    await tip.save();

    await User.findByIdAndUpdate(tip.user, {
      $inc: { points: 10 }
    });

    res.json({ success: true });

  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// GET /api/tips/pending
router.get("/pending", async (req, res) => {
  try {
    const tips = await Tip.find({ status: "pending" });

    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pending tips" });
  }
});
// PUT /api/tips/reject/:id
router.put("/reject/:id", async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    tip.status = "rejected";
    await tip.save();

    res.json({
      success: true,
      message: "Tip rejected successfully"
    });

  } catch (err) {
    res.status(500).json({ error: "Rejection failed" });
  }
});
// Redeem points
router.put("/redeem/:userId", async (req, res) => {

  try {

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.points < 10) {
      return res.status(400).json({ message: "Not enough points" });
    }

    user.points -= 10;

    await user.save();

    res.json({
      message: "Points redeemed",
      points: user.points
    });

  } catch (err) {

    console.error("Redeem error:", err);

    res.status(500).json({ message: "Server error" });

  }

});
module.exports = router;
