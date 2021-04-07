import { useState, ChangeEvent } from "react";
import he from "he";
import { Input, Button, Select, MenuItem, Typography } from "@material-ui/core";
import { ResultsType, QuestionType } from "../../types";
import Question from "./Question";
import categories from "./categories";

export default function AdvancedTrivia() {
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState(0);
  const [numAnswered, setNumAnswered] = useState(0);

  const fetchQuestions = () => {
    if (numQuestions > 50 || numQuestions < 1) return;

    setNumAnswered(0);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}`
    )
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
  };

  const handleNumChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNumQuestions(parseInt(event.currentTarget.value));

  const handleCategoryChange = (event: ChangeEvent<{ value: unknown }>) =>
    setCategory(parseInt(event.target.value as string));

  if (questions.length === 0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 1100,
          margin: "auto",
        }}
      >
        <Typography variant="h6"># of Questions:</Typography>
        <Input
          type="number"
          value={numQuestions}
          onChange={handleNumChange}
          error={numQuestions > 50 || numQuestions < 1}
          style={{ marginBottom: 40 }}
        />

        <Typography variant="h6">Category:</Typography>
        <Select
          value={category}
          onChange={handleCategoryChange}
          style={{ marginBottom: 40 }}
        >
          {categories.map((category) => (
            <MenuItem value={category.num}>{category.category}</MenuItem>
          ))}
        </Select>
        <Button
          onClick={fetchQuestions}
          size="large"
          disabled={numQuestions > 50 || numQuestions < 1}
        >
          Go!
        </Button>
      </div>
    );

  return (
    <div style={{ textAlign: "center", maxWidth: 1100, margin: "auto" }}>
      {questions.map((question: QuestionType) => (
        <Question
          question={question}
          incrementNumAnswered={() =>
            setNumAnswered((numAnswered) => numAnswered + 1)
          }
          key={question.question}
        />
      ))}
      {numAnswered === numQuestions && (
        <Button
          onClick={fetchQuestions}
          variant="outlined"
          style={{ marginBottom: 40 }}
        >
          Fetch more questions!
        </Button>
      )}
    </div>
  );
}
