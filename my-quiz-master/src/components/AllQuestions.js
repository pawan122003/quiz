import React, { useContext, useEffect, useState, useRef } from "react";
import questionContext from "../context/question/QuestionContext";
import { useNavigate } from "react-router-dom";

const AllQuestions = () => {
  let Navigate = useNavigate();

  const context = useContext(questionContext);
  const { question, getQuestions } = context;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  // const [marks, setMarks] = useState(0);
  var marks = 0
  const [time, setTime] = useState(question.length*30); 
  const timerRef = useRef(null);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line 
  }, []);

  useEffect((e) => {
    if (showQuiz) {
      setTime(100)
      timerRef.current = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrease time by 1 every second until 0
      }, 1000);
    } else {
      // clearInterval(timerRef.current);
      setTime(100); // Reset time when quiz is not shown
    }
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line 
  }, [showQuiz]);

  const handleChange = (e) => {
    const questionId = e.target.id;
    const optionValue = e.target.value;

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionValue,
    }));
  };

  const calculateResult = () => {
    Object.keys(selectedOptions).forEach((key) => {
      let value = selectedOptions[key];
      let correctAns = question.find((q) => q._id === key).CorrectAns;
      if (value === correctAns) {
        marks++;
      }
    });
    clearInterval(timerRef.current);
    Navigate('/result', { state: marks });
  };
  

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  return (
    <>
      <h1>Questions for Quiz:</h1>
      {!showQuiz && (
        <button type="button" className="btn btn-primary" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      )}
      {showQuiz && (
        <div className="container">
          <h3>Your Time to Solve this quiz is: {time} sec</h3>
          {question.length > 0 ? (
            question.map((question, index) => {
              if (question !== undefined) {
                return (
                  <div className="container my-4 border border-secondary p-3" key={index}>
                    <p>
                      <b>
                        Question {index + 1}: {question.Question}
                      </b>
                    </p>
                    {Object.values(question.Options).map((option, optionIndex) => (
                      <div className="form-check" key={optionIndex}>
                        <input
                          className="form-check-input"
                          type="radio"
                          value={option}
                          name={`question-${question._id}`}
                          id={question._id}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={question._id}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p>No questions to solve!</p>
          )}
          {question.length > 0 && (
            <button type="button" className="btn btn-primary my-3" onClick={calculateResult}>
              Finish
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default AllQuestions;
