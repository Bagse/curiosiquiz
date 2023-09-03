import { Game } from "./Game";
import { Start } from "../components/Start";
import Logo from "../components/Logo";
import { useQuestionsStore } from "../store/questions";
import { Results } from "../components/Results";
import { useQuestionsData } from "../hooks/useQuestionsData";

function Homepage() {
  const questions = useQuestionsStore((state) => state.questions);
  const { unanswered } = useQuestionsData();

  return (
    <>
      {questions.length === 0 && (
        <div className="px-3 lg:px-52">
          <div className="flex items-center justify-center gap-5 h-screen flex-col">
            <Logo />
            <Start />
          </div>
        </div>
      )}

      {questions.length > 0 && unanswered > 0 && (
        <div className="px-3 lg:px-52 py-3 flex flex-col items-center gap-5">
          <Logo />
          <Game />
        </div>
      )}

      {questions.length > 0 && unanswered === 0 && (
        <div className="px-3 lg:px-52 py-44 flex flex-col items-center gap-5">
          <Logo />
          <Results />
        </div>
      )}

      <p className="flex gap-1 justify-center text-sm font-bold my-4">
        Desarrollado por{" "}
        <a
          href="https://www.linkedin.com/in/brian-ar%C3%B3n-g%C3%B3mez-sequeiros/"
          target="_blank"
          className="text-green-400 hover:underline"
          rel="noopener noreferrer"
        >
          Bagse
        </a>
      </p>
    </>
  );
}

export default Homepage;
