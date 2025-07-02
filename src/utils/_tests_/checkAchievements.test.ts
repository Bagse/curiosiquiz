import { describe, test, expect, beforeEach } from "vitest";
import { checkAchievements } from "../checkAchievements";
import { useGameProgressStore } from "../../store/useGameProgressStore";
import { useAchievementsStore } from "../../store/achievements";

describe("checkAchievements", () => {
  beforeEach(() => {
    // Resetear estado antes de cada test
    useGameProgressStore.setState({
      quizzesPlayed: [],
      currentCategory: "cine",
      correctAnswers: 0,
      totalQuestions: 0,
      lastResult: undefined,
      questionsCorrectStreak: 0,
      answeredQuestionIds: [],
    });

    useAchievementsStore.setState({
      achievements: [
        { id: "first-quiz", unlocked: false, title: "", description: "", image: "" },
        { id: "all-categories-complete", unlocked: false, title: "", description: "", image: "" },
        { id: "without-context", unlocked: false, title: "", description: "", image: "" },
        { id: "comeback-king", unlocked: false, title: "", description: "", image: "" },
      ],
    });
  });

  test("desbloquea 'first-quiz' cuando se hace el primer quiz", () => {
    useGameProgressStore.setState({ quizzesPlayed: ["cine"] });

    checkAchievements();

    const { achievements } = useAchievementsStore.getState();
    expect(achievements.find((a) => a.id === "first-quiz")?.unlocked).toBe(true);
  });

  test("desbloquea 'all-categories-complete' si se han jugado todas", () => {
    useGameProgressStore.setState({
      quizzesPlayed: ["cine", "deportes", "historia", "cultura-general"],
    });

    checkAchievements();

    const { achievements } = useAchievementsStore.getState();
    expect(achievements.find((a) => a.id === "all-categories-complete")?.unlocked).toBe(true);
  });

  test("desbloquea 'without-context' si hay 0 respuestas correctas pero se jugó", () => {
    useGameProgressStore.setState({ totalQuestions: 10, correctAnswers: 0 });

    checkAchievements();

    const { achievements } = useAchievementsStore.getState();
    expect(achievements.find((a) => a.id === "without-context")?.unlocked).toBe(true);
  });

  test("desbloquea 'comeback-king' si se falló todo antes y luego se logra perfecto", () => {
    useGameProgressStore.setState({
      lastResult: { failedAll: true, nextPerfect: true },
    });

    checkAchievements();

    const { achievements } = useAchievementsStore.getState();
    expect(achievements.find((a) => a.id === "comeback-king")?.unlocked).toBe(true);
  });
});