// File: src/components/Options.jsx
import React from "react";

const LETTERS = ["A", "B", "C", "D"];

function Options({ options, handleAnswer, selected, answered, correctAnswer }) {
  const getClass = (option) => {
    if (!answered) return selected === option ? "option-btn selected" : "option-btn";
    if (option === correctAnswer) return "option-btn correct";
    if (option === selected)      return "option-btn wrong";
    return "option-btn";
  };

  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          key={option}
          className={getClass(option)}
          onClick={() => handleAnswer(option)}
          disabled={answered}
        >
          <div className="opt-letter">{LETTERS[i]}</div>
          <span className="opt-text">{option}</span>
        </button>
      ))}
    </div>
  );
}

export default Options;