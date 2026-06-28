const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../src/data/questions.json");
const raw = fs.readFileSync(src, "utf-8");
const questions = JSON.parse(raw);

const VALID_CATEGORIES = [
  "cultura-general",
  "cine",
  "deportes",
  "historia",
  "videojuegos",
  "musica",
  "geografia",
  "tecnologia",
];

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const errors = [];
const warnings = [];

// ── ID duplicados ──
const idCount = {};
for (const q of questions) {
  idCount[q.id] = (idCount[q.id] || 0) + 1;
}
for (const [id, count] of Object.entries(idCount)) {
  if (count > 1) {
    errors.push(`ID ${id} aparece ${count} veces`);
  }
}

// ── ID inválidos ──
for (const q of questions) {
  if (!Number.isInteger(q.id) || q.id < 0) {
    errors.push(`ID inválido: ${JSON.stringify(q.id)} en pregunta "${q.question.slice(0, 40)}..."`);
  }
}

// ── Preguntas duplicadas ──
const normMap = {};
for (const q of questions) {
  const key = normalize(q.question);
  if (normMap[key]) {
    errors.push(
      `Pregunta duplicada: "${q.question.slice(0, 50)}..." (IDs ${normMap[key]} y ${q.id})`
    );
  } else {
    normMap[key] = q.id;
  }
}

// ── correctAnswer ──
for (const q of questions) {
  if (typeof q.correctAnswer !== "number" || !Number.isInteger(q.correctAnswer)) {
    errors.push(`ID ${q.id}: correctAnswer no es entero`);
  } else if (q.correctAnswer < 0 || q.correctAnswer >= q.answers.length) {
    errors.push(
      `ID ${q.id}: correctAnswer ${q.correctAnswer} fuera de rango (0-${q.answers.length - 1})`
    );
  }
}

// ── Answers vacías ──
for (const q of questions) {
  if (!Array.isArray(q.answers) || q.answers.length < 2) {
    errors.push(`ID ${q.id}: answers debe tener al menos 2 opciones`);
  } else {
    q.answers.forEach((a, i) => {
      if (typeof a !== "string" || a.trim() === "") {
        errors.push(`ID ${q.id}: answers[${i}] está vacía`);
      }
    });
  }
}

// ── Imagen vacía ──
for (const q of questions) {
  if (!q.image || typeof q.image !== "string" || q.image.trim() === "") {
    errors.push(`ID ${q.id}: imagen vacía o faltante`);
  }
}

// ── Categoría ──
for (const q of questions) {
  if (!VALID_CATEGORIES.includes(q.category)) {
    errors.push(`ID ${q.id}: categoría desconocida "${q.category}"`);
  }
}

// ── URLs de imagen (HEAD request) ──
const BATCH_SIZE = 20;
const TIMEOUT_MS = 8000;
const imageChecks = questions.map((q) => ({
  id: q.id,
  url: q.image,
}));

async function checkUrls() {
  const failed = [];
  for (let i = 0; i < imageChecks.length; i += BATCH_SIZE) {
    const batch = imageChecks.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((item) => checkSingleUrl(item))
    );
    results.forEach((r) => {
      if (r.status === "fulfilled" && r.value) {
        failed.push(r.value);
      } else if (r.status === "rejected") {
        // Shouldn't happen, but just in case
      }
    });
    process.stdout.write(
      `  Progreso URLs: ${Math.min(i + BATCH_SIZE, imageChecks.length)}/${imageChecks.length}\r`
    );
  }
  return failed;
}

async function checkSingleUrl({ id, url }) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const resp = await fetch(url, { method: "HEAD", signal: controller.signal });
    clearTimeout(timer);
    if (resp.ok) return null;
    // Picsum/ph URLs rechazan HEAD (405) pero responden bien con GET
    if (resp.status === 405) {
      const controller2 = new AbortController();
      const timer2 = setTimeout(() => controller2.abort(), TIMEOUT_MS);
      const resp2 = await fetch(url, { method: "GET", signal: controller2.signal });
      clearTimeout(timer2);
      const ct = resp2.headers.get("content-type") || "";
      if (resp2.ok && ct.startsWith("image/")) return null;
      return { id, url, status: `${resp2.status} (GET, ${ct})` };
    }
    return { id, url, status: resp.status };
  } catch {
    return { id, url, status: "ERROR (timeout / red / no resuelve)" };
  }
}

// ── Main ──
(async () => {
  console.log("🔍 Validando preguntas...\n");

  // Mostrar primeros errores locales
  if (errors.length > 0) {
    console.log("❌ Errores locales encontrados:");
    errors.forEach((e) => console.log(`   ❌ ${e}`));
    console.log(`\n${errors.length} error(es) local(es).\n`);
  } else {
    console.log("✅ Sin errores locales.\n");
  }

  console.log("🌐 Verificando URLs de imágenes...");
  const urlErrors = await checkUrls();
  console.log(""); // newline after progress

  // Añadir errores de URL al total
  urlErrors.forEach(({ id, url, status }) => {
    const snippet = url.length > 60 ? url.slice(0, 60) + "..." : url;
    errors.push(`ID ${id}: imagen responde con ${status} — ${snippet}`);
  });

  // ── Resumen final ──
  console.log("\n═══════════════════════════════");
  console.log(`Total preguntas:   ${questions.length}`);
  console.log(`Categorías:        ${VALID_CATEGORIES.length}`);
  console.log(`Errores totales:   ${errors.length}`);
  console.log("═══════════════════════════════\n");

  if (errors.length === 0) {
    console.log("✅ ¡Todo correcto! El dataset está limpio.");
  } else {
    console.log(`❌ ${errors.length} error(es) encontrado(s):\n`);
    errors.forEach((e, i) => console.log(`  ${i + 1}. ❌ ${e}`));
    process.exitCode = 1;
  }
})();
