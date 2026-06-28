import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import QuizPage from "./pages/QuizPage";
import { Results } from "./components/Results";
import { Footer } from "./components/Footer";
import AchievementsPage from "./pages/AchievementsPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const oldKeys = [
      "achievements-storage",
      "questions",
      "categories-completed",
    ];
    oldKeys.forEach((key) => {
      if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
