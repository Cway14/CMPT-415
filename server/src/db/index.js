require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  // connectionString: "postgres://root:root@localhost:5432/postgres",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
