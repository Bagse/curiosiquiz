import { create } from "zustand";
import { persist } from "zustand/middleware";
import { achievementsList } from "../data/achievements";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface AchievementState {
  unlocked: string[];
  all: Achievement[];
  unlock: (id: string) => void;
  resetAchievements: () => void;
}

export const useAchievementsStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlocked: [],
      all: achievementsList,
      unlock: (id: string) => {
        if (!get().unlocked.includes(id)) {
          set({ unlocked: [...get().unlocked, id] });
        }
      },
      resetAchievements: () => set({ unlocked: [] }),
    }),
    {
      name: "achievements-storage",
    }
  )
);
