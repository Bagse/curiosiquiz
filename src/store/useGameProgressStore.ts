import { create } from "zustand";

interface GameProgressState {
  quizzesPlayed: string[];
  correctAnswers: number;
  totalQuestions: number;
  currentCategory: string;
  questionsCorrectStreak: number;
  answeredQuestionIds: string[];
  lastResult: { failedAll: boolean; nextPerfect: boolean };
  saveResult: (data: {
    category: string;
    correct: number;
    total: number;
    streak: number;
    answeredIds: string[];
    perfectAfterFail?: boolean;
  }) => void;
}

export const useGameProgressStore = create<GameProgressState>((set) => ({
  quizzesPlayed: [],
  correctAnswers: 0,
  totalQuestions: 0,
  currentCategory: "",
  questionsCorrectStreak: 0,
  answeredQuestionIds: [],
  lastResult: { failedAll: false, nextPerfect: false },

  saveResult: ({
    category,
    correct,
    total,
    streak,
    answeredIds,
    perfectAfterFail,
  }) =>
    set((state) => ({
      quizzesPlayed: [...state.quizzesPlayed, category],
      correctAnswers: correct,
      totalQuestions: total,
      currentCategory: category,
      questionsCorrectStreak: streak,
      answeredQuestionIds: [...state.answeredQuestionIds, ...answeredIds],
      lastResult: {
        failedAll: correct === 0,
        nextPerfect: perfectAfterFail || false,
      },
    })),
}));
