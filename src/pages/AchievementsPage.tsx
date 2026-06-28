import { useAchievementsStore } from "../store/achievements";
import { achievementHints } from "../utils/achievementHints";
import { useNavigate } from "react-router-dom";

export default function AchievementsPage() {
  const navigate = useNavigate();
  const achievements = useAchievementsStore((state) => state.achievements);
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);
  const total = achievements.length;
  const progress = (unlocked.length / total) * 100;

  return (
    <div className="min-h-dvh px-4 sm:px-8 md:px-16 lg:px-32 py-8 text-white text-center flex flex-col items-center">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="fixed top-20 -left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "-3s" }} />

      <div className="w-full max-w-6xl flex flex-col items-center gap-6">
        {/* Back button */}
        <div className="w-full">
          <button
            onClick={() => navigate("/")}
            className="group text-white relative inline-flex items-center gap-2 overflow-hidden transition duration-300 ease-in-out"
          >
            <svg
              className="w-5 h-5 transform translate-x-0 group-hover:translate-x-[-4px] transition duration-300 ease-in-out"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="relative z-10 text-sm">Volver al inicio</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7857f6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-mont">🏅 Mis logros</h1>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md flex flex-col items-center gap-2">
          <div className="flex justify-between w-full text-sm text-neutral-400">
            <span>Progreso</span>
            <span>{unlocked.length} / {total}</span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7857f6] to-[#00ddaa] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {unlocked.length === 0 && (
          <div className="flex flex-col items-center gap-12 w-full">
            <p className="text-neutral-400 text-lg">
              No has desbloqueado ningún logro aún. ¡Juega y consigue alguno!
            </p>
            {locked.length > 0 && (
              <section className="w-full">
                <h2 className="text-2xl font-semibold mb-8">
                  🔒 Logros por desbloquear
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locked.map((ach, idx) => (
                    <AchievementCard key={ach.id} ach={ach} idx={idx} locked />
                  ))}
                </div>
              </section>
            )}
            <button
              onClick={() => navigate("/")}
              className="relative cursor-pointer py-3 px-6 sm:py-4 sm:px-8 text-center inline-flex justify-center text-sm sm:text-base text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <span className="relative z-20">Volver al inicio</span>
            </button>
          </div>
        )}

        {unlocked.length > 0 && (
          <div className="w-full flex flex-col gap-16">
            <section className="w-full">
              <h2 className="text-2xl font-semibold mb-8 text-left">
                ✅ Desbloqueados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {unlocked.map((ach, idx) => (
                  <AchievementCard key={ach.id} ach={ach} idx={idx} />
                ))}
              </div>
            </section>

            {locked.length > 0 && (
              <section className="w-full">
                <h2 className="text-2xl font-semibold mb-8 text-left">
                  🔒 Por desbloquear
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locked.map((ach, idx) => (
                    <AchievementCard key={ach.id} ach={ach} idx={idx} locked />
                  ))}
                </div>
              </section>
            )}

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="relative cursor-pointer py-3 px-6 sm:py-4 sm:px-8 text-center inline-flex justify-center text-sm sm:text-base text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10"
              >
                <span className="relative z-20">Volver al inicio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AchievementCard({
  ach,
  idx,
  locked,
}: {
  ach: { id: string; title: string; description: string; image: string };
  idx: number;
  locked?: boolean;
}) {
  const hint = achievementHints[ach.id];

  return (
    <div
      style={{ animationDelay: `${idx * 0.08}s` }}
      className={`group relative rounded-xl overflow-hidden border transition-all duration-300 animate-fade-in-up opacity-0 ${
        locked
          ? "border-neutral-700 bg-[#1a1a2e]/40 opacity-50 hover:opacity-70"
          : "border-[#00ddaa]/20 bg-gradient-to-br from-[#1a1a2e]/80 to-[#2f2f47]/80 hover:from-[#3a3a5a]/90 hover:to-[#50507a]/90 hover:border-[#00ddaa]/50 hover:shadow-xl hover:shadow-[#00ddaa]/20 hover:-translate-y-1.5"
      }`}
    >
      <div className={`p-5 flex flex-col items-center gap-4 ${locked ? "pointer-events-none" : ""}`}>
        <div className="relative">
          <img
            src={ach.image}
            alt={ach.title}
            className={`w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-500 ${
              locked ? "blur-sm scale-95" : "group-hover:scale-110"
            }`}
          />
        </div>

        <div className={`text-center ${locked ? "blur-sm" : ""}`}>
          <h3 className={`text-lg font-bold mb-1 ${
            locked ? "text-white" : "text-[#00ddaa]"
          }`}>
            {ach.title}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {ach.description}
          </p>
        </div>

        {/* Hint tooltip */}
        {hint && (
          <div className="w-full pt-2 border-t border-white/5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xs text-neutral-500 leading-relaxed">
              💡 {hint}
            </p>
          </div>
        )}
      </div>

      {locked && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 60%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent)",
          }}
        />
      )}
    </div>
  );
}
