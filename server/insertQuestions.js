var fs = require("fs");
const db = require("./src/db");

var questions = JSON.parse(fs.readFileSync("./QuizQuestions.json", "utf8"));

async function insertQuestions() {
    const query = {
        text: `INSERT INTO questions (topic, chapter, question, options, answers, feedback) VALUES `,
    };

    for (var i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        const { topic, chapter, question, options, answers, feedback } =
            currentQuestion;
        const json_options = JSON.stringify(options);
        const json_answers = JSON.stringify(answers);
        query.text += `('${topic}', '${chapter}', '${question}', '${json_options}', '${json_answers}' , '${feedback}')`;
        if (i < questions.length - 1) {
            query.text += ",";
        }
    }

    query.text += ";";

    try {
        const response = await db.query(query);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

insertQuestions();
