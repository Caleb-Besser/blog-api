const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

const postController = require("../controllers/postController");

// Get all comments on a post
router.get("/:id/comments", postController.getPostComments);

// Get all posts
router.get("/", postController.getAllPosts);

// Get post by id
router.get("/:id", authenticateToken, postController.getPost);

// Update post by id
router.put("/:id", authenticateToken, postController.updatePost);

// Delete post by id
router.delete("/:id", authenticateToken, postController.deletePost);

// Post post
router.post("/", authenticateToken, postController.addPost);

module.exports = router;
