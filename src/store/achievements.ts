import { create } from "zustand";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  shownOnce?: boolean;
}

interface AchievementsState {
  achievements: Achievement[];
  unlock: (id: string) => void;
  hasUnlocked: (id: string) => boolean;
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
  achievements: [
    { id: "first-quiz", title: "¡Tu primer quiz!", description: "Completaste tu primer quiz", unlocked: false, shownOnce: false, },
    { id: "ten-correct", title: "10 aciertos", description: "Respondiste 10 preguntas correctamente", unlocked: false, shownOnce: false, },
    { id: "flawless", title: "Sin errores", description: "Respondiste todo bien", unlocked: false, shownOnce: false, },
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