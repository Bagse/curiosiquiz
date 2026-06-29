<div align="center">
  <img src="public/quiz.png" alt="CuriosiQuiz" width="80" />
  <h1>CuriosiQuiz</h1>
  <p><strong>Poné a prueba tu conocimiento · 260 preguntas · 8 categorías · 22 logros</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-4-646cff?logo=vite&logoColor=white" alt="Vite 4" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
    <img src="https://img.shields.io/badge/Zustand-4-7857f6" alt="Zustand" />
    <img src="https://img.shields.io/badge/React_Router-7-ca4245?logo=reactrouter&logoColor=white" alt="React Router 7" />
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License" />
  </p>
</div>

---

## 🧠 ¿Qué es CuriosiQuiz?

Una aplicación web de trivia interactiva construida con **React + TypeScript + Vite**. Elegí entre **8 categorías**, respondé **10 preguntas por partida**, acumulá aciertos y desbloqueá **22 logros**. Diseño oscuro, animaciones suaves, y completamente en español.

## ✨ Características

- **8 categorías:** cultura general, cine, deportes, historia, videojuegos, música, geografía y tecnología
- **260 preguntas** con imágenes de Unsplash y Picsum
- **22 logros** con iconos SVG, progreso y modal de desbloqueo
- **Sistema de puntuación** con gráfico circular animado y mensajes contextuales
- **Auto-avance** al responder (1.5 s) con feedback visual inmediato
- **Responsive design** con tema oscuro y paleta morado/verde
- **Persistencia** de progreso y logros con Zustand + localStorage
- **Preguntas mezcladas** aleatoriamente en cada partida

## 🛠️ Stack técnico

| Tecnología | Propósito |
|---|---|
| **React 18** | UI y componentes |
| **TypeScript** | Tipado estático |
| **Vite 4** | Bundler y dev server |
| **Tailwind CSS 3** | Estilos utilitarios |
| **Zustand** | Estado global (progreso, logros, preguntas) |
| **React Router 7** | Navegación (Home, Quiz, Logros) |
| **Radix UI Dialog** | Modal de logros accesible |
| **canvas-confetti** | Confeti al desbloquear logros |

## 🚀 Comandos

```bash
pnpm dev              # Desarrollo
pnpm build            # Producción
pnpm test             # Tests (vitest)
pnpm validate:questions  # Validar dataset de preguntas
pnpm shuffle:answers     # Mezclar respuestas
pnpm fix:images          # Reemplazar URLs de imágenes rotas
```

## 📁 Estructura

```
src/
├── components/       # Question, Results, AchievementModal, etc.
├── pages/            # Homepage, Game, AchievementsPage
├── store/            # Zustand stores (achievements, questions, gameProgress)
├── data/             # questions.json (260 preguntas)
└── utils/            # checkAchievements, achievementHints
scripts/              # Validación y utilidades del dataset
public/               # OG image, favicon, assets estáticos
```

## 🧪 Tests

```bash
pnpm test
```

Validación del dataset:

```bash
pnpm validate:questions
```

## 📸 Capturas

<div align="center">
  <img src="https://github.com/Bagse/curiosiquiz/assets/102260190/95fb2226-678b-470d-b231-38433e55d866" alt="Homepage" width="400" />
  <img src="https://github.com/Bagse/curiosiquiz/assets/102260190/1cb3eda3-8314-4e1d-9922-f713af1f0a72" alt="Game" width="400" />
</div>

## 📄 Licencia

MIT
