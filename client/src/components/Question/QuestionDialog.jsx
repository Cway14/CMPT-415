import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import "./QuestionDialog.css";
import { useQuestion } from "context/QuestionContext";

const QuestionDialog = ({ question }) => {
    const [selected, setSelected] = useState([]);
    const [feedback, setFeedback] = useState("");

    const { userProfile, getUserProfile } = useAuth();
    const { hideQuestion, changeLeverState } = useQuestion();

    const handleSelect = (option) => {
        const index = selected.indexOf(option);
        if (index === -1) {
            setSelected([...selected, option]);
        } else {
            const updatedSelected = [...selected];
            updatedSelected.splice(index, 1);
            setSelected(updatedSelected);
        }
    };

    const handleSubmit = async () => {
        // send the question to the server to update the user's progress
        const response = await fetch(
            process.env.REACT_APP_API + "/questions/submit?id=" + question.id,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid: userProfile.id, answer: selected }),
            }
        );

        const data = await response.json();

        const { isCorrect } = data;

        if (isCorrect) {
            setFeedback("Correct!");

            hideQuestion();

            // update coins
            await getUserProfile();

            // update lever status
            changeLeverState();
        } else {
            setFeedback("Incorrect, try again!");
        }
    };

    return (
        <div className="question-dialog">
            <div className="question-container">
                <h2 className="question">{question.question}</h2>
                <div className="options-container">
                    {question.options?.map((option, index) => (
                        <in
                            key={index}
                            className={`option ${
                                selected.includes(option) ? "selected" : ""
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </in>
                    ))}
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <div className={`feedback-container ${feedback ? "show" : ""}`}>
                    {feedback}
                </div>
            </div>
        </div>
    );
};

// QuestionDialog.propTypes = {
//   question: PropTypes.shape({
//     topic: PropTypes.string.isRequired,
//     chapter: PropTypes.string.isRequired,
//     question: PropTypes.string.isRequired,
//     options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//     answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
// };

export default QuestionDialog;
