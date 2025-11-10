const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.post("/register", authController.register);

module.exports = router;
