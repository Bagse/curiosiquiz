import ButtonGoToHome from "../components/ButtonGoToHome";
import Logo from "../components/Logo";
import { useAchievementsStore } from "../store/achievements";
import { useNavigate } from "react-router-dom";

export default function AchievementsPage() {
  const navigate = useNavigate();
  const achievements = useAchievementsStore((state) => state.achievements);
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 text-white text-center flex flex-col items-center">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <Logo />
      <h1 className="text-3xl font-bold my-10">🏅 Mis logros</h1>

      {unlocked.length === 0 ? (
        <div className="flex flex-col items-center gap-10">
          <p className="text-neutral-400 text-lg">
            No has desbloqueado ningún logro aún. ¡Juega y consigue alguno!
          </p>
          <div>
            <ButtonGoToHome title="Volver al inicio" onClick={handleGoHome} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col gap-12">
          {/* Logros desbloqueados */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              ✅ Logros desbloqueados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {unlocked.map((ach) => (
                <div
                  key={ach.id}
                  className="group relative flex items-center gap-8 p-4 cursor-pointer transition duration-300 rounded-xl 
        bg-gradient-to-br from-[#1a1a2e]/80 to-[#2f2f47]/80 
        hover:from-[#3a3a5a]/90 hover:to-[#50507a]/90 
        shadow-xl hover:shadow-purple-400/20 transform animate-bounce-in"
                >
                  <div className="relative flex-shrink-0 overflow-visible">
                    <div className="w-20 h-20 overflow-visible">
                      <img
                        src={ach.image}
                        alt={ach.title}
                        className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-150 group-hover:translate-x-2 group-hover:rotate-[-9deg]"
                      />
                    </div>
                  </div>

                  <div className="text-left transition-all duration-300 ease-in-out group-hover:translate-x-1">
                    <h3 className="text-xl font-bold mb-1 text-green-300">
                      {ach.title}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Logros bloqueados */}
          {locked.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">
                🔒 Logros por desbloquear
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locked.map((ach) => (
                  <div
                    key={ach.id}
                    className="relative flex items-center gap-4 p-4 rounded-xl border border-neutral-700 bg-[#1a1a2e]/80 shadow-md my-4 select-none pointer-events-none overflow-hidden opacity-60 hover:opacity-70 transition"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, black 60%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 60%, transparent)",
                    }}
                  >
                    <img
                      src={ach.image}
                      alt={ach.title}
                      className="w-20 h-20 object-contain blur-sm"
                    />
                    <div className="text-left blur-sm">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {ach.title}
                      </h3>
                      <p className="text-sm text-neutral-300">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div>
            <ButtonGoToHome title="Volver al inicio" onClick={handleGoHome} />
          </div>
        </div>
      )}
    </div>
  );
}
