import { create } from "zustand";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  shownOnce?: boolean;
  image: string;
}

interface AchievementsState {
  achievements: Achievement[];
  unlock: (id: string) => void;
  hasUnlocked: (id: string) => boolean;
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
  achievements: [
    { id: "first-quiz", title: "¡Tu primer quiz!", description: "Completaste tu primer quiz", unlocked: false, shownOnce: false, image: "/logros/win.webp" },
    { id: "ten-correct", title: "10 aciertos", description: "Respondiste 10 preguntas correctamente", unlocked: false, shownOnce: false, image: "/logros/brain.webp" },
    { id: "flawless", title: "Sin errores", description: "Respondiste todo bien", unlocked: false, shownOnce: false, image: "/logros/super-pencil.webp" },
    { id: "without-context", title: "Sabiondo sin contexto", description: "Fallaste todas las preguntas… pero con confianza", unlocked: false, shownOnce: false, image: "/logros/sabiondo.webp" },
    { id: "armchair-critic", title: "Crítico de sillón", description: "Completaste 10 quizzes de cine", unlocked: false, shownOnce: false, image: "/logros/critico-cine.webp" },
    { id: "oscar-for-best-riddle", title: "¡Oscar a mejor adivinanza!", description: "Respondiste una película sin haberla visto jamás", unlocked: false, shownOnce: false, image: "/logros/oscar-cine.webp" },
    // puedes añadir más logros
  ],
  unlock: (id) => {
    set((state) => ({
      achievements: state.achievements.map((ach) =>
        ach.id === id && !ach.unlocked ? { ...ach, unlocked: true } : ach
      ),
    }));
  },
  hasUnlocked: (id) => get().achievements.some((ach) => ach.id === id && ach.unlocked),
}));