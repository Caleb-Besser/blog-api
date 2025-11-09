const express = require("express");

const pool = require("./db");

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database connected!", time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/posts", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        res.json({
            message: "Fetched all posts from database",
            posts: result.rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/posts/:id", async (req, res) => {
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
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/posts/:id", async (req, res) => {
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
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/posts/:id", async (req, res) => {
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
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/posts", async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(500).json({ error: "wrong post body" });
        }
        const result = await pool.query(
            "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
