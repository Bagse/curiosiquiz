import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuestionsStore } from "../store/questions";
import Game from "./Game";
import Loader from "../components/Loader";

export default function QuizPage() {
  const { category } = useParams();
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  const questions = useQuestionsStore((state) => state.questions);
  const loading = useQuestionsStore((state) => state.loading);
  const reset = useQuestionsStore((state) => state.reset);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      fetchQuestions(10, category);
    }
  }, [category]);

  if (loading) return <Loader />;
  if (questions.length === 0)
    return <p className="text-center mt-10">No hay preguntas.</p>;


  return (
    <div>
      <button
        onClick={() => {
          reset();
          navigate("/");
        }}
        className="group mt-3 text-white px-4 py-2 relative inline-flex items-center gap-2 overflow-hidden transition duration-300 ease-in-out"
      >
        <span className="relative z-10">Volver a categorías</span>
        <svg
          className="w-5 h-5 transform translate-x-[-10px] group-hover:translate-x-0 transition duration-300 ease-in-out"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        {/* Animated underline */}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7857f6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>
      <Game />
    </div>
  );
}
