const express = require("express");

const pool = require("./db");

const app = express();

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
