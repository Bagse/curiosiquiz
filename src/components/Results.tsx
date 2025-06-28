import { useNavigate } from "react-router-dom";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";
import { Achievement, useAchievementsStore } from "../store/achievements";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ButtonToAchievements from "./ButtonToAchievements";
import ButtonGoToHome from "./ButtonGoToHome";
import { useGameProgressStore } from "../store/useGameProgressStore";
import { checkAchievements } from "../utils/checkAchievements";
import AchievementModal from "./AchievementModal";

export const Results = () => {
  const [showModal, setShowModal] = useState(false);
  const [localNewAchievements, setLocalNewAchievements] = useState<
    Achievement[]
  >([]);
  const navigate = useNavigate();

  const currentCategory = useQuestionsStore((state) => state.currentCategory);
  const { correct, incorrect } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);
  const achievements = useAchievementsStore((state) => state.achievements);
  const setShownOnce = useAchievementsStore.setState;

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

  useEffect(() => {
    const freshNewAchievements = achievements.filter(
      (a) => a.unlocked && !a.shownOnce
    );

    if (freshNewAchievements.length > 0) {
      setLocalNewAchievements(freshNewAchievements);
      setShowModal(true);

      // Marcar como mostrados
      setShownOnce((state) => ({
        achievements: state.achievements.map((ach) =>
          freshNewAchievements.some((a) => a.id === ach.id)
            ? { ...ach, shownOnce: true }
            : ach
        ),
      }));
    }
  }, [achievements]);

  useEffect(() => {
    const answeredIds = questions.map((q) => q.id.toString());
    const wasPerfect = correct === questions.length;

    const lastGame = useGameProgressStore.getState();
    const wasPerfectAfterFail = lastGame.lastResult?.failedAll && wasPerfect;

    useGameProgressStore.getState().saveResult({
      category: currentCategory ?? "",
      correct,
      total: questions.length,
      streak: correct,
      answeredIds,
      perfectAfterFail: wasPerfectAfterFail,
    });

    // Esperar un tick para que Zustand actualice internamente
    setTimeout(() => {
      checkAchievements();
    }, 0);
  }, []);

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

      <AchievementModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="🎉 ¡Nuevo logro!"
        achievements={localNewAchievements}
      />
      <ButtonToAchievements onClick={() => navigate("/achievements")} />

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
