import { useQuestionsStore } from "../store/questions";
import { type Question as QuestionType } from "../types";
import { useNavigate } from "react-router-dom";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return "transparent";
  if (index === correctAnswer) return "#06d6a0";
  if (index === userSelectedAnswer) return "#ef476f";
  return "transparent";
};

export default function Question({ info }: { info: QuestionType }) {
  const navigate = useNavigate();
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const totalQuestions = useQuestionsStore((state) => state.questions.length);

  const handleClick = (answerIndex: number) => {
    if (info.userSelectedAnswer == null) {
      selectAnswer(info.id, answerIndex);

      // Si es la última pregunta, esperar brevemente y redirigir a resultados
      const isLastQuestion = currentQuestion === totalQuestions - 1;
      if (isLastQuestion) {
        setTimeout(() => {
          navigate("/results");
        }, 1000); // 1 segundo para que el usuario vea si acertó o no
      }
    }
  };

  return (
    <div className="px-4">
      <div className="w-full max-w-[600px] min-h-[500px] bg-[#151515] outline outline-2 outline-[#00ddaa] p-4 rounded-lg flex flex-col gap-5 sm:gap-4 mx-auto">
        <h2 className="text-2xl text-center">{info.question}</h2>

        {info.image && (
          <div className="flex justify-center mb-4">
            <img
              src={info.image}
              alt="Imagen relacionada a la pregunta"
              className="h-[200px] w-full max-w-md object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="flex flex-col bg-[#333] divide-y-2 divide-[#444] text-center">
          {info.answers.map((answer, index) => (
            <div
              key={index}
              className="hover:bg-[#444] cursor-pointer duration-200 ease-in-out transition-all"
            >
              <button
                onClick={() => handleClick(index)}
                disabled={info.userSelectedAnswer != null}
                style={{ backgroundColor: getBackgroundColor(info, index) }}
                className="py-3 w-full font-mont"
              >
                {answer}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
