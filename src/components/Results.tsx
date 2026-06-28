import { useNavigate } from "react-router-dom";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";
import { Achievement, useAchievementsStore } from "../store/achievements";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useGameProgressStore } from "../store/useGameProgressStore";
import { checkAchievements } from "../utils/checkAchievements";
import AchievementModal from "./AchievementModal";

function checkComebackKing(category: string, correct: number, total: number) {
  const { unlock, hasUnlocked } = useAchievementsStore.getState();
  const key = `fail-record-${category}`;

  const previouslyFailedAll = localStorage.getItem(key) === "true";
  const isPerfect = correct === total;

  if (previouslyFailedAll && isPerfect && !hasUnlocked("comeback-king")) {
    unlock("comeback-king");
    localStorage.removeItem(key);
  }

  if (correct === 0) {
    localStorage.setItem(key, "true");
  }
}

function checkAllCategoriesComplete(category: string, correct: number) {
  const { unlock, hasUnlocked } = useAchievementsStore.getState();
  if (!category || correct === 0) return;

  const storageKey = "categories-completed";
  const stored = localStorage.getItem(storageKey);
  const completed = new Set<string>(stored ? JSON.parse(stored) : []);

  completed.add(category);
  localStorage.setItem(storageKey, JSON.stringify([...completed]));

  const all = [
    "cultura-general", "cine", "deportes", "historia",
    "videojuegos", "musica", "geografia", "tecnologia",
  ];
  const hasAll = all.every((cat) => completed.has(cat));

  if (hasAll && !hasUnlocked("all-categories-complete")) {
    unlock("all-categories-complete");
  }
}

const categoryLabels: Record<string, string> = {
  "cultura-general": "Cultura General",
  cine: "Cine",
  deportes: "Deportes",
  historia: "Historia",
  videojuegos: "Videojuegos",
  musica: "Música",
  geografia: "Geografía",
  tecnologia: "Tecnología",
};

function getMessage(percent: number): string {
  if (percent === 100) return "¡Perfecto!";
  if (percent >= 80) return "¡Impresionante!";
  if (percent >= 60) return "Buen trabajo";
  if (percent >= 40) return "Sigue intentándolo";
  return "Ánimo, la próxima será mejor";
}

function ScoreCircle({ percent }: { percent: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-neutral-800"
        />
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{
            stroke: "url(#scoreGradient)",
          }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7857f6" />
            <stop offset="100%" stopColor="#00ddaa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl sm:text-5xl font-bold font-mont bg-gradient-to-r from-[#7857f6] to-[#00ddaa] bg-clip-text text-transparent">
          {percent}%
        </span>
      </div>
    </div>
  );
}

function AnimatedNumber({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold text-white">{display}</span>
      <span className="text-xs text-neutral-500 mt-0.5">{label}</span>
    </div>
  );
}

export const Results = () => {
  const [showModal, setShowModal] = useState(false);
  const [localNewAchievements, setLocalNewAchievements] = useState<Achievement[]>([]);
  const navigate = useNavigate();

  const currentCategory = useQuestionsStore((state) => state.currentCategory);
  const { correct, incorrect } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);
  const achievements = useAchievementsStore((state) => state.achievements);
  const setShownOnce = useAchievementsStore.setState;
  const total = questions.length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  const handleRetrySameCategory = () => {
    reset();
    if (currentCategory) {
      navigate(`/quiz/${currentCategory}`);
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    reset();
    navigate("/");
  };

  useEffect(() => {
    const freshNewAchievements = achievements.filter(
      (a) => a.unlocked && !a.shownOnce
    );

    if (freshNewAchievements.length > 0) {
      setLocalNewAchievements(freshNewAchievements);
      setShowModal(true);

      setShownOnce((state) => ({
        achievements: state.achievements.map((ach) =>
          freshNewAchievements.some((a) => a.id === ach.id)
            ? { ...ach, shownOnce: true }
            : ach
        ),
      }));
    }
  }, [achievements]);

  useEffect(() => {
    const answeredIds = questions.map((q) => q.id.toString());
    const wasPerfect = correct === questions.length;

    const lastGame = useGameProgressStore.getState();
    const wasPerfectAfterFail = lastGame.lastResult?.failedAll && wasPerfect;

    useGameProgressStore.getState().saveResult({
      category: currentCategory ?? "",
      correct,
      total: questions.length,
      streak: correct,
      answeredIds,
      perfectAfterFail: wasPerfectAfterFail,
    });

    if (currentCategory) {
      checkComebackKing(currentCategory, correct, questions.length);
      checkAllCategoriesComplete(currentCategory, correct);
    }

    setTimeout(() => {
      checkAchievements();
    }, 0);
  }, []);

  const statCards = [
    { value: correct, label: "Correctas", color: "#06d6a0" },
    { value: incorrect, label: "Incorrectas", color: "#ef476f" },
    { value: total, label: "Totales", color: "#7857f6" },
  ];

  return (
    <div className="flex flex-col items-center text-white w-full min-h-dvh px-4 py-8">
      <div className="fixed inset-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="fixed top-20 -left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-float pointer-events-none" />

      <Logo />

      <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-md animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
        {currentCategory && (
          <span className="text-xs font-mont text-neutral-500 tracking-widest uppercase">
            {categoryLabels[currentCategory] || currentCategory}
          </span>
        )}

        <h1 className="text-xl sm:text-2xl font-semibold font-mont text-neutral-200">
          {getMessage(percent)}
        </h1>

        <ScoreCircle percent={percent} />
      </div>

      <div className="flex gap-8 sm:gap-12 mt-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s" }}>
        {statCards.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <AnimatedNumber value={stat.value} label={stat.label} />
            <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: stat.color }} />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full max-w-md animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
        <button
          onClick={handleRetrySameCategory}
          className="flex-1 group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#7857f6] to-[#00ddaa] p-[1px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2 rounded-xl bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-transparent">
            Reintentar categoría
          </span>
        </button>
        <button
          onClick={handleGoHome}
          className="flex-1 group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#7857f6] to-[#00ddaa] p-[1px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2 rounded-xl bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-transparent">
            Volver al inicio
          </span>
        </button>
      </div>

      <div className="mt-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
        <button
          onClick={() => navigate("/achievements")}
          className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200"
        >
          <span>🏆</span>
          <span>Ver mis logros</span>
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <AchievementModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="🎉 ¡Nuevo logro!"
        achievements={localNewAchievements}
      />
    </div>
  );
};
