const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog_api",
    password: "pgpassword",
    port: 5432,
});

module.exports = pool;
