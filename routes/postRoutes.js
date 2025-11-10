const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

const postController = require("../controllers/postController");

router.get("/:id/comments", postController.getPostComments);

router.get("/search", postController.searchPosts);

router.get("/", postController.getAllPosts);

router.get("/:id", authenticateToken, postController.getPost);

router.put("/:id", authenticateToken, postController.updatePost);

router.delete("/:id", authenticateToken, postController.deletePost);

router.post("/", authenticateToken, postController.addPost);

module.exports = router;
