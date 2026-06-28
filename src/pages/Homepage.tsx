import Logo from "../components/Logo";
import { useQuestionsStore } from "../store/questions";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

const categories = [
  {
    id: "cultura-general",
    title: "Cultura General",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
  },
  {
    id: "cine",
    title: "Cine",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80",
  },
  {
    id: "historia",
    title: "Historia",
    image:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
  },
  {
    id: "deportes",
    title: "Deportes",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  },
];

const categoryColors = [
  { hex: "#a855f7" },
  { hex: "#3b82f6" },
  { hex: "#f59e0b" },
  { hex: "#10b981" },
];

function Homepage() {
  const navigate = useNavigate();
  const questions = useQuestionsStore((state) => state.questions);
  const reset = useQuestionsStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, []);

  const handleRandomQuiz = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * categories.length);
    navigate(`/quiz/${categories[randomIdx].id}`);
  }, [navigate]);

  return (
    <>
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {/* Decorative orbs */}
      <div className="fixed top-20 -left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "-3s" }} />

      {questions.length === 0 && (
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-12">
          <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
            <Logo />
            <h1 className="text-2xl md:text-4xl font-bold mt-8 mb-4 font-mont tracking-tight bg-gradient-to-r from-[#7857f6] to-[#00ddaa] bg-clip-text text-transparent">
              Desafía tu mente. Aprende jugando.
            </h1>
            <p className="text-lg text-neutral-300 px-4">
              Explora nuestras categorías y demuestra cuánto sabes. ¡Desde
              cultura general hasta deportes extremos!
            </p>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#7857f6] to-[#00ddaa] mx-auto mt-4 mb-6 animate-pulse" />

            <button
              onClick={handleRandomQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-neutral-200 hover:text-white transition-all duration-300 text-sm font-mont"
            >
              <span>🎲</span>
              Quiz aleatorio
            </button>
          </div>

          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
            Escoge una categoría
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[240px] lg:auto-rows-[260px]">
            {categories.map((category, idx) => {
              const color = categoryColors[idx];

              return (
                <div
                  key={category.id}
                  onClick={() => navigate(`/quiz/${category.id}`)}
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    boxShadow: `0 4px 6px -1px ${color.hex}15, 0 2px 4px -2px ${color.hex}15`,
                  } as React.CSSProperties}
                  className="relative cursor-pointer group transition-all duration-300 rounded-xl overflow-hidden 
                    bg-[#1a1a2e] border border-transparent hover:-translate-y-1 hover:shadow-xl
                    animate-fade-in-up opacity-0"
                >
                  {/* Accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] z-10"
                    style={{ backgroundColor: color.hex }}
                  />

                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Badge */}
                  <div
                    className="absolute top-3 right-3 z-10 text-xs px-2.5 py-1 rounded-full border border-white/10 font-medium text-white"
                    style={{ backgroundColor: `${color.hex}99` }}
                  >
                    10 preguntas
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="text-white font-semibold text-lg">
                      {category.title}
                    </h3>
                  </div>

                  {/* CTA overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <span
                      className="text-white px-6 py-3 rounded-full font-semibold border border-white/20 translate-y-4 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-md"
                      style={{ backgroundColor: `${color.hex}1A` }}
                    >
                      🎮 Jugar ahora
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Logros card - centered below */}
          <div
            onClick={() => navigate("/achievements")}
            style={{ animationDelay: "0.45s" }}
            className="mx-auto mt-2 cursor-pointer group transition-all duration-300 rounded-xl overflow-hidden 
              bg-gradient-to-br from-[#1e1e2e]/80 to-[#2c2c40]/80 
              hover:from-[#2a2a3f]/90 hover:to-[#3b3b59]/90 
              shadow-lg hover:shadow-purple-400/20 hover:-translate-y-1 
              w-full max-w-[200px] animate-fade-in-up opacity-0 py-5"
          >
            <div className="flex items-center justify-center">
              <div className="text-center">
                <span className="text-white text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  🏆
                </span>
                <p className="text-neutral-300 font-medium mt-1 text-sm">
                  Ver logros
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
