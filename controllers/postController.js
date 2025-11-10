const pool = require("../config/db");

exports.getPostComments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM comments WHERE post_id = $1 LIMIT $2 OFFSET $3",
            [id, limit, offset]
        );
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ error: "No comments found on that post." });
        }
        res.json({ comments: result.rows, page, limit });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const result = await pool.query(
            "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        res.json({
            message: "Fetched all posts from database",
            posts: result.rows,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found!" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.searchPosts = async (req, res) => {
    try {
        const { q } = req.query;
        const result = await pool.query(
            "SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1",
            [`%${q}%`]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found!" });
        }
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await pool.query(
            "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found!" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM posts WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found!" });
        }
        res.json({ message: "Post deleted", post: result.rows[0] });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.addPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res
                .status(400)
                .json({ error: "Post needs content and title." });
        }
        const result = await pool.query(
            "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );
        res.json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
