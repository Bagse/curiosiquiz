import { useQuestionsStore } from "../store/questions";
import { GrPrevious, GrNext } from "react-icons/gr";
import Question from "../components/Question";
import Logo from "../components/Logo";

export default function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );
  const currentCategory = useQuestionsStore((state) => state.currentCategory);

  const questionInfo = questions[currentQuestion];
  const total = questions.length;

  const categoryLabels: Record<string, string> = {
    "cultura-general": "Cultura General",
    cine: "Cine",
    deportes: "Deportes",
    historia: "Historia",
    videojuegos: "Videojuegos",
    musica: "Música",
    geografia: "Geografía",
    tecnologia: "Tecnología",
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6 min-h-dvh">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="fixed top-20 -left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-float pointer-events-none" />

      <Logo />

      {/* Category & progress */}
      <div className="w-full max-w-[600px] flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <span className="font-mont">
            {currentCategory ? categoryLabels[currentCategory] || currentCategory : ""}
          </span>
          <span>
            {currentQuestion + 1} / {total}
          </span>
        </div>
        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7857f6] to-[#00ddaa] transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 items-center justify-center py-1">
        <button
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
          className={`p-2 rounded-full transition-all duration-200 ${
            currentQuestion === 0
              ? "text-neutral-600 cursor-not-allowed"
              : "text-white hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20"
          }`}
        >
          <GrPrevious size={22} />
        </button>

        <span className="text-xs font-mont text-neutral-500 tabular-nums">
          {String(currentQuestion + 1).padStart(2, "0")}
          <span className="text-neutral-700">/{String(total).padStart(2, "0")}</span>
        </span>

        <button
          onClick={goNextQuestion}
          disabled={currentQuestion >= total - 1}
          className={`p-2 rounded-full transition-all duration-200 ${
            currentQuestion >= total - 1
              ? "text-neutral-600 cursor-not-allowed"
              : "text-white hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20"
          }`}
        >
          <GrNext size={22} />
        </button>
      </div>

      <Question info={questionInfo} />
    </div>
  );
}
