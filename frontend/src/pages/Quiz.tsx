import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { fetchElectionData } from "../services/api.js";
import { trackEvent } from "../services/googleAnalytics.js";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchElectionData("quiz-questions").then((data) => setQuestions(data.questions));
  }, []);

  const activeQuestion = questions[activeIndex];
  const score = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.id] === question.correctAnswer ? 1 : 0), 0),
    [answers, questions]
  );

  const resetQuiz = () => {
    setAnswers({});
    setActiveIndex(0);
    setShowResult(false);
  };

  const goNext = () => {
    if (activeIndex === questions.length - 1) {
      setShowResult(true);
      return;
    }
    setActiveIndex((index) => index + 1);
  };

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">Quiz System</span>
        <h1>Test your election knowledge</h1>
        <p>Answer one question at a time and review the correct answers at the end.</p>
      </div>

      <div className="interactive-card quiz-card">
        {showResult ? (
          <div className="result-panel">
            <span className="score-badge">{score}/{questions.length}</span>
            <h2>Your score</h2>
            <p>Review each question below. Correct answers are highlighted in blue.</p>
            <div className="review-list">
              {questions.map((question) => (
                <div className="review-item" key={question.id}>
                  <strong>{question.question}</strong>
                  <span>Correct answer: {question.correctAnswer}</span>
                </div>
              ))}
            </div>
            <button className="button button-primary" type="button" onClick={resetQuiz}>
              <RotateCcw size={18} aria-hidden="true" />
              Reset quiz
            </button>
          </div>
        ) : activeQuestion ? (
          <>
            <div className="card-meta">Question {activeIndex + 1} of {questions.length}</div>
            <h2>{activeQuestion.question}</h2>
            <div className="option-grid">
              {activeQuestion.options.map((option) => {
                const isSelected = answers[activeQuestion.id] === option;
                const isCorrect = option === activeQuestion.correctAnswer;
                const optionClass = [
                  "option-button",
                  isSelected ? "selected" : "",
                  isSelected && isCorrect ? "correct" : "",
                  isSelected && !isCorrect ? "incorrect" : ""
                ].join(" ");

                return (
                  <button
                    className={optionClass}
                    key={option}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setAnswers((current) => ({ ...current, [activeQuestion.id]: option }));
                      trackEvent("quiz_answer_selected", { module_name: "Quiz" });
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {answers[activeQuestion.id] && (
              <p className="answer-feedback">
                Correct answer: <strong>{activeQuestion.correctAnswer}</strong>
              </p>
            )}
          </>
        ) : null}
      </div>

      {!showResult && (
        <div className="module-actions">
          <button
            className="button button-secondary"
            type="button"
            disabled={!activeQuestion || activeIndex === 0}
            onClick={() => setActiveIndex((index) => index - 1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </button>
          <button className="button button-primary" type="button" onClick={goNext} disabled={!activeQuestion}>
            {activeIndex === questions.length - 1 ? "Show score" : "Next"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
