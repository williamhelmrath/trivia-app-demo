import { useState } from "react";
import Answer from "./Answer";
import { QuestionType } from "../../types";

interface QuestionProps {
  question: QuestionType;
}

export default function Question({ question }: QuestionProps) {
  const [answered, setAnswered] = useState(false);
  const [color, setColor] = useState<"black" | "green" | "red">("black");
  const answerQuestion = (answer: string) => {
    setAnswered(true);
    setColor(answer === question.correct_answer ? "green" : "red");
  };
  return (
    <div style={{ margin: 30 }}>
      <h1 style={{ color }}>{question.question}</h1>
      {question.answers.map((answer) => (
        <Answer
          answer={answer}
          answered={answered}
          answerQuestion={answerQuestion}
          key={answer}
        />
      ))}
    </div>
  );
}
