import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";

export const Footer = () => {
  const { unanswered } = useQuestionsData();
  const reset = useQuestionsStore(state => state.reset);

  return (
    <footer className=" my-6 md:my-5 flex justify-center text-center flex-col">
      <strong>{`👀 ${unanswered} preguntas sin responder`}</strong>
      <div className="flex justify-center py-3">
        <button onClick={() => reset()} className="py-2 px-4 rounded-lg text-[#118ab2] hover:bg-gray-800 font-mont transition font-bold">Resetear juego</button>
      </div>
    </footer>
  );
};
