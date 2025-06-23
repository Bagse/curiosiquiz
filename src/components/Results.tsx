import { useNavigate } from "react-router-dom";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";
import AchievementList from "./AchievementList";
import { useAchievementsStore } from "../store/achievements";
import { useEffect } from "react";

export const Results = () => {
  const navigate = useNavigate();
  const currentCategory = useQuestionsStore((state) => state.currentCategory);
  const { correct, incorrect } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);
  const unlock = useAchievementsStore((state) => state.unlock);

  useEffect(() => {
    unlock("first-quiz"); // Siempre desbloqueado al finalizar

    if (correct >= 10) unlock("ten-correct");
    if (correct === questions.length) unlock("flawless");
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

  return (
    <div className="flex flex-col gap-7 justify-center items-center text-white w-full h-screen my-5">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <h1 className="text-3xl md:text-4xl font-mont font-semibold">
        🥳 Tu resultado es:
      </h1>
      <strong className="space-y-4 text-xl text-center">
        <p>✅ {correct} correctas</p>
        <p>❌ {incorrect} incorrectas</p>
      </strong>

      <AchievementList />

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleRetrySameCategory}
          className="bg-[#00adea] hover:bg-[#1de2c9] px-6 py-2 rounded-md font-semibold transition"
        >
          Reintentar esta categoría
        </button>
        <button
          onClick={handleGoHome}
          className="bg-[#111] hover:bg-[#333] px-6 py-2 rounded-md font-semibold border border-white transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};
