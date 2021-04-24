import Button from "@material-ui/core/Button";
import he from "he";
interface AnswerProps {
  answer: string;
  answered: boolean;
  isCorrect: boolean;
  answerQuestion: () => void;
}

const RED = "#ff6b61";
const GREEN = "#7dff7f";

export default function Answer({
  answer,
  answered,
  isCorrect,
  answerQuestion,
}: AnswerProps) {
  return (
    <Button
      onClick={answerQuestion}
      disabled={answered}
      variant="contained"
      color="primary"
      style={{
        margin: 10,
        background: answered ? (isCorrect ? GREEN : RED) : "",
      }}
    >
      {he.decode(answer)}
    </Button>
  );
}
