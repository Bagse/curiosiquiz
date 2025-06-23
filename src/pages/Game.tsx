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

  const questionInfo = questions[currentQuestion];

  return (
    <div className="flex flex-col justify-center items-center gap-3 py-4">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Logo />
      <div className="flex gap-3 py-2 items-center justify-center">
        <button onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <GrPrevious
            size={28}
            className={`p-2 rounded-full ${
              currentQuestion === 0 ? "bg-gray-300" : "bg-neutral-500"
            }`}
          />
        </button>
        {currentQuestion + 1}/{questions.length}
        <button
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <GrNext
            size={28}
            className={`p-2 rounded-full ${
              currentQuestion >= questions.length - 1
                ? "bg-gray-300"
                : "bg-neutral-500"
            }`}
          />
        </button>
      </div>

      <Question info={questionInfo} />
    </div>
  );
}
