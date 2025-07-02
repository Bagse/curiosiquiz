import { useAchievementsStore } from "../store/achievements";
import { useGameProgressStore } from "../store/useGameProgressStore";

export function checkAchievements() {
  const { unlock, hasUnlocked } = useAchievementsStore.getState();
  const {
    quizzesPlayed,
    currentCategory,
    correctAnswers,
    totalQuestions,
    lastResult,
    questionsCorrectStreak,
    answeredQuestionIds,
  } = useGameProgressStore.getState();

  // First quiz
  if (!hasUnlocked("first-quiz") && quizzesPlayed.length >= 1) {
    unlock("first-quiz");
  }

  // Without context
  if (correctAnswers === 0 && totalQuestions > 0) {
    unlock("without-context");
  }

  // All categories complete
  const uniqueCategories = [...new Set(quizzesPlayed)];
  const allCategories = ["cultura-general", "cine", "deportes", "historia"];
  const hasAllCategories = allCategories.every((cat) =>
    uniqueCategories.includes(cat)
  );
  if (hasAllCategories) {
    unlock("all-categories-complete");
  }

  // Flawless and finish per category
  type Category = "cultura-general" | "cine" | "deportes" | "historia";
  const catMap: Record<Category, string[]> = {
    "cultura-general": ["cg-flawless-5", "cg-finished-10"],
    cine: ["cinema-flawless-5", "cinema-finished-10"],
    deportes: ["sports-flawless-5", "sports-finished-10"],
    historia: ["history-flawless-5", "history-finished-10"],
  };

  const currentCat = currentCategory as Category;

  if (catMap[currentCat]) {
    const [flawlessId, finishedId] = catMap[currentCat];

    if (questionsCorrectStreak >= 5) {
      unlock(flawlessId);
    }

    if (totalQuestions === 10) {
      unlock(finishedId);
    }
  }

  // Oscar special question
  const oscarQuestionId = "57";
  if (answeredQuestionIds.some((id) => id.includes(oscarQuestionId))) {
    unlock("oscar-for-best-riddle");
  }

  // Comeback king
  if (lastResult?.failedAll && lastResult?.nextPerfect) {
    unlock("comeback-king");
  }

  // Achievement hunter
  const { achievements } = useAchievementsStore.getState();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  if (unlockedCount >= 10 && !hasUnlocked("achievement-hunter")) {
    unlock("achievement-hunter");
  }
}
