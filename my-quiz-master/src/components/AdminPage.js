import React, { useContext, useEffect, useState , useRef} from "react";
import questionContext from "../context/question/QuestionContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    let Navigate = useNavigate()

    const context = useContext(questionContext);
    const { question, getQuestions, deleteQuestion, addQUestion } = context;
    const [Question, setQuestion] = useState({ Question: "", Options: ["", "", "", ""], CorrectAns: "" });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/allquestion')
        }
        getQuestions();
        // eslint-disable-next-line
    }, [])

    const HandleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'exampleInputEmail1') {
            setQuestion({ ...Question, Question: value });
        } else if (id.startsWith('exampleInputPassword')) {
            const index = parseInt(id.substring(id.length - 1)) - 1;
            const updatedOptions = [...Question.Options];
            updatedOptions[index] = value;
            setQuestion({ ...Question, Options: updatedOptions });
        } else if (id === 'correctAnswer') {
            setQuestion({ ...Question, CorrectAns: value });
        }
    }

    const handleAddQuestion = (e) => {
        e.preventDefault();
        addQUestion(Question.Question,Question.Options,Question.CorrectAns); 
        refclose.current.click()
    }
    const refclose = useRef(null)

    return (
        <>
            <h1>Current Questions Are :</h1>
            <div className="container">
                <div className="container">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add New Question
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <form onSubmit={handleAddQuestion}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Question</label>
                                                <input type="text" className="form-control" onChange={HandleChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            {Question.Options.map((option, index) => (
                                                <div className="mb-3" key={index}>
                                                    <label htmlFor={`exampleInputPassword${index + 1}`} className="form-label">Option {index + 1}</label>
                                                    <input type="text" className="form-control" onChange={HandleChange} id={`exampleInputPassword${index + 1}`} />
                                                </div>
                                            ))}
                                            <div className="mb-3">
                                                <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
                                                <input type="text" className="form-control" onChange={HandleChange} id="correctAnswer" />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {question.map((question, index) => {
                    if (question !== undefined) {
                        return (
                            <div className="container my-4 border border-secondary p-3" key={index}>
                                <p><b>
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
                                        />
                                        <label className="form-check-label" htmlFor={question._id}>
                                            {option}
                                        </label>
                                    </div>
                                ))}

                                <button type="button" className="btn btn-danger my-2" onClick={() => { deleteQuestion(question._id) }}>Remove Question</button>

                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </>
    );
}

export default AdminPage;
