import { useQuestionsStore } from "../store/questions";

const LIMIT_QUESTIONS = 7;

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };
  return (
    <button
      onClick={handleClick}
      className="bg-[#00adea] hover:bg-[#00ddaa] rounded-md p-2 w-[150px] outline transition font-bold font-mont flex text-center justify-center"
    >
      Empezar!
    </button>
  );
};
