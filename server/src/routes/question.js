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
    } catch (err) {
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

router.get("/getQuestion", async (req, res) => {
    const { uid, chapter } = req.query;

    try {
        let query = {
            text: `SELECT id, question, options, chapter FROM questions WHERE id NOT IN (SELECT question_id FROM answers WHERE user_id = '${uid}') AND chapter = '${chapter}'`,
        };

        // select random row from the result
        let response = await db.query(query);

        if (response.rows.length === 0) {
            res.json({ message: "ERROR: No more questions in this chapter" });
            return;
        }

        const randomIndex = Math.floor(Math.random() * response.rows.length);
        res.json(response.rows[randomIndex]);
    } catch (err) {
        console.error("ERROR: ", err);
        res.sendStatus(500);
    }
});

router.post("/submit", async (req, res) => {
    const { uid, answer } = req.body;
    const { id: question_id } = req.query;
    try {
        const query = {
            text: `
            INSERT INTO answers (user_id, question_id, answer, is_correct)
            VALUES (${uid}, ${question_id}, '${answer}', ((
                SELECT EXISTS (
                  SELECT *
                  FROM questions
                  WHERE id = ${question_id} AND answers = '${answer}'
              )::boolean
            ))) returning is_correct;
            UPDATE users SET score = score + (50 - 10*(SELECT COUNT(*) FROM answers WHERE question_id = ${question_id} AND user_id = ${uid}))*(SELECT EXISTS (
                  SELECT *
                  FROM questions
                  WHERE id = ${question_id} AND answers = '${answer}'
              )::int) WHERE id = ${uid};`,
        };

        const response = await db.query(query);
        if (!response[0].rows[0].is_correct) {
            // if answer is wrong, get feedback
            const feedbackQuery = {
                text: `SELECT feedback FROM questions WHERE id = ${question_id}`,
            };
            const feedbackResponse = await db.query(feedbackQuery);

            res.json({
                isCorrect: response[0].rows[0].is_correct,
                feedback: feedbackResponse.rows[0].feedback,
            });
            return;
        }

        res.json({ isCorrect: response[0].rows[0].is_correct });
    } catch (err) {
        console.error("ERROR: ", err);
        res.sendStatus(500);
    }
});

module.exports = router;
