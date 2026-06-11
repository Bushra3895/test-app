// File: src/App.js
import React, { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore]           = useState(0);

  const handleRestart = () => {
    setScore(0);
    setShowResult(false);
  };

  return (
    <div>
      {showResult ? (
        <Result score={score} total={10} onRestart={handleRestart} />
      ) : (
        <Quiz setShowResult={setShowResult} setScore={setScore} />
      )}
    </div>
  );
}

export default App;