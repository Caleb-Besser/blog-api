const env = require("dotenv");
env.config();

const { authenticateToken } = require("./middleware/auth");

const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const port = process.env.PORT || 3000;

const pool = require("./config/db");

const app = express();

const jwt = require("jsonwebtoken");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
