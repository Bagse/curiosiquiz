import Logo from "../components/Logo";
import { useQuestionsStore } from "../store/questions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const categories = [
  {
    id: "cultura",
    title: "Cultura General",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    id: "cine",
    title: "Cine",
    image:
      "https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/RBHN7S7WO5EWLMS7S63MASL7GE.jpg",
  },
  {
    id: "historia",
    title: "Historia",
    image:
      "https://media.istockphoto.com/id/1012501180/es/foto/mundo-antiguo-en-el-fondo-de-la-estanter%C3%ADa.jpg?s=612x612&w=0&k=20&c=VKentTO1n3peF3h4omku13OSPMMmlESoF0Btf-vWxOQ=",
  },
  {
    id: "deportes",
    title: "Deportes",
    image:
      "https://st2.depositphotos.com/1005563/5210/i/450/depositphotos_52108211-stock-photo-sport-balls-with-rackets.jpg",
  },
];

function Homepage() {
  const navigate = useNavigate();
  const questions = useQuestionsStore((state) => state.questions);
  const reset = useQuestionsStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {questions.length === 0 && (
        <div className="px-3 lg:px-32 py-12">
          <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
            <Logo />
            <h1 className="text-2xl md:text-4xl font-bold mt-8 mb-4 font-mont tracking-tight">
              Desafía tu mente. Aprende jugando.
            </h1>
            <p className="text-lg text-neutral-300 px-4">
              Explora nuestras categorías y demuestra cuánto sabes. ¡Desde
              cultura general hasta deportes extremos!
            </p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#7857f6] to-[#00ddaa] mx-auto mt-4 mb-4 animate-pulse" />
          </div>

          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
            Escoge una categoría para comenzar
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[200px]">
            {categories.map((category, idx) => {
              const areaClass =
                [
                  "lg:col-span-3 lg:row-span-1", // Cultura
                  "lg:col-span-3 lg:row-span-1", // Cine
                  "lg:col-span-2 lg:row-span-1", // Historia
                  "lg:col-span-3 lg:row-span-1", // Deportes
                ][idx] || "lg:col-span-2 lg:row-span-1";

              return (
                <div
                  key={category.id}
                  onClick={() => navigate(`/quiz/${category.id}`)}
                  className={`relative cursor-pointer group transition duration-300 rounded-xl overflow-hidden 
                    bg-gradient-to-br from-[#1a1a2e]/80 to-[#2f2f47]/80 
                    hover:from-[#3a3a5a]/90 hover:to-[#50507a]/90 
                    shadow-lg hover:shadow-purple-400/20 transform hover:-translate-y-1 ${areaClass}`}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm shadow-inner shadow-purple-300/10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold text-center px-4 drop-shadow-md">
                      🎮 Jugar
                    </p>
                    <p className="text-white text-sm text-center px-4 opacity-80">
                      10 preguntas
                    </p>
                  </div>
                  <div className="p-4 text-center absolute bottom-0 bg-black/40 w-full">
                    <h3 className="text-white font-semibold text-lg">
                      {category.title}
                    </h3>
                  </div>
                </div>
              );
            })}

            {/* Logros - más pequeño, color sobrio */}
            <div
              onClick={() => navigate("/achievements")}
              className="relative cursor-pointer group transition duration-300 rounded-xl overflow-hidden 
    bg-gradient-to-br from-[#1e1e2e]/80 to-[#2c2c40]/80 
    hover:from-[#2a2a3f]/90 hover:to-[#3b3b59]/90 
    shadow-lg hover:shadow-purple-400/20 transform hover:-translate-y-1 
    lg:col-span-1 lg:row-span-1"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-white text-3xl">🏆</span>
                  <p className="text-neutral-300 font-medium mt-2 text-sm">
                    Ver logros
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
