import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Achievement {
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

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      achievements: [
        {
          id: "first-quiz",
          title: "¡Tu primer quiz!",
          description: "Completaste tu primer quiz",
          unlocked: false,
          shownOnce: false,
          image: "/logros/win.webp",
        },
        {
          id: "without-context",
          title: "Sabiondo sin contexto",
          description: "Fallaste todas las preguntas… pero con confianza",
          unlocked: false,
          shownOnce: false,
          image: "/logros/sibiondo-outcontext.webp",
        },
        {
          id: "all-categories-complete",
          title: "Maestro del multiverso",
          description: "Completaste al menos un quiz de cada categoría",
          unlocked: false,
          shownOnce: false,
          image: "/logros/multiverso.webp",
        },

        {
          id: "cg-flawless-5",
          title: "Modo sabiondo",
          description:
            "Completaste 5 preguntas seguidas de cultura general sin errores",
          unlocked: false,
          shownOnce: false,
          image: "/logros/brain.webp",
        },
        {
          id: "cg-finished-10",
          title: "Enciclopedia viva",
          description: "Terminaste un quiz completo de cultura general",
          unlocked: false,
          shownOnce: false,
          image: "/logros/super-pencil.webp",
        },

        {
          id: "cinema-flawless-5",
          title: "Modo director",
          description: "Completaste 5 preguntas seguidas de cine sin errores",
          unlocked: false,
          shownOnce: false,
          image: "/logros/director.webp",
        },
        {
          id: "cinema-finished-10",
          title: "Cinta completa",
          description: "Terminaste un quiz completo de cine",
          unlocked: false,
          shownOnce: false,
          image: "/logros/critico-cine.webp",
        },
        {
          id: "oscar-for-best-riddle",
          title: "¡Oscar a mejor adivinanza!",
          description: "Respondiste una película sin haberla visto jamás",
          unlocked: false,
          shownOnce: false,
          image: "/logros/oscar-cine.webp",
        },

        {
          id: "sports-flawless-5",
          title: "Invicto",
          description:
            "Completaste 5 preguntas seguidas de deportes sin errores",
          unlocked: false,
          shownOnce: false,
          image: "/logros/muscle.webp",
        },
        {
          id: "sports-finished-10",
          title: "Final del partido",
          description: "Terminaste un quiz completo de deportes",
          unlocked: false,
          shownOnce: false,
          image: "/logros/finished.webp",
        },
        
          {
            id: "history-flawless-5",
            title: "Erudito del pasado",
            description:
              "Completaste 5 preguntas seguidas de historia sin errores",
            unlocked: false,
            shownOnce: false,
            image: "/logros/sherlof.webp",
          },
          {
            id: "history-finished-10",
            title: "Cronista oficial",
            description: "Terminaste un quiz completo de historia",
            unlocked: false,
            shownOnce: false,
            image: "/logros/romano.webp",
          },

          {
            id: "gaming-flawless-5",
            title: "Jugador veterano",
            description:
              "Completaste 5 preguntas seguidas de videojuegos sin errores",
            unlocked: false,
            shownOnce: false,
            image: "",
          },
          {
            id: "gaming-finished-10",
            title: "Game Over",
            description: "Terminaste un quiz completo de videojuegos",
            unlocked: false,
            shownOnce: false,
            image: "",
          },

          {
            id: "music-flawless-5",
            title: "Oído absoluto",
            description:
              "Completaste 5 preguntas seguidas de música sin errores",
            unlocked: false,
            shownOnce: false,
            image: "",
          },
          {
            id: "music-finished-10",
            title: "Rockstar",
            description: "Terminaste un quiz completo de música",
            unlocked: false,
            shownOnce: false,
            image: "",
          },

          {
            id: "geo-flawless-5",
            title: "Cartógrafo experto",
            description:
              "Completaste 5 preguntas seguidas de geografía sin errores",
            unlocked: false,
            shownOnce: false,
            image: "",
          },
          {
            id: "geo-finished-10",
            title: "Explorador mundial",
            description: "Terminaste un quiz completo de geografía",
            unlocked: false,
            shownOnce: false,
            image: "",
          },

          {
            id: "tech-flawless-5",
            title: "Mente digital",
            description:
              "Completaste 5 preguntas seguidas de tecnología sin errores",
            unlocked: false,
            shownOnce: false,
            image: "",
          },
          {
            id: "tech-finished-10",
            title: "Ingeniero en jefe",
            description: "Terminaste un quiz completo de tecnología",
            unlocked: false,
            shownOnce: false,
            image: "",
          },

        {
          id: "comeback-king",
          title: "Vuelta olímpica",
          description:
            "Fallaste un quiz completo y luego lo completaste sin errores",
          unlocked: false,
          shownOnce: false,
          image: "/logros/olimpic.webp",
        },
        {
          id: "achievement-hunter",
          title: "Cazador de logros",
          description: "Desbloqueaste 10 logros",
          unlocked: false,
          shownOnce: false,
          image: "/logros/sabiondo.webp",
        },
      ],
      unlock: (id: string) => {
        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === id && !ach.unlocked ? { ...ach, unlocked: true } : ach
          ),
        }));
      },
      hasUnlocked: (id) =>
        get().achievements.some((ach) => ach.id === id && ach.unlocked),
    }),
    {
      name: "achievements-storage-v2",
      partialize: (state) => ({ achievements: state.achievements }),
    }
  )
);
