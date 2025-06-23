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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {unlocked.map((ach) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-xl border border-green-400 bg-[#1a1a1a] shadow-md my-4"
                >
                  <h3 className="text-xl font-bold mb-2">{ach.title}</h3>
                  <p className="text-sm text-neutral-300">{ach.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Logros bloqueados */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              🔒 Logros por desbloquear
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locked.map((ach) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-xl border border-neutral-600 bg-[#111] opacity-50 blur-sm select-none pointer-events-none my-4"
                >
                  <h3 className="text-xl font-bold text-transparent mb-2">
                    {ach.title}
                  </h3>
                  <p className="text-sm text-transparent">Descripción oculta</p>
                </div>
              ))}
            </div>
          </section>
          <div>
            <ButtonGoToHome title="Volver al inicio" onClick={handleGoHome} />
          </div>
        </div>
      )}
    </div>
  );
}
