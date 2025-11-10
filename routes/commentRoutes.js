const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const commentController = require("../controllers/commentController");

router.post("/", authenticateToken, commentController.postComment);

router.delete("/:id", authenticateToken, commentController.deleteComment);

router.put("/:id", authenticateToken, commentController.editComment);

module.exports = router;
