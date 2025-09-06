const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/touristController");

router.post("/register", ctrl.register);
router.get("/:id", ctrl.getProfile);
router.post("/:id/startJourney", ctrl.startJourney);

module.exports = router;

