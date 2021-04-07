export interface ResultsType {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionType extends ResultsType {
  answers: string[];
}
