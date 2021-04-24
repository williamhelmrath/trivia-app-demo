import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Answer from "./Answer";
import { QuestionType } from "../../types";

interface QuestionProps {
  question: QuestionType;
  incrementNumAnswered: () => void;
}

export default function Question({
  question,
  incrementNumAnswered,
}: QuestionProps) {
  const [answered, setAnswered] = useState(false);

  const answerQuestion = () => {
    setAnswered(true);
    incrementNumAnswered();
  };

  return (
    <div style={{ margin: 30 }}>
      <Typography variant="h5">{question.question}</Typography>

      {question.answers.map((answer) => (
        <Answer
          answer={answer}
          answered={answered}
          answerQuestion={answerQuestion}
          isCorrect={answer === question.correct_answer}
          key={answer}
        />
      ))}
    </div>
  );
}
