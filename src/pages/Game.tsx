import { Footer } from "../components/Footer";
import { useQuestionsStore } from "../store/questions";
import { type Question as QuestionType } from "../types";
import { GrPrevious, GrNext } from "react-icons/gr";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  // usuario no ha seleccionado ninguna respuesta
  if (userSelectedAnswer == null) return "transparent";
  // usuario ha seleccionado pero la respuesta es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  // usuario ha seleccionado la respuesta correcta
  if (index === correctAnswer) return "#06d6a0";
  // usuario ha seleccionado la respuesta que no es correcta
  if (index === userSelectedAnswer) return "#ef476f";
  // ninguna de las anteriores
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <div className="outline outline-2 outline-[#00ddaa] bg-[#151515] p-4 rounded-lg flex flex-col gap-5 md:gap-3 md:w-[600px]">
      <h2 className="text-2xl text-center">{info.question}</h2>

      <div className="flex justify-center">
        <img
          src={info.image}
          alt={"imagen relacionada a la pregunta"}
          className="h-[180px] md:h-[200px] w-[570px] object-cover"
        />
      </div>

      <div className="flex flex-col bg-[#333] divide-y-2 divide-[#444] text-center">
        {info.answers.map((answer, index) => (
          <div
            key={index}
            className="hover:bg-[#444] cursor-pointer duration-200 ease-in-out transition-all"
          >
            <button
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              style={{ backgroundColor: getBackgroundColor(info, index) }}
              className="py-3 w-full font-mont"
            >
              {answer}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <div>
      <div className="flex gap-3 py-5 md:py-3 items-center justify-center">
        <button onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <GrPrevious
            size={28}
            className={`p-2 rounded-full ${
              currentQuestion === 0 ? "bg-gray-300" : "bg-white"
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
                : "bg-white"
            }`}
          />
        </button>
      </div>

      <Question info={questionInfo} />
      <Footer />
    </div>
  );
};
