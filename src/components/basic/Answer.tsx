interface AnswerProps {
  answer: string;
  answered: boolean;
  answerQuestion: (answer: string) => void;
}

export default function Answer({
  answer,
  answered,
  answerQuestion,
}: AnswerProps) {
  return (
    <button onClick={() => answerQuestion(answer)} disabled={answered}>
      {answer}
    </button>
  );
}
