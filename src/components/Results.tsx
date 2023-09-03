import { useQuestionsData } from "../hooks/useQuestionsData"
import { useQuestionsStore } from "../store/questions"

export const Results = () => {
    const {correct, incorrect} = useQuestionsData()
    const reset = useQuestionsStore(state => state.reset)

    return (
        <div className="flex flex-col gap-7 justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-mont font-semibold">🥳 Tu resultado es:</h1>
            <strong className="space-y-4 text-xl">
                <p>✅ {correct} correctas</p>
                <p>❌ {incorrect} incorrectas</p>
            </strong>

            <div>
                <button onClick={() => reset()} className="bg-[#00adea] hover:bg-[#00ddaa] rounded-md p-2 outline transition font-bold">¡Empezar de nuevo!</button>
            </div>
        </div>
    )
}