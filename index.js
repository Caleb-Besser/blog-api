const env = require("dotenv");
env.config();

const express = require("express");

const port = process.env.PORT || 3000;

const app = express();

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
