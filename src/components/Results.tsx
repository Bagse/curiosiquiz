import { useNavigate } from "react-router-dom";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";
import { useAchievementsStore } from "../store/achievements";
import { useEffect } from "react";
import Logo from "./Logo";
import ButtonToAchievements from "./ButtonToAchievements";
import ButtonGoToHome from "./ButtonGoToHome";

export const Results = () => {
  const navigate = useNavigate();
  const currentCategory = useQuestionsStore((state) => state.currentCategory);
  const { correct, incorrect } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);
  const { unlock, hasUnlocked } = useAchievementsStore();
  const achievements = useAchievementsStore((state) => state.achievements);
  const setShownOnce = useAchievementsStore.setState;

  useEffect(() => {
    if (!hasUnlocked("first-quiz")) unlock("first-quiz");
    if (correct >= 10 && !hasUnlocked("ten-correct")) unlock("ten-correct");
    if (correct === questions.length && !hasUnlocked("flawless"))
      unlock("flawless");
  }, []);

  const handleRetrySameCategory = () => {
    reset();
    if (currentCategory) {
      navigate(`/quiz/${currentCategory}`);
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    reset();
    navigate("/");
  };

  const newAchievements = achievements.filter(
    (a) => a.unlocked && !a.shownOnce
  );

  useEffect(() => {
    const newAchievements = achievements.filter(
      (a) => a.unlocked && !a.shownOnce
    );

    if (newAchievements.length > 0) {
      setShownOnce((state) => ({
        achievements: state.achievements.map((ach) =>
          newAchievements.some((a) => a.id === ach.id)
            ? { ...ach, shownOnce: true }
            : ach
        ),
      }));
    }
  }, [achievements]);

  return (
    <div className="flex flex-col gap-7 justify-center items-center text-white w-full h-screen my-5">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Logo />
      <h1 className="text-3xl md:text-4xl font-mont font-semibold">
        🥳 Tu resultado es:
      </h1>
      <strong className="space-y-4 text-xl text-center">
        <p>✅ {correct} correctas</p>
        <p>❌ {incorrect} incorrectas</p>
      </strong>

      {newAchievements.length === 0 && (
        
        <ButtonToAchievements onClick={() => navigate("/achievements")} />
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <ButtonGoToHome
        title="Reintentar la misma categoría"
          onClick={handleRetrySameCategory}
        />
        <ButtonGoToHome title="Volver al inicio" onClick={handleGoHome} />
      </div>
    </div>
  );
};
