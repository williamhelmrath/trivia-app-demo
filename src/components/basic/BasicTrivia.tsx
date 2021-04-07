import React, { useEffect, useState } from "react";
import Question from "./Question";
import { QuestionType, ResultsType } from "../../types";

export default function BasicTrivia() {
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
          }
          return {
            ...question,
            answers,
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
