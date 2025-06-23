import { useAchievementsStore } from "../store/achievements";

export default function AchievementList() {
  const achievements = useAchievementsStore((s) => s.achievements);

  const unlocked = achievements.filter((a) => a.unlocked);

  return (
    <div className="mt-6 space-y-4 flex justify-center items-center flex-col px-4">
      <h3 className="text-xl font-bold text-white">🏅 Logros desbloqueados</h3>

      {unlocked.length === 0 ? (
        <p className="text-white/70">Aún no has desbloqueado ningún logro.</p>
      ) : (
        <ul className="grid gap-4">
          {unlocked.map((a) => (
            <li
              key={a.id}
              className="flex items-center bg-neutral-800 p-4 rounded-lg gap-4 shadow-inner shadow-green-400/10"
            >
              <div>
                <h4 className="text-white font-semibold">{a.title}</h4>
                <p className="text-white text-sm opacity-70">{a.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
