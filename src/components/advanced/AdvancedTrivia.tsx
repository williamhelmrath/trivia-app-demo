import { useState, useEffect } from "react";
import he from "he";
import { ResultsType, QuestionType } from "../../types";
import Question from "./Question";

export default function AdvancedTrivia() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => {
        const questions = res.results.map((question: ResultsType) => {
          let answers;
          if (question.type === "boolean") {
            answers = ["True", "False"];
          } else {
            answers = question.incorrect_answers;
            const rand = Math.floor(Math.random() * 4);
            answers.splice(rand, 0, question.correct_answer);
            answers = answers.map((answer) => he.decode(answer));
          }
          return {
            ...question,
            answers,
            question: he.decode(question.question),
          };
        });
        setQuestions(questions);
      });
  }, []);
  return (
    <div style={{ textAlign: "center", maxWidth: 1100, margin: "auto" }}>
      {questions.map((question: QuestionType) => (
        <Question question={question} key={question.question} />
      ))}
    </div>
  );
}
