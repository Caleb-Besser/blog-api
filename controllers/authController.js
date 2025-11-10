const pool = require("../config/db");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
            [username, email, hashedPassword]
        );
        res.json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
