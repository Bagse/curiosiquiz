const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../src/data/questions.json");
const raw = fs.readFileSync(src, "utf-8");
const questions = JSON.parse(raw);

const brokenIds = [
  1, 6, 24, 26, 27, 32, 33, 34, 35, 36, 38, 41, 42, 43, 48,
  57, 59, 60, 65, 70, 74, 75, 76,
  83, 85, 86, 87, 91, 94, 95, 101, 102, 104, 105, 107, 109,
  112, 118, 119, 121, 123, 125, 133, 136, 138,
  142, 150, 154, 159,
  179, 189,
  201, 204, 205, 206, 210, 214, 215, 216, 218, 222, 226, 229,
  241, 244, 256, 258,
];

const urlToCategory = {};
for (const id of brokenIds) {
  const q = questions.find((d) => d.id === id);
  if (q) {
    if (!urlToCategory[q.image]) {
      urlToCategory[q.image] = { category: q.category, ids: [] };
    }
    urlToCategory[q.image].ids.push(id);
  }
}

const catSeedCounter = {};
function getReplacementFor(url) {
  const info = urlToCategory[url];
  if (!info) return url;
  const cat = info.category;
  catSeedCounter[cat] = (catSeedCounter[cat] || 0) + 1;
  const n = catSeedCounter[cat];
  const seed = `${cat}-${n}`;
  return `https://picsum.photos/seed/${seed}/600/400`;
}

let replaced = 0;
for (const q of questions) {
  if (brokenIds.includes(q.id)) {
    const newUrl = getReplacementFor(q.image);
    if (newUrl !== q.image) {
      console.log(`  ID ${q.id}: ${q.image.slice(0, 60)}... → seed/${newUrl.split("seed/")[1].split("/")[0]}`);
      q.image = newUrl;
      replaced++;
    }
  }
}

fs.writeFileSync(src, JSON.stringify(questions, null, 2) + "\n", "utf-8");
console.log(`\n✅ ${replaced} imágenes reemplazadas con picsum.photos/seed/`);
