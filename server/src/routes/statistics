const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
    const { id } = req.query;
    try {
        const query = {
            text: "SELECT count(*) FROM questions join answers on answers.question_id = questions.id where answers.user_id = $1 and answers.answer = questions.answers ",
            values: [id],
        };
        const response = await db.query(query);

        const totalAnswered = {
            text: "select count(*) from answers where user_id = $1 group by question_id",
            values: [id],
        };
        const totalAnsweredResponse = await db.query(totalAnswered);
        res.json({
            totalCorrect: parseInt(response.rows[0].count, 10),
            totalAnswered: totalAnsweredResponse.rows.length,
        });
    } catch (error) {
        console.error("ERROR: ", error);
        res.sendStatus(500);
    }
});

module.exports = router;
