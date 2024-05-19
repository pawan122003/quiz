import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import AllQuestions from "./components/AllQuestions";
import QuestionState from "./context/question/QuestionState";
import Result from "./components/Result";
import AdminPage from "./components/AdminPage";
// import About from "./components/About";
// import NoteState from "./Context/notes/NoteState";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

function App() {
  return (
    <>
      {/* <NoteState> */}
      <QuestionState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<AllQuestions />} />
              <Route exact path = "/login" element={<Login/>}/>
              <Route exact path = "/allquestion" element={<AllQuestions/>}/>
              <Route exact path = "/result" element={<Result/>}/>
              <Route exact path = "/admin" element={<AdminPage/>}/>
            </Routes>
          </div>
        </Router>
        </QuestionState>
      {/* </NoteState> */}
    </>
  );
}

export default App;
