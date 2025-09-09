const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ctrl = require("../controllers/touristController");

// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.post("/register", upload.single("photo"), ctrl.register);
router.get("/:id", ctrl.getProfile);
router.post("/:id/startJourney", ctrl.startJourney);

module.exports = router;
