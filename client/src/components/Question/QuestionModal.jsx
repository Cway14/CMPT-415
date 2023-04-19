import React, { useState, useEffect } from "react";

function convertToJS(data) {
    return data.map((question) => ({
        ...question,
        options: question.options.split(","),
        answers: question.answers.split(","),
    }));
}

function QuestionModal({ chapter, showModal }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // fetch the list of questions from an API or database
        // and update the state using setQuestions
        const fetchQuestions = async () => {
            const response = await fetch(
                process.env.REACT_APP_API + "/questions/getquestions"
            );
            const data = await response.json();
            const jsData = convertToJS(data);
            console.log(jsData);
            setQuestions(jsData);
        };
        fetchQuestions();
    }, []);

    function getQuestion() {
        const filteredQuestions = questions.filter(
            (question) => question.chapter === chapter
        );
        // TODO: filter out questions that have already been asked

        const question =
            filteredQuestions[
                Math.floor(Math.random() * filteredQuestions.length)
            ];
        return question;
    }

    return <>{showModal && <QuestionModal question={getQuestion()} />}</>;
}

export default QuestionModal;
