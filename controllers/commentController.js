const pool = require("../config/db");

exports.postComment = async (req, res) => {
    try {
        const { content, post_id } = req.body;
        if (!content || !post_id) {
            res.status(400).json({ error: "Content or Post_Id not given." });
        }

        const result = await pool.query(
            "INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *",
            [content, req.user.userId, post_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await pool.query(
            "SELECT * FROM comments WHERE id = $1",
            [id]
        );
        if (comment.rows.length === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }
        if (comment.rows[0].user_id === req.user.userId) {
            const result = await pool.query(
                "DELETE FROM comments WHERE id = $1 RETURNING *",
                [id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Comment not found." });
            }
            res.json({ message: "Deleted comment.", comment: result.rows[0] });
        } else {
            return res.status(403).json({ error: "Not Authorized." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.editComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await pool.query(
            "SELECT * FROM comments WHERE id = $1",
            [id]
        );

        if (comment.rows.length === 0) {
            return res.status(404).json({ error: "Comment not found." });
        }

        if (comment.rows[0].user_id === req.user.userId) {
            const result = await pool.query(
                "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
                [content, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Comment not found!" });
            }
            res.json(result.rows[0]);
        } else {
            return res.status(403).json({ error: "Not Authorized." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
