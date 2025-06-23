import { useAchievementsStore } from "../store/achievements";

export default function AchievementList() {
  const all = useAchievementsStore((s) => s.all);
  const unlocked = useAchievementsStore((s) => s.unlocked);

  return (
    <div className="mt-6 space-y-4 flex justify-center items-center flex-col px-4">
      <h3 className="text-xl font-bold text-white">🏅 Logros desbloqueados</h3>
      <ul className="grid  gap-4">
        {all
          .filter((a) => unlocked.includes(a.id))
          .map((a) => (
            <li
              key={a.id}
              className="flex items-center bg-neutral-800 p-4 rounded-lg gap-4 shadow-inner shadow-green-400/10"
            >
              <span className="text-3xl">{a.icon}</span>
              <div>
                <h4 className="text-white font-semibold">{a.name}</h4>
                <p className="text-white text-sm opacity-70">{a.description}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
