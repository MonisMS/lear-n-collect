// Basic types for our quiz app
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  field: string;
  topic: string;
  level: string;
}

export interface Progress {
  id: number;
  user_id: number;
  field: string;
  topic: string;
  level: string;
  questions_answered: number;
  correct_answers: number;
  total_questions: number;
  last_practiced?: string;
  created_at: string;
}