import React, { useState, useEffect } from "react";
import "./QuestionList.css";

function convertToJS(data) {
    return data.map((question) => ({
        ...question,
        options: question.options.split(","),
        answers: question.answers.split(","),
    }));
}

function QuestionList() {
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

    return (
        <div className="question-list">
            <h1>Questions</h1>
            {questions.map((question) => (
                <div key={question.id}>
                    <h2>{question.topic}</h2>
                    <p>Chapter {question.chapter}</p>
                    <p>{question.question}</p>
                    <ul>
                        {question.options.map((option) => (
                            <li key={option}>{option}</li>
                        ))}
                    </ul>
                    <p>Answer: {question.answers.join(", ")}</p>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;
