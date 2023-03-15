const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/new-user", async (req, res) => {
  const { name, firebase_uid, profile_pic } = req.body;
  try {
    const query = {
      text: "insert into users (created_at, name, score, firebase_uid, profile_picture) values (now(), $1, 0, $2, $3)",
      values: [name, firebase_uid, profile_pic],
    };
    const response = await db.query(query);
    res.json(response);
  } catch (err) {
    console.error("ERROR: ", err);
    res.sendStatus(500);
  }
});

module.exports = router;
