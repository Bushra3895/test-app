// File: src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Question from "./Question";
import Options from "./Options";

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
  { question: "Which keyword declares a constant in JavaScript?", options: ["let", "const", "var", "function"], answer: "const" },
  { question: "Which method converts a fetch response to JSON?", options: ["res.text()", "res.json()", "res.parse()", "res.data()"], answer: "res.json()" },
  { question: "Which keyword declares an asynchronous function?", options: ["async", "await", "then", "function"], answer: "async" },
  { question: "Which keyword stops function execution early?", options: ["break", "return", "continue", "stop"], answer: "return" },
  { question: "Which operator checks if a value is false?", options: ["!", "&&", "||", "=="], answer: "!" },
  { question: "Which property indicates fetch success in the response object?", options: ["res.status", "res.ok", "res.body", "res.success"], answer: "res.ok" },
  { question: "Which block handles errors in JavaScript?", options: ["catch", "handle", "throw", "finally"], answer: "catch" },
  { question: "Which language is used for web apps?", options: ["Python", "C++", "JavaScript", "Java"], answer: "JavaScript" },
];

function Quiz({ setShowResult, setScore }) {
  const [currentQ, setCurrentQ]         = useState(0);
  const [timeLeft, setTimeLeft]         = useState(20);
  const [selected, setSelected]         = useState(null);
  const [answered, setAnswered]         = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount]     = useState(0);

  useEffect(() => {
    if (answered) return;
    if (timeLeft === 0) {
      setWrongCount((w) => w + 1);
      setAnswered(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answered]);

  useEffect(() => {
    setTimeLeft(20);
    setSelected(null);
    setAnswered(false);
  }, [currentQ]);

  const handleAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      setShowResult(true);
    }
  };

  const progress  = (currentQ / questions.length) * 100;
  const isLastQ   = currentQ + 1 === questions.length;

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card">

        <div className="quiz-header">
          <p className="quiz-title">JavaScript Quiz</p>
          <div className="progress-row">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="q-count">{currentQ + 1} / {questions.length}</span>
          </div>
          <div className="score-strip">
            <div className="s-pill"><div className="s-dot green" />{correctCount} Correct</div>
            <div className="s-pill"><div className="s-dot red" />{wrongCount} Wrong</div>
          </div>
          <div className="timer-row">
            <div className="timer-icon">⏱</div>
            <span className={`timer-num${timeLeft <= 5 ? " danger" : ""}`}>{timeLeft}</span>
            <span className="timer-label">seconds left</span>
          </div>
        </div>

        <div className="quiz-body">
          <Question question={questions[currentQ].question} />
          <Options
            options={questions[currentQ].options}
            handleAnswer={handleAnswer}
            selected={selected}
            answered={answered}
            correctAnswer={questions[currentQ].answer}
          />
        </div>

        <div className="quiz-footer">
          <button className="next-btn" onClick={handleNext} disabled={!answered}>
            {isLastQ ? "See Result" : "Next"} →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Quiz;