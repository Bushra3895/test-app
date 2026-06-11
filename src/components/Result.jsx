// File: src/components/Result.jsx
import React from "react";

function Result({ score, total, onRestart }) {
  const wrong      = total - score;
  const percentage = Math.round((score / total) * 100);

  const getTrophy = () => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 50) return "👍";
    return "💪";
  };

  const getMessage = () => {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="quiz-wrapper">
      <div className="result-card">
        <div className="result-header">
          <div className="result-trophy">{getTrophy()}</div>
          <div className="result-title">{getMessage()}</div>
          <div className="result-subtitle">Quiz completed</div>
        </div>
        <div className="result-body">
          <div className="result-score-big">{percentage}%</div>
          <div className="result-score-label">Overall score</div>
          <div className="result-stats">
            <div className="stat-box">
              <div className="stat-num green">{score}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-box">
              <div className="stat-num red">{wrong}</div>
              <div className="stat-label">Wrong</div>
            </div>
          </div>
          <button className="restart-btn" onClick={onRestart}>Try Again</button>
        </div>
      </div>
    </div>
  );
}

export default Result;