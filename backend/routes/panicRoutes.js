const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/panicController");

router.post("/panic", ctrl.triggerPanic);

module.exports = router;
