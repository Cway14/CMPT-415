import React, { useState } from "react";
import PropTypes from "prop-types";
import "./QuestionDialog.css";

const QuestionDialog = ({ question }) => {
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState("");

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

  const handleSubmit = () => {
    const isCorrect = selected.sort().toString() === question.answers.sort().toString();

    if (isCorrect) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect.");
    }
  };

  return (
    <div className="question-dialog">
      <div className="question-container">
        <h2 className="question">{question.question}</h2>
        <div className="options-container">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selected.includes(option) ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div className={`feedback-container ${feedback ? "show" : ""}`}>
        {feedback}
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
