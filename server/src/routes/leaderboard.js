const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const query = {
      text: "SELECT * from users ORDER BY score DESC LIMIT 10",
    };
    const response = await db.query(query);
    res.json(response.rows);
  } catch (err) {
    console.error("ERROR: ", err);
    res.sendStatus(500);
  }
});

module.exports = router;
