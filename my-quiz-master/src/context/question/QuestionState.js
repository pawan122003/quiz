import questionContext from "./QuestionContext";
import { useState } from "react";

// create a state 

const QuestionState = (props) =>{
    const host = "http://localhost:5010"
    const initialQuestion = []
    const [question, setQuestion] = useState(initialQuestion)
    // get questions from the server
    const getQuestions = async () => {
        const response = await fetch(`${host}/api/question/getquestions`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await response.json();
          setQuestion(json);
    }
// Add a question to quiz
    const addQUestion =async (Question , Options, CorrectAns) =>{
        const response = await fetch(`${host}/api/question/addquestion`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Question, Options, CorrectAns }),
          });
          // console.log("adding a new note ");
          const Ques=await response.json()
          // console.log(Ques)
          setQuestion(question.concat(Ques));
    }
// Delete Question 
    const deleteQuestion = async (id) => {
      // eslint-disable-next-line 
        const response = await fetch(`${host}/api/question/deletequestion/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              
            }
          });
          // Logic
          const newQuestions = question.filter((ques) => {
            return ques._id !== id;
          });
          setQuestion(newQuestions);
    }
    return(
    <questionContext.Provider value={{ question, addQUestion, deleteQuestion, getQuestions }}>
        {props.children}
    </questionContext.Provider>
    )
}

export default QuestionState
