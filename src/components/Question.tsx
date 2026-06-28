import { useRef, useEffect } from "react";
import { useQuestionsStore } from "../store/questions";
import { type Question as QuestionType } from "../types";
import { useNavigate } from "react-router-dom";
import { useQuestionsData } from "../hooks/useQuestionsData";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return "transparent";
  if (index === correctAnswer) return "#06d6a0";
  if (index === userSelectedAnswer) return "#ef476f";
  return "transparent";
};

const getBorderColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return "border-white/10";
  if (index === correctAnswer) return "border-[#06d6a0]";
  if (index === userSelectedAnswer) return "border-[#ef476f]";
  return "border-white/10";
};

export default function Question({ info }: { info: QuestionType }) {
  const { unanswered } = useQuestionsData();
  const navigate = useNavigate();
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const totalQuestions = useQuestionsStore((state) => state.questions.length);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [info.id]);

  const handleClick = (answerIndex: number) => {
    if (info.userSelectedAnswer != null) return;

    selectAnswer(info.id, answerIndex);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const isLastQuestion = currentQuestion === totalQuestions - 1;
    timeoutRef.current = setTimeout(() => {
      if (isLastQuestion) {
        navigate("/results");
      } else {
        goNextQuestion();
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col gap-4">
      {/* Question card */}
      <div className="bg-[#151515] rounded-xl p-5 sm:p-6 flex flex-col gap-5 border border-white/5">
        <h2 className="text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
          {info.question}
        </h2>

        {info.image && (
          <div className="flex justify-center">
            <img
              src={info.image}
              alt="Imagen relacionada a la pregunta"
              className="h-[150px] sm:h-[180px] md:h-[200px] w-full max-w-md object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {info.answers.map((answer, index) => {
            const answered = info.userSelectedAnswer != null;
            const isCorrect = index === info.correctAnswer;
            const isSelected = index === info.userSelectedAnswer;

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={answered}
                className={`relative w-full text-left p-3 sm:p-4 rounded-lg border transition-all duration-200 font-mont text-sm sm:text-base
                  ${answered ? "cursor-default" : "hover:bg-white/5 cursor-pointer active:scale-[0.99]"}
                  ${getBorderColor(info, index)}
                  ${isSelected && isCorrect ? "bg-[#06d6a0]/10" : ""}
                  ${isSelected && !isCorrect ? "bg-[#ef476f]/10" : ""}
                  ${!answered ? "bg-white/5 border-white/10 hover:border-white/20" : ""}
                `}
                style={{
                  backgroundColor:
                    isSelected || isCorrect
                      ? getBackgroundColor(info, index)
                      : answered
                      ? "transparent"
                      : undefined,
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${answered && isCorrect ? "bg-[#06d6a0] text-white" : ""}
                      ${answered && isSelected && !isCorrect ? "bg-[#ef476f] text-white" : ""}
                      ${!answered || (!isSelected && !isCorrect) ? "bg-white/10 text-neutral-400" : ""}
                    `}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-white/90">{answer}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
        {unanswered > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            {unanswered} sin responder
          </span>
        )}
        {unanswered === 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0]/60" />
            Todas respondidas
          </span>
        )}
      </div>
    </div>
  );
}
