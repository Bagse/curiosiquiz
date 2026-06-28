const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../src/data/questions.json");
const raw = fs.readFileSync(src, "utf-8");
const questions = JSON.parse(raw);

function fisherYatesShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const originalIds = questions.map((q) => q.id);
const duplicateCheck = new Set(originalIds);
if (duplicateCheck.size !== originalIds.length) {
  console.error("❌ questions.json tiene IDs duplicados. Ejecuta primero el validador.");
  process.exit(1);
}

const idxMap = {};
questions.forEach((q, i) => {
  idxMap[q.id] = i;
});

let changed = 0;
for (const q of questions) {
  const oldAnswers = [...q.answers];
  const oldCorrect = oldAnswers[q.correctAnswer];
  const shuffled = fisherYatesShuffle(oldAnswers);
  const newCorrectIdx = shuffled.indexOf(oldCorrect);

  q.answers = shuffled;
  q.correctAnswer = newCorrectIdx;

  if (oldAnswers.some((a, i) => a !== shuffled[i])) changed++;
}

fs.writeFileSync(src, JSON.stringify(questions, null, 2) + "\n", "utf-8");
console.log(`✅ ${questions.length} preguntas procesadas.`);
console.log(`🔀 ${changed} preguntas con posiciones mezcladas.`);
console.log(`📁 Archivo actualizado: ${src}`);
