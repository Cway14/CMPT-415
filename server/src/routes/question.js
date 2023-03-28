const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/getQuestions", async (req, res) => {
    try {
        const query = {
            text: `SELECT * FROM questions`,
        };
        const response = await db.query(query);
        console.log(response.rows);
        res.json(response.rows);
    }
    catch (err) {
        console.error("ERROR: ", err);
        res.sendStatus(500);
    }
});

router.post("/addQuestion", async (req, res) => {
  const { topic, chapter, question, options, answers } = req.body;
  try {
    const query = {
      text: `INSERT INTO questions (topic, chapter, question, options, answers)
      VALUES ('${topic}', '${chapter}', '${question}', '${options}', '${answers}')
      RETURNING id`,
    };
    const response = await db.query(query);
    res.json(response.rows[0]);
  } catch (err) {
    console.error("ERROR: ", err);
    res.sendStatus(500);
  }
});

module.exports = router;
