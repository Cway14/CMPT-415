import { useState } from "react";
import QuestionDialog from "./QuestionDialog";
import "./QuestionForm.css";
import QuestionList from "./QuestionList";

function QuestionForm() {
  const [topic, setTopic] = useState("");
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [answers, setAnswers] = useState([]);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleChapterChange = (e) => {
    setChapter(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAnswerChange = (e) => {
    const answer = e.target.value;
    if (answers.includes(answer)) {
      const newAnswers = answers.filter((a) => a !== answer);
      setAnswers(newAnswers);
    } else {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.length < 1) {
      alert("Please enter at least 1 options");
      return;
    }
    if (answers.length < 1) {
      alert("Please select at least 1 answer");
      return;
    }
    const questionObject = {
      topic,
      chapter,
      question,
      options,
      answers,
    };
    console.log(questionObject);
    // Send the questionObject to the server
    const url = "http://localhost:5000/questions/addQuestion";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic" className="form-label">
            Topic:
          </label>
          <input
            type="text"
            id="topic"
            className="form-input"
            placeholder="Enter topic"
            value={topic}
            onChange={handleTopicChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="chapter" className="form-label">
            Chapter:
          </label>
          <input
            type="text"
            id="chapter"
            className="form-input"
            placeholder="Enter chapter"
            value={chapter}
            onChange={handleChapterChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="question" className="form-label">
            Question:
          </label>
          <textarea
            id="question"
            className="form-input"
            placeholder="Enter question"
            value={question}
            onChange={handleQuestionChange}
            required
          ></textarea>
        </div>
        <div className="form-group options-container">
          <label className="form-label">Options:</label>
          {options.map((option, index) => (
            <div key={index} className="options-group">
              <input
                type="text"
                className="option-input"
                placeholder={`Enter option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                required
              />
              {options.length > 0 && (
                <button
                  type="button"
                  className="option-remove-button"
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-option-button"
            onClick={handleAddOption}
          >
            Add Option
          </button>
        </div>
        <div className="form-group">
          <label className="form-label">Answers:</label>
          {options.map((option, index) => (
            <div key={index} className="answer-group">
              <input
                type="checkbox"
                className="answer-checkbox"
                id={`answer-${index}`}
                value={option}
                checked={answers.includes(option)}
                onChange={handleAnswerChange}
              />
              <label htmlFor={`answer-${index}`} className="answer-label">
                {option}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <QuestionDialog
        question={{
          topic: "Topic",
          chapter: "Chapter",
          question: "Question",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          answers: ["Option 1", "Option 2"],
        }}
      />
      <QuestionList />
    </div>
  );
}

export default QuestionForm;
